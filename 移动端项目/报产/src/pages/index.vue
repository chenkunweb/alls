<template>
<div style="margin:20px auto">
  <div class="box">
    <el-row>
        <el-col :span="6"><div class="grid-content bg-purple-light ">订单号</div></el-col>
        <el-col :span="18"><div class="grid-content bg-purple-light ">{{dowmList.gongdan}}</div></el-col>
    </el-row>
    <el-row>
        <el-col :span="6"><div class="grid-content bg-purple-light ">日期</div></el-col>
        <el-col :span="18"><div class="grid-content bg-purple-light ">
          <el-date-picker v-model="timeValue" type="date"  value-format="yyyy-MM-dd" placeholder="选择日期"> </el-date-picker>  
        </div></el-col>
        
    </el-row>
    <el-row>
        
        <el-col :span="6"><div class="grid-content bg-purple-light ">产品型号</div></el-col>
        <el-col :span="18"><div class="grid-content bg-purple-light ">{{dowmList.xinghao}}</div></el-col>
        
    </el-row>
    <el-row>
        
        <el-col :span="6"><div class="grid-content bg-purple-light ">工序名</div></el-col>
        <el-col :span="18"><div class="grid-content bg-purple-light ">{{dowmList.gongxuName}}</div></el-col>
        
    </el-row>
    <el-row>
        
        <el-col :span="6"><div class="grid-content bg-purple-light ">定额</div></el-col>
        <el-col :span="18"><div class="grid-content bg-purple-light ">{{dowmList.dinge}}</div></el-col>
        
    </el-row>
    <el-row>
        
        <el-col :span="6"><div class="grid-content bg-purple-light ">完成数量</div></el-col>
        <el-col :span="18"><div class="grid-content bg-purple-light " v-if="chakan==false">
          <el-input ref="mark" v-model="maxNum"  :disabled="dowmList.dinge==''" @input="changeInput"  placeholder="请正确输入数量，超出无法保存"></el-input>  
        </div>
        <div v-if="chakan==true" class="grid-content bg-purple-light ">{{maxNum}}</div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="6"><div class="grid-content bg-purple-light ">上工序不良数量</div></el-col>
        <el-col :span="18"><div class="grid-content bg-purple-light " v-if="chakan==false">
          <el-button type="text" v-if="dowmList.sgxas==''" @click="dialogTableVisible = true">点击填写</el-button>
          <span v-else>{{dowmList.sgxas}}</span>
        </div>
        <div v-if="chakan==true" class="grid-content bg-purple-light ">{{smaxNum}}</div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="6"><div class="grid-content bg-purple-light ">本工序不良数量</div></el-col>
        <el-col :span="18"><div class="grid-content bg-purple-light " v-if="chakan==false">
          <el-input ref="bmark" v-model="bmaxNum"  :disabled="dowmList.dinge==''" @input="schangeInput"  placeholder="请正确输入数量，超出无法保存"></el-input>  
        </div>
        <div v-if="chakan==true" class="grid-content bg-purple-light ">{{bmaxNum}}</div>
        </el-col>
    </el-row>
    <el-row>
        <el-col :span="6"><div class="grid-content bg-purple-light ">工资</div></el-col>
        <el-col :span="18"><div class="grid-content bg-purple-light ">{{dowmList.gongzi}}</div></el-col>
    </el-row>
  </div>
  <p style="display: flex;justify-content: center;"><el-button type="primary" :disabled="isDowm"  @click="btnClick">保存</el-button></p>
  <el-dialog title="收货地址" @close="dialogClose" :visible.sync="dialogTableVisible">
    <div v-for="(item,index) in dowmList.shx" :key="index">
      <span>{{item.name}}</span>
      <el-input v-model="item.value" placeholder="请正确输入数量，超出无法保存"></el-input>
    </div>
    <div slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogTableVisible = false">确 定</el-button>
  </div>
  </el-dialog>
</div>
  
</template>

<script>
import * as getData from '../api/getDate';
export default {
  data(){
    return{
      // 数据
      dowmList:{},
      // 显示隐藏弹窗
      dialogTableVisible:false,
      // 完成数量
      maxNum:'',
      // 上工序不良数
      smaxNum:'',
      // 本工序不良数
      bmaxNum:'',
      // 时间
      timeValue:getData.dateUtils.today({ymrSign:true}),
      // 用户名
      name:'',
      // 保存按钮是否可用
      isDowm:true,
      // 不良数是否可编辑
      chakan:false,
      // 是否有上工序
      issgxshow:false,
     
    }
  },
  created(){
    this.config()
  },
  methods:{
    // 初始化数据
    async config(){
      let access_token_data = { corpid : 'ww4b634cb35b1893b8',  corpsecret:'bFQsey2uIhGOvfCb_4o9VA7RW1Nlxe5n9CFanLBxt2U' }
      let access_token = JSON.parse(await this.$api.api.get('/api/weixin',access_token_data)).access_token
      let userlist_data={access_token:access_token,department_id:1,fetch_child:1,}
      let userlist = JSON.parse(await this.$api.api.get('/api/userlist',userlist_data)).userlist
      let list ={}
      let data = {
            a2:this.util.parse_url("state").split('-')[0],
            a4:this.util.parse_url("state").split('-')[1],
            a5:this.util.parse_url("state").split('-')[2]
          }
          let isShf = JSON.parse(await this.$api.api.get('/api/GXLCBOM',data)).Table[0]
          let gonghao
          userlist.forEach((item)=>{
            if(this.$store.state.userid == item.userid){
              this.name = item.name
              gonghao = item.address.split('/')[0]
            }
          })
          list.gonghao = gonghao
          list.gongdan = this.util.parse_url("state").split('-')[3]
          list.xinghao = isShf.零件说明.replace(/\s+/g, "")
          list.daima = isShf.零件号.replace(/\s+/g, "")
          list.wc = isShf.部门.replace(/\s+/g, "")
          list.gongxu = isShf.工序号.replace(/\s+/g, "")
          list.gongxuName = isShf.工序说明.replace(/\s+/g, "")
          if(isShf.上一工序号==''||isShf.上一工序号==null){
            this.issgxshow=true
          }else{
            this.issgxshow=false
            let shx = []
            isShf.上一工序号.split(';').forEach((item,index)=>{
              shx.push({
                name:item+'%'+ isShf.上一工序说明.split(';')[index],
                value:''
              })
            })
             list.shx = shx
          }
          let departments = JSON.parse(await this.$api.api.get('/api/WC','')).Table
          let depament
          departments.forEach((item)=>{
            if(item.ERP部门代号==list.wc){
              depament = item.计件工资部门
              this.departments = item
            }
          })
          list.depament = depament
          let JJGZ4_data={
            ITEM:list.daima,
            GX:list.gongxu,
            BM:depament,
          }
          let JJGZ4 = JSON.parse(await this.$api.api.get('/api/JJGZ4',JJGZ4_data)).Table
          list.dinge =JJGZ4==''?'':JJGZ4[0].定额*1
          this.dowmList = list
          this.dowmList.sgxas = ''
    },
    // 关闭弹出框
   dialogClose(){
     let sgxas = ''
     let max = ''
     this.dowmList.shx.forEach((item)=>{
       if(item.value!=''){
         sgxas = sgxas==''?item.name.split('%')[0]+':'+item.value:sgxas+';'+item.name.split('%')[0]+':'+item.value
         max = max*1+item.value*1
       }
     })
      this.dowmList.sgxas = sgxas
      this.$set(this.dowmList)
      this.smaxNum = max
   },
  //  完成数量输入
    changeInput(e){
      var rex = /^[1-9]{1}[0-9]*$/;
      if(rex.test(e)== true){
        this.isDowm = false
        this.dowmList.gongzi = Math.floor(e*this.dowmList.dinge * 100) / 100
      }else{
        this.isDowm = true
        this.dowmList.gongzi = '计算错误，数量只能是不以0开头的数字'
      }
    },
    // 本工序不良数输入
    schangeInput(e){
      var rex = /^[1-9]{1}[0-9]*$/;
        if(rex.test(e)== true||e==''){
          this.isDowm = false
          this.dowmList.gongzi = Math.floor(this.maxNum*this.dowmList.dinge * 100) / 100
        }else{
          this.isDowm = true
          this.dowmList.gongzi = '计算错误，数量只能是不以0开头的数字'
        }
    },
    // 保存
    async btnClick(){
      let maxValue = JSON.parse(await this.$api.api.get('/api/JJSH',{job:this.dowmList.gongdan})).Table[0].计划数量
      let JJGZ4_datas={  BM:this.dowmList.depament, ITEM:this.dowmList.daima, GD:this.dowmList.gongdan, GX:this.dowmList.gongxu,}
      let JJGZ4s = JSON.parse(await this.$api.api.get('/api/JJGZ4',JJGZ4_datas)).Table[0]
      let a = JSON.parse(await this.$api.api.get('/api/JJCS',JJGZ4_datas)).Table[0]
      let bgxwc=JJGZ4s==undefined?0:JJGZ4s.工序完成产量
      let lbgxwc=a==undefined?0:a.工序完成产量
      let lbgxbl=a==undefined?0:a.不良和
      maxValue = maxValue-bgxwc-lbgxwc+lbgxbl
      if(this.maxNum>maxValue||this.smaxNum>maxValue||this.bmaxNum>maxValue){
        if(this.maxNum>maxValue){
          this.$alert('数量与需求数量不符,最大可填'+maxValue, '提示', {
            confirmButtonText: '去修改',
            cancelButtonText: false,
            showClose:false,
            type: 'warning'
          }).then(() => {
            this.$refs['mark'].focus()
          })
        }
        if(this.smaxNum>maxValue){
          this.$alert('上工序报废数量与需求数量不符,最大可填'+maxValue, '提示', {
            confirmButtonText: '去修改',
            cancelButtonText: false,
            showClose:false,
            type: 'warning'
          }).then(() => {
            this.$refs['smark'].focus()
            
          })
        }
        if(this.bmaxNum>maxValue){
          this.$alert('本工序报废数量与需求数量不符,最大可填'+maxValue, '提示', {
            confirmButtonText: '去修改',
            cancelButtonText: false,
            showClose:false,
            type: 'warning'
          }).then(() => {
            this.$refs['bmark'].focus()
          })
        }
      }else{
        let data = {
          d1:this.timeValue,
          d2:this.dowmList.depament,
          d3:'工单',
          d4:this.dowmList.gonghao,
          d5:this.dowmList.gongdan,
          d6:this.dowmList.gongxu,
          d7:this.maxNum,
          d8:0,
          d9:0,
          d10:0,
          d12:this.name,
          d13:this.dowmList.gongxuName,
          d14:this.dowmList.dinge,
          d15:this.dowmList.gongzi,
          d16:this.dowmList.xinghao,
          d17:this.dowmList.daima,
          d18:this.dowmList.sgxas,
          d19:this.bmaxNum==''?0:this.bmaxNum,
        }
        let access_token_data = { corpid : 'ww4b634cb35b1893b8',  corpsecret:'o5BxlqjjA7zgENfx9iOyLpV9UpQmezhIiQ8T42wBTZ8' }
        let access_token = JSON.parse(await this.$api.api.get('/api/weixin',access_token_data)).access_token
        let reportList = JSON.parse(await this.$api.api.get('/api/reportto',{userid:'系统',modu:'消息推送授权-前台-不良品返修人员-'+this.departments.ERP部门})).Table[0]
        this.$api.post('/api/jgz',data,res=>{
          this.chakan = true
          this.isDowm = true
          this.smaxNum = data.d18
          this.bmaxNum = data.d19
          if(reportList!=undefined){
            let report = reportList.汇报给ID.replace(/,/g,"|")
            if(data.d18!=''){
              this.dowmList.shx.forEach((item)=>{
                if(item.value!=''){
                   let dclsss = '## '+this.departments.ERP部门+'不良品反馈\n>**日期**：<font color=\'info\'>'+data.d1+'</font>\n>**工单**：<font color=\'info\'>'+data.d5+'</font>\n>**产品型号**：<font color=\'info\'>'+data.d16+'</font>\n>'+'**工序**：<font color=\'info\'>'+item.name.split('%')[1]+'</font>\n>'+'**不良数量**：<font color=\'info\'>'+item.value+'</font>\n>'+'**反馈人**：<font color=\'info\'>'+data.d12+'</font>\n>'
                    let sgx_data = {
                      access_token:access_token,
                      touser:report, 
                      msgtype:"markdown",
                      agentid:"1000068",
                      content:dclsss
                    }
                    this.$api.post('/api/Message1',sgx_data,res=>{})
                    let slp_data = {
                      a0:this.departments.ERP部门代号,
                      a1:data.d1,
                      a2:data.d5,
                      a3:data.d16,
                      a4:'',
                      a5:item.value,
                      a6:'',
                      a7:'',
                      a8:'',
                      a9:'',
                      a10:'',
                      a11:getData.dateUtils.today({allTimeSign:true}),
                      a12:data.d4+'/'+data.d12,
                      a13:reportList.汇报给ID,
                      a14:item.name.split('%')[0]+'/'+item.name.split('%')[1],
                      a15:''
                    }
                    this.$api.post('/api/FXJL',slp_data,res=>{})
                }
              })
            }
            this.$alert('保存成功，点击查看', '提示', {
              confirmButtonText: '查看',
              cancelButtonText: false,
              showClose:false,
              type: 'success'
            })
          }else{
            this.$alert('没有推送对象只保存报产，不保存返修记录', '提示', {
              confirmButtonText: '请联系管理员',
              cancelButtonText: false,
              showClose:false,
              type: 'success'
            })
          }
          
        })
        
      }
      
 
    }
  }
}
</script>

<style>
.el-message-box{
  width:90% !important
}
.box{
    border: 1px solid #000
}
  .el-row {
    /* margin-bottom: 20px; */
    border-top: 1px solid #000
   
  }
  .el-row:first-child{
      border-top: 0px solid #000
  }
  .el-col {
    /* border-radius: 4px; */
    border-left: 1px solid #000
  }
  .el-col:first-child{
      border-left: 0px solid #000
  }
  .grid-content {
    /* border-radius: 4px; */
    min-height: 40px;
    line-height: 40px;
    font-weight: bold
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .print{
    /* width:280px; */
    position: relative;
    border: 1px solid #000;
    text-align: left;
  }
  .print .grid-content{
    min-height: 30px;
    line-height: 30px;
    font-weight: bold
  }
  .el-input__inner{
    font-weight: bold;
    padding: 0px !important
  }
  .el-input{
    font-weight: bold;
    width: 100% !important
  }
  .el-input__icon{
    display: none !important
  }
</style>