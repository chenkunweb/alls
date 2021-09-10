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
      path: '/tongji',
      name: 'tongji',
      component: resolve => require(['@/pages/tongji'], resolve),
      
    },
    {
      path: '/',
      redirect: to=>{
        store.state.username =util.parse_url("username")
        store.state.address =util.parse_url("address")
        store.state.userid =util.parse_url("userid")
        console.log(util.parse_url("username"))
        console.log(util.parse_url("address"))
        if(util.parse_url('type') =='月达成率'){
          return '/month'
        }else{
          return '/index'
        }
      }
    }
  ]
})
