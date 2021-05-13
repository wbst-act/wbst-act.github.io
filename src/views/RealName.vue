<template lang="pug">
wbst-header(title='實名制個資設定')
  v-container    
    v-card
      v-container(fluid)
        v-row 
          v-col
            v-text-field(label='姓名' v-model='name' dense)
        v-row 
          v-col
            v-text-field(label='電話號碼(手機/市話皆可)' v-model='tel' dense)
        v-row 
          v-col
            v-radio-group(v-model='member' row, label='是否為台北鳥會會員？' dense)
              v-radio( label="是" value='是' )
              v-radio( label="否" value='否' )
    v-alert.mt-5(border="top" colored-border type="info" elevation="2") 設定後,下次執行實名制簽到會自動帶入個人資料
  v-btn(fixed, dark, fab, bottom, right, color="green", @click="save")
    v-icon {{icons.mdiContentSave}}
</template>
<script>
import { mdiContentSave } from '@mdi/js'
import WbstHeader from '@/components/WbstHeader.vue'
export default {
  name: 'RealName',
  components: { WbstHeader },
  data: () => ({
    icons: {
      mdiContentSave,
    },
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
