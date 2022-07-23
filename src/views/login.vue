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
        <n-form label-align="left" label-placement="left" label-width="0" class="login-form">
          <n-form-item label="">
            <n-input v-model:value="loginData.username" placeholder="請輸入信箱"></n-input>
          </n-form-item>
          <n-form-item label="">
            <n-input v-model:value="loginData.password" placeholder="請輸入密碼" @keyup.enter="loginPost" type="password" show-password-on="mousedown"></n-input>
          </n-form-item>
          <n-form-item label="">
            <n-checkbox v-model:checked="remember" @update:checked="showMessage">自動登入</n-checkbox>
          </n-form-item>
          <n-form-item>
            <n-button type="primary" class="block" :loading="loading" @click="loginPost">登入</n-button>
          </n-form-item>
          <n-form-item label="">
            <a target="_blank" href="https://mypikpak.com/drive/forget-password" class="forget-password">忘記密碼</a>
            <router-link to="/register" class="register">註冊</router-link>
            <a href="javascript:;" @click="getApk">APK下載</a>
          </n-form-item>
        </n-form>
        <div class="login-other">
          <n-space inline>
            <n-tooltip >
              <template #trigger>
                <router-link to="sms">
                  <n-icon color="#306eff" :size="32">
                   <phone></phone>
                  </n-icon>
                </router-link>
              </template>
              手機登入
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
import { NForm, NFormItem, NInput, NButton, useMessage, NCheckbox, useDialog, NTooltip, NIcon, NSpace } from 'naive-ui'
import http from '../utils/axios'
import { useRouter } from 'vue-router'
import { BrandGoogle, Phone } from '@vicons/tabler'
const loginData = ref({
  username: '',
  password: ''
})
const loading = ref(false)
const router = useRouter()
const message = useMessage()
const loginPost = () => {
  if(!loginData.value.password || !loginData.value.username) {
    return false
  }
  loading.value = true
  http.post('https://user.mypikpak.com/v1/auth/signin', {
    "captcha_token": "",
    "client_id": "YNxT9w7GMdWvEOKa",
    "client_secret": "dbw2OtmVEeuUvIptb1Coyg",
    ...loginData.value
  })
    .then((res:any) => {
      if(res.data && res.data.access_token) {
        window.localStorage.setItem('pikpakLogin', JSON.stringify(res.data))
        if(remember.value) {
          window.localStorage.setItem('pikpakLoginData', JSON.stringify(loginData.value))
        } else {
          window.localStorage.removeItem('pikpakLoginData')
        }
        message.success('登入成功')
        router.push('/')
      }
    })
    .catch(() => {
      loading.value = false
    })
}
const remember = ref(false)
const dialog = useDialog()
const showMessage = () => {
  if(remember.value) {
    dialog.warning({
        title: '警告',
        content: '自動登入是指瀏覽器本地明文保存使用者名稱密碼用於下次自動登入，請勿在非信任設備上選擇',
        positiveText: '確定',
        negativeText: '取消',
        onPositiveClick: () => {
        },
        onNegativeClick: () => {
          remember.value = false
        },
      })
  }
}
const getApk = () => {
  http.get('https://api-drive.mypikpak.com/package/v1/apk/url/273403')
    .then((res:any) => {
      window.open(res.data.apk_url)
    })
}
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
  .login-page .n-form-item:nth-last-child(1) .n-form-item-blank {
    margin-top: -10px;
    justify-content: space-between;
  }
  .login-page .n-form-item a {
    color: #306eff;
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
