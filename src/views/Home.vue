<template lang="pug">
  v-app
    v-navigation-drawer(app, 
      v-model="drawer",
      color="light-green lighten-5"
      :clipped="$vuetify.breakpoint.lgAndUp")
      v-list( nav, dense )
        v-list-item(to='/')
          v-list-item-title 本週例行
        v-list-item(:to="{name: '歷史記錄'}")
          v-list-item-title 歷史記錄查詢
        v-list-item(:to="{name: '例行路線'}")
          v-list-item-title 例行路線查詢
        v-list-item(:to="{name: '實名制'}")
          v-list-item-title 實名制個資設定
    v-app-bar(app, 
      color="light-green darken-3",
      dark,
      dense, 
      :clipped-left="$vuetify.breakpoint.lgAndUp")
      v-app-bar-nav-icon(@click.stop="drawer =! drawer")
      v-toolbar-title 北鳥 例行活動行事曆
    v-main
      router-view
      v-snackbar(:value="updateExists" :timeout="-1" color="blue-grey" centered)
        | 有新版本可以更新
        template(v-slot:action="{ attrs }")
          v-btn(@click="refreshApp" text dark) 更新
</template>

<script>
import update from '../mixins/update'
export default {
  name: 'Home',
  mixins: [update],
  data: () => ({
    drawer: false,
  }),
}
</script>
