<template lang="pug">
  ul
    li(v-for="item in list" :key="item.name")
      | {{item.city }} {{ item.name }}
</template>

<script>
export default {
  name: 'HelloWorld',
  data: () => ({
    list: [],
  }),
  mounted() {
    this.$http
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
    this.$http
      .get(
        'https://spreadsheets.google.com/feeds/list/1H88Qx_-1OeZOOnsU2Bmmg-m2-XtBti05oCo9UggD3Sg/1/public/full?alt=json'
      )
      .then(ret => console.log(ret.data))
  },
}
</script>
