<template>
  <div id="app">
    <div class="container" :style="{ height: (screenHeight - 150) + 'px' }">
      <el-alert
        v-if="showError"
        title="连接服务器错误"
        type="error"
        :closable="false"
        center
        effect="dark">
      </el-alert>
      <p>欢迎进入ele聊天系统</p>
      <div class="dialogs" :style="{ height: (screenHeight - 160) + 'px' }" ref="dialogRef">
        <single-dialog v-for="(singleDialog, index) in dialogData.list" :key="'dialog' + index" :name="singleDialog.name" :content="singleDialog.content" :position="singleDialog.position" :time="singleDialog.time" :showTime="singleDialog.showTime"/>
      </div>
      <div class="bottom-container">
        <div class="dialog-input"><dialog-input /></div>
        <div class="buttons">
          <el-button type="info" size="medium" round class="send-button" @click="sendMessage">发送</el-button>
          <el-button type="info" size="medium" round class="send-button" @click="mockSend">模拟发送</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SingleDialog from './components/dialog/SingleDialog.vue'
import DialogInput from './components/dialog/DialogInput.vue'

export default {
  name: 'app',
  components: {
    SingleDialog,
    DialogInput
  },
  data() {
    return {
      showError: false,
      socketPath: "ws://127.0.0.1:9999/upper",
      socket: "",
      screenHeight: window.screen.height,
      dialogInputHeight: 400,
      latestTime: 0,
      dialogData: {
        list: []
      },
      inputValue: "",
      test: {},
      index: 0
    }
  },
  watch: {
    test: {
      handler (val, oldVal) {
        // eslint-disable-next-line
        console.log('chageegege: ', val, oldVal)
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    sendMessage() {
      this.mockSend()
      this.send(this.inputValue)
      window.EventBus.$emit('clearInput', "")
    },
    mockSend() {
      this.index++
      // let temp = this.test
      // temp[`number${this.index}`] = Math.random()
      this.$set(this.test[`number${this.index}`], Math.random())
      // this.test[`number${this.index}`] = Math.random()
      let randNumber = Math.floor(Math.random()*10)
      let position = randNumber > 10 ? "left" : "right"

      this.dialogData.list.push(this.mockSingleData(position, this.inputValue))
      this.$nextTick(() => {
        this.$refs.dialogRef.scrollTop = this.$refs.dialogRef.scrollHeight
      })
    },
    mockSingleData(position, content) {
      let currentTime = (new Date()).valueOf()
      let dialog = {
        showTime: (currentTime - this.latestTime) > 10 * 1000,
        position: position,
        time: currentTime,
        name: position == "left" ? "客服" : "",
        content: content
        // content: (randNumber % 2 == 0) ? "hello, world" : "hello, worldhello, worldhello, worldhello, worldhello, worldhello, worldhello, worldhello, worldhello, worldhello, worldhello, worldhello, worldhello, world"
      }
      this.latestTime = currentTime
      // eslint-disable-next-line
      return dialog
    },
    init() {
      if(typeof(WebSocket) === "undefined"){
        alert("您的浏览器不支持socket")
      }else{
        // 实例化socket
        this.socket = new WebSocket(this.socketPath)
        // 监听socket连接
        this.socket.onopen = this.open
        // 监听socket错误信息
        this.socket.onerror = this.error
        // 监听socket消息
        this.socket.onmessage = this.getMessage
      }
    },
    open() {
      // eslint-disable-next-line
      console.log("socket连接成功")
    },
    error() {
      // eslint-disable-next-line
      console.log("连接错误")
      this.showError = true
    },
    getMessage(msg) {
      // eslint-disable-next-line
      console.log(msg, msg.data)
      let messageContent = msg.data
      this.dialogData.list.push(this.mockSingleData("left", messageContent))
      this.$nextTick(() => {
        this.$refs.dialogRef.scrollTop = this.$refs.dialogRef.scrollHeight
      })
    },
    send(params) {
      // eslint-disable-next-line
      this.socket.send(params)
    },
    close() {
      // eslint-disable-next-line
      console.log("socket已经关闭")
    }
  },
  created() {
    this.dialogData.list.push(this.mockSingleData("left", "你好，有什么可以帮到您"))
    window.EventBus.$on('inputChange', (data) => {
      this.inputValue = data
    })
  },
  mounted () {
    this.init()
  },
}
</script>

<style>
body {
  background-color:lightgray;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0 auto;
  text-align: center;
  color: #2c3e50;
}
.container {
  display: flex;
  flex-direction: column;
}
.dialogs {
  display: flex;
  flex-direction: column;
  overflow-y:auto;
  padding: 20px 0;
  /* border: #2c3e50 1px solid; */
}
.bottom-container {
  width: 100%;
}
.dialog-input {
  margin-top: 20px;
  padding: 0 50px;
}
.buttons {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding-right: 50px;
  margin-top: 10px;
}
</style>
