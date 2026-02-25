/**
 * 设备检测工具
 * @module utils/device
 */

import type { DeviceType, ViewportInfo } from '../types'

/**
 * 移动设备 UA 正则
 */
const MOBILE_UA_REGEX = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i

/**
 * 触摸设备检测缓存
 */
let cachedIsTouchDevice: boolean | null = null

/**
 * 检测是否为触摸设备
 */
export function isTouchDevice(): boolean {
  if (cachedIsTouchDevice !== null) {
    return cachedIsTouchDevice
  }

  if (typeof window === 'undefined') {
    cachedIsTouchDevice = false
    return false
  }

  cachedIsTouchDevice = (
    'ontouchstart' in window
    || navigator.maxTouchPoints > 0
    // @ts-expect-error - msMaxTouchPoints is IE specific
    || navigator.msMaxTouchPoints > 0
  )

  return cachedIsTouchDevice
}

/**
 * 检测是否为移动设备（基于 UA）
 */
export function isMobileUA(): boolean {
  if (typeof navigator === 'undefined') {
    return false
  }
  return MOBILE_UA_REGEX.test(navigator.userAgent)
}

/**
 * 检测是否为移动设备（综合判断）
 */
export function isMobile(): boolean {
  if (typeof window === 'undefined') {
    return false
  }

  // 优先使用 UA 判断
  if (isMobileUA()) {
    return true
  }

  // 其次使用屏幕宽度判断
  const screenWidth = window.innerWidth || document.documentElement.clientWidth
  if (screenWidth <= 768) {
    return true
  }

  // 最后使用触摸检测
  return isTouchDevice()
}

/**
 * 获取设备类型
 */
export function getDeviceType(): DeviceType {
  return isMobile() ? 'mobile' : 'desktop'
}

/**
 * 获取视口信息
 */
export function getViewportInfo(): ViewportInfo {
  if (typeof window === 'undefined') {
    return {
      width: 0,
      height: 0,
      scrollX: 0,
      scrollY: 0,
      isMobile: false,
    }
  }

  const width = window.innerWidth || document.documentElement.clientWidth
  const height = window.innerHeight || document.documentElement.clientHeight

  // 获取安全区域（iOS 刘海屏等）
  const safeArea = getSafeAreaInsets()

  return {
    width,
    height,
    scrollX: window.scrollX || window.pageXOffset,
    scrollY: window.scrollY || window.pageYOffset,
    isMobile: isMobile(),
    safeArea,
  }
}

/**
 * 获取安全区域边距
 */
export function getSafeAreaInsets(): ViewportInfo['safeArea'] {
  if (typeof window === 'undefined' || typeof CSS === 'undefined' || !CSS.supports) {
    return { top: 0, right: 0, bottom: 0, left: 0 }
  }

  // 检查是否支持 env() 函数
  if (!CSS.supports('padding-top', 'env(safe-area-inset-top)')) {
    return { top: 0, right: 0, bottom: 0, left: 0 }
  }

  // 创建临时元素获取安全区域值
  const div = document.createElement('div')
  div.style.cssText = `
    position: fixed;
    top: env(safe-area-inset-top);
    right: env(safe-area-inset-right);
    bottom: env(safe-area-inset-bottom);
    left: env(safe-area-inset-left);
    pointer-events: none;
    visibility: hidden;
  `
  document.body.appendChild(div)

  const computed = getComputedStyle(div)
  const safeArea = {
    top: Number.parseFloat(computed.top) || 0,
    right: Number.parseFloat(computed.right) || 0,
    bottom: Number.parseFloat(computed.bottom) || 0,
    left: Number.parseFloat(computed.left) || 0,
  }

  document.body.removeChild(div)
  return safeArea
}

/**
 * 检测是否支持震动 API
 */
export function supportsVibrate(): boolean {
  return typeof navigator !== 'undefined' && 'vibrate' in navigator
}

/**
 * 触发震动反馈
 * @param pattern - 震动模式（毫秒）
 */
export function vibrate(pattern: number | number[] = 10): boolean {
  if (supportsVibrate()) {
    return navigator.vibrate(pattern)
  }
  return false
}

/**
 * 监听视口变化
 * @param callback - 回调函数
 * @returns 取消监听函数
 */
export function onViewportChange(callback: (info: ViewportInfo) => void): () => void {
  if (typeof window === 'undefined') {
    return () => {}
  }

  const handler = () => {
    callback(getViewportInfo())
  }

  window.addEventListener('resize', handler)
  window.addEventListener('orientationchange', handler)

  return () => {
    window.removeEventListener('resize', handler)
    window.removeEventListener('orientationchange', handler)
  }
}
