/**
 * @ldesign/keyboard-vue
 * LDesign 虚拟键盘 - Vue 3 适配器
 * @packageDocumentation
 */

import type { App, Plugin } from 'vue'
import { KeyboardPopup, VirtualKeyboard, LicensePlateKeyboard } from './components'

// 导出组件
export * from './components'

// 导出 Composables
export * from './composables'

// 从核心包重新导出
export {
  // 管理器
  createKeyboardManager,
  createPositionManager,
  KeyboardManager,
  PositionManager,

  // 布局
  getLayout,
  registerLayout,
  registerLayouts,
  hasLayout,
  getAvailableLayouts,
  unregisterLayout,
  qwertyLayout,
  numberLayout,
  integerLayout,
  symbolLayout,
  symbolLayout2,
  licensePlateLayout,
  licensePlateProvinceLayout,
  licensePlateLetterLayout,
  licensePlateAlphanumericLayout,
  PROVINCES,
  PLATE_LETTERS,
  // 场景化键盘
  idcardLayout,
  phoneLayout,
  phoneSimpleLayout,
  amountLayout,
  amountSimpleLayout,

  // 工具函数
  EventEmitter,
  isMobile,
  isTouchDevice,
  getDeviceType,
  getViewportInfo,
  vibrate,
  onViewportChange,
  getBoundingRect,
  onClickOutside,
  insertTextAtCursor,
  deleteCharBeforeCursor,
  // 随机键盘
  shuffleArray,
  getRandomNumbers,
  getRandomLetters,
  getRandomAlphanumeric,
  createRandomNumberLayout,
  createRandomPinLayout,
  createRandomLetterLayout,
  createRandomMixedLayout,
  refreshRandomLayout,

  // 主题系统
  getTheme,
  registerTheme,
  getAvailableThemes,
  getAllThemes,
  setCurrentTheme,
  getCurrentTheme,
  themeToCSS,
  applyTheme,
  generateThemeStyle,
  mergeTheme,
  createTheme,
  miuiTheme,
  iosTheme,
  materialTheme,
  minimalTheme,
  darkTheme,
  presetThemes,
  defaultTheme,
} from '@ldesign/keyboard-core'

// 导出类型
export type {
  KeyboardType,
  KeyType,
  KeyDefinition,
  KeyboardRow,
  KeyboardConfig,
  KeyboardState,
  KeyboardEventMap,
  KeyboardOptions,
  DeviceType,
  PopupPlacement,
  Position,
  Size,
  BoundingRect,
  PopupPositionConfig,
  PopupPositionResult,
  ViewportInfo,
  // 主题类型
  ThemeName,
  ThemeColors,
  ThemeSizes,
  ThemeEffects,
  ThemeConfig,
  ThemeCSSVariables,
} from '@ldesign/keyboard-core'

/**
 * 键盘插件配置
 */
export interface KeyboardPluginOptions {
  /**
   * 组件前缀
   * @default 'L'
   */
  prefix?: string
}

/**
 * 键盘插件
 * 用于全局注册键盘组件
 */
export const KeyboardPlugin: Plugin = {
  install(app: App, options: KeyboardPluginOptions = {}) {
    const prefix = options.prefix ?? 'L'

    // 注册组件
    app.component(`${prefix}Keyboard`, VirtualKeyboard)
    app.component(`${prefix}KeyboardPopup`, KeyboardPopup)
    app.component(`${prefix}LicensePlateKeyboard`, LicensePlateKeyboard)
  },
}

// 默认导出插件
export default KeyboardPlugin
