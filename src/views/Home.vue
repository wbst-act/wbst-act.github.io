<template lang="pug">
wbst-header(title='北鳥 例行活動行事曆')
  calendar
  v-snackbar(:value="updateExists" :timeout="-1" color="light-green darken-3" centered)
    | 有新版本可以更新
    template(v-slot:action="{ attrs }")
      v-btn(@click="refreshApp" text dark) 更新
</template>

<script>
import update from '../mixins/update'
import WbstHeader from '@/components/WbstHeader.vue'
import Calendar from '@/components/Calendar.vue'
export default {
  name: 'Home',
  mixins: [update],
  components: { WbstHeader, Calendar },
  data: () => ({}),
  async mounted() {
    if (this.isOnline) {
      if (this.$offlineStorage.get('birds') == undefined) {
        await this.$http
          .get(
            'https://spreadsheets.google.com/feeds/list/1n645hY1C8FQnUsArDECXsMJ25qBBMMuh-cRw2jELGPg/1/public/full?alt=json'
          )
          .then(ret => {
            const birds = ret.data.feed.entry
              .map(item => ({
                speccode: item['gsx$speciescode']['$t'],
                birdname: item['gsx$commonname']['$t'],
              }))
              .reduce((result, item) => {
                result[item['speccode']] = item['birdname']
                return result
              })
            this.$offlineStorage.set('birds', birds)
          })
      }
    }
  },
}
</script>
