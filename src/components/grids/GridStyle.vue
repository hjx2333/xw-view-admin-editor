<template>
  <div>
    <div class="title">样式配置</div>
    <div class="form-body">
      <div class="form-group">
        <div>上边框：</div>
        <div>
          <a-switch
            v-model="currentComponent.style.borderTop"
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
