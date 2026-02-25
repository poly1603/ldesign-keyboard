/**
 * 标点符号键盘布局 (中文)
 * @module layouts/punct
 */

import type { KeyboardConfig, KeyDefinition } from '../types'
import { ICON_DELETE, ICON_CHECK } from '../icons'

function p(label: string, value?: string): KeyDefinition {
  return { id: `punct-${label}`, type: 'char', label, value: value ?? label, className: 'key-num' }
}

export const punctLayout: KeyboardConfig = {
  type: 'punct',
  name: '中文标点',
  supportShift: false,
  switchable: ['qwerty', 'punct-en'],
  rows: [
    {
      className: 'virtual-keyboard__row',
      keys: ['，', '。', '？', '！', '：', '；', '“', '”'].map(s => p(s)),
    },
    {
      className: 'virtual-keyboard__row',
      keys: ['（', '）', '【', '】', '《', '》', '……', '——'].map(s => p(s)),
    },
    {
      className: 'virtual-keyboard__row',
      keys: [
        p('·'),
        p('、'),
        p('「'),
        p('」'),
        p('『'),
        p('』'),
        p('~'),
        { id: 'backspace', type: 'backspace', icon: ICON_DELETE, label: '', className: 'key-numpad-fn' },
      ],
    },
    {
      className: 'virtual-keyboard__row',
      keys: [
        { id: 'switch-punct-en', type: 'tab', label: '英', data: { targetType: 'punct-en' }, className: 'key-numpad-fn' },
        { id: 'switch-qwerty', type: 'tab', label: 'ABC', data: { targetType: 'qwerty' }, className: 'key-numpad-fn' },
        { id: 'space', type: 'space', label: '空格', value: ' ', width: 4, className: 'key-num' },
        { id: 'done', type: 'done', icon: ICON_CHECK, label: '', width: 2, className: 'key-numpad-done' },
      ],
    },
  ],
}
