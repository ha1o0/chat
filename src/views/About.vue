<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="getData()">测试按钮</button>
    <button id="btn2">测试按钮2</button>
    <button id="btn2" @click="add">vuex</button>
    <button @click="showData">$data</button>
    <div style="background: red; width: 100vw; height: 120vh;"></div>
    <div v-if="showpop" class="popup">
      <button @click="close">close</button>
    </div>
  </div>
</template>

<script>
import { getData } from '@/api/test'
import util from '@/utils/util'
import formMixin from '@/mixins/form'
import { mapGetters, mapState, mapActions } from 'vuex'

export default {
  mixins: [formMixin],
  data() {
    return {
      showpop: false,
    }
  },
  created() {
    console.log('about created')
  },
  mounted() {
    const el = document.getElementById('btn2')
    // el.onclick = util.debounce(this.debounce('hello'), 1000)
    el.onclick = this.getData
  },
  computed: {
    ...mapState({
      count: state => state.common.count
    }),
  },
  methods: {
    async getData() {
      const resp = await getData()
      // console.log(resp)
    },
    debounce(log) {
      return () => {
        setTimeout(() => {
          this.getData()
          // console.log(log)
        }, 2000);
      }
    },
    // why debounce not work when using @click
    test() {
      util.debounce(this.debounce, 1000)()
    },
    showData() {
      this.showpop = true
      let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
      document.body.style.cssText += 'position:fixed;width:100%;top:-' + scrollTop + 'px;';
    },
    close() {
      this.showpop = false
      let body = document.body;
      body.style.position = '';
      let top = body.style.top;
      document.body.scrollTop = document.documentElement.scrollTop = -parseInt(top);
      body.style.top = '';
    }
  }
}
</script>

<style scoped>

.popup {
  position: fixed;
  width: 100vw;
  background: rgba(22, 22, 22, 0.3);
  height: 100vh;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>