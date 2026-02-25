/**
 * 主题系统类型定义
 * @module themes/types
 */

/**
 * 预设主题名称
 */
export type ThemeName = 'miui' | 'ios' | 'material' | 'minimal' | 'dark' | 'custom'

/**
 * 主题色彩配置
 */
export interface ThemeColors {
  /** 键盘背景色 */
  background: string
  /** 按键背景色 */
  keyBackground: string
  /** 按键文字颜色 */
  keyColor: string
  /** 按键按下背景色 */
  keyActiveBackground: string
  /** 功能键背景色 */
  fnKeyBackground: string
  /** 功能键文字颜色 */
  fnKeyColor: string
  /** 功能键按下背景色 */
  fnKeyActiveBackground: string
  /** 主色调（确认/完成键） */
  primaryBackground: string
  /** 主色调按下 */
  primaryActiveBackground: string
  /** 主色调文字 */
  primaryColor: string
  /** 边框颜色（可选） */
  borderColor?: string
  /** 分割线颜色 */
  dividerColor?: string
}

/**
 * 主题尺寸配置
 */
export interface ThemeSizes {
  /** 按键高度 */
  keyHeight: number
  /** 按键圆角 */
  keyRadius: number
  /** 按键间距 */
  keyGap: number
  /** 字体大小 */
  fontSize: number
  /** 功能键字体大小 */
  fnFontSize: number
  /** 键盘内边距 */
  padding: number
}

/**
 * 主题效果配置
 */
export interface ThemeEffects {
  /** 按键阴影 */
  keyShadow: string
  /** 按键按下阴影 */
  keyActiveShadow: string
  /** 按键按下缩放 */
  keyActiveScale: number
  /** 动画时长 (ms) */
  transitionDuration: number
  /** 是否启用毛玻璃效果 */
  enableBlur: boolean
  /** 毛玻璃模糊度 */
  blurAmount: number
  /** 是否启用涟漪效果 */
  enableRipple: boolean
}

/**
 * 完整主题配置
 */
export interface ThemeConfig {
  /** 主题名称 */
  name: ThemeName | string
  /** 显示名称 */
  displayName: string
  /** 主题描述 */
  description?: string
  /** 色彩配置 */
  colors: ThemeColors
  /** 尺寸配置 */
  sizes: ThemeSizes
  /** 效果配置 */
  effects: ThemeEffects
  /** 是否为深色主题 */
  isDark: boolean
}

/**
 * 主题CSS变量映射
 */
export interface ThemeCSSVariables {
  '--keyboard-bg': string
  '--keyboard-key-bg': string
  '--keyboard-key-color': string
  '--keyboard-key-active-bg': string
  '--keyboard-fn-key-bg': string
  '--keyboard-fn-key-color': string
  '--keyboard-fn-key-active-bg': string
  '--keyboard-primary-bg': string
  '--keyboard-primary-active-bg': string
  '--keyboard-primary-color': string
  '--keyboard-key-height': string
  '--keyboard-key-radius': string
  '--keyboard-key-gap': string
  '--keyboard-font-size': string
  '--keyboard-fn-font-size': string
  '--keyboard-key-shadow': string
  '--keyboard-transition-duration': string
  '--keyboard-border-color'?: string
  '--keyboard-divider-color'?: string
}
