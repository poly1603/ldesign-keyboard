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
  <div class="demo-page">
    <h2>字母键盘 (QWERTY)</h2>
    <p class="desc">标准 QWERTY 布局，支持大小写切换，可切换至数字和符号键盘</p>

    <div class="demo-card">
      <label>输入用户名</label>
      <input
        ref="inputRef"
        v-model="inputValue"
        type="text"
        placeholder="请输入用户名..."
        readonly
        @focus="handleFocus"
      />
      <div class="result">
        当前值: <code>{{ inputValue || '(空)' }}</code>
      </div>
    </div>

    <KeyboardPopup
      v-model="showKeyboard"
      v-model:value="inputValue"
      type="qwerty"
      :target="inputRef"
    />

    <div class="info-card">
      <h3>使用说明</h3>
      <ul>
        <li>点击 <kbd>⇧</kbd> 切换大小写</li>
        <li>点击 <kbd>123</kbd> 切换到数字键盘</li>
        <li>点击 <kbd>#+=</kbd> 切换到符号键盘</li>
        <li>点击 <kbd>⌫</kbd> 删除字符</li>
        <li>点击 <kbd>完成</kbd> 确认输入并关闭键盘</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.demo-page {
  padding-bottom: 40px;
}

.demo-page h2 {
  font-size: 20px;
  color: #333;
  margin-bottom: 8px;
}

.desc {
  color: #666;
  font-size: 14px;
  margin-bottom: 20px;
}

.demo-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  margin-bottom: 20px;
}

.demo-card label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
}

.demo-card input {
  width: 100%;
  padding: 14px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 16px;
  outline: none;
}

.demo-card input:focus {
  border-color: #007aff;
}

.result {
  margin-top: 12px;
  font-size: 14px;
  color: #666;
}

.result code {
  background: #f0f0f0;
  padding: 2px 8px;
  border-radius: 4px;
  font-family: monospace;
}

.info-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
}

.info-card h3 {
  font-size: 16px;
  color: #333;
  margin-bottom: 12px;
}

.info-card ul {
  list-style: none;
}

.info-card li {
  padding: 8px 0;
  font-size: 14px;
  color: #555;
}

.info-card kbd {
  background: #e8e8e8;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
  font-family: monospace;
  border: 1px solid #d0d0d0;
}
</style>
