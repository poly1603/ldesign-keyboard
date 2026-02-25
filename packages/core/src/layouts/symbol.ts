/**
 * 符号键盘布局
 * @module layouts/symbol
 */

import type { KeyboardConfig, KeyDefinition } from '../types'

/**
 * 创建符号按键
 */
function createSymbolKey(symbol: string, id?: string): KeyDefinition {
  return {
    id: id || `symbol-${symbol.charCodeAt(0)}`,
    type: 'char',
    label: symbol,
    value: symbol,
  }
}

/**
 * 符号键盘配置
 */
export const symbolLayout: KeyboardConfig = {
  type: 'symbol',
  name: '符号键盘',
  supportShift: false,
  switchable: ['qwerty', 'number'],
  rows: [
    {
      keys: [
        createSymbolKey('1'),
        createSymbolKey('2'),
        createSymbolKey('3'),
        createSymbolKey('4'),
        createSymbolKey('5'),
        createSymbolKey('6'),
        createSymbolKey('7'),
        createSymbolKey('8'),
        createSymbolKey('9'),
        createSymbolKey('0'),
      ],
    },
    {
      keys: [
        createSymbolKey('-'),
        createSymbolKey('/'),
        createSymbolKey(':'),
        createSymbolKey(';'),
        createSymbolKey('('),
        createSymbolKey(')'),
        createSymbolKey('¥', 'yen'),
        createSymbolKey('@'),
        createSymbolKey('"', 'quote'),
      ],
    },
    {
      keys: [
        {
          id: 'switch-symbol-2',
          type: 'tab',
          label: '#+= ',
          width: 1.5,
          className: 'key-switch',
          data: { targetType: 'symbol-2' },
        },
        createSymbolKey('.'),
        createSymbolKey(','),
        createSymbolKey('?'),
        createSymbolKey('!'),
        createSymbolKey('\'', 'apostrophe'),
        {
          id: 'backspace',
          type: 'backspace',
          label: '⌫',
          width: 1.5,
          className: 'key-backspace',
        },
      ],
    },
    {
      keys: [
        {
          id: 'switch-qwerty',
          type: 'tab',
          label: 'ABC',
          width: 1.5,
          className: 'key-switch',
          data: { targetType: 'qwerty' },
        },
        {
          id: 'switch-number',
          type: 'tab',
          label: '123',
          width: 1.25,
          className: 'key-switch',
          data: { targetType: 'number' },
        },
        {
          id: 'space',
          type: 'space',
          label: '空格',
          value: ' ',
          width: 4,
          className: 'key-space',
        },
        {
          id: 'done',
          type: 'done',
          label: '完成',
          width: 2,
          className: 'key-done',
        },
      ],
    },
  ],
}

/**
 * 符号键盘第二页
 */
export const symbolLayout2: KeyboardConfig = {
  type: 'symbol',
  name: '符号键盘2',
  supportShift: false,
  switchable: ['qwerty', 'number'],
  rows: [
    {
      keys: [
        createSymbolKey('['),
        createSymbolKey(']'),
        createSymbolKey('{'),
        createSymbolKey('}'),
        createSymbolKey('#'),
        createSymbolKey('%'),
        createSymbolKey('^'),
        createSymbolKey('*'),
        createSymbolKey('+'),
        createSymbolKey('='),
      ],
    },
    {
      keys: [
        createSymbolKey('_'),
        createSymbolKey('\\'),
        createSymbolKey('|'),
        createSymbolKey('~'),
        createSymbolKey('<'),
        createSymbolKey('>'),
        createSymbolKey('€', 'euro'),
        createSymbolKey('$'),
        createSymbolKey('&'),
      ],
    },
    {
      keys: [
        {
          id: 'switch-symbol-1',
          type: 'tab',
          label: '123',
          width: 1.5,
          className: 'key-switch',
          data: { targetType: 'symbol' },
        },
        createSymbolKey('`', 'backtick'),
        createSymbolKey('·', 'middle-dot'),
        createSymbolKey('…', 'ellipsis'),
        createSymbolKey('°', 'degree'),
        createSymbolKey('•', 'bullet'),
        {
          id: 'backspace',
          type: 'backspace',
          label: '⌫',
          width: 1.5,
          className: 'key-backspace',
        },
      ],
    },
    {
      keys: [
        {
          id: 'switch-qwerty',
          type: 'tab',
          label: 'ABC',
          width: 1.5,
          className: 'key-switch',
          data: { targetType: 'qwerty' },
        },
        {
          id: 'switch-number',
          type: 'tab',
          label: '123',
          width: 1.25,
          className: 'key-switch',
          data: { targetType: 'number' },
        },
        {
          id: 'space',
          type: 'space',
          label: '空格',
          value: ' ',
          width: 4,
          className: 'key-space',
        },
        {
          id: 'done',
          type: 'done',
          label: '完成',
          width: 2,
          className: 'key-done',
        },
      ],
    },
  ],
}
