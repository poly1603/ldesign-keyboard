<script setup lang="ts">
/**
 * 智能车牌号键盘组件
 * 核心逻辑在 KeyboardManager 中实现自动切换
 * Vue 组件只负责 UI 展示和状态同步
 */
import { computed, watch } from 'vue'
import type { KeyDefinition } from '@ldesign/keyboard-core'
import { useKeyboard } from '../composables/useKeyboard'
import VirtualKeyboard from './VirtualKeyboard.vue'

const props = withDefaults(defineProps<{
  /**
   * 当前车牌号值（双向绑定）
   */
  modelValue?: string
  /**
   * 是否新能源车牌（8位）
   * @default false
   */
  newEnergy?: boolean
}>(), {
  modelValue: '',
  newEnergy: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  done: [value: string]
}>()

/**
 * 最大长度
 */
const maxLength = computed(() => props.newEnergy ? 8 : 7)

/**
 * 使用 KeyboardManager 管理键盘状态
 */
const keyboard = useKeyboard({
  type: 'license-plate-province',
  value: props.modelValue,
  maxLength: maxLength.value,
  enableVibrate: true,
})

// 监听外部 value 变化
watch(() => props.modelValue, (newValue) => {
  if (newValue !== keyboard.value.value) {
    keyboard.setValue(newValue)
  }
})

// 监听键盘内部 value 变化
watch(keyboard.value, (newValue) => {
  emit('update:modelValue', newValue)
})

// 监听 maxLength 变化
watch(maxLength, (newMaxLength) => {
  keyboard.setMaxLength(newMaxLength)
  
  // 如果当前值超过新的最大长度，截断
  if (props.modelValue.length > newMaxLength) {
    const truncated = props.modelValue.slice(0, newMaxLength)
    keyboard.setValue(truncated)
    emit('update:modelValue', truncated)
  }
})

// 监听确认事件
keyboard.on('confirm', ({ value }) => {
  emit('done', value)
})

/**
 * 处理按键
 */
const handleKeyPress = (key: KeyDefinition) => {
  keyboard.handleKey(key)
}

/**
 * 当前位置提示
 */
const positionHint = computed(() => {
  const len = props.modelValue.length
  if (len === 0) return '请选择省份'
  if (len === 1) return '请输入字母'
  if (len < maxLength.value) return `第${len + 1}位`
  return '已完成'
})
</script>

<template>
  <div class="license-plate-keyboard">
    <!-- 输入显示区 -->
    <div class="license-plate-keyboard__display">
      <div class="license-plate-keyboard__value">
        <span
          v-for="(char, index) in modelValue.padEnd(maxLength, ' ').split('')"
          :key="index"
          class="license-plate-keyboard__char"
          :class="{
            'license-plate-keyboard__char--filled': char !== ' ',
            'license-plate-keyboard__char--current': index === modelValue.length,
            'license-plate-keyboard__char--province': index === 0,
            'license-plate-keyboard__char--new-energy': newEnergy && index === 7
          }"
        >
          {{ char === ' ' ? '' : char }}
        </span>
      </div>
      <div class="license-plate-keyboard__hint">{{ positionHint }}</div>
    </div>
    
    <!-- 键盘区 - 由 core 的 KeyboardManager 自动切换布局 -->
    <VirtualKeyboard
      :type="keyboard.type.value"
      :is-upper-case="keyboard.isUpperCase.value"
      @keypress="handleKeyPress"
    />
  </div>
</template>

<style>
.license-plate-keyboard {
  display: flex;
  flex-direction: column;
  background: var(--keyboard-bg, #d1d5db);
}

.license-plate-keyboard__display {
  padding: 12px 16px;
  background: var(--keyboard-display-bg, #f5f5f5);
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.license-plate-keyboard__value {
  display: flex;
  justify-content: center;
  gap: 6px;
  margin-bottom: 6px;
}

.license-plate-keyboard__char {
  width: 36px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 6px;
  font-size: 20px;
  font-weight: 600;
  color: var(--keyboard-key-color, #333);
  transition: border-color 0.2s, background-color 0.2s;
}

.license-plate-keyboard__char--filled {
  border-color: var(--keyboard-primary-bg, #007aff);
  background: rgba(0, 122, 255, 0.05);
}

.license-plate-keyboard__char--current {
  border-color: var(--keyboard-primary-bg, #007aff);
  background: rgba(0, 122, 255, 0.1);
  animation: plate-char-pulse 1s infinite;
}

.license-plate-keyboard__char--province {
  background: rgba(255, 193, 7, 0.1);
}

.license-plate-keyboard__char--province.license-plate-keyboard__char--filled {
  background: rgba(255, 193, 7, 0.15);
  border-color: #ffc107;
}

.license-plate-keyboard__char--new-energy {
  background: rgba(34, 197, 94, 0.1);
}

.license-plate-keyboard__char--new-energy.license-plate-keyboard__char--filled {
  background: rgba(34, 197, 94, 0.15);
  border-color: #22c55e;
}

@keyframes plate-char-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}

.license-plate-keyboard__hint {
  text-align: center;
  font-size: 12px;
  color: #888;
}

/* 车牌键盘专用样式 */
.license-plate-keyboard :deep(.plate-keyboard-row) {
  gap: 2px;
}

.license-plate-keyboard :deep(.key-plate-province),
.license-plate-keyboard :deep(.key-plate-letter),
.license-plate-keyboard :deep(.key-plate-number) {
  min-width: 28px;
  height: 38px;
  font-size: 15px;
}

.license-plate-keyboard :deep(.key-plate-special) {
  background: rgba(255, 193, 7, 0.2);
  color: #b8860b;
}

.license-plate-keyboard :deep(.key-plate-fn) {
  background: var(--keyboard-fn-key-bg, #d4d6dc);
}

.license-plate-keyboard :deep(.key-plate-switch) {
  background: var(--keyboard-fn-key-bg, #d4d6dc);
  font-size: 13px;
}

.license-plate-keyboard :deep(.key-plate-done) {
  background: var(--keyboard-primary-bg, #007aff);
  color: #fff;
  font-size: 13px;
}
</style>
