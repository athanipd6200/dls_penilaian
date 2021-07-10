import { createApp } from 'vue'
import App from './App'

import './index.css' 
import router from './routers/main_router'
import store from './stores/main_store'

createApp(App).use(router).use(store).mount('#app')
