<template>
  <div class="animate-wrap">
    <div v-for="item in animationClassData" :key="item.label">
      <div class="animate-title">{{ item.label }}</div>
      <div class="animate-list">
        <div
          v-for="d in item.children"
          :key="d.value"
          class="animate-item"
          @click="addAnimate(d)"
          @mouseenter="showAnimate(d)"
        >
          <div :ref="d.value" class="animate-label">{{ d.label }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import animationClassData from '@/utils/animationClassData'
export default {
  name: 'AnimateConfig',
  data() {
    return {
      animationClassData
    }
  },
  methods: {
    addAnimate({ value }) {
      this.$store.commit('updateAnimate', {
        type: value
      })
      this.$message.success('配置成功')
    },

    showAnimate(item) {
      const { value, pending } = item
      if (pending) return
      item.pending = true
      const ele = this.$refs[value][0]
      const animateType = ` animate__animated ${value}`
      const hideAnimation = () => {
        ele.className = ele.className.replace(animateType, '')
        ele.removeEventListener('animationend', hideAnimation)
        item.pending = false
      }
      ele.className += animateType
      ele.addEventListener('animationend', hideAnimation)
    }
  }
}
</script>

<style lang="scss" scoped>
.animate-wrap {
  color: var(--text-color);

  .animate-title {
    font-size: 20px;
    margin-bottom: 20px;
  }
  .animate-list {
    display: flex;
    flex-wrap: wrap;
  }
  .animate-item {
    width: 96px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-bottom: 10px;
    margin-right: 10px;
    display: flex;
    align-items: center;
    cursor: pointer;
    &:nth-child(3n) {
      margin-right: 0;
    }
  }
  .animate-label {
    width: 88%;
    height: 34px;
    line-height: 34px;
    margin: 0 auto;
    background: var(--primary-color);
    font-size: 12px;
    color: #fff;
  }
}
</style>
