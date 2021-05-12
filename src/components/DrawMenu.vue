<template lang="pug">
  v-navigation-drawer(app, 
      v-model="drawer",
      :clipped="$vuetify.breakpoint.lgAndUp")
      v-list( nav, dense )
        v-list-item(to='/')
          v-list-item-avatar(size="24")
            v-icon {{icons.mdiCalendar}}          
          v-list-item-title 本週例行
        v-list-item(:to="{name: '歷史記錄'}")
          v-list-item-avatar(size="24")
            v-icon {{ icons.mdiFormatListBulleted }}          
          v-list-item-title 歷史記錄查詢
        v-list-item(:to="{name: '例行路線'}")
          v-list-item-avatar(size="24")
            v-icon {{icons.mdiMapMarkerPath}}
          v-list-item-title 例行路線查詢
        v-list-item()
          v-list-item-avatar(size="24")
            v-icon {{icons.mdiMapMarkerPath}}
          v-list-item-title 大型資訊活動(還沒做)
        v-list-item()
          v-list-item-avatar(size="24")
            v-icon {{icons.mdiMapMarkerPath}}
          v-list-item-title 排班查詢(還沒做)
        v-list-item(:to="{name: '實名制'}")
          v-list-item-avatar(size="24")
            v-icon {{icons.mdiAccountCircle}}
          v-list-item-title 實名制個資設定
</template>

<script>
import {
  mdiFormatListBulleted,
  mdiCalendar,
  mdiMapMarkerPath,
  mdiAccountCircle,
  mdiWifiStrengthOffOutline,
} from '@mdi/js'
export default {
  name: 'DrawMenu',
  props: ['drawer'],
  data: () => ({
    icons: {
      mdiFormatListBulleted,
      mdiCalendar,
      mdiMapMarkerPath,
      mdiAccountCircle,
      mdiWifiStrengthOffOutline,
    },
  }),
}
</script>
