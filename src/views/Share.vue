<template lang="pug">
v-main
  v-container
    template(v-if="page=='0'")
      .d-flex.flex-column.justify-space-between.align-center.mt-10
        v-card(width="400" color="white")
          v-card-text
            v-img(src="@/assets/qrcode.png" max-height="400" max-width="400" centered)
    template(v-if="page=='1'")
      .d-flex.flex-column.justify-space-between.align-center.mt-10
        v-card(width="400" color="white")
          v-card-text
            v-img(src="@/assets/wbst_app_qrcode.png" max-height="400" max-width="400" centered)
        .d-flex.flex-column.justify-space-between.align-center Play商店搜尋 北鳥例行
  v-bottom-navigation(v-model='page' app grow)
    v-btn(page='0')
      v-icon {{icons.mdiAppleIos}}
      | Web版(iOS)
    v-btn(page='1')
      v-icon {{icons.mdiAndroid}}
      | Android Play 商店
</template>

<script>
import { mdiArrowLeft, mdiAppleIos, mdiAndroid } from '@mdi/js'
export default {
  name: 'Share',
  data: () => ({
    icons: { mdiArrowLeft, mdiAppleIos, mdiAndroid },
    page: 0,
  }),
}
</script>
