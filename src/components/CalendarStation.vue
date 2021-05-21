<template lang="pug">
v-container(fluid)
  v-row.fill-height
    v-col(cols="12")
      v-skeleton-loader(type="list-item-two-line,list-item-two-line, list-item-two-line, list-item-two-line, list-item-two-line,list-item-two-line, list-item-two-line" v-if="loading")
      v-sheet(hieght="64" v-else)
        v-toolbar( flat )
          ///
            v-menu(bottom).mr-4
              template(v-slot:activator="{ on, attrs }")
                v-btn(outlined, color="gray darken-2" v-bind="attrs", v-on="on")
                  span {{ types[listtype] }}
                  v-icon(right) {{ icons.mdiMenuDown }}
              v-list
                v-list-item(v-for="( key, value) in types" :key="key" @click='changeType(value)')
                  v-list-item-title {{ key }}
          v-btn(fab, text small color="grey darken-2" @click="prev")
            v-icon(small) {{ icons.mdiChevronLeft }}
          v-spacer
          template(v-if="$refs.calendar")
            v-toolbar-title {{ $refs.calendar.title }}
          template(v-else) 
            v-toolbar-title 本週
          v-spacer
          v-btn(fab, text, small, color="grey darken-2" @click="next")
            v-icon(small) {{ icons.mdiChevronRight }}
          
        v-sheet(height="600" :class="listtype=='list'?'d-none': ''")
          v-calendar(            
            ref="calendar",
            first-time='06:30',
            v-model="focus",
            :type="type"
            color="primary",
            :events="events",
            event-overlap-mode="column",
            event-overlap-threshold="30",
            :events-color="getEventColor",            
            @click:event="showEvent",
            @change="getEvent"
            :weekdays="weekday",
            :weekday-format="getDay",
            :month-format="getMonth"
            )
        v-sheet(:class="listtype!='list'?'d-none': ''")
          template(v-for="item in filterevent")
            v-alert(:key="item.name + item.start" border="left" :color="getcolor(item)" colored-border elevation="2" dense)
              v-row(dense)
                v-col(cols="2" align-self="center") {{ item.date | moment('MM-DD') }}
                v-col(cols="7")
                  v-list(dense)          
                    v-list-item
                      v-list-item-content                  
                        v-list-item-title            
                          |  {{ item.name }}
                          span.caption.red--text(v-if="item.cancel=='y'") [{{item.cancelhelp}}]
                          
                        v-list-item-subtitle
                          | {{ item.leader.join(' ') }}
                v-col(cols="3" align-self="center")
                  | {{ item.starttime}} - {{ item.endtime}}
              
  v-dialog(v-model='selectedOpen')
    v-sheet(dense v-if='selectedEvent')
      v-toolbar.white--text(:class="selectedEvent.cancel=='y' ? 'red' :'light-green darken-3'"  dense)
        v-toolbar-title {{ selectedEvent.date | moment('MM月DD日 dddd') }} {{ selectedEvent.type}} {{ selectedEvent.cancel == 'y' ? '['+selectedEvent.cancelhelp+']' : '' }}
        v-spacer
        v-btn(icon small dark @click="selectedOpen=false")
          v-icon {{ icons.mdiClose }}
      v-card(v-if='selectedEvent')
        v-list(dense)
          v-list-item
            v-list-item-content               
              v-list-item-title 地點
              v-list-item-subtitle {{ selectedEvent.name }}
          v-list-item
            v-list-item-content               
              v-list-item-title 時間
              v-list-item-subtitle {{ selectedEvent.starttime }} - {{ selectedEvent.endtime }}
          v-list-item
            v-list-item-content
              v-list-item-title 領隊
              v-list-item-subtitle {{ selectedEvent.leader.join(' ') }}
      
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
  name: 'CalendarStation',
  data: () => ({
    icons: {
      mdiMenuDown,
      mdiChevronLeft,
      mdiChevronRight,
      mdiClose,
      mdiCalendarPlus,
      mdiGoogleMaps,
    },
    focus: '',
    types: { list: '列表', week: '週', month: '月' },
    listtype: 'list',
    type: 'week',
    selectedEvent: null,
    seelctedElement: null,
    selectedOpen: false,
    events: [],
    colors: [
      'teal',
      'grey darken-1',
      'green',
      'deep-purple',
      'orange lighten-1',
      'grey lighten-1',
      'indigo',
    ],
    filterevent: [],
    weekday: [6, 0],
    loading: true,
  }),

  async mounted() {
    this.loading = true
    this.focus = this.$moment(new Date()).day(7).format('YYYY-MM-DD')
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
              cancel: item['gsx$cancel']['$t'],
              cancelhelp: item['gsx$cancelhelp']['$t'],
              today: this.$moment(item['gsx$date']['$t'], 'YYYY/MM/DD').isSame(
                this.$moment(),
                'day'
              ),
            }))
        })
      this.$offlineStorage.set('stations', this.events)
    } else {
      this.events = this.$offlineStorage.get('stations')
    }

    this.loading = false
  },
  methods: {
    getEventColor(event) {
      return event.color
    },
    setToday() {},
    prev() {
      this.$refs.calendar.prev()
    },
    next() {
      this.$refs.calendar.next()
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event
        this.selectedElement = nativeEvent.target
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.selectedOpen = true))
        )
      }

      if (this.selectedOpen) {
        this.selectedOpen = false
        requestAnimationFrame(() => requestAnimationFrame(() => open()))
      } else {
        open()
      }

      nativeEvent.stopPropagation()
    },
    getMonth(date) {
      const Months = [
        '一月',
        '二月',
        '三月',
        '四月',
        '五月',
        '六月',
        '七月',
        '八月',
        '九月',
        '十月',
        '十一月',
        '十二月',
      ]
      return Months[date.month - 1]
    },
    getDay(date) {
      const daysOfWeek = ['日', '一', '二', '三', '四', '五', '六']
      return daysOfWeek[date.weekday]
    },
    changeType(type) {
      this.listtype = type
      if (type == 'month') {
        this.type = 'month'
      } else {
        this.type = 'week'
      }
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
    getEvent({ start, end }) {
      this.filterevent = this.events.filter(
        item =>
          this.$moment(item.date).valueOf() >=
            this.$moment(start.date).valueOf() &&
          this.$moment(item.date).valueOf() <= this.$moment(end.date).valueOf()
      )
    },
  },
}
</script>
