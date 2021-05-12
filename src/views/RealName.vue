<template lang="pug">
v-app
  draw-menu(:drawer='drawer')
  v-app-bar(app, 
    color="light-green darken-3",
    dark,
    dense, 
    :clipped-left="$vuetify.breakpoint.lgAndUp")
    v-app-bar-nav-icon(@click.stop="drawer =! drawer")
    v-toolbar-title 實名制個資設定
    v-spacer
    v-icon(v-if='isOffline') {{ icons.mdiWifiStrengthOffOutline}}
  v-main
    v-container(fluid)
      v-row 
        v-col
          v-text-field(label='姓名' v-model='name')
      v-row 
        v-col
          v-text-field(label='電話號碼(手機/市話皆可)' v-model='tel')
      v-row 
        v-col
          v-radio-group(v-model='member' row, label='是否為台北鳥會會員？')
            v-radio( label="是" value='是' )
            v-radio( label="否" value='否' )
      v-btn(fixed, dark, fab, bottom, right, color="green", @click="save")
        v-icon {{icons.mdiContentSave}}
</template>
<script>
import { mdiContentSave, mdiWifiStrengthOffOutline } from '@mdi/js'
import DrawMenu from '@/components/DrawMenu.vue'
export default {
  name: 'RealName',
  components: { DrawMenu },
  data: () => ({
    icons: {
      mdiContentSave,
      mdiWifiStrengthOffOutline,
    },
    drawer: false,
    name: localStorage.getItem('name') ?? '',
    tel: localStorage.getItem('tel') ?? '',
    member: localStorage.getItem('member') ?? '否',
  }),
  methods: {
    save() {
      localStorage.setItem('name', this.name)
      localStorage.setItem('tel', this.tel)
      localStorage.setItem('member', this.member)
    },
  },
}
</script>
