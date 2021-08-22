<template>
  <div>
    <!-- <div id="my-video-container" style="width:100%;height:360px;position:relative;">
      <video id="my-video" src="http://192.168.6.242/2.mp4" style="position:absolute;" controls width="100%"></video>
    </div> -->
    <div id="my-video-container" style="height: 300px;background: url('https://t7.baidu.com/it/u=1595072465,3644073269&fm=193&f=GIF') no-repeat; background-size: cover;">
    </div>
    <div>
      <van-button type="primary" @click="sendDanmu()">发送弹幕</van-button>
    </div>
  </div>
</template>

<script>
import Danmaku from 'danmaku'
import { Button } from 'vant'

export default {
  components: {
    VanButton: Button
  },
  data() {
    return {
      danmaku: null
    }
  },
  mounted() {
    this.danmaku = new Danmaku({
      container: document.getElementById('my-video-container'),
      // media: document.getElementById('my-video'),
      comments: []
    });
  },
  methods: {
    sendDanmu() {
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          this.emitDanmu()
        }, 30 * i);
      }
    },
    emitDanmu() {
      this.danmaku.emit({
        text: 'example' + new Date().getTime(),
        // 默认为 rtl（从右到左），支持 ltr、rtl、top、bottom。
        mode: 'rtl',
        engine: 'canvas',
        // 弹幕显示的时间，单位为秒。
        // 在使用媒体模式时，如果未设置，会默认为音视频的当前时间；实时模式不需要设置。
        // time: 233.3,

        // 在使用 DOM 引擎时，Danmaku 会为每一条弹幕创建一个 <div> 节点，
        // style 对象会直接设置到 `div.style` 上，按 CSS 规则来写。
        // 例如：
        // style: {
        //   fontSize: '20px',
        //   color: '#ffffff',
        //   border: '1px solid #337ab7',
        //   textShadow: '-1px -1px #000, -1px 1px #000, 1px -1px #000, 1px 1px #000'
        // },

        // 在使用 canvas 引擎时，Danmaku 会为每一条弹幕创建一个 <canvas> 对象，
        // 需要按 CanvasRenderingContext2D 对象的格式来写。
        // 例如：
        style: {
          font: '13px sans-serif',
          color: 'white',
          textAlign: 'start',
          // 注意 bottom 是默认的
          textBaseline: 'bottom',
          direction: 'inherit',
          fillStyle: '#000',
          strokeStyle: '#000',
          lineWidth: 1.0,
          // ...
        },
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>