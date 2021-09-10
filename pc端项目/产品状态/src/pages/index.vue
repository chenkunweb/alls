<template>
  <div >
    <span style="font-size:20px;font-weight:bold">产品状态标识卡</span>
    
    
    <div class="box" v-if="printValue==false">
        
        <el-row>
            <el-col :span="4"><div class="grid-content bg-purple ">
                <el-select v-model="departmentValue" :disabled="jinyong==true" @change="departmentChange" placeholder="部门">
                    <el-option
                    v-for="(item,index) in department"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>    
            </div></el-col>
            <el-col :span="4"><div class="grid-content bg-purple-light ">
                <el-select v-model="workValue" filterable  :disabled="jinyong==true" @change="workChange" placeholder="工单号">
                    <el-option
                    v-for="(item,index) in work"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple ">零件代码：{{ljdmValue}}</div></el-col>
            <el-col :span="8"><div class="grid-content bg-purple-light ">型号：{{cpxhValue}}</div></el-col>
        </el-row>
        
        <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">本工序</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">
                <el-select v-model="bgxValue" filterable :disabled="jinyong==true" @change="bgxChange" placeholder="请选择">
                    <el-option
                    v-for="(item,index) in gx"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>    
            </div></el-col>
        </el-row>
        <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">上工序</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light">
                <el-select v-model="sgxValue" multiple filterable  @change="sgxChange" placeholder="请选择">
                    <el-option
                    v-for="(item,index) in gx"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>    
            </div></el-col>
        </el-row>
        <el-row>
            <el-col :span="6"><div class="grid-content bg-purple ">零件</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light ">
                <el-select v-model="ljValue" filterable multiple @change="ljChange" @remove-tag="ljRemove" placeholder="请选择">
                    <el-option v-for="(item,index) in lj" :key="index" :label="item.label" :value="item.value"> </el-option>
                </el-select>
            </div></el-col>
        </el-row>
        
        <el-row>
            <el-col :span="6"><div class="grid-content bg-purple ">数量</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light ">
              <el-input v-model="nubValue"  placeholder="请输入内容"></el-input>
            </div></el-col>
        </el-row>
        <el-row>
            <el-col :span="6"><div class="grid-content bg-purple">备注</div></el-col>
            <el-col :span="18"><div class="grid-content bg-purple-light ">
              <el-input v-model="bzValue"  placeholder="请输入内容"></el-input>
            </div></el-col>
        </el-row>
        

    </div>
    <div v-if="printValue==true" ref="print" class="print">
      <el-row>
           
            <el-col :span="4"><div class="grid-content bg-purple-light ">工单号</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light ">{{dowmList.gongdan}}</div></el-col>
            
        </el-row>
        <el-row>
            <el-col :span="4"><div class="grid-content bg-purple-light ">型号</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple-light ">{{dowmList.xinghao}}</div></el-col>
            
        </el-row>
        <el-row>
           <el-col :span="4"><div class="grid-content bg-purple ">本工序</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple ">{{dowmList.bgxValue}}</div></el-col>
        </el-row>
        <el-row>
            <el-col :span="4"><div class="grid-content bg-purple ">上工序</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple ">{{dowmList.sgxValue}}</div></el-col>
            
        </el-row>
        
        <el-row>
           <el-col :span="4"><div class="grid-content bg-purple ">数量</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple ">{{dowmList.nubValue}}</div></el-col>
        </el-row>
        
        <el-row>
            <el-col :span="4"><div class="grid-content bg-purple ">备注</div></el-col>
            <el-col :span="20"><div class="grid-content bg-purple ">{{dowmList.bzValue}}</div></el-col>
        </el-row>
        
      <vue-qr 
        :correctLevel="0" 
        :autoColor="false" 
        :text="codeUrl" 
        :size="50" 
        :margin="0" 
        :logoMargin="3"></vue-qr>
    </div>
    <div v-if="printValue==false">
      
      <el-button  type="primary" v-if="jinyong==false" :disabled="workValue==''||bgxValue==''||bgxValue==sgxValue" @click="btnClick">保存</el-button>
      <el-button  type="primary" v-if="jinyong==true" @click="printClick">打印</el-button>
      <el-button  type="primary" v-if="jinyong==true" @click="creaks">继续做单</el-button>
      <el-button  type="primary" v-if="jinyong==true" @click="location">重新做单</el-button>
    </div>
    
  </div>
    
</template>

<script>
import * as getData from '../api/getDate';
import VueQr from 'vue-qr'
  export default {
    data() {
      return {
          department:[],//部门列表
          departmentValue:'',//部门
          work:[],//工单列表
          workValue:'',//工单
          ljdmValue:'',//零件代码：
          cpxhValue:'',//型号
          lj:[],//零件列表
          ljValue:'',//零件
          sgxValue:'',//上工序
          bgxValue:'',//本工序
          gx:[//工序列表
            {
              label:'',
              value:''
            }
          ],
          dowmList:[],//列表数据
          nubValue:'',//数量
          bzValue:'',//备注
          jinyong:false,//控制按钮可点
          codeUrl:'',//二维码内容
          printValue:false,//是否可打印
          chaxun:false,
          addList:[],
       
        
      }
    },
    created(){

        // 获取部门列表
        this.$api.get('/api/WC','',res=>{
            let departments = []
            JSON.parse(res.data).Table.forEach((item)=>{
                if(item.ERP部门 !=''){
                    departments.push({
                        label:item.ERP部门,
                        value:item.ERP部门代号
                    })
                }
            })
            this.department = departments
            
        })
    },
    methods:{
        // 部门选择
        departmentChange(e){
          let time = getData.dateUtils.beforeThirty({ymrSign:true})
          console.log(e)
          this.departmentId = e
          console.log(this.departmentValue)
          this.workValue = ''
          this.ljValue = ''
          this.sgxValue = ''
          this.bgxValue = ''
          this.nubValue = ''
          this.bzValue = ''
          this.ljdmValue = ''
            this.$api.get('/api/job',{bm:e,date:time},res=>{
                console.log(JSON.parse(res.data).Table)
                let person = JSON.parse(res.data).Table.map(item=>{
                    return {
                        label:item.工单号.replace(/\s+/g, "")+'%'+item.零件说明.replace(/\s+/g, ""),
                        value:item.工单号.replace(/\s+/g, "")+'%'+item.零件说明.replace(/\s+/g, ""),
                    }
                })
                let obj = {};
                this.work = person.reduce((cur,next) => {
                    obj[next.label] ? "" : obj[next.label] = true && cur.push(next);
                    return cur;
                },[])
            })
            
        },
        // 工单号选择
        async workChange(e){
            this.gx = []
            this.ljValue = ''
            this.sgxValue = ''
            this.bgxValue = ''
            this.nubValue = ''
            this.bzValue = ''
            this.ljdmValue = ''
            this.cpxhValue = e.split('%')[1]
            this.dowmList.gongdan = e.split('%')[0]
            this.dowmList.xinghao = e.split('%')[1]
            console.log(e.split('%')[0])
            let ljdmValue = JSON.parse(await this.$api.api.get('/api/jgz',{JOB:e.split('%')[0]})).Table
            console.log(ljdmValue)
            this.ljdmValue = ljdmValue==''?'':ljdmValue[0].user_part_no
            if(this.ljdmValue!=''){
              console.log(this.ljdmValue)
              this.dowmList.diama = this.ljdmValue
              console.log(ljdmValue[0].part_desc)
                let Planitem = JSON.parse(await this.$api.api.get('/api/Planitem',{i:1,item:this.ljdmValue})).Table
                let person = Planitem.map(item=>{
                    return {
                        label:item.二级子件编码+'%'+item.二级子件说明,
                        value:item.二级子件编码+'%'+item.二级子件说明,
                    }
                })
                let obj = {};
                this.lj = person.reduce((cur,next) => {
                    obj[next.label] ? "" : obj[next.label] = true && cur.push(next);
                    return cur;
                },[])
                let jgz = JSON.parse(await this.$api.api.get('/api/jgz',{ITEM:this.ljdmValue,DM:'NODM'})).Table
                console.log(jgz)
                let gx = jgz.map(item=>{
                    return {
                        label:item.工序代码*1+'%'+item.工序名称.replace(/\s+/g, ""),
                        value:item.工序代码*1+'%'+item.工序名称.replace(/\s+/g, ""),
                    }
                })
                 this.gx = this.gx.concat(gx)
            }
        },
        // 零件选择
        ljChange(e){
          this.jinyong = false
          console.log(e)
          this.addList  = e
            this.dowmList.zijian = e
        },
        ljRemove(e){
          
        },
        // 本工序选择
        bgxChange(e){
          this.dowmList.bgxValue = e
          console.log(e.split('%'[0]))
          console.log(this.ljdmValue)
          let data = {
            a2:this.ljdmValue,
            a4:e.split('%')[0],
            a5:this.departmentValue
          }
          console.log(data)
          this.$api.get('/api/GXLCBOM',data,res=>{
            if(JSON.parse(res.data).Table!=''){
              console.log(JSON.parse(res.data).Table)
              this.jinyong = true
              this.chaxun = true
              let sgxValue = []
              if(JSON.parse(res.data).Table[0].上一工序号.replace(/\s+/g, "")==''||JSON.parse(res.data).Table[0].上一工序号.replace(/\s+/g, "")=='NaN'){
                sgxValue = ' '
              }else{
                JSON.parse(res.data).Table[0].上一工序号.split(';').forEach((item,index)=>{
                  console.log(item)
                  console.log(JSON.parse(res.data).Table[0].上一工序说明.split(';')[index])
                  sgxValue.push(item+'%'+JSON.parse(res.data).Table[0].上一工序说明.split(';')[index])
                })
                // sgxValue = JSON.parse(res.data).Table[0].上一工序号*1+'%'+JSON.parse(res.data).Table[0].上一工序说明.replace(/\s+/g, "")
              }
              console.log(sgxValue)
              this.sgxValue = sgxValue
              this.dowmList.sgxValue=this.sgxValue
              let zijian = JSON.parse(res.data).Table[0].子件号.split('%')
              let zijiansm = JSON.parse(res.data).Table[0].子件说明.split('%')
             
              let list = []
              if(zijian!=''){
                zijian.forEach((item,index)=>{
                  list.push(item.replace(/\s+/g, "")+'%'+zijiansm[index].replace(/\s+/g, ""))
                })
              }
              
              console.log(list)
              this.ljValue = list
           
            }
              
              
            })
        },
        // 上工序选择
        sgxChange(e){
          console.log(e)
          console.log(this.dowmList.bgxValue)
          this.jinyong = false
          if(this.dowmList.bgxValue!=e){
            this.dowmList.sgxValue = e
            // this.jinyong = false
          }else{
            // this.jinyong = false
          }
          console.log(e)
          console.log(this.dowmList)
        },
        // 保存
        btnClick(){
          console.log(this.dowmList)
          console.log(this.dowmList.zijian)
          let zijian='',zijiansm=''
          if(this.dowmList.zijian!=undefined){
            this.dowmList.zijian.forEach((item)=>{
              let a = item.split('%')[0]
              let b = item.split('%')[1]
              zijian = zijian==''?a:zijian+'%'+a
              zijiansm = zijiansm==''?b:zijiansm+'%'+b
            })
          }
          console.log(this.dowmList.sgxValue==undefined)
          let a6='',a7=''
          if(this.dowmList.sgxValue!=undefined){
            this.dowmList.sgxValue.forEach((item)=>{
              console.log(item)
              a6=a6==''?item.split('%')[0]:a6+';'+item.split('%')[0]
              a7=a7==''?item.split('%')[0]:a7+';'+item.split('%')[1]
              
            })
          }
          console.log(a6)
          // let sgxValue = this.dowmList.sgxValue==undefined?'':this.dowmList.sgxValue.split('%')
          let data = {
                a1:this.dowmList.gongdan,
                a2:this.dowmList.diama,
                a3:this.dowmList.xinghao,
                a4:this.dowmList.bgxValue.split('%')[0],
                a5:this.dowmList.bgxValue.split('%')[1],
                a6:a6,
                a7:a7,
                a8:zijian,
                a9:zijiansm,
                a10:this.util.parse_url('userid'),
                a11:'',
                a12:this.departmentValue
              }
              this.dowmList.nubValue = this.nubValue
              console.log(data)
              this.$api.post('/api/GXLCBOM',data,res=>{
                console.log(res)
                 this.$message({
                    type: 'success',
                    message: '保存成功',
                    duration:1000
                });
                this.jinyong = true
                
              })
          
          // this.jinyong = true
         
        },
        // 打印
        printClick(){
          this.printValue = true
          this.bindQRCode();
          setTimeout(()=>{
                this.printValue = false
                window.print()
                // this.util.onPrint(this,'','@page{size:auto;margin: 0cm 0cm 0cm 0cm;}')
                // this.$refs.qrCodeDiv.innerHTML = ''
            },1000)
        },
        // 二维码生成
        bindQRCode(){
          
          // let a = this.dowmList.diama
          // let b = this.dowmList.bgxValue.split('%')[0]
          // let c = this.dowmList.sgxValue.split('%')[0]
          // let d = this.departmentValue
          let e = this.dowmList.gongdan
          let a = this.dowmList.diama
          let b = this.dowmList.bgxValue.split('%')[0]
          let c = this.departmentValue
          let d = a+'-'+b+'-'+c+'-'+e
          this.codeUrl= 'https://www.zanty.net:8133?a='+d
          console.log(this.codeUrl)
        },
        // 重新加载
        location(){
          location.reload()
        },
        // 清除页面
        creaks(){
          // console.log(this.dowmList=[])
          this.bgxValue = ''
          this.sgxValue = ''
          this.ljValue = ''
          this.nubValue = ''
          this.bzValue = ''
          this.jinyong = false
        }
    },
    // 注册组件
    components: {
      VueQr
    }
  }
</script>
<style>
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
  .el-select{
      width: 100%
  }
  /* .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  } */
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
    font-size: 5px
  }
  .print .grid-content{
    min-height: 20px;
    line-height: 20px;
    font-weight: bold
  }
  img{   
    position: absolute;
    right: 0px;
    height: 80px;
    margin-top: -80px;}
    @page{size:auto;margin: 0.1cm 0.3cm 0cm 0.3cm;}
</style>