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
    var parames = this.util.parse_url('type');
    this.$store.state.userid = this.util.parse_url('userid');
    console.log(this.$store.state.userid)
    this.$store.state.type =parames
    if(parames =='月达成率'){
      this.$store.state.date1 =this.util.parse_url('date1')
      this.$store.state.date2 =this.util.parse_url('date2')
    }else if(parames =='日达成率'){
      this.$store.state.date =this.util.parse_url('date')
    }
    
  },

  


  created(){


    this.$api.get('/api/THDCJX2','',res=>{//柔性
        console.log(JSON.parse(res.data).Table)
        this.$store.state.rjxfLists = JSON.parse(res.data).Table
        console.log(this.rjxfLists)
      })
      this.$api.get('/api/THDCJX','',res=>{//刚性
        console.log(JSON.parse(res.data).Table)
        this.$store.state.jxfLists = JSON.parse(res.data).Table
        console.log(this.rjxfLists)
        
      })
      if (sessionStorage.getItem('userinfo')) {
            this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('userinfo'))));
        }

        //在页面刷新时,将vuex里的信息保存到sessionStorage里
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('userinfo', JSON.stringify(this.$store.state));
        });
    this.$store.state.department = [
      {name:'电镀',src:'dachenglv/dddcl/index',link:'https://www.zanty.net:8011'},
      {name:'采购',src:'dachenglv/dddcl/index',link:'https://www.zanty.net:8135'},
      {name:'宗联机配套',src:'dachenglv/dddcl/index',link:'https://www.zanty.net:8137'},
      {name:'电装',src:'dachenglv/dzdcl/index',link:'https://www.zanty.net:8008'},
      {name:'样品',src:'dachenglv/dzdcl/index',link:'https://www.zanty.net:8134'},
      {name:'电线',src:'dachenglv/dxdcl/index',link:'https://www.zanty.net:8010'},
      {name:'机加',src:'dachenglv/jjdcl/index',link:'https://www.zanty.net:8009'},
      {name:'五金',src:'dachenglv/wjdcl/index',link:'https://www.zanty.net:8006'},
      {name:'注塑',src:'dachenglv/zsdcl/index',link:'https://www.zanty.net:8007'},
      {name:'宗联机',src:'dachenglv/zljdcl/index',link:'https://www.zanty.net:8005'},
    ]
  },

  
}
</script>

<style>
body,html{
  margin: 0px;
  padding:0px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 40px; */
}
.el-input{
  width: 70% !important;
}
.el-form-item__content{
  display: flex
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
.el-form{
  padding-top: 80px
}
.el-form-item{
    margin-bottom: 0px !important
  }
.el-table td, .el-table th{
  padding: 8px 0
}
.el-row{
    position: fixed;
    bottom: 0px;
    width: 100%;
    background-color: #F5F7FA;
    padding: 8px 0
  }
  .el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    padding-left: 0px !important;
    padding-right: 0px !important;
    text-align: center !important;
  }
  .el-input.is-disabled .el-input__inner{
        background-color: #fff !important;
    border-color: #fff !important;
    color: #000 !important;
    cursor: not-allowed !important;
  }
  .el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #fff !important;
}

table .el-input__inner{
  height: 23px !important;
  line-height: 23px !important
}
.el-button+.el-button{
  margin-right: 5px
}
.el-button{
  padding: 5px !important
}
.el-table--scrollable-y .el-table__body-wrapper{
  overflow-y: auto;
}
</style>
