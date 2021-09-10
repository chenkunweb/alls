import Vue from 'vue'
import Router from 'vue-router'
import util from '@/api/util'
import store from "@/api/store"//vuex
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
      path: '/',
      redirect: to=>{
          store.state.date1 =util.parse_url("date1")
          store.state.date2 =util.parse_url("date2")
          return '/index'
       
      }
    }
  ]
})
