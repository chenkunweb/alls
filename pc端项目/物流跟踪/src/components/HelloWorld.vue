<template>
  <div>
    <div style="width:300px;margin:0px auto" id="aaa">
      <marquee behavior="scroll" direction="left">
          <div v-for="(item,index) in gundoong_list" :key="index">
            <span>{{item.time}}</span>
            <span>{{item.bumen}}工单号：{{item.gongdan}}</span>
            <span>{{item.type}}</span>
          </div>
       </marquee>
    </div>
    <el-select :disabled="inputOption==''" v-if="isGuest==true||tequans == true" v-model="khbianhao" @change="blurChange" filterable placeholder="客户编号">
      <el-option  v-for="(item,index) in inputOption" :key="index" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <!-- <el-input v-if="isGuest==true" v-model="khbianhao" @blur="blurChange" placeholder="请输入客户编号"></el-input> -->
    <el-select :disabled="inputOption==''" v-if="isGuest==true||tequans == true" v-model="khbianhaos" @change="inputChange" filterable placeholder="客户订单号查找">
      <el-option  v-for="(item,index) in inputoption" :key="index" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <el-select v-if="isGuest==false||tequans == true" v-model="value" @change="selectChange" filterable placeholder="工单查找">
      <el-option  v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <el-select v-if="isGuest==false||tequans == true" v-model="values" @change="selectChanges" filterable placeholder="型号查找">
      <el-option  v-for="(item,index) in optionss" :key="index" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <el-row v-if="iskhShow!=''" :gutter="24">
      <el-col :span="3"><div class=" bg-purple">销售订单号:{{iskhShow.销售订单号}}</div></el-col>
      <el-col :span="3"><div class=" bg-purple">订单日期:{{iskhShow.订单日期}}</div></el-col>
      <el-col :span="1.5"><div class="grid-content bg-purple">订单数量:{{iskhShow.订单数量}}</div></el-col>
      <el-col :span="1.5"><div class="grid-content bg-purple">在库量:{{iskhShow.在库量}}</div></el-col>
      <el-col :span="1.5"><div class="grid-content bg-purple">销售出货数:{{iskhShow.销售出货数}}</div></el-col>
      <el-col :span="3"><div class="grid-content bg-purple">客户订单号:{{iskhShow.客户订单号}}</div></el-col>
      <el-col :span="2"><div class="grid-content bg-purple">客户编号:{{iskhShow.客户编号}}</div></el-col>
      <el-col :span="3.5"><div class="grid-content bg-purple">客单到期日期:{{iskhShow.客单到期日期}}</div></el-col>
      <el-col :span="2.5"><div class="grid-content bg-purple">客户零件号:{{iskhShow.客户零件号}}</div></el-col>
      <el-col :span="2.5"><div class="grid-content bg-purple">客户物料备注:{{iskhShow.客户物料备注}}</div></el-col>
    </el-row>
    <el-table
      :data="tableData1"  height="800" row-key="id" border lazy :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}" @cell-click="cellClick" 
      :row-class-name="tableRowClassNamea"
      :cell-class-name="tableRowClassNames" :cell-style="tableRowClassName">
      <transition name="el-fade-in-linear">
      <el-table-column label="物流实时跟踪表">
        <el-table-column   label="计划工单"  > 
          <el-table-column  width="70" prop="bumen"  label="部门"  > </el-table-column>
          <el-table-column width="70" prop="gongdan" label="工单"  > </el-table-column>
          <el-table-column  prop="xinghao" width="200" label="型号"  > </el-table-column>
          <el-table-column width="70" prop="jihua" label="计划数"> </el-table-column>
          <el-table-column width="55"  prop="faliao" label="发料"> </el-table-column>
        </el-table-column>
        <el-table-column  label="送电镀"  > 
          <el-table-column width="55" prop="电镀制单" label="制单"  > </el-table-column>
          <el-table-column width="55" prop="电镀审核" label="品管"  > </el-table-column>
          <el-table-column width="55" prop="电镀送货" label="送货"> </el-table-column>
          <el-table-column width="55" prop="电镀放行" label="放行"> </el-table-column>
          <el-table-column width="55" prop="电镀收货" label="入库"> </el-table-column>
        </el-table-column>
        <el-table-column   label="电镀返回"  > 
          <el-table-column width="55" prop="电镀回制单"  label="制单"  > </el-table-column>
          <el-table-column width="55" prop="电镀回审核" label="品管"  > </el-table-column>
          <el-table-column width="55" prop="电镀回送货" label="送货"> </el-table-column>
          <el-table-column width="55" prop="电镀回放行" label="放行"> </el-table-column>
          <el-table-column width="55" prop="电镀回收货" label="入库"> </el-table-column>
        </el-table-column>
        <el-table-column   label="送外协"  > 
          <el-table-column width="55" prop="外协制单" label="制单"  > </el-table-column>
          <el-table-column width="55" prop="外协审核" label="品管"  > </el-table-column>
          <el-table-column width="55" prop="外协送货" label="送货"> </el-table-column>
          <el-table-column width="55" prop="外协放行" label="放行"> </el-table-column>
          <el-table-column width="55" prop="外协收货" label="入库"> </el-table-column>
        </el-table-column>
        <el-table-column   label="外协返回"  > 
          <el-table-column width="55" prop="外协回制单"  label="制单"  > </el-table-column>
          <el-table-column width="55" prop="外协回审核" label="品管"  > </el-table-column>
          <el-table-column width="55" prop="外协回送货" label="送货"> </el-table-column>
          <el-table-column width="55" prop="外协回放行" label="放行"> </el-table-column>
          <el-table-column width="55" prop="外协回收货" label="入库"> </el-table-column>
        </el-table-column>
        <el-table-column   label="生产入库"  > 
          <el-table-column width="55" prop="入库制单"  label="制单"  > </el-table-column>
          <el-table-column width="55" prop="入库审核" label="品管"  > </el-table-column>
          <el-table-column width="55" prop="入库送货" label="送货"> </el-table-column>
          <el-table-column width="55" prop="入库放行" label="放行"> </el-table-column>
          <el-table-column width="55" prop="入库收货" label="入库"> </el-table-column>
        </el-table-column>
      </el-table-column>
      </transition>
    </el-table>
    <el-dialog :title="title" :visible.sync="dialogTableVisible">
      <el-table :data="gridData" height="600">
        <el-table-column property="子件" label="子件" width="150"></el-table-column>
        <el-table-column property="子件说明" label="子件说明" width="200"></el-table-column>
        <el-table-column property="应发数量" label="应发数量"></el-table-column>
        <el-table-column property="实发数量" label="实发数量"></el-table-column>
        <el-table-column property="单位用量" label="单位用量"></el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog class="gongdan" :title="title" :visible.sync="gongdanTableVisible">
      <el-table :data="gongdanData"  height="600">
        <el-table-column width="60" property="类型" label="类型" ></el-table-column>
        <el-table-column width="45" property="发货方" label="发货方" ></el-table-column>
        <el-table-column width="60" property="收货方" label="收货方"></el-table-column>
        <el-table-column width="30" property="编号" label="编号"></el-table-column>
        <el-table-column width="30" property="行号" label="行号"></el-table-column>
        <el-table-column width="120" property="日期" label="日期"></el-table-column>
        <el-table-column width="60" property="数量KG" label="数量KG"></el-table-column>
        <el-table-column width="60" property="数量PCS" label="数量PCS"></el-table-column>
        <el-table-column width="60" property="加工类型" label="加工类型"></el-table-column>
        <el-table-column width="120" property="交期" label="交期"></el-table-column>
        <el-table-column width="120" property="备注" label="备注"></el-table-column>
        <el-table-column width="45" property="制单" label="制单"></el-table-column>
        <el-table-column width="45" property="审核" label="审核"></el-table-column>
        <el-table-column width="45" property="送货" label="送货"></el-table-column>
        <el-table-column width="120" property="送货日期" label="送货日期"></el-table-column>
        <el-table-column width="45" property="收货" label="收货"></el-table-column>
        <el-table-column width="120" property="收货日期" label="收货日期"></el-table-column>
        <el-table-column width="45" property="放行" label="放行"></el-table-column>
        <el-table-column width="120" property="放行日期" label="放行日期"></el-table-column>
        <el-table-column width="130" property="审核日期" label="审核日期"></el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>

<script>
import * as getData from '../api/getDate';
export default {
  data(){
    return{
      dialogTableVisible:false,//控制发料明细弹出
      gongdanTableVisible:false,//控制送货单详情
      gridData:[],//发料明细列表
      gongdanData:[],//送货单详情列表
      title:'',//标题
      isGuest:false,//是否有增加权限
      tequans:false,//是否有特权
      show:true,
      value:'',//工单查找
      values:'',//型号查找
      seacth:'',
      seacths:'',
      khbianhao:'',//客户编号
      khbianhaos:'',//客户订单号
      iskhShow:[],//数据列表
      inputOption:[],//客户编号列表
      inputoption:[],//客户订单号列表
      gundoong_list:[],//工单号列表
      objData:[],//表格数据
      objColor:[],//颜色数据
      options:[],//工单查找列表
      optionss:[],//型号查找列表
      timer:null, //定时器名称
      timeList:false,
      timeLists:[],
      tableData1: [//表格树
        { id: '1-1', bumen:'', hasChildren: false  },
        { id: '1-2', bumen:'', hasChildren: false  },
        { id: '1-3', bumen:'', hasChildren: false  },
        { id: '1-4', bumen:'', hasChildren: false  },
        { id: '1-5', bumen:'', hasChildren: false  },
        { id: '1-6', bumen:'', hasChildren: false  },
        { id: '1-7', bumen:'', hasChildren: false  },
        { id: '1-8', bumen:'', hasChildren: false  },
        { id: '1-9', bumen:'', hasChildren: false  },
        { id: '1-10', bumen:'', hasChildren: false  },
        { id: '1-11', bumen:'', hasChildren: false  },
        { id: 1, bumen:'五金', hasChildren: true  },
        { id: 2, bumen:'电装', hasChildren: true },
        // { id: 3, bumen:'电镀', hasChildren: true },  
        { id: 4, bumen:'电线', hasChildren: true },
        { id: 5, bumen:'注塑', hasChildren: true },
        { id: 6, bumen:'宗联机', hasChildren: true },
        { id: 7 , bumen:'机加', hasChildren: true },
        ]
    }
  },
  beforeDestroy(){
   clearInterval(this.timer);        
   this.timer = null;
},
mounted(){
    this.timer = setInterval(() => {
        setTimeout(this.times, 0)
    }, 1000*60)
    
    

   
    
},
created(){
        this.loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
       this.getData()
},
   methods: {
    //  数据处理
     async times(){
        function getNowFormatDate() {
            var date = new Date();
            var seperator1 = "-";
            var seperator2 = ":";
            //前十分钟时间
             var minutes=parseInt("10");  

          var   interTimes=minutes*60*1000;

          var interTimes=parseInt(interTimes);  
             date=new   Date(Date.parse(date)-interTimes);
            
            var month = date.getMonth() + 1;
            var strDate = date.getDate();
            var hour = date.getHours();
            var minutes = date.getMinutes();
            let seconds = date.getSeconds()
            if (month >= 1 && month <= 9) {
                month = "0" + month;
            }
            if (strDate >= 0 && strDate <= 9) {
                strDate = "0" + strDate;
            }
            if (hour >= 0 && hour <= 9) {
                    hour = "0" + hour;
            }
            if (minutes >= 0 && minutes <= 9) {
                    minutes = "0" + minutes;
            }
            if (seconds >= 0 && seconds <= 9) {
                    seconds = "0" + seconds;
            }
            var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                    + " " + hour + seperator2 + minutes;
            return currentdate;
        }
       this.timeList=true
       this.timeLists = []
       let WLGZB3 = JSON.parse(await this.$api.api.get('/api/WLGZB3','')).Table
       let gundong = WLGZB3
       console.log(WLGZB3)
       gundong.forEach((item)=>{
         if(item.日期!=null){
           this.gundoong_list.push({
             data:item.日期.split(' ')[0],
             time:item.日期.split(' ')[1].substring(0,5),
             bumen:item.发货方.replace(/\s+/g, ""),
             gongdan:item.工单号.replace(/\s+/g, ""),
             type:item.制单.replace(/\s+/g, "")+'制单'
           })
         }
         if(item.审核日期!=null){
           this.gundoong_list.push({
             data:item.审核日期.split(' ')[0],
             time:item.审核日期.split(' ')[1].substring(0,5),
             bumen:item.发货方.replace(/\s+/g, ""),
             gongdan:item.工单号.replace(/\s+/g, ""),
             type:item.审核.replace(/\s+/g, "")+'审核签收'
           })
         }
         if(item.收货日期!=null){
           this.gundoong_list.push({
             data:item.收货日期.split(' ')[0],
             time:item.收货日期.split(' ')[1].substring(0,5),
             bumen:item.发货方.replace(/\s+/g, ""),
             gongdan:item.工单号.replace(/\s+/g, ""),
             type:item.收货.replace(/\s+/g, "")+'收货签收'
           })
         }
         if(item.放行日期!=null){
           this.gundoong_list.push({
             data:item.放行日期.split(' ')[0],
             time:item.放行日期.split(' ')[1].substring(0,5),
             bumen:item.发货方.replace(/\s+/g, ""),
             gongdan:item.工单号.replace(/\s+/g, ""),
             type:item.放行.replace(/\s+/g, "")+'放行签收'
           })
         }
         if(item.送货日期!=null){
           this.gundoong_list.push({
             data:item.送货日期.split(' ')[0],
             time:item.送货日期.split(' ')[1].substring(0,5),
             bumen:item.发货方.replace(/\s+/g, ""),
             gongdan:item.工单号.replace(/\s+/g, ""),
             type:item.送货.replace(/\s+/g, "")+'送货签收'
           })
         }
       })
      //  console.log(this.gundoong_list)
       let gundoong_list = []
       this.gundoong_list.forEach((item)=>{
         if(item.data==getNowFormatDate().split(' ')[0]){
           if(item.time>=getNowFormatDate().split(' ')[1]){
             console.log(item)
             gundoong_list.push(item)
           }
         }
       })
       this.gundoong_list = gundoong_list
       console.log(this.gundoong_list)
       let aSHDQS
       if(WLGZB3!=''||this.seacth!=''||this.seacths!=''||this.khbianhaos!=''){
         
         aSHDQS = JSON.parse(await this.$api.api.get('/api/WLGZB2','')).Table
         if(this.seacth!=''||this.seacths!=''||this.khbianhaos!=''){
           if(this.seacth!=''){
             aSHDQS.some((item)=>{
              if(item.工单号==this.seacth){
                WLGZB3.push(item)
                return true
              }
            })
           }
           if(this.seacths!=''){
             aSHDQS.some((item)=>{
              if(item.零件说明==this.seacths){
                WLGZB3.push(item)
              }
            })
           }
           if(this.khbianhaos!=''){
             let iskhShow = []
             aSHDQS.some((item)=>{
              if(item.客户订单号==this.khbianhaos){
                WLGZB3.push(item)
                iskhShow.push(item)
                // return true
              }
            })
            this.iskhShow = iskhShow[0]
            console.log(this.iskhShow)
           }
         
          this.seacth = ''
          this.seacths = ''
          this.khbianhaos = ''
         }
       }
       if(WLGZB3!=''){
         let del = await this.$api.api.get('/api/WLGZB3',{ID:'1'})
         let list = []
          WLGZB3.forEach((item)=>{
            aSHDQS.forEach((items)=>{
              if(items.工单号==item.工单号.replace(/\s+/g, "")){
                list.push(items)
                
              }
            })
        })
        var obj = {};
        list.some((item)=>{
          let diandu = item.是否电镀==null?'':item.是否电镀.replace(/\s+/g, "")
          let copyObj = Object.assign({}, item,this.getColor(diandu,item,''));
          this.objColor= []
          this.objData.some((items,index)=>{
            if(copyObj.工单号==items.工单号){
                
                let objkeys = Object.keys(copyObj)
              
                objkeys.forEach((itemss)=>{
                  this.objData[index][itemss] = copyObj[itemss]
                })
                // debugger
                let tong = false
                this.tableData1.forEach((itemss)=>{
                  if(itemss.工单号==items.工单号){
                    console.log(itemss)
                    tong=true
                  }
                })
                for(let i=0;i<this.tableData1.length;i++){
                  let data = {
                    id:this.tableData1[i].id,
                    hasChildren:this.tableData1[i].hasChildren,
                  }
                  if(this.tableData1[i].hasChildren==false){
                    if(tong==true){
                      // debugger
                      if(this.tableData1[i].工单号==items.工单号){
                        console.log(this.tableData1)
                        this.tableData1.splice(i, 1,Object.assign({},items,data))
                        console.log(this.tableData1)
                        break
                      }
                    }else{
                      if(i==0){
                        this.tableData1[i] = Object.assign({},items,data);
                      }else{
                          if(i==10){
                            this.tableData1.splice(i, 1);
                            this.tableData1.unshift(data);
                          }
                          
                          
                      }
                    }
                  }
                 
                }
                  return true
            }
            
          })

        })
        this.loading.close();
       }
       
   
        
      
       
     },
    //  工单查找
     selectChange(e){
       this.loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
       this.seacth = e
       this.value = e
       this.values = ''
       this.seacths = ''
       this.times()
       this.$set(this.tableData1)
     },
    //  型号查找
     selectChanges(e){
       this.loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
       this.seacths = e
       this.values = e
       this.value = ''
       this.seacth = ''
       this.times()
       this.$set(this.tableData1)
     },
    //  颜色处理
     getColor(diandu,list,tow){
       let data
       if(tow == ''){
         
          if(diandu!=''){
            if(diandu=='电镀'){
              data = {
                电镀制单:list.电镀制单,
                电镀审核:list.电镀审核,
                电镀送货:list.电镀送货,
                电镀放行:list.电镀放行,
                电镀收货:list.电镀收货,
                电镀回制单:list.电镀回制单,
                电镀回审核:list.电镀回审核,
                电镀回送货:list.电镀回送货,
                电镀回放行:list.电镀回放行,
                电镀回收货:list.电镀回收货,
              }
            }
            if(diandu=='电镀/外协'){
              data = {
                电镀制单:list.电镀制单,
                电镀审核:list.电镀审核,
                电镀送货:list.电镀送货,
                电镀放行:list.电镀放行,
                电镀收货:list.电镀收货,
                电镀回制单:list.电镀回制单,
                电镀回审核:list.电镀回审核,
                电镀回送货:list.电镀回送货,
                电镀回放行:list.电镀回放行,
                电镀回收货:list.电镀回收货,
                外协制单:list.外协制单,
                外协审核:list.外协审核,
                外协送货:list.外协送货,
                外协放行:list.外协放行,
                外协收货:list.外协收货,
                外协回制单:list.外协回制单,
                外协回审核:list.外协回审核,
                外协回送货:list.外协回送货,
                外协回放行:list.外协回放行,
                外协回收货:list.外协回收货,
              }
            }
            if(diandu=='外协'){
              data = {
                外协制单:list.外协制单,
                外协审核:list.外协审核,
                外协送货:list.外协送货,
                外协放行:list.外协放行,
                外协收货:list.外协收货,
                外协回制单:list.外协回制单,
                外协回审核:list.外协回审核,
                外协回送货:list.外协回送货,
                外协回放行:list.外协回放行,
                外协回收货:list.外协回收货,
              }

            }
            if(diandu=='外协/电镀'){
              data = {
                外协制单:list.外协制单,
                外协审核:list.外协审核,
                外协送货:list.外协送货,
                外协放行:list.外协放行,
                外协收货:list.外协收货,
                外协回制单:list.外协回制单,
                外协回审核:list.外协回审核,
                外协回送货:list.外协回送货,
                外协回放行:list.外协回放行,
                外协回收货:list.外协回收货,
                电镀制单:list.电镀制单,
                电镀审核:list.电镀审核,
                电镀送货:list.电镀送货,
                电镀放行:list.电镀放行,
                电镀收货:list.电镀收货,
                电镀回制单:list.电镀回制单,
                电镀回审核:list.电镀回审核,
                电镀回送货:list.电镀回送货,
                电镀回放行:list.电镀回放行,
                电镀回收货:list.电镀回收货,
              }
            }
          }else{
            data = {
                入库制单:list.入库制单,
                入库审核:list.入库审核,
                入库送货:list.入库送货,
                入库放行:list.入库放行,
                入库收货:list.入库收货,
                
                
              }
          }
       }else{
         data = tow 
       }
       
        
        if(data!=undefined){
          let datas = Object.values(data)
          let arr = []
          datas.forEach((item)=>{
            if(typeof(item)=='number'){
              arr.push(item)
            }
          })
          let arrs = []
          var max = Math.max.apply(null,arr);
          let indexs
          arr.forEach((item,index)=>{
            if(max ==item){
              indexs = index
            }
          })
          if(arr[indexs]==0){
            arr[indexs]='bai'
          }else{
            if(arr[indexs]<list.计划数量){
              arr[indexs]='lan'
            }else{
              arr[indexs]='lv'
            }
          }
          let a = arr.slice(0,indexs+1)
          let b = arr.slice(indexs+1)
          
          a.forEach((item,index)=>{
            if(index!=a.length-1){
              if(item==max){
                a[index] = a[a.length-1]
              }else{
                a[index] = 'hong'
              }
            }
          })
          this.objColor = this.objColor.concat(a)
          if(b.length>0){ this.getColor(diandu,list,a.concat(b))  }
          let objkeys = Object.keys(data)
          this.objColor.forEach((item,index)=>{
            objkeys.forEach((items,key)=>{
              if(index==key){
                data[items+'1'] = item;
                data[items] = index+1+'/'+list[items];
              }
            })
          })
          return data
        }

     },
    //  初始化数据
     async getData(){
      
      let userList = JSON.parse(await this.$api.api.get('/api/MOUSER',{MKID:'pc端授权-物流跟踪操作权限',USERID:this.util.parse_url("userid")})).Table[0]
      console.log(userList)
      this.userName = userList.用户名.replace(/\s+/g, "")
      if(userList.增加*1==1){
        this.isGuest=true
      }else{
        this.isGuest=false
      }
      if(userList.特权*1==1){
        this.tequans = true
      }
      
       
       let aSHDQS = JSON.parse(await this.$api.api.get('/api/WLGZB2','')).Table
       let aSHDQS1 = JSON.parse(await this.$api.api.get('/api/WLGZB1','')).Table
      console.log(aSHDQS)
       let options = []
       let optionss = []
       let inputOption = []
       aSHDQS.some((item)=>{
         
          if(item.销售代表姓名==this.userName){
        //  if(item.销售代表姓名=='冯美霖'){
           inputOption.push({
             label:item.客户编号,
             value:item.客户编号,
           })
         }
        if(userList.特权*1==1){
          inputOption.push({
             label:item.客户编号,
             value:item.客户编号,
           })
        }
         if(item.生产部门!=null&item.生产部门!='WC07'){
          options.push({
              value: item.工单号,
              label: item.工单号
          })
          optionss.push({
              value: item.零件说明,
              label: item.零件说明
          })
         }
        　　aSHDQS1.some(function(items){
            if(item.工单号==items.工单号){
              if(items.YORN=='N'){
                item.faliao = 'N'
                  return true
                }else{
                  item.faliao = 'Y'
                }
            }
          });
        });
        var objs = {};
        optionss = optionss.reduce(function(item, next) {
          objs[next.value] ? '' : objs[next.value ] = true && item.push(next);
          return item;
        }, []);
        var obj = {};
        options = options.reduce(function(item, next) {
          obj[next.value] ? '' : obj[next.value ] = true && item.push(next);
          return item;
        }, []);
        var objss = {};
        inputOption = inputOption.reduce(function(item, next) {
          objss[next.value] ? '' : objss[next.value ] = true && item.push(next);
          return item;
        }, []);
        this.options = options
        this.optionss = optionss
        this.inputOption = inputOption
        console.log(inputOption)
       aSHDQS.forEach((item,index)=>{
         if(this.util.deprant(item.生产部门)!=undefined&item.生产部门!='WC07'){
            aSHDQS[index].bumen = this.util.deprant(item.生产部门).name
            aSHDQS[index].gongdan = item.工单号
            aSHDQS[index].jihua = item.计划数量
            aSHDQS[index].faliao = item.faliao
            aSHDQS[index].xinghao = item.零件说明
            aSHDQS[index].id = index+'1'
           if(item.计划工单!=null){
             let diandu = item.是否电镀==null?'':item.是否电镀.replace(/\s+/g, "")
              this.objColor= []
              let copyObj = Object.assign({}, item,this.getColor(diandu,item,''));
              aSHDQS[index] = copyObj
            }
         }
       })
        this.objData = aSHDQS
        this.loading.close();
     },
    //  懒加载树
      load(tree, treeNode, resolve) {
        let node = []
        this.objData.forEach((item,index)=>{
          if(tree.bumen==item.bumen){
            node.push(item)
          }
        })
        resolve(node)
      
      },
      // 颜色赋值
      tableRowClassName({row, column, rowIndex, columnIndex}){
       
        if(row.计划工单!=null){
          if(row.电镀制单!=null||row.外协制单!=null||row.入库制单!=null){
            if(columnIndex!=0&columnIndex!=1&columnIndex!=2){
                if(row[column.property+'1']=='lv'){
                  return 'color: #00B050'
                }
                if(row[column.property+'1']=='hong'){
                  return 'color: red'
                }
                if(row[column.property+'1']=='lan'){
                return 'color: #8DB4E2'
                }
            }
          }

        }
        if(row.hasChildren!=true&column.property=='faliao'){
          if(row.faliao=="Y"){
            return 'color: #00B050';
          }else{
            return 'color: red';
          }
        }
     
    
      },
      // 颜色赋值
      tableRowClassNames({row, column, rowIndex, columnIndex}){
       
        if(row.计划工单!=null){
          if(row.电镀制单!=null||row.外协制单!=null||row.入库制单!=null){
            if(columnIndex!=0&columnIndex!=1&columnIndex!=2&row[column.property+'1']!=undefined){
              // console.log(row[column.property+'1']) 
              return 'yes'
            }
          }

        }
        if(row.hasChildren!=true&column.property=='faliao'){
          return 'yes';
        }
     
    
      },
      // 行点击
      cellClick(row, column, cell, event){
        this.gridData = []
        this.gongdanData = []
        if(row.hasChildren!=true&column.label=='发料'){
          this.dialogTableVisible=true
          this.title = row.gongdan+'发料明细'
         
          this.$api.get('/api/WLGZB1',{job:row.gongdan},res=>{
            console.log(JSON.parse(res.data).Table)
            this.gridData = JSON.parse(res.data).Table
          })
         
        }
        if(row.hasChildren!=true&column.label=='工单'){
          this.gongdanTableVisible = true
          this.title = row.gongdan+'送货单详情'
          console.log(row)
          this.$api.get('/api/WLGZB2',{gd:row.gongdan},res=>{
            console.log(JSON.parse(res.data).Table)
            this.gongdanData = JSON.parse(res.data).Table
          })
        }
        
      },
      // 颜色赋值
      tableRowClassNamea(e){
        if (e.row.hasChildren==false) {
          if(e.row.fidIn==false){
            return '';
          }
          if(e.row.gongdan==undefined){
            return 'hidden-row';
          }else{
            e.row.fidIn = false
            return 'headerBox';
          }
          
        }
       
        return '';
      },
      // 呵护编号查找
      blurChange(e){
        console.log(this.khbianhao)
        let list = []
        this.objData.forEach((item)=>{
          if(this.khbianhao==item.客户编号){
            console.log(item)
            list.push({
              label:item.客户订单号,
              value:item.客户订单号
            })
          }
        })
        var objss = {};
        list = list.reduce(function(item, next) {
          objss[next.value] ? '' : objss[next.value ] = true && item.push(next);
          return item;
        }, []);
        this.inputoption = list

      },
      // 型号查找
      inputChange(e){
        this.loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        this.khbianhaos = e
        this.times()
        this.$set(this.tableData1)
      }
   }
}
</script>

<style>
.marquee {background-color:burlywood;height:50px;}


  /* lv */
  .el-table .yes {
    background: #F5F7FA !important;
  }
  /* hong */
  .el-table .no {
    background:red !important;
  }
  /* lan */
  .el-table .lod {
    background: #8DB4E2 !important;
  }
  .el-input{
    width: auto !important;
  }
  .el-table .hidden-row {
    display: none;
  }
@keyframes fade {
    from {
        opacity: 1.0;
    }
    50% {
        opacity: 0.4;
    }
    to {
        opacity: 1.0;
    }
}

@-webkit-keyframes fade {
    from {
        opacity: 1.0;
    }
    50% {
        opacity: 0.4;
    }
    to {
        opacity: 1.0;
    }
}
/* tr.el-table__row:nth-child(2){
  color: #fff;
} */
.headerBox {
    /* color: #fff; */
    /* padding: 10px; */
    /* font-size: 15px; */
    /* height: 60px; */
    animation: fade 600ms 3;
    -webkit-animation: fade 600ms 3;
}

  .el-table th>.cell,.el-table .cell{
    padding-left: 0px !important;
    padding-right: 0px !important;
    text-align: center !important;
  }
  .el-table__indent{
    padding-left: 0px !important;
  }
  .el-table [class*=el-table__row--level] .el-table__expand-icon{
    margin-right: 0px !important;
  }
  .gongdan .el-dialog{
    width: 100% !important;
  }
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
  .el-row{
    border: 1px solid #EBEEF5;
    background: #F5F7FA;
    font-size: 14px;
    color: #606266;
  }
  .el-col{
    border-left: 1px solid #EBEEF5;
    padding: 12px 0;
    padding-left: 3px !important;
    padding-right: 0px !important;
  }
  
</style>