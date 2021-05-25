<template lang="pug">
v-main
  v-list( dense )
    template(v-for="item in paths" )
      v-list-item(v-if="item.locid!='' && isOnline" link :href="'https://ebird.org/hotspot/'+item.locid", target="_blank" :key="item.name")
        v-list-item-avatar(size="24")
          v-icon(color="green") {{icons.mdiBird}}
        v-list-item-content
          v-list-item-title
            | {{ item.name }}            
            span.float-right {{ item.location }} {{ item.time}}
          v-list-item-subtitle  {{ item.ebirdname }}             
        
      v-list-item(v-else :key="item.name")
        v-list-item-avatar(size="24")
          v-icon(color="green") {{icons.mdiBird}}
        v-list-item-content
          v-list-item-title
            | {{ item.name }}            
            span.float-right {{ item.location }} {{ item.time}}
      v-divider    
</template>

<script>
import { mdiBird } from '@mdi/js'
export default {
  name: 'Paths',
  data: () => ({
    icons: { mdiBird },
    paths: [],
  }),
  mounted() {
    this.paths = this.$offlineStorage.get('paths')
  },
}
</script>
