<template lang="pug">
wbst-header(title="分享北鳥例行APP")
  template(v-slot:toolbar)
    v-btn(icon v-if="isShare" @click="share")
      v-icon {{ icons.mdiShareVariant }}
  v-main
    v-container
      .d-flex.flex-column.justify-space-between.align-center.mt-10
        v-card(width="400")
          v-card-text
            v-img(src="@/assets/qrcode.png" max-height="400" max-width="400" centered)
</template>

<script>
import { mdiArrowLeft, mdiShareVariant } from '@mdi/js'
import WbstHeader from '@/components/WbstHeader.vue'
export default {
  name: 'Share',
  data: () => ({
    icons: { mdiArrowLeft, mdiShareVariant },
  }),
  components: { WbstHeader },
  computed: {
    isShare() {
      return navigator.share ?? false
    },
  },
  methods: {
    share() {
      if (navigator.share) {
        navigator.share({
          title: '北鳥例行APP',
          text: '分享北鳥例行 APP',
          url: 'https://wbst-act.github.io/2021/',
        })
      }
    },
  },
}
</script>
