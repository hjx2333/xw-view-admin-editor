<template>
  <div
    v-if="visible"
    :style="defaultStyle"
    class="menu-wrap"
    @contextmenu="handleContextmenu"
  >
    <div
      v-for="(item, i) in type === 'editor' ? editorStore : store"
      :key="i"
      class="menu-item"
      @click="handleItem(item)"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { deepCopy } from '@/utils/utils'
import { copyComponent, cutComponent, pasteComponent, delComponent } from '@/utils/keyboardEvents'
export default {
  name: 'ContextMenu',
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    mouseEvent: {
      type: MouseEvent,
      default: () => {}
    },
    type: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      defaultStyle: {},
      store: [
        {
          text: '复制',
          type: 'copy',
          event: copyComponent
        },
        {
          text: '剪切',
          type: 'cut',
          event: cutComponent
        },
        {
          text: '粘贴',
          type: 'parse',
          event: pasteComponent
        },
        {
          text: '置顶',
          type: 'top',
          event: this.zIndexHandle
        },
        {
          text: '置底',
          type: 'bottom',
          event: this.zIndexHandle
        },
        {
          text: '上移一层',
          type: 'add',
          event: this.zIndexHandle
        },
        {
          text: '下移一层',
          type: 'subtract',
          event: this.zIndexHandle
        },
        {
          text: '删除',
          type: 'del',
          event: delComponent
        }
      ],
      editorStore: [
        {
          text: '粘贴',
          type: 'parse',
          event: pasteComponent
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['currentComponent', 'componentStore'])
  },
  watch: {
    visible(val) {
      if (val) {
        this.initPosition()
      }
    },
    mouseEvent() {
      if (this.visible) {
        this.initPosition()
      }
    }
  },
  methods: {
    initPosition() {
      const event = this.mouseEvent
      if (!event) return
      const top = `${event.clientY}px`
      const left = `${event.clientX}px`
      this.defaultStyle = {
        top,
        left
      }
    },

    hide() {
      this.$emit('change', false)
    },

    handleContextmenu(e) {
      e.preventDefault()
      e.stopPropagation()
      return false
    },

    handleItem({ event, type }) {
      event(type)
      this.hide()
    },

    zIndexHandle(type) {
      let value = this.currentComponent.style.zIndex
      if (['add', 'subtract'].includes(type)) {
        value = type === 'add' ? ++value : --value
      } else {
        value = type === 'top' ? 999 : 0
      }
      this.$store.commit('updateStyle', { name: 'zIndex', value })
      this.$store.commit('addHandleCache', deepCopy(this.componentStore))
    }
  }
}
</script>

<style lang="scss" scoped>
.menu-wrap {
  position: absolute;
  z-index: 999;
  background: #fff;
  color: #333;
  box-shadow: 1px 1px 10px #ccc;
  cursor: pointer;
  border-radius: 6px;
  font-size: 14px;
  overflow: hidden;

  .menu-item {
    padding: 8px 28px;
    text-align: center;
    transition: all 100ms ease;

    &:hover {
      background: var(--primary-color);
      color: #fff;
    }
  }
}
</style>
