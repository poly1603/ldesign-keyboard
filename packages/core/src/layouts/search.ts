/**
 * 搜索键盘布局
 * @module layouts/search
 */

import type { KeyboardConfig, KeyDefinition } from '../types'
import { ICON_DELETE, ICON_SHIFT, ICON_VOICE } from '../icons'

/**
 * 创建字符按键（支持大小写）
 */
function createCharKey(char: string): KeyDefinition {
  return {
    id: `search-char-${char.toLowerCase()}`,
    type: 'char',
    label: { lower: char.toLowerCase(), upper: char.toUpperCase() },
    value: { lower: char.toLowerCase(), upper: char.toUpperCase() },
  }
}

export const searchLayout: KeyboardConfig = {
  type: 'search',
  name: '搜索键盘',
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
    // 底部行：切换 + 空格 + 语音 + 搜索
    {
      keys: [
        { id: 'switch-number', type: 'tab', label: '123', width: 1.25, className: 'key-switch', data: { targetType: 'number' } },
        { id: 'switch-symbol', type: 'tab', label: '#+=', width: 1.25, className: 'key-switch', data: { targetType: 'symbol' } },
        { id: 'space', type: 'space', label: '', value: ' ', width: 4, className: 'key-space' },
        { id: 'voice', type: 'custom', icon: ICON_VOICE, label: '', width: 1, className: 'key-voice', data: { action: 'voice' } },
        { id: 'search-done', type: 'done', label: '搜索', width: 2, className: 'key-done' },
      ],
    },
  ],
}
