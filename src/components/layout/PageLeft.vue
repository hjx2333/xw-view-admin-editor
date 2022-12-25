<template>
  <div ref="left-box" class="component-group">
    <a-icon
      :type="isClose ? 'double-right' : 'double-left'"
      class="close-icon"
      @click="closeLeftPanel"
    />
    <div class="left-panel">
      <div class="component-tab">
        <div
          v-for="(item, i) in tabs"
          :key="i"
          class="component-tab-item"
          :class="{ 'tab-selected': selected === item.value }"
          :title="item.title"
          @click="selected = item.value"
        >
          <span class="icon iconfont" :class="[item.icon]"></span>
        </div>
      </div>
      <div class="component-item-box">
        <div
          v-for="item in componentStore"
          :key="item.id"
          class="component-item"
          draggable="true"
          @dragstart="handleDragstart(item)"
        >
          <div class="component-img-box">
            <img :src="item.src" class="component-img" />
          </div>
          <div class="component-title">{{ item.title }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'PageLeft',
  data() {
    return {
      tabs: [
        {
          icon: 'icon-tubiao',
          value: 'bar|combination',
          title: '柱状图'
        },
        {
          icon: 'icon-tubiao-zhexiantu',
          value: 'line',
          title: '折线图'
        },
        {
          icon: 'icon-bingtutongji',
          value: 'pie',
          title: '饼图'
        }
      ],
      selected: 'bar|combination',
      isClose: false
    }
  },
  created() {
    this.$store.commit(
      'updateAllComponentsConfig',
      this.formatComponentsConfig()
    )
  },
  computed: {
    ...mapGetters(['allComponentsConfig']),
    componentStore() {
      const { echarts } = this.allComponentsConfig
      const store = []
      echarts.forEach(d => {
        if (this.selected.includes(d.type)) {
          store.push(d)
        }
      })

      return store
    }
  },
  methods: {
    handleDragstart(item) {
      this.$store.commit('updateDragStartComponent', item)
    },

    formatComponentsConfig() {
      const config = this.$xwview.getDefaultComponentConfig()
      config.echarts.forEach(d => {
        d.style = {
          width: '100%',
          height: '100%'
        }
        d.options.textColor = '#333'
      })

      return config
    },

    closeLeftPanel() {
      const isClose = this.isClose
      this.$refs['left-box'].style.width = isClose ? '300px' : '0'
      this.isClose = !isClose
      this.$bus.emit('resize')
    }
  }
}
</script>

<style lang="scss" scoped>
.component-group {
  width: 300px;
  background-color: var(--aside-bg-color);
  transition: all 1s;
  position: relative;

  .left-panel {
    display: flex;
    overflow-x: hidden;
    height: 100%;
  }

  .close-icon {
    position: absolute;
    padding: 10px;
    cursor: pointer;
    background: #3296fa;
    color: #fff;
    z-index: 1000;
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
    font-size: 16px;
    top: 50%;
    transform: translateY(-50%);
    padding: 26px 6px;
    right: -28px;
  }
  .component-tab {
    padding-left: 4px;
  }

  .component-tab-item {
    padding: 4px 6px;
    cursor: pointer;
    color: var(--text-color);
    border-left: 4px solid var(--aside-bg-color);

    .icon {
      font-size: 28px;
    }
  }

  .tab-selected {
    color: var(--primary-color);
    border-left: 4px solid var(--primary-color);
    background: #ddd;
  }

  .component-item-box {
    overflow-y: auto;
    overflow-x: hidden;
    flex: 1;
    padding-top: 10px;
  }

  .component-item {
    cursor: pointer;
    width: 140px;
    margin: 0 auto 30px auto;
    border-bottom: 1px solid var(--border-color);

    .component-title {
      font-size: 18px;
      color: var(--text-color);
      text-align: center;
      margin-top: 10px;
    }

    .component-img-box {
      overflow: hidden;
    }
  }

  .component-img {
    width: 100%;
    transition: all 400ms ease;
    &:hover {
      transform: scale(1.3);
    }
  }
}
</style>
