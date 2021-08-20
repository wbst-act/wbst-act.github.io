<template lang="pug">
v-main
  v-alert.ma-2(type="info" border="top" colored-border  elevation="2") 
    .caption  例行活動結束,記錄員如果會使用eBird,請分享記錄給"wbst act",加速資料更新。
  v-skeleton-loader(v-if="loading", 
    type="list-item-avatar-two-line, list-item-avatar-two-line, \
      list-item-avatar-two-line,list-item-avatar-two-line, \
      list-item-avatar-two-line,list-item-avatar-two-line, \
      list-item-avatar-two-line,list-item-avatar-two-line, \
      list-item-avatar-two-line,list-item-avatar-two-line, \
      list-item-avatar-two-line,list-item-avatar-two-line")
  v-list(v-else)
    v-divider  
    template(v-for="item in history")
      v-list-item(v-if="item.ebird!=''" link @click='goto(item)')
        template(v-if='item.watchbirds > 0')
          v-list-item-avatar.white--text(color='green' size='36') {{ item.watchbirds}}
        template(v-else)
          v-list-item-avatar(size='28')          
        v-list-item-content
          v-list-item-title
            | {{ item.name }}
            span.caption.float-right {{ item.date | moment('YYYY-MM-DD')}} 
        v-list-item-action      
          v-icon(color='green' dark) {{ icons.mdiFormatListBulleted }}
      v-list-item(v-else)
        template(v-if='item.watchbirds > 0')
          v-list-item-avatar.white--text(color='green' size='36') {{ item.watchbirds}}
        template(v-else)
          v-list-item-avatar(size='28')
        v-list-item-content
          v-list-item-title
            | {{ item.location }}
            span.caption.float-right {{ item.date | moment('YYYY-MM-DD')}} 
        v-list-item-action
      v-divider
  ebird-dialog(:dialog='dialog' :event='selectedEvent' @ebird-close="dialog=false")
</template>

<script>
import { mdiFormatListBulleted } from '@mdi/js'
import EbirdDialog from '@/components/EbirdDialog.vue'
import sheet from '@/mixins/sheet'
export default {
  name: 'History',
  mixins: [sheet],
  components: { EbirdDialog },
  data: () => ({
    icons: {
      mdiFormatListBulleted,
    },
    history: [],
    selectedEvent: null,
    loading: true,
    dialog: false,
    sid: '',
  }),
  async mounted() {
    this.loading = true
    if (this.isOnline) {
      try {
        const ret = await this.$http.get(this.sheet_url(1))
        const data = this.sheet_format(ret.data.values)
        const records = data
          .filter(
            item =>
              ['例行', '周末派', '白頭翁'].includes(item.type) &&
              item.cancel != 'y'
          )
          .map(item => ({
            name: item.name,
            date: this.$moment(item.date, 'YYYY/MM/DD'),
            people: item.people,
            watchbirds: item.watchbirds,
            ebird: item.ebird,
            leader: [item.p1, item.p2, item.p3, item.p4],
          }))
        /*
        const data = ret.data.feed.entry
          .filter(
            item =>
              ['例行', '周末派', '白頭翁'].includes(item['gsx$type']['$t']) &&
              item['gsx$cancel']['$t'] == ''
          )
          .map(item => ({
            name: item['gsx$name']['$t'],
            date: this.$moment(item['gsx$date']['$t'], 'YYYY/MM/DD'),
            people: item['gsx$people']['$t'],
            watchbirds: item['gsx$watchbirds']['$t'],
            ebird: item['gsx$ebird']['$t'],
            leader: [
              item['gsx$p1']['$t'],
              item['gsx$p2']['$t'],
              item['gsx$p3']['$t'],
              item['gsx$p4']['$t'],
            ],
          }))
          */
        this.history = records
          .filter(item => item.date < this.$moment())
          .reverse()
        this.$offlineStorage.set('history', this.history)
      } catch (err) {
        console.log('歷史記錄', err)
        this.history = this.$offlineStorage.get('history')
      }
    } else {
      this.history = this.$offlineStorage.get('history')
    }
    this.loading = false
  },
  methods: {
    goto(item) {
      if (this.isOnline) {
        this.selectedEvent = item
        if (this.selectedEvent && this.selectedEvent.ebird) this.dialog = true
      }
    },
  },
}
</script>
