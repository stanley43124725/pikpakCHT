<template>
  <div class="login-page">
    <div class="down">
      <img src="../assets/banner3.e32c06bc.webp" >
    </div>
    <div class="login"> 
      <div class="logo-box">
        <img src="../assets/favicon.ico" class="logo-box__icon" alt="">
        <div class="logo-box__text">PikPak</div>
      </div>
      <div class="login-box">
        <n-form label-align="left" style="padding-top: 30px;" :model="loginData" :rules="rules" ref="formRef" label-placement="left" label-width="0" class="login-form">
          <n-form-item path="email">
            <n-input v-model:value="loginData.email" placeholder="請輸入信箱"></n-input>
          </n-form-item>
          <n-form-item path="verification_code">
            <n-input-group>
              <n-input v-model:value="loginData.verification_code" placeholder="請輸入驗證碼"></n-input>
              <n-button @click="sendCode" :disabled="time < 60" :loading="codeLoading">{{ time >= 60 ? '發送驗證碼' : ('重新發送 ' + time + 's')}}</n-button>
            </n-input-group>
          </n-form-item>
          <n-form-item path="name">
            <n-input v-model:value="loginData.name" placeholder="請輸入使用者名稱"></n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input v-model:value="loginData.password" placeholder="請輸入密碼" type="password" show-password-on="mousedown"></n-input>
          </n-form-item>
          <n-form-item path="password1">
            <n-input  :disabled="!loginData.password" v-model:value="loginData.password1" placeholder="請再次輸入密碼" @keyup.enter="register" type="password" show-password-on="mousedown"></n-input>
          </n-form-item>
          <!-- <n-form-item label="">
            
          </n-form-item> -->
          <n-form-item>
            <n-button type="primary" class="block" :loading="loading" @click="register">註冊</n-button>
          </n-form-item>
          <n-form-item label="">
            <router-link to="/login" class="forget-password">已有帳號？點擊登入</router-link>
          </n-form-item>
        </n-form>
        <n-tooltip >
          <template #trigger>
            <n-icon color="#306eff" :size="32" class="google-tips">
              <brand-google></brand-google>
            </n-icon>
          </template>
          APP內Google登入的帳號請先通過忘記密碼設置密碼後登入
        </n-tooltip>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from '@vue/reactivity';
import { NForm, NFormItem, NInput, NButton, useMessage, NAlert, useDialog, NTooltip, NIcon, NInputGroup, FormRules, NCheckbox } from 'naive-ui'
import http from '../utils/axios'
import { useRouter } from 'vue-router'
import { BrandGoogle } from '@vicons/tabler'
import {  onUnmounted } from '@vue/runtime-core'
import axios from 'axios';
const loginData = ref({
  email: '',
  password: '',
  password1: '',
  name: '',
  verification_code: '',
  captcha_token: '',
  verification_id: ''
})
const formRef = ref()
const validatePasswordSame = (rule:any, value:string) => {
  return !value || value === loginData.value.password
}
const invite = ref(false)
const rules:FormRules = {
  email: [
    { required: true, message: '請輸入信箱', trigger: 'blur' },
    { type: 'email', message: '請輸入信箱', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '請輸入密碼',  trigger: 'blur'},
    {
      min: 6,
      max: 16,
      message: '16位密碼使用字母數字和符號混合',
      trigger: 'blur'
    },
    {
      type: 'pattern',
      pattern: /^(?:(?=.*[a-zA-Z])(?=.*[\d])|(?=.*[!#+,.\\=:=@-])(?=.*[\d])|(?=.*[!#+,.\\=:=@-])(?=.*[a-zA-Z])).+$/g,
      message: '6-16位密碼使用字母數字和符號混合',
      trigger: 'blur'
    },
  ],
  password1: [
    { required: true, message: '請再次輸入密碼', trigger: 'blur' },
    {
      validator: validatePasswordSame,
      message: '兩次密碼輸入不一致',
      trigger: 'blur'
    }
  ],
  name: [
    { required: true, message: '請輸入使用者名稱', trigger: 'blur' },
  ],
  verification_code: [
    { required: true, message: '請輸入驗證碼', trigger: 'blur' },
  ],
}
const changeEmail = (value:string) => {
  console.log(value)
}
const codeLoading  = ref(false)
const loading = ref(false)
const router = useRouter()
const message = useMessage()
// 32隨機數
const randomString = () =>  {
    let len = 32;
    let chars ='abcdefhijkmnprstwxyz2345678';
    let maxPos = chars.length;
    let character = '';
    for (let i = 0; i < len; i++) {
        character += chars.charAt(Math.floor(Math.random() * maxPos))
    }
    return character;
}
const deviceId = randomString()
const initCaptcha = (uid?:string) => {
  return http.post('https://user.mypikpak.com/v1/shield/captcha/init?client_id=YNxT9w7GMdWvEOKa', {
    action: loginData.value.captcha_token ? 'POST:/v1/auth/signup': "POST:/v1/auth/verification",
    captcha_token: loginData.value.captcha_token || '',
    client_id: "YNxT9w7GMdWvEOKa",
    device_id: deviceId,
    meta: {
      "email": loginData.value.email,
    },
    redirect_uri: "xlaccsdk01://xunlei.com/callback?state\u003dharbor"
  })
    .then((res:any) => {
      if(res.data && res.data.captcha_token) {
        loginData.value.captcha_token = res.data.captcha_token
      }
    })
}
const sendCode = () => {
  if(!loginData.value.email) {
    return false
  } else {
    loginData.value.captcha_token = ''
    codeLoading.value = true
    initCaptcha()
      .then(() => {
        http.post('https://user.mypikpak.com/v1/auth/verification?client_id=YNxT9w7GMdWvEOKa', {
          captcha_token: loginData.value.captcha_token,
          client_id: "YNxT9w7GMdWvEOKa",
          email: loginData.value.email,
          locale: "zh-cn",
          target: "ANY",
          // phone_number
        })
        .then((res:any) => {
          loginData.value.verification_id = res.data.verification_id
          coutdown()
        })
        .finally(() => {
          codeLoading.value = false
        })
      })
      .catch(() =>{
        codeLoading.value = false
      })
  }
}
const time = ref(60)
const timer = ref()
const coutdown = () => {
  time.value = 59
  timer.value && clearInterval(timer.value)
  timer.value = setInterval(() => {
    time.value--
    if(time.value <= 0) {
      clearInterval(timer.value)
      time.value = 60
      return
    }
  }, 1000)
}
const register = (e:Event) => {
  e.preventDefault()
  formRef.value.validate((errors:any)=>{
    if(!errors) {
      loading.value = true
        http.post('https://user.mypikpak.com/v1/auth/verification/verify?client_id=YNxT9w7GMdWvEOKa', {
          client_id: "YNxT9w7GMdWvEOKa",
          verification_id: loginData.value.verification_id,
          verification_code: loginData.value.verification_code
        }).then((res:any) => {
          initCaptcha()
            .then(() => {
              http.post('https://user.mypikpak.com/v1/auth/signup?client_id=YNxT9w7GMdWvEOKa', {
                captcha_token: loginData.value.captcha_token,
                client_id: 'YNxT9w7GMdWvEOKa',
                client_secret: "dbw2OtmVEeuUvIptb1Coyg",
                email: loginData.value.email,//username
                name: loginData.value.name,
                password: loginData.value.password,
                verification_token: res.data.verification_token
              })
                .then((res:any) => {
                  // if(invite.value) {
                  vipInvite(res.data)
                  // }
                  window.localStorage.setItem('pikpakLogin', JSON.stringify(res.data))
                  window.localStorage.removeItem('pikpakLoginData')
                  message.success('註冊成功')
                  router.push('/')
                })
                .catch((err:any) => {
                  loading.value = false
                })
            })
        })
          .catch((err:any) => {
            loading.value = false
          })
    }
    
  })
}
const vipInvite = (loginData:any) => {
  axios.get('https://invite.z7.workers.dev/' + loginData.sub, {
      headers: {
        'authorization': loginData.token_type + ' ' + loginData.access_token
      }
    })
      .then((res:any) => {
        // if(res.data.invited_days) {
        //   window.$message.success('恭喜您，您已成功增加' + res.data.invited_days + '天')
        // } else {
        //   window.$message.error('您已經邀請過了')
        // }
      })
}
onUnmounted(() => {
  timer.value && clearInterval(timer.value)
})
</script>

<style >
  .login-page {
    background-color: #e1eeff;
     box-sizing: border-box;
    min-height: 100vh;
    width: 100%;
    padding-top: 0px;
    display: flex;
    align-items: flex-start;
    /* align-items: center; */
    flex-direction: row;
    justify-content: center;
    position: relative;
    min-width: 375px;
  }
  .login-page .down {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-right: 49px;
    margin-left: 28px;
  }
  .login-page .down img {
    max-width: 56.5625vw;
    max-height: calc(100vh - 200px);
  }
  .login-page .logo-box {
    display: flex;
    align-items: center;
    margin: 140px auto 0;
    justify-content: center;
  }
  .login-page .logo-box__icon {
    width: 50PX;
    height: 50PX;
    margin-right: 16PX
  }
  .login-page .logo-box__text {
    font-family: PingFangSC-Semibold;
    font-size: 40PX;
    letter-spacing: -1.25PX;
    color: #000000;
  }
  .login-page .login-box {
    margin-top: 60px;
    background: #fff;
    border-radius: 20px;
    width: 348px;
    position: relative;
  }
  .login-page .login-form {
    position: relative;
    overflow: hidden;
    padding-top: 60px;
    padding-left: 22px;
    padding-right: 22px;
    padding-bottom: 40px;
  }
  .login-page .login-form  button.block {
    width: 100%;
  }
  .login-page .n-form-item:nth-last-child(2) .n-form-item-blank {
    justify-content: space-between;
  }
  .login-page .n-form-item a {
    color: #306eff;
  }
  .login-page .google-tips {
    position: absolute;
    bottom: 15px;
    left: 50%;
    margin-left: -16px;
  }
  @media(max-width: 968px) {
    .login-page {
      justify-content: flex-end;
      flex-direction: column-reverse;
      align-items: center;
    }
    .login-page .logo-box {
      margin-top: 40px;
    }
  }
</style>
