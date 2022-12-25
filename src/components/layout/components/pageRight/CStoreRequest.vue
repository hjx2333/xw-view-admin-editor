<template>
  <a-modal :visible="visible" title="动态请求配置" :width="1200" @cancel="hide">
    <template slot="footer">
      <a-button @click="hide">取消</a-button>
      <a-button type="primary" @click="submit">确定</a-button>
      <a-button type="primary" @click="test">测试请求</a-button>
    </template>
    <a-form :model="form" v-bind="layout">
      <a-form-item label="请求地址" name="url">
        <a-input v-model="form.url" placeholder="请输入请求地址" />
      </a-form-item>
      <a-form-item label="请求方法" name="method">
        <a-select
          v-model="form.method"
          option-filter-prop="children"
          placeholder="请选择请求方法"
        >
          <a-select-option
            v-for="(item, index) in methodStore"
            :key="`dict-${index}`"
            :value="item.key"
            >{{ item.label }}</a-select-option
          >
        </a-select>
      </a-form-item>
      <a-form-item label="请求参数" name="params">
        <edit-table ref="editTable" :store="form.params" />
      </a-form-item>
      <a-form-item label="请求频率" name="interval">
        <a-input
          v-model.number="form.interval"
          placeholder="请输入请求频率"
          addon-after="毫秒"
          style="width: 180px; margin-right: 10px"
        />
        <a-tooltip>
          <template slot="title">
            <div>为空时，读取全局配置</div>
            <div>为0时，只在初始化调用</div>
          </template>
          <a-icon type="question-circle-o" style="color: #3296fa" />
        </a-tooltip>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import EditTable from '@/components/common/EditTable.vue'
import { deepCopy } from '@/utils/utils'
export default {
  name: 'CStoreRequest',
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
    requestConfig: {
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
      methodStore: [
        {
          key: 'get',
          label: 'get'
        },
        {
          key: 'post',
          label: 'post'
        },
        {
          key: 'delete',
          label: 'delete'
        },
        {
          key: 'put',
          label: 'put'
        }
      ],
      form: {},
      paramsPlaceholder: '请输入请求参数，格式：{"id": 2}'
    }
  },
  watch: {
    requestConfig: {
      handler(value) {
        this.form = deepCopy(value)
      },
      immediate: true
    }
  },
  methods: {
    hide() {
      this.$emit('change', false)
    },

    submit() {
      const params = this.$refs.editTable.formatToObject()
      this.$store.commit('updateRequest', { ...this.form, params })
      this.hide()
    },

    async test() {
      const { url, method, params } = this.form
      const paramsField = method === 'get' ? 'params' : 'data'
      const res = await this.$axios({
        url,
        method,
        [paramsField]: params
      })

      if (res.success && res.code === 200) {
        alert(JSON.stringify(res.result))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
