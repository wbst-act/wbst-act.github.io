<template lang="pug">
v-dialog(v-model="dialog" fullscreen hide-overlay @click:outside="$emit('ebird-close')" persistent)
  template(v-if="loading")
    v-card
      v-toolbar(color="light-green darken-3", dark, dense)
        v-toolbar-title 連線查詢記錄中...
      v-sheet
        v-progress-linear(color='green' indeterminate rounded height="6")
        v-skeleton-loader(type="list-item, \
          list-item-avatar, list-item-avatar, \
          list-item-avatar, list-item-avatar, \
          list-item-avatar, list-item-avatar, \
          list-item-avatar, list-item-avatar, \
          list-item-avatar, list-item-avatar, \
          list-item-avatar, list-item-avatar, \
          list-item-avatar, list-item-avatar, \
          list-item-avatar, list-item-avatar, \
          list-item-avatar, list-item-avatar, \
          list-item-avatar, list-item-avatar")
  template(v-else)
    v-card
      v-toolbar(color="light-green darken-3", dark, dense)
        v-toolbar-title {{ date | moment('YYYY-MM-DD')}} {{ event.name }}
        v-spacer
        v-btn(icon @click="$emit('ebird-close')")
          v-icon {{ icons.mdiClose}}
      v-sheet
        v-list(dense)
          v-list-item
            v-list-item-content
              v-list-item-title 
                | {{ event.leader.join(' ')}}
              v-list-item-subtitle(v-if="event.people > 0 ")
                | 參與 {{ event.people }} 人
              v-list-item-subtitle
                | 共{{ getfamily }}科 {{ record.length }}種
            v-list-item-action
              v-btn(:href="`https://ebird.org/checklist/${event.ebird}`" target="_blank" icon)
                v-icon(color="green") {{ icons.mdiBird }}                
        v-list( dense )
          v-divider
          template(v-for="bird, index in record")
            v-list-item( :key="bird.speciesCode" )
              v-list-item-avatar
                | {{ bird.howManyStr}}
              v-list-item-content
                v-list-item-title 
                  | {{ birds[bird.speciesCode].name }}
                  span.float-right.caption(v-if="index==0 || (index-1 >= 0  && birds[record[index-1].speciesCode].family != birds[bird.speciesCode].family)") {{ birds[bird.speciesCode].family }}
                v-list-item-subtitle(v-if="bird.comments") {{ bird.comments }}
                  
            v-divider
</template>

<script>
import { mdiBird, mdiClose } from '@mdi/js'
import { mapState } from 'vuex'
export default {
  name: 'EbirdDialog',
  props: ['dialog', 'event'],
  data: () => ({
    icons: {
      mdiBird,
      mdiClose,
    },
    record: null,
    birds: {},
    loading: true,
  }),
  watch: {
    async dialog(newValue) {
      if (newValue) {
        if (this.event.ebird && this.dialog) {
          this.loading = true
          await this.eBird(this.event.ebird)
          this.loading = false
        }
      }
    },
  },
  created() {
    this.birds = this.$offlineStorage.get('birds')
  },
  computed: {
    ...mapState(['apikey']),
    getfamily() {
      const family = []
      this.record.forEach(item => {
        if (family.indexOf(this.birds[item.speciesCode].family) == -1) {
          family.push(this.birds[item.speciesCode].family)
        }
      })
      return family.length
    },
  },
  methods: {
    async eBird(sid) {
      return await this.$http
        .get(`https://api.ebird.org/v2/product/checklist/view/${sid}`, {
          headers: { 'X-eBirdApiToken': this.apikey },
        })
        .then(async ret => {
          this.date = this.$moment(ret.data.obsDt, 'YYYY-MM-DD HH:SS')
          //this.location = await this.HotspotName(ret.data.locId)
          this.record = ret.data.obs
        })
        .catch(() => {
          this.$emit('ebird-close')
        })
    },
    async HotspotName(locId) {
      return await this.$http
        .get(`https://api.ebird.org/v2/ref/hotspot/info/${locId}`, {
          headers: { 'X-eBirdApiToken': this.apikey },
        })
        .then(ret => {
          return ret.data.name
        })
        .catch(() => {
          return '私人熱點'
        })
    },
  },
}
</script>
