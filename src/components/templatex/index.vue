<template>
  <div>
    <el-button type="primary" @click="handleClick">点击</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const count = ref(1)
const handleClick = async (value?: string) => {
  count.value++
  console.log(value)
}
defineExpose({
  count,
  handleClick,
})
</script>
