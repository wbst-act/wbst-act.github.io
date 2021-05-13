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
    template(v-else)
      v-card.mx-auto(outlined v-if="record.obs")
        v-card-text 鳥種數: {{ record.obs.length }}
      v-list( dense )
        template(v-for="bird in record.obs")
          v-list-item( :key="bird.speciesCode" )
            v-list-item-avatar
              | {{ bird.howManyStr}}
            v-list-item-content
              v-list-item-title {{ birds[bird.speciesCode] }}
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
    record: {},
    birds: {},
    sid: '',
    date: '',
    location: '',
    loading: true,
  }),
  created() {
    this.sid = this.$route.params.sid ?? ''
    this.date = this.$route.params.date ?? ''
    this.location = this.$route.params.location ?? ''
    if (this.sid == '' || this.date == '' || this.location == '') {
      this.$router.push('/')
    }

    this.birds = this.$offlineStorage.get('birds')
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
        .then(ret => {
          this.loading = false
          this.record = ret.data
        })
    },
  },
}
</script>
