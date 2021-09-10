
<template>
  <div>
    <header-bom :msg="titles"></header-bom>
    <div>
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">部门</div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple-light">{{list.depament}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">工单号</div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple-light"> {{list.工单号}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">型号</div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple-light">{{list.产品型号}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">工序</div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple-light">{{list.工序号}}</div></el-col>
      </el-row>
    </div>
    <div v-if="i==1">
      <el-row>
          <el-col :span="8"><div class="grid-content bg-purple">
            <el-input @input='blInput' v-model="blNum" placeholder="不良原因数量"></el-input>
        </div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple-light" style="display: flex;">
            <el-select v-model="yy" @change="btnChange" :disabled="isDowm" placeholder="不良原因">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button :disabled="isBtn" @click="tjBtn" type="primary">添加</el-button>
        </div></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">数量</div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple-light">
            <el-input @input="maxInput" v-model="num" placeholder="数量"></el-input>    
        </div></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">不良陈述</div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple-light">{{bicl}}</div></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">处理方式</div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple-light">
            <el-input  v-model="chfs" placeholder="处理方式"></el-input>
        </div></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">修复数量</div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple-light">
            <el-input @input="xfInput"  v-model="xfsl" placeholder="修复数量"></el-input>    
        </div></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div class="grid-content bg-purple">报废数量</div></el-col>
        <el-col :span="16"><div class="grid-content bg-purple-light">
            <el-input @input="bfInput"  v-model="bfsl" placeholder="报废数量"></el-input> 
        </div></el-col>
      </el-row>
      
    </div>
    <div v-if="i==2">
        <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">数量</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple-light">{{list.数量}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">不良陈述</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple-light">{{list.不良陈述}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">处理方法</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple-light">{{list.处理方法}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">修复数量</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple-light">{{list.修复数量}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">报废数量</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple-light">{{list.损废数量}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">QC说明</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple-light">
                <el-input  v-model="qc" placeholder="QC说明"></el-input>
            </div></el-col>
        </el-row>
    </div>
    <div v-if="i==3">
        <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">数量</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple-light">{{list.数量}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">不良陈述</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple-light">{{list.不良陈述}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">处理方法</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple-light">{{list.处理方法}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">修复数量</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple-light">{{list.修复数量}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">报废数量</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple-light">{{list.损废数量}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="8"><div class="grid-content bg-purple">生产说明</div></el-col>
            <el-col :span="16"><div class="grid-content bg-purple-light">
                <el-input  v-model="sc" placeholder="生产说明"></el-input>
            </div></el-col>
        </el-row>
    </div>
    <el-col :span="24"><div class="grid-content bg-purple">
            <el-button  @click="bcBtn" type="primary">保存</el-button>
        </div></el-col>
  </div>
</template>


<script>
import * as getData from '../api/getDate';
  export default {
    data() {
      return {
        // 标题列表
        title:['返修','品管审核','生产签收'],
        // 权限
        i:'',
        admin:0,
        // 数据列表
        list:[],
        // 标题
        titles:'',
        // 不良原因数量
        blNum:'',
        // QC说明
        qc:'',
        // 生产说明
        sc:'',
        // 不良原因
        yy:'',
        // 处理方式
        chfs:'',
        // 报废数量
        bfsl:'',
        // 修复数量
        xfsl:'',
        // 不良原因是否可输入
        isDowm:true,
        // 不良原因是否可添加
        isBtn:true,
        // 数量
        num:'',
        // 不良原因列表
        options: [{
          value: '新增',
          label: '新增'
        }],
        // 不良陈述
        bicl:'',
      };
    },
    created(){
        this.list = this.$route.query.list
        this.num = this.$route.query.list.num
        this.i = this.$route.query.i
        this.titles={
            a:{name:'应用程序',path:'/pages/index/index'},
            b:{name:this.title[this.i-1]+'列表',path:'/index'},
            c:{name:this.title[this.i-1],path:'/change'},
        }
        let data = {
          bm:this.$route.query.list.depamentList.计件工资部门,
          gxh:this.$route.query.list.工序号.split('/')[0]
        }
        this.$api.get('/api/BLYY',data,res=>{
          console.log(JSON.parse(res.data).Table)
          if(JSON.parse(res.data).Table!=''){
            JSON.parse(res.data).Table.forEach((item)=>{
              this.options.push({
                label:item.不良原因.replace(/\s+/g, ""),
                value:item.不良原因.replace(/\s+/g, ""),
              })
            })
            
          }
        })

    },
    methods: {
      // 不良原因输入
        blInput(e){
            var rex = /^[1-9]{1}[0-9]*$/;
            if(rex.test(e)== true){
                this.isDowm = false
            }else{
                this.isDowm = true
                this.blNum = ''
            }
        },
        // 不良原因新增/选择
        btnChange(e){
          if(e=='新增'){
            this.$prompt('请输入新增的不良原因', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              
            }).then(({ value }) => {
              let data = {
                bm:this.$route.query.list.depamentList.计件工资部门,
                gxh:this.$route.query.list.工序号.split('/')[0],
                gxm:this.$route.query.list.工序号.split('/')[1].replace(/\s+/g, ""),
                bl:value,
                userid:this.util.parse_url("userid"),
                date:getData.dateUtils.today({ymrSign:true})

              }
              this.$api.post('/api/BLYY',data,res=>{

              })
              this.yy = value
              this.options.push({
                label:value,
                value:value,
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消新增'
              });
              this.yy=''   
            });
          }
          this.isBtn = false
        },
        // 不良原因添加
        tjBtn(){
            let a = this.bicl==''?'':this.bicl+';'
            this.bicl = a+this.blNum+'*'+this.yy
            this.blNum = ''
            this.yy = ''
            this.isDowm = true
            this.isBtn=true
        },
        // 数量输入
        maxInput(e){
            var rex = /^[1-9]{1}[0-9]*$/;
            if(rex.test(e)== true){
                
            }else{
                this.num=''
            }
        },
        // 修复数量输入
        xfInput(e){
            var rex = /^[1-9]{1}[0-9]*$/;
            if(rex.test(e)== true){
                if(e*1<=this.list.num*1){

                }else{
                   this.xfsl='' 
                }
            }else{
                this.xfsl=''
            }
        },
        // 报废数量输入
        bfInput(e){
            var rex = /^[1-9]{1}[0-9]*$/;
            if(rex.test(e)== true){
                if(e*1<=this.list.num*1-this.xfsl*1){

                }else{
                   this.bfsl='' 
                }
            }else{
                this.bfsl=''
            }
        },
        // 保存
        async bcBtn(){
            let access_token_data = { corpid : 'ww4b634cb35b1893b8',  corpsecret:'o5BxlqjjA7zgENfx9iOyLpV9UpQmezhIiQ8T42wBTZ8' }
            let access_token = JSON.parse(await this.$api.api.get('/api/weixin',access_token_data)).access_token
            let data,ts_data
            if(this.$route.query.i==1){
                let reportList = JSON.parse(await this.$api.api.get('/api/reportto',{userid:'系统',modu:'消息推送授权-前台-不良品品管确认-'+this.list.depament})).Table[0]
                if(reportList!=undefined){
                  data = {
                    ID:this.list.id,
                    b0:this.$route.query.i,
                    a0:this.bicl,//不良陈述
                    a1:this.num,//数量
                    a2:this.chfs,//处理方法
                    a3:reportList.汇报给ID,//确认QC
                    a4:this.xfsl,//修复数量
                    a5:this.bfsl,//损废数量
                    a6:this.util.parse_url("userid"),//维修签名
                    a7:'',//QC签名
                    a8:'',//QC说明
                    a9:'',//生产应签名
                    a10:'',//生产签名
                    a11:''//生产签收说明
                }
                    let report = reportList.汇报给ID.replace(/,/g,"|")
                    let time= getData.dateUtils.today({ymrSign:true})
                    let dclsss = '## '+this.list.depament+'返修人员申请,请确认\n>**日期**：<font color=\'info\'>'+time+'</font>\n>**工单**：<font color=\'info\'>'+this.list.工单号+'</font>\n>**产品型号**：<font color=\'info\'>'+this.list.产品型号+'</font>\n>'+'**工序**：<font color=\'info\'>'+this.list.工序号+'</font>\n>'+'**不良数量**：<font color=\'info\'>'+this.list.num+'</font>\n>'+'**反馈人**：<font color=\'info\'>'+'陈坤'+'</font>\n>'
                    ts_data = {
                        access_token:access_token,
                        touser:report, 
                        msgtype:"markdown",
                        agentid:"1000068",
                        content:dclsss
                    }
                    this.$api.post('/api/Message1',ts_data,res=>{})
                }
            }
            if(this.$route.query.i==2){
                let reportList = JSON.parse(await this.$api.api.get('/api/reportto',{userid:'系统',modu:'消息推送授权-前台-不良品生产接收-'+this.list.depament})).Table[0]
                if(reportList!=undefined){
                  data = {
                    ID:this.list.id,
                    b0:this.$route.query.i,
                    a0:this.list.不良陈述,//不良陈述
                    a1:this.list.数量,//数量
                    a2:this.list.处理方法,//处理方法
                    a3:this.list.确认QC,//确认QC
                    a4:this.list.修复数量,//修复数量
                    a5:this.list.损废数量,//损废数量
                    a6:this.list.维修签名,//维修签名
                    a7:this.util.parse_url("userid"),//QC签名
                    a8:this.qc,//QC说明
                    a9:reportList.汇报给ID,//生产应签名
                    a10:'',//生产签名
                    a11:''//生产签收说明
                }
                    let report = reportList.汇报给ID.replace(/,/g,"|")
                    let time= getData.dateUtils.today({ymrSign:true})
                    console.log(report)
                    let dclsss = '## '+this.list.depament+'品管申请,请签收\n>**日期**：<font color=\'info\'>'+time+'</font>\n>**工单**：<font color=\'info\'>'+this.list.工单号+'</font>\n>**产品型号**：<font color=\'info\'>'+this.list.产品型号+'</font>\n>'+'**工序**：<font color=\'info\'>'+this.list.工序号+'</font>\n>'+'**不良数量**：<font color=\'info\'>'+this.list.num+'</font>\n>'+'**反馈人**：<font color=\'info\'>'+'陈坤'+'</font>\n>'
                    ts_data = {
                        access_token:access_token,
                        touser:report, 
                        msgtype:"markdown",
                        agentid:"1000068",
                        content:dclsss
                    }
                    this.$api.post('/api/Message1',ts_data,res=>{})
                }
            }
            if(this.$route.query.i==3){
                data = {
                    ID:this.list.id,
                    b0:this.$route.query.i,
                    a0:this.list.不良陈述,//不良陈述
                    a1:this.list.数量,//数量
                    a2:this.list.处理方法,//处理方法
                    a3:this.list.确认QC,//确认QC
                    a4:this.list.修复数量,//修复数量
                    a5:this.list.损废数量,//损废数量
                    a6:this.list.维修签名,//维修签名
                    a7:this.list.QC签名,//QC签名
                    a8:this.list.QC说明,//QC说明
                    a9:this.list.生产应签名,//生产应签名
                    a10:this.util.parse_url("userid"),//生产签名
                    a11:this.sc//生产签收说明
                }
            }
            this.$api.post('/api/FXJL1',data,res=>{
               this.$message({
                    type: 'success',
                    message: '保存成功'
                });
            })
        }
      
    }
  };
</script>
<style >

  .el-col {
    border-radius: 4px;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
        line-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-message-box{
    width: 90% !important
  }
</style>