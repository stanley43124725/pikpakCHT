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
            <n-input v-model:value="loginData.phone_number" placeholder="請輸入區號加手機號碼如+886987654321"></n-input>
          </n-form-item>
          <n-form-item path="verification_code">
            <n-input-group>
              <n-input v-model:value="loginData.verification_code" placeholder="請輸入驗證碼"></n-input>
              <n-button @click="sendCode" :disabled="time < 60" :loading="codeLoading">{{ time >= 60 ? '發送驗證碼' : ('重新發送 ' + time + 's')}}</n-button>
            </n-input-group>
          </n-form-item>
          <!-- <n-form-item label="" v-if="!isUser">
            
          </n-form-item> -->
          <n-form-item>
            <n-button type="primary" class="block" :loading="loading" @click="register">登入</n-button>
          </n-form-item>
        </n-form>
        <div class="login-other">
          <n-space inline>
            <n-tooltip >
              <template #trigger>
                <router-link to="login">
                  <n-icon color="#306eff" :size="32">
                   <mail></mail>
                  </n-icon>
                </router-link>
              </template>
              信箱登入
            </n-tooltip>
            <n-tooltip >
              <template #trigger>
                <n-icon color="#306eff" :size="32">
                  <brand-google></brand-google>
                </n-icon>
              </template>
              APP內Google登入的帳號請先通過忘記密碼設置密碼後登入
            </n-tooltip>
          </n-space>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { ref } from '@vue/reactivity';
import { NForm, NFormItem, NInput, NButton, useMessage, NAlert, useDialog, NTooltip, NIcon, NInputGroup, FormRules, NCheckbox, NSpace } from 'naive-ui'
import http from '../utils/axios'
import { useRouter } from 'vue-router'
import { BrandGoogle, Mail } from '@vicons/tabler'
import {  onUnmounted } from '@vue/runtime-core'
import axios from 'axios';
const loginData = ref({
  phone_number: '',
  verification_code: '',
  captcha_token: '',
  verification_id: ''
})
const formRef = ref()
const invite = ref(false)
const rules:FormRules = {
  phone_number: [
    { required: true, message: '請輸入手機號碼', trigger: 'blur' },
  ],
  verification_code: [
    { required: true, message: '請輸入驗證碼', trigger: 'blur' },
  ],
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
const initCaptcha = (action?:string) => {
  return http.post('https://user.mypikpak.com/v1/shield/captcha/init?client_id=YNxT9w7GMdWvEOKa', {
    action: action || "POST:/v1/auth/verification",
    captcha_token: loginData.value.captcha_token || '',
    client_id: "YNxT9w7GMdWvEOKa",
    device_id: deviceId,
    meta: {
      "phone_number": loginData.value.phone_number,
    },
    redirect_uri: "xlaccsdk01://xunlei.com/callback?state\u003dharbor"
  })
    .then((res:any) => {
      if(res.data && res.data.captcha_token) {
        loginData.value.captcha_token = res.data.captcha_token
      }
    })
}
const isUser = ref(false)
const sendCode = () => {
  if(!loginData.value.phone_number) {
    return false
  } else {
    loginData.value.captcha_token = ''
    codeLoading.value = true
    initCaptcha("POST:/v1/auth/verification")
      .then(() => {
        http.post('https://user.mypikpak.com/v1/auth/verification?client_id=YNxT9w7GMdWvEOKa', {
          captcha_token: loginData.value.captcha_token,
          client_id: "YNxT9w7GMdWvEOKa",
          phone_number: loginData.value.phone_number,
          locale: "zh-cn",
          target: "ANY",
        })
        .then((res:any) => {
          loginData.value.verification_id = res.data.verification_id
          isUser.value = res.data.is_user || false
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
        initCaptcha(isUser.value ? 'POST:/v1/auth/signin': 'POST:/v1/auth/signup')
          .then(() => {
            let url = 'https://user.mypikpak.com/v1/auth/signup'
            let data:any = {
              captcha_token: loginData.value.captcha_token,
              client_id: 'YNxT9w7GMdWvEOKa',
              client_secret: "dbw2OtmVEeuUvIptb1Coyg",
              verification_token: res.data.verification_token
            }
            if(isUser.value) {
              url = 'https://user.mypikpak.com/v1/auth/signin'
              data.username = loginData.value.phone_number
            } else {
              data.phone_number = loginData.value.phone_number
              data.password = ''
              data.name = 'U_' + loginData.value.phone_number.slice(-4)
            }
            http.post(url, data)
              .then((res:any) => {
                vipInvite(res.data)
                window.localStorage.setItem('pikpakLogin', JSON.stringify(res.data))
                window.localStorage.removeItem('pikpakLoginData')
                message.success('登入成功')
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

  .login-box .login-other {
    margin-top: -50px;
    text-align: center;
    padding-bottom: 10px;
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
