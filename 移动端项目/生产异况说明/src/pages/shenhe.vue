<template>
  <div class="submit">
      
    <header-bom :msg="titles"></header-bom>
    <div class="jilu-link">
        <router-link to="/index">报告</router-link>
        <div class="border"></div>
        <router-link to="/chaxun" >查询</router-link>
        <div class="border"></div>
        <router-link to="/shenhe" >审核</router-link>
    
    </div>
    <div class="lists">
      <div  v-for="(items,index) in result" :key="index" >

        <p>报告时间：{{items.data}}</p>
        <div class="sub-content">
          <div class="displays">
            <div class="names">
              <div>报告人：{{items.name1}}</div>
              <div>车间：{{items.bumen}}</div>
              <div>工单号：{{items.gongdan}}</div>
              <div>计划数量：{{items.number}}</div>
              <div>完成数量：{{items.wancheng}}</div>
              <div>产品型号：{{items.xinghao}}</div>
                
                <div>生产交期：{{items.jiaoqi}}</div>
                <div>说明情况：{{items.yuanyin}}</div>
            </div>
          </div>
          <div>
            <el-button type="success" @click="sub('同意',index)">同意</el-button>
            <el-button type="danger" @click="sub('拒绝',index)">拒绝</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as getData from '../api/getDate';
export default {
    data(){
        return{
          // 数据列表
          result:[],
        }
    },
    created(){
        this.titles={
            a:{name:'应用程序',path:'/pages/index/index'},
            b:{name:'审核',path:'/index'},
        } 
        this.getData()
    },
    methods: {
      // 初始化数据
      async getData(){
         let adata = { corpid : 'ww4b634cb35b1893b8',  corpsecret:'bFQsey2uIhGOvfCb_4o9VA7RW1Nlxe5n9CFanLBxt2U' }
        let data={i:3,user:this.$store.state.name}
        let access_token = JSON.parse(await this.$api.api.get('/api/weixin',adata)).access_token
        let iddatas = { access_token:access_token, department_id:1, fetch_child:1, }
        let userlist = JSON.parse(await this.$api.api.get('/api/userlist',iddatas)).userlist 
        let list = JSON.parse(await this.$api.api.get('/api/Planss',data)).Table
        let alist = []
        list.forEach((item)=>{
          let depament = this.util.bumen(item.车间.replace(/\s+/g, ""))
          if(depament!=undefined){depament=depament.name}
          userlist.forEach((items)=>{
            if(items.name==item.申述人.replace(/\s+/g, "")){
              let xinghao = item.产品型号==null?'':item.产品型号.replace(/\s+/g, "")
              alist.push({
                name:item.审核人.replace(/\s+/g, ""),
                gongdan:item.工单号,
                jiaoqi:item.生产交期,
                name1:item.申述人.replace(/\s+/g, ""),
                yuanyin:item.申述原因,
                data:item.申述时间,
                id:item.记录号,
                bumen:depament,
                type:item.类型,
                reportid:items.userid,
                number:item.计划数量,
                wancheng:item.完成数量,
                xinghao:xinghao,
                riqi:item.生产日期,
                
              })
            }
          })
        })
        this.access_token = access_token
        this.result = alist
        
       
      },
      onSubmit() {
      },
      // 提交审核
      sub(e,index){
        let data
        let today = getData.dateUtils.today({allTimeSign:true})
        let id
        this.result.forEach((item,indexs)=>{
          if(indexs ==index){
            id=item.id
            data = {
                a0:2,
                a1:'',
                a2:item.jiaoqi,
                a3:item.gongdan,
                a4:item.name1,
                a5:item.data,
                a6:item.yuanyin,
                a7:item.name,
                a8:today,
                a9:e,
                a10:item.id,
                a11:item.type,
                a12:item.number,
                a13:item.xinghao,
                a14:item.riqi
            }
          }
        })
        let baocun={
            date:today,
            puser:this.$store.state.userid,
            mname:'生产异况说明',
            pto:this.result[index].reportid,
            ptext:this.$store.state.name+'审核了你的报告#立即查看',
            dress:"https://www.zanty.net:8108?shenhe=2&id="+id,
        }
        let tuisong = {
            access_token:this.access_token,
            touser:this.result[index].reportid,
            page:"pages/index/index",
            title:"生产异况说明",
            description:today,
            key:this.$store.state.name+'审核了你的报告',
            value:"立即查看"
            
        }
        this.$api.post('api/PushMes',baocun,res=>{ })
        this.$api.post('/api/Message',tuisong,res=>{})
        this.$api.post('/api/Planss',data,res=>{
            this.getData()
        })
      }
    }
    
}
</script>

<style>

.submit{
  background: #ddd;
  margin-bottom: 51px;
margin-top: 84px !important
}

.submit .sub-content{
  background:#fff;
  display: flex;
  padding: 10px
}
.submit .displays{
  width: 100%;
  margin-left: 10px;
  overflow: hidden;

}
.el-button+.el-button{
  margin-left: 0px;
  margin-top: 10px
}
.submit .name{
  display: flex;
  justify-content:space-between
  
}
.submit .name div:last-child{
  color: #ccc
}
.submit img{
  width: 50px;
  height: 50px;
}

.submit .names div{
  font-size: 14px;
  text-align: left;

}

.submit .marker {      
  position: relative;
  width: 10px;      
  top: -30px;
  height: 10px;      
  left: 50px;
  border: 1px solid #088;      
  border-radius: 100px;      
  background-color: #ffffff;      
  opacity: 0.5;
}
.submit .markers {      
  background-color: #088;
  position: relative;
  width: 10px;      
  top: -30px;
  height: 10px;      
  left: 50px;
  border: 1px solid #088;      
  opacity: 0.5;
  border-radius: 100px;       
}
/* .jilu-link{
  display: flex;
  position: fixed;
  top:38px;
  width: 100%;
  border-bottom:1px solid #ddd;
  background: #fff;
  z-index: 1;

} */
.border{
  margin: 10px auto;
  border-left: 1px solid #ddd
}
</style>