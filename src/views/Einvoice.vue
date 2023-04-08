<template lang="pug">
v-main
  v-container
    template(v-if="page=='0'")
      .d-flex.flex-column.justify-space-between.align-center.mt-10
        v-card(width="400" color="white")
          v-card-text
            v-img(src="@/assets/1973999.png" max-height="400" max-width="400" centered)
        .d-flex.flex-column.justify-space-between.align-center {{ $t('__msg_1973999__') }}
    template(v-if="page=='1'")
      .d-flex.flex-column.justify-space-between.align-center.mt-10
        v-btn(href="https://qrcodepay.line.me/qr/payment/cxJrRq%252FS7J9v8Xu%252FVw%252FZ3gpCZ0yNpPmLhrmmqPVcTcVaiVgW9Dg9pGqMRwx%252BS8qW", dark, color="green" link target="_blank") LINEPAY 捐款
    template(v-if="page=='2'")
      .d-flex.flex-column.justify-space-between.align-center.mt-10
        v-btn(href="https://www.wbst.org.tw/donate", dark, color="green" link target="_blank") {{ $t('小額信用卡') }}
  v-bottom-navigation(v-model='page' app grow)
    v-btn(page='0')
      v-icon {{icons.mdiGift}}
      | {{ $t('發票愛心碼') }}
    v-btn(page='1')
      v-icon {{icons.mdiGift}}
      | LINE Pay
    v-btn(page='2')
      v-icon {{icons.mdiGift}}
      | {{ $t('小額信用卡') }}
</template>

<script>
import { mdiArrowLeft, mdiGift } from '@mdi/js'
export default {
  name: 'Einvoice',
  data: () => ({
    icons: { mdiArrowLeft, mdiGift },
    page: 0,
  }),
}
</script>
