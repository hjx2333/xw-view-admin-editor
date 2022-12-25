<template>
  <a-modal :visible="visible" :title="title" :width="800" @cancel="hide" @ok="submit">
    <edit-code ref="editCode" :fnCode="eventCode" />
  </a-modal>
</template>

<script>
import EditCode from '@/components/common/EditCode.vue'
export default {
  name: 'CStoreRequest',
  components: { EditCode },
  model: {
    prop: 'visible',
    event: 'change'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    eventCode: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '点击事件配置'
    }
  },
  data() {
    return {
      layout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 18 }
      }
    }
  },
  watch: {
    visible(val) {
      const editCode = this.$refs.editCode
      if (val && editCode) {
        editCode.setValue(this.eventCode)
      }
    }
  },
  methods: {
    hide() {
      this.$emit('change', false)
    },

    submit() {
      this.hide()
      this.$emit('confirm', this.$refs.editCode.getValue())
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
