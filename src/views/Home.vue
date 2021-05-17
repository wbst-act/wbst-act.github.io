<template lang="pug">
wbst-header(title='台北鳥會例行活動行事曆')
  calendar
  v-snackbar(:value="updateExists" :timeout="-1" color="light-green darken-3" centered)
    | 有新版本可以更新
    template(v-slot:action="{ attrs }")
      v-btn(@click="refreshApp" text dark) 更新
</template>

<script>
import update from '../mixins/update'
import WbstHeader from '@/components/WbstHeader.vue'
import Calendar from '@/components/Calendar.vue'
export default {
  name: 'Home',
  mixins: [update],
  components: { WbstHeader, Calendar },
  data: () => ({}),
}
</script>
