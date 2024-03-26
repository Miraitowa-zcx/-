/** init domain config */
import Vue from 'vue'
import {
    config
} from '@/config/config'
Vue.prototype.env = process.env.NODE_ENV
//设置全局API_BASE_URL
Vue.prototype.API_BASE_URL = config.getDomain() + config.gatewayPath
window._CONFIG = {}
window._CONFIG['domianURL'] = Vue.prototype.API_BASE_URL
//单点登录地址
window._CONFIG['staticDomainURL'] = Vue.prototype.API_BASE_URL + '/sys/common/static'