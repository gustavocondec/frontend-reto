import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Quasar } from 'quasar'
// @ts-ignore
import quasarUserOptions from './quasar-user-options'

console.log('llegaaa', quasarUserOptions)
createApp(App).use(Quasar, quasarUserOptions).use(store)
  .use(router).mount('#app')

