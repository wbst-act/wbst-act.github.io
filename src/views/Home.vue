<template lang="pug">
v-main
  v-container(fluid)
    v-row.fill-height
      v-col(cols="12")
        v-skeleton-loader(type="table-heading, list-item-two-line, image, table-tfoot" v-if="loading")
        v-sheet(hieght="64" v-else)
          v-toolbar( flat )
            v-menu(bottom).mr-4
              template(v-slot:activator="{ on, attrs }")
                v-btn(outlined, color="gray darken-2" v-bind="attrs", v-on="on")
                  span {{ types[type] }}
                  v-icon(right) {{ icons.mdiMenuDown }}
              v-list
                v-list-item(v-for="( key, value) in types" :key="key" @click='type=value')
                  v-list-item-title {{ key }}
            v-btn(fab, text small color="grey darken-2" @click="prev")
              v-icon(small) {{ icons.mdiChevronLeft }}
            v-btn(fab, text, small, color="grey darken-2" @click="next")
              v-icon(small) {{ icons.mdiChevronRight }}
            v-spacer
            template(v-if="$refs.calendar")
              v-toolbar-title {{ $refs.calendar.title }}
            template(v-else) 
              v-toolbar-title 本週
          v-sheet(height="600")
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
              :weekdays="weekday",
              :weekday-format="getDay",
              :month-format="getMonth"
              )
    v-dialog(v-model='selectedOpen')
      v-sheet(dense v-if='selectedEvent')
        v-toolbar.white--text(:class="selectedEvent.cancel=='y' ? 'red' :'light-green darken-3'"  dense)
          v-toolbar-title {{ selectedEvent.cancel == 'y' ? '['+selectedEvent.cancelhelp+']' : '' }} {{ selectedEvent.date | moment('MM月DD日 dddd') }} {{selectedEvent.type}} 
          v-spacer
          v-btn(icon small dark @click="selectedOpen=false")
            v-icon {{ icons.mdiClose }}
        v-card(v-if='selectedEvent')
          v-list(dense)
            template(v-if='ebird_hotspot==""')
              v-list-item
                v-list-item-content               
                  v-list-item-title 路線
                  v-list-item-subtitle {{ selectedEvent.name }}
            template(v-else)
              v-list-item(link :href='ebird_hotspot' target="_blank")
                v-list-item-content               
                  v-list-item-title 路線
                  v-list-item-subtitle {{ selectedEvent.name }}
                v-list-item-action
                  v-icon(color="green" icon ) {{icons.mdiBird }}              
            template(v-if="selectedEvent.cancel!='y' && selectedEvent.done==false") 
              v-list-item(link :href='google_calendar' target="_blank")
                v-list-item-content               
                  v-list-item-title 集合時間
                  v-list-item-subtitle {{ selectedEvent.starttime }}
                v-list-item-action                
                  v-icon(color="orange" dark icon ) {{ icons.mdiCalendarPlus }}
              v-list-item(link :href='google_map' target="_blank")
                v-list-item-content
                  v-list-item-title 集合地點
                  v-list-item-subtitle {{ selectedEvent.location }} 
                  v-list-item-subtitle(v-if="selectedEvent.bus") {{ selectedEvent.bus }} 
                v-list-item-action
                  v-icon(color="primary" icon ) {{ icons.mdiGoogleMaps }}
            template(v-else)
              v-list-item
                v-list-item-content               
                  v-list-item-title 集合時間
                  v-list-item-subtitle {{ selectedEvent.starttime }}
              v-list-item
                v-list-item-content
                  v-list-item-title 集合地點
                  v-list-item-subtitle {{ selectedEvent.location }} 
                  v-list-item-subtitle(v-if="selectedEvent.bus") {{ selectedEvent.bus }} 
            v-list-item
              v-list-item-content
                v-list-item-title 領隊
                v-list-item-subtitle {{ selectedEvent.leader.join(' ') }}
          //template(v-if="selectedEvent.cancel!='y' && selectedEvent.done==false && selectedEvent.today")
          template(v-if="selectedEvent.done==false")
            v-divider
            v-card-actions
              template(v-if="users.length==0")
                v-btn(link  block :href="google_form('', '', '')" target="_blank" color="green" dark) 實名制簽到
              template(v-else-if="users.length==1")
                v-btn(link  block :href="google_form(users[0].name,users[0].tel, users[0].member)" target="_blank" color="green" dark) 實名制簽到
              template(v-else)
                v-menu(offset-y)
                  template(v-slot:activator="{ on, attrs }")
                    v-btn(link  block color="green" dark v-bind="attrs" v-on="on") 實名制簽到
                  v-list
                    v-list-item(v-for="user in users" :key="user.name" link :href="google_form(user.name, user.tel, user.member)" target="_blank")
                      v-list-item-title {{ user.name }}
              v-btn(link v-if="selectedEvent.ebird!=''" block @click="goto(selectedEvent)" color="primary") 賞鳥記錄
          template(v-if="selectedEvent.ebird!=''")
            v-divider
            v-card-actions
              v-spacer
              v-btn(link block @click="goto(selectedEvent)" color="primary") 賞鳥記錄
      
</template>

<script>
import {
  mdiMenuDown,
  mdiChevronLeft,
  mdiChevronRight,
  mdiClose,
  mdiCalendarPlus,
  mdiGoogleMaps,
  mdiBird,
} from '@mdi/js'
export default {
  name: 'Home',
  data: () => ({
    icons: {
      mdiMenuDown,
      mdiChevronLeft,
      mdiChevronRight,
      mdiClose,
      mdiCalendarPlus,
      mdiGoogleMaps,
      mdiBird,
    },
    focus: '',
    types: { week: '週', month: '月' },
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
    list: [],
    loading: true,
    paths: [],
    users: [],
  }),
  computed: {
    weekday() {
      const week = this.$moment(this.focus).week() - 1
      const has4 =
        this.events.filter(
          item =>
            this.$moment(item.date, 'YYYY/MM/DD').week() == week &&
            this.$moment(item.date, 'YYYY/MM/DD').day() == 4
        ).length > 0
      const has6 =
        this.events.filter(
          item =>
            this.$moment(item.date, 'YYYY/MM/DD').week() == week &&
            this.$moment(item.date, 'YYYY/MM/DD').day() == 6
        ).length > 0

      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
        case 'sm':
        case 'md':
          return this.type == 'month'
            ? [4, 5, 6, 0]
            : has4
            ? [4, 6, 0]
            : has6
            ? [6, 0]
            : [0]
        case 'lg':
        case 'xl':
        default:
          return [1, 2, 3, 4, 5, 6, 0]
      }
    },

    google_map() {
      return 'https://maps.google.com/?q=' + this.selectedEvent.location
    },
    google_calendar() {
      const dates =
        this.$moment(this.selectedEvent.start, 'YYYY-MM-DDTHH:mm').format(
          'YYYYMMDDTHHmmSS'
        ) +
        '%2F' +
        this.$moment(this.selectedEvent.end, 'YYYY-MM-DDTHH:mm').format(
          'YYYYMMDDTHHmmSS'
        )

      return (
        'https://calendar.google.com/calendar/render?action=TEMPLATE&dates=' +
        dates +
        '&text=' +
        this.selectedEvent.name +
        '&location=' +
        this.selectedEvent.location +
        '&details=領隊:' +
        this.selectedEvent.leader.join(' ')
      )
    },
    ebird_hotspot() {
      const month = this.selectedEvent.date.month() + 1
      const locid = this.paths.find(
        item => item.name == this.selectedEvent.name
      )
        ? this.paths.find(item => item.name == this.selectedEvent.name)['locid']
        : ''
      return locid
        ? `https://ebird.org/hotspot/${locid}?m=${month}&yr=all&changeDate=`
        : ''
    },
  },
  async mounted() {
    this.loading = true
    this.users = this.$offlineStorage.get('users')
    this.focus = this.$moment(new Date()).day(7).format('YYYY-MM-DD')
    if (this.isOnline) {
      try {
        const ret = await this.$http.get(
          'https://spreadsheets.google.com/feeds/list/1H88Qx_-1OeZOOnsU2Bmmg-m2-XtBti05oCo9UggD3Sg/1/public/full?alt=json'
        )

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
        this.$offlineStorage.set('events', this.events)
      } catch (err) {
        console.log('例行活動', err)
      }
    } else {
      this.events = this.$offlineStorage.get('events')
    }
    this.paths = this.$offlineStorage.get('paths')

    this.loading = false
  },
  methods: {
    google_form(name, tel, member) {
      const event =
        this.$moment(this.selectedEvent.date, 'YYYY/M/D').format('MMDD') +
        '@' +
        this.selectedEvent.name
      return (
        'https://docs.google.com/forms/d/e/1FAIpQLSflFovOlWATa2MhTy8LaVxaq8ROcsQB3dD98zL4AwkJYB85Qw/viewform?entry.1479042466=' +
        event +
        '&entry.1844593536=' +
        name +
        '&entry.411882768=' +
        tel +
        '&entry.710949816=' +
        member
      )
    },
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
    goto(item) {
      this.$router.push({
        name: 'eBird記錄',
        params: { sid: item.ebird, date: item.date, location: item.location },
      })
    },
  },
}
</script>
