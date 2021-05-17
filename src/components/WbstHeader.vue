<template lang="pug">
v-app
  v-navigation-drawer(app, 
      v-model="drawer",
      :clipped="$vuetify.breakpoint.lgAndUp")
    v-list( nav, dense )
      v-list-item(to='/')
        v-list-item-avatar(size="24")
          v-icon {{icons.mdiCalendar}}          
        v-list-item-content
          v-list-item-title 例行活動
      v-list-item(:to="{name: '駐站解說'}")
        v-list-item-avatar(size="24")
          v-icon {{icons.mdiTelescope}}          
        v-list-item-content
          v-list-item-title 駐站解說
      v-list-item(:to="{name: '歷史記錄'}")
        v-list-item-avatar(size="24")
          v-icon {{ icons.mdiFormatListBulleted }}          
        v-list-item-content
          v-list-item-title 歷史記錄查詢
      v-list-item(:to="{name: '例行路線'}")
        v-list-item-avatar(size="24")
          v-icon {{icons.mdiMapMarkerPath}}
        v-list-item-content
          v-list-item-title 例行路線查詢
      v-list-item(:to="{name: '大型活動資訊'}")
        v-list-item-avatar(size="24")
          v-icon {{icons.mdiTrainCarPassenger}}
        v-list-item-content
          v-list-item-title 大型活動資訊
      v-divider
      v-list-item(:to="{name: '排班查詢'}")
        v-list-item-avatar(size="24")
          v-icon {{icons.mdiTableSearch}}
        v-list-item-content
          v-list-item-title 志工排班查詢
      v-divider
      v-list-item(:to="{name: '相關網站'}")
        v-list-item-avatar(size="24")            
          v-icon {{icons.mdiSitemap}}
        v-list-item-content
          v-list-item-title 相關網站
      v-divider
      v-list-item(:to="{name: '實名制'}")
        v-list-item-avatar(size="24")
          v-icon {{icons.mdiAccountCircle}}
        v-list-item-content
          v-list-item-title 實名制個資設定
      v-divider
      v-list-item
        v-list-item-avatar(size="24")
          v-icon {{ icons.mdiClockOutline }}     
        v-list-item-content
          v-list-item-subtitle
            | 編譯時間 {{ builddate }}

  v-app-bar(app, 
    color="light-green darken-3",
    dark,
    dense, 
    :clipped-left="$vuetify.breakpoint.lgAndUp")
    v-app-bar-nav-icon(@click.stop="drawer =! drawer")
    v-toolbar-title {{ title }}
    v-spacer
    v-icon(v-if='isOffline') {{ icons.mdiWifiStrengthOffOutline}}
  v-main  
    slot
</template>

<script>
import {
  mdiFormatListBulleted,
  mdiCalendar,
  mdiTelescope,
  mdiMapMarkerPath,
  mdiAccountCircle,
  mdiWifiStrengthOffOutline,
  mdiTrainCarPassenger,
  mdiTableSearch,
  mdiClockOutline,
  mdiSitemap,
} from '@mdi/js'

export default {
  name: 'WbstHeader',
  props: ['title'],
  data: () => ({
    icons: {
      mdiFormatListBulleted,
      mdiCalendar,
      mdiTelescope,
      mdiMapMarkerPath,
      mdiAccountCircle,
      mdiWifiStrengthOffOutline,
      mdiTrainCarPassenger,
      mdiTableSearch,
      mdiClockOutline,
      mdiSitemap,
    },
    drawer: false,
    builddate: '',
  }),
  mounted() {
    this.builddate = this.$moment(
      new Date(parseInt(document.documentElement.dataset.buildTimestamp))
    ).format('YYYY-MM-DD HH:mm')
  },
}
</script>

<style></style>
