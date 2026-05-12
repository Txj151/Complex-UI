export interface ButtonConfig {
  text: string
  type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | ''
  size?: 'small' | 'default' | 'large'
  link?: boolean
  disabled?: boolean
  visible?: (row: Record<string, unknown>, index: number) => boolean
  onClick?: (row: Record<string, unknown>, index: number) => void
}

interface ColumnBase {
  label: string
  prop: string
  width?: string | number
  minWidth?: string | number
  align?: 'left' | 'center' | 'right'
  fixed?: 'left' | 'right' | boolean
  sortable?: boolean | 'custom'
  showOverflowTooltip?: boolean
}

interface TextColumn extends ColumnBase {
  type: 'text'
}

interface TagColumn extends ColumnBase {
  type: 'tag'
  tagMap?: Record<string, string>
  tagLabels?: Record<string, string>
}

interface ButtonColumn extends ColumnBase {
  type: 'button'
  buttons: ButtonConfig[]
}

interface ImageColumn extends ColumnBase {
  type: 'image'
  imageWidth?: string | number
  imageHeight?: string | number
  imageFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  previewSrcList?: (row: Record<string, unknown>) => string[]
}

interface DateColumn extends ColumnBase {
  type: 'date'
  dateFormat?: string
}

interface SwitchColumn extends ColumnBase {
  type: 'switch'
  activeValue?: boolean | string | number
  inactiveValue?: boolean | string | number
  onChange?: (row: Record<string, unknown>, value: boolean | string | number) => void
}

interface LinkColumn extends ColumnBase {
  type: 'link'
  href?: (row: Record<string, unknown>) => string
  linkTarget?: '_blank' | '_self' | '_parent' | '_top'
  underline?: boolean
  onClick?: (row: Record<string, unknown>) => void
}

interface IndexColumn {
  type: 'index'
  label?: string
  width?: string | number
  fixed?: 'left' | 'right' | boolean
  index?: (index: number) => number
}

interface SelectionColumn {
  type: 'selection'
  width?: string | number
  fixed?: 'left' | 'right' | boolean
}

interface ExpandColumn {
  type: 'expand'
  label?: string
  width?: string | number
}

export type TableColumn =
  | TextColumn
  | TagColumn
  | ButtonColumn
  | ImageColumn
  | DateColumn
  | SwitchColumn
  | LinkColumn
  | IndexColumn
  | SelectionColumn
  | ExpandColumn

export interface PaginationConfig {
  currentPage?: number
  pageSize?: number
  total?: number
  pageSizes?: number[]
  layout?: string
  background?: boolean
  size?: 'small' | 'default' | 'large'
}

export type SwitchChangeHandler = (
  row: Record<string, unknown>,
  value: boolean | string | number,
) => void

export function applyColumnDefaults(column: TableColumn): TableColumn {
  return column
}
