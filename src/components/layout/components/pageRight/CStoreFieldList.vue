<template>
  <div class="list-box">
    <a-table
      :columns="columns"
      :data-source="tableData"
      :pagination="false"
      rowKey="name"
    />
  </div>
</template>

<script>
export default {
  name: 'ComponentStoreFieldList',
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      columns: [
        {
          title: '序号',
          align: 'center',
          width: 60,
          dataIndex: 'number',
          key: 'number',
          customRender: (text, record, index) => index + 1
        },
        {
          title: '参数名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '描述',
          dataIndex: 'description',
          key: 'description'
        }, {
          title: '类型',
          dataIndex: 'type',
          key: 'type'
        }]
    }
  }
}
</script>

<style lang="scss" scoped>
.list-box {
  margin-top: 20px;
}
</style>
