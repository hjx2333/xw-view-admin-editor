<template>
  <div class="page-config-wrap">
    <div class="page-config-content">
      <div class="page-title">布局</div>
      <a-collapse default-active-key="1" :bordered="false">
        <a-collapse-panel key="1" header="推荐布局">
          <div class="mix-grids-box">
            <div
              v-for="(item, index) in mixGrids"
              :key="index"
              class="grid-item"
              draggable="true"
              @dragstart="handleDragstart(item)"
            >
              <img :src="item.src" />
            </div>
          </div>
        </a-collapse-panel>

        <a-collapse-panel key="2" header="组合模块">
          <div class="multiple-grids-box">
            <div
              v-for="(item, index) in multipleGrids"
              :key="index"
              class="grid-item"
              draggable="true"
              @dragstart="handleDragstart(item)"
            >
              <img :src="item.src" />
            </div>
          </div>
        </a-collapse-panel>

        <a-collapse-panel key="3" header="单独模块">
          <div class="single-grids-box">
            <div
              v-for="(item, index) in singleGrids"
              :key="index"
              class="grid-item"
              draggable="true"
              @dragstart="handleDragstart(item)"
            >
              <img :src="item.src" />
            </div>
          </div>
        </a-collapse-panel>
      </a-collapse>
    </div>
  </div>
</template>

<script>
import { deepCopy } from '@/utils/utils'
import { mapGetters } from 'vuex'
export default {
  name: 'PageConfig',
  data() {
    return {
      isAccept: false
    }
  },
  computed: {
    ...mapGetters(['globalConfig', 'allComponentsConfig']),
    grids() {
      return this.allComponentsConfig?.grids || []
    },
    mixGrids() {
      return this.grids.filter(d => d.type === 'mix')
    },
    multipleGrids() {
      return this.grids.filter(d => d.type === 'multiple')
    },
    singleGrids() {
      return this.grids.filter(d => d.type === 'single')
    }
  },
  methods: {
    beforeUpload(file) {
      const value = file.type.includes('image/') ? 'image' : 'video'
      this.$store.commit('updateGlobalEditorConfig', {
        name: 'backgroundType',
        value
      })
      return false
    },

    importFile(data) {
      //   if (!this.isAccept) return
      const reader = new FileReader()
      reader.readAsDataURL(data.file)
      reader.onload = evt => {
        const value = `${evt.target.result}`
        this.$store.commit('updateGlobalEditorConfig', {
          name: 'background',
          value
        })
        this.$store.commit('addHandleCache', deepCopy(this.componentStore))
      }
    },

    handleDragstart(item) {
      this.$store.commit('updateDragStartComponent', item)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-config-wrap {
  padding: 20px;
  overflow: auto;

  .page-config-content {
    height: 86vh;
  }

  .page-title {
    text-align: center;
    font-size: 20px;
    line-height: 50px;
    color: var(--text-color);
  }

  .grid-item {
    width: 100%;
    height: 50px;
    text-align: center;
    margin-bottom: 4px;
    img {
      width: 100%;
      height: 100%;
    }
  }

  :deep(.ant-collapse-borderless) {
    background-color: var(--aside-bg-color);
    .ant-collapse-item {
      border-bottom: none;
    }
  }
}
.mix-grids-box {
  display: flex;
  flex-wrap: wrap;
  .grid-item {
    width: 50%;
    height: 200px;
  }
}
.multiple-grids-box {
  display: flex;
  flex-wrap: wrap;
  .grid-item {
    width: 50%;
    height: 100px;
  }
}
</style>
