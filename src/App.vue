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
import sheet from '@/mixins/sheet'
import WbstHeader from '@/components/WbstHeader.vue'
export default {
  name: 'App',
  mixins: [update, sheet],
  components: { WbstHeader },
  async mounted() {
    this.$vuetify.theme.dark = this.$offlineStorage.get('darkmode')
    if (this.isOnline) {
      const version = this.$offlineStorage.get('version')
      try {
        const ret = await this.$http.get(this.sheet_url(6))
        const data = this.sheet_format(ret.data.values)
        const new_version = data[0].version
        if (new_version != version) {
          await this.update()
          this.$offlineStorage.set('version', new_version)
        }
      } catch (err) {
        console.log('version', err)
      }
    }
  },
  methods: {
    async update() {
      // ebird bird data
      try {
        const ret = await this.$http.get(this.sheet_url(3))
        const data = this.sheet_format(ret.data.values)
        const birds = data
          .map(item => ({
            speccode: item.SPECIES_CODE,
            birdname: item.COMMON_NAME,
            family: item.FAMILY,
          }))
          .reduce((result, item) => {
            result[item['speccode']] = {
              name: item['birdname'],
              family: item['family'],
            }
            return result
          })
        this.$offlineStorage.set('birds', birds)
      } catch (err) {
        console.log('ebird鳥名錄', err)
      }

      // 例行路線
      try {
        const ret = await this.$http.get(this.sheet_url(2))
        const paths = this.sheet_format(ret.data.values)
        /*
        const paths = ret.data.feed.entry.map(item => ({
          name: item['gsx$name']['$t'],
          location: item['gsx$location']['$t'],
          bus: item['gsx$bus']['$t'],
          pluscode: item['gsx$pluscode']['$t'],
          time: item['gsx$starttime']['$t'],
          ebirdname: item['gsx$ebirdname']['$t'],
          locid: item['gsx$hotspot']['$t'],
        }))
        */
        this.$offlineStorage.set('paths', paths)
      } catch (err) {
        console.log('例行路線', err)
      }
      //相關網站
      try {
        const ret = await this.$http.get(this.sheet_url(4))
        const sites = this.sheet_format(ret.data.values)
        /*
        const sites = ret.data.feed.entry.map(item => ({
          name: item['gsx$name']['$t'],
          url: item['gsx$url']['$t'],
        }))
        */
        this.$offlineStorage.set('sites', sites)
      } catch (err) {
        console.log('相關網站', err)
      }

      //大型活動
      try {
        const ret = await this.$http.get(this.sheet_url(5))
        const travels = this.sheet_format(ret.data.values)
        /*
        const travels = ret.data.feed.entry.map(item => ({
          date: item['gsx$date']['$t'],
          name: item['gsx$name']['$t'],
          url: item['gsx$url']['$t'],
        }))
        */
        this.$offlineStorage.set('travels', travels)
      } catch (err) {
        console.log('相關網站', err)
      }
    },
  },
}
</script>
