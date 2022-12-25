// 查找同级目录下以vue结尾的组件
const boxsComponent = require.context('./boxs', true, /\.vue$/)
const echartsComponent = require.context('./echarts', true, /\.vue$/)
const unitsComponent = require.context('./units', true, /\.vue$/)
const gridsComponent = require.context('./grids', true, /\.vue$/)

const setComponent = (Vue, store) => {
  store.keys().forEach(fileName => {
    const config = store(fileName)

    const componentName = fileName
      .replace(/^\.\/(\w*\/)?/, '')
      .replace(/\.\w+$/, '')
    Vue.component(`Xw${componentName}`, config.default || config)
  })
}

const install = Vue => {
  setComponent(Vue, boxsComponent)
  setComponent(Vue, echartsComponent)
  setComponent(Vue, unitsComponent)
  setComponent(Vue, gridsComponent)
}

export default {
  install // 对外暴露install方法
}
