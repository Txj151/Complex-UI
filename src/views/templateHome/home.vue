<template>
  <div ref="parent">
    <div style="width: 100%; height: 800px"></div>
    <ChildeComponent ref="childRef"></ChildeComponent>
  </div>
</template>

<script setup lang="ts">
import { onMounted, useTemplateRef, watchEffect } from 'vue'
import ChildeComponent from '@/components/templatex/index.vue'
const child = useTemplateRef('childRef')
watchEffect(() => {
  if (child.value) {
    child.value.handleClick('父组件调用')
    console.log(child.value.count)
  } else {
    console.log('元素还未挂载!')
  }
})
onMounted(() => {})
</script>
