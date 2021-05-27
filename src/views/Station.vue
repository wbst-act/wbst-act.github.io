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
        template(v-for="item , index in filterevent")
          v-col(cols="12").ma-0.pa-0
            v-alert.mx-2(:key="index" border="left" :color="getcolor(item)" colored-border elevation="2" dense)
              v-row(dense no-gutters)
                v-col(cols="2" align-self="center") {{ item.date | moment('D') }} [{{ item.date | moment('dd') }}]
                v-col(cols="10")
                  v-list(dense)          
                    v-list-item
                      v-list-item-content                  
                        v-list-item-title            
                          | {{ item.name }}
                          span.caption.red--text(v-if="item.cancel=='y'") [{{item.cancelhelp}}]
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

export default {
  name: 'Station',
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
    this.focus = this.$moment(new Date()).day(0)
  },
  async mounted() {
    this.loading = true
    if (this.isOnline) {
      await this.$http
        .get(
          'https://spreadsheets.google.com/feeds/list/1H88Qx_-1OeZOOnsU2Bmmg-m2-XtBti05oCo9UggD3Sg/1/public/full?alt=json'
        )
        .then(ret => {
          this.events = ret.data.feed.entry
            .filter(item => ['駐站', '賞鳥趣'].includes(item['gsx$type']['$t']))
            .map(item => ({
              type: item['gsx$type']['$t'],
              name: item['gsx$name']['$t'],
              date: this.$moment(item['gsx$date']['$t'], 'YYYY/MM/DD'),
              starttime: item['gsx$starttime']['$t'],
              endtime: item['gsx$endtime']['$t'],
              leader: [item['gsx$p1']['$t'], item['gsx$p2']['$t']],
              done: this.$moment(item['gsx$date']['$t'], 'YYYY/MM/DD').isBefore(
                this.$moment(),
                'day'
              ),
              cancel: item['gsx$cancel']['$t'],
              cancelhelp: item['gsx$cancelhelp']['$t'],
            }))
        })
      this.$offlineStorage.set('stations', this.events)
    } else {
      this.events = this.$offlineStorage.get('stations')
    }
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
