<template lang="pug">
v-main
  v-alert.ma-2(type="info" border="top" colored-border  elevation="2") 
    .caption 到關渡自然公園賞鳥，記得紀錄eBird，選擇熱點 "台北關渡IBA--自然公園(Guandu IBA--Nature Park)"
  template(v-if="loading")
    v-progress-linear(color='green' indeterminate rounded height="6")
    v-skeleton-loader(type="list-item-avatar, list-item-avatar, list-item-avatar, list-item-avatar, list-item-avatar, list-item-avatar, list-item-avatar, list-item-avatar, list-item-avatar, list-item-avatar, list-item-avatar, list-item-avatar")
  template(v-else)
    v-list( dense v-if="record.length>0" )
      v-divider
      template(v-for="bird, index in record")
        v-list-item( :key="bird.speciesCode")
          v-list-item-avatar
            | {{ bird.howMany}}
          v-list-item-content
            v-list-item-title 
              | {{ birds[bird.speciesCode].name }}            
              span.float-right.caption {{ bird.obsDt | moment('YYYY-MM-DD')}}
        v-divider
    
    v-alert.ma-2(v-else type="error" border="top" colored-border  elevation="2")
      | 需連線到網際網路
</template>
<script>
import { mapState } from 'vuex'
import { mdiArrowLeft, mdiBird } from '@mdi/js'
export default {
  name: 'eBird',
  data: () => ({
    icons: {
      mdiArrowLeft,
      mdiBird,
    },
    record: null,
    birds: {},
    loading: true,
  }),
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
  async mounted() {
    this.loading = true
    await this.eBirdHotspot()
    this.loading = false
  },
  methods: {
    async eBirdHotspot() {
      if (this.isOnline) {
        return await this.$http
          .get(
            'https://api.ebird.org/v2/data/obs/L2329696/recent?back=30&hotspot=true',
            {
              headers: { 'X-eBirdApiToken': this.apikey },
            }
          )
          .then(async ret => {
            this.record = ret.data
          })
      } else {
        this.record = []
        return
      }
    },
    goto(subId) {
      if (this.isOnline) {
        this.$router.push({
          name: 'eBird記錄',
          params: { sid: subId },
        })
      }
    },
  },
}
</script>
