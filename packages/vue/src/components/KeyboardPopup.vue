<script setup lang="ts">
import { computed, ref, watch, Teleport, Transition, onMounted, onBeforeUnmount, nextTick } from 'vue'
import type { KeyboardType, KeyDefinition, KeyboardOptions } from '@ldesign/keyboard-core'
import { isMobile } from '@ldesign/keyboard-core'
import { useKeyboard } from '../composables/useKeyboard'
import { useKeyboardPopup } from '../composables/useKeyboardPopup'
import VirtualKeyboard from './VirtualKeyboard.vue'

const props = withDefaults(defineProps<{
  /**
   * 是否显示 (v-model)
   */
  modelValue?: boolean
  /**
   * 键盘类型
   */
  type?: KeyboardType | string
  /**
   * 绑定的输入值 (v-model:value)
   */
  value?: string
  /**
   * 目标输入框元素
   */
  target?: HTMLInputElement | HTMLTextAreaElement | null
  /**
   * 最大输入长度
   */
  maxLength?: number
  /**
   * 点击外部是否关闭
   */
  closeOnClickOutside?: boolean
  /**
   * 是否启用震动反馈
   */
  enableVibrate?: boolean
  /**
   * 挂载目标
   */
  teleportTo?: string | HTMLElement
}>(), {
  modelValue: false,
  type: 'qwerty',
  value: '',
  target: null,
  closeOnClickOutside: true,
  enableVibrate: true,
  teleportTo: 'body',
})

const emit = defineEmits<{
  'update:modelValue': [visible: boolean]
  'update:value': [value: string]
  'confirm': [value: string]
  'keypress': [key: KeyDefinition]
}>()

// 弹出层 DOM 引用
const popupRef = ref<HTMLElement | null>(null)

// 目标元素引用
const targetRef = computed(() => props.target as HTMLElement | null)

// 是否移动端
const isMobileDevice = ref(isMobile())

// 创建键盘管理器
const keyboard = useKeyboard({
  type: props.type as KeyboardType,
  value: props.value,
  maxLength: props.maxLength || (props.type.startsWith('license-plate') ? 7 : undefined),
  enableVibrate: props.enableVibrate,
})

// 创建弹出层管理
const {
  popupStyles,
  maskStyles,
  placement,
  showMask,
  updatePosition,
  close: closePopup,
} = useKeyboardPopup({
  visible: computed(() => props.modelValue),
  target: targetRef,
  popup: popupRef,
  closeOnClickOutside: props.closeOnClickOutside,
  onClose: () => {
    emit('update:modelValue', false)
  },
})

// 监听键盘类型变化
watch(() => props.type, (newType) => {
  keyboard.switchType(newType as KeyboardType)
  
  // 车牌键盘需要设置默认 maxLength
  if (newType.startsWith('license-plate') && !props.maxLength) {
    keyboard.setMaxLength(7)
  }
})

// 监听外部 value 变化
watch(() => props.value, (newValue) => {
  if (newValue !== keyboard.value.value) {
    keyboard.setValue(newValue)
  }
})

// 监听键盘内部 value 变化
watch(keyboard.value, (newValue) => {
  emit('update:value', newValue)
})

// 监听可见性变化
watch(() => props.modelValue, (visible) => {
  if (visible) {
    isMobileDevice.value = isMobile()
    if (props.target) {
      keyboard.bindInput(props.target)
    }
    keyboard.show(props.target ?? undefined)
    
    nextTick(() => {
      updatePosition()
    })
  } else {
    keyboard.hide()
  }
})

// 监听确认事件
keyboard.on('confirm', ({ value }) => {
  emit('confirm', value)
  emit('update:modelValue', false)
})

/**
 * 处理按键
 */
const handleKeyPress = (key: KeyDefinition) => {
  keyboard.handleKey(key)
  emit('keypress', key)
}

/**
 * 处理下拉选项选择（如邮箱后缀）
 */
const handleSelectOption = (option: string) => {
  let valueToAppend = option
  
  // 智能处理邮箱后缀：如果当前值已以 @ 结尾，而选项以 @ 开头，则去掉选项的 @
  if (option.startsWith('@') && keyboard.value.value.endsWith('@')) {
    valueToAppend = option.slice(1) // 去掉开头的 @
  }
  
  keyboard.appendValue(valueToAppend)
}

/**
 * 处理遮罩点击
 */
const handleMaskClick = () => {
  if (props.closeOnClickOutside) {
    emit('update:modelValue', false)
  }
}

/**
 * 计算弹出层类名
 */
const popupClass = computed(() => {
  return [
    'keyboard-popup',
    `keyboard-popup--${placement.value}`,
    {
      'keyboard-popup--mobile': isMobileDevice.value,
      'keyboard-popup--desktop': !isMobileDevice.value,
    },
  ]
})
</script>

<template>
  <Teleport :to="teleportTo">
    <Transition name="keyboard-mask">
      <div
        v-if="modelValue && showMask"
        class="keyboard-mask"
        :style="maskStyles"
        @click="handleMaskClick"
      />
    </Transition>

    <Transition :name="isMobileDevice ? 'keyboard-slide' : 'keyboard-fade'">
      <div
        v-if="modelValue"
        ref="popupRef"
        :class="popupClass"
        :style="popupStyles"
        @mousedown.prevent
        @touchstart.prevent
      >
        <VirtualKeyboard
          :type="keyboard.type.value"
          :is-upper-case="keyboard.isUpperCase.value"
          @keypress="handleKeyPress"
          @select-option="handleSelectOption"
        />
      </div>
    </Transition>
  </Teleport>
</template>

<style>
.keyboard-popup {
  background-color: var(--keyboard-bg, #d1d5db);
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.keyboard-popup--desktop {
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.keyboard-popup--mobile {
  border-radius: 0;
  padding-bottom: env(safe-area-inset-bottom, 0);
}

.keyboard-popup--bottom-sheet {
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
}

.keyboard-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

/* 遮罩动画 */
.keyboard-mask-enter-active,
.keyboard-mask-leave-active {
  transition: opacity 0.3s ease;
}

.keyboard-mask-enter-from,
.keyboard-mask-leave-to {
  opacity: 0;
}

/* PC 端淡入淡出动画 */
.keyboard-fade-enter-active,
.keyboard-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.keyboard-fade-enter-from,
.keyboard-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* 移动端滑入滑出动画 */
.keyboard-slide-enter-active,
.keyboard-slide-leave-active {
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.keyboard-slide-enter-from,
.keyboard-slide-leave-to {
  transform: translateY(100%);
}
</style>
