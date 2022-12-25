<template>
  <div ref="right-box" class="right-box">
    <div class="right-content">
      <a-icon
        :type="isClose ? 'double-left' : 'double-right'"
        class="close-icon"
        @click="closeRightPanel"
      />
      <template v-if="currentComponent">
        <a-tabs v-model="active" @change="tabChange">
          <a-tab-pane
            v-for="item in titleTabs"
            :key="item.key"
            :tab="item.tab"
          />
        </a-tabs>

        <div class="component-box">
          <keep-alive>
            <!-- 公共样式 -->
            <common-style-config v-if="active === 'CStyle'">
              <component :is="renderComponent" />
            </common-style-config>
            <component :is="renderComponent" v-else />
          </keep-alive>
        </div>
      </template>
      <template v-else>
        <page-config />
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CStore from './components/pageRight/CStore.vue'
import AnimateConfig from './components/pageRight/AnimateConfig.vue'
import PageConfig from './components/pageRight/PageConfig.vue'
import CommonStyleConfig from './components/pageRight/CommonStyleConfig.vue'
export default {
  name: 'PageRight',
  components: { CStore, AnimateConfig, PageConfig, CommonStyleConfig },
  data() {
    return {
      active: 'CStyle',
      titleTabs: [
        {
          key: 'CStyle',
          tab: '属性'
        },
        {
          key: 'AnimateConfig',
          tab: '动画'
        },
        {
          key: 'CStore',
          tab: '数据'
        }
      ],
      renderComponent: '',
      isClose: false
    }
  },
  computed: {
    ...mapGetters(['currentComponent'])
  },
  watch: {
    currentComponent(val) {
      if (!val || this.active !== 'CStyle') return
      this.renderComponent = val.component.includes('Grid')
        ? 'XwGridStyle'
        : `${val.component}Style`
    }
  },
  methods: {
    tabChange(val) {
      const currentComponent = this.currentComponent
      if (!currentComponent) return

      console.log(this)

      if (val === 'CStyle') {
        this.renderComponent = currentComponent.component.includes('Grid')
          ? 'XwGridStyle'
          : `${currentComponent.component}Style`
        return
      }

      this.renderComponent = val
    },

    closeRightPanel() {
      const isClose = this.isClose
      this.$refs['right-box'].style.width = isClose ? '360px' : '0px'
      this.isClose = !isClose
      this.$bus.emit('resize')
    }
  }
}
</script>

<style lang="scss" scoped>
.right-box {
  width: 360px;
  background-color: var(--aside-bg-color);
  position: relative;
  transition: all 1s;
  .right-content {
    width: 360px;
  }
  .tab-group {
    display: flex;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid var(--border-color);

    .tab-item {
      flex: 1;
      margin-right: 8px;
      cursor: pointer;
      padding: 0 8px;
      text-align: center;
    }

    .active {
      border-bottom: 2px solid $primary-color;
    }
  }

  .component-box {
    padding: 0 20px;
    height: calc(100% - 64px);
    overflow: auto;
    overflow-x: hidden;
  }

  .close-icon {
    position: absolute;
    padding: 10px;
    cursor: pointer;
    background: #3296fa;
    color: #fff;
    z-index: 1000;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
    font-size: 16px;
    top: 50%;
    transform: translateY(-50%);
    padding: 26px 6px;
    left: -28px;
  }
}
</style>
