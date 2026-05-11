<template>
  <div>
    <header>
      <slot name="header" :text="header"></slot>
    </header>
    <main>
      <slot name="main" :text="main"></slot>
    </main>
    <footer>
      <slot name="footer" :text="footer"></slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const header = ref('头部')
const main = ref('内容')
const footer = ref('尾部')
</script>
