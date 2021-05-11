<template lang="pug">
v-list( dense )
  template(v-for="item in list")
    v-list-item(:key="name")
      v-list-item-content
        v-list-item-title {{ item.name }}
        v-list-item-subtitle {{ item.location }} {{ item.time}}
    v-divider
    
</template>

<script>
export default {
  name: 'Paths',
  data: () => ({ list: [] }),
  async mounted() {
    await this.$http
      .get(
        'https://spreadsheets.google.com/feeds/list/1q1h-GR3uGtvckUh7lu10VI0dxSBjBKy5dGPB9W47QSE/1/public/full?alt=json'
      )
      .then(
        ret =>
          (this.list = ret.data.feed.entry.map(item => ({
            name: item['gsx$name']['$t'],
            city: item['gsx$city']['$t'],
            location: item['gsx$location']['$t'],
            loc: item['gsx$loc']['$t'],
            lat: item['gsx$lat']['$t'],
            time: item['gsx$time']['$t'],
          })))
      )
  },
}
</script>
