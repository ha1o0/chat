<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="getData()">测试按钮</button>
    <button id="btn2">测试按钮2</button>
    <button id="btn2" @click="add">vuex</button>
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
      console.log(resp)
    },
    debounce(log) {
      return () => {
        setTimeout(() => {
          this.getData()
          console.log(log)
        }, 2000);
      }
    },
    // why debounce not work when using @click
    test() {
      util.debounce(this.debounce, 1000)()
    },

  }
}
</script>
