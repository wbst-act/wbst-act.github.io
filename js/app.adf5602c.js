(function(e){function t(t){for(var n,s,r=t[0],c=t[1],d=t[2],l=0,h=[];l<r.length;l++)s=r[l],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&h.push(i[s][0]),i[s]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);m&&m(t);while(h.length)h.shift()();return o.push.apply(o,d||[]),a()}function a(){for(var e,t=0;t<o.length;t++){for(var a=o[t],n=!0,s=1;s<a.length;s++){var r=a[s];0!==i[r]&&(n=!1)}n&&(o.splice(t--,1),e=c(c.s=a[0]))}return e}var n={},s={app:0},i={app:0},o=[];function r(e){return c.p+"js/"+({}[e]||e)+"."+{"chunk-2d0b3a11":"42122f52","chunk-2d226689":"f3c100ee","chunk-35a0bd71":"a1fe927a","chunk-3e3f9d0c":"77ec7839","chunk-6bf5cf0a":"add9821d","chunk-5160be4a":"02101436","chunk-601de130":"da5acd02","chunk-dc2ab316":"301ce74d","chunk-260abbd1":"66258bce","chunk-935eafd8":"900ca7f9","chunk-949cbf2e":"6c5ed6f8","chunk-c58ce902":"5efe6616","chunk-cc3de90e":"8f7c5b28","chunk-d8b2d8f4":"8edc4c54","chunk-f6d5047e":"ba1e6abe"}[e]+".js"}function c(t){if(n[t])return n[t].exports;var a=n[t]={i:t,l:!1,exports:{}};return e[t].call(a.exports,a,a.exports,c),a.l=!0,a.exports}c.e=function(e){var t=[],a={"chunk-35a0bd71":1,"chunk-3e3f9d0c":1,"chunk-6bf5cf0a":1,"chunk-5160be4a":1,"chunk-601de130":1,"chunk-dc2ab316":1,"chunk-260abbd1":1,"chunk-935eafd8":1,"chunk-949cbf2e":1,"chunk-c58ce902":1,"chunk-cc3de90e":1,"chunk-d8b2d8f4":1,"chunk-f6d5047e":1};s[e]?t.push(s[e]):0!==s[e]&&a[e]&&t.push(s[e]=new Promise((function(t,a){for(var n="css/"+({}[e]||e)+"."+{"chunk-2d0b3a11":"31d6cfe0","chunk-2d226689":"31d6cfe0","chunk-35a0bd71":"9cf0f303","chunk-3e3f9d0c":"e58a71ab","chunk-6bf5cf0a":"ed867a0b","chunk-5160be4a":"1383535b","chunk-601de130":"d45eb14a","chunk-dc2ab316":"979bf491","chunk-260abbd1":"7239115f","chunk-935eafd8":"e58a71ab","chunk-949cbf2e":"996bd92d","chunk-c58ce902":"fc1a84b7","chunk-cc3de90e":"4a9163b4","chunk-d8b2d8f4":"e4e9fd09","chunk-f6d5047e":"fc1a84b7"}[e]+".css",i=c.p+n,o=document.getElementsByTagName("link"),r=0;r<o.length;r++){var d=o[r],l=d.getAttribute("data-href")||d.getAttribute("href");if("stylesheet"===d.rel&&(l===n||l===i))return t()}var h=document.getElementsByTagName("style");for(r=0;r<h.length;r++){d=h[r],l=d.getAttribute("data-href");if(l===n||l===i)return t()}var m=document.createElement("link");m.rel="stylesheet",m.type="text/css",m.onload=t,m.onerror=function(t){var n=t&&t.target&&t.target.src||i,o=new Error("Loading CSS chunk "+e+" failed.\n("+n+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=n,delete s[e],m.parentNode.removeChild(m),a(o)},m.href=i;var u=document.getElementsByTagName("head")[0];u.appendChild(m)})).then((function(){s[e]=0})));var n=i[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise((function(t,a){n=i[e]=[t,a]}));t.push(n[2]=o);var d,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=r(e);var h=new Error;d=function(t){l.onerror=l.onload=null,clearTimeout(m);var a=i[e];if(0!==a){if(a){var n=t&&("load"===t.type?"missing":t.type),s=t&&t.target&&t.target.src;h.message="Loading chunk "+e+" failed.\n("+n+": "+s+")",h.name="ChunkLoadError",h.type=n,h.request=s,a[1](h)}i[e]=void 0}};var m=setTimeout((function(){d({type:"timeout",target:l})}),12e4);l.onerror=l.onload=d,document.head.appendChild(l)}return Promise.all(t)},c.m=e,c.c=n,c.d=function(e,t,a){c.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},c.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},c.t=function(e,t){if(1&t&&(e=c(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(c.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)c.d(a,n,function(t){return e[t]}.bind(null,n));return a},c.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return c.d(t,"a",t),t},c.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},c.p="/",c.oe=function(e){throw console.error(e),e};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],l=d.push.bind(d);d.push=t,d=d.slice();for(var h=0;h<d.length;h++)t(d[h]);var m=l;o.push([0,"chunk-vendors"]),a()})({0:function(e,t,a){e.exports=a("56d7")},"29da":function(e,t,a){"use strict";t["a"]={methods:{sheet_url(e){const t={1:"例行活動",2:"例行路線",3:"ebird鳥名錄",4:"相關網站",5:"大型活動",6:"更新版本"},a=encodeURIComponent(t[e]);return`https://sheets.googleapis.com/v4/spreadsheets/1H88Qx_-1OeZOOnsU2Bmmg-m2-XtBti05oCo9UggD3Sg/values/${a}?alt=json&key=AIzaSyAPs282cs1sZiPCabEYuojj9QSpVdLqP_0`},sheet_format(e){const t=e.shift();return e.map(e=>{let a={};for(let n=0;n<t.length;n++)a[t[n]]=e[n]||"";return a})}}}},4678:function(e,t,a){var n={"./af":"2bfb","./af.js":"2bfb","./ar":"8e73","./ar-dz":"a356","./ar-dz.js":"a356","./ar-kw":"423e","./ar-kw.js":"423e","./ar-ly":"1cfd","./ar-ly.js":"1cfd","./ar-ma":"0a84","./ar-ma.js":"0a84","./ar-sa":"8230","./ar-sa.js":"8230","./ar-tn":"6d83","./ar-tn.js":"6d83","./ar.js":"8e73","./az":"485c","./az.js":"485c","./be":"1fc1","./be.js":"1fc1","./bg":"84aa","./bg.js":"84aa","./bm":"a7fa","./bm.js":"a7fa","./bn":"9043","./bn-bd":"9686","./bn-bd.js":"9686","./bn.js":"9043","./bo":"d26a","./bo.js":"d26a","./br":"6887","./br.js":"6887","./bs":"2554","./bs.js":"2554","./ca":"d716","./ca.js":"d716","./cs":"3c0d","./cs.js":"3c0d","./cv":"03ec","./cv.js":"03ec","./cy":"9797","./cy.js":"9797","./da":"0f14","./da.js":"0f14","./de":"b469","./de-at":"b3eb","./de-at.js":"b3eb","./de-ch":"bb71","./de-ch.js":"bb71","./de.js":"b469","./dv":"598a","./dv.js":"598a","./el":"8d47","./el.js":"8d47","./en-au":"0e6b","./en-au.js":"0e6b","./en-ca":"3886","./en-ca.js":"3886","./en-gb":"39a6","./en-gb.js":"39a6","./en-ie":"e1d3","./en-ie.js":"e1d3","./en-il":"7333","./en-il.js":"7333","./en-in":"ec2e","./en-in.js":"ec2e","./en-nz":"6f50","./en-nz.js":"6f50","./en-sg":"b7e9","./en-sg.js":"b7e9","./eo":"65db","./eo.js":"65db","./es":"898b","./es-do":"0a3c","./es-do.js":"0a3c","./es-mx":"b5b7","./es-mx.js":"b5b7","./es-us":"55c9","./es-us.js":"55c9","./es.js":"898b","./et":"ec18","./et.js":"ec18","./eu":"0ff2","./eu.js":"0ff2","./fa":"8df4","./fa.js":"8df4","./fi":"81e9","./fi.js":"81e9","./fil":"d69a","./fil.js":"d69a","./fo":"0721","./fo.js":"0721","./fr":"9f26","./fr-ca":"d9f8","./fr-ca.js":"d9f8","./fr-ch":"0e49","./fr-ch.js":"0e49","./fr.js":"9f26","./fy":"7118","./fy.js":"7118","./ga":"5120","./ga.js":"5120","./gd":"f6b4","./gd.js":"f6b4","./gl":"8840","./gl.js":"8840","./gom-deva":"aaf2","./gom-deva.js":"aaf2","./gom-latn":"0caa","./gom-latn.js":"0caa","./gu":"e0c5","./gu.js":"e0c5","./he":"c7aa","./he.js":"c7aa","./hi":"dc4d","./hi.js":"dc4d","./hr":"4ba9","./hr.js":"4ba9","./hu":"5b14","./hu.js":"5b14","./hy-am":"d6b6","./hy-am.js":"d6b6","./id":"5038","./id.js":"5038","./is":"0558","./is.js":"0558","./it":"6e98","./it-ch":"6f12","./it-ch.js":"6f12","./it.js":"6e98","./ja":"079e","./ja.js":"079e","./jv":"b540","./jv.js":"b540","./ka":"201b","./ka.js":"201b","./kk":"6d79","./kk.js":"6d79","./km":"e81d","./km.js":"e81d","./kn":"3e92","./kn.js":"3e92","./ko":"22f8","./ko.js":"22f8","./ku":"2421","./ku.js":"2421","./ky":"9609","./ky.js":"9609","./lb":"440c","./lb.js":"440c","./lo":"b29d","./lo.js":"b29d","./lt":"26f9","./lt.js":"26f9","./lv":"b97c","./lv.js":"b97c","./me":"293c","./me.js":"293c","./mi":"688b","./mi.js":"688b","./mk":"6909","./mk.js":"6909","./ml":"02fb","./ml.js":"02fb","./mn":"958b","./mn.js":"958b","./mr":"39bd","./mr.js":"39bd","./ms":"ebe4","./ms-my":"6403","./ms-my.js":"6403","./ms.js":"ebe4","./mt":"1b45","./mt.js":"1b45","./my":"8689","./my.js":"8689","./nb":"6ce3","./nb.js":"6ce3","./ne":"3a39","./ne.js":"3a39","./nl":"facd","./nl-be":"db29","./nl-be.js":"db29","./nl.js":"facd","./nn":"b84c","./nn.js":"b84c","./oc-lnc":"167b","./oc-lnc.js":"167b","./pa-in":"f3ff","./pa-in.js":"f3ff","./pl":"8d57","./pl.js":"8d57","./pt":"f260","./pt-br":"d2d4","./pt-br.js":"d2d4","./pt.js":"f260","./ro":"972c","./ro.js":"972c","./ru":"957c","./ru.js":"957c","./sd":"6784","./sd.js":"6784","./se":"ffff","./se.js":"ffff","./si":"eda5","./si.js":"eda5","./sk":"7be6","./sk.js":"7be6","./sl":"8155","./sl.js":"8155","./sq":"c8f3","./sq.js":"c8f3","./sr":"cf1e","./sr-cyrl":"13e9","./sr-cyrl.js":"13e9","./sr.js":"cf1e","./ss":"52bd","./ss.js":"52bd","./sv":"5fbd","./sv.js":"5fbd","./sw":"74dc","./sw.js":"74dc","./ta":"3de5","./ta.js":"3de5","./te":"5cbb","./te.js":"5cbb","./tet":"576c","./tet.js":"576c","./tg":"3b1b","./tg.js":"3b1b","./th":"10e8","./th.js":"10e8","./tk":"5aff","./tk.js":"5aff","./tl-ph":"0f38","./tl-ph.js":"0f38","./tlh":"cf75","./tlh.js":"cf75","./tr":"0e81","./tr.js":"0e81","./tzl":"cf51","./tzl.js":"cf51","./tzm":"c109","./tzm-latn":"b53d","./tzm-latn.js":"b53d","./tzm.js":"c109","./ug-cn":"6117","./ug-cn.js":"6117","./uk":"ada2","./uk.js":"ada2","./ur":"5294","./ur.js":"5294","./uz":"2e8c","./uz-latn":"010e","./uz-latn.js":"010e","./uz.js":"2e8c","./vi":"2921","./vi.js":"2921","./x-pseudo":"fd7e","./x-pseudo.js":"fd7e","./yo":"7f33","./yo.js":"7f33","./zh-cn":"5c3a","./zh-cn.js":"5c3a","./zh-hk":"49ab","./zh-hk.js":"49ab","./zh-mo":"3a6c","./zh-mo.js":"3a6c","./zh-tw":"90ea","./zh-tw.js":"90ea"};function s(e){var t=i(e);return a(t)}function i(e){if(!a.o(n,e)){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}return n[e]}s.keys=function(){return Object.keys(n)},s.resolve=i,e.exports=s,s.id="4678"},"56d7":function(e,t,a){"use strict";a.r(t);var n=a("2b0e"),s=a("bc3a"),i=a.n(s),o=a("130e"),r=a("8336"),c=a("f6c4"),d=a("8e36"),l=a("2db4"),h=function(){var e=this,t=e._self._c;return t("wbst-header",[e.loading?[t(c["a"],[t(d["a"],{attrs:{color:"light-green darken-3",indeterminate:"",rounded:"",height:"10"}})],1)]:[t("router-view")],t(l["a"],{attrs:{value:e.updateExists,timeout:-1,color:"light-green darken-3",centered:""},scopedSlots:e._u([{key:"action",fn:function({attrs:a}){return[t(r["a"],{attrs:{text:"",dark:""},on:{click:e.refreshApp}},[e._v("更新")])]}}])},[e._v("有新版本可以更新")])],2)},m=[],u=(a("13d5"),a("5b81"),{data(){return{refreshing:!1,registration:null,updateExists:!1}},async created(){document.addEventListener("swUpdated",this.updateAvailable,{once:!0}),navigator.serviceWorker.addEventListener("controllerchange",()=>{this.refreshing||(this.refreshing=!0,window.location.reload(),window.location.href="/")})},methods:{updateAvailable(e){this.registration=e.detail,this.updateExists=!0},refreshApp(){localStorage.removeItem("version"),this.updateExists=!1,this.registration&&this.registration.waiting&&this.registration.waiting.postMessage({type:"SKIP_WAITING"})}}}),f=a("29da"),b=a("7496"),p=a("40dc"),_=a("5bc1"),g=a("ce7e"),v=a("132d"),j=a("8860"),k=a("da13"),y=a("8270"),w=a("5d23"),$=a("34c3"),S=a("f774"),P=a("2fa4"),A=a("b73d"),z=a("2a7f"),O=function(){var e=this,t=e._self._c;return t(b["a"],[t(S["a"],{attrs:{app:"",bottom:"en"==e.$i18n.locale,clipped:e.$vuetify.breakpoint.lgAndUp},model:{value:e.drawer,callback:function(t){e.drawer=t},expression:"drawer"}},[t(j["a"],{attrs:{nav:""}},[t(k["a"],{attrs:{to:{name:"回首頁"}}},[t(y["a"],{attrs:{size:"24"}},[t(v["a"],[e._v(e._s(e.icons.mdiCalendar)+" ")])],1),t(w["a"],[t(w["c"],[e._v(e._s(e.$t("例行活動")))])],1)],1),t(k["a"],{attrs:{to:{name:"駐站解說"}}},[t(y["a"],{attrs:{size:"24"}},[t(v["a"],[e._v(e._s(e.icons.mdiTelescope)+" ")])],1),t(w["a"],[t(w["c"],[e._v(e._s(e.$t("駐站解說")))])],1)],1),t(k["a"],{attrs:{to:{name:"歷史記錄查詢"}}},[t(y["a"],{attrs:{size:"24"}},[t(v["a"],[e._v(e._s(e.icons.mdiFormatListBulleted)+" ")])],1),t(w["a"],[t(w["c"],[e._v(e._s(e.$t("歷史記錄查詢")))])],1)],1),t(k["a"],{attrs:{to:{name:"例行路線查詢"}}},[t(y["a"],{attrs:{size:"24"}},[t(v["a"],[e._v(e._s(e.icons.mdiMapMarkerPath))])],1),t(w["a"],[t(w["c"],[e._v(e._s(e.$t("例行路線查詢")))])],1)],1),t(k["a"],{attrs:{to:{name:"大型活動資訊"}}},[t(y["a"],{attrs:{size:"24"}},[t(v["a"],[e._v(e._s(e.icons.mdiTrainCarPassenger))])],1),t(w["a"],[t(w["c"],[e._v(e._s(e.$t("大型活動資訊")))])],1),e.new_data?t($["a"],[t(v["a"],{attrs:{color:"orange"}},[e._v(e._s(e.icons.mdiNewBox))])],1):e._e()],1),t(k["a"],{attrs:{to:{name:"關渡自然公園即時鳥況"}}},[t(y["a"],{attrs:{size:"24"}},[t(v["a"],[e._v(e._s(e.icons.mdiPineTree))])],1),t(w["a"],[t(w["c"],[e._v(e._s(e.$t("關渡自然公園即時鳥況")))])],1)],1),t(g["a"]),t(k["a"],{attrs:{to:{name:"志工排班查詢"}}},[t(y["a"],{attrs:{size:"24"}},[t(v["a"],[e._v(e._s(e.icons.mdiTableSearch))])],1),t(w["a"],[t(w["c"],[e._v(e._s(e.$t("志工排班查詢")))])],1)],1),t(g["a"]),t(k["a"],{attrs:{to:{name:"活動報到個資設定"}}},[t(y["a"],{attrs:{size:"24"}},[t(v["a"],[e._v(e._s(e.icons.mdiAccountCircle))])],1),t(w["a"],[t(w["c"],[e._v(e._s(e.$t("活動報到個資設定")))])],1)],1),t(k["a"],{attrs:{to:{name:"活動簽到表單"}}},[t(y["a"],{attrs:{size:"24"}},[t(v["a"],[e._v(e._s(e.icons.mdiPencil))])],1),t(w["a"],[t(w["c"],[e._v(e._s(e.$t("活動簽到表單")))])],1)],1),t(g["a"]),t(k["a"],{attrs:{to:{name:"分享APP"}}},[t(y["a"],{attrs:{size:"24"}},[t(v["a"],[e._v(e._s(e.icons.mdiShareVariant))])],1),t(w["a"],[t(w["c"],[e._v(e._s(e.$t("分享APP")))])],1)],1),t(k["a"],{attrs:{to:{name:"使用小秘訣"}}},[t(y["a"],{attrs:{size:"24"}},[t(v["a"],[e._v(e._s(e.icons.mdiHelpBox))])],1),t(w["a"],[t(w["c"],[e._v(e._s(e.$t("使用小秘訣")))])],1)],1),t(k["a"],{attrs:{to:{name:"小額捐款"}}},[t(y["a"],{attrs:{size:"24"}},[t(v["a"],[e._v(e._s(e.icons.mdiHeart))])],1),t(w["a"],[t(w["c"],[e._v(e._s(e.$t("小額捐款")))])],1)],1),t(k["a"],{attrs:{to:{name:"相關網站"}}},[t(y["a"],{attrs:{size:"24"}},[t(v["a"],[e._v(e._s(e.icons.mdiSitemap))])],1),t(w["a"],[t(w["c"],[e._v(e._s(e.$t("相關網站")))])],1)],1),t(g["a"]),"en"!=e.$i18n.locale?t(k["a"],{on:{click:function(t){return e.setLang("en")}}},[t(y["a"],{attrs:{size:"24"}},[t(v["a"],[e._v(e._s(e.icons.mdiTranslate)+" ")])],1),t(w["a"],[t(w["c"],[e._v("English Version")])],1)],1):e._e(),"tw"!=e.$i18n.locale?t(k["a"],{on:{click:function(t){return e.setLang("tw")}}},[t(y["a"],{attrs:{size:"24"}},[t(v["a"],[e._v(e._s(e.icons.mdiTranslate)+" ")])],1),t(w["a"],[t(w["c"],[e._v("中文版")])],1)],1):e._e(),t(k["a"],{attrs:{dense:""}},[t(y["a"],{attrs:{size:"24"}},[t(v["a"],[e._v(e._s(e.icons.mdiBrightness4)+" ")])],1),t(w["a"],[t(w["c"],[t(A["a"],{staticClass:"ml-3",attrs:{inset:"",label:e.$t("深色模式"),dense:""},on:{change:e.changemode},model:{value:e.darkmode,callback:function(t){e.darkmode=t},expression:"darkmode"}})],1)],1)],1),t(k["a"],{on:{click:e.refresh}},[t(y["a"],{attrs:{size:"24"}},[t(v["a"],[e._v(e._s(e.icons.mdiClockOutline)+" ")])],1),t(w["a"],[t(w["b"],[e._v("編譯時間 ")]),t(w["b"],{staticClass:"text-caption"},[e._v(e._s(e.builddate))])],1)],1),5==e.version.length?t(k["a"],{on:{click:e.refresh}},[t(y["a"],{attrs:{size:"24"}},[t(v["a"],[e._v(e._s(e.icons.mdiDatabase)+" ")])],1),t(w["a"],[t(w["b"],[e._v("資料版本")]),t(w["b"],{staticClass:"text-caption"},[e._v(e._s(e.version[0]))])],1)],1):e._e()],1)],1),t(p["a"],{attrs:{app:"",color:"light-green darken-3",dense:"",dark:"","clipped-left":e.$vuetify.breakpoint.lgAndUp}},[t(_["a"],{on:{click:function(t){t.stopPropagation(),e.drawer=!e.drawer}}}),t(z["a"],[e._v(e._s(e.title))]),t(P["a"]),e.isOffline?t(v["a"],[e._v(e._s(e.icons.mdiWifiStrengthOffOutline))]):e._e(),e.new_data?t(r["a"],{attrs:{to:{name:"大型活動資訊"},icon:""}},[t(v["a"],[e._v(e._s(e.icons.mdiEmailPlusOutline))])],1):e._e(),e._t("toolbar")],2),e._t("default"),t(l["a"],{attrs:{color:"light-green darken-3",top:"",timeout:"15000"},scopedSlots:e._u([{key:"action",fn:function({attrs:a}){return[t(r["a"],{attrs:{text:""},on:{click:e.dismiss}},[e._v(e._s(e.$t("取消")))]),t(r["a"],{attrs:{text:""},on:{click:e.install}},[e._v(e._s(e.$t("安裝")))])]}}]),model:{value:e.installed,callback:function(t){e.installed=t},expression:"installed"}},[e._v(e._s(e.$t("__msg_install__")))]),t(l["a"],{attrs:{color:"light-green darken-3",bottom:"",timeout:"30000",multiLine:""},model:{value:e.iosinstall,callback:function(t){e.iosinstall=t},expression:"iosinstall"}},[t("div",[e._v(e._s(e.$t("__msg_install__")))]),t("div",[e._v(" "+e._s(e.$t("__msg_install_ios__"))),t(v["a"],[e._v(e._s(e.icons.mdiExportVariant))]),e._v(e._s(e.$t("加入主畫面"))),t(v["a"],[e._v(e._s(e.icons.mdiPlusBoxOutline))])],1)])],2)},Y=[],x=a("94ed"),M={name:"WbstHeader",data:()=>({icons:{mdiFormatListBulleted:x["q"],mdiCalendar:x["g"],mdiTelescope:x["H"],mdiMapMarkerPath:x["w"],mdiAccountCircle:x["a"],mdiWifiStrengthOffOutline:x["K"],mdiTrainCarPassenger:x["I"],mdiTableSearch:x["G"],mdiClockOutline:x["k"],mdiSitemap:x["E"],mdiShareVariant:x["D"],mdiHeart:x["t"],mdiPineTree:x["A"],mdiExportVariant:x["p"],mdiPlusBoxOutline:x["C"],mdiBrightness4:x["f"],mdiDatabase:x["m"],mdiPencil:x["z"],mdiNewBox:x["y"],mdiEmailPlusOutline:x["o"],mdiTranslate:x["J"],mdiHelpBox:x["u"]},drawer:!1,builddate:"",deferredPrompt:null,installed:!1,iosinstall:!1,darkmode:!1,version:"",new_data:!1}),computed:{title(){return this.$t(this.$route.name)},isShare(){return navigator.share},isIos(){return/iphone|ipad|ipod|mac/.test(window.navigator.userAgent.toLowerCase())},isInStandaloneMode(){return!("standalone"in window.navigator&&window.navigator.standalone)},userAgent(){return window.navigator.userAgent.toLowerCase()}},created(){this.darkmode=this.$offlineStorage.get("darkmode"),window.addEventListener("beforeinstallprompt",e=>{e.preventDefault(),void 0==this.$cookies.get("add-to-home-screen")&&(this.installed=!0,this.deferredPrompt=e)}),window.addEventListener("appinstalled",()=>{this.installed=!1,this.deferredPrompt=null})},mounted(){this.builddate=this.$moment(new Date(parseInt(document.documentElement.dataset.buildTimestamp))).format("YYYY-MM-DD HH:mm"),this.version=this.$offlineStorage.get("version")||[],this.new_data=this.$offlineStorage.get("travel_new")||!1,this.iosinstall=this.isIos&&this.isInStandaloneMode},methods:{async dismiss(){this.$cookies.set("add-to-home-screen","15d"),this.installed=!1,this.deferredPrompt=null},async install(){this.deferredPrompt.prompt()},refresh(){this.$offlineStorage.set("version",""),window.location.reload(),window.location.href="/"},changemode(){this.$offlineStorage.set("darkmode",this.darkmode),this.$vuetify.theme.dark=this.darkmode},setLang(e){return localStorage.setItem("language",e),history.go(0)}}},T=M,B=a("2877"),D=Object(B["a"])(T,O,Y,!1,null,null,null),E=D.exports,C={name:"App",mixins:[u,f["a"]],data:()=>({colors:["teal","red lighten-4","green","deep-purple","orange lighten-1","grey lighten-1","indigo"],version:void 0,old_version:void 0,loading:!0}),components:{WbstHeader:E},async mounted(){if(this.$vuetify.theme.dark=this.$offlineStorage.get("darkmode"),this.old_version=this.$offlineStorage.get("version")||"","string"==typeof this.old_version&&(this.old_version=["","","","",""]),this.isOnline)try{const e=await this.$http.get(this.sheet_url(6)),t=this.sheet_format(e.data.values);this.version=[t[0].version,t[1].version,t[2].version,t[3].version,t[4].version],JSON.stringify(this.version)!=JSON.stringify(this.old_version)&&(await this.update(),this.$offlineStorage.set("version",this.version),window.location.reload(),window.location.href="/")}catch(e){console.log("version",e)}this.loading=!1},methods:{async update(){if(this.old_version[2]!=this.version[2])try{const e=await this.$http.get(this.sheet_url(3)),t=this.sheet_format(e.data.values),a=t.map(e=>({speccode:e.SPECIES_CODE,birdname:e.COMMON_NAME,family:e.FAMILY})).reduce((e,t)=>(e[t["speccode"]]={name:t["birdname"],family:t["family"]},e));this.$offlineStorage.set("birds",a)}catch(e){console.log("ebird鳥名錄",e)}if(this.old_version[1]!=this.version[1])try{const e=await this.$http.get(this.sheet_url(2)),t=this.sheet_format(e.data.values);this.$offlineStorage.set("paths",t)}catch(e){console.log("例行路線",e)}if(this.old_version[3]!=this.version[3])try{const e=await this.$http.get(this.sheet_url(4)),t=this.sheet_format(e.data.values);this.$offlineStorage.set("sites",t)}catch(e){console.log("相關網站",e)}if(this.old_version[4]!=this.version[4])try{const e=await this.$http.get(this.sheet_url(5)),t=this.sheet_format(e.data.values);this.$offlineStorage.set("travels",t),t.length>0&&this.$offlineStorage.set("travel_new",!0)}catch(e){console.log("相關網站",e)}if(this.old_version[0]!=this.version[0])try{const e=await this.$http.get(this.sheet_url(1)),t=this.sheet_format(e.data.values),a=t.filter(e=>["例行","周末派","白頭翁"].includes(e.type)).map(e=>({type:e.type,name:e.name,date:this.$moment(e.date,"YYYY/MM/DD"),starttime:e.starttime,endtime:e.endtime,location:e.location,leader:[e.p1,e.p2,e.p3,e.p4],start:e.date.replaceAll("/","-")+"T "+e.starttime,end:e.date.replaceAll("/","-")+"T "+e.endtime,done:this.$moment(e.date,"YYYY/MM/DD").isBefore(this.$moment(),"day"),color:this.colors[this.$moment(e.date,"YYYY/MM/DD").isBefore(this.$moment(),"day")?5:"y"==e.date?1:this.$moment(e.date,"YYYY/MM/DD").weekday()],bus:e.bus,ebird:e.ebird,cancel:e.cancel,cancelhelp:e.cancel_help,memberonly:e.member_only,memberurl:e.member_url,people:e.people})),n=t.filter(e=>["駐站","賞鳥趣"].includes(e.type)).map(e=>({type:e.type,name:e.name,date:this.$moment(e.date,"YYYY/MM/DD"),starttime:e.starttime,endtime:e.endtime,leader:[e.p1,e.p2],done:this.$moment(e.date,"YYYY/MM/DD").isBefore(this.$moment(),"day"),cancel:e.cancel,cancelhelp:e.cancel_help})),s=t.map(e=>({type:e.type,name:e.name,date:this.$moment(e.date,"YYYY/MM/DD"),starttime:e.starttime,endtime:e.endtime,location:e.location,p1:e.p1,p2:e.p2,p3:e.p3,p4:e.p4,start:e.date.replaceAll("/","-")+"T "+e.starttime,end:e.date.replaceAll("/","-")+"T "+e.endtime,done:this.$moment(e.date,"YYYY/MM/DD").isBefore(this.$moment(),"day"),cancel:e.cancel,cancelhelp:e.cancel_help}));this.$offlineStorage.set("activity",a),this.$offlineStorage.set("stations",n),this.$offlineStorage.set("schedules",s)}catch(e){console.log("例行活動",e)}}}},I=C,U=Object(B["a"])(I,h,m,!1,null,null,null),L=U.exports,N=a("9483");Object(N["a"])("/service-worker.js",{ready(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered(){console.log("Service worker has been registered.")},cached(){console.log("Content has been cached for offline use.")},updatefound(){console.log("New content is downloading.")},updated(e){console.log("New content is available; please refresh."),document.dispatchEvent(new CustomEvent("swUpdated",{detail:e}))},offline(){console.log("No internet connection found. App is running in offline mode.")},error(e){console.error("Error during service worker registration:",e)}});var R=a("8c4f");n["a"].use(R["a"]);const H=[{path:"/",name:"台北鳥會例行活動",component:()=>Promise.all([a.e("chunk-6bf5cf0a"),a.e("chunk-601de130")]).then(a.bind(null,"abae"))},{path:encodeURI("/回首頁"),name:"回首頁",redirect:"/"},{path:encodeURI("/歷史記錄查詢"),name:"歷史記錄查詢",component:()=>Promise.all([a.e("chunk-6bf5cf0a"),a.e("chunk-5160be4a")]).then(a.bind(null,"e4bb"))},{path:encodeURI("/例行路線查詢"),name:"例行路線查詢",component:()=>a.e("chunk-2d0b3a11").then(a.bind(null,"28d9"))},{path:encodeURI("/活動報到個資設定"),name:"活動報到個資設定",component:()=>Promise.all([a.e("chunk-6bf5cf0a"),a.e("chunk-dc2ab316"),a.e("chunk-260abbd1")]).then(a.bind(null,"f4a0"))},{path:encodeURI("/活動簽到表單"),name:"活動簽到表單",component:()=>a.e("chunk-3e3f9d0c").then(a.bind(null,"9b55"))},{path:encodeURI("/志工排班查詢"),name:"志工排班查詢",component:()=>Promise.all([a.e("chunk-dc2ab316"),a.e("chunk-d8b2d8f4")]).then(a.bind(null,"2d3b"))},{path:encodeURI("/駐站解說"),name:"駐站解說",component:()=>a.e("chunk-cc3de90e").then(a.bind(null,"14c5"))},{path:encodeURI("/大型活動資訊"),name:"大型活動資訊",component:()=>a.e("chunk-35a0bd71").then(a.bind(null,"4696"))},{path:encodeURI("/相關網站"),name:"相關網站",component:()=>a.e("chunk-2d226689").then(a.bind(null,"e910"))},{path:encodeURI("/分享APP"),name:"分享APP",component:()=>a.e("chunk-c58ce902").then(a.bind(null,"fbd8"))},{path:encodeURI("/使用小秘訣"),name:"使用小秘訣",component:()=>a.e("chunk-935eafd8").then(a.bind(null,"c3ef"))},{path:encodeURI("/小額捐款"),name:"小額捐款",component:()=>a.e("chunk-f6d5047e").then(a.bind(null,"4188"))},{path:encodeURI("/關渡自然公園即時鳥況"),name:"關渡自然公園即時鳥況",component:()=>a.e("chunk-949cbf2e").then(a.bind(null,"77f0"))},{path:"*",redirect:"/"}],W=new R["a"]({mode:"history",base:"/",routes:H});var F=W,q=a("2f62");n["a"].use(q["a"]);var G=new q["a"].Store({state:{apikey:"1vrj7j72ob38"},mutations:{},actions:{},modules:{}}),V=a("f309");n["a"].use(V["a"]);var J=new V["a"]({icons:{iconfont:"mdiSvg"}}),K=a("2ead"),Z=a.n(K),Q=a("7f45"),X=a.n(Q),ee=a("bf4e"),te=a.n(ee),ae=a("2b27"),ne=a.n(ae),se=a("a584"),ie=a("a925");const oe={"台北鳥會例行活動":"Regular activities of the WBST","例行活動":"Regular activity","駐站解說":"On-site commentary","歷史記錄查詢":"Historical record inquiry","例行路線查詢":"Regular route inquiry","大型活動資訊":"Information on major activity","關渡自然公園即時鳥況":"Birding information on Guandu Nature Park  ","志工排班查詢":"Volunteer scheduling inquiry","活動報到個資設定":"Personal information setting","活動簽到表單":"Activity sign-in form","分享APP":"Share the App","小額捐款":"Micro-Donations","相關網站":"Relevant websites","深色模式":"Dark mode","路線":"Route","集合時間":"Gathering time","集合地點":"Gathering location","解說員":"Tour leader",__msg_alert__:"If the activity is canceled or the route is changed due to typhoons, heavy rain, or other uncontrollable factors, it will be announced one working day in advance and simultaneously announced on the WBST's official website, Facebook page, and WBST App. Before heading out, please confirm whether there are any changes to the activity.","eBird熱點資訊":"eBird hotspot information","賞鳥綠地圖":"Bird Watching Green Map",__msg_1973999__:"Present the barcode or inform the WBSTdonation code 1973999","小額信用卡":"Micro-donation via credit card","活動簽到":"Activity check-in",__msg_install__:"Install on desktop for easy access anytime","安裝":"Install","取消":"Cancel",__msg_install_ios__:"For iOS users, please open in Safari and select 'Share'","加入主畫面":"Add to Home Screen",__msg_limit__:"Limited capacity event, advance registration required",__msg_realname_help__:"Afterward, the personal information will be automatically filled in the next activity check-in. Family members can also set up multiple sets of information","姓名":"Name",__msg_phone__:"Phone number (both mobile and landline are acceptable",__msg_member__:"Are you a member of the WBST (Wild Bird Society of Taipei)","是":"Yes","否":"No","存檔":"Save","發票愛心碼":"Charity Code for invoice","資料更新中":"Data updating","更新資料":"Update data","新增個人資料":"Add personal information","關渡自然公園":"Guandu Nature Park","芝山綠園":"Zhishan Cultural and Ecological Garden","大安森林公園":"Daan Park.","賞鳥記錄":"Bird watching record","本週活動尚未確認":"This week's event has not been confirmed yet","使用小秘訣":"Tips for use"},re={"台北鳥會例行活動":"台北鳥會例行活動","例行活動":"例行活動","駐站解說":"駐站解說","歷史記錄查詢":"歷史記錄查詢","例行路線查詢":"例行路線查詢","大型活動資訊":"大型活動資訊","關渡自然公園即時鳥況":"關渡自然公園即時鳥況","志工排班查詢":"志工排班查詢","活動報到個資設定":"活動報到個資設定","活動簽到表單":"活動簽到表單","分享APP":"分享APP","小額捐款":"小額捐款","相關網站":"相關網站","深色模式":"深色模式","路線":"路線","集合時間":"集合時間","集合地點":"集合地點","解說員":"解說員",__msg_alert__:"如遇颱風豪雨或不可抗拒因素取消活動或變更路線，將於前一工作日公告同步公告於台北鳥會官網與FB粉專及北鳥例行APP，出門前請確認活動是否異動。","eBird熱點資訊":"eBird熱點資訊","賞鳥綠地圖":"賞鳥綠地圖",__msg_1973999__:"出示條碼或告知鳥會捐贈碼1973999","小額信用卡":"小額信用卡","活動簽到":"活動簽到",__msg_install__:"安裝至桌面,隨時可以查詢","安裝":"安裝","取消":"取消",__msg_install_ios__:"iOS使用者, 請使用Safari開啟, 選擇分享後","加入主畫面":"加入主畫面",__msg_limit__:"人數限定場，需事先報名",__msg_realname_help__:"設定後,下次執行活動簽到會自動帶入個人資料。家庭成員也可以設定多組資料。","姓名":"姓名",__msg_phone__:"電話號碼(手機/市話皆可)",__msg_member__:"是否為台北鳥會會員？","是":"是","否":"否","存檔":"存檔","發票愛心碼":"發票愛心碼","資料更新中":"資料更新中","更新資料":"更新資料","新增個人資料":"新增個人資料","關渡自然公園":"關渡自然公園","芝山綠園":"芝山綠園","大安森林公園":"大安森林公園","賞鳥記錄":"賞鳥記錄","本週活動尚未確認":"本週活動尚未確認","使用小秘訣":"使用小秘訣"};n["a"].use(ie["a"]);let ce={};ce={...ce,en:oe,tw:re};const de=localStorage.getItem("language")||"tw",le=new ie["a"]({locale:de,messages:ce});var he=le;a("90ea"),n["a"].config.productionTip=!1,n["a"].use(se["a"],{config:{id:"G-8MND1DTFLR"}},F),n["a"].use(o["a"],i.a),n["a"].use(te.a),n["a"].use(ne.a),n["a"].use(Z.a,{moment:X.a}),new n["a"]({i18n:he,router:F,store:G,vuetify:J,render:e=>e(L)}).$mount("#app")}});
//# sourceMappingURL=app.adf5602c.js.map