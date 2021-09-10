<template>
  <div class="header">
   <div class="d-inline-flex topbar breadcrumbs">
      <div >
          <viewer :images="avatar">
             <img  :src="avatar" >
           </viewer></div>
      <div class="topbars">
        <div>
          当前位置：
        </div>
        <ul class="breadcrumb">
          <!-- <li><a href="#" @click="wx">陈坤个人数据中心</a></li> -->
          <li v-if="msg.a" @click="wx">{{msg.a.name}}</li>
          <li v-if="msg.b" @click="wx1">{{msg.b.name}}</li>
          <li v-if="msg.c" @click="wx2">{{msg.c.name}}</li>
          <li v-if="msg.d" @click="wx3">{{msg.d.name}}</li>
          <li v-if="msg.e" @click="wx4">{{msg.e}}</li>
        </ul>
      </div>
      
    </div>
   
  </div>
</template>

<script>
import wx from 'weixin-js-sdk'
import xlsximg from "../assets/images/login.png";
export default {
  props: ['msg'],
  data(){
    return{
     avatar:[],
     userName:'',
     position:'',
     
      
    }
  },
  created(){
       
       this.avatar = [xlsximg]
       
  },
  methods:{
       
       wx(){
        
            //判断当前页面是否在小程序环境中， 注：首页是在小程序，嵌套网页，该网页才能再次跳转回小程序
            wx.miniProgram.getEnv(function(res) {
                if(res.miniprogram){
                    // smallPro=true;
                    wx.miniProgram.switchTab({
                url:'/pages/index/index',
                    success: function(){
                        console.log('success')
                        },
                    fail: function(){
                        console.log('跳转回小程序的页面fail');
                    },
                });
                }else{ 
                    // smallPro=false;
                }
            });

        },
        wx1(){
          
            this.$router.push({path:this.msg.b.path})
        },
         wx2(){
          
            this.$router.push({path:this.msg.c.path, query:{id: this.msg.d.id,report:this.msg.d.report}});
        },
         wx3(){
          
            // this.$router.push({path:this.msg[2].path})
        },
         wx4(){
            // this.$router.push({path:this.msg[2].path})
        }
     
  },
watch: {
   'msg': function (n, o) {
     
   }
  },

  // props: {
  //     msg: Object
  //   }
}
</script>

<style>
 .breadcrumb li:last-child{
   color: red
 }
 .header img{
    width: 30px !important;
    height: 30px !important;
}
.header{
    background: #fff;
    position: fixed;
    z-index: 1;
    top: 0px;
    width: 100%;
    border-bottom: 1px solid #ddd
}
.header .breadcrumb > li + li:before {
    content: "/ ";
    padding: 0 5px;
    color: #000
}
.header .topbar{
   width: 100%;
}
.header .topbars{
      margin: 5px auto;
}
.header .topbar div{
  width: calc( 100%/3 );
  color: #000;
}
.header .breadcrumbs div{
  display: flex;
  width: auto;
    font-size: 14px;
}
.header .breadcrumb {
    padding: 0px;
    margin: 0px;
    margin-bottom: 0px;
    background-color: #fff;
    border-radius: 0px;
}
.d-inline-flex {
    display: -ms-inline-flexbox!important;
    display: -webkit-inline-box!important;
    display: inline-flex!important;
}
.breadcrumb, .breadcrumb-item {
    display: -ms-flexbox;
    display: -webkit-box;
    display: flex;
}
.breadcrumb {
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    padding: .75rem 1rem;
    margin-bottom: 1rem;
    list-style: none;
    background-color: #e9ecef;
    border-radius: .25rem;
}
</style>