/**
 * 手机号键盘布局
 * @module layouts/phone
 */

import type { KeyboardConfig, KeyDefinition } from '../types'
import { ICON_DELETE, ICON_CLEAR } from '../icons'

/**
 * 创建数字按键
 */
function createNumberKey(num: string): KeyDefinition {
  return {
    id: `phone-${num}`,
    type: 'char',
    label: num,
    value: num,
    className: 'key-num',
  }
}

/**
 * 手机号键盘配置
 * 紧凑4x4布局
 */
export const phoneLayout: KeyboardConfig = {
  type: 'phone',
  name: '手机号键盘',
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
          id: 'phone-plus',
          type: 'char',
          label: '+',
          value: '+',
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
    maxLength: 11,
    inputType: 'phone',
  },
}

/**
 * 简洁版拨号键盘（带 * #）
 */
export const phoneSimpleLayout: KeyboardConfig = {
  type: 'phone-simple',
  name: '拨号键盘',
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
          id: 'phone-hash',
          type: 'char',
          label: '#',
          value: '#',
          className: 'key-num',
        },
      ],
    },
    {
      className: 'numpad-row',
      keys: [
        {
          id: 'phone-star',
          type: 'char',
          label: '*',
          value: '*',
          className: 'key-num',
        },
        createNumberKey('0'),
        {
          id: 'done',
          type: 'done',
          label: '拨打',
          width: 2,
          className: 'key-numpad-done',
        },
      ],
    },
  ],
  data: {
    maxLength: 13,
    inputType: 'phone',
  },
}
