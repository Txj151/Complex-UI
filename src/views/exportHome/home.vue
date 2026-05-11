<template>
  <div class="page">
    <el-card class="card">
      <template #header>
        <span>JSON → TXT 导出演示</span>
      </template>

      <div class="section">
        <h4>源数据</h4>
        <pre class="json-preview">{{ formattedData }}</pre>
      </div>

      <div class="actions">
        <el-button type="primary" @click="handleExportJSON">导出为 JSON</el-button>
        <el-button type="success" @click="handleExportTXT">导出为 TXT</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { exportJson, exportText } from '@/utils/export'

const sampleData = {
  name: '张三',
  department: '技术部',
  skills: ['Vue', 'TypeScript', 'Node.js'],
  active: true,
  profile: {
    age: 28,
    email: 'zhangsan@example.com',
  },
}

const formattedData = computed(() => JSON.stringify(sampleData, null, 2))

const txtHeader = '===== 用户信息导出 =====\n\n'

function handleExportJSON() {
  exportJson(sampleData, '用户数据.json')
}

function handleExportTXT() {
  const content = txtHeader + formattedData.value + '\n\n===== 导出完毕 ====='
  exportText(content, '用户数据.txt')
}
</script>

<style scoped>
.page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  padding: 40px;
}

.card {
  width: 640px;
}

.section {
  margin-bottom: 20px;
}

.section h4 {
  margin: 0 0 8px;
  font-weight: 500;
  color: #606266;
}

.json-preview {
  background: #f5f7fa;
  border: 1px solid #e4e7ed;
  border-radius: 6px;
  padding: 16px;
  font-size: 13px;
  line-height: 1.6;
  overflow-x: auto;
  margin: 0;
}

.actions {
  display: flex;
  gap: 12px;
}
</style>
