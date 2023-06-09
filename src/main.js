import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap/dist/css/bootstrap.css'

document.title = 'Welcome to Gymplan!'

createApp(App).use(router).mount('#app')
