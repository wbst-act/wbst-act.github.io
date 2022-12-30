<template lang="pug">
v-main
  v-container(fluid )
    template(v-for="travel in travels")
      v-alert(:key="travel.name" border="left" color="yellow" colored-border elevation="2" dense)
        v-list
          v-list-item(dense link icon :href="travel.url" target="_blank" )
            v-list-item-content
              v-list-item-title {{ travel.name }}
              v-list-item-subtitle 活動日期: {{ travel.date| moment('yyyy-MM-DD')}}
              v-list-item-subtitle 活動天數: {{ travel.days }}
            v-list-item-action              
              v-icon {{ icons.mdiLogin }}

</template>

<script>
import { mdiLogin } from '@mdi/js'
export default {
  name: 'Travel',
  data: () => ({
    icons: { mdiLogin },
    travels: [],
  }),
  mounted() {
    this.travels = this.$offlineStorage.get('travels')
    this.$offlineStorage.set('travel_new', false)
  },
}
</script>
