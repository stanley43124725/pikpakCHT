var y=Object.defineProperty;var v=Object.getOwnPropertySymbols;var x=Object.prototype.hasOwnProperty,N=Object.prototype.propertyIsEnumerable;var m=(l,e,o)=>e in l?y(l,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):l[e]=o,B=(l,e)=>{for(var o in e||(e={}))x.call(e,o)&&m(l,o,e[o]);if(v)for(var o of v(e))N.call(e,o)&&m(l,o,e[o]);return l};import{d as I,r as _,l as P,u as S,p as T,a as K,b as U,s as V,E as t,e as a,f as u,ao as j,w as s,ad as O,am as d,R as k,aQ as z,aT as G,Q as L,F as h,I as w,aU as M,aV as J,y as p}from"./vendor.c9705c7c.js";import{_ as Q,a as R}from"./favicon.61477d4b.js";import{i as C}from"./index.7697fa94.js";const W={class:"login-page"},Y=t("div",{class:"down"},[t("img",{src:Q})],-1),q={class:"login"},H=t("div",{class:"logo-box"},[t("img",{src:R,class:"logo-box__icon",alt:""}),t("div",{class:"logo-box__text"},"PikPak")],-1),X={class:"login-box"},Z=p("\u81EA\u52D5\u767B\u5165"),$=p("\u767B\u5165"),ee=t("a",{target:"_blank",href:"https://i.mypikpak.com/v1/file/center/account/v1/password/?type=forget_password&locale=zh-cn",class:"forget-password"},"\u5FD8\u8A18\u5BC6\u78BC",-1),ae=p("\u8A3B\u518A"),ue={class:"login-other"},se=p(" \u624B\u6A5F\u767B\u5165 "),oe=p(" APP\u5167Google\u767B\u5165\u7684\u5E33\u865F\u8ACB\u5148\u901A\u904E\u5FD8\u8A18\u5BC6\u78BC\u8A2D\u7F6E\u5BC6\u78BC\u5F8C\u767B\u5165 "),re=I({setup(l){const e=_({username:"",password:""}),o=_(!1),F=P(),A=S(),g=()=>{if(!e.value.password||!e.value.username)return!1;o.value=!0,C.post("https://user.mypikpak.com/v1/auth/signin",B({captcha_token:"",client_id:"YNxT9w7GMdWvEOKa",client_secret:"dbw2OtmVEeuUvIptb1Coyg"},e.value)).then(n=>{n.data&&n.data.access_token&&(window.localStorage.setItem("pikpakLogin",JSON.stringify(n.data)),r.value?window.localStorage.setItem("pikpakLoginData",JSON.stringify(e.value)):window.localStorage.removeItem("pikpakLoginData"),A.success("\u767B\u5165\u6210\u529F"),F.push("/"))}).catch(()=>{o.value=!1})},r=_(!1),b=T(),E=()=>{r.value&&b.warning({title:"\u8B66\u544A",content:"\u81EA\u52D5\u767B\u5165\u662F\u6307\u700F\u89BD\u5668\u672C\u5730\u660E\u6587\u4FDD\u5B58\u4F7F\u7528\u8005\u540D\u7A31\u5BC6\u78BC\u7528\u65BC\u4E0B\u6B21\u81EA\u52D5\u767B\u5165\uFF0C\u8ACB\u52FF\u5728\u975E\u4FE1\u4EFB\u8A2D\u5099\u4E0A\u9078\u64C7",positiveText:"\u78BA\u5B9A",negativeText:"\u53D6\u6D88",onPositiveClick:()=>{},onNegativeClick:()=>{r.value=!1}})},D=()=>{C.get("https://api-drive.mypikpak.com/package/v1/apk/url/273403").then(n=>{window.open(n.data.apk_url)})};return(n,i)=>{const f=K("router-link");return U(),V("div",W,[Y,t("div",q,[H,t("div",X,[a(u(j),{"label-align":"left","label-placement":"left","label-width":"0",class:"login-form"},{default:s(()=>[a(u(d),{label:""},{default:s(()=>[a(u(k),{value:e.value.username,"onUpdate:value":i[0]||(i[0]=c=>e.value.username=c),placeholder:"\u8ACB\u8F38\u5165\u4FE1\u7BB1"},null,8,["value"])]),_:1}),a(u(d),{label:""},{default:s(()=>[a(u(k),{value:e.value.password,"onUpdate:value":i[1]||(i[1]=c=>e.value.password=c),placeholder:"\u8ACB\u8F38\u5165\u5BC6\u78BC",onKeyup:z(g,["enter"]),type:"password","show-password-on":"mousedown"},null,8,["value","onKeyup"])]),_:1}),a(u(d),{label:""},{default:s(()=>[a(u(G),{checked:r.value,"onUpdate:checked":[i[2]||(i[2]=c=>r.value=c),E]},{default:s(()=>[Z]),_:1},8,["checked"])]),_:1}),a(u(d),null,{default:s(()=>[a(u(L),{type:"primary",class:"block",loading:o.value,onClick:g},{default:s(()=>[$]),_:1},8,["loading"])]),_:1}),a(u(d),{label:""},{default:s(()=>[ee,a(f,{to:"/register",class:"register"},{default:s(()=>[ae]),_:1}),t("a",{href:"javascript:;",onClick:D},"APK\u4E0B\u8F09")]),_:1})]),_:1}),t("div",ue,[a(u(O),{inline:""},{default:s(()=>[a(u(h),null,{trigger:s(()=>[a(f,{to:"sms"},{default:s(()=>[a(u(w),{color:"#306eff",size:32},{default:s(()=>[a(u(M))]),_:1})]),_:1})]),default:s(()=>[se]),_:1}),a(u(h),null,{trigger:s(()=>[a(u(w),{color:"#306eff",size:32},{default:s(()=>[a(u(J))]),_:1})]),default:s(()=>[oe]),_:1})]),_:1})])])])])}}});export{re as default};