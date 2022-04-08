import { createStore } from 'vuex'
import {auth} from "@/views/Auth/auth-state";

let store = createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth
  }
})

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: typeof store
  }
}

export default store

