import { createApp } from './app'
import FastClick from 'fastclick'

/*fastclick,消除点击延时提高程序的运行效率*/
FastClick.attach(document.body)

// 客户端特定引导逻辑……
const { app, store } = createApp()

if (window.__INITIAL_STATE__) {
  store.replaceState(window.__INITIAL_STATE__)
}

// 这里假定 App.vue 模板中根元素具有 `id="app"`
app.$mount('#app')