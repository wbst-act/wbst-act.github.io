<template lang="pug">
v-main
  v-main
    v-container
      .d-flex.flex-column.justify-space-between.align-center.mt-5
        v-card(width="400")
          v-card-text
            v-img(src="@/assets/qrcode.png" max-height="400" max-width="400" centered)
    v-btn(v-if="isShare" @click="share" fixed, dark, fab, bottom, right, color="green")
      v-icon {{ icons.mdiShareVariant }}
</template>

<script>
import { mdiArrowLeft, mdiShareVariant } from '@mdi/js'
export default {
  name: 'Share',
  data: () => ({
    icons: { mdiArrowLeft, mdiShareVariant },
  }),
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
