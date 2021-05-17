<template lang="pug">
v-app(v-if="record")
  v-app-bar(app, color="light-green darken-3", dark, dense, :clipped="$vuetify.breakpoint.lgAndUp")
    v-app-bar-nav-icon(@click="$router.back()")
      v-icon {{ icons.mdiArrowLeft }}
    v-toolbar-title {{ date | moment('YYYY-MM-DD')}} {{ location}}
    v-spacer
    v-btn(dark :href="`https://ebird.org/checklist/${sid}`" icon target="_blank")
      v-icon {{ icons.mdiBird}}
  v-main
    template(v-if="loading" )
      v-progress-linear(color='green' indeterminate rounded height="6")
      v-skeleton-loader(type="list-item-avatar, list-item-avatar, list-item-avatar, list-item-avatar" v-if="loading")
    template(v-else)
      v-list(dense)
        v-list-item
          v-list-item-content
            v-list-item-title 
              span.float-right 共{{ getfamily }}科 {{ record.length }}種
      v-list( dense )
        v-divider
        template(v-for="bird, index in record")
          v-list-item( :key="bird.speciesCode" )
            v-list-item-avatar
              | {{ bird.howManyStr}}
            v-list-item-content
              v-list-item-title 
                | {{ birds[bird.speciesCode].name }}
                span.float-right.caption(v-if="index==0 || (index-1 >= 0  && birds[record[index-1].speciesCode].family != birds[bird.speciesCode].family)") {{ birds[bird.speciesCode].family }}
          v-divider
</template>

<script>
import { mdiArrowLeft, mdiBird } from '@mdi/js'
export default {
  name: 'eBird',
  data: () => ({
    icons: {
      mdiArrowLeft,
      mdiBird,
    },
    record: null,
    birds: {},
    sid: '',
    date: '',
    location: '',
    loading: true,
  }),
  created() {
    this.sid = this.$route.params.sid ?? ''
    this.birds = this.$offlineStorage.get('birds')
    if (this.sid == '') {
      this.$route.push('/')
    }
  },
  computed: {
    getfamily() {
      const family = []
      this.record.forEach(item => {
        if (family.indexOf(this.birds[item.speciesCode].family) == -1) {
          family.push(this.birds[item.speciesCode].family)
        }
      })
      return family.length
    },
  },
  mounted() {
    this.eBird(this.sid)
  },
  methods: {
    async eBird(sid) {
      return await this.$http
        .get(`https://api.ebird.org/v2/product/checklist/view/${sid}`, {
          headers: { 'X-eBirdApiToken': '23abgao7v09b' },
        })
        .then(async ret => {
          this.loading = false
          this.date = this.$moment(ret.data.creationDt, 'YYYY-MM-DD HH:SS')
          this.location = await this.HotspotName(ret.data.locId)
          this.record = ret.data.obs
        })
    },
    async HotspotName(locId) {
      return await this.$http
        .get(`https://api.ebird.org/v2/ref/hotspot/info/${locId}`, {
          headers: { 'X-eBirdApiToken': '23abgao7v09b' },
        })
        .then(ret => {
          return ret.data.name
        })
    },
  },
}
</script>
