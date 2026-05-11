<template>
  <div>
    <slot :text="message" :count="1"></slot>
  </div>
</template>
<script setup lang="ts">
const message = 'hellow'
</script>
