/**
 * 预设主题配置
 * @module themes/presets
 */

import type { ThemeConfig } from './types'

/**
 * MIUI 小米风格主题（默认）
 * 特点：纯净、扁平、简洁、无多余装饰
 */
export const miuiTheme: ThemeConfig = {
  name: 'miui',
  displayName: 'MIUI',
  description: '小米风格 - 纯净简洁',
  isDark: false,
  colors: {
    background: '#f5f5f5',
    keyBackground: '#ffffff',
    keyColor: '#1a1a1a',
    keyActiveBackground: '#e8e8e8',
    fnKeyBackground: '#e0e0e0',
    fnKeyColor: '#666666',
    fnKeyActiveBackground: '#d0d0d0',
    primaryBackground: '#ff6700', // 小米橙
    primaryActiveBackground: '#e55d00',
    primaryColor: '#ffffff',
    borderColor: 'transparent',
    dividerColor: '#eeeeee',
  },
  sizes: {
    keyHeight: 46,
    keyRadius: 8,
    keyGap: 6,
    fontSize: 18,
    fnFontSize: 14,
    padding: 8,
  },
  effects: {
    keyShadow: 'none',
    keyActiveShadow: 'none',
    keyActiveScale: 0.96,
    transitionDuration: 100,
    enableBlur: false,
    blurAmount: 0,
    enableRipple: false,
  },
}

/**
 * iOS 风格主题
 * 特点：毛玻璃、圆润阴影、精致
 */
export const iosTheme: ThemeConfig = {
  name: 'ios',
  displayName: 'iOS',
  description: 'Apple 风格 - 精致优雅',
  isDark: false,
  colors: {
    background: '#d1d3d9',
    keyBackground: '#ffffff',
    keyColor: '#000000',
    keyActiveBackground: '#b8bac2',
    fnKeyBackground: '#a8aab4',
    fnKeyColor: '#000000',
    fnKeyActiveBackground: '#9699a3',
    primaryBackground: '#007aff',
    primaryActiveBackground: '#0062cc',
    primaryColor: '#ffffff',
    borderColor: 'transparent',
    dividerColor: '#c8cad0',
  },
  sizes: {
    keyHeight: 43,
    keyRadius: 5,
    keyGap: 6,
    fontSize: 22,
    fnFontSize: 15,
    padding: 4,
  },
  effects: {
    keyShadow: '0 1px 0 rgba(0,0,0,0.35)',
    keyActiveShadow: '0 0 0 rgba(0,0,0,0)',
    keyActiveScale: 1,
    transitionDuration: 80,
    enableBlur: true,
    blurAmount: 20,
    enableRipple: false,
  },
}

/**
 * Material Design 主题
 * 特点：深色、涟漪动效、层次感
 */
export const materialTheme: ThemeConfig = {
  name: 'material',
  displayName: 'Material',
  description: 'Google 风格 - 深邃现代',
  isDark: true,
  colors: {
    background: '#263238',
    keyBackground: '#37474f',
    keyColor: '#ffffff',
    keyActiveBackground: '#455a64',
    fnKeyBackground: '#455a64',
    fnKeyColor: '#b0bec5',
    fnKeyActiveBackground: '#546e7a',
    primaryBackground: '#4caf50', // Material Green
    primaryActiveBackground: '#43a047',
    primaryColor: '#ffffff',
    borderColor: 'transparent',
    dividerColor: '#37474f',
  },
  sizes: {
    keyHeight: 48,
    keyRadius: 4,
    keyGap: 4,
    fontSize: 20,
    fnFontSize: 14,
    padding: 6,
  },
  effects: {
    keyShadow: '0 1px 3px rgba(0,0,0,0.2)',
    keyActiveShadow: '0 2px 6px rgba(0,0,0,0.3)',
    keyActiveScale: 1,
    transitionDuration: 150,
    enableBlur: false,
    blurAmount: 0,
    enableRipple: true,
  },
}

/**
 * 极简主题
 * 特点：无边框、超简洁、透明感
 */
export const minimalTheme: ThemeConfig = {
  name: 'minimal',
  displayName: 'Minimal',
  description: '极简风格 - 轻盈透明',
  isDark: false,
  colors: {
    background: 'rgba(250, 250, 250, 0.95)',
    keyBackground: 'transparent',
    keyColor: '#333333',
    keyActiveBackground: 'rgba(0, 0, 0, 0.08)',
    fnKeyBackground: 'transparent',
    fnKeyColor: '#888888',
    fnKeyActiveBackground: 'rgba(0, 0, 0, 0.08)',
    primaryBackground: '#333333',
    primaryActiveBackground: '#000000',
    primaryColor: '#ffffff',
    borderColor: '#eeeeee',
    dividerColor: '#eeeeee',
  },
  sizes: {
    keyHeight: 44,
    keyRadius: 12,
    keyGap: 8,
    fontSize: 17,
    fnFontSize: 13,
    padding: 12,
  },
  effects: {
    keyShadow: 'none',
    keyActiveShadow: 'none',
    keyActiveScale: 0.92,
    transitionDuration: 120,
    enableBlur: true,
    blurAmount: 30,
    enableRipple: false,
  },
}

/**
 * 深色主题
 * 特点：护眼、现代、高对比
 */
export const darkTheme: ThemeConfig = {
  name: 'dark',
  displayName: 'Dark',
  description: '深色模式 - 护眼舒适',
  isDark: true,
  colors: {
    background: '#1c1c1e',
    keyBackground: '#3a3a3c',
    keyColor: '#ffffff',
    keyActiveBackground: '#4a4a4c',
    fnKeyBackground: '#2c2c2e',
    fnKeyColor: '#ebebf5',
    fnKeyActiveBackground: '#3c3c3e',
    primaryBackground: '#0a84ff',
    primaryActiveBackground: '#0070e0',
    primaryColor: '#ffffff',
    borderColor: '#3a3a3c',
    dividerColor: '#3a3a3c',
  },
  sizes: {
    keyHeight: 45,
    keyRadius: 8,
    keyGap: 6,
    fontSize: 18,
    fnFontSize: 14,
    padding: 8,
  },
  effects: {
    keyShadow: '0 1px 2px rgba(0,0,0,0.4)',
    keyActiveShadow: '0 0 8px rgba(10,132,255,0.3)',
    keyActiveScale: 0.97,
    transitionDuration: 100,
    enableBlur: true,
    blurAmount: 20,
    enableRipple: false,
  },
}

/**
 * 所有预设主题
 */
export const presetThemes: Record<string, ThemeConfig> = {
  miui: miuiTheme,
  ios: iosTheme,
  material: materialTheme,
  minimal: minimalTheme,
  dark: darkTheme,
}

/**
 * 默认主题
 */
export const defaultTheme = miuiTheme
