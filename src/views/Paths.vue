<template lang="pug">
v-app
  draw-menu(:drawer='drawer')
  v-app-bar(app, 
    color="light-green darken-3",
    dark,
    dense, 
    :clipped-left="$vuetify.breakpoint.lgAndUp")
    v-app-bar-nav-icon(@click.stop="drawer =! drawer")
    v-toolbar-title 例行路線查詢
    v-spacer
    v-icon(v-if='isOffline') {{ icons.mdiWifiStrengthOffOutline}}
  v-main
    v-list( dense )
      template(v-for="item in paths" )
        v-list-item(v-if="item.locid!='' && isOnline" link :href="'https://ebird.org/hotspot/'+item.locid", target="_blank" :key="item.name")
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
import { mdiBird, mdiWifiStrengthOffOutline } from '@mdi/js'
import DrawMenu from '@/components/DrawMenu.vue'
export default {
  name: 'Paths',
  components: { DrawMenu },
  data: () => ({
    icons: { mdiBird, mdiWifiStrengthOffOutline },
    paths: [],
    drawer: false,
  }),
  async mounted() {
    if (this.isOnline) {
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
      this.$offlineStorage.set('paths', this.paths)
    } else {
      this.paths = this.$offlineStorage.get('paths')
    }
  },
}
</script>
