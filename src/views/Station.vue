<template lang="pug">
wbst-header(title='駐站解說')
  v-container
    v-card
      v-card-text 
        calendar-station
</template>

<script>
import WbstHeader from '@/components/WbstHeader.vue'
import CalendarStation from '@/components/CalendarStation.vue'
export default {
  name: 'Station',
  components: { WbstHeader, CalendarStation },
}
</script>
