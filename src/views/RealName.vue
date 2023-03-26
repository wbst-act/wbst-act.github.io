<template lang="pug">
v-main
  v-list
    template(v-for="item, index in users")
      v-list-item(:key="item.name" @click="edituser(index, item)")
        v-list-item-action
          v-icon(color="green") {{ icons.mdiPencil }}
        v-list-item-content
          v-list-item-title {{ item.name }}
      v-divider
    v-alert.ma-2(border="top" colored-border type="info" elevation="2") 
      .caption  設定後,下次執行活動簽到會自動帶入個人資料。家庭成員也可以設定多組資料。
  v-dialog(v-model='dialog')
    template(v-slot:activator="{on, attrs}")
      v-btn(fixed, dark, fab, bottom, right, color="green" @click="adduser")
        v-icon {{icons.mdiPlus}}
    v-card(dense)
      v-card
        v-toolbar.white--text(class="light-green darken-3"  dense)
          v-toolbar-title 活動報到個資設定
          v-spacer
          v-btn(v-if="userid!=-1" @click="del()" icon dark)
            v-icon {{ icons.mdiDelete }}
        v-list
          v-list-item          
            v-text-field(label='姓名' v-model='user.name' dense)
          v-list-item          
            v-text-field(label='電話號碼(手機/市話皆可)' v-model='user.tel' dense)
          v-list-item          
            v-radio-group(v-model='user.member' row, label='是否為台北鳥會會員？' dense)
              v-radio( label="是" value='是' )
              v-radio( label="否" value='否' )
        v-divider
        v-card-actions
          v-btn( @click="dialog=false" text color="red") 取消
          v-spacer
          v-btn( @click="save" text color="success" ) 存檔
</template>
<script>
import { mdiDelete, mdiPlus, mdiPencil } from '@mdi/js'
export default {
  name: 'RealName',
  data: () => ({
    icons: {
      mdiDelete,
      mdiPlus,
      mdiPencil,
    },
    dialog: false,
    users: [],
    user: {
      name: '',
      member: '否',
      tel: '',
    },
    userid: -1,
  }),
  mounted() {
    this.users = this.$offlineStorage.get('users') ?? []
  },
  methods: {
    adduser() {
      this.user = {
        name: '',
        member: '否',
        tel: '',
      }
      this.dialog = true
      this.userid = -1
    },
    edituser(index, user) {
      this.userid = index
      this.user = Object.assign({}, user)
      this.dialog = true
    },
    save() {
      if (this.userid == -1) {
        this.$set(this.users, this.users.length, this.user)
      } else {
        this.users[this.userid] = {
          name: this.user.name,
          tel: this.user.tel,
          member: this.user.member,
        }
      }
      this.$offlineStorage.set('users', this.users)
      this.dialog = false
    },
    del() {
      this.users.splice(this.userid, 1)
      this.$offlineStorage.set('users', this.users)
      this.dialog = false
    },
  },
}
</script>
