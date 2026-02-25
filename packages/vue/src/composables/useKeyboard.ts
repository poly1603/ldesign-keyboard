/**
 * 键盘管理 Composable
 * @module composables/useKeyboard
 */

import { computed, onBeforeUnmount, reactive, ref, shallowRef, watch } from 'vue'
import type { Ref } from 'vue'
import {
  createKeyboardManager,
  type KeyboardConfig,
  type KeyboardEventMap,
  type KeyboardOptions,
  type KeyboardState,
  type KeyboardType,
  type KeyDefinition,
} from '@ldesign/keyboard-core'

/**
 * useKeyboard 选项
 */
export interface UseKeyboardOptions extends KeyboardOptions {
  /**
   * 是否立即显示
   */
  immediate?: boolean
}

/**
 * useKeyboard 返回值
 */
export interface UseKeyboardReturn {
  /**
   * 键盘是否可见
   */
  visible: Ref<boolean>

  /**
   * 当前键盘类型
   */
  type: Ref<KeyboardType>

  /**
   * 是否大写状态
   */
  isUpperCase: Ref<boolean>

  /**
   * 当前输入值
   */
  value: Ref<string>

  /**
   * 光标位置
   */
  cursorPosition: Ref<number>

  /**
   * 当前布局配置
   */
  layout: Ref<KeyboardConfig | null>

  /**
   * 完整状态
   */
  state: KeyboardState

  /**
   * 显示键盘
   */
  show: (input?: HTMLInputElement | HTMLTextAreaElement) => void

  /**
   * 隐藏键盘
   */
  hide: () => void

  /**
   * 切换显示/隐藏
   */
  toggle: (input?: HTMLInputElement | HTMLTextAreaElement) => void

  /**
   * 切换键盘类型
   */
  switchType: (type: KeyboardType | string) => void

  /**
   * 切换大小写
   */
  toggleShift: () => void

  /**
   * 处理按键
   */
  handleKey: (key: KeyDefinition) => void

  /**
   * 获取按键显示文本
   */
  getKeyLabel: (key: KeyDefinition) => string

  /**
   * 设置值
   */
  setValue: (value: string) => void

  /**
   * 追加值（在光标位置插入文本）
   */
  appendValue: (text: string) => void

  /**
   * 设置最大长度
   */
  setMaxLength: (maxLength?: number) => void

  /**
   * 绑定输入框
   */
  bindInput: (input: HTMLInputElement | HTMLTextAreaElement) => void

  /**
   * 解绑输入框
   */
  unbindInput: () => void

  /**
   * 事件监听
   */
  on: <K extends keyof KeyboardEventMap>(
    event: K,
    handler: (data: KeyboardEventMap[K]) => void
  ) => () => void

  /**
   * 单次事件监听
   */
  once: <K extends keyof KeyboardEventMap>(
    event: K,
    handler: (data: KeyboardEventMap[K]) => void
  ) => () => void

  /**
   * 销毁
   */
  destroy: () => void
}

/**
 * 键盘管理 Composable
 */
export function useKeyboard(options: UseKeyboardOptions = {}): UseKeyboardReturn {
  const { immediate = false, ...keyboardOptions } = options

  // 创建键盘管理器
  const manager = createKeyboardManager(keyboardOptions)

  // 响应式状态
  const visible = ref(false)
  const type = ref<KeyboardType>(keyboardOptions.type ?? 'qwerty')
  const isUpperCase = ref(keyboardOptions.defaultUpperCase ?? false)
  const value = ref(keyboardOptions.value ?? '')
  const cursorPosition = ref(keyboardOptions.value?.length ?? 0)
  const layout = shallowRef<KeyboardConfig | null>(manager.getLayout())

  // 完整状态（响应式对象）
  const state = reactive<KeyboardState>({
    visible: false,
    type: keyboardOptions.type ?? 'qwerty',
    isUpperCase: keyboardOptions.defaultUpperCase ?? false,
    value: keyboardOptions.value ?? '',
    cursorPosition: keyboardOptions.value?.length ?? 0,
    maxLength: keyboardOptions.maxLength,
    inputElement: null,
  })

  // 同步管理器状态到 Vue 响应式状态
  const syncState = (newState: KeyboardState) => {
    visible.value = newState.visible
    type.value = newState.type
    isUpperCase.value = newState.isUpperCase
    value.value = newState.value
    cursorPosition.value = newState.cursorPosition

    Object.assign(state, newState)
  }

  // 监听状态变化
  manager.on('stateChange', syncState)

  // 监听键盘类型切换，更新布局
  manager.on('switch', () => {
    layout.value = manager.getLayout()
  })

  // 立即显示
  if (immediate) {
    manager.show()
  }

  // 组件卸载时销毁
  onBeforeUnmount(() => {
    manager.destroy()
  })

  return {
    visible,
    type,
    isUpperCase,
    value,
    cursorPosition,
    layout,
    state,
    show: (input?: HTMLInputElement | HTMLTextAreaElement) => manager.show(input),
    hide: () => manager.hide(),
    toggle: (input?: HTMLInputElement | HTMLTextAreaElement) => manager.toggle(input),
    switchType: (t: KeyboardType | string) => manager.switchType(t),
    toggleShift: () => manager.toggleShift(),
    handleKey: (key: KeyDefinition) => manager.handleKey(key),
    getKeyLabel: (key: KeyDefinition) => manager.getKeyLabel(key),
    setValue: (v: string) => manager.setValue(v),
    appendValue: (text: string) => manager.appendValue(text),
    setMaxLength: (maxLength?: number) => manager.setMaxLength(maxLength),
    bindInput: (input: HTMLInputElement | HTMLTextAreaElement) => manager.bindInput(input),
    unbindInput: () => manager.unbindInput(),
    on: (event, handler) => manager.on(event, handler),
    once: (event, handler) => manager.once(event, handler),
    destroy: () => manager.destroy(),
  }
}
