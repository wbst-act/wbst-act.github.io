<template lang="pug">
  wbst-header
    template(v-if='loading')
      v-main
        v-progress-linear(color='light-green darken-3' indeterminate rounded height="10")
    template(v-else)
      router-view 
    v-snackbar(:value="updateExists" :timeout="-1" color="light-green darken-3" centered)
      | 有新版本可以更新
      template(v-slot:action="{ attrs }")
        v-btn(@click="refreshApp" text dark) 更新
</template>
<script>
import update from '@/mixins/update'
import sheet from '@/mixins/sheet'
import WbstHeader from '@/components/WbstHeader.vue'
export default {
  name: 'App',
  mixins: [update, sheet],
  data: () => ({
    colors: [
      'teal',
      'red lighten-4',
      'green',
      'deep-purple',
      'orange lighten-1',
      'grey lighten-1',
      'indigo',
    ],
    version: undefined,
    old_version: undefined,
    loading: true,
  }),
  components: { WbstHeader },
  async mounted() {
    this.$vuetify.theme.dark = this.$offlineStorage.get('darkmode')
    this.old_version = this.$offlineStorage.get('version') || ''
    if (typeof this.old_version == 'string') {
      this.old_version = ['', '', '', '', '']
    }
    if (this.isOnline) {
      try {
        const ret = await this.$http.get(this.sheet_url(6))
        const data = this.sheet_format(ret.data.values)
        this.version = [
          data[0].version,
          data[1].version,
          data[2].version,
          data[3].version,
          data[4].version,
        ]
        if (JSON.stringify(this.version) != JSON.stringify(this.old_version)) {
          await this.update()
          this.$offlineStorage.set('version', this.version)
          window.location.reload()
          window.location.href = '/'
        }
      } catch (err) {
        console.log('version', err)
      }
    }
    this.loading = false
  },
  methods: {
    async update() {
      // ebird bird data
      if (this.old_version[2] != this.version[2]) {
        try {
          const ret = await this.$http.get(this.sheet_url(3))
          const data = this.sheet_format(ret.data.values)
          const birds = data
            .map(item => ({
              speccode: item.SPECIES_CODE,
              birdname: item.COMMON_NAME,
              family: item.FAMILY,
            }))
            .reduce((result, item) => {
              result[item['speccode']] = {
                name: item['birdname'],
                family: item['family'],
              }
              return result
            })
          this.$offlineStorage.set('birds', birds)
        } catch (err) {
          console.log('ebird鳥名錄', err)
        }
      }

      // 例行路線
      if (this.old_version[1] != this.version[1]) {
        try {
          const ret = await this.$http.get(this.sheet_url(2))
          const paths = this.sheet_format(ret.data.values)
          /*
          const paths = ret.data.feed.entry.map(item => ({
            name: item['gsx$name']['$t'],
            location: item['gsx$location']['$t'],
            bus: item['gsx$bus']['$t'],
            pluscode: item['gsx$pluscode']['$t'],
            time: item['gsx$starttime']['$t'],
            ebirdname: item['gsx$ebirdname']['$t'],
            locid: item['gsx$hotspot']['$t'],
          }))
          */
          this.$offlineStorage.set('paths', paths)
        } catch (err) {
          console.log('例行路線', err)
        }
      }
      //相關網站
      if (this.old_version[3] != this.version[3]) {
        try {
          const ret = await this.$http.get(this.sheet_url(4))
          const sites = this.sheet_format(ret.data.values)
          /*
          const sites = ret.data.feed.entry.map(item => ({
            name: item['gsx$name']['$t'],
            url: item['gsx$url']['$t'],
          }))
          */
          this.$offlineStorage.set('sites', sites)
        } catch (err) {
          console.log('相關網站', err)
        }
      }

      //大型活動
      if (this.old_version[4] != this.version[4]) {
        try {
          const ret = await this.$http.get(this.sheet_url(5))
          const travels = this.sheet_format(ret.data.values)
          /*
          const travels = ret.data.feed.entry.map(item => ({
            date: item['gsx$date']['$t'],
            name: item['gsx$name']['$t'],
            url: item['gsx$url']['$t'],
          }))
          */
          this.$offlineStorage.set('travels', travels)
          if(travels.length > 0)
            this.$offlineStorage.set('travel_new', true)
        } catch (err) {
          console.log('相關網站', err)
        }
      }
      //例行活動
      if (this.old_version[0] != this.version[0]) {
        try {
          const ret = await this.$http.get(this.sheet_url(1))
          const data = this.sheet_format(ret.data.values)
          const activity = data
            .filter(item => ['例行', '周末派', '白頭翁'].includes(item.type))
            .map(item => ({
              type: item.type,
              name: item.name,
              date: this.$moment(item.date, 'YYYY/MM/DD'),
              starttime: item.starttime,
              endtime: item.endtime,
              location: item.location,
              leader: [item.p1, item.p2, item.p3, item.p4],
              start: item.date.replaceAll('/', '-') + 'T ' + item.starttime,
              end: item.date.replaceAll('/', '-') + 'T ' + item.endtime,
              done: this.$moment(item.date, 'YYYY/MM/DD').isBefore(
                this.$moment(),
                'day'
              ),
              color:
                this.colors[
                  this.$moment(item.date, 'YYYY/MM/DD').isBefore(
                    this.$moment(),
                    'day'
                  )
                    ? 5
                    : item.date == 'y'
                    ? 1
                    : this.$moment(item.date, 'YYYY/MM/DD').weekday()
                ],
              bus: item.bus,
              ebird: item.ebird,
              cancel: item.cancel,
              cancelhelp: item.cancel_help,
              memberonly: item.member_only,
              memberurl: item.member_url,
              people: item.people,
            }))
          const stations = data
            .filter(item => ['駐站', '賞鳥趣'].includes(item.type))
            .map(item => ({
              type: item.type,
              name: item.name,
              date: this.$moment(item.date, 'YYYY/MM/DD'),
              starttime: item.starttime,
              endtime: item.endtime,
              leader: [item.p1, item.p2],
              done: this.$moment(item.date, 'YYYY/MM/DD').isBefore(
                this.$moment(),
                'day'
              ),
              cancel: item.cancel,
              cancelhelp: item.cancel_help,
            }))
          const allschedule = data.map(item => ({
            type: item.type,
            name: item.name,
            date: this.$moment(item.date, 'YYYY/MM/DD'),
            starttime: item.starttime,
            endtime: item.endtime,
            location: item.location,
            p1: item.p1,
            p2: item.p2,
            p3: item.p3,
            p4: item.p4,
            start: item.date.replaceAll('/', '-') + 'T ' + item.starttime,
            end: item.date.replaceAll('/', '-') + 'T ' + item.endtime,
            done: this.$moment(item.date, 'YYYY/MM/DD').isBefore(
              this.$moment(),
              'day'
            ),
            cancel: item.cancel,
            cancelhelp: item.cancel_help,
          }))

          this.$offlineStorage.set('activity', activity)
          this.$offlineStorage.set('stations', stations)
          this.$offlineStorage.set('schedules', allschedule)
        } catch (err) {
          console.log('例行活動', err)
        }
      }
    },
  },
}
</script>
