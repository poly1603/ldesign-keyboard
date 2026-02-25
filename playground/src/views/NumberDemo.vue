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
    <h2>数字键盘</h2>
    <p class="desc">适用于金额、数量等纯数字输入场景，支持小数点</p>

    <div class="demo-card">
      <label>输入金额</label>
      <input
        ref="inputRef"
        v-model="inputValue"
        type="text"
        placeholder="请输入金额..."
        readonly
        @focus="handleFocus"
      />
      <div class="result">
        金额: <code>¥ {{ inputValue || '0.00' }}</code>
      </div>
    </div>

    <KeyboardPopup
      v-model="showKeyboard"
      v-model:value="inputValue"
      type="number"
      :target="inputRef"
    />

    <div class="info-card">
      <h3>使用说明</h3>
      <ul>
        <li>支持 0-9 数字输入</li>
        <li>点击 <kbd>.</kbd> 输入小数点</li>
        <li>点击 <kbd>清空</kbd> 清除所有输入</li>
        <li>点击 <kbd>ABC</kbd> 切换到字母键盘</li>
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
  font-size: 18px;
  color: #e74c3c;
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
