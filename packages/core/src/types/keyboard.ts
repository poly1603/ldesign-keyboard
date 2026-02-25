/**
 * 键盘类型定义
 * @module types/keyboard
 */

/**
 * 键盘类型
 */
export type KeyboardType =
  | 'qwerty'        // 标准字母键盘
  | 'number'        // 数字键盘(带小数点)
  | 'integer'       // 整数键盘(无小数点)
  | 'symbol'        // 符号键盘
  | 'license-plate' // 车牌号键盘
  | 'idcard'        // 身份证键盘
  | 'phone'         // 手机号键盘
  | 'phone-simple'  // 简易拨号键盘
  | 'amount'        // 金额键盘
  | 'amount-simple' // 简易金额键盘
  | 'bankcard'      // 银行卡键盘
  | 'verifycode'    // 验证码键盘
  | 'email'         // 邮箱键盘
  | 'url'           // 网址键盘
  | 'search'        // 搜索键盘
  | 'custom'        // 自定义键盘

/**
 * 按键类型
 */
export type KeyType =
  | 'char'          // 普通字符键
  | 'backspace'     // 退格键
  | 'shift'         // Shift 键
  | 'space'         // 空格键
  | 'enter'         // 确认键
  | 'tab'           // 切换键盘类型
  | 'close'         // 关闭键盘
  | 'clear'         // 清空
  | 'done'          // 完成
  | 'custom'        // 自定义功能键

/**
 * 按键定义
 */
export interface KeyDefinition {
  /**
   * 按键唯一标识
   */
  id: string

  /**
   * 按键类型
   */
  type: KeyType

  /**
   * 显示的文本（支持小写/大写状态）
   */
  label: string | { lower: string; upper: string }

  /**
   * 按键输出的值（支持小写/大写状态）
   */
  value?: string | { lower: string; upper: string }

  /**
   * 按键宽度（相对单位，默认 1）
   */
  width?: number

  /**
   * 是否禁用
   */
  disabled?: boolean

  /**
   * 自定义类名
   */
  className?: string

  /**
   * 自定义图标（用于功能键）
   */
  icon?: string

  /**
   * 下拉选项（点击按键时弹出选项列表）
   */
  options?: string[]

  /**
   * 自定义数据
   */
  data?: Record<string, unknown>
}

/**
 * 键盘行定义
 */
export interface KeyboardRow {
  /**
   * 行内按键列表
   */
  keys: KeyDefinition[]

  /**
   * 行自定义类名
   */
  className?: string
}

/**
 * 键盘配置
 */
export interface KeyboardConfig {
  /**
   * 键盘类型
   */
  type: KeyboardType

  /**
   * 键盘名称
   */
  name: string

  /**
   * 键盘布局（行列结构）
   */
  rows: KeyboardRow[]

  /**
   * 是否支持大小写切换
   */
  supportShift?: boolean

  /**
   * 默认大小写状态
   */
  defaultUpperCase?: boolean

  /**
   * 是否支持切换到其他键盘
   */
  switchable?: KeyboardType[]

  /**
   * 自定义数据
   */
  data?: Record<string, unknown>
}

/**
 * 键盘状态
 */
export interface KeyboardState {
  /**
   * 是否可见
   */
  visible: boolean

  /**
   * 当前键盘类型
   */
  type: KeyboardType

  /**
   * 是否大写状态
   */
  isUpperCase: boolean

  /**
   * 当前输入值
   */
  value: string

  /**
   * 光标位置
   */
  cursorPosition: number

  /**
   * 最大长度限制
   */
  maxLength?: number

  /**
   * 当前绑定的输入框元素
   */
  inputElement?: HTMLInputElement | HTMLTextAreaElement | null
}

/**
 * 键盘事件映射
 */
export interface KeyboardEventMap {
  [key: string]: unknown
  /**
   * 按键按下
   */
  keypress: { key: KeyDefinition; value: string }

  /**
   * 输入值变化
   */
  input: { value: string; key: KeyDefinition }

  /**
   * 退格
   */
  backspace: { deletedChar: string; value: string }

  /**
   * 清空
   */
  clear: { previousValue: string }

  /**
   * 确认/完成
   */
  confirm: { value: string }

  /**
   * 键盘显示
   */
  show: { type: KeyboardType }

  /**
   * 键盘隐藏
   */
  hide: { type: KeyboardType }

  /**
   * 键盘类型切换
   */
  switch: { from: KeyboardType; to: KeyboardType }

  /**
   * 大小写切换
   */
  shift: { isUpperCase: boolean }

  /**
   * 状态变化
   */
  stateChange: KeyboardState
}

/**
 * 键盘选项
 */
export interface KeyboardOptions {
  /**
   * 初始键盘类型
   * @default 'qwerty'
   */
  type?: KeyboardType

  /**
   * 初始值
   */
  value?: string

  /**
   * 最大输入长度
   */
  maxLength?: number

  /**
   * 是否默认大写
   * @default false
   */
  defaultUpperCase?: boolean

  /**
   * 点击外部是否关闭键盘
   * @default true
   */
  closeOnClickOutside?: boolean

  /**
   * 按键声音
   * @default false
   */
  enableSound?: boolean

  /**
   * 按键震动（移动端）
   * @default true
   */
  enableVibrate?: boolean

  /**
   * 自定义键盘布局
   */
  customLayouts?: Record<string, KeyboardConfig>
}
