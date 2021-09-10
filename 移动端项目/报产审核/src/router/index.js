import Vue from 'vue'
import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['@/pages/index'], resolve),
    },
    {
      path: '/tiaozheng',
      name: 'tiaozheng',
      component: resolve => require(['@/pages/tiaozheng'], resolve),
    }
  ]
})
