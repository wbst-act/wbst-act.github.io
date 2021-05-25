<template lang="pug">
v-main
  activity-dialog(:selectedOpen="selectedOpen", :selectedEvent="selectedEvent" @close="selectedOpen=false")
  v-container(fluid)
    v-row.fill-height
      v-col(cols="12")
        v-sheet
          v-toolbar( flat dense)
            v-btn(fab, text color="grey darken-2" @click="addDay(-7)")
              v-icon {{ icons.mdiChevronLeft }}
            v-spacer
            v-toolbar-title {{ $moment(focus).day(6)| moment('Y年M月') }}
            v-spacer
            v-btn(fab, text  color="grey darken-2" @click="addDay(7)")
              v-icon {{ icons.mdiChevronRight }}
      template(v-if="loading")
        v-col(cols="12")
          v-skeleton-loader(type="list-item-two-line, list-item-two-line, list-item-two-line")
      template(v-else)
        v-col(cols="12" v-if="filterevent.length>0").ma-0.pa-0
          v-list(flat)
            template(v-for="item , index in filterevent")
              v-list-item(nav @click="eventOpen(item)" dense)
                v-list-item-content.pa-1
                  v-alert(:key="index" border="left" :color="item.color" colored-border elevation="2" dense)
                    v-row(dense no-gutters)
                      v-col(cols="2" align-self="center") {{ item.date | moment('D') }} [{{ item.date | moment('dd') }}]
                      v-col(cols="10")
                        v-list(dense)          
                          v-list-item
                            v-list-item-content                  
                              v-list-item-title            
                                | {{ item.name }}
                                span.caption.red--text(v-if="item.cancel=='y'") [{{item.cancelhelp}}]
                                span.float-right {{ item.starttime}}
                              v-list-item-subtitle            
                                | {{ item.location }}                               
                              v-list-item-subtitle
                                | {{ item.leader.join(' ') }}                  
        v-col(cols="12" v-else)
          .d-flex.flex-column.justify-space-between.align-center 尚未安排例行活動,敬請等待
</template>

<script>
import ActivityDialog from '@/components/ActivityDialog.vue'
import { mdiChevronLeft, mdiChevronRight } from '@mdi/js'

export default {
  name: 'Activity',
  components: { ActivityDialog },
  data: () => ({
    icons: {
      mdiChevronLeft,
      mdiChevronRight,
    },
    colors: [
      'teal',
      'grey darken-1',
      'green',
      'deep-purple',
      'orange lighten-1',
      'grey lighten-1',
      'indigo',
    ],
    events: [],
    filterevent: [],
    loading: true,
    focus: null,
    users: [],
    selectedEvent: null,
    selectedOpen: false,
  }),
  created() {
    this.focus = this.$moment(new Date()).day(0)
  },
  async mounted() {
    this.loading = true
    this.users = this.$offlineStorage.get('users')
    if (this.isOnline) {
      await this.$http
        .get(
          'https://spreadsheets.google.com/feeds/list/1H88Qx_-1OeZOOnsU2Bmmg-m2-XtBti05oCo9UggD3Sg/1/public/full?alt=json'
        )
        .then(ret => {
          this.events = ret.data.feed.entry
            .filter(item =>
              ['例行', '周末派', '白頭翁'].includes(item['gsx$type']['$t'])
            )
            .map(item => ({
              type: item['gsx$type']['$t'],
              name: item['gsx$name']['$t'],
              date: this.$moment(item['gsx$date']['$t'], 'YYYY/MM/DD'),
              starttime: item['gsx$starttime']['$t'],
              endtime: item['gsx$endtime']['$t'],
              location: item['gsx$location']['$t'],
              leader: [
                item['gsx$p1']['$t'],
                item['gsx$p2']['$t'],
                item['gsx$p3']['$t'],
                item['gsx$p4']['$t'],
              ],
              start:
                item['gsx$date']['$t'].replaceAll('/', '-') +
                'T' +
                item['gsx$starttime']['$t'],
              end:
                item['gsx$date']['$t'].replaceAll('/', '-') +
                'T' +
                item['gsx$endtime']['$t'],
              done: this.$moment(item['gsx$date']['$t'], 'YYYY/MM/DD').isBefore(
                this.$moment(),
                'day'
              ),
              color: this.colors[
                this.$moment(item['gsx$date']['$t'], 'YYYY/MM/DD').isBefore(
                  this.$moment(),
                  'day'
                )
                  ? 5
                  : item['gsx$cancel']['$t'] == 'y'
                  ? 1
                  : this.$moment(item['gsx$date']['$t'], 'YYYY/MM/DD').weekday()
              ],
              bus: item['gsx$bus']['$t'],
              ebird: item['gsx$ebird']['$t'],
              cancel: item['gsx$cancel']['$t'],
              cancelhelp: item['gsx$cancelhelp']['$t'],
              today: this.$moment(item['gsx$date']['$t'], 'YYYY/MM/DD').isSame(
                this.$moment(),
                'day'
              ),
            }))
        })
      this.$offlineStorage.set('events', this.events)
    } else {
      this.events = this.$offlineStorage.get('events')
    }
    this.getEvent()

    this.loading = false
  },
  methods: {
    addDay(days) {
      this.focus = this.focus.add(days, 'days')
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
    eventOpen(event) {
      this.selectedEvent = event
      this.selectedOpen = true
    },
  },
}
</script>

<style></style>
