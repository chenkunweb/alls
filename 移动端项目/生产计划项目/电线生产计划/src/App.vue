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
    // 跳转子页面
    var parames = this.util.parse_url('date');
    console.log(parames)
    if(parames){
      this.$store.state.date =parames
    }
    
  },
 
  
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 35px;
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
  .el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    padding-left: 0px !important
  }
  .el-table .cell{
    padding-right: 0px !important
  }
  .el-table td, .el-table th{
    text-align: center !important;
     padding: 5px 0 !important
  }

  .el-date-editor.el-input, .el-date-editor.el-input__inner{
  width:100% !important
}
.el-button{
  padding: 12px !important
}
.el-button+.el-button,.el-switch__label--right{
  margin-left: 0px !important
}
.el-switch__label--left{
  margin-right: 0px !important
}
.el-switch{
  height: 40px !important;
}

.el-input__inner{
  padding: 0 0 0 30px !important
}

  body,html{
  margin: 0;
  padding:0
}
</style>
