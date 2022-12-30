<template lang="pug">
v-app
  v-navigation-drawer(app, 
      v-model="drawer",
      :clipped="$vuetify.breakpoint.lgAndUp")
    v-list( nav )
      v-list-item(:to="{name: '回首頁'}")
        v-list-item-avatar(size="24")
          v-icon {{icons.mdiCalendar}}          
        v-list-item-content
          v-list-item-title 例行活動
      v-list-item(:to="{name: '駐站解說'}")
        v-list-item-avatar(size="24")
          v-icon {{icons.mdiTelescope}}          
        v-list-item-content
          v-list-item-title 駐站解說
      v-list-item(:to="{name: '歷史記錄查詢'}")
        v-list-item-avatar(size="24")
          v-icon {{ icons.mdiFormatListBulleted }}          
        v-list-item-content
          v-list-item-title 歷史記錄查詢
      v-list-item(:to="{name: '例行路線查詢'}")
        v-list-item-avatar(size="24")
          v-icon {{icons.mdiMapMarkerPath}}
        v-list-item-content
          v-list-item-title 例行路線查詢
      v-list-item(:to="{name: '大型活動資訊'}")
        v-list-item-avatar(size="24")
          v-icon {{icons.mdiTrainCarPassenger}}
        v-list-item-content
          v-list-item-title 大型活動資訊
        v-list-item-icon(v-if="new_data")
          v-icon(color="orange") {{icons.mdiNewBox}}
      v-list-item(:to="{name: '關渡自然公園即時鳥況'}")
        v-list-item-avatar(size="24")
          v-icon {{icons.mdiPineTree}}
        v-list-item-content
          v-list-item-title 關渡自然公園即時鳥況
      v-divider
      v-list-item(:to="{name: '志工排班查詢'}")
        v-list-item-avatar(size="24")
          v-icon {{icons.mdiTableSearch}}
        v-list-item-content
          v-list-item-title 志工排班查詢
      v-divider      
      v-list-item(:to="{name: '實聯制個資設定'}")
        v-list-item-avatar(size="24")
          v-icon {{icons.mdiAccountCircle}}
        v-list-item-content
          v-list-item-title 實聯制個資設定
      v-list-item(:to="{name: '實聯制簽到表單'}")
        v-list-item-avatar(size="24")
          v-icon {{icons.mdiPencil}}
        v-list-item-content
          v-list-item-title 實聯制簽到表單
      v-divider
      v-list-item(:to="{name: '分享APP'}")
        v-list-item-avatar(size="24")
          v-icon {{icons.mdiShareVariant}}
        v-list-item-content
          v-list-item-title 分享APP
      v-list-item(:to="{name: '小額捐款'}")
        v-list-item-avatar(size="24")
          v-icon {{icons.mdiHeart}}
        v-list-item-content
          v-list-item-title 小額捐款
      v-list-item(:to="{name: '相關網站'}")
        v-list-item-avatar(size="24")            
          v-icon {{icons.mdiSitemap}}
        v-list-item-content
          v-list-item-title 相關網站
      v-divider
      v-list-item
        v-list-item-avatar(size="24")
          v-icon {{ icons.mdiBrightness4 }}     
        v-list-item-content
          v-list-item-title
            v-switch.ml-3(v-model="darkmode" @change="changemode" inset label="深色模式" dense)
      v-list-item(@click="refresh")
        v-list-item-avatar(size="24")
          v-icon {{ icons.mdiClockOutline }}     
        v-list-item-content
          v-list-item-subtitle
            | 編譯時間 
          v-list-item-subtitle.text-caption {{ builddate }}
      v-list-item(@click="refresh" v-if="version.length==5")
        v-list-item-avatar(size="24")
          v-icon {{ icons.mdiDatabase  }}     
        v-list-item-content
          v-list-item-subtitle
            | 資料版本
          v-list-item-subtitle.text-caption {{ version[0] }}

  v-app-bar(app, 
    color="light-green darken-3", 
    dense, dark,
    :clipped-left="$vuetify.breakpoint.lgAndUp")
    v-app-bar-nav-icon(@click.stop="drawer =! drawer")
    v-toolbar-title {{ title }}
    v-spacer
    v-icon(v-if='isOffline') {{ icons.mdiWifiStrengthOffOutline}}
    v-btn(v-if='new_data' :to="{name: '大型活動資訊'}" icon)
      v-icon {{icons.mdiEmailPlusOutline }}
    slot(name='toolbar')
  slot
  v-snackbar(v-model="installed" color="light-green darken-3" top timeout='15000')
      | 安裝至桌面,隨時可以查詢
      template(v-slot:action="{ attrs }")
        v-btn( @click="dismiss" text) 取消
        v-btn( @click="install" text) 安裝 
  v-snackbar(v-model="iosinstall" color="light-green darken-3" bottom timeout='30000' multiLine)
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
  mdiBrightness4,
  mdiDatabase,
  mdiPencil,
  mdiNewBox,
  mdiEmailPlusOutline,
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
      mdiBrightness4,
      mdiDatabase,
      mdiPencil,
      mdiNewBox,
      mdiEmailPlusOutline,
    },
    drawer: false,
    builddate: '',
    deferredPrompt: null,
    installed: false,
    iosinstall: false,
    darkmode: false,
    version: '',
    new_data: false,
  }),
  computed: {
    title() {
      return this.$route.name
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
    this.darkmode = this.$offlineStorage.get('darkmode')
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
    this.version = this.$offlineStorage.get('version') || []
    this.new_data = this.$offlineStorage.get('travel_new') || false
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
    refresh() {
      this.$offlineStorage.set('version', '')
      window.location.reload()
      window.location.href = '/'
    },
    changemode() {
      this.$offlineStorage.set('darkmode', this.darkmode)
      this.$vuetify.theme.dark = this.darkmode
    },
  },
}
</script>

<style></style>
