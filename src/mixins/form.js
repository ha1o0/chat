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
    }
  }
}

export default formMixin