<template>
  <div>
    <header>
      <slot name="header" />
    </header>
    <main>
      <el-table
        ref="elTableRef"
        :data="data"
        :border="border"
        :stripe="stripe"
        :height="height"
        :max-height="maxHeight"
        :size="size"
        :empty-text="emptyText"
        :row-key="rowKey"
        :default-expand-all="defaultExpandAll"
        @selection-change="handleSelectionChange"
        @sort-change="handleSortChange"
        @row-click="handleRowClick"
        @row-dblclick="handleRowDblclick"
      >
        <el-table-column
          v-for="(col, idx) in columns"
          :key="getColumnKey(col, idx)"
          :type="getColumnType(col)"
          :prop="'prop' in col ? col.prop : undefined"
          :label="'label' in col ? col.label : undefined"
          :width="'width' in col ? col.width : undefined"
          :min-width="'minWidth' in col ? col.minWidth : undefined"
          :align="'align' in col ? col.align : undefined"
          :fixed="'fixed' in col ? col.fixed : undefined"
          :sortable="'sortable' in col ? col.sortable : undefined"
          :show-overflow-tooltip="
            'showOverflowTooltip' in col ? col.showOverflowTooltip : undefined
          "
          :index="col.type === 'index' ? col.index : undefined"
        >
          <template v-if="col.type === 'expand'" #default="{ row }">
            <slot name="expand" :row="row" />
          </template>
          <template v-else-if="isDataColumn(col)" #default="{ row, $index }">
            <span v-if="col.type === 'text'">{{ row[col.prop] }}</span>
            <el-tag v-else-if="col.type === 'tag'" :type="getTagType(col, row)">
              {{ getTagLabel(col, row) }}
            </el-tag>
            <template v-else-if="col.type === 'button'">
              <el-button
                v-for="(btn, bi) in getVisibleButtons(col, row, $index)"
                :key="bi"
                :type="btn.type || 'default'"
                :size="btn.size || 'small'"
                :link="btn.link ?? false"
                :disabled="btn.disabled ?? false"
                @click="btn.onClick?.(row, $index)"
              >
                {{ btn.text }}
              </el-button>
            </template>
            <el-image
              v-else-if="col.type === 'image'"
              :src="row[col.prop]"
              :style="getImageStyle(col)"
              :fit="col.imageFit || 'cover'"
              :preview-src-list="col.previewSrcList ? col.previewSrcList(row) : undefined"
            />
            <span v-else-if="col.type === 'date'">{{
              formatDate(row[col.prop], col.dateFormat)
            }}</span>
            <el-switch
              v-else-if="col.type === 'switch'"
              :model-value="row[col.prop]"
              :active-value="col.activeValue"
              :inactive-value="col.inactiveValue"
              @change="(val: boolean | string | number) => handleSwitchChange(col, row, val)"
            />
            <el-link
              v-else-if="col.type === 'link'"
              :href="col.href ? col.href(row) : undefined"
              :target="col.linkTarget || '_self'"
              :underline="col.underline ?? true"
              @click="col.onClick?.(row)"
            >
              {{ row[col.prop] }}
            </el-link>
          </template>
        </el-table-column>
      </el-table>
    </main>
    <footer>
      <el-pagination
        v-if="pagination"
        v-model:current-page="currentPage"
        v-model:page-size="currentPageSize"
        :total="pagination.total || 0"
        :page-sizes="pagination.pageSizes || [10, 20, 50, 100]"
        :layout="pagination.layout || 'total, sizes, prev, pager, next, jumper'"
        :background="pagination.background ?? true"
        :size="pagination.size || 'default'"
        @current-change="handlePageChange"
        @size-change="handleSizeChange"
      />
      <slot name="footer" />
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type {
  TableColumn,
  PaginationConfig,
  ButtonConfig,
  SwitchChangeHandler,
} from '@/types/tableType'
import type { TableInstance } from 'element-plus'

const props = withDefaults(
  defineProps<{
    columns: TableColumn[]
    data: Record<string, unknown>[]
    pagination?: PaginationConfig
    border?: boolean
    stripe?: boolean
    height?: string | number
    maxHeight?: string | number
    size?: 'large' | 'default' | 'small'
    emptyText?: string
    rowKey?: string
    defaultExpandAll?: boolean
  }>(),
  {
    border: true,
    stripe: false,
    defaultExpandAll: false,
  },
)

const emit = defineEmits<{
  'selection-change': [selection: Record<string, unknown>[]]
  'sort-change': [sort: { prop: string; order: string | null }]
  'page-change': [page: number]
  'size-change': [size: number]
  'row-click': [row: Record<string, unknown>, column: unknown, event: Event]
  'row-dblclick': [row: Record<string, unknown>, column: unknown, event: Event]
}>()

const elTableRef = ref<TableInstance>()

const currentPage = ref(props.pagination?.currentPage ?? 1)
const currentPageSize = ref(props.pagination?.pageSize ?? 10)

function getColumnKey(col: TableColumn, index: number): string {
  if ('prop' in col && col.prop) return col.prop
  return `${col.type}-${index}`
}

function getColumnType(col: TableColumn): string | undefined {
  if (col.type === 'selection' || col.type === 'index' || col.type === 'expand') {
    return col.type
  }
  return undefined
}

function isDataColumn(col: TableColumn): boolean {
  return !['selection', 'index', 'expand'].includes(col.type)
}

type TagType = 'success' | 'info' | 'warning' | 'danger' | 'primary' | ''

function getTagType(
  col: { tagMap?: Record<string, string> },
  row: Record<string, unknown>,
): TagType {
  if (!col.tagMap) return ''
  const val = String(row[(col as { prop: string }).prop] ?? '')
  return (col.tagMap[val] || '') as TagType
}

function getTagLabel(
  col: { tagLabels?: Record<string, string> },
  row: Record<string, unknown>,
): string {
  const val = String(row[(col as { prop: string }).prop] ?? '')
  if (col.tagLabels && col.tagLabels[val]) return col.tagLabels[val]
  return val
}

function getVisibleButtons(
  col: { buttons: ButtonConfig[] },
  row: Record<string, unknown>,
  index: number,
): ButtonConfig[] {
  return col.buttons.filter((btn) => (btn.visible ? btn.visible(row, index) : true))
}

function getImageStyle(col: { imageWidth?: string | number; imageHeight?: string | number }) {
  return {
    width: col.imageWidth ? `${col.imageWidth}px` : '60px',
    height: col.imageHeight ? `${col.imageHeight}px` : '60px',
  }
}

function formatDate(value: unknown, fmt?: string): string {
  if (!value) return ''
  const d = new Date(value as string | number)
  if (isNaN(d.getTime())) return ''
  const format = fmt || 'YYYY-MM-DD'
  return format
    .replace('YYYY', d.getFullYear().toString())
    .replace('MM', (d.getMonth() + 1).toString().padStart(2, '0'))
    .replace('DD', d.getDate().toString().padStart(2, '0'))
    .replace('HH', d.getHours().toString().padStart(2, '0'))
    .replace('mm', d.getMinutes().toString().padStart(2, '0'))
    .replace('SS', d.getSeconds().toString().padStart(2, '0'))
}

function handleSelectionChange(selection: Record<string, unknown>[]) {
  emit('selection-change', selection)
}

function handleSortChange(sort: { prop: string; order: string | null }) {
  emit('sort-change', sort)
}

function handlePageChange(page: number) {
  emit('page-change', page)
}

function handleSizeChange(size: number) {
  emit('size-change', size)
}

function handleRowClick(row: Record<string, unknown>, column: unknown, event: Event) {
  emit('row-click', row, column, event)
}

function handleRowDblclick(row: Record<string, unknown>, column: unknown, event: Event) {
  emit('row-dblclick', row, column, event)
}

function handleSwitchChange(
  col: { onChange?: SwitchChangeHandler },
  row: Record<string, unknown>,
  val: boolean | string | number,
) {
  col.onChange?.(row, val)
}

const selectedRows = ref<Record<string, unknown>[]>([])

function clearSelection() {
  elTableRef.value?.clearSelection()
}

function toggleRowSelection(row: Record<string, unknown>, selected?: boolean) {
  elTableRef.value?.toggleRowSelection(row, selected)
}

function setCurrentRow(row: Record<string, unknown>) {
  elTableRef.value?.setCurrentRow(row)
}

function getSelectionRows() {
  return selectedRows.value
}

defineExpose({
  clearSelection,
  toggleRowSelection,
  setCurrentRow,
  getSelectionRows,
})
</script>

<style scoped>
header {
  margin-bottom: 16px;
  font-size: 14px;
  font-weight: 500;
  color: #606266;
}

footer {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>
