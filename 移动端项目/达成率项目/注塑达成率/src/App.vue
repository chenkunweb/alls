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
    var parames = this.util.parse_url('type');
    if(parames =='月达成率'){
      this.$store.state.type =parames
      this.$store.state.date1 =this.util.parse_url('date1')
      this.$store.state.date2 =this.util.parse_url('date2')
    }else if(parames =='日达成率'){
      this.$store.state.type =parames
      this.$store.state.date =this.util.parse_url('date')
    }
    
    
  },

  
}
</script>

<style>
body,html{
  margin: 0;
  padding:0
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
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
.el-form{
  padding-top: 30px
}
.el-form-item{
    margin-bottom: 0px !important
  }
.el-row{
    position: fixed;
    bottom: 0px;
    width: 100%;
    background-color: #F5F7FA;
    padding: 8px 0
  }
  .el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    padding-left: 0px !important
  }
  .el-table .cell{
    padding-right: 0px !important
  }
  .el-table td, .el-table th{
    text-align: center !important
  }
  .el-form-item__content{
    display: flex !important
  }
.el-table td, .el-table th{
  padding: 5px 0 !important
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 75% !important
}
.el-input__inner{
  padding: 0 0 0 30px !important
}
</style>
