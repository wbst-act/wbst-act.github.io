<template lang="pug">
v-dialog(v-model='selectedOpen', @click:outside="$emit('close')" )
  ebird-dialog(:dialog='dialog' :event='selectedEvent' @ebird-close="dialog=false")
  v-card(dense v-if='selectedEvent')
    v-toolbar.white--text(:class="selectedEvent.cancel=='y' ? 'red' :'light-green darken-3'"  dense)
      v-toolbar-title {{ selectedEvent.cancel == 'y' ? '['+selectedEvent.cancelhelp+']' : '' }} {{ selectedEvent.date | moment('MM月DD日 dddd') }} {{selectedEvent.type}}
      v-spacer
      v-btn(icon small dark @click="$emit('close')")
        v-icon {{ icons.mdiClose }}
    v-card(v-if='selectedEvent')
      v-list(dense)
        template(v-if='ebird_hotspot==""')
          v-list-item
            v-list-item-content
              v-list-item-title {{ $t('路線') }}
              v-list-item-subtitle 
                | {{ $i18n.locale=='en' ? selectedEvent.path.ename: selectedEvent.name }}
                span(v-if="selectedEvent.memberonly") (人數限定場，需事先報名)
        template(v-else)
          template(v-if='greenmap==""')
            v-list-item(link :href='ebird_hotspot' target="_blank")
              v-list-item-content
                v-list-item-title {{ $t('路線') }}
                v-list-item-subtitle
                  | {{ $i18n.locale=='en' ? selectedEvent.path.ename: selectedEvent.name }}
                  span(v-if="selectedEvent.memberonly") ({{ $t('__msg_limit__') }})
              v-list-item-action
                v-icon(color="green" icon ) {{icons.mdiBird }}
          template(v-else)
            v-menu(offset-y)
              template(v-slot:activator="{ on, attrs }")                
                v-list-item(link v-bind="attrs" v-on="on")                  
                  v-list-item-content
                    v-list-item-title {{ $t('路線') }}
                    v-list-item-subtitle
                      | {{ $i18n.locale=='en' ? selectedEvent.path.ename: selectedEvent.name }}
                      span(v-if="selectedEvent.memberonly") ({{ $t('__msg_limit__') }})
                  v-list-item-action
                    v-icon(color="green" icon ) {{icons.mdiBird }}
              v-list
                v-list-item(:href="ebird_hotspot" target="_blank")
                  v-list-item-title {{ $t('eBird熱點資訊') }}
                v-list-item(:href="greenmap" target="_blank")
                  v-list-item-title {{ $t('賞鳥綠地圖') }}
            
        template(v-if="selectedEvent.cancel!='y' && selectedEvent.done==false")
          v-list-item(link :href='google_calendar' target="_blank")
            v-list-item-content
              v-list-item-title {{ $t('集合地點') }}
              v-list-item-subtitle {{ selectedEvent.starttime }}
            v-list-item-action
              v-icon(color="orange" dark icon ) {{ icons.mdiCalendarPlus }}
          v-list-item(link :href='google_map' target="_blank")
            v-list-item-content
              v-list-item-title {{ $t('集合地點') }}
              v-list-item-subtitle {{ $i18n.locale=='en' ? selectedEvent.path.elocation : selectedEvent.location }}
              v-list-item-subtitle(v-if="selectedEvent.path.bus") {{ $i18n.locale=='en' ? selectedEvent.path.ebus : selectedEvent.bus }}
            v-list-item-action
              v-icon(color="primary" icon ) {{ icons.mdiGoogleMaps }}
        template(v-else)
          v-list-item
            v-list-item-content
              v-list-item-title {{ $t('集合時間') }}
              v-list-item-subtitle {{ selectedEvent.starttime }}
          v-list-item
            v-list-item-content
              v-list-item-title {{ $t('集合地點') }}
              v-list-item-subtitle {{ $i18n.locale=='en' ? selectedEvent.path.elocation : selectedEvent.location }}
              v-list-item-subtitle(v-if="selectedEvent.path.bus") {{ $i18n.locale=='en' ? selectedEvent.path.ebus : selectedEvent.bus }}
        v-list-item
          v-list-item-content
            v-list-item-title {{ $t('解說員') }}
            v-list-item-subtitle {{ selectedEvent.leader.join(' ') }}
        v-list-item(v-if="selectedEvent.memberonly=='y'" link :href="selectedEvent.memberurl")
          v-list-item-content
            v-list-item-title {{ $t('報名網址') }}
            v-list-item-subtitle(v-if="selectedEvent.memberurl") {{ selectedEvent.memberurl }}
            v-list-item-subtitle(v-else) 尚未開始報名
      //template(v-if="selectedEvent.done==false")
      template(v-if="selectedEvent.cancel!='y' && selectedEvent.done==false && today")      
        v-divider
        v-card-actions
          template(v-if="users.length==0")
            v-btn(link  block :href="google_form('', '', '')" target="_blank" color="green" dark) {{ $t('活動簽到') }}
          template(v-else-if="users.length==1")
            v-btn(link  block :href="google_form(users[0].name,users[0].tel, users[0].member)" target="_blank" color="green" dark) {{ $t('活動簽到') }}
          template(v-else)
            v-menu(offset-y)
              template(v-slot:activator="{ on, attrs }")
                v-btn(link  block color="green" dark v-bind="attrs" v-on="on") {{ $t('活動簽到') }}
              v-list
                v-list-item(v-for="user in users" :key="user.name" link :href="google_form(user.name, user.tel, user.member)" target="_blank")
                  v-list-item-title {{ user.name }}
          v-btn(link v-if="selectedEvent.ebird!=''" block @click="goto" color="primary") {{ $t('賞鳥記錄') }}
      template(v-if="selectedEvent.ebird!=''")
        v-divider
        v-card-actions
          v-spacer
          v-btn(link block @click="goto(selectedEvent)" color="primary") {{ $t('賞鳥記錄') }}
</template>

<script>
import { mdiClose, mdiCalendarPlus, mdiGoogleMaps, mdiBird } from '@mdi/js'
import EbirdDialog from '@/components/EbirdDialog.vue'
export default {
  name: 'ActivityDialog',
  components: { EbirdDialog },
  props: ['selectedOpen', 'selectedEvent'],
  data: () => ({
    icons: {
      mdiClose,
      mdiCalendarPlus,
      mdiGoogleMaps,
      mdiBird,
    },
    users: [],

    dialog: false,
    sid: '',
  }),
  created() {
    this.users = this.$offlineStorage.get('users') ?? []
  },

  computed: {
    date() {
      return this.$moment(this.selectedEvent.date)
    },
    today() {
      return this.date.isSame(this.$moment(), 'day')
    },
    newlocation() {
      return this.date.isBefore(this.$moment('2021/07/01', 'YYYY/MM/DD'), 'day')
    },
    google_map() {
      if (this.isOnline) {
        if (this.newlocation) {
          return 'https://maps.google.com/?q=' + this.selectedEvent.location
        } else {
          const pluscode = this.selectedEvent.path.pluscode
          return 'https://maps.google.com/?q=' + encodeURIComponent(pluscode)
        }
      } else {
        return ''
      }
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
      const location = this.newlocation
        ? this.selectedEvent.location
        : encodeURIComponent(this.selectedEvent.path.pluscode)

      return this.isOnline
        ? 'https://calendar.google.com/calendar/render?action=TEMPLATE&dates=' +
            dates +
            '&text=' +
            this.selectedEvent.name +
            '&location=' +
            location +
            '&details=' +
            encodeURIComponent(
              '集合地點:' +
                this.selectedEvent.location +
                '\n' +
                (this.selectedEvent.bus ? this.selectedEvent.bus + '\n' : '') +
                '領隊:' +
                this.selectedEvent.leader.join(' ')
            )
        : ''
    },
    ebird_hotspot() {
      const month = this.$moment(this.selectedEvent.date).month() + 1
      const locid = this.selectedEvent.path ? this.selectedEvent.path.locid : ''
      return this.isOnline && locid
        ? `https://ebird.org/hotspot/${locid}?m=${month}&yr=all&changeDate=`
        : ''
    },
    greenmap() {
      const greenmap = this.selectedEvent.path
        ? this.selectedEvent.path.greenmap
        : ''
      return this.isOnline && greenmap ? greenmap : ''
    },
  },
  methods: {
    google_form(name, tel, member) {
      return this.isOnline
        ? 'https://docs.google.com/forms/d/e/1FAIpQLSflFovOlWATa2MhTy8LaVxaq8ROcsQB3dD98zL4AwkJYB85Qw/viewform?' +
            'entry.1479042466_year=' +
            this.$moment().format('YYYY') +
            '&entry.1479042466_month=' +
            this.$moment().format('MM') +
            '&entry.1479042466_day=' +
            this.$moment().format('DD') +
            '&entry.120979086=' +
            this.selectedEvent.name +
            '&entry.1844593536=' +
            name +
            '&entry.411882768=' +
            tel +
            '&entry.710949816=' +
            member
        : ''
    },
    goto() {
      if (this.isOnline) {
        this.dialog = true
      }
      /*
      this.$router.push({
        name: 'eBird記錄',
        params: { sid: item.ebird, date: item.date, location: item.location },
      })
      */
    },
  },
}
</script>
