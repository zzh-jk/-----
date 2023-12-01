import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'
import enLang from 'element-ui/lib/locale/lang/en' // 如果使用中文语言包请默认支持，无需额外引入，请删除该依赖

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'
// import moment from 'moment'

import * as moment from 'moment'
Vue.prototype.$moment = moment
    // 定义一个全局过滤器实现日期格式化
Vue.filter('datefmt', function(input, fmtstring) {
    return moment.unix(input).format(fmtstring)
})

// 设置echarts
const echarts = require('echarts')
Vue.prototype.$echarts = echarts

import axios from 'axios'
import qs from 'qs'
// 设置axios的基础url部分
// axios.defaults.baseURL = 'http://api.tianapi.com/';
// 将axios挂载到vue实例上，使用时就可以 this.$axios 这样使用了
Vue.prototype.$axios = axios
    // 将qs挂载到vue实例上，使用时就可以 this.$qs 这样使用了
Vue.prototype.$qs = qs

import './icons' // icon
import './permission' // permission control
import './utils/error-log' // error log

import * as filters from './filters' // global filters

if (process.env.NODE_ENV === 'production') {
    const { mockXHR } = require('../mock')
    mockXHR()
}

Vue.use(Element, {
    size: Cookies.get('size') || 'medium',
    locale: enLang // 如果使用中文，无需设置，请删除
})
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})