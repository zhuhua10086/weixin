import{T as e,U as s,u as a,N as o,V as t,o as i,a as n,w as r,g as c,d,f as l,z as u}from"./index-967b4fa7.js";import{_ as f}from"./_plugin-vue_export-helper.1b428a4d.js";const p=f({data:()=>({}),methods:{login(){uni.getUserProfile&&uni.getUserProfile({lang:"zh_CN",desc:"用来授权登录该小程序！",success:i=>{e({provider:"weixin",onlyAuthorize:!0,success:function(e){const{code:n}=e;s({url:"https://api.weixin.qq.com/sns/jscode2session",method:"GET",data:{appid:"wx992685f07ee6fc18",secret:"0baa1bd7ad14ca34279cde6413671eb6",js_code:n,grant_type:"authorization_code"},success:e=>{const s=a(),{data:n}=e;s.setToken(n.openid),s.fillUser(i.userInfo),o({title:"登录成功"}),t({url:"/pages/my/my"})}})},fail:function(e){o({title:"登录失败"})}})}})}}},[["render",function(e,s,a,o,t,f){const p=u,m=c;return i(),n(m,{class:"container"},{default:r((()=>[d(p,{type:"primary",onClick:f.login},{default:r((()=>[l("微信授权登录")])),_:1},8,["onClick"])])),_:1})}]]);export{p as default};
