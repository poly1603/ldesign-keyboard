<script setup lang="ts">
import { ref, inject } from 'vue'
import { VirtualKeyboard, KeyboardPopup } from '@ldesign/keyboard-vue'
import { Palette, Zap, Settings, Check } from 'lucide-vue-next'

const currentTheme = inject<any>('currentTheme')

const showKeyboard = ref(false)
const inputValue = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const themes = [
  {
    name: 'miui',
    label: 'MIUI',
    desc: '小米风格 - 纯净简洁',
    color: '#ff6700',
    preview: { bg: '#f5f5f5', key: '#ffffff', text: '#1a1a1a' }
  },
  {
    name: 'ios',
    label: 'iOS',
    desc: 'Apple 风格 - 精致优雅',
    color: '#007aff',
    preview: { bg: '#d1d3d9', key: '#ffffff', text: '#000000' }
  },
  {
    name: 'material',
    label: 'Material',
    desc: 'Google 风格 - 深邂现代',
    color: '#4caf50',
    preview: { bg: '#263238', key: '#37474f', text: '#ffffff' }
  },
  {
    name: 'minimal',
    label: 'Minimal',
    desc: '极简风格 - 轻盈透明',
    color: '#333333',
    preview: { bg: '#fafafa', key: 'transparent', text: '#333333' }
  },
  {
    name: 'dark',
    label: 'Dark',
    desc: '深色模式 - 护眼舒适',
    color: '#0a84ff',
    preview: { bg: '#1c1c1e', key: '#3a3a3c', text: '#ffffff' }
  },
]

const features = [
  { icon: Palette, title: '5 种预设主题', desc: 'MIUI / iOS / Material / Minimal / Dark', color: '#667eea' },
  { icon: Zap, title: '实时切换', desc: 'CSS 变量驱动，无需刷新页面', color: '#f59e0b' },
  { icon: Settings, title: '高度可定制', desc: '支持自定义主题和扩展', color: '#10b981' },
]

const handleFocus = () => {
  showKeyboard.value = true
}
</script>

<template>
  <div class="themes-demo">
    <header class="page-header">
      <h1>主题系统</h1>
      <p>选择你喜欢的主题风格，实时预览效果</p>
    </header>

    <!-- 主题选择器 -->
    <section class="theme-grid">
      <div
        v-for="theme in themes"
        :key="theme.name"
        class="theme-card"
        :class="{ active: currentTheme === theme.name }"
        @click="currentTheme = theme.name"
      >
        <!-- 主题预览 -->
        <div
          class="theme-preview"
          :style="{ background: theme.preview.bg }"
        >
          <div class="preview-keys">
            <div
              v-for="i in 9"
              :key="i"
              class="preview-key"
              :style="{
                background: theme.preview.key,
                color: theme.preview.text,
                borderColor: theme.preview.key === 'transparent' ? '#ddd' : 'transparent'
              }"
            >
              {{ i }}
            </div>
          </div>
        </div>

        <!-- 主题信息 -->
        <div class="theme-info">
          <div class="theme-header">
            <span
              class="theme-dot"
              :style="{ background: theme.color }"
            ></span>
            <span class="theme-name">{{ theme.label }}</span>
            <Check v-if="currentTheme === theme.name" class="theme-check" :size="16" />
          </div>
          <p class="theme-desc">{{ theme.desc }}</p>
        </div>
      </div>
    </section>

    <!-- 实时预览 -->
    <section class="preview-section">
      <h3>实时预览</h3>
      <div class="preview-demo">
        <input
          ref="inputRef"
          v-model="inputValue"
          type="text"
          class="demo-input"
          placeholder="点击输入试试..."
          readonly
          @focus="handleFocus"
        />
      </div>

      <div class="keyboard-preview" :data-theme="currentTheme">
        <VirtualKeyboard type="number" />
      </div>
    </section>

    <!-- 主题特性 -->
    <section class="theme-features">
      <h3>主题特性</h3>
      <div class="feature-list">
        <div v-for="feature in features" :key="feature.title" class="feature-item">
          <div class="feature-icon" :style="{ background: feature.color }">
            <component :is="feature.icon" :size="18" />
          </div>
          <div class="feature-content">
            <h4>{{ feature.title }}</h4>
            <p>{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- 键盘弹出层 -->
    <KeyboardPopup
      v-model="showKeyboard"
      v-model:value="inputValue"
      type="number"
      :target="inputRef"
    />
  </div>
</template>

<style scoped>
.themes-demo {
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

/* 主题网格 */
.theme-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.theme-card {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s ease;
}

.theme-card:hover {
  background: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.12);
}

.theme-card.active {
  border-color: rgba(102, 126, 234, 0.5);
  background: rgba(255, 255, 255, 0.06);
}

/* 主题预览 */
.theme-preview {
  padding: 16px;
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.preview-keys {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 4px;
  width: 100%;
  max-width: 120px;
}

.preview-key {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid transparent;
}

/* 主题信息 */
.theme-info {
  padding: 12px 16px;
  background: rgba(0, 0, 0, 0.2);
}

.theme-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.theme-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.theme-name {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.theme-check {
  margin-left: auto;
  color: #667eea;
}

.theme-desc {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
}

/* 预览区域 */
.preview-section {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
}

.preview-section h3 {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 16px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.preview-demo {
  margin-bottom: 20px;
}

.demo-input {
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

.demo-input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.demo-input:focus {
  border-color: rgba(102, 126, 234, 0.5);
  background: rgba(255, 255, 255, 0.08);
}

.keyboard-preview {
  border-radius: 12px;
  overflow: hidden;
}

/* 主题特性 */
.theme-features {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 24px;
}

.theme-features h3 {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 16px;
  text-align: center;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.feature-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.feature-item {
  display: flex;
  gap: 12px;
  padding: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 12px;
}

.feature-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  color: #fff;
  flex-shrink: 0;
}

.feature-content h4 {
  font-size: 0.875rem;
  color: #fff;
  margin-bottom: 2px;
  font-weight: 600;
}

.feature-content p {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.5);
}

/* 响应式 */
@media (max-width: 768px) {
  .theme-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .feature-list {
    grid-template-columns: 1fr;
  }

  .preview-section,
  .theme-features {
    padding: 20px 16px;
  }
}
</style>
