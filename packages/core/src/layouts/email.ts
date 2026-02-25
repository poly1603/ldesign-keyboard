/**
 * 邮箱键盘布局
 * @module layouts/email
 */

import type { KeyboardConfig, KeyDefinition } from '../types'
import { ICON_DELETE, ICON_SHIFT } from '../icons'

/**
 * 创建字符按键（支持大小写）
 */
function createCharKey(char: string): KeyDefinition {
  return {
    id: `email-char-${char.toLowerCase()}`,
    type: 'char',
    label: { lower: char.toLowerCase(), upper: char.toUpperCase() },
    value: { lower: char.toLowerCase(), upper: char.toUpperCase() },
  }
}

/**
 * 创建快捷片段按键
 */
function snippet(label: string, id?: string): KeyDefinition {
  return {
    id: id || `email-snippet-${label.replace(/[^a-z0-9]/gi, '')}`,
    type: 'char',
    label,
    value: label,
    className: 'key-snippet',
  }
}

/**
 * 常见邮箱后缀列表
 */
export const EMAIL_SUFFIXES = [
  '@qq.com',
  '@163.com',
  '@126.com',
  '@gmail.com',
  '@outlook.com',
  '@hotmail.com',
  '@sina.com',
  '@sohu.com',
  '@icloud.com',
  '@foxmail.com',
  '@yeah.net',
  '@139.com',
]

export const emailLayout: KeyboardConfig = {
  type: 'email',
  name: '邮箱键盘',
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
    // 底部行：切换 + @ + 常用邮箱 + 符号 + 空格 + 完成
    {
      keys: [
        { id: 'switch-number', type: 'tab', label: '123', width: 1.25, className: 'key-switch', data: { targetType: 'number' } },
        {
          id: 'email-at',
          type: 'char',
          label: '@',
          value: '@',
          className: 'key-at',
        },
        {
          id: 'email-suffix',
          type: 'char',
          label: '.com',
          value: '',
          width: 1.5,
          className: 'key-suffix',
          options: EMAIL_SUFFIXES,
        },
        snippet('.', 'email-dot'),
        snippet('-', 'email-dash'),
        snippet('_', 'email-underscore'),
        { id: 'space', type: 'space', label: '', value: ' ', width: 2, className: 'key-space' },
        { id: 'email-done', type: 'done', label: '确定', width: 1.5, className: 'key-done' },
      ],
    },
  ],
}
