import Vue from 'vue'
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

export default new Router({
  routes: [
   
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['@/pages/index'], resolve),
      children:[
        {
          path: '/rkd',
          name: 'rkd',
          component: resolve => require(['@/pages/rkd'], resolve),
          
        },
        {
          path: '/kh',
          name: 'kh',
          component: resolve => require(['@/pages/kh'], resolve),
          
        },
        {
          path: '/huizong',
          name: 'huizong',
          component: resolve => require(['@/pages/huizong'], resolve),
          
        },
        
      ]
    },
    {
      path: '/',
      redirect: to=>{
        // store.state.userid = 
        return '/index'
      }
    }
   
  ]
})
