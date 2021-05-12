<template lang="pug">
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
import { mdiFormatListBulleted } from '@mdi/js'
export default {
  name: 'History',
  data: () => ({
    icons: {
      mdiFormatListBulleted,
    },
    history: [],
  }),
  async created() {
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
        this.history = data.filter(item => item.date < this.$moment()).reverse()
      })
  },
  methods: {
    goto(item) {
      this.$router.push({
        name: 'eBird記錄',
        params: { sid: item.ebird, date: item.date, location: item.location },
      })
    },
  },
}
</script>
