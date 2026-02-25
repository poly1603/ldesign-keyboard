<script setup lang="ts">
import { computed } from 'vue'
import type { KeyDefinition } from '@ldesign/keyboard-core'

const props = defineProps<{
  /**
   * 按键定义
   */
  keyDef: KeyDefinition
  /**
   * 是否大写状态
   */
  isUpperCase?: boolean
  /**
   * 基础宽度（px）
   */
  baseWidth?: number
  /**
   * 是否使用 flex 布局（用于 numpad 等需要均分宽度的键盘）
   */
  useFlex?: boolean
}>()

const emit = defineEmits<{
  press: [key: KeyDefinition]
  showOptions: [options: string[]]
}>()

/**
 * 获取显示文本
 */
const label = computed(() => {
  const keyLabel = props.keyDef.label
  if (typeof keyLabel === 'string') {
    return keyLabel
  }
  return props.isUpperCase ? keyLabel.upper : keyLabel.lower
})

/**
 * 计算按键宽度
 */
const keyWidth = computed(() => {
  // 使用 flex 布局时，不设置固定宽度
  if (props.useFlex) {
    return undefined
  }
  const base = props.baseWidth ?? 32
  const width = props.keyDef.width ?? 1
  return `${base * width + (width - 1) * 4}px`
})

/**
 * 计算按键的 flex 值（用于 numpad 布局）
 */
const keyFlex = computed(() => {
  if (!props.useFlex) {
    return undefined
  }
  // width 属性决定占几份
  return props.keyDef.width ?? 1
})

/**
 * 计算 CSS 类
 */
const keyClass = computed(() => {
  const classes = ['keyboard-key', `keyboard-key--${props.keyDef.type}`]

  if (props.keyDef.className) {
    classes.push(props.keyDef.className)
  }

  if (props.keyDef.disabled) {
    classes.push('keyboard-key--disabled')
  }

  // Shift 键激活状态
  if (props.keyDef.type === 'shift' && props.isUpperCase) {
    classes.push('keyboard-key--active')
  }

  return classes
})

/**
 * 是否有下拉选项
 */
const hasOptions = computed(() => {
  return props.keyDef.options && props.keyDef.options.length > 0
})

/**
 * 是否是纯选项按钮（有options但无value，点击只显示选项面板）
 */
const isOptionsOnly = computed(() => {
  return hasOptions.value && !props.keyDef.value
})

/**
 * 处理按键点击
 */
const handlePress = (event: MouseEvent | TouchEvent) => {
  event.preventDefault()
  event.stopPropagation()

  if (props.keyDef.disabled) {
    return
  }

  // 纯选项按钮：点击直接显示选项面板
  if (isOptionsOnly.value) {
    emit('showOptions', props.keyDef.options!)
    return
  }

  // 正常按键：触发按键事件
  emit('press', props.keyDef)
}

/**
 * 处理下拉箭头点击（显示选项面板）
 */
const handleArrowClick = (event: MouseEvent | TouchEvent) => {
  event.preventDefault()
  event.stopPropagation()

  if (props.keyDef.disabled) {
    return
  }

  if (hasOptions.value) {
    emit('showOptions', props.keyDef.options!)
  }
}
</script>

<template>
  <div class="keyboard-key-wrapper" :style="{ width: keyWidth, flex: keyFlex }">
    <button
      :class="[keyClass, { 'has-options': hasOptions && !isOptionsOnly, 'is-options-only': isOptionsOnly }]"
      :disabled="keyDef.disabled"
      type="button"
      @mousedown.prevent="handlePress"
      @touchstart.prevent="handlePress"
    >
      <!-- SVG 图标支持 -->
      <span v-if="keyDef.icon" class="keyboard-key__icon" v-html="keyDef.icon"></span>
      <span v-else class="keyboard-key__label">{{ label }}</span>
      <!-- 纯选项按钮内嵌下拉箭头 -->
      <span v-if="isOptionsOnly" class="keyboard-key__arrow-inline">▼</span>
    </button>
    <!-- 有value又有options的按钮：单独可点击的下拉箭头 -->
    <span
      v-if="hasOptions && !isOptionsOnly"
      class="keyboard-key__arrow"
      @mousedown.prevent="handleArrowClick"
      @touchstart.prevent="handleArrowClick"
    >▼</span>
  </div>
</template>

<style>
.keyboard-key-wrapper {
  position: relative;
  display: inline-flex;
}

.keyboard-key {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 42px;
  min-width: 32px;
  width: 100%;
  padding: 0 4px;
  border: none;
  border-radius: 6px;
  background-color: var(--keyboard-key-bg, #fff);
  color: var(--keyboard-key-color, #333);
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.1s, transform 0.1s;
}

.keyboard-key.has-options {
  padding-right: 16px;
}

.keyboard-key:active {
  background-color: var(--keyboard-key-active-bg, #e0e0e0);
  transform: scale(0.95);
}

.keyboard-key--disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.keyboard-key--disabled:active {
  transform: none;
  background-color: var(--keyboard-key-bg, #fff);
}

/* 功能键样式 */
.keyboard-key--backspace,
.keyboard-key--shift,
.keyboard-key--tab,
.keyboard-key--clear,
.keyboard-key--close {
  background-color: var(--keyboard-fn-key-bg, #d4d6dc);
  color: var(--keyboard-fn-key-color, #333);
  font-size: 14px;
}

.keyboard-key--backspace:active,
.keyboard-key--shift:active,
.keyboard-key--tab:active,
.keyboard-key--clear:active,
.keyboard-key--close:active {
  background-color: var(--keyboard-fn-key-active-bg, #b8bac0);
}

/* Shift 激活状态 */
.keyboard-key--active {
  background-color: var(--keyboard-key-active-bg, #007aff) !important;
  color: #fff !important;
}

/* 完成/确认键 */
.keyboard-key--done,
.keyboard-key--enter {
  background-color: var(--keyboard-primary-bg, #007aff);
  color: #fff;
  font-size: 14px;
}

.keyboard-key--done:active,
.keyboard-key--enter:active {
  background-color: var(--keyboard-primary-active-bg, #0062cc);
}

/* 空格键 */
.keyboard-key--space {
  background-color: var(--keyboard-key-bg, #fff);
}

.keyboard-key__icon,
.keyboard-key__label {
  pointer-events: none;
}

.keyboard-key__arrow {
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  opacity: 0.5;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  border-radius: 0 6px 6px 0;
}

.keyboard-key__arrow:active {
  background-color: rgba(0, 0, 0, 0.1);
  opacity: 1;
}

/* 纯选项按钮内嵌箭头 */
.keyboard-key__arrow-inline {
  margin-left: 4px;
  font-size: 8px;
  opacity: 0.6;
  pointer-events: none;
}

/* 纯选项按钮样式 */
.keyboard-key.is-options-only {
  font-size: 13px;
  background-color: var(--keyboard-fn-key-bg, #d4d6dc);
}
</style>
