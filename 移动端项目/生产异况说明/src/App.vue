<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
export default {
  name: 'App',
  mounted(){
    
    
    
  },
  created(){
    
  },
  methods:{
    
  },
  watch:{
        // '$store.state.report':{
        //     handler(val){
        //         console.log(val)
        //     },
        //     immediate: true,
        // },
       $route:{
      handler(val,oldval){
        console.log(val);//新路由信息
        console.log(oldval);//老路由信息
      },
      // 深度观察监听
      deep: true
    }
    }
}
</script>

<style>
body,html{
  margin: 0px;
  padding: 0px
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center ;
  color: #2c3e50;
  /* margin-top: 60px; */
}

.jilu-link a{
  display: block;
  width: calc( 100%/2 );
  font-size: 15px;
  padding: .70rem 1.20rem;
  text-align: center
}
.jilu-link .active{
   border-bottom: 2px solid #1296DB;
/* background: none ;  */
color: #1296DB !important
}
.jilu-link{
  display: flex;
  position: fixed;
  top:35px;
  width: 100%;
  border-bottom:1px solid #ddd;
  background: #fff;
  z-index: 1;

}
.el-form{
  padding-top: 80px
}
a{
  color: #000 !important;
  text-decoration: none
}
a:hover{
  text-decoration: none
}
.border{
  margin: 10px auto;
  border-left: 1px solid #ddd
}
.submit p{
  margin: 0px !important;
  padding:10px !important;
  font-size: 14px;
  text-align: left
}
</style>
