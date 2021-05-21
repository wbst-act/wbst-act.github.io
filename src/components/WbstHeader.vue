<template lang="pug">
v-app
  v-navigation-drawer(app, 
      v-model="drawer",
      :clipped="$vuetify.breakpoint.lgAndUp")
    v-list( nav, dense )
      v-list-item(:to="{name: '台北鳥會例行活動行事曆'}")
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
      v-list-item(:to="{name: '關渡自然公園即時鳥況'}")
        v-list-item-avatar(size="24")
          v-icon {{icons.mdiPineTree}}
        v-list-item-content
          v-list-item-title 關渡自然公園即時鳥況
      v-divider
      v-list-item(:to="{name: '排班查詢'}")
        v-list-item-avatar(size="24")
          v-icon {{icons.mdiTableSearch}}
        v-list-item-content
          v-list-item-title 志工排班查詢
      v-divider      
      v-list-item(:to="{name: '實名制個資設定'}")
        v-list-item-avatar(size="24")
          v-icon {{icons.mdiAccountCircle}}
        v-list-item-content
          v-list-item-title 實名制個資設定
      v-divider
      v-list-item(:to="{name: '分享'}")
        v-list-item-avatar(size="24")
          v-icon {{icons.mdiShareVariant}}
        v-list-item-content
          v-list-item-title 分享APP
      v-list-item(:to="{name: '電子發票捐贈碼'}")
        v-list-item-avatar(size="24")
          v-icon {{icons.mdiHeart}}
        v-list-item-content
          v-list-item-title 電子發票捐贈碼
      v-list-item(:to="{name: '相關網站'}")
        v-list-item-avatar(size="24")            
          v-icon {{icons.mdiSitemap}}
        v-list-item-content
          v-list-item-title 相關網站
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
    slot(name='toolbar')
  slot
  v-snackbar(v-model="installed" color="light-green darken-3" top timeout='15000')
      | 安裝至桌面,隨時可以查詢
      template(v-slot:action="{ attrs }")
        v-btn( @click="dismiss" text) 取消
        v-btn( @click="install" text) 安裝 
  v-snackbar(v-model="iosinstall" color="light-green darken-3" top timeout='30000' multiLine)
    div
      | 安裝至桌面,隨時可以查詢
    div 
      | iOS使用者, 請使用Safari開啟, 選擇分享
      v-icon {{ icons.mdiExportVariant}}
      | 後 加入主畫面
      v-icon {{ icons.mdiPlusBoxOutline }}
    
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
  mdiShareVariant,
  mdiHeart,
  mdiPineTree,
  mdiExportVariant,
  mdiPlusBoxOutline,
} from '@mdi/js'

export default {
  name: 'WbstHeader',
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
      mdiShareVariant,
      mdiHeart,
      mdiPineTree,
      mdiExportVariant,
      mdiPlusBoxOutline,
    },
    drawer: false,
    builddate: '',
    deferredPrompt: null,
    installed: false,
    iosinstall: false,
  }),
  computed: {
    title(){
      return this.$route.name;
    },
    isShare() {
      return navigator.share
    },
    isIos() {
      return /iphone|ipad|ipod|mac/.test(
        window.navigator.userAgent.toLowerCase()
      )
    },
    isInStandaloneMode() {
      return !('standalone' in window.navigator && window.navigator.standalone)
    },
    userAgent() {
      return window.navigator.userAgent.toLowerCase()
    },
  },
  created() {
    window.addEventListener('beforeinstallprompt', e => {
      e.preventDefault()
      if (this.$cookies.get('add-to-home-screen') == undefined) {
        this.installed = true
        this.deferredPrompt = e
      }
    })
    window.addEventListener('appinstalled', () => {
      this.installed = false
      this.deferredPrompt = null
    })
  },
  mounted() {
    this.builddate = this.$moment(
      new Date(parseInt(document.documentElement.dataset.buildTimestamp))
    ).format('YYYY-MM-DD HH:mm')
    this.iosinstall = this.isIos && this.isInStandaloneMode
  },
  methods: {
    async dismiss() {
      this.$cookies.set('add-to-home-screen', '15d')
      this.installed = false
      this.deferredPrompt = null
    },
    async install() {
      this.deferredPrompt.prompt()
    },
  },
}
</script>

<style></style>
