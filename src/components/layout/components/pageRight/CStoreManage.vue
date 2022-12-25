<template>
    <div>
        <div class="title">数据内容</div>
        <a-upload accept=".json,.txt" :max-count="1" :before-upload="beforeUpload" @change="importJson">
          <a-button type="primary">导入</a-button>
        </a-upload>
        <a-button type="primary" @click="downloadJson">下载</a-button>

        <div class="code-box">
            <code>{{ renderData }}</code>
        </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import fileSave from 'file-saver'
import { deepCopy } from '@/utils/utils'

export default {
  name: 'CstoreHandle',
  props: {
    renderData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isAccept: false
    }
  },
  computed: {
    ...mapGetters(['componentStore'])
  },
  methods: {
    beforeUpload({ type }) {
      const isAccept = ['application/json', 'text/plain'].includes(type)
      this.isAccept = isAccept
      !isAccept && this.$message.warning('请按要求上传文件')
      return false
    },

    importJson(data) {
      if (!this.isAccept) return
      const reader = new FileReader()
      reader.readAsText(data.file, 'UTF-8')
      reader.onload = evt => {
        this.$store.commit('updateStaticData', JSON.parse(evt.target.result))
        this.$store.commit('addHandleCache', deepCopy(this.componentStore))
      }
    },

    downloadJson() {
      this.$message.loading('正在下载，请稍后')
      const file = new Blob([JSON.stringify(this.renderData)], { type: 'text/plain;charset=utf-8' })
      fileSave(file, '静态数据源.json')
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  margin: 20px 0;
}
:deep(.ant-btn) {
  margin-right: 10px;
}
:deep(.ant-upload-list) {
  display: none;
}
.code-box {
  margin-top: 20px;
  background: #000;
  color: #fff;
  padding: 20px;
  border-radius: 4px;
}
</style>
