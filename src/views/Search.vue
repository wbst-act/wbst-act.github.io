<template lang="pug">
v-main
  v-container(fluid )
    v-card.mb-3
      v-container(fluid )
        v-row
          v-col(cols='6')
            v-text-field(label='查詢人員|例行活動' dense, v-model='search_words' @input='filter', @click:clear='filter', clearable)
          v-col(cols='6')
            v-checkbox(label='顯示全部' v-model='all' @change='filter'  dense)

    template(v-for="item in schedules")  
      v-alert(border="left" colored-border :color="getcolor(item)" elevation="2" dense)
        v-list(dense)
          v-list-item
            v-list-item-content          
              v-list-item-title                  
                | {{ item.date | moment('YYYY-MM-DD') }} 
                span.caption.red--text(v-if="item.cancel=='y'") [{{item.cancelhelp}}]
                span.caption.float-right {{ item.starttime}} - {{ item.endtime}}
              v-list-item-subtitle 
                | [{{ item.type }} ]{{ item.name }}
              v-list-item-subtitle 
                | {{ item.p1 }} {{ item.p2 }} {{ item.p3 }} {{ item.p4 }}
            v-list-item-action                
              v-btn( link icon :href="google_calendar(item)"  target="_blank")
                v-icon(color="orange" dark icon ) {{ icons.mdiCalendarPlus }}
                  
                  
        
      
</template>

<script>
import { mdiCalendarPlus } from '@mdi/js'
import sheet from '@/mixins/sheet'
export default {
  name: 'Search',
  mixins: [sheet],
  data: () => ({
    icons: { mdiCalendarPlus },
    allschedule: [],
    schedules: [],
    search_words: '',
    all: false,
    paths: [],
  }),
  async mounted() {
    if (this.isOnline) {
      try {
        const ret = await this.$http.get(this.sheet_url(1))

        this.allschedule = ret.data.feed.entry.map(item => ({
          type: item['gsx$type']['$t'],
          name: item['gsx$name']['$t'],
          date: this.$moment(item['gsx$date']['$t'], 'YYYY/MM/DD'),
          starttime: item['gsx$starttime']['$t'],
          endtime: item['gsx$endtime']['$t'],
          location: item['gsx$location']['$t'],
          p1: item['gsx$p1']['$t'],
          p2: item['gsx$p2']['$t'],
          p3: item['gsx$p3']['$t'],
          p4: item['gsx$p4']['$t'],
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
          cancel: item['gsx$cancel']['$t'],
          cancelhelp: item['gsx$cancelhelp']['$t'],
        }))
        this.$offlineStorage.set('schedules', this.events)
      } catch (err) {
        console.log('search', err)
        this.allschedule = this.$offlineStorage.get('schedules')
      }
    } else {
      this.allschedule = this.$offlineStorage.get('schedules')
    }
    this.paths = this.$offlineStorage.get('paths') ?? []
  },
  methods: {
    filter() {
      if (this.search_words != null && this.search_words.length > 0) {
        this.schedules = this.allschedule.filter(
          item =>
            (this.all ? true : item.done == false) &&
            (item.name.includes(this.search_words) ||
              item.p1.includes(this.search_words) ||
              item.p2.includes(this.search_words) ||
              item.p3.includes(this.search_words) ||
              item.p4.includes(this.search_words))
        )
      } else {
        this.schedules = []
      }
    },
    getcolor(item) {
      if (item.cancel == 'y') {
        return 'red lighten-4'
      } else if (item.done == true) {
        return 'grey lighten-1'
      } else if (item.type == '例行') {
        return 'light-green darken-1'
      } else if (item.type == '周末派') {
        return 'amber darken-1'
      } else if (item.type == '白頭翁') {
        return 'teal darken-2'
      } else {
        return 'light-blue darken-2'
      }
    },
    google_calendar(item) {
      const dates =
        this.$moment(item.start, 'YYYY-MM-DDTHH:mm').format('YYYYMMDDTHHmmSS') +
        '%2F' +
        this.$moment(item.end, 'YYYY-MM-DDTHH:mm').format('YYYYMMDDTHHmmSS')
      let location = ''
      if (['例行', '周末派', '白頭翁'].includes(item.type)) {
        if (
          this.$moment(item.date).isBefore(
            this.$moment('2021/07/01', 'YYYY/MM/DD'),
            'day'
          )
        ) {
          location = item.location
        } else {
          location = encodeURIComponent(
            this.paths.find(path => path.name == item.name).pluscode
          )
        }
      }

      return (
        'https://calendar.google.com/calendar/render?action=TEMPLATE&dates=' +
        dates +
        '&text=' +
        item.name +
        (location != '' ? '&location=' + location : '') +
        '&details=' +
        encodeURIComponent(
          item.location != '' ? '集合地點:' + item.location + '\n' : ''
        ) +
        '領隊:' +
        item.p1 +
        ' ' +
        item.p2 +
        ' ' +
        item.p3 +
        ' ' +
        item.p4
      )
    },
  },
}
</script>
