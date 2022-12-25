<template>
  <div class="page-header">
    <div class="btn-group">
      <div class="left-btn">
        <a-button
          class="btn-handle"
          :disabled="!handleCache.length"
          @click="cancelHandle"
          >撤销</a-button
        >
        <a-button
          :disabled="!componentStore.length"
          class="btn-handle"
          @click="clearHandle"
          >重做</a-button
        >
        <a-button
          :disabled="!componentStore.length"
          class="btn-handle"
          @click="previewHandle"
          >预览</a-button
        >
        <!-- <a-button class="btn-handle">保存</a-button> -->
        <a-button
          class="btn-handle"
          :disabled="!componentStore.length"
          @click="exportJson"
          >导出</a-button
        >
        <a-upload
          accept=".json,.txt"
          :max-count="1"
          :before-upload="beforeUpload"
          @change="importJson"
        >
          <a-button class="btn-handle">导入</a-button>
        </a-upload>
      </div>
      <div class="editor-info">
        画布高度：
        <a-input
          v-model="globalConfig.editor.height"
          @change="editorSizeChange"
        />
      </div>
      <div class="right-btn">
        <!-- <a-select v-model="themeValue" style="margin-right: 10px;" @change="changeTheme">
          <a-select-option
            v-for="(item, index) in themeStore"
            :key="index"
            :value="item.key"
            >{{ item.value }}</a-select-option
          >
        </a-select> -->
        <a-button class="btn-handle" @click="setGlobalConfig"
          >全局配置</a-button
        >
      </div>

      <global-config v-model="visible" :globalConfig="globalConfig" />
    </div>
  </div>
</template>

<script>
import fileSave from 'file-saver'
import { debounce, deepCopy } from '@/utils/utils'
import { cancelHandle, clearEditor } from '@/utils/keyboardEvents'
import { mapGetters } from 'vuex'
import GlobalConfig from './components/GlobalConfig.vue'
import { getThemeMap, changeTheme } from '@/utils/theme'

export default {
  name: 'PageHeader',
  components: { GlobalConfig },
  data() {
    return {
      isAccept: false,
      visible: false,
      themeValue: 'light',
      themeStore: getThemeMap()
    }
  },
  computed: {
    ...mapGetters([
      'handleCache',
      'componentStore',
      'globalConfig',
      'currentComponent'
    ])
  },
  methods: {
    /** 撤销 */
    cancelHandle,

    changeTheme,

    /** 重做 */
    clearHandle() {
      this.$confirm({
        title: '系统提示',
        content: '即将清空所有数据，且不可撤销，是否继续',
        onOk: () => {
          clearEditor()
        }
      })
    },

    /** 导出json */
    exportJson() {
      this.$message.loading('正在导出，请稍后')
      const store = deepCopy(this.componentStore)
      store.forEach(d => {
        delete d.src
        if (d.children) {
          d.children.forEach(item => {
            delete item.src
          })
        }
      })
      const data = {
        global: { ...this.globalConfig },
        store: store
      }
      const file = new Blob([JSON.stringify(data)], {
        type: 'text/plain;charset=utf-8'
      })
      fileSave(file, '可视化配置.json')
    },

    beforeUpload({ type }) {
      const isAccept = ['application/json', 'text/plain'].includes(type)
      this.isAccept = isAccept
      !isAccept && this.$message.warning('请按要求上传文件')
      return false
    },

    /** 导入json */
    importJson(data) {
      if (!this.isAccept) return
      const reader = new FileReader()
      reader.readAsText(data.file, 'UTF-8')
      reader.onload = evt => {
        try {
          const { global, store } = JSON.parse(evt.target.result)
          clearEditor()
          this.$store.commit('initGlobalConfig', deepCopy(global))
          this.$store.commit('addComponentStore', store)
          this.$store.commit('addHandleCache', deepCopy(store))
        } catch (error) {
          this.$message.error('配置文件读取出错，请检查', error)
        }
      }
    },

    previewHandle() {
      this.$router.push('/preview')
    },

    setGlobalConfig() {
      this.visible = true
    },

    editorSizeChange: debounce(function() {
      this.$bus.emit('editorSizeChange')
    })
  }
}
</script>

<style lang="scss" scoped>
.page-header {
  border-bottom: 1px solid rgba(255,255,255,0.09);
  background-color: var(--bg-color);
}
.btn-group {
  height: 60px;
  line-height: 60px;
  padding: 0 10px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;

  .btn-handle {
    margin-right: 8px;
  }

  .editor-info {
    flex: 1;
  }
}
.editor-info {
  color: var(--text-color);
  :deep(.ant-input) {
    width: 60px;
  }
}
:deep(.ant-upload-list) {
  display: none;
}
</style>
