<template>
  <div v-if="currentComponent && currentComponent.store" class="store-wrap">
    数据类型：<a-select v-model="value" option-filter-prop="children" @change="changeHandle">
      <a-select-option
        v-for="(item, index) in selectData"
        :key="`dict-${index}`"
        :value="item.key"
        >{{ item.label }}</a-select-option
      >
    </a-select>

    <a-button
      v-show="value === '2'"
      type="primary"
      class="btn-config"
      @click="showRequestConfig"
      >动态请求配置</a-button
    >

    <c-store-field-list :tableData="currentComponent.store.fields" />

    <a-button v-show="value === '2'" type="primary" class="btn-filter" @click="configDataFilter">数据过滤器</a-button>

    <c-store-handle :renderData="currentComponent.store.staticData" />

    <c-store-request
      v-model="visible"
      :requestConfig="currentComponent.store.request"
    />

    <c-event-config v-model="eventVisible" :title="'数据过滤器'" :eventCode="requestConfig.filterCode" @confirm="filterConfirm" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CStoreFieldList from './CStoreFieldList.vue'
import CStoreHandle from './CStoreManage.vue'
import CStoreRequest from './CStoreRequest.vue'
import CEventConfig from './CEventConfig.vue'
export default {
  name: 'ComponentStore',
  components: { CStoreFieldList, CStoreHandle, CStoreRequest, CEventConfig },
  data() {
    return {
      value: '1',
      selectData: [
        {
          key: '1',
          label: '静态数据'
        },
        {
          key: '2',
          label: '动态请求'
        }
      ],
      visible: false,
      eventVisible: false
    }
  },
  computed: {
    ...mapGetters(['currentComponent', 'requestConfig'])
  },
  watch: {
    currentComponent(value) {
      this.value = value.store.request.useRequest ? '2' : '1'
    }
  },
  methods: {
    showRequestConfig() {
      this.visible = true
    },

    changeHandle(value) {
      const useRequest = value === '2'
      this.$store.commit('updateRequest', { ...this.requestConfig, useRequest })
    },

    configDataFilter() {
      this.eventVisible = true
    },

    filterConfirm(filterCode) {
      this.$store.commit('updateRequest', { ...this.requestConfig, filterCode })
    }
  }
}
</script>

<style lang="scss" scoped>
.store-wrap {
  color: var(--text-color);
}
.btn-config {
  margin-left: 10px;
}
.btn-filter {
  margin-top: 20px;
}
</style>
