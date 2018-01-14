import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      blogList: []
    },
    actions: {
      getList ({ commit }) {
        // 注意这里一定要返回一个promise，下面会看到原因
        return this.$http.get('http://localhost:8000/api/getList').then((res) => {
            commit('setList', res.data.list)
        })
      }
    },
    mutations: {
      setList (state, list) {
        state.blogList = list
      }
    }
  })
}