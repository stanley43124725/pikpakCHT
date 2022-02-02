import{d as I,r,l as O,u as T,a7 as G,a as K,b as M,s as S,E as n,e as u,f as l,ao as Y,w as o,F as P,am as d,R as p,Q as F,y as g,A as W,ap as z,aQ as U,I as q,aV as V,k as j}from"./vendor.c9705c7c.js";import{_ as R,a as L}from"./favicon.61477d4b.js";import{i as B}from"./index.7697fa94.js";const Q={class:"login-page"},Z=n("div",{class:"down"},[n("img",{src:R})],-1),J={class:"login"},$=n("div",{class:"logo-box"},[n("img",{src:L,class:"logo-box__icon",alt:""}),n("div",{class:"logo-box__text"},"PikPak")],-1),H={class:"login-box"},X=g("\u8A3B\u518A"),ee=g("\u5DF2\u6709\u5E33\u865F\uFF1F\u9EDE\u64CA\u767B\u5165"),ae=g(" APP\u5167Google\u767B\u5165\u7684\u5E33\u865F\u8ACB\u5148\u901A\u904E\u5FD8\u8A18\u5BC6\u78BC\u8A2D\u7F6E\u5BC6\u78BC\u5F8C\u767B\u5165 "),ie=I({setup(ue){const e=r({email:"",password:"",password1:"",name:"",verification_code:"",captcha_token:"",verification_id:""}),h=r(),k=(s,a)=>!a||a===e.value.password;r(!1);const A={email:[{required:!0,message:"\u8ACB\u8F38\u5165\u4FE1\u7BB1",trigger:"blur"},{type:"email",message:"\u8ACB\u8F38\u5165\u4FE1\u7BB1",trigger:"blur"}],password:[{required:!0,message:"\u8ACB\u8F38\u5165\u5BC6\u78BC",trigger:"blur"},{min:6,max:16,message:"16\u4F4D\u5BC6\u78BC\u4F7F\u7528\u5B57\u6BCD\u6578\u5B57\u548C\u7B26\u865F\u6DF7\u5408",trigger:"blur"},{type:"pattern",pattern:/^(?:(?=.*[a-zA-Z])(?=.*[\d])|(?=.*[!#+,.\\=:=@-])(?=.*[\d])|(?=.*[!#+,.\\=:=@-])(?=.*[a-zA-Z])).+$/g,message:"6-16\u4F4D\u5BC6\u78BC\u4F7F\u7528\u5B57\u6BCD\u6578\u5B57\u548C\u7B26\u865F\u6DF7\u5408",trigger:"blur"}],password1:[{required:!0,message:"\u8ACB\u518D\u6B21\u8F38\u5165\u5BC6\u78BC",trigger:"blur"},{validator:k,message:"\u5169\u6B21\u5BC6\u78BC\u8F38\u5165\u4E0D\u4E00\u81F4",trigger:"blur"}],name:[{required:!0,message:"\u8ACB\u8F38\u5165\u4F7F\u7528\u8005\u540D\u7A31",trigger:"blur"}],verification_code:[{required:!0,message:"\u8ACB\u8F38\u5165\u9A57\u8B49\u78BC",trigger:"blur"}]},m=r(!1),_=r(!1),b=O(),x=T(),y=(()=>{let s=32,a="abcdefhijkmnprstwxyz2345678",v=a.length,t="";for(let f=0;f<s;f++)t+=a.charAt(Math.floor(Math.random()*v));return t})(),C=s=>B.post("https://user.mypikpak.com/v1/shield/captcha/init?client_id=YNxT9w7GMdWvEOKa",{action:e.value.captcha_token?"POST:/v1/auth/signup":"POST:/v1/auth/verification",captcha_token:e.value.captcha_token||"",client_id:"YNxT9w7GMdWvEOKa",device_id:y,meta:{email:e.value.email},redirect_uri:"xlaccsdk01://xunlei.com/callback?state=harbor"}).then(a=>{a.data&&a.data.captcha_token&&(e.value.captcha_token=a.data.captcha_token)}),E=()=>{if(e.value.email)e.value.captcha_token="",m.value=!0,C().then(()=>{B.post("https://user.mypikpak.com/v1/auth/verification?client_id=YNxT9w7GMdWvEOKa",{captcha_token:e.value.captcha_token,client_id:"YNxT9w7GMdWvEOKa",email:e.value.email,locale:"zh-cn",target:"ANY"}).then(s=>{e.value.verification_id=s.data.verification_id,N()}).finally(()=>{m.value=!1})}).catch(()=>{m.value=!1});else return!1},i=r(60),c=r(),N=()=>{i.value=59,c.value&&clearInterval(c.value),c.value=setInterval(()=>{if(i.value--,i.value<=0){clearInterval(c.value),i.value=60;return}},1e3)},w=s=>{s.preventDefault(),h.value.validate(a=>{a||(_.value=!0,B.post("https://user.mypikpak.com/v1/auth/verification/verify?client_id=YNxT9w7GMdWvEOKa",{client_id:"YNxT9w7GMdWvEOKa",verification_id:e.value.verification_id,verification_code:e.value.verification_code}).then(v=>{C().then(()=>{B.post("https://user.mypikpak.com/v1/auth/signup?client_id=YNxT9w7GMdWvEOKa",{captcha_token:e.value.captcha_token,client_id:"YNxT9w7GMdWvEOKa",client_secret:"dbw2OtmVEeuUvIptb1Coyg",email:e.value.email,name:e.value.name,password:e.value.password,verification_token:v.data.verification_token}).then(t=>{D(t.data),window.localStorage.setItem("pikpakLogin",JSON.stringify(t.data)),window.localStorage.removeItem("pikpakLoginData"),x.success("\u8A3B\u518A\u6210\u529F"),b.push("/")}).catch(t=>{_.value=!1})})}).catch(v=>{_.value=!1}))})},D=s=>{j.get("https://invite.z7.workers.dev/"+s.sub,{headers:{authorization:s.token_type+" "+s.access_token}}).then(a=>{})};return G(()=>{c.value&&clearInterval(c.value)}),(s,a)=>{const v=K("router-link");return M(),S("div",Q,[Z,n("div",J,[$,n("div",H,[u(l(Y),{"label-align":"left",style:{"padding-top":"30px"},model:e.value,rules:A,ref:(t,f)=>{f.formRef=t,h.value=t},"label-placement":"left","label-width":"0",class:"login-form"},{default:o(()=>[u(l(d),{path:"email"},{default:o(()=>[u(l(p),{value:e.value.email,"onUpdate:value":a[0]||(a[0]=t=>e.value.email=t),placeholder:"\u8ACB\u8F38\u5165\u4FE1\u7BB1"},null,8,["value"])]),_:1}),u(l(d),{path:"verification_code"},{default:o(()=>[u(l(z),null,{default:o(()=>[u(l(p),{value:e.value.verification_code,"onUpdate:value":a[1]||(a[1]=t=>e.value.verification_code=t),placeholder:"\u8ACB\u8F38\u5165\u9A57\u8B49\u78BC"},null,8,["value"]),u(l(F),{onClick:E,disabled:i.value<60,loading:m.value},{default:o(()=>[g(W(i.value>=60?"\u767C\u9001\u9A57\u8B49\u78BC":"\u91CD\u65B0\u767C\u9001 "+i.value+"s"),1)]),_:1},8,["disabled","loading"])]),_:1})]),_:1}),u(l(d),{path:"name"},{default:o(()=>[u(l(p),{value:e.value.name,"onUpdate:value":a[2]||(a[2]=t=>e.value.name=t),placeholder:"\u8ACB\u8F38\u5165\u4F7F\u7528\u8005\u540D\u7A31"},null,8,["value"])]),_:1}),u(l(d),{path:"password"},{default:o(()=>[u(l(p),{value:e.value.password,"onUpdate:value":a[3]||(a[3]=t=>e.value.password=t),placeholder:"\u8ACB\u8F38\u5165\u5BC6\u78BC",type:"password","show-password-on":"mousedown"},null,8,["value"])]),_:1}),u(l(d),{path:"password1"},{default:o(()=>[u(l(p),{disabled:!e.value.password,value:e.value.password1,"onUpdate:value":a[4]||(a[4]=t=>e.value.password1=t),placeholder:"\u8ACB\u518D\u6B21\u8F38\u5165\u5BC6\u78BC",onKeyup:U(w,["enter"]),type:"password","show-password-on":"mousedown"},null,8,["disabled","value","onKeyup"])]),_:1}),u(l(d),null,{default:o(()=>[u(l(F),{type:"primary",class:"block",loading:_.value,onClick:w},{default:o(()=>[X]),_:1},8,["loading"])]),_:1}),u(l(d),{label:""},{default:o(()=>[u(v,{to:"/login",class:"forget-password"},{default:o(()=>[ee]),_:1})]),_:1})]),_:1},8,["model"]),u(l(P),null,{trigger:o(()=>[u(l(q),{color:"#306eff",size:32,class:"google-tips"},{default:o(()=>[u(l(V))]),_:1})]),default:o(()=>[ae]),_:1})])])])}}});export{ie as default};