<template>
  <div class="right-form">
    <div class="title">容器配置</div>
    <div class="form-body">
      <div class="form-group form-group-block">
        <div>组件唯一标识：</div>
        <div>{{ store.id }}</div>
      </div>
      <div class="form-group">
        <div>宽度：</div>
        <div>
          <a-input
            v-model="store.style.width"
            type="text"
            @input="formatValue('width', $event)"
          />
        </div>
      </div>
      <div class="form-group">
        <div>高度：</div>
        <div>
          <a-input
            v-model="store.style.height"
            type="text"
            @input="formatValue('height', $event)"
          />
        </div>
      </div>
      <div class="form-group">
        <div>上位置：</div>
        <div>
          <a-input
            v-model="store.style.top"
            type="text"
            @input="formatValue('top', $event)"
          />
        </div>
      </div>
      <div class="form-group">
        <div>左位置：</div>
        <div>
          <a-input
            v-model="store.style.left"
            type="text"
            @input="formatValue('left', $event)"
          />
        </div>
      </div>
    </div>

    <slot />
  </div>
</template>

<script>
import styleMinix from '@/components/styleMinix'
export default {
  name: 'CommonStyleConfig',
  mixins: [styleMinix]
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/component.scss';
</style>
