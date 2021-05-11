<template lang="pug">
  v-list
    template(v-for="item in history")
      v-list-item
        v-list-item-content
          v-list-item-title {{ item.date | moment('YYYY-MM-DD')}} 
          v-list-item-subtitle {{ item.name }}
        v-list-item-action(v-if="item.ebird!=''")
          v-btn(@click='ebird(item.ebird)') Bird List
          
      v-divider        
</template>

<script>
export default {
  name: 'History',
  data: () => ({
    history: [],
    birds: {},
  }),
  async mounted() {
    await this.$http
      .get(
        'https://spreadsheets.google.com/feeds/list/1H88Qx_-1OeZOOnsU2Bmmg-m2-XtBti05oCo9UggD3Sg/1/public/full?alt=json'
      )
      .then(ret => {
        const data = ret.data.feed.entry.map(item => ({
          name: item['gsx$name']['$t'],
          date: this.$moment(item['gsx$date']['$t'], 'YYYY/MM/DD'),
          ebird: item['gsx$ebird']['$t'],
        }))
        this.history = data.filter(item => item.date < this.$moment()).reverse()
      })
    await this.$http
      .get(
        'https://spreadsheets.google.com/feeds/list/1n645hY1C8FQnUsArDECXsMJ25qBBMMuh-cRw2jELGPg/1/public/full?alt=json'
      )
      .then(ret => {
        this.birds = ret.data.feed.entry
          .map(item => ({
            speccode: item['gsx$speciescode']['$t'],
            birdname: item['gsx$commonname']['$t'],
          }))
          .reduce((result, item) => {
            const key = item['specode']
            result[key] = item['birdname']
            return result
          })
      })
  },
  methods: {
    ebird(sid) {
      this.$http
        .get(`https://api.ebird.org/v2/product/checklist/view/${sid}`, {
          headers: { 'X-eBirdApiToken': '23abgao7v09b' },
        })
        .then(ret => {
          console.log(ret.data)
        })
    },
  },
}
</script>
