<template lang="pug">
  v-app
    v-app-bar(app color="primary" dark dense)
      | 台北鳥野鳥學會例行活動行事曆
      v-spacer
    v-main
      router-view
</template>

<script>
export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
