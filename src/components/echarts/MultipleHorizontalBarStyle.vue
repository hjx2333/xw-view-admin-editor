<!-- 分组条形图 -->
<template>
  <div v-if="currentComponent.options">
    <div class="title">echarts配置</div>
    <div class="form-body">
      <div class="form-group">
        <div>Y轴名称：</div>
        <div>
          <a-input
            v-model="handleNull(currentComponent.options.yAxisOptions).name"
            type="text"
            @input="handleInput"
          />
        </div>
      </div>
      <!-- <div class="form-group">
        <div>数据名称：</div>
        <div>
          <a-input
            v-model="currentComponent.options.seriesOptions.name"
            type="text"
            @input="handleInput"
          />
        </div>
      </div> -->
      <div class="form-group">
        <div>上位置：</div>
        <div>
          <a-input
            v-model="handleNull(currentComponent.options.grid).top"
            type="text"
            @input="handleInput"
          />
        </div>
      </div>
      <div class="form-group">
        <div>左位置：</div>
        <div>
          <a-input
            v-model="handleNull(currentComponent.options.grid).left"
            type="text"
            @input="handleInput"
          />
        </div>
      </div>

      <div class="form-group">
        <div>右位置：</div>
        <div>
          <a-input
            v-model="handleNull(currentComponent.options.grid).right"
            type="text"
            @input="handleInput"
          />
        </div>
      </div>
      <div class="form-group">
        <div>下位置：</div>
        <div>
          <a-input
            v-model="handleNull(currentComponent.options.grid).bottom"
            type="text"
            @input="handleInput"
          />
        </div>
      </div>
      <div class="form-group">
        <div>标签：</div>
        <div>
          <a-switch
            v-model="handleNull(currentComponent.options.labelOptions).show"
            @change="handleInput"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import styleMinix from '../styleMinix'
export default {
  name: 'MultipleHorizontalBarStyle',
  mixins: [styleMinix]
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/component.scss';
</style>
