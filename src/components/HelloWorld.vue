<template lang="pug">
  v-row.fill-height
    v-col
      v-sheet(hieght="64")
        v-toolbar( flat )
          v-menu(bottom).mr-4
            template(v-slot:activator="{ on, attrs }")
              v-btn(outlined, color="gray darken-2" v-bind="attrs", v-on="on")
                span {{ types[type] }}
                v-icon(right) mdi-menu-down
            v-list
              v-list-item(v-for="( key, value) in types" @click='type=value')
                v-list-item-title {{ key }}

          v-btn.mr-4(outlined, color="grey darken-2" @click="setToday") 今日
          v-btn(fab, text small color="grey darken-2" @click="prev")
            v-icon(small) mdi-chevron-left
          v-btn(fab, text, small, color="grey darken-2" @click="next")
            v-icon(small) mdi-chevron-right
          v-spacer
          v-toolbar-title(v-if="$refs.calendar") {{ $refs.calendar.title }}
        v-sheet(hieght="600")
          v-calendar(ref="calendar",
            first-time='06:30',
            v-model="focus",
            :type="type"
            color="primary",
            :events="events",
            :events-color="getEventColor",
            @click:event="showEvent",
            :weekdays="weekday",
            :weekday-format="getDay",
            :month-format="getMonth",
            )
        
    v-dialog(v-model='selectedOpen')
      v-card(v-if='selectedEvent')
        v-card-title.primary(dark dense) {{ selectedEvent.date }} {{ selectedEvent.name }}
        v-card-text 
          div 集合時間 {{ selectedEvent.starttime }}
          div 集合地點 {{ selectedEvent.location }} 
          div 領隊 {{ selectedEvent.leader }}
        v-card-actions
          v-btn 地圖
          v-btn 加到行事曆
          v-btn eBird記錄
        
</template>

<script>
export default {
  name: 'HelloWorld',
  data: () => ({
    focus: '',
    types: { week: '週', month: '月' },
    type: 'week',
    selectedEvent: {},
    seelctedElement: null,
    selectedOpen: false,
    events: [],
    weekday: [1, 2, 3, 4, 5, 6, 0],
    colors: [
      'blue',
      'indigo',
      'deep-purple',
      'cyan',
      'green',
      'orange',
      'grey darken-1',
    ],
    list: [],
  }),
  mounted() {
    //this.$refs.calendar.checkChange()
    /*
    this.$http
      .get(
        'https://spreadsheets.google.com/feeds/list/1q1h-GR3uGtvckUh7lu10VI0dxSBjBKy5dGPB9W47QSE/1/public/full?alt=json'
      )
      .then(
        ret =>
          (this.list = ret.data.feed.entry.map(item => ({
            name: item['gsx$name']['$t'],
            city: item['gsx$city']['$t'],
            location: item['gsx$location']['$t'],
            loc: item['gsx$loc']['$t'],
            lat: item['gsx$lat']['$t'],
            time: item['gsx$time']['$t'],
          })))
      )
    */
    this.$http
      .get(
        'https://spreadsheets.google.com/feeds/list/1H88Qx_-1OeZOOnsU2Bmmg-m2-XtBti05oCo9UggD3Sg/1/public/full?alt=json'
      )
      .then(ret => {
        this.events = ret.data.feed.entry.map(item => ({
          name: item['gsx$name']['$t'],
          date: item['gsx$date']['$t'],
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
        }))
      })
  },
  methods: {
    getEventColor(event) {
      return event.color
    },
    setToday() {
      this.focus = ''
    },
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
      console.log(date)
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
      const daysOfWeek = [
        '星期日',
        '星期一',
        '星期二',
        '星期三',
        '星期四',
        '星期五',
        '星期六',
      ]
      return daysOfWeek[date.weekday]
    },
  },
}
</script>
