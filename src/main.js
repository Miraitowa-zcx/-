import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import SlideVerify from 'vue-monoplasty-slide-verify'
import App from './App.vue'
import router from './router'

import '@/assets/global.css'
import toast from 'vue-component-toast'
import 'vue-component-toast/dist/css/vc-toast.min.css'

Vue.config.productionTip = false

Vue.use(toast)
Vue.use(ElementUI, {size: 'small'})
Vue.use(SlideVerify)

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
