import { createApp } from 'vue'
import './style/common.less'
import App from './App.vue'
import router from '@/router'
import { Field, CellGroup, Button, Toast } from 'vant'
const app = createApp(App)
app.use(router)
app.use(Field)
app.use(CellGroup)
app.use(Button)
app.use(Toast)
app.mount('#app')
