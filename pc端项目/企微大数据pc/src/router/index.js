import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  routes: [
    
    {
      path:'/index',
      name: 'index',
      component: resolve => require(['@/page/index'], resolve),
    },
    // {
    //   path:'/pages',
    //   name: 'pages',
    //   component: resolve => require(['@/page/bb/bb'], resolve),
    // },
   
  ]
})
