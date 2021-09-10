// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'
import './assets/reaet.css'
Vue.config.productionTip = false
// 配置axios
import Api from './api/index';
Vue.prototype.$api = Api;

import store from "./api/store"//vuex
Vue.prototype.$store = store;
import util from './api/util'
Vue.prototype.util = util;
// 获取小程序传过来的数据
Vue.prototype.getQueryString = function (params){//changeData是函数名
  var reg = new RegExp("(^|&)" + params + "=([^&]*)(&|$)", "i");//解析url地址
  var r = window.location.search.substr(1).match(reg);
  if (r != null){
      return decodeURIComponent(r[2]);
    }
  return null;
}


// 全局注册element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


import { Button,Toast,Overlay} from 'vant';
Vue.use(Button);
Vue.use(Toast);
Vue.use(Overlay);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
