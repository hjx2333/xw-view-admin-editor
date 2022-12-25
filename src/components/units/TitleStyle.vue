<template>
  <div>
    <div class="title">个性配置</div>
    <div class="form-body">
      <div class="form-group-block">
        <div>标题：</div>
        <div>
          <a-input
            v-model="currentComponent.store.title"
            type="text"
            @input="handleInput"
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
