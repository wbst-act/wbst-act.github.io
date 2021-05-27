<template lang="pug">
v-main
  v-container(fluid )
    template(v-for="travel in travels")
      v-alert(:key="travel.name" border="left" color="yellow" colored-border elevation="2" dense)
        v-container         
          v-row
            v-col(cols="3") {{ travel.date| moment('MM-DD')}}
            v-col(cols="7") {{ travel.name }}
            v-col(cols="2")
              v-btn(link icon :href="travel.url" target="_blank" )
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
  },
}
</script>
