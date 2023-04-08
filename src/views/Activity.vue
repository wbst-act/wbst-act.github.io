<template lang="pug">
v-main
  activity-dialog(:selectedOpen="selectedOpen", :selectedEvent="selectedEvent" :path="selectedPath" @close="selectedOpen=false")
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
      template(v-if="filterevent.length==0")
        v-alert.pa-0(border="left" color="red lighten-4" colored-border elevation="2" dense)
          v-container.px-3.py-0
            v-row(no-gutters)  
              v-col(cols="12")
                v-list
                  v-list-item
                    v-list-item-content
                      v-list-item-title 
                        | 本週無例行活動
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
                            | {{ $i18n.locale=='en' ? item.path.ename: item.name }}
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
                            | {{ $i18n.locale=='en' ? item.path.ename: item.name }}
                            span(v-if="item.memberonly=='y'") ({{ $t('__msg_limit__') }})
                            span.caption.red--text(v-if="item.cancel=='y' || item.cancel=='c'") [{{item.cancelhelp}}]                            
                          v-list-item-subtitle
                            | {{  $i18n.locale=='en' ? item.path.elocation :  item.location }}
                            span.float-right {{ item.starttime}}
                          v-list-item-subtitle
                            | {{ item.leader.join(' ') }}
      template(v-if="filterevent.length>0")           
        v-alert.pa-0(border="left" color="red" colored-border elevation="2" dense)
          v-container.px-3.py-0
            v-row(no-gutters)
              | {{ $t('__msg_alert__') }}

</template>

<script>
import ActivityDialog from '@/components/ActivityDialog.vue'
import EbirdDialog from '@/components/EbirdDialog.vue'
import { mdiChevronLeft, mdiChevronRight, mdiBird } from '@mdi/js'
import sheet from '@/mixins/sheet'
export default {
  name: 'Activity',
  mixins: [sheet],
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
    paths: [],
    filterevent: [],
    loading: true,
    focus: null,
    users: [],
    selectedEvent: null,
    selectedPath: null,
    selectedOpen: false,
    sid: '',
    ebirdDialog: false,
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
    this.users = this.$offlineStorage.get('users')
    this.events = this.$offlineStorage.get('activity') ?? []
    this.paths = this.$offlineStorage.get('paths') ?? []
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

      this.filterevent.forEach(event =>
        this.$set(
          event,
          'path',
          this.paths.find(item => item.name == event.name)
        )
      )
      // console.log(this.filterevent)
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
