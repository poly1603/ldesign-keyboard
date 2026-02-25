/**
 * 验证码键盘布局
 * @module layouts/verifycode
 */

import type { KeyboardConfig, KeyDefinition } from '../types'
import { ICON_DELETE, ICON_CLEAR } from '../icons'

/**
 * 创建数字按键
 */
function createNumberKey(num: string): KeyDefinition {
  return {
    id: `verify-${num}`,
    type: 'char',
    label: num,
    value: num,
    className: 'key-num',
  }
}

/**
 * 验证码键盘配置 - 4x4布局（与其他数字键盘一致）
 */
export const verifycodeLayout: KeyboardConfig = {
  type: 'verifycode',
  name: '验证码键盘',
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
          id: 'empty',
          type: 'char',
          label: '',
          value: '',
          disabled: true,
          className: 'key-numpad-empty',
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
    maxLength: 6,
    inputType: 'verifycode',
  },
}
