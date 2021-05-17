<template lang="pug">
wbst-header(title='歷史記錄查詢')
  v-skeleton-loader(type="list-item-avatar, list-item-avatar, list-item-avatar, list-item-avatar" v-if="loading")
  v-list(v-else)
    template(v-for="item in history")
      v-list-item(v-if="item.ebird!=''" link @click='goto(item)')
        template(v-if='item.watchbirds > 0')
          v-list-item-avatar.white--text(color='green' size='36') {{ item.watchbirds}}
        template(v-else)
          v-list-item-avatar(size='28')          
        v-list-item-content
          v-list-item-title 
            | {{ item.location }}
            span.caption.float-right {{ item.leader.join(' ')}}
          v-list-item-subtitle 
            | {{ item.date | moment('YYYY-MM-DD')}} 
            span.float-right(v-if='item.people > 0') 參與 {{ item.people }} 人
          
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
            span.caption.float-right {{ item.leader.join(' ')}}
          v-list-item-subtitle
            | {{ item.date | moment('YYYY-MM-DD')}} 
            span.float-right(v-if='item.people > 0') 參與 {{ item.people }} 人
        v-list-item-action
      v-divider        
</template>

<script>
import { mdiFormatListBulleted } from '@mdi/js'
import WbstHeader from '@/components/WbstHeader.vue'
export default {
  name: 'History',
  components: { WbstHeader },
  data: () => ({
    icons: {
      mdiFormatListBulleted,
    },
    history: [],
    loading: true,
  }),
  async mounted() {
    this.loading = true
    if (this.isOnline) {
      await this.$http
        .get(
          'https://spreadsheets.google.com/feeds/list/1H88Qx_-1OeZOOnsU2Bmmg-m2-XtBti05oCo9UggD3Sg/1/public/full?alt=json'
        )
        .then(ret => {
          const data = ret.data.feed.entry
            .filter(
              item =>
                ['例行', '周末派', '白頭翁'].includes(item['gsx$type']['$t']) &&
                item['gsx$cancel']['$t'] == ''
            )
            .map(item => ({
              location: item['gsx$name']['$t'],
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
          this.history = data
            .filter(item => item.date < this.$moment())
            .reverse()
        })
      this.$offlineStorage.set('history', this.history)
    } else {
      this.history = this.$offlineStorage.get('history')
    }
    this.loading = false
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
