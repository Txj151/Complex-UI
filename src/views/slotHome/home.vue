<script setup lang="ts">
import baseSlot from '@/components/slot/slotSlot.vue'
import ConditionPropSlot from '@/components/slot/conditionPropSlot.vue'
// import ConditionSlot from '@/components/slot/conditionSlot.vue'
import NameSlot from '@/components/slot/nameSlot.vue'
import PropSlot from '@/components/slot/propSlot.vue'
</script>
<template>
  <div>
    <baseSlot> 点击测试 </baseSlot>

    <NameSlot>
      <template #header>
        <h5>我是header头部</h5>
      </template>
      <template>
        <h5>我是默认内容区</h5>
      </template>
      <template #footer>
        <h5>我是footer尾部</h5>
      </template>
    </NameSlot>
    <!-- 
    <ConditionSlot>
      <template #header>
        <h5>我是header头部</h5>
      </template>
      <template>
        <h5>我是默认内容区</h5>
      </template>
      <template #footer>
        <h5>我是footer尾部</h5>
      </template>
    </ConditionSlot> -->

    <PropSlot v-slot="slotProps"> {{ slotProps.text }} {{ slotProps.count }} </PropSlot>

    <ConditionPropSlot>
      <template #header="headerProps">
        {{ headerProps.text }}
      </template>
      <template #main="mainProps">
        {{ mainProps.text }}
      </template>
      <template #footer="footerProps">
        {{ footerProps.text }}
      </template>
    </ConditionPropSlot>
  </div>
</template>

<style scoped></style>
