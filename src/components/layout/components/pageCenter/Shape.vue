<template>
  <div ref="shape" class="shape" :class="{ active }" @mousedown="handleMouseDownOnShape">
    <!-- <span
      v-show="active"
      class="iconfont icon-xiangyouxuanzhuan"
      @mousedown="handleRotate"
    ></span> -->
    <!-- <span v-show="element.isLock" class="iconfont icon-suo"></span> -->
    <div
      v-for="item in []"
      :key="item"
      class="shape-point"
      :style="getPointStyle(item)"
      @mousedown="handleMouseDownOnPoint(item, $event)"
    ></div>
    <slot></slot>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { deepCopy } from '@/utils/utils'
import { scaleByPoint } from '@/utils/scale'
export default {
  name: 'Shape',
  props: {
    active: {
      type: Boolean,
      default: false
    },
    componentData: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      pointList: ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'], // 八个方向
      angleToCursor: {
        lt: 'nw',
        t: 'n',
        rt: 'ne',
        r: 'e',
        rb: 'se',
        b: 's',
        lb: 'sw',
        l: 'w'
      },
      startPosition: {}
    }
  },
  computed: {
    ...mapGetters(['componentStore'])
  },
  methods: {
    getPointList() {
      return this.pointList
    },

    getPointStyle(point) {
      let { width, height } = this.componentData.style
      width = parseInt(width)
      height = parseInt(height)
      const hasT = /t/.test(point)
      const hasB = /b/.test(point)
      const hasL = /l/.test(point)
      const hasR = /r/.test(point)
      let newLeft = 0
      let newTop = 0

      // 四个角的点
      if (point.length === 2) {
        newLeft = hasL ? 0 : width
        newTop = hasT ? 0 : height
      } else {
        // 上下两点的点，宽度居中
        if (hasT || hasB) {
          newLeft = width / 2
          newTop = hasT ? 0 : height
        }

        // 左右两边的点，高度居中
        if (hasL || hasR) {
          newLeft = hasL ? 0 : width
          newTop = Math.floor(height / 2)
        }
      }

      const style = {
        marginLeft: '-4px',
        marginTop: '-4px',
        left: `${newLeft}px`,
        top: `${newTop}px`,
        cursor: `${this.angleToCursor[point]}-resize`
      }

      return style
    },

    handleMouseDownOnShape(e) {
      e.stopPropagation()
      e.preventDefault()
    },

    handleMouseDownOnPoint(point, e) {
      e.stopPropagation()
      e.preventDefault()

      this.$store.commit('setInEditorStatus', true)
      this.startPosition = {
        x: e.clientX,
        y: e.clientY
      }

      //   const style = { ...this.defaultStyle }

      // 是否需要保存快照
      let needSave = false
      let isFirst = true

      const move = moveEvent => {
        // 第一次点击时也会触发 move，所以会有“刚点击组件但未移动，组件的大小却改变了”的情况发生
        // 因此第一次点击时不触发 move 事件
        if (isFirst) {
          isFirst = false
          return
        }

        needSave = true
        this.scaleComponent(point, moveEvent)
      }

      const up = () => {
        document.removeEventListener('mousemove', move)
        document.removeEventListener('mouseup', up)
        needSave &&
          this.$store.commit('addHandleCache', deepCopy(this.componentStore))
      }

      document.addEventListener('mousemove', move)
      document.addEventListener('mouseup', up)
    },

    scaleComponent(point, moveEvent) {
      const { x, y } = this.startPosition
      const { clientX, clientY } = moveEvent
      scaleByPoint(
        point,
        moveEvent,
        {
          oClientX: x,
          oClientY: y
        },
        this.componentData.style
      )

      this.startPosition = {
        x: clientX,
        y: clientY
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.shape {
  position: absolute;

  &:hover {
    cursor: move;
  }
}

.active {
  outline: 1px solid var(--primary-color);
  user-select: none;
}

.shape-point {
  position: absolute;
  background: #fff;
  border: 1px solid var(--primary-color);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  z-index: 1;
}

.icon-xiangyouxuanzhuan {
  position: absolute;
  top: -34px;
  left: 50%;
  transform: translateX(-50%);
  cursor: grab;
  color: var(--primary-color);
  font-size: 20px;
  font-weight: 600;

  &:active {
    cursor: grabbing;
  }
}

.icon-suo {
  position: absolute;
  top: 0;
  right: 0;
}
</style>
