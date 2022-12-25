<!-- 柱状图 -->
<template>
  <div v-if="currentComponent.options">
    <div class="title">echarts配置</div>
    <div class="form-body">
      <!-- <div class="form-group">
        <div>Y轴名称：</div>
        <div>
          <a-input
            v-model="handleNull(currentComponent.options.yAxisOptions).name"
            type="text"
            @input="handleInput"
          />
        </div>
      </div>
      <div class="form-group">
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
      <div class="form-group-block">
        <div>颜色：</div>
        <div class="form-item-flex">
          <a-input
            v-model="currentComponent.options.rangeColor.start"
            type="color"
            style="width: 100px"
            @input="handleInput"
          />
          <span>&nbsp;-&nbsp;</span>
          <a-input
            v-model="currentComponent.options.rangeColor.end"
            type="color"
            style="width: 100px"
            @input="handleInput"
          />
        </div>
      </div>
    </div>

    <div class="title">折线配置</div>
    <div class="form-body">
      <div class="form-group">
        <div>颜色：</div>
        <div>
          <a-input
            v-model="
              handleNull(currentComponent.options.seriesOptions.line).itemStyle
                .color
            "
            type="color"
            @change="handleInput"
          />
        </div>
      </div>

       <div class="form-group">
        <div>是否平滑：</div>
        <div>
          <a-switch
            v-model="handleNull(currentComponent.options.seriesOptions.line).smooth"
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
  mixins: [styleMinix]
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/component.scss';
</style>
