<template lang="pug">
v-main
  v-container
    .d-flex.flex-column.justify-space-between.align-center.mt-10
      v-card(width="400")
        v-card-text
          v-img(src="@/assets/1973999.png" max-height="400" max-width="400" centered)
          span.d-flex.flex-column.justify-space-between.align-center 出示條碼或告知鳥會捐贈碼1973999
</template>

<script>
import { mdiArrowLeft } from '@mdi/js'
export default {
  name: 'Einvoice',
  data: () => ({
    icons: { mdiArrowLeft },
  }),
}
</script>
