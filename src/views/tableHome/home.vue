<template>
  <div class="table-wrapper">
    <div class="table-card">
      <tablex
        :columns="columns"
        :data="tableData"
        :pagination="pagination"
        border
        stripe
        ref="tableRef"
        @selection-change="onSelectionChange"
        @sort-change="onSortChange"
        @page-change="onPageChange"
        @size-change="onSizeChange"
        @row-click="onRowClick"
      >
        <template #header>动态通用表格</template>
        <template #expand="{ row }">
          <div class="expand-content">
            <p>
              <strong>{{ row.name }}</strong> 的详细资料
            </p>
            <p>邮箱：{{ row.email }}</p>
            <p>部门：{{ row.department }}</p>
            <p v-if="row.remark">备注：{{ row.remark }}</p>
          </div>
        </template>
        <template #footer>
          <el-button type="danger" @click="clearAllSelection">清除选中</el-button>
          <el-button type="primary" @click="logSelection">打印选中行</el-button>
        </template>
      </tablex>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import tablex from '@/components/tablex/index.vue'
import type { TableColumn, PaginationConfig } from '@/types/tableType'

const tableRef = ref<InstanceType<typeof tablex>>()

const columns: TableColumn[] = [
  { type: 'selection', width: 50 },
  { type: 'index', label: '#', width: 60 },
  { type: 'expand', label: '详情', width: 60 },
  { label: '姓名', prop: 'name', type: 'text', sortable: true, width: 120 },
  { label: '年龄', prop: 'age', type: 'text', sortable: true, width: 80, align: 'center' },
  {
    label: '状态',
    prop: 'status',
    type: 'tag',
    width: 100,
    align: 'center',
    tagMap: { active: 'success', inactive: 'info', pending: 'warning' },
    tagLabels: { active: '启用', inactive: '禁用', pending: '待审核' },
  },
  {
    label: '头像',
    prop: 'avatar',
    type: 'image',
    width: 100,
    align: 'center',
    imageWidth: 50,
    imageHeight: 50,
  },
  { label: '入职日期', prop: 'hireDate', type: 'date', width: 120, dateFormat: 'YYYY-MM-DD' },
  { label: '部门', prop: 'department', type: 'text', minWidth: 120 },
  {
    label: '启用',
    prop: 'enabled',
    type: 'switch',
    width: 80,
    align: 'center',
    onChange: (row, val) => {
      console.log('切换启用状态:', row.name, val)
    },
  },
  {
    label: '链接',
    prop: 'name',
    type: 'link',
    width: 120,
    href: (row) => `https://example.com/user/${row.id}`,
    linkTarget: '_blank',
    onClick: (row) => {
      console.log('点击链接:', row.name)
    },
  },
  {
    label: '操作',
    prop: 'actions',
    type: 'button',
    width: 200,
    align: 'center',
    fixed: 'right',
    buttons: [
      {
        text: '编辑',
        type: 'primary',
        size: 'small',
        link: true,
        onClick: (row) => console.log('编辑:', row.name),
      },
      {
        text: '详情',
        type: 'info',
        size: 'small',
        link: true,
        onClick: (row) => console.log('查看:', row.name),
      },
      {
        text: '启用',
        type: 'success',
        size: 'small',
        link: true,
        visible: (row) => !row.enabled,
        onClick: (row) => console.log('启用:', row.name),
      },
      {
        text: '删除',
        type: 'danger',
        size: 'small',
        link: true,
        onClick: (row) => console.log('删除:', row.name),
      },
    ],
  },
]

const tableData = ref<Record<string, unknown>[]>([
  {
    id: 1,
    name: '张三',
    age: 28,
    status: 'active',
    avatar: 'https://picsum.photos/100/100?random=1',
    hireDate: '2023-03-15',
    department: '技术部',
    enabled: true,
    email: 'zhangsan@example.com',
    remark: '前端工程师',
  },
  {
    id: 2,
    name: '李四',
    age: 32,
    status: 'inactive',
    avatar: 'https://picsum.photos/100/100?random=2',
    hireDate: '2021-07-01',
    department: '产品部',
    enabled: false,
    email: 'lisi@example.com',
    remark: '',
  },
  {
    id: 3,
    name: '王五',
    age: 25,
    status: 'pending',
    avatar: 'https://picsum.photos/100/100?random=3',
    hireDate: '2024-01-10',
    department: '设计部',
    enabled: true,
    email: 'wangwu@example.com',
    remark: 'UI 设计师',
  },
  {
    id: 4,
    name: '赵六',
    age: 35,
    status: 'active',
    avatar: 'https://picsum.photos/100/100?random=4',
    hireDate: '2019-06-20',
    department: '技术部',
    enabled: true,
    email: 'zhaoliu@example.com',
    remark: '后端工程师',
  },
  {
    id: 5,
    name: '孙七',
    age: 29,
    status: 'inactive',
    avatar: 'https://picsum.photos/100/100?random=5',
    hireDate: '2022-11-05',
    department: '市场部',
    enabled: false,
    email: 'sunqi@example.com',
    remark: '市场专员',
  },
  {
    id: 6,
    name: '周八',
    age: 31,
    status: 'active',
    avatar: 'https://picsum.photos/100/100?random=6',
    hireDate: '2020-04-18',
    department: '运营部',
    enabled: true,
    email: 'zhouba@example.com',
    remark: '',
  },
  {
    id: 7,
    name: '吴九',
    age: 27,
    status: 'pending',
    avatar: 'https://picsum.photos/100/100?random=7',
    hireDate: '2024-02-28',
    department: '技术部',
    enabled: true,
    email: 'wujiu@example.com',
    remark: '实习生',
  },
  {
    id: 8,
    name: '郑十',
    age: 33,
    status: 'active',
    avatar: 'https://picsum.photos/100/100?random=8',
    hireDate: '2018-09-12',
    department: '管理部',
    enabled: true,
    email: 'zhengshi@example.com',
    remark: '项目经理',
  },
])

const pagination: PaginationConfig = {
  currentPage: 1,
  pageSize: 5,
  total: tableData.value.length,
  pageSizes: [5, 10, 20],
  background: true,
}

function onSelectionChange(selection: Record<string, unknown>[]) {
  console.log('选中行:', selection)
}

function onSortChange(sort: { prop: string; order: string | null }) {
  console.log('排序变化:', sort)
}

function onPageChange(page: number) {
  pagination.currentPage = page
  console.log('页码变化:', page)
}

function onSizeChange(size: number) {
  pagination.pageSize = size
  pagination.currentPage = 1
  console.log('每页条数变化:', size)
}

function onRowClick(row: Record<string, unknown>) {
  console.log('行点击:', row.name)
}

function clearAllSelection() {
  tableRef.value?.clearSelection()
}

function logSelection() {
  console.log('当前选中:', tableRef.value?.getSelectionRows())
}
</script>

<style scoped>
.table-wrapper {
  display: flex;
  justify-content: center;
  min-height: 100%;
  padding: 40px 0;
}

.table-card {
  width: 100%;
  max-width: 1100px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
  padding: 32px;
}

.expand-content {
  padding: 12px 24px;
  background: #f5f7fa;
  border-radius: 6px;
}

.expand-content p {
  margin: 4px 0;
  font-size: 13px;
  color: #606266;
}
</style>
