/**
 * 随机工具函数
 * @module utils/random
 */

import type { KeyboardConfig, KeyboardRow, KeyDefinition } from '../types'

/**
 * Fisher-Yates 洗牌算法
 * @param array - 要洗牌的数组
 * @returns 洗牌后的新数组
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * 生成随机数字数组 (0-9)
 */
export function getRandomNumbers(): string[] {
  return shuffleArray(['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'])
}

/**
 * 生成随机字母数组 (A-Z)
 */
export function getRandomLetters(): string[] {
  const letters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i),
  )
  return shuffleArray(letters)
}

/**
 * 生成随机数字+字母数组
 */
export function getRandomAlphanumeric(): string[] {
  const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
  const letters = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i),
  )
  return shuffleArray([...numbers, ...letters])
}

/**
 * 创建字符按键
 */
function createCharKey(char: string, index: number): KeyDefinition {
  return {
    id: `random-${char}-${index}`,
    type: 'char',
    label: char,
    value: char,
    className: 'key-random',
  }
}

/**
 * 将字符数组分成行
 */
function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const chunks: T[][] = []
  for (let i = 0; i < array.length; i += chunkSize) {
    chunks.push(array.slice(i, i + chunkSize))
  }
  return chunks
}

/**
 * 生成随机数字键盘布局
 * @param options - 配置选项
 */
export function createRandomNumberLayout(options?: {
  /** 每行按键数 */
  keysPerRow?: number
  /** 是否包含退格键 */
  includeBackspace?: boolean
  /** 是否包含完成键 */
  includeDone?: boolean
  /** 是否包含清空键 */
  includeClear?: boolean
}): KeyboardConfig {
  const {
    keysPerRow = 3,
    includeBackspace = true,
    includeDone = true,
    includeClear = false,
  } = options || {}

  const randomNumbers = getRandomNumbers()
  const numberKeys = randomNumbers.map((n, i) => createCharKey(n, i))
  const chunks = chunkArray(numberKeys, keysPerRow)

  const rows: KeyboardRow[] = chunks.map((keys, index) => ({
    className: 'random-keyboard-row',
    keys,
  }))

  // 添加功能键行
  const fnKeys: KeyDefinition[] = []

  if (includeClear) {
    fnKeys.push({
      id: 'clear',
      type: 'clear',
      label: '清空',
      className: 'key-clear key-fn',
    })
  }

  if (includeBackspace) {
    fnKeys.push({
      id: 'backspace',
      type: 'backspace',
      label: '⌫',
      className: 'key-backspace key-fn',
    })
  }

  if (includeDone) {
    fnKeys.push({
      id: 'done',
      type: 'done',
      label: '确定',
      className: 'key-done key-fn',
    })
  }

  if (fnKeys.length > 0) {
    rows.push({
      className: 'random-keyboard-row random-keyboard-fn',
      keys: fnKeys,
    })
  }

  return {
    type: 'custom',
    name: '随机数字键盘',
    supportShift: false,
    rows,
    data: {
      isRandom: true,
      randomType: 'number',
    },
  }
}

/**
 * 生成4x3随机数字键盘（密码输入常用）
 */
export function createRandomPinLayout(options?: {
  /** 是否包含退格键 */
  includeBackspace?: boolean
  /** 是否包含完成键 */
  includeDone?: boolean
}): KeyboardConfig {
  const { includeBackspace = true, includeDone = true } = options || {}

  const randomNumbers = getRandomNumbers()

  // 前9个数字 (3x3)
  const rows: KeyboardRow[] = [
    {
      className: 'pin-keyboard-row',
      keys: randomNumbers.slice(0, 3).map((n, i) => createCharKey(n, i)),
    },
    {
      className: 'pin-keyboard-row',
      keys: randomNumbers.slice(3, 6).map((n, i) => createCharKey(n, i + 3)),
    },
    {
      className: 'pin-keyboard-row',
      keys: randomNumbers.slice(6, 9).map((n, i) => createCharKey(n, i + 6)),
    },
  ]

  // 最后一行：功能键 + 0 + 功能键
  const lastRow: KeyDefinition[] = []

  if (includeBackspace) {
    lastRow.push({
      id: 'backspace',
      type: 'backspace',
      label: '⌫',
      className: 'key-backspace key-fn',
    })
  } else {
    lastRow.push({
      id: 'empty-1',
      type: 'char',
      label: '',
      value: '',
      disabled: true,
      className: 'key-placeholder',
    })
  }

  lastRow.push(createCharKey(randomNumbers[9], 9))

  if (includeDone) {
    lastRow.push({
      id: 'done',
      type: 'done',
      label: '确定',
      className: 'key-done key-fn',
    })
  } else {
    lastRow.push({
      id: 'empty-2',
      type: 'char',
      label: '',
      value: '',
      disabled: true,
      className: 'key-placeholder',
    })
  }

  rows.push({
    className: 'pin-keyboard-row',
    keys: lastRow,
  })

  return {
    type: 'custom',
    name: '随机PIN键盘',
    supportShift: false,
    rows,
    data: {
      isRandom: true,
      randomType: 'pin',
    },
  }
}

/**
 * 生成随机字母键盘布局
 */
export function createRandomLetterLayout(options?: {
  /** 是否大写 */
  uppercase?: boolean
  /** 每行按键数 */
  keysPerRow?: number
}): KeyboardConfig {
  const { uppercase = true, keysPerRow = 7 } = options || {}

  let randomLetters = getRandomLetters()
  if (!uppercase) {
    randomLetters = randomLetters.map((l) => l.toLowerCase())
  }

  const letterKeys = randomLetters.map((l, i) => createCharKey(l, i))
  const chunks = chunkArray(letterKeys, keysPerRow)

  const rows: KeyboardRow[] = chunks.map((keys) => ({
    className: 'random-keyboard-row',
    keys,
  }))

  // 添加功能键
  rows.push({
    className: 'random-keyboard-row random-keyboard-fn',
    keys: [
      {
        id: 'clear',
        type: 'clear',
        label: '清空',
        className: 'key-clear key-fn',
      },
      {
        id: 'backspace',
        type: 'backspace',
        label: '⌫',
        className: 'key-backspace key-fn',
      },
      {
        id: 'done',
        type: 'done',
        label: '确定',
        className: 'key-done key-fn',
      },
    ],
  })

  return {
    type: 'custom',
    name: '随机字母键盘',
    supportShift: false,
    rows,
    data: {
      isRandom: true,
      randomType: 'letter',
    },
  }
}

/**
 * 生成混合随机键盘（数字+字母）
 */
export function createRandomMixedLayout(options?: {
  /** 每行按键数 */
  keysPerRow?: number
}): KeyboardConfig {
  const { keysPerRow = 6 } = options || {}

  const randomChars = getRandomAlphanumeric()
  const charKeys = randomChars.map((c, i) => createCharKey(c, i))
  const chunks = chunkArray(charKeys, keysPerRow)

  const rows: KeyboardRow[] = chunks.map((keys) => ({
    className: 'random-keyboard-row',
    keys,
  }))

  // 添加功能键
  rows.push({
    className: 'random-keyboard-row random-keyboard-fn',
    keys: [
      {
        id: 'clear',
        type: 'clear',
        label: '清空',
        width: 1.5,
        className: 'key-clear key-fn',
      },
      {
        id: 'backspace',
        type: 'backspace',
        label: '⌫',
        width: 1.5,
        className: 'key-backspace key-fn',
      },
      {
        id: 'done',
        type: 'done',
        label: '确定',
        width: 2,
        className: 'key-done key-fn',
      },
    ],
  })

  return {
    type: 'custom',
    name: '随机混合键盘',
    supportShift: false,
    rows,
    data: {
      isRandom: true,
      randomType: 'mixed',
    },
  }
}

/**
 * 刷新随机键盘布局
 * @param layout - 现有布局
 * @returns 新的随机布局
 */
export function refreshRandomLayout(layout: KeyboardConfig): KeyboardConfig {
  const randomType = layout.data?.randomType as string | undefined

  switch (randomType) {
    case 'number':
      return createRandomNumberLayout()
    case 'pin':
      return createRandomPinLayout()
    case 'letter':
      return createRandomLetterLayout()
    case 'mixed':
      return createRandomMixedLayout()
    default:
      return layout
  }
}
