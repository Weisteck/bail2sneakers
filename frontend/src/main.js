import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './index.css'
import VueCarousel from 'vue-carousel'

createApp(App).use(VueCarousel).use(store).use(router).mount('#app')

