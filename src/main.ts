import { createApp } from 'vue'
import './style.css'
import './components/workflow/workflow.css'
import App from './App.vue'
import router from './router'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import { createPinia } from 'pinia'

const app = createApp(App)
app.use(router)
app.use(Vue3Toastify, { autoClose: 3000 })
app.use(createPinia())
app.mount('#app')
