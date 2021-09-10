<template>
<div class="list">
  <p class='header'>{{userlist.name}}个人数据中心</p>
  <el-row>
    <el-col :sm="8" :xs="12" v-for="(item,index) in lable" :key="index">
      <!-- :href="item.src+'?userid='+userid" -->
     
     <div @click="jilu(item.src,item.name)">
        <a>
            <img :src="item.icon" alt="" srcset=""><span>{{item.name}}</span>
        </a>
     </div>
    </el-col>
 
  </el-row>
  <p class='header'>基本资料</p>
  <div class='box'>
      <div class='box-list'>
          <div>
            <p style="line-height:120px">宗泰电机</p>
            <p ><img width='100px' :src="userlist.avatar"/></p>
          </div>
          <div>
            <p>部门：{{userlist.address}}</p>
            <p>职位：{{userlist.position}}</p>
          </div>
          <div>
            <p>名字：{{userlist.name}}</p>
            <p>手机号：{{userlist.mobile}}</p>
          </div>
          <div>
            <p>性别：{{userlist.gender}}</p>
            <p>邮箱：{{userlist.email}}</p>
          </div>
      </div>
      
  </div>
   
    
  
</div>
</template>

<script>
export default {
  data(){
    return{
      list:[],
      userlist:[],
      userid:'',
      //项目列表手动添加。有新的pc项目需要在这添加
      lable:[
        {
          name:'生产计划',
          id:'生产计划操作权限',
          // src:"http://localhost:8080",
          src:"http://www.zanty.net:8081/",
          icon:require('../assets/images/login.png'),
        },
        {
          name:'单据',
          id:'单据操作权限',
          // src:"http://localhost:8080",
          src:"http://www.zanty.net:8083/",
          icon:require('../assets/images/shebeiguanli.png'),
          
        },
        {
          name:'系统设置',
          id:'系统设置操作权限',
          //  src:"http://localhost:8081",
          src:"http://www.zanty.net:8069/",
          icon:require('../assets/images/zhanghaodengluq.png'),
          indexs:0
        },
        {
          name:'物料计划员工作台',
          id:'物料计划员工作台',
          src:"http://www.zanty.net:8089/",
          icon:require('../assets/images/jijianbaogongguanli.png'),
          indexs:0
        },
        {
          name:'物流跟踪',
          id:'物流跟踪操作权限',
          // src:"http://localhost:8080",
          src:"https://www.zanty.net:8128/",
          icon:require('../assets/images/wuliugenzong.png'),
          
        },
        {
          name:'产品状态标识卡',
          id:'产品状态操作权限',
          // src:"http://localhost:8080",
          src:"https://www.zanty.net:8132/",
          icon:require('../assets/images/wuliugenzong.png'),
          
        },
        {
          name:'生产看板',
          id:'生产看板',
          // src:"http://localhost:8080",
          src:"https://www.zanty.net:8139/",
          icon:require('../assets/images/wuliugenzong.png'),
          
        },
        {
          name:'合同评审记录',
          id:'合同评审记录',
          // src:"http://localhost:8080",
          src:"https://www.zanty.net:8140/",
          icon:require('../assets/images/wuliugenzong.png'),
          
        },
        {
          name:'TKTH统计',
          id:'TKTH统计',
          // src:"http://localhost:8080",
          src:"https://www.zanty.net:8141/",
          icon:require('../assets/images/wuliugenzong.png'),
          
        },
        {
          name:'绩效考核统计表',
          id:'绩效考核统计表',
          // src:"http://localhost:8080",
          src:"https://www.zanty.net:8143/",
          icon:require('../assets/images/wuliugenzong.png'),
          
        },
      
        
        
      ]
    }
  },
  created(){
    this.userid = this.$store.state.userid
    this.getList()
   

  },
  mounted(){

  },
  methods:{
    //初始化数据
      async getList () {
            let corpid = 'ww4b634cb35b1893b8'
            let corpsecret = 'bFQsey2uIhGOvfCb_4o9VA7RW1Nlxe5n9CFanLBxt2U'
            let access_tokenData = {corpid : corpid,corpsecret:corpsecret}
            //通行证
            let access_token = JSON.parse(await this.$api.api.get('/api/weixin',access_tokenData)).access_token
            let userData = {
              access_token:access_token,
              department_id:1,
              fetch_child:1,
            }
            //通讯录列表
            let user = JSON.parse(await this.$api.api.get('/api/userlist',userData)).userlist
            let list = []
            user.forEach((item)=>{
              if(item.userid ==this.userid){
                console.log(item)
                this.username = item.name
                this.depament = item.address.split('/')[1]

                list.push({
                  avatar:item.avatar,
                  address:item.address.split('/')[1],
                  position:item.position,
                  name:item.name,
                  mobile:item.mobile,
                  email:item.email,
                  gender:item.gender=1?'男':'女'
                })
                
              }
            })
            this.userlist = list[0]
            //数据库模块列表
            let lists = JSON.parse(await this.$api.api.get('/api/MOUSER','')).Table
            let lables = []
            // 赛选赋值==赋值有权限的模块
            lists.forEach((item)=>{
              if(item.用户ID.replace(/\s+/g, "")==this.userid&&item.查看.replace(/\s+/g, "")==1){
                let muban = item.模板ID.split('-')
                  this.lable.forEach((items)=>{
                    if(items.id == muban[1].replace(/\s+/g, "") ){
                      lables.push(items)
                    }
                    
                  })
              }
            })
            this.lable = this.util.deWeight(lables);
      },
      // 点击跳转
      async jilu(a,e){
        window.location.href=a+'?userid='+this.userid;
        let data = {
          a1:e,
          a2:this.formatDate(new Date()),
          a3:this.username,
          a4:this.depament
        }
        // 保存访问记录
       await this.$api.api.post('/api/FWJL',data).catch(() => {})
        
      },
      //时间处理函数
      formatDate(date) {
        let month = date.getMonth() + 1
        let day = date.getDate()
        let hours = date.getHours()
        let minutes = date.getMinutes()
        if (month < 10) {
          month = "0" + month
        }
        if (day < 10) {
          day = "0" + day
        }
        if (hours < 10) {
          hours = "0" + hours
        }
        if (minutes < 10) {
          minutes = "0" + minutes
        }
        return `${date.getFullYear()}-${month}-${day} ${hours}:${minutes}`;
      },
  }
}
</script>

<style>
  img{
    width: 100px;
    margin: 0 auto !important
  }
  a{
    display: flex;
    flex-direction:column
  }
  p{
    padding: 16px !important
  }
  .list{
    width: 50%;
    margin: 0 auto
  }
 
  .header{
    background: #fff;
    margin: 10px 0
  }

  .el-row{
    border: 1px solid #ddd;
    border-bottom: none;
    background: #fff;
  }
  .el-col-8{
  border-bottom: 1px solid #ddd;
  border-right: 1px solid #ddd;

  }
  .el-col-8:nth-of-type(3n) {
    border-right: none;
  }
  .box{
    background: #fff;
  }
  .box-list{
    width: 50%;
    margin: 0 auto
  }
  .box-list div{
    text-align: left !important;
    display: flex;
    justify-content: space-between;
    
  }
  .box-list div img{
    display: block
  }
  .box-list div p{
    width: 50%
  }
   @media screen and (max-width: 500px) {
    .list{
      width: 100%;
      margin: 0 auto
    }
    .box-list{
    width: 100%;
    margin: 0 auto
  }
}

      
</style>