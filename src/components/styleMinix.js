import { deepCopy } from '@/utils/utils'
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['currentComponent', 'componentStore']),
    // 隐藏样式单位px，方便更改
    store() {
      // const store = deepCopy(this.currentComponent)
      // for (const i in store.style) {
      //   const style = store.style[i]
      //   typeof style === 'string' &&
      //     (store.style[i] = store.style[i].replace('px', ''))
      // }
      return this.currentComponent
    }
  },
  methods: {
    formatValue(name, e) {
      // this.$store.commit('updateStyle', {
      //   name,
      //   value: `${e.currentTarget.value}px`
      // })

      this.handleInput('style')
    },

    handleInput() {
      this.$store.commit('addHandleCache', deepCopy(this.componentStore))
    },

    handleNull(val) {
      return val || {}
    }
  }
}
