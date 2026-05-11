export interface FormOption {
  label?: string
  value: string
  name?: string
}
export enum Trigger {
  blur = 'blur',
  change = 'change',
}
export interface RuleFormItem {
  required: boolean
  message: string
  trigger: Trigger.blur | Trigger.change
}
export interface InputEvents {
  blur?: (e: FocusEvent) => void
  focus?: (e: FocusEvent) => void
  change?: (value: string | number) => void
  input?: (value: string | number) => void
  clear?: () => void
}

export interface SelectEvents {
  change?: (value: unknown) => void
  blur?: (e: FocusEvent) => void
  focus?: (e: FocusEvent) => void
  clear?: () => void
}

export interface DateEvents {
  change?: (value: unknown) => void
  blur?: (e: FocusEvent) => void
  focus?: (e: FocusEvent) => void
}

export interface SwitchEvents {
  change?: (value: boolean | string | number) => void
}

export interface CheckBoxGroupEvents {
  change?: (value: unknown) => void
}

export interface RadioGroupEvents {
  change?: (value: unknown) => void
}

interface FormItemBase {
  label: string
  name: string
  placeholder?: string
  required?: boolean
  value?: unknown
  visible?: boolean
  disabled?: boolean
  rule?: RuleFormItem
}

interface InputItem extends FormItemBase {
  type: 'input' | 'textarea'
  maxlength?: number
  minlength?: number
  clearable?: boolean
  events?: InputEvents
}

interface SelectItem extends FormItemBase {
  type: 'select'
  options: FormOption[]
  multiple?: boolean
  filterable?: boolean
  events?: SelectEvents
}

interface DateItem extends FormItemBase {
  type: 'date'
  events?: DateEvents
}

interface SwitchItem extends FormItemBase {
  type: 'switch'
  events?: SwitchEvents
}

interface CheckBoxGroupItem extends FormItemBase {
  type: 'checkboxgroup'
  options: FormOption[]
  events?: CheckBoxGroupEvents
}

interface RadioGroupItem extends FormItemBase {
  type: 'radiogroup'
  options: FormOption[]
  events?: RadioGroupEvents
}

export type FormItem =
  | InputItem
  | SelectItem
  | DateItem
  | SwitchItem
  | CheckBoxGroupItem
  | RadioGroupItem

export function applyItemDefaults(item: FormItem): FormItem {
  return {
    ...item,
    required: item.required ?? false,
    visible: item.visible ?? true,
    disabled: item.disabled ?? false,
  }
}
