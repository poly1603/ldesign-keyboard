<script setup lang="ts">
import { ref, computed } from 'vue'
import { LicensePlateKeyboard, PROVINCES } from '@ldesign/keyboard-vue'

const inputValue = ref('')

// 是否为新能源车牌（8位）
const isNewEnergy = ref(false)

// 最大长度：普通车牌7位，新能源8位
const maxLength = computed(() => isNewEnergy.value ? 8 : 7)


// 格式化车牌号显示
const formattedPlate = computed(() => {
  const value = inputValue.value
  const totalLength = maxLength.value
  const chars = value.split('')
  const result = []
  
  for (let i = 0; i < totalLength; i++) {
    if (i === 2) result.push('·')
    result.push(chars[i] || '_')
  }
  
  return result.join(' ')
})

// 车牌显示样式
const plateClass = computed(() => ({
  'plate-display': true,
  'plate-display--new-energy': isNewEnergy.value,
}))
</script>

<template>
  <div class="demo-page">
    <h2>车牌号键盘</h2>
    <p class="desc">专为车牌号输入设计，支持普通车牌(7位)和新能源车牌(8位)</p>

    <div class="demo-card">
      <div class="plate-type-toggle">
        <button 
          :class="['toggle-btn', { active: !isNewEnergy }]" 
          @click="isNewEnergy = false"
        >
          普通车牌 (7位)
        </button>
        <button 
          :class="['toggle-btn', 'toggle-btn--green', { active: isNewEnergy }]" 
          @click="isNewEnergy = true"
        >
          新能源 (8位)
        </button>
      </div>

      <div :class="plateClass">
        <span class="plate-number">{{ formattedPlate }}</span>
      </div>
      
      <!-- 智能车牌键盘：核心逻辑在 KeyboardManager 中处理 -->
      <LicensePlateKeyboard 
        v-model="inputValue" 
        :new-energy="isNewEnergy"
      />
    </div>

    <div class="info-card">
      <h3>使用说明</h3>
      <ul>
        <li>第1位: 选择省份简称 (如 京、沪、粤) - 显示省份键盘</li>
        <li>第2-8位: 字母+数字混合 - 显示混合键盘</li>
        <li>普通车牌: 省+城市+5位 = 共7位 (如 京A12345)</li>
        <li>新能源: 省+城市+6位 = 共8位 (如 京AD12345)</li>
        <li>💡 第2位虽然显示混合键盘，但只能输入字母 (不含 I/O)</li>
        <li>🤖 智能切换：省份输入后自动切换到混合键盘</li>
      </ul>
    </div>

    <div class="info-card">
      <h3>支持的省份</h3>
      <div class="province-list">
        <span v-for="p in PROVINCES" :key="p" class="province-tag">{{ p }}</span>
      </div>
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
  letter-spacing: 2px;
}

.demo-card input:focus {
  border-color: #007aff;
}

.plate-type-toggle {
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
}

.toggle-btn {
  flex: 1;
  padding: 10px 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: #fff;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.toggle-btn:hover {
  border-color: #007aff;
}

.toggle-btn.active {
  border-color: #007aff;
  background: #007aff;
  color: #fff;
}

.toggle-btn--green.active {
  border-color: #22c55e;
  background: #22c55e;
}

.plate-display {
  margin-top: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #1a5fb4, #3584e4);
  border-radius: 8px;
  text-align: center;
}

.plate-display--new-energy {
  background: linear-gradient(135deg, #16a34a, #22c55e);
}

.plate-number {
  font-size: 28px;
  font-weight: bold;
  color: #fff;
  letter-spacing: 4px;
  font-family: 'Courier New', monospace;
}

.info-card {
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  margin-bottom: 20px;
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

.province-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.province-tag {
  display: inline-block;
  padding: 4px 10px;
  background: #f0f0f0;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}
</style>
