<script setup lang="ts">
import { ref, computed, inject, type Component } from 'vue'
import { KeyboardPopup, VirtualKeyboard } from '@ldesign/keyboard-vue'
import {
  Type,
  Hash,
  Binary,
  CreditCard,
  Phone,
  DollarSign,
  Car,
  X,
  Wallet,
  Shield,
  Calculator,
  PhoneCall,
  Mail,
  Link,
  Search,
} from 'lucide-vue-next'

const currentTheme = inject<any>('currentTheme')

const showKeyboard = ref(false)
const inputValue = ref('')
const inputRef = ref<HTMLInputElement | null>(null)
const selectedKeyboard = ref('qwerty')

const keyboards: { type: string; name: string; icon: Component; desc: string; color: string }[] = [
  { type: 'qwerty', name: '字母键盘', icon: Type, desc: 'QWERTY 标准布局', color: '#667eea' },
  { type: 'number', name: '数字键盘', icon: Hash, desc: '带小数点和功能键', color: '#764ba2' },
  { type: 'integer', name: '整数键盘', icon: Binary, desc: '纯数字输入', color: '#f59e0b' },
  { type: 'idcard', name: '身份证键盘', icon: CreditCard, desc: '数字 + X', color: '#10b981' },
  { type: 'phone', name: '手机号键盘', icon: Phone, desc: '电话号码输入', color: '#3b82f6' },
  { type: 'phone-simple', name: '简易拨号', icon: PhoneCall, desc: '拨号盘样式', color: '#0ea5e9' },
  { type: 'amount', name: '金额键盘', icon: DollarSign, desc: '数字 + 小数点 + 00', color: '#ef4444' },
  { type: 'amount-simple', name: '简易金额', icon: Wallet, desc: '简化金额输入', color: '#f97316' },
  { type: 'license-plate', name: '车牌键盘', icon: Car, desc: '省份 + 字母数字', color: '#06b6d4' },
  { type: 'bankcard', name: '银行卡键盘', icon: CreditCard, desc: '银行卡号输入', color: '#8b5cf6' },
  { type: 'verifycode', name: '验证码键盘', icon: Shield, desc: '4-6位验证码', color: '#ec4899' },
  { type: 'email', name: '邮箱键盘', icon: Mail, desc: '@ . .com 快捷输入', color: '#14b8a6' },
  { type: 'url', name: '网址键盘', icon: Link, desc: 'http:// www. 快捷输入', color: '#6366f1' },
  { type: 'search', name: '搜索键盘', icon: Search, desc: '带语音按钮槽位', color: '#f43f5e' },
]

const selectKeyboard = (type: string) => {
  selectedKeyboard.value = type
  inputValue.value = ''
}

const handleFocus = () => {
  showKeyboard.value = true
}

const currentKeyboardInfo = computed(() => {
  return keyboards.find(k => k.type === selectedKeyboard.value)
})
</script>

<template>
  <div class="keyboards-demo">
    <header class="page-header">
      <h1>键盘类型</h1>
      <p>点击选择不同的键盘类型，体验各种场景的输入方案</p>
    </header>

    <!-- 键盘选择器 -->
    <section class="keyboard-selector">
      <button
        v-for="keyboard in keyboards"
        :key="keyboard.type"
        class="keyboard-btn"
        :class="{ active: selectedKeyboard === keyboard.type }"
        @click="selectKeyboard(keyboard.type)"
      >
        <div class="keyboard-btn-icon" :style="{ background: keyboard.color }">
          <component :is="keyboard.icon" :size="18" />
        </div>
        <span class="keyboard-btn-name">{{ keyboard.name }}</span>
      </button>
    </section>

    <!-- 演示区域 -->
    <section class="demo-section">
      <div class="demo-header">
        <div class="demo-icon" :style="{ background: currentKeyboardInfo?.color }">
          <component :is="currentKeyboardInfo?.icon" :size="24" />
        </div>
        <div class="demo-info">
          <h2>{{ currentKeyboardInfo?.name }}</h2>
          <p>{{ currentKeyboardInfo?.desc }}</p>
        </div>
      </div>

      <div class="demo-input-wrap">
        <input
          ref="inputRef"
          v-model="inputValue"
          type="text"
          class="demo-input"
          :placeholder="`使用 ${currentKeyboardInfo?.name} 输入...`"
          readonly
          @focus="handleFocus"
        />
        <button v-if="inputValue" class="clear-btn" @click="inputValue = ''">
          <X :size="16" />
        </button>
      </div>

      <div v-if="inputValue" class="demo-result">
        输入结果: <code>{{ inputValue }}</code>
      </div>
    </section>

    <!-- 键盘预览 -->
    <section class="preview-section">
      <h3>键盘预览</h3>
      <div class="preview-wrapper" :data-theme="currentTheme">
        <VirtualKeyboard :type="selectedKeyboard" />
      </div>
    </section>

    <!-- 键盘弹出层 -->
    <KeyboardPopup
      v-model="showKeyboard"
      v-model:value="inputValue"
      :type="selectedKeyboard"
      :target="inputRef"
    />
  </div>
</template>

<style scoped>
.keyboards-demo {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* 页面头部 */
.page-header {
  text-align: center;
  padding: 10px 0 20px;
}

.page-header h1 {
  font-size: 1.75rem;
  color: #fff;
  margin-bottom: 8px;
  font-weight: 600;
}

.page-header p {
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
}

/* 键盘选择器 */
.keyboard-selector {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.keyboard-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 16px 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  color: #fff;
}

.keyboard-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.12);
}

.keyboard-btn.active {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(102, 126, 234, 0.5);
}

.keyboard-btn-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: #fff;
}

.keyboard-btn-name {
  font-size: 12px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.8);
}

/* 演示区域 */
.demo-section {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
}

.demo-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.demo-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: #fff;
}

.demo-info h2 {
  font-size: 1.25rem;
  color: #fff;
  margin-bottom: 4px;
  font-weight: 600;
}

.demo-info p {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
}

.demo-input-wrap {
  position: relative;
}

.demo-input {
  width: 100%;
  padding: 14px 48px 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  transition: all 0.2s;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.demo-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.demo-input:focus {
  border-color: rgba(102, 126, 234, 0.5);
  background: rgba(255, 255, 255, 0.08);
}

.clear-btn {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 28px;
  height: 28px;
  border: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.clear-btn:hover {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
}

.demo-result {
  margin-top: 16px;
  padding: 12px 16px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.demo-result code {
  display: inline-block;
  margin-left: 8px;
  padding: 2px 8px;
  background: rgba(102, 126, 234, 0.2);
  color: #667eea;
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
  font-size: 13px;
}

/* 预览区域 */
.preview-section {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 20px;
}

.preview-section h3 {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 16px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.preview-wrapper {
  border-radius: 12px;
  overflow: hidden;
}

/* 响应式 */
@media (max-width: 768px) {
  .keyboard-selector {
    grid-template-columns: repeat(2, 1fr);
  }

  .demo-section {
    padding: 20px 16px;
  }

  .demo-info h2 {
    font-size: 1.1rem;
  }
}
</style>
