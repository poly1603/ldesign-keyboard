import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// 导入键盘样式 (开发时直接导入源文件)
import '../../packages/vue/src/styles/index.css'

// 路由配置
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue'),
    },
    {
      path: '/keyboards',
      name: 'keyboards',
      component: () => import('./views/KeyboardsDemo.vue'),
    },
    {
      path: '/themes',
      name: 'themes',
      component: () => import('./views/ThemesDemo.vue'),
    },
    {
      path: '/random',
      name: 'random',
      component: () => import('./views/RandomDemo.vue'),
    },
  ],
})

const app = createApp(App)
app.use(router)
app.mount('#app')
