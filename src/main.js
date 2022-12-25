import 'babel-polyfill'
import 'normalize.css' // 浏览器默认样式重置
import xwview from 'xw-view'
import 'xw-view/lib/xw-view.css'
import '@/assets/iconfont/iconfont'
import '@/assets/iconfont/iconfont.css'
import 'ant-design-vue/dist/antd.min.css' // 蚂蚁金服antdUI组件样式
import '@/assets/styles/index.scss' // 全局公共样式
// 全局引入gzcss和uev项目公共组件，不用在每个组件中重复使用import引入gzcss的组件
import Vue from 'vue'
import Antd from 'ant-design-vue'
import router from '@/router'
import store from '@/store'

// 配置项目主题
import config from '@/defaultSettings'
import App from '@/App.vue'

import moment from 'moment'
// 各类框架、插件
import storage from 'vue-ls' // 本地存储插件
import components from '@/components'
import eventBus from '@/utils/eventBus'
import { axios } from '@/utils/request'
import { install as copy } from '@/utils/keyboardEvents'
import editorConfig from '@/config/editorConfig'

Vue.config.productionTip = false
Vue.use(storage, config.storageOptions)
Vue.use(Antd)
Vue.use(components)
Vue.use(eventBus)
Vue.use(copy)
Vue.use(xwview)

moment.locale('zh-cn')
/**
 * 给全局对象挂载必要的常用工具
 */
Vue.prototype.$moment = moment
Vue.prototype.$axios = axios
Vue.prototype.$xwview = xwview

new Vue({
  router,
  store,
  created() {
    store.commit(
      'initGlobalConfig',
      Object.assign(xwview.getDefaultGlobalConfig(), editorConfig)
    )
  },
  render: h => h(App)
}).$mount('#app')
