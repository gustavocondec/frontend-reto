import { createStore } from 'vuex'
import {auth} from "@/views/Auth/auth-state";
import {member} from "@/views/Member/member-state";

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
    auth,
    member
  }
})

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: typeof store
  }
}

export default store

