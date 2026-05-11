<script setup lang="ts">
import UseVmodel from '@/components/vmodel/useVmodel.vue'
import { ref } from 'vue'
const myText = ref('')
</script>

<template>
  <div>
    <UseVmodel v-model.capitalize="myText"></UseVmodel>
  </div>
</template>
