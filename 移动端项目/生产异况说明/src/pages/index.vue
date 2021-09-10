<template>
  <div>
      
    <header-bom :msg="titles"></header-bom>
    <div class="jilu-link">
        <router-link to="/index">报告</router-link>
        <div class="border"></div>
        <router-link to="/chaxun" >查询</router-link>
        <div class="border"></div>
        <router-link to="/shenhe" >审核</router-link>
    </div>
    <el-form ref="form" :rules="rules"  :label-position="labelPosition" :model="form" label-width="80px">
        <el-form-item label="部门" prop="bumen">
            <el-input disabled v-model="form.bumen"></el-input>
        </el-form-item>
        <el-form-item label="交期"  prop="date2">
            <el-date-picker type="date" :disabled="dateDisabled" placeholder="选择交期" @change="changes" v-model="form.date2" style="width: 100%;"></el-date-picker>
        </el-form-item>
        <el-form-item label="工单号" prop="gongdan" class="aa">
            <el-select style="text-align:center" @change="chenks" :disabled="dateDisabled" v-model="form.gongdan" placeholder="请选择工单">
                <el-option   v-for="(item,index) in list" :key="index" :label="item.split('/')[0]" :value="item">
                    <span style="float: left">{{ item.split('/')[0] }}%</span>
                    <span style="float: left">{{ item.split('/')[1] }}%</span>
                    <span style="float: left">{{ item.split('/')[2] }}</span>
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="报告人"  prop="name1">
            <el-input disabled v-model="form.name1"></el-input>
        </el-form-item>
        <el-form-item label="审核人" prop="name2">
            <el-input disabled v-model="form.name2"></el-input>
        </el-form-item>
        <el-form-item label="审核状态" prop="state">
            <el-input disabled v-model="form.state"></el-input>
        </el-form-item>
        <el-form-item  label="计划数" prop="nub1">
        <el-input v-model="form.nub1" disabled></el-input>
        </el-form-item>
        <el-form-item  label="完成数" prop="nub2">
            <el-input v-model="form.nub2" disabled></el-input>
        </el-form-item>
        
        <el-form-item label="类型" prop="type">
            <el-select :disabled="dateDisabled" v-model="form.type" placeholder="请选择">
                <el-option
                v-for="item in type"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
           
        </el-form-item>
        
        <el-form-item label="说明情况" prop="liyou">
            <el-input type="textarea" :disabled="dateDisabled" v-model="form.liyou"></el-input>
        </el-form-item>
        <el-form-item class="item">
            <el-button type="primary" v-if="chakanDisabled==false" :disabled="zhuangtais==1" @click="submitForm('form')">提交申请</el-button>
            <el-button :disabled="dateDisabled"  @click="resetForm('form')">重置</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>

<script>
import * as getData from '../api/getDate';
import wx from 'weixin-js-sdk'
export default {
    data(){
        return{
            // 输入框是否可选
            dateDisabled:false,
            // 是否展示提交申请
            chakanDisabled:false,
            // 类型列表
            type:[ ],
            // 定位
            labelPosition: 'left',
            value:'',
            // 是否可提交申请
            zhuangtais:0,
            // 工单列表
            list:[],
            allLists:'',
            // 数据
            form: {
                // chaxun:'',
                type:'',//类型
                gongdan: '',//工单
                date2: '',//时间
                nub1: 0,//计划数
                nub2: 0,//完成数
                name1: this.$store.state.name,//报告人
                name2:'',//审核人
                bumen:this.$store.state.bumen.split('/')[1],//部门
                liyou:'',//理由
                state:'',//状态
            },
            //表单验证
            rules: {
                gongdan: [{ required: true, message: '请填写工单号' ,}],
                type: [{ required: true, message: '请选择类型' ,}],
                date2: [{  required: true, validator: this.startDate}],
                liyou: [{ required: true, message: '请填写说明情况'}],
           
            }
        }
        
    },
    created(){
        this.titles={
            a:{name:'应用程序',path:'/pages/index/index'},
            b:{name:'报告',path:'/index'},
        } 
        this.getData()
    },

    methods: {
    //    初始化数据
        async getData(){
            let adata = { corpid : 'ww4b634cb35b1893b8',  corpsecret:'bFQsey2uIhGOvfCb_4o9VA7RW1Nlxe5n9CFanLBxt2U' }
            let access_token = JSON.parse(await this.$api.api.get('/api/weixin',adata)).access_token
            let type = JSON.parse(await this.$api.api.get('/api/Planss','')).Table 
            this.type = type.map((item)=>{
                return{
                    value:item.类型.replace(/\s+/g, ""),
                    label:item.类型.replace(/\s+/g, "")
                }
            })
            let list = JSON.parse(await this.$api.api.get('/api/WC','')).Table
            let depament
            console.log(list)
            list.forEach((item)=>{
                if(this.$store.state.bumen.indexOf('/')!=-1){
                    if(item.企业微信部门==this.$store.state.bumen.split('/')[1]){
                        console.log(item.ERP部门代号)
                        depament = item
                    }
                }else{
                    if(item.ERP部门代号 ==this.$store.state.bumen){
                        depament=item
                    }
                }
                
            })
            this.depament = depament
            console.log(depament)
            let data = {m4:this.$store.state.userid,m1:'移动端授权-应用程序展示-生产异况说明-'+depament.ERP部门 }
            let List = JSON.parse(await this.$api.api.get('/api/TSPL',data)).Table[0]
            if(List.增*1==1){
                let datas = { userid:'系统', modu:'消息推送授权-前台-生产计划报告-'+depament.ERP部门}
                let reportList = JSON.parse(await this.$api.api.get('/api/reportto',datas)).Table[0]
                if(reportList!=undefined){
                    this.report = reportList.汇报给
                    this.access_token = access_token
                    this.reportid = reportList.汇报给ID
                }
                
                
            }else{
                this.dateDisabled = true
                this.chakanDisabled = true
                this.zhuangtais = 1
            }
            if(this.$store.state.gongdan){
                console.log(this.$store.state.date)
                this.form.date2=this.$store.state.date
                this.changes(this.$store.state.date)
            }
        },
        // 表单验证函数==校验日期
        startDate(rule, value, callback){
            if (!value) { callback(new Error('请填写交期！'));
            }else{
                this.newtime = this.util.dateFormat("YYYY-mm-dd", value)
                let beforeYesterday = getData.dateUtils.beforeYesterday({ymrSign:true})
                if(this.newtime >=beforeYesterday){
                    callback()
                }else{
                    callback(new Error('只能选择今天和昨天的交期'));
                    
                }
               
                
            }
        },
        // 提交表单
        submitForm(formName) {
            let hh = new Date().getHours()<10 ? '0'+new Date().getHours() : new Date().getHours();
            let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
            let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
            let times = hh+':'+mf+':'+ss//定时器时分秒
            let today = getData.dateUtils.today({allTimeSign:true})
            this.$refs[formName].validate((valid) => {
            if (valid) {
                console.log(this.form)
                let data = {
                    a0:1,
                    a1:this.form.chejian,
                    a2:this.util.dateFormat("YYYY-mm-dd", this.form.date2),
                    a3:this.form.gongdan.split('/')[0],
                    a4:this.form.name1,
                    a5:today,
                    a6:this.form.liyou,
                    a7:this.form.name2,
                    a8:'',
                    a9:'',
                    a10:'',
                    a11:this.form.type,
                    a12:this.form.nub1,
                    a13:this.xinghao,
                    a14:this.form.riqi,
                    a15:this.form.nub2,
                }
                let baocun={
                    date:today,
                    puser:this.$store.state.userid,
                    mname:'生产异况说明',
                    pto:this.reportid,
                    ptext:this.$store.state.name+'提交了报告#部门：'+this.form.bumen+'#立即审核',
                    dress:"https://www.zanty.net:8108?shenhe=1",
                }
                let report = this.reportid.replace(/,/g,"|")
                let tuisong = {
                    access_token:this.access_token,
                    touser:report,
                    page:"pages/index/index",
                    title:"生产异况说明",
                    description:today,
                    key:this.$store.state.name+'提交了报告',
                    value:"立即审核"
                    
                }
                this.$api.post('api/PushMes',baocun,res=>{})
                if(this.reportid!=undefined){
                    this.$api.post('/api/Message',tuisong,res=>{})
                }
                
                this.$api.post('/api/Planss',data,res=>{
                    this.$message({
                        message: '保存成功',
                        type: 'success'
                    });
                    this.resetForm('form')
                })
                
            } else {
                return false;
            }
            });
        },
        // 工单号查询
        async chenks(e){
            let time = getData.dateUtils.today({ymrSign:true})
            let totime = getData.dateUtils.tomorrow({ymrSign:true})
            let yesterday = getData.dateUtils.yesterday({ymrSign:true})
            let beforeYesterday = getData.dateUtils.beforeYesterday({ymrSign:true})
            let list 
            this.allList.forEach((item)=>{
                if(e ==item.yes){
                    let bumen = this.depament.ERP部门
                    list = item 
                    this.form.nub1 = item.shuliang
                    this.form.nub2 = item.wancheng
                    this.form.state = item.shenhe
                    this.form.liyou = item.yuanyin
                    this.form.type = item.type
                    this.form.riqi = item.riqi
                    this.form.bumen = this.depament.ERP部门
                    this.form.chejian = this.depament.ERP部门代号
                    this.xinghao = item.xinghao
                    if(this.newtime >=beforeYesterday&item.yuanyin==''){
                         this.zhuangtais =0
                    }else{
                        this.zhuangtais =1
                    }
                   
                }
            })
            
        },
        // 交期查询
        async changes(e){
                this.form.name2 = this.report
                this.list = []
                this.form.gongdan = ''
                this.form.nub1 = 0
                this.form.nub2 = 0
                let data = { bm:this.depament.ERP部门代号, date1:this.util.dateFormat("YYYY-mm-dd", e), date2:this.util.dateFormat("YYYY-mm-dd", e) }
                let allList = allList = JSON.parse(await this.$api.api.get('/api/HT2',data)).Table
                let list = []
                allList.forEach((item)=>{
                    let th1 = {wc:item.车间,gdh:item.工单号,jq:item.交期,scrq:item.生产日期}
                    this.$api.get('/api/Planss',th1,res=>{
                            let shenhe,type,yuanyin
                            if(JSON.parse(res.data).Table==''){
                                shenhe = ''
                                type = ''
                                yuanyin = ''
                            }else{
                                type = JSON.parse(res.data).Table[0].类型.replace(/\s+/g, "")
                                yuanyin = JSON.parse(res.data).Table[0].申述原因.replace(/\s+/g, "")
                                if(JSON.parse(res.data).Table[0].审核结果==null){
                                    shenhe = ''
                                }else{
                                    
                                    shenhe = JSON.parse(res.data).Table[0].审核结果.replace(/\s+/g, "")
                                }
                            }
                        
                        let wancheng = item.完成数量==null?'':item.完成数量.replace(/\s+/g, "")
                        let shuliang = item.数量==null?'':item.数量.replace(/\s+/g, "")
                            list.push({
                                gongdan:item.工单号.replace(/\s+/g, ""),
                                jiaoqi:item.交期.replace(/\s+/g, ""),
                                shuliang:shuliang,
                                wancheng:wancheng,
                                riqi:item.生产日期.replace(/\s+/g, ""),
                                xinghao:item.产品型号.replace(/\s+/g, ""),
                                chejian:item.车间.replace(/\s+/g, ""),
                                shenhe:shenhe,
                                type:type,
                                yuanyin:yuanyin,
                                yes:item.工单号.replace(/\s+/g, "")+'/'+item.产品型号.replace(/\s+/g, "")+'/'+item.生产日期.replace(/\s+/g, "")
                            })
                            this.allList = list
                            if(this.allList.length==allList.length){
                                if(this.$store.state.gongdan){
                                        this.form.gongdan = this.$store.state.gongdan
                                        this.chenks(this.$store.state.gongdan)
                                        this.$store.state.gongdan = ''
                                }
                            }

                        })
                        this.list.push(item.工单号.replace(/\s+/g, "")+'/'+item.产品型号.replace(/\s+/g, "")+'/'+item.生产日期.replace(/\s+/g, ""))
                })
        },
        // 重置
        resetForm(formName) {
            this.list = []
            this.value = ''
            this.$refs[formName].resetFields();
            this.form.name2 = this.$store.state.report
        },
       
    },
    watch:{
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

<style >
.el-form{
    width: 80%;
    margin:  0px auto
}
.el-form-item{
    margin-bottom: 15px;
}
    .item .el-form-item__content{
        margin-left: 0px !important
    }
    .aa .el-form-item__content{
        text-align: left
    }
    .aa .el-form-item__content .el-select,.el-select{
        width: 100%
    }
</style>