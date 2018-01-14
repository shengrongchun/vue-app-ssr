import Vue from 'vue'
import VueUi from 'vue-ui'
import App from './App.vue'
import axios from 'axios' 
import VueAxios from 'vue-axios'
import { createRouter } from './router/index.js'
import { createStore } from './store/index.js'
import { sync } from 'vuex-router-sync'

/*引入fontawesome字体*/
import './assets/font-awesome/css/font-awesome.min.css'


/*demo 组件*/
import markDown from './components/pageComponents/markDown'
import codeExample from './components/pageComponents/codeExample'
import codeTable from './components/pageComponents/codeTable'

/*animate.css 动画引入*/
import './assets/styles/animate.css'

const components = {
    markDown,
    codeExample,
    codeTable
}

Object.keys(components).forEach((key) => {
    Vue.component(components[key].name, components[key])
})

Vue.use(VueAxios, axios)
Vue.use(VueUi)


Vue.mixin({
  beforeMount () {
    const { asyncData } = this.$options
    if (asyncData) {
      // 将获取数据操作分配给 promise
      // 以便在组件中，我们可以在数据准备就绪后
      // 通过运行 `this.dataPromise.then(...)` 来执行其他任务
      this.dataPromise = asyncData({
        store: this.$store
      })
    }
  }
})


// 导出一个工厂函数，用于创建新的
// 应用程序、router 和 store 实例

export function createApp () {
  const router = createRouter()
  const store = createStore()

  // 同步路由状态(route state)到 store
  sync(store, router)

  const app = new Vue({
    router,
    store,
    // 根实例简单的渲染应用程序组件。
    render: h => h(App)
  })
  return { app, router, store }
}