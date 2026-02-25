/**
 * 键盘布局管理
 * @module layouts
 */

import type { KeyboardConfig, KeyboardType } from '../types'
import { qwertyLayout } from './qwerty'
import { integerLayout, numberLayout } from './number'
import { symbolLayout, symbolLayout2 } from './symbol'
import {
  licensePlateAlphanumericLayout,
  licensePlateLayout,
  licensePlateLetterLayout,
  licensePlateProvinceLayout,
  PLATE_LETTERS,
  PROVINCES,
} from './license-plate'
import { idcardLayout } from './idcard'
import { phoneLayout, phoneSimpleLayout } from './phone'
import { amountLayout, amountSimpleLayout } from './amount'
import { bankcardLayout } from './bankcard'
import { verifycodeLayout } from './verifycode'
import { emailLayout, EMAIL_SUFFIXES } from './email'
import { urlLayout } from './url'
import { searchLayout } from './search'

// 导出所有布局
export {
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
  bankcardLayout,
  verifycodeLayout,
  // 输入场景键盘
  emailLayout,
  urlLayout,
  searchLayout,
  EMAIL_SUFFIXES,
}

/**
 * 内置布局映射
 */
const builtinLayouts: Record<string, KeyboardConfig> = {
  'qwerty': qwertyLayout,
  'number': numberLayout,
  'integer': integerLayout,
  'symbol': symbolLayout,
  'symbol-2': symbolLayout2,
  'license-plate': licensePlateLayout,
  'license-plate-province': licensePlateProvinceLayout,
  'license-plate-letter': licensePlateLetterLayout,
  'license-plate-alphanumeric': licensePlateAlphanumericLayout,
  // 场景化键盘
  'idcard': idcardLayout,
  'phone': phoneLayout,
  'phone-simple': phoneSimpleLayout,
  'amount': amountLayout,
  'amount-simple': amountSimpleLayout,
  'bankcard': bankcardLayout,
  'verifycode': verifycodeLayout,
  // 输入场景键盘
  'email': emailLayout,
  'url': urlLayout,
  'search': searchLayout,
}

/**
 * 自定义布局存储
 */
const customLayouts: Record<string, KeyboardConfig> = {}

/**
 * 注册自定义布局
 * @param name - 布局名称
 * @param layout - 布局配置
 */
export function registerLayout(name: string, layout: KeyboardConfig): void {
  if (builtinLayouts[name]) {
    console.warn(`[Keyboard] Cannot override builtin layout "${name}"`)
    return
  }
  customLayouts[name] = layout
}

/**
 * 获取布局配置
 * @param type - 键盘类型或布局名称
 * @returns 布局配置，如果不存在则返回 undefined
 */
export function getLayout(type: KeyboardType | string): KeyboardConfig | undefined {
  return customLayouts[type] || builtinLayouts[type]
}

/**
 * 获取所有可用布局名称
 * @returns 布局名称数组
 */
export function getAvailableLayouts(): string[] {
  return [...Object.keys(builtinLayouts), ...Object.keys(customLayouts)]
}

/**
 * 检查布局是否存在
 * @param name - 布局名称
 * @returns 是否存在
 */
export function hasLayout(name: string): boolean {
  return name in builtinLayouts || name in customLayouts
}

/**
 * 移除自定义布局
 * @param name - 布局名称
 * @returns 是否成功移除
 */
export function unregisterLayout(name: string): boolean {
  if (name in customLayouts) {
    delete customLayouts[name]
    return true
  }
  return false
}

/**
 * 批量注册布局
 * @param layouts - 布局映射对象
 */
export function registerLayouts(layouts: Record<string, KeyboardConfig>): void {
  Object.entries(layouts).forEach(([name, layout]) => {
    registerLayout(name, layout)
  })
}
