<template>
  <div>
    <el-button :disabled="baocuns==false" class="btn-orange" style="position: absolute;top: 5px;z-index: 100;right: 50px;"  @click="clicks">扫一扫</el-button>
    <el-table :data="tableData" border  style="width: 100%">
      <el-table-column label="送货单签收">
        <el-table-column label="发货方">
          <el-table-column label="收货方">
            <el-table-column label="编号">
              <el-table-column min-width="15%" prop="gongdan" label="工单号"></el-table-column>
            </el-table-column>
            <el-table-column :label="bianbao">
              <el-table-column min-width="20%" prop="xinghao" label="型号"></el-table-column>
            </el-table-column>
          </el-table-column>

        </el-table-column>
        <el-table-column :label="fahuo">
          <el-table-column :label="shouhuo">
            <el-table-column label="制单">
              <el-table-column min-width="15%" prop="shuliang" label="数量"></el-table-column>
              <el-table-column min-width="15%" prop="shuliangKG" label="数量KG"></el-table-column>
            </el-table-column>
            <el-table-column :label="zhidan">
              
              <el-table-column v-if="value==1" min-width="20%" label="品管">
                <template slot-scope="scope">
                  <el-select :disabled="scope.row.disabled" @change="pinguanChange" v-model="scope.row.品管" placeholder="请选择">
                    <el-option
                      v-for="item in pinguanData"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column v-if="value==2" min-width="20%" label="送货">
                 <template slot-scope="scope">
                   <el-input :disabled="scope.row.disabled" @input="songhuoChange" class="readyonly" v-model="scope.row.送货"/>
                 </template>
              </el-table-column>
              <el-table-column v-if="value==3" min-width="20%" label="收货">
                <template slot-scope="scope">
                  <el-input :disabled="scope.row.disabled" @input="changeInput" class="readyonly" v-model="scope.row.收货"/>
                </template>
              </el-table-column>
              <el-table-column v-if="value==4" min-width="20%" label="放行">
                <template slot-scope="scope">
                  <el-input :disabled="scope.row.disabled" @input="fangxingChange" class="readyonly" v-model="scope.row.放行"/>
                </template>
              </el-table-column>
              <el-table-column prop="qianming"  min-width="15%" :label="qianming+'签名'"></el-table-column>
            </el-table-column>
            
          </el-table-column>

        </el-table-column>
      </el-table-column>
    </el-table>
    <el-dialog title="类型选择" @close="dialogClose" :visible.sync="dialogFormVisible">
      <el-select v-model="value" @change="selectChange" placeholder="请选择类型">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :disabled="item.disabled" :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="input" v-if="guest" :disabled="value==''" placeholder="请输入姓名"></el-input>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button @click="dialogVisible = false">取 消</el-button> -->
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-button type="primary" v-if="huanqi" @click="dialogFormVisible = true">唤起签收界面</el-button>
    <el-button @click="sub" :disabled="baocuns" type="success">保存</el-button>
  </div>
</template>

<script>
import * as getData from '../api/getDate';
import wx from 'weixin-js-sdk'

  export default {
    data() {
     
      return {
        // 编号
        bianbao:'',
        // 状态列表
        pinguanData:[
          {  value: '合格', label: '合格' },
          {  value: '不合格', label: '不合格' },
          {  value: '特采', label: '特采' },
        ],
        pinguanValue:'',
        // 签名
        qianming:'',
        a:'',

        // 制单
        zhidan:'',
        // 收货
        shouhuo:'',
        // 发货
        fahuo:'',
        // 不是企业微信进入姓名
        input:'',
        // 不是企业微信进入类型
        value:'',
        disabled:false,
        // 是否可保存
        baocuns:true,
        yanzhengVisible:false,
        // 是否为企业微信进入
        guest:false,
        // 弹窗
        dialogFormVisible:true,
        // 是否可唤起签名
        huanqi:true,
        // 数据
        tableData: [ ],
        // 身份列表
        options: [
          { value: '1', label: '品管'  }, 
          { value: '2', label: '送货'  }, 
          { value: '3',  label: '收货'  }, 
          { value: '4', label: '放行' }
        ],
      }

    },
    created(){
       this.config()
    },
    methods:{
      // 初始化数据
      async config(){
        if(this.$store.state.userid=='guest'){this.guest = true }
        let corpid = 'ww4b634cb35b1893b8'
        let corpsecret = 'bFQsey2uIhGOvfCb_4o9VA7RW1Nlxe5n9CFanLBxt2U'
        let access_tokenData = {corpid : corpid,corpsecret:corpsecret}
        let access_token = JSON.parse(await this.$api.api.get('/api/weixin',access_tokenData)).access_token
        let userData = { access_token:access_token, department_id:1, fetch_child:1,  }
        let user = JSON.parse(await this.$api.api.get('/api/userlist',userData)).userlist
        let isShf = JSON.parse(await this.$api.api.get('/api/SHF','')).Table
        this.userlist = user
        this.isShfList = isShf
        this.message(this.util.parse_url("state").split('-'))
        let Getsignature = JSON.parse(await this.$api.api.get('/api/QYWXSYS/Getsignature','')).Table[0]
        let time = getData.dateUtils.today({allTimeSign:true})
        let list = ''
        if(Getsignature!=undefined){
          list = {
            timestamp:Getsignature.timestamp.replace(/\s+/g, ""),
            noncestr:Getsignature.noncestr.replace(/\s+/g, ""),
            signature:Getsignature.signature.replace(/\s+/g, ""),
          }
        }else{
          let data = { ABCD:window.location.href.split('#')[0],  }
          let WXSYS = await this.$api.api.get('/api/QYWXSYS',data)
          list = WXSYS
          let datas = {
            a1:WXSYS.noncestr,
            a2:WXSYS.signature,
            a3:WXSYS.timestamp,
          }
          await this.$api.api.get('/api/QYWXSYS/Postsignature',datas)
        }
        
         wx.config({
            beta: true,// 必须这么写，否则wx.invoke调用形式的jsapi会有问题
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            // appId: 'wx3e4661c9761b5cbd', // 必填，企业微信的corpID
            appId: 'ww4b634cb35b1893b8', // 必填，企业微信的corpID  
            timestamp: list.timestamp, // 必填，生成签名的时间戳
            nonceStr: list.noncestr, // 必填，生成签名的随机串
            signature: list.signature,// 必填，签名，见 附录-JS-SDK使用权限签名算法
            jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
        });
        wx.ready(function(){
          console.log('成功')
        });
      },
      // 类型选择
      selectChange(e){
        this.baocuns=false
        if(e==1||e==3){
          this.baocuns=true
        }
      },
      // 品管选择
      pinguanChange(e){
        this.baocuns=false
      },
      songhuoChange(e){
        console.log(e=='')
      },
      // 收货选择
      changeInput(e){
        var rex = /^[1-9]{1}[0-9]*$/;
        if(rex.test(e)== true){
          this.baocuns=false
        }else{
          this.baocuns=true
          this.$message.error('错了哦，数量只能是不以0开头的数字');
        }
      },
      fangxingChange(e){
      
      },
      // 关闭弹窗
      dialogClose(){
        let istrue = false
        this.qianming = this.options[this.value-1].label
        console.log(this.qianming)
        this.tableData.forEach((item)=>{
          if(item[this.value]==''){
            item.disabled=false
            istrue = true
          }else{
            item.disabled=true
            item.qianming = item[this.value]
          }
          if(this.guest==true){
            if(this.input==''){
              item.disabled=true
            }
          }
        })
        if(istrue==true){
          let username = ''
          if(this.guest==true){
            username = this.input
          }else{
            this.userlist.forEach((item)=>{
              if(item.userid==this.$store.state.userid){
                
                username = item.name
              }
            })
          }
          this.tableData.forEach((item)=>{
            if(item[this.value]==''){
              item.qianming = username 
            }
              
            
            })
        }else{
          this.tableData.forEach((item)=>{
            item.qianming = item[this.value]
            
            })
        }
      },
      // 数据处理
      async message(isState){
        let type = this.util.isType(isState[0]).name
        let userid = isState[1]
        let username
        this.userlist.forEach((item)=>{
          
          if(userid == item.userid){
            username = item.name
          }
          
        })
        let id = isState[2]
       
        let shf
        this.isShfList.forEach((item)=>{
          if(item.编号==isState[3]){
            shf = item.收货方.replace(/\s+/g, "")
          }
        })
       
        let data = { a1:type, a2:id, a3:username, a4:shf  }
        let aSHDQS = JSON.parse(await this.$api.api.get('/api/SHDQS',data)).Table
        this.length = aSHDQS.length
        this.shouhuo = aSHDQS[0].收货方
        this.fahuo = aSHDQS[0].发货方.replace(/\s+/g, "")
        this.bianbao = aSHDQS[0].编号.toString()
        this.zhidan = aSHDQS[0].制单
        let list = []
        aSHDQS.forEach((item,index)=>{
          let gongdan = item.工单号.replace(/\s+/g, "")
          let xinghao = item.产品型号==null?'':item.产品型号.replace(/\s+/g, "")
          let 车间 = item.发货方==null?'':item.发货方.replace(/\s+/g, "")
          let 品管 = item.审核==null?'':item.审核.replace(/\s+/g, "")
          let 送货 = item.送货==null?'':item.送货.replace(/\s+/g, "")
          let 收货 = item.收货==null?'':item.收货.replace(/\s+/g, "")
          let 放行 = item.放行==null?'':item.放行.replace(/\s+/g, "")
          let 品管备注 = item.审核备注==null?'':item.审核备注.replace(/\s+/g, "")
          let 送货备注 = item.送货备注==null?'':item.送货备注.replace(/\s+/g, "")
          let 收货备注 = item.收货备注==null?'':item.收货备注.replace(/\s+/g, "")
          let 放行备注 = item.放行备注==null?'':item.放行备注.replace(/\s+/g, "")
          let 计划记录号 = item.计划记录号==null?'':item.计划记录号.replace(/\s+/g, "")
          let id = item.记录号
          let 编号 = item.编号
          let wc = item.车间编号==null?'':item.车间编号.replace(/\s+/g, "")
          let time = item.交期==null?'':item.交期.replace(/\s+/g, "")
          let shuliang = item.数量PCS==null?'':item.数量PCS*1
          let numbers = item.数量KG==null?'':item.数量KG*1
          console.log(numbers)
          let type = item.类型==null?'':item.类型.replace(/\s+/g, "")
           list.push({
            gongdan:gongdan,
            xinghao:xinghao,
            shuliang:shuliang,
            shuliangKG:numbers,
            types:type,
            time:time,
            wc:wc,
            id:id,
            1:品管,
            2:送货,
            3:收货,
            4:放行,
            品管:品管备注,
            送货:送货备注,
            收货:收货备注,
            放行:放行备注,
            车间:车间,
            编号:编号,
            计划记录号:计划记录号
           })
        })
        this.tableData = list
      },
    
    //  保存
      async sub(){
        let dcl_token_data={ corpid : 'ww4b634cb35b1893b8',  corpsecret:'5N2oqnhF6jTeO6VVfaUmnNjyAxsnpzCrCfN6cJL98Io' }
        let dcl_token = JSON.parse(await this.$api.api.get('/api/weixin',dcl_token_data)).access_token
        if(this.guest){
          this.yanzhengVisible=true
        }
        let shenhe_bumen,shenhe_qianming,shenhe_bianhao,sc_zhidan,sc_gongdan,sc_xinghao,sc_zt,sc_num,sc_id
        this.tableData.forEach((item)=>{
          let data,isData
          if(this.value==3||this.value==1){
            if(item[this.options[this.value-1].label]!=''){
              data = {
                a0:this.value,
                a1:item.id,
                a2:item.qianming,
                a3:getData.dateUtils.today({allTimeSign:true}),
                a4:item[this.options[this.value-1].label],
              }
              isData = {
                a0:this.options[this.value-1].label,
                a1:item.time,
                a2:item.gongdan,
                a3:item.qianming,
                a4:item.wc,
                a5:item[this.options[this.value-1].label],
                a6:item.计划记录号
                
              }
              if(this.value==1){
                shenhe_bumen = item.车间
                shenhe_qianming = item.qianming
                shenhe_bianhao = item.编号
                if(item[this.options[this.value-1].label]=='不合格'){
                  sc_zhidan = this.zhidan
                  sc_gongdan = item.gongdan
                  sc_xinghao = item.xinghao
                  sc_zt = '不合格'
                  sc_num = item.shuliang*1
                  sc_id = item.计划记录号
                }
              }
            }
            
          }else{
            data = {
              a0:this.value,
              a1:item.id,
              a2:item.qianming,
              a3:getData.dateUtils.today({allTimeSign:true}),
              a4:item[this.options[this.value-1].label],
            }
          }
          
          if(data!=undefined&item.disabled==false){
              this.$api.post('/api/SHDQS',data,res=>{
                
              })
          }
          if(isData!=undefined&item.disabled==false){
            if(this.fahuo=='宗联机'){
              let isDatas = {
                a0:this.options[this.value-1].label,
                a1:item.time,
                a2:item.gongdan,
                a3:item.qianming,
                a4:item.wc,
                a5:item[this.options[this.value-1].label],
              }
              this.$api.post('/api/SCJHWGSHZLJ',isDatas,res=>{})
            }
             this.$api.post('/api/SCJHWGSH',isData,res=>{})
          }
          
        })
        
        if(shenhe_bianhao!=undefined){
          let reportto_data = {userid:'系统',modu:'消息推送授权-前台-送货单品管到仓库-'+shenhe_bumen}
          let reportList = JSON.parse(await this.$api.api.get('/api/reportto',reportto_data)).Table
          let dclsss = dclsss = '## '+shenhe_bumen+'送货单签收\n'+getData.dateUtils.today({ymrSign:true})+'\n>**品管**：<font color=\'info\'>'+shenhe_qianming+'</font>\n>**编号**：<font color=\'info\'>'+shenhe_bianhao+'</font>\n>**请仓库及时核查**'
          if(reportList!=''){
                let report = reportList[0].汇报给ID.replace(/,/g,"|")
                let tuisong_data = {
                    access_token:dcl_token,
                    touser:report, 
                    msgtype:"markdown",
                    agentid:"1000062",
                    content:dclsss
                }
                this.$api.post('/api/Message1',tuisong_data,res=>{})
            }
        }
        if(sc_zt!=undefined){
          let reportto_data = {userid:'系统',modu:'消息推送授权-前台-送货单品管到生产-'+shenhe_bumen}
          let reportList = JSON.parse(await this.$api.api.get('/api/reportto',reportto_data)).Table
          let dclsss = dclsss = '## 品管核查不合格工单\n'+getData.dateUtils.today({ymrSign:true})+'\n>**部门**：<font color=\'info\'>'+shenhe_bumen+'</font>\n>**制单**：<font color=\'info\'>'+sc_zhidan+'</font>\n>**品管**：<font color=\'info\'>'+shenhe_qianming+'</font>\n>**工单**：<font color=\'info\'>'+sc_gongdan+'</font>\n>**型号**：<font color=\'info\'>'+sc_xinghao+'</font>\n>**状态**：<font color=\'info\'>'+sc_zt+'</font>\n>**请生产及时返修**'
          if(reportList!=''){
                let report = reportList[0].汇报给ID.replace(/,/g,"|")
                let tuisong_data = {
                    access_token:dcl_token,
                    touser:report, 
                    msgtype:"markdown",
                    agentid:"1000062",
                    content:dclsss
                }
                this.$api.post('/api/Message1',tuisong_data,res=>{})
                let dataa = {
                    a3:sc_id,
                    a4:sc_num,
                    a5:sc_zhidan,
                    a6:'',
                    a7:2,
                }
                if(this.fahuo=='宗联机'){
                  let sc_data = {
                      a3:sc_gongdan,
                      a4:sc_num,
                      a5:sc_zhidan,
                      a6:'',
                      a7:2,
                  }
                  this.$api.post('/api/SCJHWGZLJ',sc_data,res=>{})
                }
                this.$api.post('/api/SCJHWG',dataa,res=>{})
            }
        }
       this.baocuns = true
       this.huanqi = false
       this.$message({
            type: 'success',
            message: '保存成功!' 
        });
   
      },
      // 扫一扫
      clicks(){
        this.qianming = ''
         wx.scanQRCode({
            desc: 'scanQRCode desc',
            needResult: 1, // 默认为0，扫描结果由企业微信处理，1则直接返回扫描结果，
            scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是条形码（一维码），默认二者都有
            success: (res)=>{
               this.tableData=[
                { gongdan: '品管', xinghao: '',  shuliang: '备注', shuliangKG: '',input:false }, 
                { gongdan: '送货',  xinghao: '', shuliang: '备注', shuliangKG: '', input:false},
                
                { gongdan: '收货', xinghao: '', shuliang: '备注', shuliangKG: '', input:false},
                {  gongdan: '放行', xinghao: '',  shuliang: '备注', shuliangKG: '', input:false},
              ]
              this.options=[
                { value: '1', label: '品管'  }, 
                { value: '2', label: '送货'  }, 
                { value: '3',  label: '收货'  }, 
                { value: '4', label: '放行' }
              ]
              this.huanqi = false
              this.dialogFormVisible = true
              this.value=''
              this.message(res.resultStr.split('=')[1].split('-'))
            },
            error: (res)=>{
                if (res.errMsg.indexOf('function_not_exist') > 0) {
                    alert('版本过低请升级')
                }
            }
        });
      },
    }
  }
</script>
<style  >
  .aaa{
    text-align: center !important
  }
  .el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    padding-left: 0px !important
  }
  .el-table th>.cell,.el-table .cell{
    padding-right: 0px !important
  }
  .el-input__icon{
    width: 15px !important;
  }
  .el-input__inner{
    padding: 0px !important;
  }
  
  html,body{
    margin: 0px;
    padding:0px
  }
</style>