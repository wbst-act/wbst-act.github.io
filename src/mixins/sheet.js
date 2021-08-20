export default {
  methods: {
    sheet_url(page) {
      //return `https://spreadsheets.google.com/feeds/list/1H88Qx_-1OeZOOnsU2Bmmg-m2-XtBti05oCo9UggD3Sg/${page}/public/full?alt=json`
      const names = {
        1: '例行活動',
        2: '例行路線',
        3: 'ebird鳥名錄',
        4: '相關網站',
        5: '大型活動',
        6: '更新版本',
      }
      const name = encodeURIComponent(names[page])
      return `https://sheets.googleapis.com/v4/spreadsheets/1H88Qx_-1OeZOOnsU2Bmmg-m2-XtBti05oCo9UggD3Sg/values/${name}?alt=json&key=AIzaSyAPs282cs1sZiPCabEYuojj9QSpVdLqP_0`
    },
    sheet_format(values) {
      const names = values.shift()
      //console.log(names)
      return values.map(item => {
        let data = {}
        for (let i = 0; i < names.length; i++) {
          data[names[i]] = item[i]
        }
        return data
      })
    },
  },
}
