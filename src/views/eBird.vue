<template lang="pug">
v-app
  v-app-bar(app, color="light-green darken-3", dark, dense, :clipped="$vuetify.breakpoint.lgAndUp")
    v-app-bar-nav-icon(@click="$router.back()")
      v-icon {{ icons.mdiArrowLeft }}
    v-toolbar-title {{ date | moment('YYYY-MM-DD')}} {{ location}}
  v-main
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
import { mdiArrowLeft } from '@mdi/js'
export default {
  name: 'eBird',
  data: () => ({
    icons: {
      mdiArrowLeft,
    },
    record: {},
    birds: {},
    sid: '',
    date: '',
    location: '',
  }),
  async created() {
    this.sid = this.$route.params.sid ?? ''
    this.date = this.$route.params.date ?? ''
    this.location = this.$route.params.location ?? ''
    if (this.sid == '' || this.date == '' || this.location == '') {
      this.$router.push('/')
    }
    this.record = await this.eBird(this.sid)
    this.birds = this.$offlineStorage.get('birds')
  },
  methods: {
    async eBird(sid) {
      return await this.$http
        .get(`https://api.ebird.org/v2/product/checklist/view/${sid}`, {
          headers: { 'X-eBirdApiToken': '23abgao7v09b' },
        })
        .then(ret => {
          return ret.data
        })
    },
  },
}
</script>
