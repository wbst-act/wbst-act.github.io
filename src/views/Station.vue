<template lang="pug">
v-main
  v-container(fluid)
    v-row.fill-height
      v-col(cols="12")
        v-card(flat, dense)
          v-toolbar(flat dense)
            v-btn(fab, text color="grey darken-2" @click="addDay(-7)" v-if="$moment().isBefore($moment(focus).add(-7), 'day')")
              v-icon {{ icons.mdiChevronLeft }}
            v-spacer
            v-toolbar-title {{ $moment(focus).day(6)| moment('Y年M月') }}
            v-spacer
            v-btn(fab, text  color="grey darken-2" @click="addDay(7)")
              v-icon {{ icons.mdiChevronRight }}
      template(v-if="loading")
        v-col(cols="12")
          v-skeleton-loader(type="list-item-two-line,list-item-two-line, \
            list-item-two-line, list-item-two-line, \
            list-item-two-line,list-item-two-line, \
            list-item-two-line,list-item-two-line")
      template(v-else)
        template(v-if="filterevent.length==0")
          v-alert.pa-0(border="left" color="red lighten-4" colored-border elevation="2" dense)
            v-container.px-3.py-0
              v-row(no-gutters)  
                v-col(cols="12")
                  v-list
                    v-list-item
                      v-list-item-content
                        v-list-item-title 
                          | 本週駐站解說
        template(v-for="item , index in filterevent")
          v-col(cols="12").ma-0.pa-0
            v-alert.mx-2(:key="index" border="left" :color="getcolor(item)" colored-border elevation="2" dense)
              v-row(dense no-gutters)
                v-col(cols="2" align-self="center") {{ item.date | moment('D') }} [{{ item.date | moment('dd') }}]
                v-col(cols="10")
                  v-list
                    v-list-item
                      v-list-item-content                  
                        v-list-item-title            
                          | {{ item.name }}
                          span.caption.float-right.red--text(v-if="item.cancel=='y'") [{{item.cancelhelp}}]
                        v-list-item-subtitle
                          | {{ item.leader.join(' ') }}                  
                          span.float-right {{ item.starttime}} - {{ item.endtime}}
  </template>

<script>
import {
  mdiMenuDown,
  mdiChevronLeft,
  mdiChevronRight,
  mdiClose,
  mdiCalendarPlus,
  mdiGoogleMaps,
} from '@mdi/js'
import sheet from '@/mixins/sheet'
export default {
  name: 'Station',
  mixins: [sheet],
  data: () => ({
    icons: {
      mdiMenuDown,
      mdiChevronLeft,
      mdiChevronRight,
      mdiClose,
      mdiCalendarPlus,
      mdiGoogleMaps,
    },
    events: [],
    filterevent: [],
    loading: true,
    focus: null,
  }),
  created() {
    this.focus = this.$moment(new Date())
    if (this.focus.day() == 0) {
      this.focus = this.focus.day(-7)
    } else {
      this.focus = this.focus.day(0)
    }
  },
  async mounted() {
    this.loading = true
    this.events = this.$offlineStorage.get('stations') ?? []
    this.getEvent()

    this.loading = false
  },
  methods: {
    addDay(days) {
      this.focus.add(days, 'days')
      this.getEvent()
    },
    getcolor(item) {
      if (item.cancel == 'y') {
        return 'red lighten-4'
      } else if (item.done == true) {
        return 'grey lighten-1'
      } else if (item.name == '關渡自然公園中心二樓') {
        return 'light-green darken-1'
      } else if (item.name == '芝山綠園') {
        return 'amber darken-1'
      } else if (item.name == '大安森林公園') {
        return 'orange darken-2'
      } else {
        return 'light-blue darken-2'
      }
    },
    getEvent() {
      const end = this.$moment(this.focus).day(7)
      this.filterevent = this.events.filter(
        item =>
          this.$moment(item.date).valueOf() >= this.focus.valueOf() &&
          this.$moment(item.date).valueOf() <= end.valueOf()
      )
    },
  },
}
</script>

<style></style>
