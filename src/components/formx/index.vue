<template>
  <div>
    <header>
      <slot name="header"></slot>
    </header>
    <main>
      <el-form
        ref="elFormRef"
        :model="form"
        label-width="auto"
        style="max-width: 600px"
        :rules="rules"
        :validate-on-rule-change="false"
      >
        <el-form-item
          v-for="(item) in items"
          :key="item.name"
          :label="item.label"
          :required="item.rule?.required"
          :prop="item.name"
          v-show="item.visible"
        >
          <el-input
            v-if="item.type === 'input' || item.type === 'textarea'"
            v-model="form[item.name]"
            :type="item.type"
            autosize
            :disabled="item.disabled"
            v-on="item.events"
          />
          <el-select v-if="item.type === 'select'" v-model="form[item.name]" v-on="item.events">
            <el-option
              v-for="(opt, i) in item.options"
              :key="i"
              :label="opt.label"
              :value="opt.value"
            />
          </el-select>
          <el-date-picker
            v-if="item.type === 'date'"
            v-model="form[item.name]"
            type="date"
            v-on="item.events"
          />
          <el-switch v-if="item.type === 'switch'" v-model="form[item.name]" v-on="item.events" />
          <el-checkbox-group
            v-if="item.type === 'checkboxgroup'"
            v-model="form[item.name]"
            v-on="item.events"
          >
            <el-checkbox
              v-for="(opt, i) in item.options"
              :key="i"
              :name="opt.name"
              :value="opt.value"
            >
              {{ opt.name }}
            </el-checkbox>
          </el-checkbox-group>
          <el-radio-group
            v-if="item.type === 'radiogroup'"
            v-model="form[item.name]"
            v-on="item.events"
          >
            <el-radio v-for="(opt, i) in item.options" :key="i" :name="opt.name" :value="opt.value">
              {{ opt.name }}
            </el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </main>
    <footer>
      <slot name="footer"></slot>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import type { FormItem } from '@/types/formType'
import { applyItemDefaults } from '@/types/formType'
import type { FormInstance } from 'element-plus'

const props = defineProps<{
  FormInstance: FormItem[]
}>()

const items = computed(() => props.FormInstance.map(applyItemDefaults))

const elFormRef = ref<FormInstance>()

const form = reactive<Record<string, unknown>>({})
const rules = reactive<Record<string, unknown>>({})

watch(
  items,
  (newItems) => {
    const names = new Set(newItems.map((i) => i.name))
    for (const key of Object.keys(form)) {
      if (!names.has(key)) {
        delete form[key]
        delete rules[key]
      }
    }
    newItems.forEach((item) => {
      if (!(item.name in form)) {
        form[item.name] = item.type === 'checkboxgroup' ? (item.value ?? []) : (item.value ?? '')
      }
      if (item.rule) {
        rules[item.name] = item.rule
      } else if (rules[item.name]) {
        delete rules[item.name]
      }
    })
  },
  { deep: true, immediate: true },
)

const validate = async () => {
  return elFormRef.value?.validate()
}
const resetFields = async () => {
  return elFormRef.value?.resetFields()
}

defineExpose({
  form,
  validate,
  resetFields,
})
</script>

<style scoped>
header {
  margin-bottom: 24px;
  font-size: 14px;
  font-weight: 500;
  color: #606266;
}

footer {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #ebeef5;
  font-size: 14px;
  color: #606266;
}
</style>
