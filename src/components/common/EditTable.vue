<template>
  <div class="edit-table-wrap">
    <a-table
      :columns="columns"
      :data-source="tableData"
      :pagination="false"
      rowKey="id"
    >
      <template slot="key" slot-scope="text, record">
        <a-input v-model="record.key" placeholder="key" />
      </template>
      <template slot="value" slot-scope="text, record">
        <a-input v-model="record.value" placeholder="value" />
      </template>
      <template slot="action" slot-scope="text, record, index">
        <a-button class="btn-handle" title="插入行" @click="addRow">+</a-button>
        <a-button title="删除行" @click="substractRow(index)">-</a-button>
      </template>
    </a-table>
  </div>
</template>

<script>
import { v4 as uuid } from 'uuid'
export default {
  name: 'EditTable',
  props: {
    store: {
      type: [Object, Array],
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
          title: 'Key',
          dataIndex: 'key',
          key: 'key',
          scopedSlots: {
            customRender: 'key'
          }
        },
        {
          title: 'Value',
          dataIndex: 'value',
          key: 'value',
          scopedSlots: {
            customRender: 'value'
          }
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          scopedSlots: {
            customRender: 'action'
          }
        }
      ],
      tableData: [{ id: uuid(), key: '', value: '' }]
    }
  },
  watch: {
    store: {
      handler(data) {
        if (!Array.isArray(data)) {
          data = this.formatToArray(data)
        }

        this.tableData = data
        !data.length && this.addRow()
      },
      immediate: true
    }
  },
  methods: {
    formatToArray(obj) {
      const data = []
      for (const i in obj) {
        data.push({
          id: uuid(),
          key: i,
          value: obj[i]
        })
      }

      return data
    },

    formatToObject() {
      const data = this.tableData
      const obj = {}
      data.forEach(d => {
        obj[d.key] = d.value
      })
      return obj
    },

    addRow() {
      this.tableData.push({
        id: uuid(),
        key: '',
        value: ''
      })
    },

    substractRow(index) {
      const tableData = this.tableData
      if (tableData.length <= 1) return
      tableData.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.edit-table-wrap {
  :deep(.ant-input) {
    width: 280px;
  }
  .btn-handle {
    margin-right: 10px;
  }
}
</style>
