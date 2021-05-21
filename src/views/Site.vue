<template lang="pug">
v-main
  v-list(dense)
    template(v-for="site in sites")
      v-list-item(:key="site.name" link :href="site.url" target="_blank")
        v-list-item-avatar(size="24")
          v-icon(color="green") {{ icons.mdiStar}}  
        v-list-item-content
          v-list-item-title  {{ site.name }}  
      v-divider
</template>

<script>
import { mdiStar } from '@mdi/js'
export default {
  name: 'Travel',
  data: () => ({
    icons: { mdiStar },
    sites: [],
  }),
  mounted() {
    this.sites = this.$offlineStorage.get('sites')
  },
}
</script>
