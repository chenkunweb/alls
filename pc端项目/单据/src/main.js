// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import store from "./api/store"//vuex
Vue.prototype.$store = store;
import Print from './api/print' // 引入附件的js文件
Vue.use(Print) // 注册
// 引入axios
// 配置axios
import Api from './api/index';
Vue.prototype.$api = Api;
import util from './api/util'
Vue.prototype.util = util;
import Await from './api/await';
Vue.prototype.$await = Await;
// // Vue.use(Print) // 注册
// import vcolorpicker from 'vcolorpicker'
// Vue.use(vcolorpicker)
// // 注册vant组件
import { Tab, Tabs,Toast,Dialog,Field } from 'vant';
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(Toast);
Vue.use(Dialog);
Vue.use(Field);
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
