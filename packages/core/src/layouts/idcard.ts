/**
 * 身份证号键盘布局
 * @module layouts/idcard
 */

import type { KeyboardConfig, KeyDefinition } from '../types'
import { ICON_DELETE, ICON_CLEAR } from '../icons'

/**
 * 创建数字按键
 */
function createNumberKey(num: string): KeyDefinition {
  return {
    id: `idcard-${num}`,
    type: 'char',
    label: num,
    value: num,
    className: 'key-num',
  }
}

/**
 * 身份证号键盘配置
 * 紧凑3x4布局，无空白位置
 */
export const idcardLayout: KeyboardConfig = {
  type: 'idcard',
  name: '身份证键盘',
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
          id: 'idcard-x',
          type: 'char',
          label: 'X',
          value: 'X',
          className: 'key-num',
        },
      ],
    },
    {
      className: 'numpad-row',
      keys: [
        {
          id: 'close',
          type: 'close',
          label: '关闭',
          className: 'key-numpad-fn',
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
    maxLength: 18,
    inputType: 'idcard',
  },
}
