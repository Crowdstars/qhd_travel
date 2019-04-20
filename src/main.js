import '@babel/polyfill'
import Vue from 'vue'
import Cookies from 'js-cookie'

import 'normalize.css/normalize.css'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// global css
import '@/styles/index.less'

import App from './App.vue'
import router from "./router";
import store from "./store";
import config from '@/config'

//图标
import './assets/icons'

//权限控制
import './permission'

// 实际打包时应该不引入mock(模拟数据)
//if (process.env.NODE_ENV !== 'production') require('./mock');

import * as filters from './filters'

Vue.use(Element, {
    /**
     * @description 设置element-ui默认组件大小
     */
    size: Cookies.get('size') || 'medium'
});
// register global utility filters.
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
});

/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false;
/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config;
require("./common/css/base.less");
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
