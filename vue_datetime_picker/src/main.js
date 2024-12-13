import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css'
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

//ghi đè màu primary sang màu tím
document.documentElement.style.setProperty('--el-color-primary', '#826af2'); // Màu chính
document.documentElement.style.setProperty('--el-color-primary-light-3', 'rgb(185, 165, 255)');
document.documentElement.style.setProperty('--el-color-primary-light-5', 'rgb(200, 180, 255)');
document.documentElement.style.setProperty('--el-color-primary-light-7', 'rgb(215, 200, 255)');
document.documentElement.style.setProperty('--el-color-primary-light-8', 'rgb(230, 220, 255)');
document.documentElement.style.setProperty('--el-color-primary-light-9', 'white');

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(ElementPlus)
app.mount('#app')
