/**
 * 主题管理模块
 * @module themes
 */

import type { ThemeConfig, ThemeCSSVariables, ThemeName } from './types'
import { defaultTheme, presetThemes } from './presets'

export * from './types'
export * from './presets'

/**
 * 自定义主题存储
 */
const customThemes: Map<string, ThemeConfig> = new Map()

/**
 * 当前激活的主题
 */
let currentTheme: ThemeConfig = defaultTheme

/**
 * 获取主题配置
 * @param name - 主题名称
 * @returns 主题配置，如果不存在则返回默认主题
 */
export function getTheme(name: ThemeName | string): ThemeConfig {
  return customThemes.get(name) || presetThemes[name] || defaultTheme
}

/**
 * 注册自定义主题
 * @param theme - 主题配置
 */
export function registerTheme(theme: ThemeConfig): void {
  customThemes.set(theme.name, theme)
}

/**
 * 获取所有可用主题
 * @returns 主题名称列表
 */
export function getAvailableThemes(): string[] {
  return [...Object.keys(presetThemes), ...customThemes.keys()]
}

/**
 * 获取所有主题配置
 * @returns 主题配置列表
 */
export function getAllThemes(): ThemeConfig[] {
  return [
    ...Object.values(presetThemes),
    ...customThemes.values(),
  ]
}

/**
 * 设置当前主题
 * @param name - 主题名称
 */
export function setCurrentTheme(name: ThemeName | string): ThemeConfig {
  currentTheme = getTheme(name)
  return currentTheme
}

/**
 * 获取当前主题
 */
export function getCurrentTheme(): ThemeConfig {
  return currentTheme
}

/**
 * 将主题配置转换为 CSS 变量
 * @param theme - 主题配置
 * @returns CSS 变量对象
 */
export function themeToCSS(theme: ThemeConfig): ThemeCSSVariables {
  return {
    '--keyboard-bg': theme.colors.background,
    '--keyboard-key-bg': theme.colors.keyBackground,
    '--keyboard-key-color': theme.colors.keyColor,
    '--keyboard-key-active-bg': theme.colors.keyActiveBackground,
    '--keyboard-fn-key-bg': theme.colors.fnKeyBackground,
    '--keyboard-fn-key-color': theme.colors.fnKeyColor,
    '--keyboard-fn-key-active-bg': theme.colors.fnKeyActiveBackground,
    '--keyboard-primary-bg': theme.colors.primaryBackground,
    '--keyboard-primary-active-bg': theme.colors.primaryActiveBackground,
    '--keyboard-primary-color': theme.colors.primaryColor,
    '--keyboard-key-height': `${theme.sizes.keyHeight}px`,
    '--keyboard-key-radius': `${theme.sizes.keyRadius}px`,
    '--keyboard-key-gap': `${theme.sizes.keyGap}px`,
    '--keyboard-font-size': `${theme.sizes.fontSize}px`,
    '--keyboard-fn-font-size': `${theme.sizes.fnFontSize}px`,
    '--keyboard-key-shadow': theme.effects.keyShadow,
    '--keyboard-transition-duration': `${theme.effects.transitionDuration}ms`,
    '--keyboard-border-color': theme.colors.borderColor,
    '--keyboard-divider-color': theme.colors.dividerColor,
  }
}

/**
 * 将 CSS 变量应用到元素
 * @param element - 目标元素
 * @param theme - 主题配置
 */
export function applyTheme(element: HTMLElement, theme: ThemeConfig): void {
  const cssVars = themeToCSS(theme)
  Object.entries(cssVars).forEach(([key, value]) => {
    if (value) {
      element.style.setProperty(key, value)
    }
  })

  // 添加主题类名
  element.classList.remove('keyboard-theme-light', 'keyboard-theme-dark')
  element.classList.add(theme.isDark ? 'keyboard-theme-dark' : 'keyboard-theme-light')
  element.dataset.theme = theme.name
}

/**
 * 生成主题的内联样式字符串
 * @param theme - 主题配置
 * @returns 内联样式字符串
 */
export function generateThemeStyle(theme: ThemeConfig): string {
  const cssVars = themeToCSS(theme)
  return Object.entries(cssVars)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`)
    .join('; ')
}

/**
 * 合并主题配置
 * @param base - 基础主题
 * @param overrides - 覆盖配置
 * @returns 合并后的主题
 */
export function mergeTheme(
  base: ThemeConfig,
  overrides: Partial<ThemeConfig>,
): ThemeConfig {
  return {
    ...base,
    ...overrides,
    colors: { ...base.colors, ...overrides.colors },
    sizes: { ...base.sizes, ...overrides.sizes },
    effects: { ...base.effects, ...overrides.effects },
  }
}

/**
 * 创建自定义主题
 * @param name - 主题名称
 * @param baseTheme - 基础主题名称
 * @param customization - 自定义配置
 */
export function createTheme(
  name: string,
  baseTheme: ThemeName | string,
  customization: Partial<Omit<ThemeConfig, 'name'>>,
): ThemeConfig {
  const base = getTheme(baseTheme)
  const theme = mergeTheme(base, {
    ...customization,
    name,
  })
  registerTheme(theme)
  return theme
}
