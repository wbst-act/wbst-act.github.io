<template lang="pug">
wbst-header(title='大型活動資訊')
  v-container
    v-card
      v-card-text 
        .display-1 Comming soon...
</template>

<script>
import WbstHeader from '@/components/WbstHeader.vue'
export default {
  name: 'Travel',
  components: { WbstHeader },
}
</script>
