import Vue from 'vue'
import Router from 'vue-router'
import util from '@/api/util'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  routes: [
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['@/pages/index'], resolve),
    },
    { 
      path: '/month',
      name: 'month',
      component: resolve => require(['@/pages/month'], resolve),
      
    },
    {
      path: '/',
      redirect: to=>{
      
        if(util.parse_url('type') =='月达成率'){
          return '/month'
        }else{
          return '/index'
        }
      }
    }
  ]
})
