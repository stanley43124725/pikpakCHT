<template>
  <div class="list-page">
    <n-collapse :default-expanded-names="['-1', '0', '2', '3']">
      <n-collapse-item name="-1" >
        <template #header>
          綁定telegram   <a @click.stop="" href="https://www.tjsky.net/?p=220#Telegram" target="_blank"> <n-icon style="vertical-align: middle;" size="20" color="#d03050"><zoom-question></zoom-question></n-icon> </a>
        </template>
        <n-input v-model:value="telegramUrl" placeholder="複製telegram綁定連結到這"></n-input>
        <p></p>
        <n-button :disabled="!telegramUrl" type="primary" @click="goTelegram">Telegram綁定</n-button>
        <a href="https://t.me/PikPak_Bot" target="_blank">Telegram機器人地址</a>
      </n-collapse-item>
      <n-collapse-item name="0" title="aria2設置">
        <template #header>aria2設置   <a @click.stop="" href="https://www.tjsky.net/?p=220#arai2" target="_blank"> <n-icon style="vertical-align: middle;" size="20" color="#d03050"><zoom-question></zoom-question></n-icon> </a></template>
        <n-form label-width="100px" label-align="left" label-placement="left">
          <n-form-item label="aria2連結：">
            <n-input v-model:value="aria2Data.host" placeholder="例如http://localhost:6800/jsonrpc"></n-input>
          </n-form-item>
          <n-form-item label="aria2Token：">
            <n-input v-model:value="aria2Data.token" type="password" show-password-on="mousedown"></n-input>
          </n-form-item>
          <n-form-item label="文件夾設置：">
            <n-switch v-model:value="aria2Data.dir" >
              <template #checked>選擇文件夾時保存文件夾結構</template>
              <template #unchecked>選擇文件夾時僅保存文件</template>
            </n-switch>
          </n-form-item>
          <n-alert title="由於瀏覽器限制，請按下圖設置開始混合模式" type="info"  v-if="aria2Data.host && aria2Data.host.indexOf('https://') === -1 && aria2Data.host.indexOf('http://localhost') == -1 && aria2Data.host.indexOf('http://127.0.0.1') === -1">
            <img src="../assets/aria2-tip-1.png" alt=""> 
            <br />
            <br />
            <img src="../assets/aria2-tip-2.png" alt="">
          </n-alert>
          <n-form-item>
            <n-button type="primary" @click="testAria2">測試並保存</n-button>
          </n-form-item>
        </n-form>
      </n-collapse-item>
      <n-collapse-item name="1" title="自動登入設置">
        <template #header>自動登入設置   <a @click.stop="" href="https://www.tjsky.net/?p=220#i-6" target="_blank"> <n-icon style="vertical-align: middle;" size="20" color="#d03050"><zoom-question></zoom-question></n-icon> </a></template>
        <n-form label-width="100px" label-align="left" label-placement="left">
          <n-form-item label="是否開啟">
            <n-switch v-model:value="loginSwitch"></n-switch>
          </n-form-item>
          <template v-if="loginSwitch">
            <n-form-item label="使用者名稱">
              <n-input v-model:value="loginData.username" placeholder="使用者名稱"></n-input>
            </n-form-item>
            <n-form-item label="密碼">
              <n-input v-model:value="loginData.password" type="password" show-password-on="mousedown"></n-input>
            </n-form-item>
          </template>
          <n-form-item>
            <n-button type="primary" @click="loginPost">保存</n-button>
          </n-form-item>
        </n-form>
      </n-collapse-item>
      <n-collapse-item name="3" title="代理設置">
        <n-input type="textarea" v-model:value="proxyData" rows="4" placeholder="支持多個隨機，一行一個，為空則不代理"></n-input>
        <p></p>
        <n-button type="primary" @click="proxyPost">保存設置</n-button>
        <n-text @click="proxyReset">恢復默認</n-text>
      </n-collapse-item>
      <n-collapse-item title="關於" name="2">
        <n-space>
          <a href="https://mypikpak.com/" target="_blank" class="n-button">官方網站</a>
          <a href="https://t.me/pikpak_userservice" target="_blank" class="n-button">官方交流群</a>
          <a href="https://github.com/mumuchenchen/pikpak" target="_blank" class="n-button">開源倉庫</a>
          <a href="https://www.tjsky.net/?p=201" target="_blank" class="n-button">部署教學</a>
          <a href="https://t.me/mumuchenchen" target="_blank">問題回饋</a>
        </n-space>
        <br />
      </n-collapse-item>
      <n-collapse-item title="功能列表" name="3">
        <n-log :lines="logs"></n-log>
      </n-collapse-item>
    </n-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import { onMounted } from '@vue/runtime-core';
import http from '../utils/axios'
import { NForm, NFormItem, NButton, NInput, NCollapse, NCollapseItem, NSpace, NSwitch, useDialog, NAlert, NLog, NIcon } from 'naive-ui'
import { ZoomQuestion } from '@vicons/tabler'
import {proxy as proxyDefault} from '../config'
const logs = ref([
  '手機註冊登陸',
  '添加推廣下載',
  '綁定Telegram',
  '直接分享功能（下線）',
  '修改傳輸自動請求方式',
  '傳輸只顯示保存中',
  '自訂菜單',
  '資源庫分頁，分享秒傳支持文件及',
  '....'
])
const aria2Data = ref({
  host: '',
  token: '',
  dir: true
})
const testAria2 = () => {
  let postData:any = {
      id:'',
      jsonrpc:'2.0',
      method:'aria2.getGlobalStat',
      params:[]
  }
  if(aria2Data.value.token) {
    postData.params.splice(0, 0, 'token:' + aria2Data.value.token)
  }
  fetch(aria2Data.value.host, {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: new Headers({
      'Content-Type': 'application/json'
    })
  })
    .then(response => response.json())
    .then(res => {
      if(res.error && res.error.message) {
        window.$message.error(res.error.message)
      } else if(res.result) {
        window.localStorage.setItem('pikpakAria2', JSON.stringify(aria2Data.value))
        window.$message.success('保存成功')
      }
    })
    .catch(error => console.error('Error:', error))
}
const loginSwitch = ref(false)
const loginData = ref({
  username: '',
  password: ''
})
const dialog = useDialog()
const loginPost = () => {
  if(loginSwitch.value) {
    dialog.warning({
      title: '警告',
      content: '記住登入是指瀏覽器本地明文保存使用者名稱密碼用於下次自動登入，請勿在非信任設備選擇',
      positiveText: '確定',
      negativeText: '取消',
      onPositiveClick: () => {
        window.localStorage.setItem('pikpakLoginData', JSON.stringify(loginData.value))
      },
      onNegativeClick: () => {
      },
    })
  } else {
    window.localStorage.removeItem('pikpakLoginData')
  }
}
const proxyData = ref('')
const proxyPost = () => {
  let proxyValue = proxyData.value.split('\n').filter(item => item != '')
  window.localStorage.setItem('proxy', JSON.stringify(proxyValue))
  window.localStorage.setItem('isSettingProxy', 'true')
}
const proxyReset = () => {
  window.localStorage.setItem('proxy', JSON.stringify(proxyDefault))
  window.localStorage.removeItem('isSettingProxy')
  proxyData.value = proxyDefault.join('\n')
}
onMounted(() => {
  let aria2 = JSON.parse(window.localStorage.getItem('pikpakAria2') || '{}')
  if(aria2.dir === undefined) {
    aria2.dir = true
  }
  if(aria2.host) {
    aria2Data.value = aria2
  }
  let login = JSON.parse(window.localStorage.getItem('pikpakLoginData') || '{}')
  if(login.username && login.password) {
    loginData.value = login
    loginSwitch.value = true 
  }
  let proxy = JSON.parse(window.localStorage.getItem('proxy') || '[]')
  if(proxy.length) {
    proxyData.value = proxy.join('\n')
  }
})
const telegramUrl = ref()
const goTelegram = () => {
  let login = JSON.parse(window.localStorage.getItem('pikpakLogin') || '{}')
  if(!login && !login.access_token) {
    window.$message.error('請先登入')
    return false
  }
  
  let matchArray = telegramUrl.value &&  decodeURIComponent(telegramUrl.value).match(/(^|&)token=([^&]*)(&|$)/)
  console.log(matchArray)
  if(!matchArray || !matchArray.length || matchArray.length != 4) {
    window.$message.error('請輸入正確連結')
    return false
  }
  http.post('https://api-drive.mypikpak.com/user/v1/bind', {
      accessToken: login.access_token,
      thirdType: "TG",
      thirdToken: matchArray[2]
    })
    .then((res:any) => {
      telegramUrl.value = ''
      if(res.data.bound) {
        window.$message.success('綁定成功')
      } else {
        window.$message.error('綁定失敗')
      }
    })
}
</script>

<style>
.list-page {
  padding: 40px;
}

@media(max-width: 968px) {
  .list-page {
    padding: 10px;
  }
}
</style>
