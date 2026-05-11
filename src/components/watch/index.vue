<template>
  <div>
    <el-button
      type="primary"
      @click="
        () => {
          count++
        }
      "
      >{{ count }}</el-button
    >
  </div>
</template>

<script setup lang="ts">
// 侦听器的基本用法
import { reactive, ref, watch, watchEffect } from 'vue'
const count = ref(1)
// const obj = reactive({ count: 0 })
// 监听一个最基础的ref包裹的数据
// watch(count, (newx) => {
//   console.log(newx)
// })
// watch(
//   () => obj.count,
//   (count) => {
//     console.log(`Count is : ${count}`)
//   },
// )
// watch(
//   obj,
//   (count) => {
//     console.log(`Count is : ${obj.count}`)
//   },
//   { deep: true },
// )

// 使用watcheffect简化代码
// 自动追踪所有能访问到的响应式属性
watchEffect(() => {
  console.log(`监听到count的变化:${count.value}`)
})
</script>
