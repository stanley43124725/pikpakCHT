var de=Object.defineProperty;var U=Object.getOwnPropertySymbols;var pe=Object.prototype.hasOwnProperty,me=Object.prototype.propertyIsEnumerable;var H=(e,t,o)=>t in e?de(e,t,{enumerable:!0,configurable:!0,writable:!0,value:o}):e[t]=o,W=(e,t)=>{for(var o in t||(t={}))pe.call(t,o)&&H(e,o,t[o]);if(U)for(var o of U(t))me.call(t,o)&&H(e,o,t[o]);return e};import{d as A,u as ge,r as h,o as K,a as Y,b as v,c as G,w as c,e as i,f as n,N as _e,g as he,h as ve,z as fe,i as ke,j as ye,k as Z,l as we,m as be,n as Ee,p as xe,q as Ne,s as y,t as Ie,v as Ce,x as Le,y as b,A as S,B as Ae,C as Se,D as C,E as k,F as q,G as $e,H as De,I as $,L as Pe,J as X,K as Oe,M as Be,O as Te,P as Fe,Q as Re,R as Ve,S as Me,T as je,U as Q,V as ze,W as Je,X as Ue,Y as He,Z as We,_ as Ke,$ as Ye,a0 as Ge,a1 as Ze,a2 as qe,a3 as Xe,a4 as Qe}from"./vendor.c9705c7c.js";const et=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const l of r.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function o(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(s){if(s.ep)return;s.ep=!0;const r=o(s);fetch(s.href,r)}};et();const tt=A({setup(e){return window.$message=ge(),(t,o)=>null}}),ot=["https://pikpak.6948701.workers.dev"],st=A({setup(e){const t=h({common:{primaryColor:"#306eff",hoverColor:"#306eff",primaryColorHover:"#306eff",heightMedium:"42px"},Layout:{siderColor:"#f5f5f6"},Breadcrumb:{fontSize:"16px"},Dropdown:{optionTextColorHover:"#fff"},InternalSelectMenu:{optionTextColorActive:"#fff"},Upload:{itemColorHover:"#F3F3F5FF",itemTextColorSuccess:"#18A058FF"}});return K(()=>{localStorage.getItem("isSettingProxy")||localStorage.setItem("proxy",JSON.stringify(ot))}),(o,a)=>{const s=Y("router-view");return v(),G(n(ye),{locale:n(fe),"date-locale":n(ke),"theme-overrides":t.value},{default:c(()=>[i(n(ve),null,{default:c(()=>[i(n(_e),null,{default:c(()=>[i(n(he),null,{default:c(()=>[i(tt),i(s)]),_:1})]),_:1})]),_:1})]),_:1},8,["locale","date-locale","theme-overrides"])}}}),at="modulepreload",ee={},nt="",p=function(t,o){return!o||o.length===0?t():Promise.all(o.map(a=>{if(a=`${nt}${a}`,a in ee)return;ee[a]=!0;const s=a.endsWith(".css"),r=s?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${a}"]${r}`))return;const l=document.createElement("link");if(l.rel=s?"stylesheet":at,s||(l.as="script",l.crossOrigin=""),l.href=a,document.head.appendChild(l),s)return new Promise((N,g)=>{l.addEventListener("load",N),l.addEventListener("error",g)})})).then(()=>t())};var it="assets/logo1.08eb9157.png";const m=Z.create({});m.interceptors.request.use(e=>{var o;const t=JSON.parse(window.localStorage.getItem("pikpakLogin")||"{}");if(e.headers=e.headers||{},t.access_token&&(e.headers.Authorization=`${t.token_type||"Bearer"} ${t.access_token}`),((o=e.url)==null?void 0:o.indexOf("https://",4))===-1){const a=JSON.parse(window.localStorage.getItem("proxy")||"[]");if(a.length>0){const s=Math.floor(Math.random()*a.length);e.url=a[s]+"/"+e.url}}return e});let E=!1;m.interceptors.response.use(e=>e,e=>{var a;const{response:t,config:o}=e;if(t.status)switch(t.status){case 401:const s=window.localStorage.getItem("pikpakLoginData"),r=s?JSON.parse(s):{};return r.username&&r.password&&!E?(console.log("wait",o.url),E=!0,m.post("https://user.mypikpak.com/v1/auth/signin",W({captcha_token:"",client_id:"YNxT9w7GMdWvEOKa",client_secret:"dbw2OtmVEeuUvIptb1Coyg"},r)).then(l=>(l.data&&l.data.access_token&&window.localStorage.setItem("pikpakLogin",JSON.stringify(l.data)),E=!1,m(o))).catch(()=>(L.push("/login"),!1))):r.username&&r.password&&E?new Promise((l,N)=>{const g=setInterval(()=>{E||(clearInterval(g),l(m(o)))},100)}):(L.push("/login"),!1);default:window.$message.error(((a=t==null?void 0:t.data)==null?void 0:a.error_description)||"\u51FA\u9519\u4E86");break}return console.log(o.url,111),Promise.reject(e)});const te=Z.create({});te.interceptors.request.use(e=>{e.headers={Authorization:"Bearer secret_FErDcv3kgsFNLiWUDOWYdJhNqOIKj55eteBg3vIoiLt","Notion-Version":"2021-08-16","Content-Type":"application/json"};const t=JSON.parse(window.localStorage.getItem("proxy")||"[]");if(t.length>0){const o=Math.floor(Math.random()*t.length);e.url=t[o]+"/"+e.url}return e});const Nt=te,oe=function(e){if(isNaN(e))return"";let t=["bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],o=Math.floor(Math.log(e)/Math.log(2));o<1&&(o=0);let a=Math.floor(o/10);return e=e/Math.pow(2,10*a),e.toString().length>e.toFixed(2).toString().length&&(e=parseFloat(e.toFixed(2))),e+" "+t[a]};const rt=k("a",{href:"https://mypikpak.com/",target:"_blank",class:"logo-box"},[k("img",{src:"https://www.mypikpak.com/logo.png",class:"logo-box__icon",alt:""}),k("div",{class:"logo-box__text"},"PikPak")],-1),lt={key:0,class:"content-bottom"},ut=b("\u6703\u54E1\u78BC"),ct={style:{"margin-bottom":"0"}},dt={class:"bottom-user-info"},pt={key:0,src:it,class:"user-info-avatar"},mt={key:1,src:"https://www.mypikpak.com/logo.png",class:"user-info-avatar"},gt={class:"user-info-name"},_t={key:0},ht={class:"action"},vt=b(" \u767B\u51FA "),ft=b("\u6DFB\u52A0"),kt=A({setup(e){const t=h(!1),o=u=>()=>Q($,null,{default:()=>Q(u)}),a=we(),s=be(),r=h([{label:"\u6587\u4EF6",key:"list",icon:o(Ye)},{label:"\u5F71\u7247",key:"video",icon:o(ze)},{label:"\u5716\u7247",key:"image",icon:o(Je)},{label:"\u56DE\u6536\u7AD9",key:"trash",icon:o(Ue)},{label:"\u9080\u8ACB",key:"invited",icon:o(He)},{label:"\u8CC7\u6E90\u5EAB",key:"share",icon:o(We)},{label:"\u8A2D\u7F6E",key:"setting",icon:o(Ke)}]),l=h(),N=()=>{m.get("https://user.mypikpak.com/v1/user/me").then(u=>{window.localStorage.setItem("pikpakUser",JSON.stringify(u.data)),l.value=u.data}).catch(u=>{console.log(u)})},g=h(),D=()=>{m.get("https://api-drive.mypikpak.com/drive/v1/about").then(u=>{g.value=u.data}).catch(u=>{console.log(u)})},f=h(),se=()=>{m.get("https://api-drive.mypikpak.com/drive/v1/privilege/vip").then(u=>{var d;f.value=(d=u.data)==null?void 0:d.data})},ae=(u,d)=>{console.log(d),a.push("/"+d.key)};K(()=>{N(),D(),se()});const I=h(),w=h(!1),ne=()=>{m.post("https://api-drive.mypikpak.com/vip/v1/order/free",{activation_code:I.value}).then(u=>{window.$message.success("\u514C\u63DB\u6210\u529F"),D()}).catch(u=>{console.log(u)}).finally(()=>{w.value=!1})},P=h(!1),ie=u=>{P.value=u<800,t.value||(t.value=u<800)};Ee(s,()=>{P.value&&(t.value=!0)});const re=xe(),le=()=>{re.warning({title:"\u8B66\u544A",content:"\u78BA\u5B9A\u767B\u51FA\uFF1F",positiveText:"\u78BA\u5B9A",negativeText:"\u53D6\u6D88",onPositiveClick:()=>{m.post("https://user.mypikpak.com/v1/auth/revoke",{}).then(u=>{window.localStorage.removeItem("pikpakLogin"),window.localStorage.removeItem("pikpakLoginData"),window.$message.success("\u767B\u51FA\u6210\u529F"),a.push("/login")}).catch(u=>{console.log(u)})}})};return(u,d)=>{const ue=Y("router-view"),ce=Ne("resize");return v(),y(je,null,[Ie(i(n(X),{"has-sider":"",onResize:ie},{default:c(()=>[i(n(Ce),{"content-style":{display:"flex",flexDirection:"column"},"collapse-mode":"width","collapsed-width":0,width:240,"show-trigger":"bar",collapsed:t.value,onCollapse:d[1]||(d[1]=_=>t.value=!0),onExpand:d[2]||(d[2]=_=>t.value=!1),bordered:""},{default:c(()=>{var _,O,B,T,F,R,V,M,j,z,J;return[rt,i(n(Le),{options:r.value,value:String(n(s).name),"onUpdate:value":ae},null,8,["options","value"]),t.value?C("",!0):(v(),y("div",lt,[b(S(n(oe)((_=g.value)==null?void 0:_.quota.usage))+" / "+S(n(oe)((O=g.value)==null?void 0:O.quota.limit))+" ",1),i(n(Ae),{type:"primary",onClick:d[0]||(d[0]=bt=>w.value=!0)},{default:c(()=>[ut]),_:1}),((B=g.value)==null?void 0:B.quota)?(v(),G(n(Se),{key:0,type:"line",percentage:Number((((T=g.value)==null?void 0:T.quota.usage)/((F=g.value)==null?void 0:F.quota.limit)*100).toFixed(2)),"indicator-placement":"inside",height:14,color:((R=f.value)==null?void 0:R.status)==="ok"?"#d1ae6a":void 0,processing:""},null,8,["percentage","color"])):C("",!0),k("p",ct,[i(n(q),{width:600,placement:"right"})])])),t.value?C("",!0):(v(),y("div",{key:1,class:$e(["sider-bottom",{vip:((V=f.value)==null?void 0:V.status)==="ok"}])},[k("div",dt,[((M=f.value)==null?void 0:M.status)==="ok"?(v(),y("img",pt)):(v(),y("img",mt)),k("div",gt,[b(S((j=l.value)==null?void 0:j.name)+" ",1),((z=f.value)==null?void 0:z.status)==="ok"&&((J=f.value)==null?void 0:J.expire)?(v(),y("div",_t,[i(n(De),{time:new Date(f.value.expire),type:"datetime"},null,8,["time"])])):C("",!0)]),k("div",ht,[i(n(q),null,{trigger:c(()=>[i(n($),{onClick:le},{default:c(()=>[i(n(Pe))]),_:1})]),default:c(()=>[vt]),_:1})])])],2))]}),_:1},8,["collapsed"]),i(n(X),null,{default:c(()=>[i(n(Oe),{style:{height:"100vh"}},{default:c(()=>[i(n(Be),{style:{"max-height":"100vh"}},{default:c(()=>[i(ue)]),_:1})]),_:1})]),_:1})]),_:1},512),[[ce]]),i(n(Me),{show:w.value,"onUpdate:show":d[5]||(d[5]=_=>w.value=_)},{default:c(()=>[i(n(Te),{style:{width:"600px"},title:"\u6703\u54E1\u78BC"},{"header-extra":c(()=>[i(n($),{onClick:d[3]||(d[3]=_=>w.value=!1)},{default:c(()=>[i(n(Fe))]),_:1})]),action:c(()=>[i(n(Re),{block:!0,type:"primary",disabled:!I.value,onClick:ne},{default:c(()=>[ft]),_:1},8,["disabled"])]),default:c(()=>[i(n(Ve),{placeholder:"\u6703\u54E1\u78BC",value:I.value,"onUpdate:value":d[4]||(d[4]=_=>I.value=_)},null,8,["value"])]),_:1})]),_:1},8,["show"])],64)}}}),yt=[{path:"/",name:"home",component:kt,redirect:"/list",beforeEnter:(e,t,o)=>{const a=JSON.parse(window.localStorage.getItem("pikpakLogin")||"{}");(!a||!a.access_token)&&e.name!=="setting"?o("/login"):o()},children:[{path:"list/:id?",name:"list",component:()=>p(()=>import("./list.c8eb1000.js"),["assets/list.c8eb1000.js","assets/list.764e0448.css","assets/vendor.c9705c7c.js","assets/clipboard.c8563578.js"])},{path:"video",name:"video",component:()=>p(()=>import("./list.c8eb1000.js"),["assets/list.c8eb1000.js","assets/list.764e0448.css","assets/vendor.c9705c7c.js","assets/clipboard.c8563578.js"])},{path:"image",name:"image",component:()=>p(()=>import("./list.c8eb1000.js"),["assets/list.c8eb1000.js","assets/list.764e0448.css","assets/vendor.c9705c7c.js","assets/clipboard.c8563578.js"])},{path:"trash",name:"trash",component:()=>p(()=>import("./trash.be187096.js"),["assets/trash.be187096.js","assets/trash.99a3677d.css","assets/vendor.c9705c7c.js"])},{path:"setting",name:"setting",component:()=>p(()=>import("./setting.5b2bcbb0.js"),["assets/setting.5b2bcbb0.js","assets/setting.f947579c.css","assets/vendor.c9705c7c.js"])},{path:"invited",name:"invited",component:()=>p(()=>import("./invited.fd251819.js"),["assets/invited.fd251819.js","assets/invited.74b24e1e.css","assets/clipboard.c8563578.js","assets/vendor.c9705c7c.js"])},{path:"share",name:"share",component:()=>p(()=>import("./share.b6115b97.js"),["assets/share.b6115b97.js","assets/share.4f9c11c6.css","assets/vendor.c9705c7c.js"])}]},{path:"/t/:id?",name:"test",component:()=>p(()=>import("./test.ca0934db.js"),["assets/test.ca0934db.js","assets/vendor.c9705c7c.js"])},{path:"/s/:id/:password?",name:"shareInfo",component:()=>p(()=>import("./shareInfo.0ab2d7a4.js"),["assets/shareInfo.0ab2d7a4.js","assets/shareInfo.678356c6.css","assets/vendor.c9705c7c.js"])},{path:"/login",name:"login",component:()=>p(()=>import("./login.463109e9.js"),["assets/login.463109e9.js","assets/login.e70c129c.css","assets/vendor.c9705c7c.js","assets/phone-pc2.dbf6d71e.js"])},{path:"/sms",name:"sms",component:()=>p(()=>import("./sms.605d8790.js"),["assets/sms.605d8790.js","assets/sms.81a6d8ca.css","assets/phone-pc2.dbf6d71e.js","assets/vendor.c9705c7c.js"])},{path:"/register",name:"register",component:()=>p(()=>import("./register.a7212d85.js"),["assets/register.a7212d85.js","assets/register.5588ce76.css","assets/vendor.c9705c7c.js","assets/phone-pc2.dbf6d71e.js"])},{path:"/testtest",name:"testtest",component:()=>p(()=>import("./testtest.ab4b6323.js"),["assets/testtest.ab4b6323.js","assets/vendor.c9705c7c.js"])}],wt=Ge({history:Ze(),routes:yt});var L=wt;const x=qe(st);x.directive("resize",{mounted(e,t,o){e.$$erd=Xe({strategy:"scroll"}),e.$$erd.listenTo({},e,a=>{let s=a.offsetWidth,r=a.offsetHeight;e.$$time&&clearTimeout(e.$$time),e.$$time=setTimeout(()=>{var l;(l=o.props)==null||l.onResize(s,r)},300)})},unmounted(e){e.$$erd&&e.$$erd.uninstall(e),e.$$time&&clearTimeout(e.$$time)}});x.config.globalProperties.$http=m;x.use(L);x.use(Qe,{router:L,siteIdList:[1280510106]});x.mount("#app");export{oe as b,m as i,Nt as n,ot as p};
