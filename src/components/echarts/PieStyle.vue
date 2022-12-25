<!-- 饼图 -->
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

    <div class="title">文本标签配置</div>
    <div class="form-body">
      <div class="form-group">
        <div>是否展示：</div>
        <div>
          <a-switch
            v-model="handleNull(currentComponent.options.labelOptions).show"
            @change="handleInput"
          />
        </div>
      </div>

      <div class="form-group">
        <div>位置：</div>
        <div>
          <a-select v-model="handleNull(currentComponent.options.labelOptions).position" @change="handleInput">
            <a-select-option v-for="item in position" :key="item.key" :value="item.key">{{ item.value }}</a-select-option>
          </a-select>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { position } from '@/utils/dictionary'
import styleMinix from '../styleMinix'
export default {
  name: 'PieStyle',
  mixins: [styleMinix],
  data() {
    return {
      position
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/component.scss';
</style>
