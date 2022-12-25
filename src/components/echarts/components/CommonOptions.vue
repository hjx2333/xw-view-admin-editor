<template>
  <div class="form-body">
    <div class="form-group-block">
      <div>标题：</div>
      <div>
        <a-input
          v-model="handleNull(currentComponent.options.titleOptions).text"
          type="text"
          @input="handleInput"
        />
      </div>
    </div>
    <div class="form-group-block">
      <div>副标题：</div>
      <div>
        <a-input
          v-model="handleNull(currentComponent.options.titleOptions).subtext"
          type="text"
          @input="handleInput"
        />
      </div>
    </div>
     <div class="form-group-block">
      <div>标题左位置：</div>
      <div>
        <a-input
          v-model="handleNull(currentComponent.options.titleOptions).left"
          type="text"
          placeholder="例如：30、30%、left、center、right"
          @input="handleInput"
        />
      </div>
    </div>
  </div>
</template>

<script>
import styleMinix from '../../styleMinix'
export default {
  mixins: [styleMinix]
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/component.scss';
</style>
