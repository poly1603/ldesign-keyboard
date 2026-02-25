<script setup lang="ts">
import { ref, provide } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import { Keyboard, Home, Palette, Shuffle, Github } from 'lucide-vue-next'

// 全局主题状态
const currentTheme = ref('miui')
provide('currentTheme', currentTheme)

const themes = [
  { name: 'miui', label: 'MIUI', color: '#ff6700' },
  { name: 'ios', label: 'iOS', color: '#007aff' },
  { name: 'material', label: 'Material', color: '#4caf50' },
  { name: 'minimal', label: 'Minimal', color: '#333333' },
  { name: 'dark', label: 'Dark', color: '#0a84ff' },
]

const navItems = [
  { path: '/', label: '首页', icon: Home },
  { path: '/keyboards', label: '键盘', icon: Keyboard },
  { path: '/themes', label: '主题', icon: Palette },
  { path: '/random', label: '随机', icon: Shuffle },
]
</script>

<template>
  <div class="app" :data-theme="currentTheme">
    <!-- 背景装饰 -->
    <div class="app-bg">
      <div class="bg-circle bg-circle-1"></div>
      <div class="bg-circle bg-circle-2"></div>
    </div>

    <!-- 头部 -->
    <header class="header">
      <div class="header__inner">
        <RouterLink to="/" class="header__brand">
          <div class="header__logo">
            <Keyboard :size="24" />
          </div>
          <span class="header__title">Keyboard</span>
        </RouterLink>

        <nav class="nav">
          <RouterLink
            v-for="item in navItems"
            :key="item.path"
            :to="item.path"
            class="nav__link"
          >
            <component :is="item.icon" :size="18" />
            <span class="nav__label">{{ item.label }}</span>
          </RouterLink>
        </nav>

        <!-- 主题快捷切换 -->
        <div class="theme-switcher">
          <button
            v-for="theme in themes"
            :key="theme.name"
            class="theme-switcher__btn"
            :class="{ active: currentTheme === theme.name }"
            :style="{ '--theme-color': theme.color }"
            :title="theme.label"
            @click="currentTheme = theme.name"
          >
            <span class="theme-switcher__dot"></span>
          </button>
        </div>

        <a href="https://github.com" target="_blank" class="github-link">
          <Github :size="20" />
        </a>
      </div>
    </header>

    <!-- 主内容 -->
    <main class="main">
      <RouterView v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </RouterView>
    </main>
  </div>
</template>

<style>
/* ====================
   全局样式
   ==================== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif;
  line-height: 1.6;
  color: #1a1a1a;
}

/* ====================
   App 容器
   ==================== */
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  background: #0f0f0f;
}

/* ====================
   背景装饰
   ==================== */
.app-bg {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  opacity: 0.5;
}

.bg-circle-1 {
  width: 600px;
  height: 600px;
  background: #667eea;
  top: -200px;
  left: -100px;
}

.bg-circle-2 {
  width: 400px;
  height: 400px;
  background: #764ba2;
  bottom: -100px;
  right: -50px;
}

/* ====================
   头部
   ==================== */
.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: rgba(15, 15, 15, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.header__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  gap: 32px;
}

.header__brand {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: #fff;
}

.header__logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  border-radius: 10px;
  color: #fff;
}

.header__title {
  font-size: 16px;
  font-weight: 600;
}

/* ====================
   导航
   ==================== */
.nav {
  display: flex;
  gap: 4px;
  flex: 1;
}

.nav__link {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px 14px;
  border-radius: 8px;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
}

.nav__link:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.06);
}

.nav__link.router-link-exact-active {
  color: #fff;
  background: rgba(255, 255, 255, 0.1);
}

/* ====================
   主题切换器
   ==================== */
.theme-switcher {
  display: flex;
  gap: 6px;
  padding: 4px;
  background: rgba(255, 255, 255, 0.06);
  border-radius: 16px;
}

.theme-switcher__btn {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid transparent;
  background: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.theme-switcher__btn:hover {
  transform: scale(1.1);
}

.theme-switcher__btn.active {
  border-color: var(--theme-color);
}

.theme-switcher__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--theme-color);
}

/* GitHub 链接 */
.github-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  color: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  transition: all 0.2s;
}

.github-link:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}

/* ====================
   主内容区
   ==================== */
.main {
  flex: 1;
  position: relative;
  z-index: 1;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
  padding: 40px 24px;
}

/* ====================
   页面过渡动画
   ==================== */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.page-enter-from {
  opacity: 0;
  transform: translateY(8px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* ====================
   响应式
   ==================== */
@media (max-width: 768px) {
  .header__inner {
    padding: 12px 16px;
    gap: 16px;
  }

  .header__title {
    display: none;
  }

  .nav {
    gap: 2px;
  }

  .nav__link {
    padding: 8px 10px;
  }

  .nav__label {
    display: none;
  }

  .theme-switcher {
    gap: 4px;
  }

  .theme-switcher__btn {
    width: 22px;
    height: 22px;
  }

  .theme-switcher__dot {
    width: 10px;
    height: 10px;
  }

  .main {
    padding: 24px 16px;
  }
}
</style>
