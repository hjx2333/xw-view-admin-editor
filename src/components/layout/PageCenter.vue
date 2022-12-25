<template>
  <div ref="contain" class="contain">
    <div
      :key="key"
      ref="canvas"
      class="canvas"
      :style="{
        ...canvasStyle
      }"
      @dragover="handleDragover"
      @drop="handleDrop"
      @mousedown="cancelFocusComponent"
      @contextmenu="handleContextmenu"
    >
      <grid />

      <shape
        v-for="(item, index) in componentStore"
        :key="item.id"
        :active="item.id === (currentComponent || {}).id"
        :style="{ ...item.style }"
        :componentData="item"
      >
        <component
          :is="item.component"
          :style="{ width: item.style.width, height: item.style.height }"
          class="component-item"
          :componentData="item"
          :globalConfig="globalConfig"
          @mousedown.native="handleMousedown($event, item, index)"
          @contextmenu.native="handleContextmenu"
          @gridMouseDown="gridSelectHandle"
        />
      </shape>

      <!-- 横向对齐辅助线 -->
      <div
        v-show="currentEvent && lineStyle"
        class="aling-line"
        :style="lineStyle"
      ></div>

      <!-- 纵向对齐辅助线 -->
      <div
        v-show="currentEvent && vertialLineStyle"
        class="aling-line aling-line-vertial"
        :style="vertialLineStyle"
      ></div>
    </div>

    <!-- 右键菜单 -->
    <context-menu
      v-model="menuVisible"
      :mouseEvent="menuEvent"
      :type="contextmenuType"
    />
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid'
import { mapGetters } from 'vuex'
import { deepCopy, throttle } from '@/utils/utils'
import Grid from './components/pageCenter/Grid.vue'
import Shape from './components/pageCenter/Shape.vue'
import ContextMenu from './components/pageCenter/ContextMenu.vue'
export default {
  name: 'PageCenter',
  components: { Grid, Shape, ContextMenu },
  data() {
    return {
      key: +new Date(),
      currentEvent: null,
      style: null,
      lineStyle: null,
      vertialLineStyle: null,
      isMove: false,
      canvasStyle: {},
      // 辅助线出现的距离
      helpLineInstance: 50,
      // 组件间吸附距离
      adsorbentInstance: 20,
      menuVisible: false,
      menuEvent: null,
      contextmenuType: '',
      updateTimer: null
    }
  },
  computed: {
    ...mapGetters([
      'componentStore',
      'currentComponent',
      'dragStartComponent',
      'globalConfig'
    ])
  },
  mounted() {
    this.computedScale()

    this.$bus.on('editorSizeChange', this.computedScale)
    this.$bus.on('resize', () => {
      clearTimeout(this.updateTimer)
      this.updateTimer = setTimeout(() => {
        this.key = +new Date()
      }, 1001)
    })
  },
  methods: {
    /** 允许拖拽放下 */
    handleDragover(e) {
      e.preventDefault()
      e.stopPropagation()
      return false
    },

    computedScale() {
      const { height } = this.globalConfig.editor

      this.canvasStyle = {
        height: `${height}px`
      }
    },

    reloadScale() {
      this.canvasStyle = {
        ...this.canvasStyle
      }
    },

    /** 初始化组件位置 */
    initPosition(component, e) {
      const { offsetY } = e
      const { height } = component.style
      let top = offsetY - parseInt(parseInt(height) / 2)

      top = this.formatNumber(top, height, 'top')
      top = `${top}px`
      Object.assign(component.style, { top, left: 0 })
    },

    handleDrop(e) {
      const component = deepCopy(this.dragStartComponent)
      component.id = uuid().replace(/-/g, '')
      this.initPosition(component, e)

      if (e.target.nodeName !== 'rect') {
        const index = e.target.getAttribute('data-index')
        const parentId = e.target.getAttribute('data-id')
        this.componentStore.forEach(d => {
          if (d.id === parentId) {
            if (!d.children.length) {
              d.children = new Array(d.colspan)
            }

            component.parentId = parentId
            this.$set(d.children, index, component)
          }
        })
      } else {
        if (!component.component.includes('Grid')) {
          this.$message.warning('请将组件放置到布局中')
          return
        }
        // 更新全局状态
        this.$store.commit('addComponentStore', component)
      }
      this.$store.commit('addHandleCache', deepCopy(this.componentStore))
      this.$store.commit('setInEditorStatus', true)
    },

    // 布局组件选择处理
    gridSelectHandle(item, index) {
      this.$store.commit('setParentId', item.parentId)
      this.$store.commit('setInEditorStatus', true)
      this.$store.commit('updateCurrentComponent', item)
      this.$store.commit('updateCurrentComponentIndex', index)
    },

    handleMousedown(e, item, index) {
      e.preventDefault()
      e.stopPropagation()

      this.menuVisible = false
      this.$store.commit('setParentId', '')
      this.$store.commit('setInEditorStatus', true)
      this.$store.commit('updateCurrentComponent', item)
      this.$store.commit('updateCurrentComponentIndex', index)
      // 右键鼠标处理
      if (e.button === 2) {
        this.contextmenuType = 'component'
        this.showContextMenu(e, item, index)
        return false
      }

      this.style = deepCopy(item.style)
      this.currentEvent = e

      document.addEventListener('mousemove', this.handleMousemove)
      document.addEventListener('mouseup', this.handleMouseup)
    },

    handleMousemove: throttle(function(e) {
      const event = this.currentEvent
      if (!event) return

      this.isMove = true
      let { top, left } = this.style
      const { width, height } = this.style
      const currentComponent = this.currentComponent
      const style = currentComponent.style

      top = this.formatNumber(
        e.clientY - event.clientY + parseInt(top),
        height,
        'top'
      )
      left = this.formatNumber(
        e.clientX - event.clientX + parseInt(left),
        width,
        'left'
      )

      style.top = `${top}px`
      style.left = `${left}px`

      this.setAlignLine(currentComponent, top, left, style)
    }, 20),

    /** 设置对齐辅助线 */
    setAlignLine({ id }, top, left, style) {
      let targetLeft = null
      let targetTop = null
      let lineLeft = null
      let lineTop = null

      this.componentStore.forEach(d => {
        if (d.id == id) return
        // 获取距离当前组件最小的left
        const currentLeft = d.style.left
        const leftResult = Math.abs(left - parseInt(currentLeft))
        let isAssignment = this.getMinSpaceInstance(leftResult, lineLeft)
        if (isAssignment) {
          lineLeft = isAssignment
          targetLeft = currentLeft
        }

        // 获取距离当前组件最小的top
        const currentTop = d.style.top
        const topResult = Math.abs(top - parseInt(currentTop))
        isAssignment = this.getMinSpaceInstance(topResult, lineTop)
        if (isAssignment) {
          lineTop = isAssignment
          targetTop = currentTop
        }
      })

      // 横向辅助线
      this.lineStyle = null
      targetLeft &&
        (this.lineStyle = {
          left: targetLeft
        })

      // 竖向辅助线
      this.vertialLineStyle = null
      targetTop &&
        (this.vertialLineStyle = {
          top: targetTop
        })

      this.setAdsorbent(lineLeft, lineTop, targetLeft, targetTop, style)
    },

    /** 获取最小的组件间隔距离 */
    getMinSpaceInstance(diffValue, cacheValue) {
      const compareValue = this.helpLineInstance
      return diffValue <= compareValue
        ? cacheValue === null
          ? (cacheValue = diffValue)
          : diffValue < cacheValue && (cacheValue = diffValue)
        : undefined
    },

    /** 吸附 */
    setAdsorbent(diffLeft, diffTop, left, top, style) {
      const adsorbentInstance = this.adsorbentInstance
      if (left && diffLeft <= adsorbentInstance) {
        style.left = left
      }

      if (top && diffTop <= adsorbentInstance) {
        style.top = top
      }
    },

    handleMouseup() {
      this.currentEvent = null
      this.lineStyle = null
      this.vertialLineStyle = null
      if (!this.isMove) return

      this.$store.commit('addHandleCache', deepCopy(this.componentStore))
      document.removeEventListener('mousemove', this.handleMousemove)
      document.removeEventListener('mouseup', this.handleMouseup)
    },

    /** 修改组件位置，避免超出编辑区 */
    formatNumber(val, size, type) {
      if (val <= 0) return 0

      size = parseInt(size)
      if (type === 'top') {
        const maxTop = this.$refs.canvas.offsetHeight - size
        return val > maxTop ? maxTop : val
      } else if (type === 'left') {
        const maxLeft = this.$refs.canvas.offsetWidth - size
        return val > maxLeft ? maxLeft : val
      }
    },

    cancelFocusComponent(e) {
      e.stopPropagation()
      this.$store.commit('setInEditorStatus', true)
      this.$store.commit('updateCurrentComponent', null)
      // 右键鼠标处理
      if (e.button === 2) {
        this.contextmenuType = 'editor'
        this.showContextMenu(e)
        return false
      }

      this.menuVisible = false
    },

    // 右键处理
    showContextMenu(e) {
      this.menuVisible = true
      this.menuEvent = e
    },

    handleContextmenu(e) {
      e.preventDefault()
      e.stopPropagation()
      return false
    }
  }
}
</script>

<style lang="scss" scoped>
.contain {
  flex: 1;
  background-color: var(--aside-bg-color);
  margin: 20px;
  overflow: auto;
}
.canvas {
  position: relative;
  background-color: var(--aside-bg-color);
  height: 100%;
  transform-origin: 0 0;

  .component-item {
    position: absolute;
  }

  .aling-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 1px;
    height: 100%;
    background-color: var(--primary-color);
  }

  .aling-line-vertial {
    width: 100%;
    height: 1px;
  }
}
</style>
