<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted(){
    // 跳转子页面
    // this.$router.push({path: '/index'});
    
  },
  // created(){this.get()},
  methods:{
    // async get(){
    //   let data = {corpid:'ww4b634cb35b1893b8',corpsecret:'bFQsey2uIhGOvfCb_4o9VA7RW1Nlxe5n9CFanLBxt2U'}
    //   let access_token = JSON.parse(await this.$api.api.get('/api/weixin',data)).access_token
    //   console.log(access_token)
    //   let datas = { access_token:access_token, department_id:1, fetch_child:1, }
    //   let userlist = JSON.parse(await this.$api.api.get('/api/userlist',datas)).userlist
    //   console.log(userlist)
    //   let a = []
    //   // userlist.forEach(async(item)=>{
    //   //   let data = {i:2,a1:item.name}
    //   //   let all = JSON.parse(await this.$api.api.get('/api/FWJL',data)).Table
    //   //   console.log(all)
    //   //   if(all!=''){
    //   //     a.push(all)
    //   //     this.$store.state.list = a
    //   //   }
    //   // })
    //   console.log(a)
      
    //   this.$store.state.list = all
    // }
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
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}
.jilu-link a{
  display: block;
  width: calc( 100%/2 );
  font-size: 15px;
  padding: 8px 0;
  text-align: center
}
.jilu-link .active{
   border-bottom: 2px solid #1296DB;
color: #1296DB !important
}
.jilu-link{
  display: flex;
  position: fixed;
  top:30px;
  width: 100%;
  border-bottom:1px solid #ddd;
  border-top: 1px solid #ddd;
  background: #fff;
  z-index: 1;

}
a{
  color: #000 !important;
  text-decoration: none
}
a:hover{
  text-decoration: none
}
.border{
  margin: 5px auto;
  border-left: 1px solid #ddd
}
.el-table th>.cell,
.el-table .cell{
  padding: 0px !important;
  text-align: center !important;
  }
  .el-table th{
    padding: 5px !important;
  }
  .el-table td{
    padding: 8px !important;
  }
  .el-table__footer-wrapper{
    /* position: fixed !important; */
  }
  .el-select{
    width: 30% !important;
  }
  .el-button+.el-button{
    margin: 0px !important;
  }
  .el-input--suffix .el-input__inner{
    padding: 0px !important;
  }
  .footer{
      display: flex;
      position: fixed;
      bottom: -15px
    }
    
  
</style>
