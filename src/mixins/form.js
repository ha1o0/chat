import { mapGetters, mapState, mapActions } from 'vuex'

const formMixin = {
  created () {
    this.hello()
  },
  methods: {
    ...mapActions([
      'common/increment'
    ]),
    hello() {
      console.log('hello from mixin!', this.$store)
    },
    async add() {
      await this['common/increment']()
      // await this.$store.dispatch('common/increment')
      console.log(this.count)
      this.$router.replace({ path: `/about?page=2&size=10` })
    }
  }
}

export default formMixin