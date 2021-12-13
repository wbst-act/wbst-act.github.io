<template lang="pug">
v-main
  v-main
    v-container
      .d-flex.flex-column.justify-space-between.align-center.mt-5
        v-card(width="400")
          v-card-text
            v-img(src="@/assets/googleform.png" max-height="400" max-width="400" centered)
    v-btn(:href="url"  fixed, dark, fab, bottom, right, color="green" link target="_blank")
      v-icon {{ icons.mdiPencil }}
</template>

<script>
import { mdiArrowLeft, mdiPencil } from '@mdi/js'
export default {
  name: 'GoogleForm',
  data: () => ({
    icons: { mdiArrowLeft, mdiPencil },
    url:
      'https://docs.google.com/forms/d/e/1FAIpQLSflFovOlWATa2MhTy8LaVxaq8ROcsQB3dD98zL4AwkJYB85Qw/viewform',
  }),
}
</script>
