# LDesign Keyboard

🎹 高性能虚拟键盘组件库，支持 Vue 3，提供字母、数字、车牌号等多种键盘布局。

## ✨ 特性

- 📱 **PC/移动端自适应** - PC 端在输入框下方弹出，移动端从屏幕底部滑出
- ⌨️ **多种键盘布局** - 字母 (QWERTY)、数字、符号、车牌号键盘
- 🎨 **可定制主题** - 内置 iOS、Android 风格，支持 CSS 变量自定义
- 📦 **框架无关核心** - 核心逻辑与框架分离，Vue 包基于核心包封装
- 🔧 **TypeScript 支持** - 完整的类型定义
- 📳 **触觉反馈** - 移动端按键震动反馈

## 📦 安装

```bash
# pnpm
pnpm add @ldesign/keyboard-vue

# npm
npm install @ldesign/keyboard-vue

# yarn
yarn add @ldesign/keyboard-vue
```

## 🚀 快速开始

```ts
// main.ts
import '@ldesign/keyboard-vue/styles/index.css'
```

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { KeyboardPopup } from '@ldesign/keyboard-vue'

const showKeyboard = ref(false)
const inputValue = ref('')
const inputRef = ref<HTMLInputElement | null>(null)

const handleFocus = () => {
  showKeyboard.value = true
}
</script>

<template>
  <input
    ref="inputRef"
    v-model="inputValue"
    readonly
    @focus="handleFocus"
  />

  <KeyboardPopup
    v-model="showKeyboard"
    v-model:value="inputValue"
    type="qwerty"
    :target="inputRef"
  />
</template>
```

## 📚 键盘类型

| 类型 | 描述 |
|------|------|
| `qwerty` | 标准 QWERTY 字母键盘 |
| `number` | 数字键盘（带小数点）|
| `integer` | 纯整数键盘 |
| `symbol` | 符号键盘 |
| `license-plate` | 车牌号键盘 |

## 🎨 主题定制

```css
:root {
  --keyboard-bg: #d1d5db;
  --keyboard-key-bg: #ffffff;
  --keyboard-key-color: #1f2937;
  --keyboard-primary-bg: #3b82f6;
}
```

## 📖 API

### KeyboardPopup Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| modelValue | `boolean` | `false` | 是否显示键盘 |
| value | `string` | `''` | 输入值 |
| type | `KeyboardType` | `'qwerty'` | 键盘类型 |
| target | `HTMLElement` | - | 目标输入框 |
| maxLength | `number` | - | 最大输入长度 |
| closeOnClickOutside | `boolean` | `true` | 点击外部关闭 |
| enableVibrate | `boolean` | `true` | 启用震动反馈 |

### Events

| 事件 | 参数 | 描述 |
|------|------|------|
| confirm | `(value: string)` | 确认输入 |
| keypress | `(key: KeyDefinition)` | 按键触发 |

## 📁 项目结构

```
packages/
  core/     # 框架无关的核心逻辑
  vue/      # Vue 3 组件封装
playground/ # 演示项目
```

## 🔨 开发

```bash
# 安装依赖
pnpm install

# 启动演示
pnpm dev

# 构建
pnpm build
```

## 📄 License

MIT © LDesign Team
