<template lang="pug">
v-list( dense )
  template(v-for="item in paths" )
    v-list-item(v-if="item.locid!=''" link :href="'https://ebird.org/hotspot/'+item.locid", target="_blank" :key="item.name")
      v-list-item-content
        v-list-item-title {{ item.name }}
        v-list-item-subtitle {{ item.location }} {{ item.time}}
      v-list-item-action
        v-icon(color="green") {{icons.mdiBird}}
    v-list-item(v-else :key="item.name")
      v-list-item-content
        v-list-item-title {{ item.name }}
        v-list-item-subtitle {{ item.location }} {{ item.time}}
    v-divider
    
</template>

<script>
import { mdiBird } from '@mdi/js'
export default {
  name: 'Paths',
  data: () => ({
    icons: { mdiBird },
    paths: [],
  }),
  async mounted() {
    await this.$http
      .get(
        'https://spreadsheets.google.com/feeds/list/1q1h-GR3uGtvckUh7lu10VI0dxSBjBKy5dGPB9W47QSE/1/public/full?alt=json'
      )
      .then(
        ret =>
          (this.paths = ret.data.feed.entry.map(item => ({
            name: item['gsx$name']['$t'],
            city: item['gsx$city']['$t'],
            location: item['gsx$location']['$t'],
            loc: item['gsx$loc']['$t'],
            lat: item['gsx$lat']['$t'],
            time: item['gsx$time']['$t'],
            locid: item['gsx$hotspotid']['$t'],
          })))
      )
  },
}
</script>
