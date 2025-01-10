// src/main.js
import { createApp } from 'vue'
import './style.css'
import './ilaveler.css'
import App from './App.vue'
import router from './router' // Router'ı import et

// createApp(App).use(router).mount('#app')

const app = createApp(App)
app.use(router)
app.mount('#app')

