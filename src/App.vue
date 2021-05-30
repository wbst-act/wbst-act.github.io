<template lang="pug">
  wbst-header
    router-view 
    v-snackbar(:value="updateExists" :timeout="-1" color="light-green darken-3" centered)
      | 有新版本可以更新
      template(v-slot:action="{ attrs }")
        v-btn(@click="refreshApp" text dark) 更新
</template>
<script>
import update from '@/mixins/update'
import WbstHeader from '@/components/WbstHeader.vue'
export default {
  name: 'App',
  mixins: [update],
  components: { WbstHeader },
  async mounted() {
    this.$vuetify.theme.dark = this.$offlineStorage.get('darkmode')
    if (this.isOnline) {
      const version = this.$offlineStorage.get('version')
      const new_version = await this.$http
        .get(
          'https://spreadsheets.google.com/feeds/list/1H88Qx_-1OeZOOnsU2Bmmg-m2-XtBti05oCo9UggD3Sg/6/public/full?alt=json'
        )
        .then(ret => {
          return ret.data.feed.entry[0]['gsx$version']['$t']
        })
      if (new_version != version) {
        await this.update()
        this.$offlineStorage.set('version', new_version)
      }
    }
  },
  methods: {
    async update() {
      await this.$http
        .get(
          'https://spreadsheets.google.com/feeds/list/1H88Qx_-1OeZOOnsU2Bmmg-m2-XtBti05oCo9UggD3Sg/3/public/full?alt=json'
        )
        .then(ret => {
          const birds = ret.data.feed.entry
            .map(item => ({
              speccode: item['gsx$speciescode']['$t'],
              birdname: item['gsx$commonname']['$t'],
              family: item['gsx$family']['$t'],
            }))
            .reduce((result, item) => {
              result[item['speccode']] = {
                name: item['birdname'],
                family: item['family'],
              }
              return result
            })
          this.$offlineStorage.set('birds', birds)
        })

      await this.$http
        .get(
          'https://spreadsheets.google.com/feeds/list/1H88Qx_-1OeZOOnsU2Bmmg-m2-XtBti05oCo9UggD3Sg/2/public/full?alt=json'
        )
        .then(ret => {
          const paths = ret.data.feed.entry.map(item => ({
            name: item['gsx$name']['$t'],
            location: item['gsx$location']['$t'],
            bus: item['gsx$bus']['$t'],
            pluscode: item['gsx$pluscode']['$t'],
            time: item['gsx$starttime']['$t'],
            ebirdname: item['gsx$ebirdname']['$t'],
            locid: item['gsx$hotspot']['$t'],
          }))
          this.$offlineStorage.set('paths', paths)
        })

      await this.$http
        .get(
          'https://spreadsheets.google.com/feeds/list/1H88Qx_-1OeZOOnsU2Bmmg-m2-XtBti05oCo9UggD3Sg/4/public/full?alt=json'
        )
        .then(ret => {
          const sites = ret.data.feed.entry.map(item => ({
            name: item['gsx$name']['$t'],
            url: item['gsx$url']['$t'],
          }))
          this.$offlineStorage.set('sites', sites)
        })

      await this.$http
        .get(
          'https://spreadsheets.google.com/feeds/list/1H88Qx_-1OeZOOnsU2Bmmg-m2-XtBti05oCo9UggD3Sg/5/public/full?alt=json'
        )
        .then(ret => {
          const travels = ret.data.feed.entry.map(item => ({
            date: item['gsx$date']['$t'],
            name: item['gsx$name']['$t'],
            url: item['gsx$url']['$t'],
          }))
          this.$offlineStorage.set('travels', travels)
        })
    },
  },
}
</script>
