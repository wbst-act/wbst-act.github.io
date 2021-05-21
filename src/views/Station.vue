<template lang="pug">
wbst-header(title='駐站解說')
  station-list
</template>

<script>
import WbstHeader from '@/components/WbstHeader.vue'
import StationList from '@/components/StationList.vue'
export default {
  name: 'Station',
  components: { WbstHeader, StationList },
}
</script>
