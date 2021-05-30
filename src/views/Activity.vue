<template lang="pug">
v-main
  activity-dialog(:selectedOpen="selectedOpen", :selectedEvent="selectedEvent" @close="selectedOpen=false")
  ebird-dialog(:dialog='ebirdDialog' :event='selectedEvent' @ebird-close="ebirdDialog=false")
  v-container(fluid)
    v-card(flat dense)
      v-toolbar.mb-5(flat dense)
        v-btn(fab, text color="grey darken-2" @click="addDay(-7)")
          v-icon {{ icons.mdiChevronLeft }}
        v-spacer
        v-toolbar-title {{ $moment(focus).day(6)| moment('Y年M月') }}
        v-spacer
        v-btn(fab, text  color="grey darken-2" @click="addDay(7)")
          v-icon {{ icons.mdiChevronRight }}
    template(v-if="loading")
      v-sheet
        v-skeleton-loader(type="list-item-two-line, list-item-two-line, list-item-two-line")
    template(v-else)
      template(v-for="item , index in filterevent")
        template(v-if="item.done")
          a(@click="ebirdOpen(item)" dense :key="index" :link="item.ebird!=''")
            v-alert.pa-0(border="left" :color="item.color" colored-border elevation="2" dense)
              v-container.px-3.py-0
                v-row(no-gutters)
                  v-col(cols="2" align-self="center") {{ item.date | moment('D') }} [{{ item.date | moment('dd') }}]
                  v-col(cols="10")
                    v-list
                      v-list-item
                        v-list-item-content
                          v-list-item-title 
                            | {{ item.name }}
                            span.caption.red--text(v-if="item.cancel=='y'") [{{item.cancelhelp}}]
                        v-list-item-action(v-if="item.ebird")
                          v-icon(color="green") {{ icons.mdiBird }}
        template(v-else)
          a(@click="eventOpen(item)" dense :key="index"  :link="item.ebird!=''")
            v-alert.pa-0(border="left" :color="item.color" colored-border elevation="2" dense)
              v-container.px-3.py-0
                v-row(no-gutters)
                  v-col(cols="2" align-self="center") {{ item.date | moment('D') }} [{{ item.date | moment('dd') }}]
                  v-col(cols="10")
                    v-list
                      v-list-item
                        v-list-item-content
                          v-list-item-title
                            | {{ item.name }}
                            span(v-if="item.memberonly=='y'") (會員限定場，需事先報名)
                            span.caption.red--text(v-if="item.cancel=='y'") [{{item.cancelhelp}}]                            
                          v-list-item-subtitle
                            | {{ item.location }}
                            span.float-right {{ item.starttime}}
                          v-list-item-subtitle
                            | {{ item.leader.join(' ') }}


</template>

<script>
import ActivityDialog from '@/components/ActivityDialog.vue'
import EbirdDialog from '@/components/EbirdDialog.vue'
import { mdiChevronLeft, mdiChevronRight, mdiBird } from '@mdi/js'

export default {
  name: 'Activity',
  components: { ActivityDialog, EbirdDialog },
  data: () => ({
    icons: {
      mdiChevronLeft,
      mdiChevronRight,
      mdiBird,
    },
    colors: [
      'teal',
      'red lighten-4',
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
    sid: '',
    ebirdDialog: false,
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
              memberonly: item['gsx$memberonly']['$t'],
              memberurl: item['gsx$memberurl']['$t'],
              today: this.$moment(item['gsx$date']['$t'], 'YYYY/MM/DD').isSame(
                this.$moment(),
                'day'
              ),
              people: item['gsx$people']['$t'],
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
      if (this.selectedEvent.cancel != 'y') this.selectedOpen = true
    },
    ebirdOpen(item) {
      this.selectedEvent = item
      if (this.selectedEvent && this.selectedEvent.ebird)
        this.ebirdDialog = true
    },
  },
}
</script>

<style></style>
