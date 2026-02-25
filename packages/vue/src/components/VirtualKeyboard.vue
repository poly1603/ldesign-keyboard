<script setup lang="ts">
import { computed, ref } from 'vue'
import type {
  KeyboardConfig,
  KeyboardType,
  KeyDefinition,
} from '@ldesign/keyboard-core'
import { getLayout } from '@ldesign/keyboard-core'
import KeyboardKey from './KeyboardKey.vue'

const props = withDefaults(defineProps<{
  /**
   * 键盘类型
   */
  type?: KeyboardType | string
  /**
   * 是否大写状态
   */
  isUpperCase?: boolean
  /**
   * 自定义布局配置
   */
  layout?: KeyboardConfig
  /**
   * 按键基础宽度
   */
  keyWidth?: number
}>(), {
  type: 'qwerty',
  isUpperCase: false,
  keyWidth: 32,
})

const emit = defineEmits<{
  keypress: [key: KeyDefinition]
  selectOption: [option: string]
}>()

/**
 * 选项面板状态
 */
const showOptionsPanel = ref(false)
const currentOptions = ref<string[]>([])

/**
 * 当前布局配置
 */
const currentLayout = computed(() => {
  if (props.layout) {
    return props.layout
  }
  return getLayout(props.type) ?? null
})

/**
 * 处理按键
 */
const handleKeyPress = (key: KeyDefinition) => {
  emit('keypress', key)
}

/**
 * 显示选项面板
 */
const handleShowOptions = (options: string[]) => {
  currentOptions.value = options
  showOptionsPanel.value = true
}

/**
 * 处理选项选择
 */
const handleSelectOption = (option: string, event: MouseEvent | TouchEvent) => {
  event.preventDefault()
  event.stopPropagation()
  showOptionsPanel.value = false
  emit('selectOption', option)
}

/**
 * 关闭选项面板
 */
const closeOptionsPanel = () => {
  showOptionsPanel.value = false
}

/**
 * 计算每行的总宽度，用于居中对齐
 */
const getRowStyle = (rowIndex: number) => {
  // 可以根据需要添加行样式
  return {}
}
</script>

<template>
  <div class="virtual-keyboard">
    <template v-if="currentLayout">
      <div
        v-for="(row, rowIndex) in currentLayout.rows"
        :key="rowIndex"
        class="virtual-keyboard__row"
        :class="row.className"
        :style="getRowStyle(rowIndex)"
      >
        <KeyboardKey
          v-for="key in row.keys"
          :key="key.id"
          :key-def="key"
          :is-upper-case="isUpperCase"
          :base-width="keyWidth"
          :use-flex="row.className === 'numpad-row'"
          @press="handleKeyPress"
          @show-options="handleShowOptions"
        />
      </div>
    </template>
    <div v-else class="virtual-keyboard__empty">
      键盘布局未找到
    </div>

    <!-- 选项面板 -->
    <Transition name="options-panel">
      <div v-if="showOptionsPanel" class="keyboard-options-panel">
        <div class="keyboard-options-panel__header">
          <span class="keyboard-options-panel__title">选择邮箱后缀</span>
          <button class="keyboard-options-panel__close" type="button" @click="closeOptionsPanel" @touchstart.prevent="closeOptionsPanel">
            ×
          </button>
        </div>
        <div class="keyboard-options-panel__grid">
          <button
            v-for="option in currentOptions"
            :key="option"
            class="keyboard-options-panel__item"
            type="button"
            @mousedown.prevent="(e) => handleSelectOption(option, e)"
            @touchstart.prevent="(e) => handleSelectOption(option, e)"
          >
            {{ option }}
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style>
.virtual-keyboard {
  --key-gap: var(--keyboard-key-gap, 3px); /* 按键间隔，可通过 CSS 变量配置 */
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--key-gap);
  padding: var(--key-gap);
  background-color: var(--keyboard-bg, #d1d5db);
  border-radius: 0;
  user-select: none;
  -webkit-user-select: none;
  overflow: hidden;
}

.virtual-keyboard__row {
  display: flex;
  justify-content: center;
  gap: var(--key-gap);
  width: 100%;
}

/* 数字键盘行样式 - 按钮均匀分布填满宽度 */
.virtual-keyboard__row.numpad-row {
  justify-content: stretch;
}

.virtual-keyboard__row.numpad-row .keyboard-key-wrapper {
  flex: 1;
}

.virtual-keyboard__empty {
  padding: 20px;
  color: #999;
  text-align: center;
}

/* 全屏选项面板 */
.keyboard-options-panel {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  background: var(--keyboard-bg, #d1d5db);
  z-index: 10;
  display: flex;
  flex-direction: column;
  padding: 8px;
}

.keyboard-options-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 8px 12px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
  margin-bottom: 8px;
}

.keyboard-options-panel__title {
  font-size: 14px;
  font-weight: 600;
  color: var(--keyboard-key-color, #333);
}

.keyboard-options-panel__close {
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 50%;
  background: var(--keyboard-fn-key-bg, #d4d6dc);
  color: var(--keyboard-key-color, #666);
  font-size: 18px;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
}

.keyboard-options-panel__close:active {
  background: var(--keyboard-fn-key-active-bg, #b8bac0);
}

.keyboard-options-panel__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}

.keyboard-options-panel__item {
  padding: 14px 8px;
  border: none;
  border-radius: 8px;
  background: var(--keyboard-key-bg, #fff);
  color: var(--keyboard-key-color, #333);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: background-color 0.15s, transform 0.1s;
}

.keyboard-options-panel__item:active {
  background: var(--keyboard-option-active-bg, #e8e8e8);
  transform: scale(0.96);
}

/* 面板动画 */
.options-panel-enter-active,
.options-panel-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.options-panel-enter-from,
.options-panel-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
