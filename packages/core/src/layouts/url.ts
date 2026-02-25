/**
 * URL/链接键盘布局
 * @module layouts/url
 */

import type { KeyboardConfig, KeyDefinition } from '../types'
import { ICON_DELETE, ICON_SHIFT } from '../icons'

/**
 * 创建字符按键（支持大小写）
 */
function createCharKey(char: string): KeyDefinition {
  return {
    id: `url-char-${char.toLowerCase()}`,
    type: 'char',
    label: { lower: char.toLowerCase(), upper: char.toUpperCase() },
    value: { lower: char.toLowerCase(), upper: char.toUpperCase() },
  }
}

/**
 * 创建快捷片段按键
 */
function snippet(label: string, width?: number): KeyDefinition {
  // 生成唯一 ID：用 label 的字符编码
  const idSuffix = label.replace(/[^a-z0-9]/gi, '') || label.split('').map(c => c.charCodeAt(0)).join('')
  return {
    id: `url-snippet-${idSuffix}`,
    type: 'char',
    label,
    value: label,
    width,
    className: 'key-snippet',
  }
}

export const urlLayout: KeyboardConfig = {
  type: 'url',
  name: '网址键盘',
  supportShift: true,
  defaultUpperCase: false,
  switchable: ['symbol', 'number'],
  rows: [
    // QWERTY 第一行
    {
      keys: 'qwertyuiop'.split('').map(createCharKey),
    },
    // QWERTY 第二行
    {
      keys: 'asdfghjkl'.split('').map(createCharKey),
    },
    // QWERTY 第三行 + Shift + 退格
    {
      keys: [
        {
          id: 'shift',
          type: 'shift',
          icon: ICON_SHIFT,
          label: '',
          width: 1.5,
          className: 'key-shift',
        },
        ...'zxcvbnm'.split('').map(createCharKey),
        {
          id: 'backspace',
          type: 'backspace',
          icon: ICON_DELETE,
          label: '',
          width: 1.5,
          className: 'key-backspace',
        },
      ],
    },
    // 底部行：切换 + 符号 + 域名后缀 + 前往
    {
      keys: [
        { id: 'switch-number', type: 'tab', label: '123', width: 1.2, className: 'key-switch', data: { targetType: 'number' } },
        snippet('/', 0.8),
        snippet('.', 0.8),
        snippet('-', 0.8),
        snippet('.com', 1.5),
        snippet('.cn', 1.2),
        { id: 'space', type: 'space', label: '', value: ' ', width: 1.5, className: 'key-space' },
        { id: 'url-go', type: 'done', label: '前往', width: 1.5, className: 'key-done' },
      ],
    },
  ],
}
