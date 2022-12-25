<template>
  <a-modal :visible="visible" title="全局配置" :width="1200" @cancel="hide">
    <template slot="footer">
      <a-button @click="hide">取消</a-button>
      <a-button type="primary" @click="submit">确定</a-button>
    </template>
    <a-form :model="form" v-bind="layout">
      <a-form-item label="请求地址前缀" name="prefix">
        <a-input v-model="form.prefix" placeholder="请输入请求地址前缀" />
      </a-form-item>
      <a-form-item label="请求头" name="headers">
        <edit-table ref="editTable" :store="form.headers" />
      </a-form-item>
      <a-form-item label="请求频率" name="interval">
        <a-input
          v-model.number="form.interval"
          placeholder="请输入请求频率"
          addon-after="毫秒"
          class="interval-input"
        />
        <a-tooltip>
          <template slot="title">为空或0时只在初始化调用</template>
          <a-icon type="question-circle-o" style="color: #3296fa;" />
        </a-tooltip>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import EditTable from '@/components/common/EditTable.vue'
import { deepCopy } from '@/utils/utils'
export default {
  name: 'GlobalConfig',
  components: { EditTable },
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    globalConfig: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      layout: {
        labelCol: { span: 3 },
        wrapperCol: { span: 19 }
      },
      form: {},
      paramsPlaceholder: '请输入请求头，格式：{"id": 2}'
    }
  },
  watch: {
    visible: {
      handler(value) {
        if (value) {
          this.form = deepCopy(this.globalConfig.request)
        }
      },
      immediate: true
    }
  },
  methods: {
    hide() {
      this.$emit('change', false)
    },

    submit() {
      const headers = this.$refs.editTable.formatToObject()
      const data = {
        ...this.form,
        headers
      }
      this.$store.commit('updateGlobalRequestConfig', data)
      this.hide()
    }
  }
}
</script>

<style lang="scss" scoped>
.interval-input {
  width: 180px;
  margin-right: 10px;
}
</style>
