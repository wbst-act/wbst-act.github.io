<template lang="pug">
v-main
  v-list(flat)
    template(v-for="travel in travels")      
      v-list-item(:key="travel.name" nav dense :href="travel.url" target="_blank")
        v-list-item-content.pa-1
          v-alert(border="left" color="yellow" colored-border elevation="2" dense)
            v-container         
              v-row
                v-col(cols="3" align-self="center") 
                  | {{ travel.date| moment('YYYY')}}
                v-col(cols="9") {{ travel.name }}
</template>

<script>
import { mdiStar } from '@mdi/js'
export default {
  name: 'Travel',
  data: () => ({
    icons: { mdiStar },
    travels: [],
  }),
  mounted() {
    this.travels = this.$offlineStorage.get('travels')
  },
}
</script>
