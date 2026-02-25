/**
 * 键盘管理器
 * @module managers/keyboard-manager
 */

import type {
  KeyboardConfig,
  KeyboardEventMap,
  KeyboardOptions,
  KeyboardState,
  KeyboardType,
  KeyDefinition,
} from '../types'
import { getLayout } from '../layouts'
import { EventEmitter } from '../utils/event-emitter'
import { isMobile, vibrate } from '../utils/device'
import {
  deleteCharBeforeCursor,
  getInputCursorPosition,
  insertTextAtCursor,
  setInputCursorPosition,
} from '../utils/dom'

/**
 * 默认键盘选项
 */
const DEFAULT_OPTIONS: Required<KeyboardOptions> = {
  type: 'qwerty',
  value: '',
  maxLength: undefined as unknown as number,
  defaultUpperCase: false,
  closeOnClickOutside: true,
  enableSound: false,
  enableVibrate: true,
  customLayouts: {},
}

/**
 * 键盘管理器类
 * 处理键盘状态管理、输入处理等核心逻辑
 */
export class KeyboardManager extends EventEmitter<KeyboardEventMap> {
  /** 配置选项 */
  private options: Required<KeyboardOptions>

  /** 当前状态 */
  private state: KeyboardState

  /** 当前布局配置 */
  private currentLayout: KeyboardConfig | null = null

  constructor(options: KeyboardOptions = {}) {
    super()
    this.options = { ...DEFAULT_OPTIONS, ...options }

    // 注册自定义布局
    if (options.customLayouts) {
      Object.entries(options.customLayouts).forEach(([name, layout]) => {
        // 这里不用 registerLayout 以避免覆盖内置布局的警告
        this.options.customLayouts[name] = layout
      })
    }

    // 初始化状态
    this.state = {
      visible: false,
      type: this.options.type,
      isUpperCase: this.options.defaultUpperCase,
      value: this.options.value,
      cursorPosition: this.options.value.length,
      maxLength: this.options.maxLength,
      inputElement: null,
    }

    // 加载初始布局
    this.loadLayout(this.options.type)
  }

  /**
   * 获取当前状态
   */
  getState(): Readonly<KeyboardState> {
    return { ...this.state }
  }

  /**
   * 获取当前布局配置
   */
  getLayout(): KeyboardConfig | null {
    return this.currentLayout
  }

  /**
   * 获取配置选项
   */
  getOptions(): Readonly<Required<KeyboardOptions>> {
    return { ...this.options }
  }

  /**
   * 加载键盘布局
   */
  private loadLayout(type: KeyboardType | string): boolean {
    // 先从自定义布局查找
    let layout = this.options.customLayouts[type]

    // 再从内置布局查找
    if (!layout) {
      layout = getLayout(type) as KeyboardConfig
    }

    if (!layout) {
      console.error(`[KeyboardManager] Layout "${type}" not found`)
      return false
    }

    this.currentLayout = layout

    // 更新大小写状态
    if (layout.supportShift) {
      this.state.isUpperCase = layout.defaultUpperCase ?? this.options.defaultUpperCase
    }

    return true
  }

  /**
   * 显示键盘
   */
  show(inputElement?: HTMLInputElement | HTMLTextAreaElement): void {
    if (this.state.visible) return

    this.state.visible = true
    this.state.inputElement = inputElement ?? null

    // 同步输入框的值
    if (inputElement) {
      this.state.value = inputElement.value
      this.state.cursorPosition = getInputCursorPosition(inputElement)
    }

    this.emitStateChange()
    this.emit('show', { type: this.state.type })
  }

  /**
   * 隐藏键盘
   */
  hide(): void {
    if (!this.state.visible) return

    const prevType = this.state.type
    this.state.visible = false
    this.state.inputElement = null

    this.emitStateChange()
    this.emit('hide', { type: prevType })
  }

  /**
   * 切换键盘显示/隐藏
   */
  toggle(inputElement?: HTMLInputElement | HTMLTextAreaElement): void {
    if (this.state.visible) {
      this.hide()
    }
    else {
      this.show(inputElement)
    }
  }

  /**
   * 切换键盘类型
   */
  switchType(type: KeyboardType | string): void {
    if (this.state.type === type) return

    const fromType = this.state.type
    if (!this.loadLayout(type)) return

    this.state.type = type as KeyboardType

    this.emitStateChange()
    this.emit('switch', { from: fromType, to: type as KeyboardType })
  }

  /**
   * 切换大小写
   */
  toggleShift(): void {
    if (!this.currentLayout?.supportShift) return

    this.state.isUpperCase = !this.state.isUpperCase
    this.emitStateChange()
    this.emit('shift', { isUpperCase: this.state.isUpperCase })
  }

  /**
   * 设置大小写状态
   */
  setShift(isUpperCase: boolean): void {
    if (!this.currentLayout?.supportShift) return
    if (this.state.isUpperCase === isUpperCase) return

    this.state.isUpperCase = isUpperCase
    this.emitStateChange()
    this.emit('shift', { isUpperCase })
  }

  /**
   * 处理按键
   */
  handleKey(key: KeyDefinition): void {
    // 触发震动反馈
    if (this.options.enableVibrate && isMobile()) {
      vibrate(10)
    }

    this.emit('keypress', { key, value: this.state.value })

    switch (key.type) {
      case 'char':
      case 'space':
        this.handleCharKey(key)
        break
      case 'backspace':
        this.handleBackspace()
        break
      case 'shift':
        this.toggleShift()
        break
      case 'clear':
        this.handleClear()
        break
      case 'enter':
      case 'done':
        this.handleConfirm()
        break
      case 'close':
        this.hide()
        break
      case 'tab':
        this.handleTab(key)
        break
      case 'custom':
        // 自定义按键，只触发事件
        break
    }
  }

  /**
   * 处理字符输入
   */
  private handleCharKey(key: KeyDefinition): void {
    const keyValue = this.getKeyValue(key)
    if (!keyValue) return

    const input = this.state.inputElement

    if (input) {
      // 如果有绑定输入框，直接操作输入框
      const result = insertTextAtCursor(input, keyValue, this.state.maxLength)
      input.value = result.value
      setInputCursorPosition(input, result.cursorPosition)
      this.state.value = result.value
      this.state.cursorPosition = result.cursorPosition

      // 触发原生 input 事件
      input.dispatchEvent(new Event('input', { bubbles: true }))
    }
    else {
      // 没有输入框，直接修改内部值
      console.log('[handleCharKey] Check maxLength:', {
        maxLength: this.state.maxLength,
        currentLength: this.state.value.length,
        willBlock: this.state.maxLength && this.state.value.length >= this.state.maxLength
      })
      if (this.state.maxLength && this.state.value.length >= this.state.maxLength) {
        console.log('[handleCharKey] Blocked: reached maxLength')
        return
      }
      const newValue = this.state.value.slice(0, this.state.cursorPosition)
        + keyValue
        + this.state.value.slice(this.state.cursorPosition)
      this.state.value = newValue
      this.state.cursorPosition += keyValue.length
    }

    this.emitStateChange()
    this.emit('input', { value: this.state.value, key })

    // 车牌号智能切换
    this.autoSwitchLicensePlate()
  }

  /**
   * 处理退格
   */
  private handleBackspace(): void {
    const input = this.state.inputElement

    if (input) {
      const result = deleteCharBeforeCursor(input)
      input.value = result.value
      setInputCursorPosition(input, result.cursorPosition)
      this.state.value = result.value
      this.state.cursorPosition = result.cursorPosition

      // 触发原生 input 事件
      input.dispatchEvent(new Event('input', { bubbles: true }))

      this.emitStateChange()
      this.emit('backspace', { deletedChar: result.deletedChar, value: this.state.value })
    }
    else {
      if (this.state.cursorPosition === 0) return

      const deletedChar = this.state.value.charAt(this.state.cursorPosition - 1)
      this.state.value = this.state.value.slice(0, this.state.cursorPosition - 1)
        + this.state.value.slice(this.state.cursorPosition)
      this.state.cursorPosition--

      this.emitStateChange()
      this.emit('backspace', { deletedChar, value: this.state.value })
    }

    // 车牌号智能切换
    this.autoSwitchLicensePlate()
  }

  /**
   * 车牌号智能切换逻辑
   * 根据当前值长度自动切换键盘布局
   * 只有 2 种布局：省份键盘（第1位）和 字母+数字混合键盘（第2-8位）
   */
  private autoSwitchLicensePlate(): void {
    // 只在车牌键盘类型时生效
    if (!this.state.type.startsWith('license-plate')) return

    const len = this.state.value.length
    let targetType: string | null = null

    if (len === 0) {
      // 第1位：省份简称
      targetType = 'license-plate-province'
    }
    else {
      // 第2-8位：字母+数字混合键盘
      // （第2位虽然只能输入字母，但显示混合键盘，用户自己知道不能输入数字）
      targetType = 'license-plate-alphanumeric'
    }

    // 如果需要切换
    if (targetType && this.state.type !== targetType) {
      console.log('[LicensePlate] Auto-switch:', {
        value: this.state.value,
        len,
        from: this.state.type,
        to: targetType
      })
      this.switchType(targetType)
    }
  }

  /**
   * 处理清空
   */
  private handleClear(): void {
    const previousValue = this.state.value

    if (this.state.inputElement) {
      this.state.inputElement.value = ''
      this.state.inputElement.dispatchEvent(new Event('input', { bubbles: true }))
    }

    this.state.value = ''
    this.state.cursorPosition = 0

    this.emitStateChange()
    this.emit('clear', { previousValue })
    
    // 车牌号智能切换
    this.autoSwitchLicensePlate()
  }

  /**
   * 处理确认
   */
  private handleConfirm(): void {
    this.emit('confirm', { value: this.state.value })
    this.hide()
  }

  /**
   * 处理切换键盘
   */
  private handleTab(key: KeyDefinition): void {
    const targetType = key.data?.targetType as KeyboardType | string | undefined
    if (targetType) {
      this.switchType(targetType)
    }
  }

  /**
   * 获取按键的实际输出值
   */
  private getKeyValue(key: KeyDefinition): string {
    const value = key.value ?? key.label

    if (typeof value === 'string') {
      return value
    }

    return this.state.isUpperCase ? value.upper : value.lower
  }

  /**
   * 获取按键的显示文本
   */
  getKeyLabel(key: KeyDefinition): string {
    const label = key.label

    if (typeof label === 'string') {
      return label
    }

    return this.state.isUpperCase ? label.upper : label.lower
  }

  /**
   * 设置值
   */
  setValue(value: string): void {
    this.state.value = value
    this.state.cursorPosition = value.length

    if (this.state.inputElement) {
      this.state.inputElement.value = value
      setInputCursorPosition(this.state.inputElement, value.length)
    }

    this.emitStateChange()
    
    // 车牌号智能切换
    this.autoSwitchLicensePlate()
  }

  /**
   * 追加值（在光标位置插入文本）
   */
  appendValue(text: string): void {
    if (!text) return

    const input = this.state.inputElement

    if (input) {
      const result = insertTextAtCursor(input, text, this.state.maxLength)
      input.value = result.value
      setInputCursorPosition(input, result.cursorPosition)
      this.state.value = result.value
      this.state.cursorPosition = result.cursorPosition

      // 触发原生 input 事件
      input.dispatchEvent(new Event('input', { bubbles: true }))
    }
    else {
      if (this.state.maxLength && this.state.value.length + text.length > this.state.maxLength) {
        text = text.slice(0, this.state.maxLength - this.state.value.length)
      }
      const newValue = this.state.value.slice(0, this.state.cursorPosition)
        + text
        + this.state.value.slice(this.state.cursorPosition)
      this.state.value = newValue
      this.state.cursorPosition += text.length
    }

    this.emitStateChange()
  }

  /**
   * 设置最大长度
   */
  setMaxLength(maxLength?: number): void {
    this.state.maxLength = maxLength
    this.emitStateChange()
  }

  /**
   * 绑定输入框
   */
  bindInput(input: HTMLInputElement | HTMLTextAreaElement): void {
    this.state.inputElement = input
    this.state.value = input.value
    this.state.cursorPosition = getInputCursorPosition(input)
    this.emitStateChange()
  }

  /**
   * 解绑输入框
   */
  unbindInput(): void {
    this.state.inputElement = null
    this.emitStateChange()
  }

  /**
   * 发送状态变化事件
   */
  private emitStateChange(): void {
    this.emit('stateChange', { ...this.state })
  }

  /**
   * 销毁
   */
  destroy(): void {
    this.hide()
    this.clear()
    this.state.inputElement = null
  }
}

/**
 * 创建键盘管理器实例
 */
export function createKeyboardManager(options?: KeyboardOptions): KeyboardManager {
  return new KeyboardManager(options)
}
