(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["artifactsform"],{"0625":function(t,e,s){},"278e":function(t,e,s){"use strict";var a=s("0625"),i=s.n(a);i.a},7039:function(t,e,s){var a=s("23e7"),i=s("d039"),n=s("057f").f,r=i((function(){return!Object.getOwnPropertyNames(1)}));a({target:"Object",stat:!0,forced:r},{getOwnPropertyNames:n})},"804c":function(t,e,s){"use strict";s.r(e);var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"bx--content",attrs:{id:"artifact-form"}},[s("v-card",{staticClass:"elevation-24"},[s("v-card-title",[t._v("Add Artifact")]),s("cv-form",{on:{submit:function(e){return e.preventDefault(),t.addArtifact(e)}}},[s("body",[s("cv-text-input",{attrs:{label:"Title",placeholder:"Enter the title of the artifact"},model:{value:t.instance.title,callback:function(e){t.$set(t.instance,"title",e)},expression:"instance.title"}},[t._v(' invalid-message="" '),t.showInvalid.title?s("template",{slot:"invalid-message"},[t._v(" Required field ")]):t._e()],2),s("cv-text-input",{attrs:{label:"URL",placeholder:"Provide a link to the full text of the artifact"},model:{value:t.instance.link_to_full_text,callback:function(e){t.$set(t.instance,"link_to_full_text",e)},expression:"instance.link_to_full_text"}},[t._v(" >")]),s("cv-text-area",{attrs:{label:"Summary",placeholder:"Provide your own summary of the artifact"},model:{value:t.instance.summary,callback:function(e){t.$set(t.instance,"summary",e)},expression:"instance.summary"}},[t._v(' invalid-message="" '),t.showInvalid.summary?s("template",{slot:"invalid-message"},[t._v(" Required field ")]):t._e(),t._v(" >")],2),s("cv-select",{attrs:{label:"Status",placeholder:"Choose an option",invalidStatusMessage:t.invalidStatusMessage},model:{value:t.instance.status,callback:function(e){t.$set(t.instance,"status",e)},expression:"instance.status"}},[s("cv-select-option",{attrs:{disabled:"",selected:""}},[t._v("Choose an option")]),s("cv-select-option",[t._v("Introduced")]),s("cv-select-option",[t._v("Referred")]),s("cv-select-option",[t._v("Reported")]),s("cv-select-option",[t._v("Failed")]),s("cv-select-option",[t._v("Passed")]),s("cv-select-option",[t._v("Enacted")]),s("cv-select-option",[t._v("Vetoed")])],1),s("cv-date-picker",{attrs:{"date-label":"Date introduced",kind:"single"},model:{value:t.instance.date_introduced,callback:function(e){t.$set(t.instance,"date_introduced",e)},expression:"instance.date_introduced"}})],1),t.errorTitle?s("cv-toast-notification",{attrs:{kind:"error",title:t.errorTitle,"sub-title":t.errorSubTitle,"close-aria-label":t.closeAriaLabel,"low-contrast":t.lowContrast},on:{close:t.doClose}}):t._e(),t.successTitle?s("cv-toast-notification",{attrs:{kind:"success",title:t.successTitle,"sub-title":t.successSubTitle,"close-aria-label":t.closeAriaLabel,"low-contrast":t.lowContrast},on:{close:t.doClose}}):t._e(),s("cv-button",{attrs:{kind:"primary"}},[t._v("Add")]),s("cv-button",{staticStyle:{float:"right"},attrs:{kind:"secondary"},on:{click:t.doReset}},[t._v("Reset")])],1)],1)],1)},i=[],n=(s("7039"),s("d3b7"),s("5530")),r=(s("96cf"),s("1da1")),l={name:"artifact-form",data:function(){return{statusPlaceholder:"Choose an option",instance:{title:"",summary:"",link_to_full_text:"",date_introduced:"",status:this.statusPlaceholder},disabled:!1,visible:!1,status:"",invalidStatusMessage:!1,useInvalidMessageSlot:!1,showInvalid:{title:!1,summary:!1},errorTitle:!1,errorSubTitle:"",successTitle:!1,successSubTitle:"",closeAriaLabel:"Custom close aria label",lowContrast:!0,category:"",priority:"",categories:["Equipment","Service Access","Facilities","Other"],statuses:["INTRODUCED","REFERRED","REPORTED","FAILED","PASSED","ENACTED","VETOED"]}},methods:{doReset:function(){this.errorTitle=!1,this.errorSubTitle=!1,this.successTitle=!1,this.successSubTitle=!1,this.instance.title="",this.instance.summary="",this.instance.link_to_full_text="",this.instance.status=this.statusPlaceholder,this.instance.date_introduced=""},doClose:function(){this.successTitle?this.doReset():(this.errorTitle=!1,this.errorSubTitle=!1,this.successTitle=!1,this.successSubTitle=!1)},formInvalidator:function(){for(var t=!1,e=Object.getOwnPropertyNames(this.showInvalid),s=0;s<e.length;s+=1){var a=e[s],i=!this.instance[a];this.showInvalid[a]=i,t=t||i}return t},okStatus:function(t){return t.status>=200&&t.status<300?(this.successTitle=t.statusText,this.successSubTitle="HTTP Status Code: ".concat(t.status),!0):(this.errorTitle=t.statusText,this.errorSubTitle="HTTP Status Code: ".concat(t.status),!1)},addArtifact:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var s,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!t.formInvalidator()){e.next=2;break}return e.abrupt("return");case 2:return e.prev=2,s=Object(n["a"])({},t.instance),s.status===t.statusPlaceholder&&delete s.status,""===s.date_introduced&&delete s.date_introduced,""===s.link_to_full_text&&delete s.link_to_full_text,e.next=9,fetch("/api/v1/legislativeArtifacts",{method:"POST",body:JSON.stringify(s),headers:{"Content-type":"application/json; charset=UTF-8"}});case 9:if(a=e.sent,!t.okStatus(a)){e.next=13;break}return e.next=13,a.json();case 13:e.next=20;break;case 15:e.prev=15,e.t0=e["catch"](2),t.errorTitle=e.t0,t.errorSubTitle="",console.error(e.t0);case 20:case"end":return e.stop()}}),e,null,[[2,15]])})))()}}},o=l,c=(s("278e"),s("2877")),u=s("6544"),d=s.n(u),v=s("b0af"),f=s("99d9"),h=Object(c["a"])(o,a,i,!1,null,null,null);e["default"]=h.exports;d()(h,{VCard:v["a"],VCardTitle:f["d"]})}}]);
//# sourceMappingURL=artifactsform.3afdffea.js.map