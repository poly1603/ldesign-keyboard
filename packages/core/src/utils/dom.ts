/**
 * DOM 操作工具
 * @module utils/dom
 */

import type { BoundingRect, Position } from '../types'

/**
 * 获取元素的边界矩形
 */
export function getBoundingRect(element: HTMLElement): BoundingRect {
  const rect = element.getBoundingClientRect()
  return {
    x: rect.left,
    y: rect.top,
    width: rect.width,
    height: rect.height,
  }
}

/**
 * 获取元素相对于文档的位置
 */
export function getElementOffset(element: HTMLElement): Position {
  const rect = element.getBoundingClientRect()
  const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  return {
    x: rect.left + scrollLeft,
    y: rect.top + scrollTop,
  }
}

/**
 * 检查元素是否在视口内
 */
export function isElementInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0
    && rect.left >= 0
    && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    && rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * 检查点击是否在元素外部
 */
export function isClickOutside(event: MouseEvent | TouchEvent, element: HTMLElement): boolean {
  const target = event.target as Node
  return !element.contains(target)
}

/**
 * 阻止元素默认事件（用于防止输入框获取焦点）
 */
export function preventDefaultAndStopPropagation(event: Event): void {
  event.preventDefault()
  event.stopPropagation()
}

/**
 * 添加点击外部监听
 */
export function onClickOutside(
  element: HTMLElement,
  callback: (event: MouseEvent | TouchEvent) => void,
): () => void {
  const handler = (event: MouseEvent | TouchEvent) => {
    if (isClickOutside(event, element)) {
      callback(event)
    }
  }

  document.addEventListener('mousedown', handler)
  document.addEventListener('touchstart', handler)

  return () => {
    document.removeEventListener('mousedown', handler)
    document.removeEventListener('touchstart', handler)
  }
}

/**
 * 滚动元素到可视区域
 */
export function scrollIntoViewIfNeeded(element: HTMLElement, container?: HTMLElement): void {
  if (!container) {
    element.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    return
  }

  const elementRect = element.getBoundingClientRect()
  const containerRect = container.getBoundingClientRect()

  if (elementRect.bottom > containerRect.bottom) {
    container.scrollTop += elementRect.bottom - containerRect.bottom
  }
  else if (elementRect.top < containerRect.top) {
    container.scrollTop -= containerRect.top - elementRect.top
  }
}

/**
 * 获取输入框的光标位置
 */
export function getInputCursorPosition(input: HTMLInputElement | HTMLTextAreaElement): number {
  return input.selectionStart ?? input.value.length
}

/**
 * 设置输入框的光标位置
 */
export function setInputCursorPosition(
  input: HTMLInputElement | HTMLTextAreaElement,
  position: number,
): void {
  input.setSelectionRange(position, position)
}

/**
 * 在输入框当前光标位置插入文本
 */
export function insertTextAtCursor(
  input: HTMLInputElement | HTMLTextAreaElement,
  text: string,
  maxLength?: number,
): { value: string; cursorPosition: number } {
  const start = input.selectionStart ?? input.value.length
  const end = input.selectionEnd ?? input.value.length
  const currentValue = input.value

  let newValue = currentValue.substring(0, start) + text + currentValue.substring(end)

  // 检查最大长度
  if (maxLength !== undefined && newValue.length > maxLength) {
    const allowedLength = maxLength - (currentValue.length - (end - start))
    if (allowedLength <= 0) {
      return { value: currentValue, cursorPosition: start }
    }
    newValue = currentValue.substring(0, start) + text.substring(0, allowedLength) + currentValue.substring(end)
  }

  const newCursorPosition = start + text.length

  return {
    value: newValue,
    cursorPosition: Math.min(newCursorPosition, newValue.length),
  }
}

/**
 * 删除输入框光标前的字符
 */
export function deleteCharBeforeCursor(
  input: HTMLInputElement | HTMLTextAreaElement,
): { value: string; deletedChar: string; cursorPosition: number } {
  const start = input.selectionStart ?? input.value.length
  const end = input.selectionEnd ?? input.value.length
  const currentValue = input.value

  // 如果有选中内容，删除选中内容
  if (start !== end) {
    const deletedChar = currentValue.substring(start, end)
    const newValue = currentValue.substring(0, start) + currentValue.substring(end)
    return {
      value: newValue,
      deletedChar,
      cursorPosition: start,
    }
  }

  // 没有选中内容，删除光标前一个字符
  if (start === 0) {
    return {
      value: currentValue,
      deletedChar: '',
      cursorPosition: 0,
    }
  }

  const deletedChar = currentValue.charAt(start - 1)
  const newValue = currentValue.substring(0, start - 1) + currentValue.substring(start)

  return {
    value: newValue,
    deletedChar,
    cursorPosition: start - 1,
  }
}

/**
 * 创建 DOM 元素
 */
export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  attrs?: Record<string, string>,
  children?: (HTMLElement | string)[],
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag)

  if (attrs) {
    Object.entries(attrs).forEach(([key, value]) => {
      element.setAttribute(key, value)
    })
  }

  if (children) {
    children.forEach((child) => {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child))
      }
      else {
        element.appendChild(child)
      }
    })
  }

  return element
}

/**
 * 添加/移除 CSS 类
 */
export function toggleClass(element: HTMLElement, className: string, force?: boolean): void {
  element.classList.toggle(className, force)
}

/**
 * 设置 CSS 样式
 */
export function setStyles(element: HTMLElement, styles: Partial<CSSStyleDeclaration>): void {
  Object.assign(element.style, styles)
}
