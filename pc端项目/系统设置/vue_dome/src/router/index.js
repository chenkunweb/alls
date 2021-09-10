import Vue from 'vue'
import Router from 'vue-router'

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(Router)
// debugger
export default new Router({
  routes: [
    {
      path: '/shouye',
      name: 'shouye',
      component: resolve => require(['@/components/home'], resolve),
      
    },
    { path: '/', redirect: '/shouye' }
  ]
})