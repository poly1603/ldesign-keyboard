/**
 * QWERTY 标准字母键盘布局
 * @module layouts/qwerty
 */

import type { KeyboardConfig, KeyDefinition } from '../types'

/**
 * 创建字符按键
 */
function createCharKey(char: string): KeyDefinition {
  return {
    id: `char-${char.toLowerCase()}`,
    type: 'char',
    label: { lower: char.toLowerCase(), upper: char.toUpperCase() },
    value: { lower: char.toLowerCase(), upper: char.toUpperCase() },
  }
}

/**
 * QWERTY 键盘配置
 */
export const qwertyLayout: KeyboardConfig = {
  type: 'qwerty',
  name: '字母键盘',
  supportShift: true,
  defaultUpperCase: false,
  switchable: ['number', 'symbol'],
  rows: [
    {
      keys: [
        createCharKey('Q'),
        createCharKey('W'),
        createCharKey('E'),
        createCharKey('R'),
        createCharKey('T'),
        createCharKey('Y'),
        createCharKey('U'),
        createCharKey('I'),
        createCharKey('O'),
        createCharKey('P'),
      ],
    },
    {
      keys: [
        createCharKey('A'),
        createCharKey('S'),
        createCharKey('D'),
        createCharKey('F'),
        createCharKey('G'),
        createCharKey('H'),
        createCharKey('J'),
        createCharKey('K'),
        createCharKey('L'),
      ],
    },
    {
      keys: [
        {
          id: 'shift',
          type: 'shift',
          label: '⇧',
          width: 1.5,
          className: 'key-shift',
        },
        createCharKey('Z'),
        createCharKey('X'),
        createCharKey('C'),
        createCharKey('V'),
        createCharKey('B'),
        createCharKey('N'),
        createCharKey('M'),
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
          id: 'switch-number',
          type: 'tab',
          label: '123',
          width: 1.5,
          className: 'key-switch',
          data: { targetType: 'number' },
        },
        {
          id: 'switch-symbol',
          type: 'tab',
          label: '#+=',
          width: 1.25,
          className: 'key-switch',
          data: { targetType: 'symbol' },
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
