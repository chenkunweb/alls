// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.config.productionTip = false
// 引入axios
// 配置axios
import Api from './api/index';
Vue.prototype.$api = Api;
import Apis from './api/indexs';
Vue.prototype.$apis = Apis;
import util from './api/util'
Vue.prototype.util = util;
import store from "./api/store"//vuex
Vue.prototype.$store = store;
import headerBom from "./components/header"   
Vue.component("header-bom",headerBom);
//图片插件
import Mui from 'vue-awesome-mui';

Vue.use(Mui);
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer);
Viewer.setDefaults({
  Options: { "inline": true, "button": true, "navbar": true, "title": true, "toolbar": true, "tooltip": true, "movable": true, "zoomable": true, "rotatable": true, "scalable": true, "transition": true, "fullscreen": true, "keyboard": true, "url": "data-source" }
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
