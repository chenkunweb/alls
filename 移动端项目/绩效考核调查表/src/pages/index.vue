<template>
  <div>
    <header-bom :msg="titles"></header-bom>
    <el-select v-model="value" filterable @change="selectId" placeholder="请选择">
      <el-option  v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <el-row>
      <el-col :span="12"><div class="grid-content ">事故ID</div></el-col>
      <el-col :span="12"><div class="grid-content ">{{id}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="12"><div class="grid-content ">日期</div></el-col>
      <el-col :span="12"><div class="grid-content ">{{time}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="12"><div class="grid-content ">爆料部门</div></el-col>
      <el-col :span="12"><div class="grid-content ">
        <el-select v-model="value1" @change="selectBm" :disabled="a!=1" filterable placeholder="请选择">
          <el-option  v-for="(item,index) in depament" :key="index" :label="item.label" :value="item.value">
          </el-option>
        </el-select>  
      </div></el-col>
    </el-row>
    <el-row>
      <el-col :span="12"><div class="grid-content ">爆料人</div></el-col>
      <el-col :span="12"><div class="grid-content ">{{baoliao}}</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="12"><div class="grid-content ">事故类型</div></el-col>
      <el-col :span="12"><div class="grid-content ">
        <el-select v-model="types"  :disabled="a!=1" filterable placeholder="请选择">
          <el-option  v-for="(item,index) in [{label:'文件',value:'文件'},{label:'品质事故',value:'品质事故'}]" :key="index" :label="item.label" :value="item.value">
          </el-option>
        </el-select>  
      </div></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><div class="grid-content ">事故详情</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><div class="grid-content ">
        <el-input type="textarea" @input="inputXq(2)" :disabled="username!=baoliao" :rows="2" placeholder="请输入内容" v-model="xiangqing"></el-input>
      </div></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><div class="grid-content ">事故调查内容</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><div class="grid-content ">
        <el-input type="textarea" :rows="3" @input="inputXq(3)" :disabled="quanxian.a!=1" placeholder="请输入内容" v-model="diaocha"></el-input>  
      </div></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><div class="grid-content ">稽核审查结果</div></el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><div class="grid-content ">
        <el-input type="textarea" :rows="3" @input="inputXq(4)" :disabled="quanxian.b!=1" placeholder="请输入内容" v-model="jicha"></el-input> 
      </div></el-col>
    </el-row>
    <div v-for="(item,index) in list" :key="index">
      <el-row>
        <el-col :span="8"><div class="grid-content ">责任人</div></el-col>
        <el-col :span="8"><div class="grid-content ">{{item.value1}}</div></el-col>
        <el-col :span="8"><div class="grid-content caozuo">
          <el-button type="primary" :disabled="quanxian.c!=1"  @click="dels(7,2,index)">修改</el-button>
          <el-button type="primary" :disabled="quanxian.c!=1" @click="dels(5,3,index)">删除</el-button>
        </div></el-col>
      </el-row>
      <el-row>
        <el-col :span="8"><div class="grid-content ">绩效分</div></el-col>
        <el-col :span="16"><div class="grid-content ">{{item.value2}}</div></el-col>
      </el-row>
    </div>
    <el-upload
            action=""
            list-type="picture-card"
            width="100%"
            :auto-upload="false"
            :on-remove="remove"
            :on-change='multipartFiles'
            :file-list="fileList"
            :on-exceed='maxFile'
            :limit='6'
            >
            <i class="el-icon-plus"></i>
          </el-upload>
    <el-button type="primary" @click="sub" :disabled="deslable" v-if="a==1">新建</el-button>
    <el-button type="primary" @click="sub" :disabled="inputlab" v-else>保存</el-button>
    <el-button type="primary" @click="dels(6,1)" :disabled="quanxian.c!=1" v-if="a!=1">添加责任人</el-button>
    <el-dialog :title="title+'责任人'" :visible.sync="dialogFormVisible">
      <div style="display:flex"><p>责任人</p><el-input v-model="input1" style="width:80%" placeholder="请输入内容"></el-input></div>
      <div style="display:flex"><p>绩效分</p><el-input type="number" v-model="input2" style="width:80%" placeholder="请输入内容"></el-input></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="btn()" :disabled="this.input1==''||this.input2==''">确认{{title}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import xlsximg from "../assets/images/wenjian.png";
import pdfimg from "../assets/images/huizong.png";
import * as getData from '../api/getDate';
export default {
  data(){
    return{
      // 事故ID列表
      options:[],
      // 事故ID
      value:'',
      // 部门
      value1:'',
      // 责任人列表
      list:[],
      // 控制弹窗
      dialogFormVisible:false,
      // 责任人
      input1:'',
      // 绩效分
      input2:'',
      // 事故详情
      xiangqing:'',
      // 日期
      time:'',
      // 判断是新建还是修改
      a:1,
      // 接口I值
      i:1,
      // 部门列表
      depament:[],
      // 用户名
      username:'',
      // 事故ID赋值
      id:'',
      // 事故调查内容
      diaocha:'',
      // 事故稽查内容
      jicha:'',
      // 标题
      title:'新增',
      // 新增按钮是否可用
      deslable:true,
      // 爆料人
      baoliao:'',
      // 权限赋值
      quanxian:{a:0,b:0,c:0},
      // 保存按钮是否可用
      inputlab:true,
      // 事故类型
      types:'',
      formData: new FormData(),//文件包
      // 文件列表
      fileList:[],
    }
  },
  created(){
    //登录名赋值
    this.username = this.util.parse_url('username')
    //初始化调用
    this.getData()
    //导航头
    this.titles={
          a:{name:'应用程序',path:'/pages/index/index'},
          b:{name:'绩效考核调查',path:'/index'},
      }
  },
  methods:{
    // 上传限制
      maxFile(files, fileList){
        this.$message({
            message: '最多上传六个文件',
            type: 'success'
        });
      },
      // 上传组件移除事件
      remove(file, fileList){ 
        console.log(fileList)
      },
      // 上传组件上传事件
      multipartFiles(file, fileList) {
        let raw = []
        let url = []
        let name = []
        fileList.forEach((item,index)=>{
          url.push(item.url)
        })
        this.dialogImageUrl =url
        this.raw = fileList
        
      },
      // 初始化数据
    async getData(){
      //获取推送凭证
      const token_data={ corpid : 'ww4b634cb35b1893b8',  corpsecret:'4NYbb8943Ug93Cc2Uww69gopt0c0pXS2vGHF5PK-OPU' }
      this.token = JSON.parse(await this.$api.api.get('/api/weixin',token_data)).access_token
      console.log(this.token)
      // 获取部门列表
      const depament = JSON.parse(await this.$api.api.get('/api/WC','')).Table
      this.depament= depament.map(item=>{return {label:item.企业微信部门,value:item.企业微信部门}})
      //绩效考核调查表权限
      const quanxian = JSON.parse(await this.$api.api.get('/api/TSPL',{m1:'移动端授权-应用程序展示-绩效考核调查表',m4:this.util.parse_url('userid'),})).Table[0]
      if(quanxian!=''){
        this.quanxian.a = quanxian.增*1
        this.quanxian.b = quanxian.删*1
        this.quanxian.c = quanxian.改*1
      }
      //事故详情推送指定人
      const sgxq = JSON.parse(await this.$api.api.get('/api/reportto',{modu:'消息推送授权-前台-绩效考核调查表-事故详情',userid:'系统',})).Table[0]
      if(sgxq!=undefined){this.sgxq =  sgxq.汇报给ID.replace(/,/g,"|")}
      //调查内容推送指定人
      const dcnr = JSON.parse(await this.$api.api.get('/api/reportto',{modu:'消息推送授权-前台-绩效考核调查表-调查内容',userid:'系统',})).Table[0]
      if(dcnr!=undefined){this.dcnr =  dcnr.汇报给ID.replace(/,/g,"|")}
      //审核结果推送指定人
      const shjg = JSON.parse(await this.$api.api.get('/api/reportto',{modu:'消息推送授权-前台-绩效考核调查表-审核结果',userid:'系统',})).Table[0]
      if(shjg!=undefined){this.shjg =  shjg.汇报给ID.replace(/,/g,"|") }
      // 查询id列表获取
      let id = JSON.parse(await this.$api.api.get('/api/JXKHDCB','')).Table
      id = id.sort(//排序大到小
        (pre, cur) =>
          cur.ID - pre.ID
      );
      console.log(id)
      this.options= id.map(item=>{return {label:item.ID+'%'+item.日期.replace(/\s+/g, "")+'%'+item.报料人.replace(/\s+/g, ""),value:item.ID}})
    },
    // 爆料部门选择事件
    selectBm(e){
      this.deslable = false
      this.baoliao = this.util.parse_url('username')
      this.time = getData.dateUtils.today({ymrSign:true})
    },
    // 接口I赋值处理函数
    inputXq(e){
      this.inputlab = false
      if(this.a==0){
        this.i = e
      }
    },
    // 责任人保存
    btn(){
        this.dialogFormVisible = false
        let data
        if(this.i==5){
          this.list.splice(this.index,1)
          data = {
            I:this.i,
            A1:this.id,
            A2:this.input1,
            A3:'',
            A4:'',
            A5:'',
            F1:'',
            F2:'',
            F3:'',
            F4:'',
            F5:'',
            F6:'',
          }
        }
        if(this.i==6){
            this.list.push({
              value1:this.input1,
              value2:this.input2,
            })
          data = {
            I:this.i,
            A1:this.id,
            A2:this.value1,
            A3:this.input1,
            A4:this.input2,
            A5:'',
            F1:'',
            F2:'',
            F3:'',
            F4:'',
            F5:'',
            F6:'',
          }
        }
        if(this.i==7){
          this.list[this.index].value1 = this.input1
          this.list[this.index].value2 = this.input2
          data = {
            I:this.i,
            A1:this.id,
            A2:this.input1,
            A3:this.input2,
            A4:'',
            A5:'',
            F1:'',
            F2:'',
            F3:'',
            F4:'',
            F5:'',
            F6:'',
          }
        }
        if(this.raw!=undefined){
          this.raw.forEach((item,index)=>{
              data['F'+(index+1)]=item.name
          })
        }
        
        
        this.$api.post('/api/JXKHDCB',data,res=>{
          this.$message({
              message: '保存成功',
              type: 'success'
          });
        })
        this.input1= ''
        this.input2= ''
      

    },
    // 责任人操作函数
    dels(e,a,b){
      this.dialogFormVisible = true
      this.i = e
      if(b!=undefined){
        this.input1 = this.list[b].value1
        this.input2 = this.list[b].value2
        this.index = b
        if(a==2){
          
          this.title = '修改'
        }else{
          this.title = '删除'
        }
      }else{
        this.title = '新增'
      }
    },
    // 详情保存
   async sub(){
      let data,tsdata
      if(this.i==1){
        data = {
          I:this.i,
          A1:this.time,
          A2:this.value1,
          A3:this.baoliao,
          A4:this.types,
          A5:this.xiangqing,
          F1:'',
          F2:'',
          F3:'',
          F4:'',
          F5:'',
          F6:'',
        }
        
        let dclsss = '## 绩效考核调查\n'+this.username+'创建了新的品质事故\n时间为:'+this.time+'\n请填写调查内容'
        tsdata = {
          access_token:this.token,//消息推送凭证
          // touser:'WoBuShiDouHao',  
          touser:this.sgxq, //推送对象
          msgtype:"markdown",//推送模式
          agentid:"1000070",//应用ID
          content:dclsss//推送内容
        }
        
        
      }
      if(this.i==2){
        data = {
          I:this.i,
          A1:this.id,
          A2:'',
          A3:this.xiangqing,
          A4:this.baoliao,
          A5:'',
          F1:'',
          F2:'',
          F3:'',
          F4:'',
          F5:'',
          F6:'',
        }
        let dclsss = '## 绩效考核调查\n'+this.username+'修改了新的品质事故\nID号为:'+this.id+'\n时间为:'+this.time+'\n请查看或者修改调查内容'
        tsdata = {
          access_token:this.token,//消息推送凭证
          // touser:'WoBuShiDouHao',  
          touser:this.sgxq, //推送对象
          msgtype:"markdown",//推送模式
          agentid:"1000070",//应用ID
          content:dclsss//推送内容
        }
      }
      if(this.i==3){
        data = {
          I:this.i,
          A1:this.id,
          A2:this.diaocha,
          A3:this.util.parse_url('username'),
          A4:'',
          A5:'',
          F1:'',
          F2:'',
          F3:'',
          F4:'',
          F5:'',
          F6:'',
        }
        let dclsss = '## 绩效考核调查\n'+this.username+'新增或修改了调查内容\nID号为:'+this.id+'\n时间为:'+this.time+'\n请查看或者修改审查结果'
        tsdata = {
          access_token:this.token,//消息推送凭证
          // touser:'WoBuShiDouHao',  
          touser:this.dcnr, //推送对象
          msgtype:"markdown",//推送模式
          agentid:"1000070",//应用ID
          content:dclsss//推送内容
        }
      }
      if(this.i==4){
        data = {
          I:this.i,
          A1:this.id,
          A2:this.jicha,
          A3:this.util.parse_url('username'),
          A4:'',
          A5:'',
          F1:'',
          F2:'',
          F3:'',
          F4:'',
          F5:'',
          F6:'',
        }
        let dclsss = '## 绩效考核调查\n'+this.username+'新增或修改了审查结果\nID号为:'+this.id+'\n时间为:'+this.time+'\n请打绩效分'
        tsdata = {
          access_token:this.token,//消息推送凭证
          // touser:'WoBuShiDouHao',  
          touser:this.shjg, //推送对象
          msgtype:"markdown",//推送模式
          agentid:"1000070",//应用ID
          content:dclsss//推送内容
        }
      }
      let list = []
      if(this.raw!=undefined){
        this.raw.forEach((item,index)=>{
            data['F'+(index+1)]=item.name
            if(item.raw!=undefined){
              list.push(item)
            }
          
        })
      }
      this.$api.post('/api/Message1',tsdata,res=>{})//推送接口
      let ids = this.id
      await this.$api.api.post('/api/JXKHDCB',data,res=>{   })
      this.$message({
          message: '保存成功',
          type: 'success'
      });
      this.inputlab = true
      if(this.id==''){
        let id = JSON.parse(await this.$api.api.get('/api/JXKHDCB','')).Table
        this.options= id.map(item=>{return {label:item.ID+'%'+item.日期.replace(/\s+/g, "")+'%'+item.报料人.replace(/\s+/g, ""),value:item.ID}})
        id = id.sort(//排序大到小
          (pre, cur) =>
            cur.ID - pre.ID
        );
        ids = id[0].ID
        this.value = id[0].ID+'%'+id[0].日期.replace(/\s+/g, "")+'%'+id[0].报料人.replace(/\s+/g, "")
      }
      if(list!=undefined){
        list.forEach((item,index)=>{
          this.formData.append('FileData'+(index+1), item.raw)
        })
        this.formData.append("ID", ids);
        this.$api.bomJson('/api/JXKHDCBFJ/',this.formData,res=>{})//文件保存
      }
     
      this.a = 2
    },
    // 事故ID查询函数
    async selectId(e){
      this.inputlab = true
      this.list =[]
      this.fileList = []
      this.raw = []
      this.dialogImageUrl = []
      this.a=0
      const id = JSON.parse(await this.$api.api.get('/api/JXKHDCB',{ID:e})).Table
      let wenjian = []
      for( var item in id[0]){
        if(item.indexOf('文件')!=-1){
          let a = id[0][item]==null?'':id[0][item].replace(/(^\s*)|(\s*$)/g,"")
          if(a!=''){
            wenjian.push(a)
          }
        }
      }
      if(wenjian!=''){
        wenjian.forEach(async(item)=>{
          let wenjian_data = {
            ID:id[0].ID,
            file:item
          }
          this.$api.bomget('/api/JXKHDCBFJ',wenjian_data,res=>{
            let src =  'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
             this.fileList.push({
              name:item,
              url:src
            })
            this.raw = this.fileList
            this.dialogImageUrl.push(src)
          })
       
        })
      }
      this.time =id[0].日期==null?'':id[0].日期.replace(/\s+/g, "")
      
      this.value1 =id[0].报料部门==null?'':id[0].报料部门.replace(/\s+/g, "")
      this.baoliao =id[0].报料人==null?'':id[0].报料人.replace(/\s+/g, "")
      this.types =id[0].事故类型==null?'':id[0].事故类型.replace(/\s+/g, "")
      
      this.xiangqing =id[0].事故详情==null?'':id[0].事故详情.replace(/\s+/g, "")
      this.diaocha = id[0].事故调查内容==null?'':id[0].事故调查内容.replace(/\s+/g, "")
      this.jicha = id[0].稽核调查结果==null?'':id[0].稽核调查结果.replace(/\s+/g, "")
      if(id[0].责任人!=null){
        this.list = id.map(item=>{return{value1:item.责任人.replace(/\s+/g, ""),
          value2:item.考核分数.replace(/\s+/g, ""),}})
      }
      
      this.id = id[0].ID
    },
    del(){},
  }
}
</script>

<style>
.grid-content {
    min-height: 40px;
    line-height: 40px;
    border: 1px solid
  }
.caozuo .el-button{
  padding: 9px
}
.el-dialog{
  width: 100%
}
.el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
}
.el-upload-list--picture-card .el-upload-list__item {
    width: 100px;
    height: 100px;
}
</style>