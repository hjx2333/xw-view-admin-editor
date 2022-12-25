/**
 * 本文件集合系统中的相关设置
 * 前端开发主题设置
 * 本地存储插件vue-ls设置
 */

module.exports = {
  // 项目名称设置
  appTitle: '广州市人大',
  // 项目主名称
  mainTitle: '一体化支撑平台',

  // 主题设置
  primaryColor: '#3296fa', // 主题色
  navTheme: 'light', // 亮暗色菜单                                  可选值为：dark | light
  animate: false, // 是否开启转场动画

  // 系统登录模式
  sysLoginMode: 'cas', // 可选值： cas || oauth

  // vue-ls 配置项
  storageOptions: {
    namespace: 'pro__', // key的前缀
    name: 'ls', // 在项目中的引用，这里设置为 ls ，则在项目全局中使用Vue.ls引用，项目组件中，则使用this.$ls引用
    storage: 'local' // storage name session, local, memory
  }
}
