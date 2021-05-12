<template lang="pug">
v-app
  draw-menu(:drawer='drawer')
  v-app-bar(app, 
    color="light-green darken-3",
    dark,
    dense, 
    :clipped-left="$vuetify.breakpoint.lgAndUp")
    v-app-bar-nav-icon(@click.stop="drawer =! drawer")
    v-toolbar-title 歷史記錄查詢
    v-spacer
    v-icon(v-if='isOffline') {{ icons.mdiWifiStrengthOffOutline}}
  v-main
    v-list
      template(v-for="item in history")
        v-list-item(v-if="item.ebird!=''" link @click='goto(item)')
          v-list-item-content
            v-list-item-title {{ item.date | moment('YYYY-MM-DD')}} 
            v-list-item-subtitle {{ item.location }}
          v-list-item-action          
            v-icon(color='green' dark) {{ icons.mdiFormatListBulleted }}
        v-list-item(v-else)
          v-list-item-content
            v-list-item-title {{ item.date | moment('YYYY-MM-DD')}} 
            v-list-item-subtitle {{ item.location }}
        v-divider        
</template>

<script>
import { mdiFormatListBulleted, mdiWifiStrengthOffOutline } from '@mdi/js'
import DrawMenu from '@/components/DrawMenu.vue'
export default {
  name: 'History',
  components: { DrawMenu },
  data: () => ({
    icons: {
      mdiFormatListBulleted,
      mdiWifiStrengthOffOutline,
    },
    drawer: false,
    history: [],
  }),
  async mounted() {
    if (this.isOnline) {
      await this.$http
        .get(
          'https://spreadsheets.google.com/feeds/list/1H88Qx_-1OeZOOnsU2Bmmg-m2-XtBti05oCo9UggD3Sg/1/public/full?alt=json'
        )
        .then(ret => {
          const data = ret.data.feed.entry.map(item => ({
            location: item['gsx$name']['$t'],
            date: this.$moment(item['gsx$date']['$t'], 'YYYY/MM/DD'),
            ebird: item['gsx$ebird']['$t'],
          }))
          this.history = data
            .filter(item => item.date < this.$moment())
            .reverse()
        })
      this.$offlineStorage.set('history', this.history)
    } else {
      this.history = this.$offlineStorage.get('history')
    }
  },
  methods: {
    goto(item) {
      if (this.isOnline) {
        this.$router.push({
          name: 'eBird記錄',
          params: { sid: item.ebird, date: item.date, location: item.location },
        })
      }
    },
  },
}
</script>
