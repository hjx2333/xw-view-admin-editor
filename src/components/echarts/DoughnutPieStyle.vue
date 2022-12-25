<!-- 环状图 -->
<template>
  <div v-if="currentComponent.options">
    <div class="title">echarts配置</div>
    <div class="form-body">
      <div class="form-group">
        <div>数据名称：</div>
        <div>
          <a-input v-model="currentComponent.options.seriesOptions.name" type="text" @input="handleInput" />
        </div>
      </div>

      <div class="form-group">
        <div>上位置：</div>
        <div>
          <a-input v-model="currentComponent.options.seriesOptions.top" type="text" @input="handleInput" />
        </div>
      </div>

      <div class="form-group">
        <div>左位置：</div>
        <div>
          <a-input v-model="currentComponent.options.seriesOptions.left" type="text" @input="handleInput" />
        </div>
      </div>

      <div class="form-group">
        <div>右位置：</div>
        <div>
          <a-input v-model="currentComponent.options.seriesOptions.right" type="text" @input="handleInput" />
        </div>
      </div>

      <div class="form-group">
        <div>下位置：</div>
        <div>
          <a-input v-model="currentComponent.options.seriesOptions.bottom" type="text" @input="handleInput" />
        </div>
      </div>
    </div>

    <div class="title">标题配置</div>
    <div class="form-body">
      <div class="form-group">
        <div>一级标题：</div>
        <div>
          <a-input v-model="handleNull(currentComponent.options.titleOptions).text" type="text" @input="handleInput" />
        </div>
      </div>

      <div class="form-group">
        <div>二级标题：</div>
        <div>
          <a-input v-model="handleNull(currentComponent.options.titleOptions).subtext" type="text" @input="handleInput" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import styleMinix from '../styleMinix'
export default {
  mixins: [styleMinix],
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/component.scss';
</style>
