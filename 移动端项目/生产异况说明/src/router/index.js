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
      path: '/shenhe',
      name: 'shenhe',
      component: resolve => require(['@/pages/shenhe'], resolve),
    },
    {
      path: '/chaxun',
      name: 'chaxun',
      component: resolve => require(['@/pages/chaxun'], resolve),
    },
    {
      path: '/',
      redirect: to=>{
        store.state.name =util.parse_url("username")
        store.state.bumen =util.parse_url("address")
        store.state.userid =util.parse_url("userid")
        store.state.shenhe =util.parse_url("shenhe")
        store.state.ids =util.parse_url("id")
        store.state.gongdan =util.parse_url("gongdan")
        store.state.date =util.parse_url("date")
        console.log(util.parse_url("username"))
        console.log(util.parse_url("userid"))
        console.log(util.parse_url("date"))
        // console.log(util.parse_url("date"))
        if(util.parse_url('shenhe') ==1){
          
          console.log(store.state.name)
          return '/shenhe'
        }else{
          console.log(store.state.name)
          return '/index'
        }
      }
    }
    
  ]
})
