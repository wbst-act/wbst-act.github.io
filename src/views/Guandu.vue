<template lang="pug">
WbstHeader(title='關渡自然公園即時鳥況')
  v-list( dense )
    v-divider
    template(v-for="bird, index in record")
      v-list-item( :key="bird.speciesCode")
        v-list-item-avatar
          | {{ bird.howMany}}
        v-list-item-content
          v-list-item-title 
            | {{ birds[bird.speciesCode].name }}            
            span.float-right {{ bird.obsDt}}
      v-divider
</template>
<script>
import WbstHeader from '@/components/WbstHeader.vue'
import { mdiArrowLeft, mdiBird } from '@mdi/js'
export default {
  name: 'eBird',
  components: { WbstHeader },
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
      return await this.$http
        .get(
          'https://api.ebird.org/v2/data/obs/L2329696/recent?back=30&hotspot=true',
          {
            headers: { 'X-eBirdApiToken': '23abgao7v09b' },
          }
        )
        .then(async ret => {
          this.record = ret.data
        })
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
