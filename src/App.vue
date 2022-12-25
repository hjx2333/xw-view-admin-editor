<template>
  <a-config-provider :locale="locale">
    <div id="app">
      <keep-alive :include="['Home']">
        <router-view />
      </keep-alive>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
export default {
  data() {
    return {
      locale: zhCN
    }
  },
  created() {
    console.log(
      `[环境变量]当前主环境为：${process.env.NODE_ENV} 分支环境为：${process.env.VUE_APP_BRANCH_ENV}`
    )
  }
}
</script>

<style lang="scss">
#app {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: var(--bg-color);
}
</style>
