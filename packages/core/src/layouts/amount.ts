/**
 * 金额键盘布局
 * @module layouts/amount
 */

import type { KeyboardConfig, KeyDefinition } from '../types'
import { ICON_DELETE, ICON_CLEAR } from '../icons'

/**
 * 创建数字按键
 */
function createNumberKey(num: string): KeyDefinition {
  return {
    id: `amount-${num}`,
    type: 'char',
    label: num,
    value: num,
    className: 'key-num',
  }
}

/**
 * 金额键盘配置 - 紧凑4x4布局
 */
export const amountLayout: KeyboardConfig = {
  type: 'amount',
  name: '金额键盘',
  supportShift: false,
  rows: [
    {
      className: 'numpad-row',
      keys: [
        createNumberKey('1'),
        createNumberKey('2'),
        createNumberKey('3'),
        {
          id: 'backspace',
          type: 'backspace',
          icon: ICON_DELETE,
          label: '',
          className: 'key-numpad-fn',
        },
      ],
    },
    {
      className: 'numpad-row',
      keys: [
        createNumberKey('4'),
        createNumberKey('5'),
        createNumberKey('6'),
        {
          id: 'clear',
          type: 'clear',
          icon: ICON_CLEAR,
          label: '',
          className: 'key-numpad-fn',
        },
      ],
    },
    {
      className: 'numpad-row',
      keys: [
        createNumberKey('7'),
        createNumberKey('8'),
        createNumberKey('9'),
        {
          id: 'double-zero',
          type: 'char',
          label: '00',
          value: '00',
          className: 'key-num',
        },
      ],
    },
    {
      className: 'numpad-row',
      keys: [
        {
          id: 'decimal',
          type: 'char',
          label: '.',
          value: '.',
          className: 'key-num',
        },
        createNumberKey('0'),
        {
          id: 'done',
          type: 'done',
          label: '确定',
          width: 2,
          className: 'key-numpad-done',
        },
      ],
    },
  ],
  data: {
    inputType: 'amount',
    decimalPlaces: 2,
  },
}

/**
 * 简洁金额键盘 - 紧凑4x4布局
 */
export const amountSimpleLayout: KeyboardConfig = {
  type: 'amount-simple',
  name: '金额键盘',
  supportShift: false,
  rows: [
    {
      className: 'numpad-row',
      keys: [
        createNumberKey('1'),
        createNumberKey('2'),
        createNumberKey('3'),
        {
          id: 'backspace',
          type: 'backspace',
          icon: ICON_DELETE,
          label: '',
          className: 'key-numpad-fn',
        },
      ],
    },
    {
      className: 'numpad-row',
      keys: [
        createNumberKey('4'),
        createNumberKey('5'),
        createNumberKey('6'),
        {
          id: 'clear',
          type: 'clear',
          icon: ICON_CLEAR,
          label: '',
          className: 'key-numpad-fn',
        },
      ],
    },
    {
      className: 'numpad-row',
      keys: [
        createNumberKey('7'),
        createNumberKey('8'),
        createNumberKey('9'),
        {
          id: 'close',
          type: 'close',
          label: '关闭',
          className: 'key-numpad-fn',
        },
      ],
    },
    {
      className: 'numpad-row',
      keys: [
        {
          id: 'decimal',
          type: 'char',
          label: '.',
          value: '.',
          className: 'key-num',
        },
        createNumberKey('0'),
        {
          id: 'done',
          type: 'done',
          label: '确定',
          width: 2,
          className: 'key-numpad-done',
        },
      ],
    },
  ],
  data: {
    inputType: 'amount',
    decimalPlaces: 2,
  },
}
