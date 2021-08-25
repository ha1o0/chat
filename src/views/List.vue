<template>
  <div class="container">
    <van-list
      class="list"
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      list: [],
      finished: false,
      timer: null,
      t1: null,
      t2: null,
    }
  },
  mounted() {
    document.onscroll = (event) => {
      clearTimeout(this.timer);
      this.timer = setTimeout(this.isScrollEnd, 1000);
      this.t1 = document.documentElement.scrollTop || document.body.scrollTop;
    }
    // window.addEventListener('onscroll', (event) => {
    //   console.log(event)
    // }, true)
  },
  methods: {
    isScrollEnd() {
      this.t2 = document.documentElement.scrollTop || document.body.scrollTop;
      if(this.t2 == this.t1){
        // console.log('滚动结束了')
      }
    },
    onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 1000);
    },
  }
}
</script>

<style scoped>
.list {
  /* overflow-y: auto; */
}
</style>