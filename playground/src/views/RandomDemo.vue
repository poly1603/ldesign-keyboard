<script setup lang="ts">
import { ref, inject, computed, type Component } from 'vue'
import { VirtualKeyboard } from '@ldesign/keyboard-vue'
import {
  createRandomPinLayout,
  createRandomNumberLayout,
  createRandomLetterLayout,
  createRandomMixedLayout,
  type KeyboardConfig,
} from '@ldesign/keyboard-core'
import {
  Lock,
  Hash,
  Type,
  Shuffle,
  RefreshCw,
  CreditCard,
  Landmark,
  ShieldCheck,
} from 'lucide-vue-next'

const currentTheme = inject<any>('currentTheme')

// 随机键盘类型
const randomTypes: { type: string; name: string; icon: Component; desc: string; color: string }[] = [
  { type: 'pin', name: 'PIN 密码', icon: Lock, desc: '4x3 随机数字', color: '#667eea' },
  { type: 'number', name: '随机数字', icon: Hash, desc: '0-9 随机排列', color: '#f59e0b' },
  { type: 'letter', name: '随机字母', icon: Type, desc: 'A-Z 随机排列', color: '#10b981' },
  { type: 'mixed', name: '混合随机', icon: Shuffle, desc: '数字+字母混合', color: '#8b5cf6' },
]

const useCases = [
  { icon: CreditCard, title: '支付密码', desc: '防止密码被偷窥或通过按键位置记忆', color: '#667eea' },
  { icon: Landmark, title: '银行验证', desc: '金融类应用的安全输入需求', color: '#f59e0b' },
  { icon: ShieldCheck, title: '验证码输入', desc: '防止自动化脚本攻击', color: '#10b981' },
]

const selectedType = ref('pin')
const inputValue = ref('')
const refreshKey = ref(0)

// 生成随机布局
const randomLayout = computed<KeyboardConfig>(() => {
  // refreshKey 用于触发重新计算
  const _ = refreshKey.value

  switch (selectedType.value) {
    case 'pin':
      return createRandomPinLayout()
    case 'number':
      return createRandomNumberLayout()
    case 'letter':
      return createRandomLetterLayout()
    case 'mixed':
      return createRandomMixedLayout()
    default:
      return createRandomPinLayout()
  }
})

// 刷新随机布局
const refresh = () => {
  refreshKey.value++
  inputValue.value = ''
}

// 处理按键
const handleKeyPress = (key: any) => {
  if (key.type === 'char' && key.value) {
    inputValue.value += key.value
  } else if (key.type === 'backspace') {
    inputValue.value = inputValue.value.slice(0, -1)
  } else if (key.type === 'clear') {
    inputValue.value = ''
  } else if (key.type === 'done') {
    alert(`输入完成: ${inputValue.value}`)
  }
}

const currentTypeInfo = computed(() => {
  return randomTypes.find(t => t.type === selectedType.value)
})
</script>

<template>
  <div class="random-demo">
    <header class="page-header">
      <h1>随机键盘</h1>
      <p>每次刷新都会生成随机排列的按键，适用于安全输入场景</p>
    </header>

    <!-- 类型选择 -->
    <section class="type-selector">
      <button
        v-for="type in randomTypes"
        :key="type.type"
        class="type-btn"
        :class="{ active: selectedType === type.type }"
        @click="selectedType = type.type; refresh()"
      >
        <div class="type-btn-icon" :style="{ background: type.color }">
          <component :is="type.icon" :size="18" />
        </div>
        <span class="type-btn-name">{{ type.name }}</span>
      </button>
    </section>

    <!-- 演示区域 -->
    <section class="demo-section">
      <div class="demo-header">
        <div class="demo-info">
          <div class="demo-icon" :style="{ background: currentTypeInfo?.color }">
            <component :is="currentTypeInfo?.icon" :size="20" />
          </div>
          <div>
            <h2>{{ currentTypeInfo?.name }}</h2>
            <p>{{ currentTypeInfo?.desc }}</p>
          </div>
        </div>
        <button class="refresh-btn" @click="refresh">
          <RefreshCw :size="16" />
          重新随机
        </button>
      </div>

      <!-- 输入显示 -->
      <div class="input-display">
        <div class="input-dots">
          <span
            v-for="i in 6"
            :key="i"
            class="input-dot"
            :class="{ filled: inputValue.length >= i }"
          ></span>
        </div>
        <div class="input-value">
          {{ inputValue || '请输入...' }}
        </div>
      </div>

      <!-- 随机键盘 -->
      <div class="keyboard-wrapper" :data-theme="currentTheme">
        <VirtualKeyboard
          :key="refreshKey"
          :layout="randomLayout"
          @keypress="handleKeyPress"
        />
      </div>
    </section>

    <!-- 使用场景 -->
    <section class="info-section">
      <h3>使用场景</h3>
      <div class="info-grid">
        <div v-for="item in useCases" :key="item.title" class="info-card">
          <div class="info-icon" :style="{ background: item.color }">
            <component :is="item.icon" :size="18" />
          </div>
          <div class="info-content">
            <h4>{{ item.title }}</h4>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 代码示例 -->
    <section class="code-section">
      <h3>代码示例</h3>
      <div class="code-block">
        <div class="code-header">
          <span class="code-dot red"></span>
          <span class="code-dot yellow"></span>
          <span class="code-dot green"></span>
        </div>
        <pre class="code-body"><code>import { createRandomPinLayout } from '@ldesign/keyboard-core'

// 生成随机 PIN 键盘
const layout = createRandomPinLayout()

// 刷新随机布局
const refresh = () => {
  layout.value = createRandomPinLayout()
}</code></pre>
      </div>
    </section>
  </div>
</template>

<style scoped>
.random-demo {
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

/* 类型选择器 */
.type-selector {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.type-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s;
  color: #fff;
}

.type-btn:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.12);
}

.type-btn.active {
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(102, 126, 234, 0.5);
}

.type-btn-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: #fff;
}

.type-btn-name {
  font-size: 13px;
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
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.demo-info {
  display: flex;
  align-items: center;
  gap: 14px;
}

.demo-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: #fff;
}

.demo-info h2 {
  font-size: 1.1rem;
  color: #fff;
  margin-bottom: 2px;
  font-weight: 600;
}

.demo-info p {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
}

.refresh-btn {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 18px;
  background: rgba(102, 126, 234, 0.2);
  color: #667eea;
  border: 1px solid rgba(102, 126, 234, 0.3);
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.refresh-btn:hover {
  background: rgba(102, 126, 234, 0.3);
}

.refresh-btn:active {
  transform: scale(0.98);
}

/* 输入显示 */
.input-display {
  text-align: center;
  margin-bottom: 20px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
}

.input-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 12px;
}

.input-dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  transition: all 0.2s;
}

.input-dot.filled {
  background: #667eea;
  transform: scale(1.1);
}

.input-value {
  font-size: 20px;
  font-family: 'Fira Code', monospace;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 4px;
}

/* 键盘容器 */
.keyboard-wrapper {
  border-radius: 12px;
  overflow: hidden;
}

/* 使用场景 */
.info-section {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
}

.info-section h3 {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 16px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.info-card {
  display: flex;
  gap: 12px;
  padding: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
}

.info-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #fff;
  flex-shrink: 0;
}

.info-content h4 {
  font-size: 0.875rem;
  color: #fff;
  margin-bottom: 2px;
  font-weight: 600;
}

.info-content p {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
}

/* 代码示例 */
.code-section {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
}

.code-section h3 {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 16px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.code-block {
  background: #1a1a1f;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.code-header {
  display: flex;
  gap: 6px;
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.3);
}

.code-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.code-dot.red { background: #ff5f56; }
.code-dot.yellow { background: #ffbd2e; }
.code-dot.green { background: #27c93f; }

.code-body {
  padding: 16px;
  margin: 0;
  font-family: 'Fira Code', monospace;
  font-size: 13px;
  line-height: 1.7;
  color: #e4e4e7;
  overflow-x: auto;
}

.code-body code {
  font-family: inherit;
}

/* 响应式 */
@media (max-width: 768px) {
  .type-selector {
    grid-template-columns: repeat(2, 1fr);
  }

  .demo-header {
    flex-direction: column;
    gap: 16px;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .demo-section,
  .info-section,
  .code-section {
    padding: 20px 16px;
  }
}
</style>
