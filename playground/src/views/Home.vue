<script setup lang="ts">
import { ref, inject } from 'vue'
import { KeyboardPopup } from '@ldesign/keyboard-vue'
import {
  Keyboard,
  Palette,
  Shuffle,
  Smartphone,
  Code2,
  Zap,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-vue-next'

const currentTheme = inject<any>('currentTheme')

const showKeyboard = ref(false)
const inputValue = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const handleFocus = () => {
  showKeyboard.value = true
}

const features = [
  { icon: Keyboard, title: '多种键盘', desc: '字母、数字、车牌、身份证、手机号、金额等', color: '#667eea' },
  { icon: Palette, title: '主题系统', desc: 'MIUI / iOS / Material / Dark 多种风格', color: '#764ba2' },
  { icon: Shuffle, title: '随机键盘', desc: '支持随机数字、字母排列，用于安全输入', color: '#f59e0b' },
  { icon: Smartphone, title: '响应式', desc: 'PC 弹出框 / 移动端底部滑出，自动适配', color: '#10b981' },
  { icon: Code2, title: 'TypeScript', desc: '完整的类型定义，开发体验一流', color: '#3b82f6' },
  { icon: Zap, title: '轻量灵活', desc: '核心与框架分离，按需引入', color: '#ef4444' },
]

const demoCards = [
  { path: '/keyboards', title: '键盘演示', desc: '查看所有支持的键盘类型', icon: Keyboard, gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { path: '/themes', title: '主题切换', desc: '体验不同的主题风格', icon: Palette, gradient: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
  { path: '/random', title: '随机键盘', desc: '安全输入场景演示', icon: Shuffle, gradient: 'linear-gradient(135deg, #10b981, #059669)' },
]
</script>

<template>
  <div class="home">
    <!-- Hero 区域 -->
    <header class="hero">
      <div class="hero-badge">
        <Sparkles :size="14" />
        <span>Vue 3 虚拟键盘组件库</span>
      </div>
      <h1 class="hero-title">轻量级虚拟键盘</h1>
      <p class="hero-desc">支持多种布局、主题定制、随机键盘，完美适配 PC 和移动端</p>
      <div class="hero-tags">
        <span class="hero-tag">
          <Sparkles :size="14" />
          零依赖
        </span>
        <span class="hero-tag">
          <Layers :size="14" />
          插件化
        </span>
        <span class="hero-tag">
          <Code2 :size="14" />
          TypeScript
        </span>
      </div>
    </header>

    <!-- 快速体验 -->
    <section class="try-section">
      <div class="try-card">
        <div class="try-card-header">
          <span class="try-label">快速体验</span>
        </div>
        <input
          ref="inputRef"
          v-model="inputValue"
          type="text"
          class="try-input"
          placeholder="点击这里试试..."
          readonly
          @focus="handleFocus"
        />
        <div v-if="inputValue" class="try-result">
          输入: <code>{{ inputValue }}</code>
        </div>
      </div>
    </section>

    <!-- Demo 卡片 -->
    <section class="demo-cards">
      <router-link
        v-for="card in demoCards"
        :key="card.path"
        :to="card.path"
        class="demo-card"
      >
        <div class="demo-card-header">
          <div class="demo-card-icon" :style="{ background: card.gradient }">
            <component :is="card.icon" :size="24" />
          </div>
          <ArrowRight class="demo-card-arrow" :size="20" />
        </div>
        <h2>{{ card.title }}</h2>
        <p>{{ card.desc }}</p>
      </router-link>
    </section>

    <!-- 功能特性 -->
    <section class="features-section">
      <h2 class="section-title">核心特性</h2>
      <div class="features-grid">
        <div v-for="feature in features" :key="feature.title" class="feature-item">
          <div class="feature-icon" :style="{ background: feature.color }">
            <component :is="feature.icon" :size="20" />
          </div>
          <div class="feature-content">
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 快速开始 -->
    <section class="install-section">
      <h2 class="section-title">快速开始</h2>
      <div class="code-blocks">
        <div class="code-block">
          <div class="code-header">
            <span class="code-dot red"></span>
            <span class="code-dot yellow"></span>
            <span class="code-dot green"></span>
            <span class="code-label">安装</span>
          </div>
          <pre class="code-body"><code>pnpm add @ldesign/keyboard-vue</code></pre>
        </div>
        <div class="code-block">
          <div class="code-header">
            <span class="code-dot red"></span>
            <span class="code-dot yellow"></span>
            <span class="code-dot green"></span>
            <span class="code-label">使用</span>
          </div>
          <pre class="code-body"><code>import '@ldesign/keyboard-vue/styles'
import { KeyboardPopup } from '@ldesign/keyboard-vue'</code></pre>
        </div>
      </div>
    </section>

    <!-- 键盘弹出层 -->
    <KeyboardPopup
      v-model="showKeyboard"
      v-model:value="inputValue"
      type="qwerty"
      :target="inputRef"
    />
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

/* ====================
   Hero 区域
   ==================== */
.hero {
  text-align: center;
  padding: 20px 0 40px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 24px;
}

.hero-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 16px;
  letter-spacing: -0.5px;
}

.hero-desc {
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.6);
  max-width: 480px;
  margin: 0 auto 20px;
  line-height: 1.6;
}

.hero-tags {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
}

.hero-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
}

/* ====================
   快速体验
   ==================== */
.try-section {
  max-width: 480px;
  margin: 0 auto;
  width: 100%;
}

.try-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 20px;
}

.try-card-header {
  margin-bottom: 16px;
}

.try-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.try-input {
  width: 100%;
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  font-size: 16px;
  outline: none;
  transition: all 0.2s;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.try-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.try-input:focus {
  border-color: rgba(102, 126, 234, 0.5);
  background: rgba(255, 255, 255, 0.08);
}

.try-result {
  margin-top: 12px;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  font-size: 14px;
  color: rgba(255, 255, 255, 0.6);
}

.try-result code {
  color: #667eea;
  padding: 2px 6px;
  background: rgba(102, 126, 234, 0.15);
  border-radius: 4px;
  font-family: 'Fira Code', monospace;
}

/* ====================
   Demo 卡片
   ==================== */
.demo-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
}

.demo-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 20px;
  text-decoration: none;
  color: #fff;
  transition: all 0.25s ease;
}

.demo-card:hover {
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.12);
  transform: translateY(-4px);
}

.demo-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.demo-card-icon {
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: #fff;
}

.demo-card-arrow {
  color: rgba(255, 255, 255, 0.3);
  transition: all 0.2s;
}

.demo-card:hover .demo-card-arrow {
  color: rgba(255, 255, 255, 0.7);
  transform: translateX(4px);
}

.demo-card h2 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 6px;
}

.demo-card p {
  font-size: 0.875rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.5;
}

/* ====================
   功能特性
   ==================== */
.section-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 20px;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.feature-item {
  display: flex;
  gap: 14px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
}

.feature-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  color: #fff;
  flex-shrink: 0;
}

.feature-content h3 {
  font-size: 0.95rem;
  font-weight: 600;
  color: #fff;
  margin-bottom: 4px;
}

.feature-content p {
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.5;
}

/* ====================
   快速开始
   ==================== */
.code-blocks {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
}

.code-block {
  background: #1a1a1f;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.06);
}

.code-header {
  display: flex;
  align-items: center;
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

.code-label {
  margin-left: auto;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
}

.code-body {
  padding: 16px;
  margin: 0;
  font-family: 'Fira Code', 'JetBrains Mono', monospace;
  font-size: 13px;
  line-height: 1.7;
  color: #e4e4e7;
  overflow-x: auto;
}

.code-body code {
  font-family: inherit;
}

/* ====================
   响应式
   ==================== */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2rem;
  }

  .demo-cards {
    grid-template-columns: 1fr;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .code-blocks {
    grid-template-columns: 1fr;
  }
}
</style>
