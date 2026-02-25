/**
 * 车牌号键盘布局
 * @module layouts/license-plate
 * 省份键盘类似26键布局，点击省份后自动切换到字母数字键盘
 */

import type { KeyboardConfig, KeyDefinition } from '../types'
import { ICON_DELETE } from '../icons'

/**
 * 省份简称列表（按地理区域排列，10列布局）
 */
export const PROVINCES = [
  '京', '津', '沪', '渝', '冀', '豫', '云', '辽', '黑', '湘',
  '皖', '鲁', '新', '苏', '浙', '赣', '鄂', '桂', '甘', '晋',
  '蒙', '陕', '吉', '闽', '贵', '粤', '青', '藏', '川', '宁',
  '琼', '港', '澳',
]

/**
 * 车牌字母（排除 I 和 O，避免与数字混淆）
 */
export const PLATE_LETTERS = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K',
  'L', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V',
  'W', 'X', 'Y', 'Z',
]

/**
 * 创建省份按键（点击后自动切换到字母数字键盘）
 */
function createProvinceKey(province: string): KeyDefinition {
  return {
    id: `province-${province}`,
    type: 'char',
    label: province,
    value: province,
    className: 'key-plate-province',
    data: { switchAfterInput: 'license-plate-alphanumeric' },
  }
}

/**
 * 创建字母按键
 */
function createLetterKey(letter: string): KeyDefinition {
  return {
    id: `letter-${letter}`,
    type: 'char',
    label: letter,
    value: letter,
    className: 'key-plate-letter',
  }
}

/**
 * 创建数字按键
 */
function createNumberKey(num: string): KeyDefinition {
  return {
    id: `num-${num}`,
    type: 'char',
    label: num,
    value: num,
    className: 'key-plate-number',
  }
}

/**
 * 省份键盘配置 - 类似26键布局
 * 10列布局，更紧凑美观
 */
export const licensePlateProvinceLayout: KeyboardConfig = {
  type: 'license-plate-province',
  name: '省份简称',
  supportShift: false,
  rows: [
    {
      className: 'plate-keyboard-row',
      keys: PROVINCES.slice(0, 10).map(createProvinceKey),
    },
    {
      className: 'plate-keyboard-row',
      keys: PROVINCES.slice(10, 20).map(createProvinceKey),
    },
    {
      className: 'plate-keyboard-row',
      keys: PROVINCES.slice(20, 30).map(createProvinceKey),
    },
    {
      className: 'plate-keyboard-row',
      keys: [
        ...PROVINCES.slice(30, 33).map(createProvinceKey),
        {
          id: 'plate-xue',
          type: 'char',
          label: '学',
          value: '学',
          className: 'key-plate-special',
          data: { switchAfterInput: 'license-plate-alphanumeric' },
        },
        {
          id: 'plate-jing',
          type: 'char',
          label: '警',
          value: '警',
          className: 'key-plate-special',
          data: { switchAfterInput: 'license-plate-alphanumeric' },
        },
        {
          id: 'backspace',
          type: 'backspace',
          icon: ICON_DELETE,
          label: '',
          width: 1.5,
          className: 'key-plate-fn',
        },
        {
          id: 'done',
          type: 'done',
          label: '确定',
          width: 2.5,
          className: 'key-plate-done',
        },
      ],
    },
  ],
  data: {
    maxLength: 8,
    inputType: 'license-plate',
  },
}

/**
 * 字母数字键盘配置（车牌第2-8位）
 * 10列布局
 */
export const licensePlateAlphanumericLayout: KeyboardConfig = {
  type: 'license-plate-alphanumeric',
  name: '字母数字',
  supportShift: false,
  rows: [
    {
      className: 'plate-keyboard-row',
      keys: '1234567890'.split('').map(createNumberKey),
    },
    {
      className: 'plate-keyboard-row',
      keys: PLATE_LETTERS.slice(0, 10).map(createLetterKey),
    },
    {
      className: 'plate-keyboard-row',
      keys: [
        ...PLATE_LETTERS.slice(10, 19).map(createLetterKey),
        {
          id: 'backspace',
          type: 'backspace',
          icon: ICON_DELETE,
          label: '',
          className: 'key-plate-fn',
        },
      ],
    },
    {
      className: 'plate-keyboard-row',
      keys: [
        {
          id: 'switch-province',
          type: 'tab',
          label: '省份',
          width: 1.5,
          className: 'key-plate-switch',
          data: { targetType: 'license-plate-province' },
        },
        ...PLATE_LETTERS.slice(19, 24).map(createLetterKey),
        {
          id: 'plate-xue',
          type: 'char',
          label: '学',
          value: '学',
          className: 'key-plate-special',
        },
        {
          id: 'plate-jing',
          type: 'char',
          label: '警',
          value: '警',
          className: 'key-plate-special',
        },
        {
          id: 'done',
          type: 'done',
          label: '确定',
          width: 1.5,
          className: 'key-plate-done',
        },
      ],
    },
  ],
  data: {
    maxLength: 8,
    inputType: 'license-plate',
  },
}

/**
 * 纯字母键盘配置（车牌第2位，只能输入字母）
 * 6列布局，排除 I 和 O
 */
export const licensePlateLetterLayout: KeyboardConfig = {
  type: 'license-plate-letter',
  name: '字母',
  supportShift: false,
  rows: [
    {
      className: 'plate-keyboard-row',
      keys: PLATE_LETTERS.slice(0, 8).map(createLetterKey),
    },
    {
      className: 'plate-keyboard-row',
      keys: PLATE_LETTERS.slice(8, 16).map(createLetterKey),
    },
    {
      className: 'plate-keyboard-row',
      keys: [
        ...PLATE_LETTERS.slice(16, 24).map(createLetterKey),
      ],
    },
    {
      className: 'plate-keyboard-row',
      keys: [
        {
          id: 'switch-province',
          type: 'tab',
          label: '省份',
          width: 2,
          className: 'key-plate-switch',
          data: { targetType: 'license-plate-province' },
        },
        {
          id: 'backspace',
          type: 'backspace',
          icon: ICON_DELETE,
          label: '',
          width: 2,
          className: 'key-plate-fn',
        },
        {
          id: 'done',
          type: 'done',
          label: '确定',
          width: 2,
          className: 'key-plate-done',
        },
      ],
    },
  ],
  data: {
    maxLength: 8,
    inputType: 'license-plate',
  },
}

/**
 * 完整车牌号键盘（自动切换模式）
 * 默认显示省份键盘，点击省份后自动切换到字母数字键盘
 */
export const licensePlateLayout: KeyboardConfig = {
  type: 'license-plate',
  name: '车牌号键盘',
  supportShift: false,
  data: {
    autoSwitch: true,
    maxLength: 8,
    inputType: 'license-plate',
  },
  rows: licensePlateProvinceLayout.rows,
}
