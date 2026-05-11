<template>
  <div class="form-wrapper">
    <div class="form-card">
      <formx :FormInstance="Instance" ref="formRef">
        <template #header>复用组件</template>
        <template #footer>
          <el-button type="primary" @click="handleClick">提交</el-button>
          <el-button type="default" @click="handleReset">重置</el-button>
          <el-button type="warning" @click="toggleGenderOptions">切换性别选项</el-button>
          <el-button type="danger" @click="toggleBioVisible">切换简介</el-button>
        </template>
      </formx>
    </div>
  </div>
</template>

<script setup lang="ts">
import formx from '@/components/formx/index.vue'
import { type FormItem, Trigger } from '@/types/formType'
import { ref, useTemplateRef } from 'vue'

const formRef = useTemplateRef('formRef')

const Instance = ref<FormItem[]>([
  {
    label: '姓名',
    name: 'name',
    type: 'input',
    placeholder: '请输入姓名',
    rule: {
      required: true,
      trigger: Trigger.blur,
      message: '姓名不能为空!',
    },
    events: {
      change: (val: string | number) => {
        if (val) handleCurrentChange(val)
      },
    },
  },
  {
    label: '简介',
    name: 'bio',
    type: 'textarea',
    placeholder: '请输入简介',
    visible: false,
    rule: {
      required: true,
      trigger: Trigger.blur,
      message: '简介不能为空!',
    },
  },
  {
    label: '性别',
    name: 'gender',
    type: 'select',
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' },
    ],
    events: {
      change: (val: unknown) => console.log('性别 change:', val),
    },
  },
  {
    label: '开关',
    name: 'enabled',
    type: 'switch',
    value: true,
    events: {
      change: (val: boolean | string | number) => console.log('开关 change:', val),
    },
  },
  {
    label: '生日',
    name: 'birthday',
    type: 'date',
    rule: {
      required: true,
      trigger: Trigger.blur,
      message: '生日不能为空!',
    },
  },
  {
    label: '娱乐项目',
    name: 'playgames',
    type: 'checkboxgroup',
    options: [
      { name: '瓦罗兰特', value: 'Voliet' },
      { name: '英雄联盟', value: 'LOL' },
    ],
    events: {
      change: (val: unknown) => console.log('娱乐项目 change:', val),
    },
  },
  {
    label: '支付方式',
    name: 'paymethods',
    type: 'radiogroup',
    options: [
      { name: '现金', value: 'Cash' },
      { name: '网银', value: 'WeChat' },
    ],
  },
])

const handleCurrentChange = (val: string | number) => {
  if (val) {
    const bio = Instance.value.find((i) => i.name === 'bio')
    if (bio) bio.visible = true
  }
}

const toggleGenderOptions = () => {
  const gender = Instance.value.find((i) => i.name === 'gender')
  if (gender && 'options' in gender) {
    gender.options =
      gender.options.length === 2
        ? [{ label: '未知', value: 'unknown' }]
        : [
            { label: '男', value: 'male' },
            { label: '女', value: 'female' },
          ]
  }
}

const toggleBioVisible = () => {
  const bio = Instance.value.find((i) => i.name === 'bio')
  if (bio) bio.visible = !bio.visible
}

const handleClick = () => {
  formRef.value?.validate().then(() => {
    console.log('检测通过')
    console.log(formRef.value?.form)
  })
}

const handleReset = () => {
  formRef.value?.resetFields()
}
</script>

<style scoped>
.form-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  padding: 40px 0;
}

.form-card {
  width: 600px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  padding: 40px 48px;
}
</style>
