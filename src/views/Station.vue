<template lang="pug">
wbst-header(title='駐站')
  v-container
    v-card
      v-card-text 
        .display-1 Comming soon...
</template>

<script>
import WbstHeader from '@/components/WbstHeader.vue'
export default {
  name: 'Station',
  components: { WbstHeader },
}
</script>
