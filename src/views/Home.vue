<template>
  <div>
    <page-header />
    <div class="flex-box">
      <page-left />
      <page-center />
      <page-right />
    </div>
  </div>
</template>

<script>
import PageHeader from '@/components/layout/PageHeader.vue'
import PageLeft from '@/components/layout/PageLeft.vue'
import PageCenter from '@/components/layout/PageCenter.vue'
import PageRight from '@/components/layout/PageRight.vue'
export default {
  name: 'Home',
  components: { PageHeader, PageLeft, PageCenter, PageRight },
  data() {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.flex-box {
  display: flex;
  height: calc(100vh - 60px);
}
</style>
