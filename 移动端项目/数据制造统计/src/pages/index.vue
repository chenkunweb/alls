<template>
<div>
  <header-bom :msg="titles"></header-bom>
   <div class="block" style="display:flex;justify-content: center;margin-top: 35px;">
    
    <el-date-picker v-model="statDate" type="date" @change="date" @focus="forbid" value-format="yyyy-MM-dd" placeholder="选择开始日期"> </el-date-picker>
    <span style="line-height: 40px;" class="demonstration">-至-</span>
    <el-date-picker v-model="endDate"  type="date" value-format="yyyy-MM-dd" @change="dates" @focus="forbid" placeholder="选择结束日期"> </el-date-picker>
  </div>
 
  <el-table :data="tableData" @row-click="rowClick" :height="height"  style="">
    <el-table-column label="数据制造统计">
        <el-table-column prop="department" :fixed="true"   :filters ="department" :filter-method="filterHandler"  label="车间" >
          
        </el-table-column>
        <el-table-column prop="交期"   label="交期" > </el-table-column>
        <el-table-column prop="type"  label="数据类型" > </el-table-column>
        <el-table-column prop="newNum"  label="应报数" > </el-table-column>
        <el-table-column prop="tiqian"  label="提前" > </el-table-column>
        <el-table-column prop="shishi"  label="实时" > </el-table-column>
        <el-table-column prop="yanqi"  label="延期" > </el-table-column>
        <el-table-column prop="value"  label="缺失" > </el-table-column>
        <el-table-column prop="userName"  label="责任人" > </el-table-column>
        <el-table-column prop="fen"  label="绩效分" > </el-table-column>
    </el-table-column>
  </el-table>
  <el-dialog :title="rowData.department+rowData.type+'绩效分('+rowData.fen+')详情'" :visible.sync="dialogTableVisible">
    <el-table :data="rowData.lista"   :height="height">
      <el-table-column prop="工单号"  :label="'交期：'+times" >
        <el-table-column prop="工单号"  label="工单号" > </el-table-column>
      </el-table-column>
      <el-table-column prop="报数员"  :label="'应报数：'+rowData.newNum" >
        <el-table-column prop="报数员"  label="报数员" > </el-table-column>
      </el-table-column>
      <el-table-column prop="报数日期"  :label="'提前：'+rowData.tiqian" >
        <el-table-column prop="报数日期"  label="报数日期" > </el-table-column>
      </el-table-column>
      <el-table-column prop="生产日期"  :label="'实时：'+rowData.shishi" >
        <el-table-column prop="生产日期"  label="生产日期" > </el-table-column>
      </el-table-column>
      <el-table-column prop="申述人"  :label="'延期：'+rowData.yanqi" >
        <el-table-column prop="申述人"  label="申述人" > </el-table-column>
      </el-table-column>
      <el-table-column prop="申述时间"  :label="'缺失：'+rowData.value" >
        <el-table-column prop="申述时间"  label="申述时间" > </el-table-column>
      </el-table-column>
    </el-table>
  </el-dialog>
</div>
  
</template>

<script>
import * as getData from '../api/getDate';
  export default {
    data() {
      return {
        // 高度
        height:'',
        // 原数据
        tableData: [],
        timer:null, //定时器名称
        // 开始时间
         statDate: getData.dateUtils.yesterday({ymrSign:true}),
        //  结束时间
         endDate: getData.dateUtils.yesterday({ymrSign:true}),
        //  部门列表
         department:[],
        //  交期列表
         times:[],
        //  控制弹窗
         dialogTableVisible:false,
        //  数据列表
         rowData:[],
      }
    },
    beforeDestroy(){
      clearInterval(this.timer);        
      this.timer = null;
    },
      mounted(){
        this.timer = setInterval(() => {
            setTimeout(this.getData(this.statDate,this.endDate), 0)
        }, 1000*60*5)
        
      },
    created(){
      this.height = document.documentElement.clientHeight-75
      if(this.$store.state.date1!=undefined&&this.$store.state.date2!=undefined){
        this.statDate = this.$store.state.date1
        this.endDate = this.$store.state.date2
      }
      this.getData(this.statDate,this.endDate)
      this.titles={
          a:{name:'应用程序',path:'/pages/index/index'},
          b:{name:'数据制造统计',path:'/index'},
      }
    },
    methods:{
      // 选择日期禁用键盘
      forbid(){
          //禁止软键盘弹出
          document.activeElement.blur();
      },
      // 表格行点击事件
      rowClick(row, column, event){
        this.dialogTableVisible = true
        this.rowData = row
      },
      // 赛选
      filterHandler(value, row, column) {
         return row.department === value;
      },
      filterHandlers(value, row, column) {
         return row.交期.replace(/\s+/g, "") === value;
      },
      // 初始化数据
      async getData(statDate,endDate){
        let data = { i:1,date1:statDate, date2:endDate, }
        let list = JSON.parse(await this.$api.api.get('/api/DTSCBC',data)).Table
        let obj = {};
        let peon = list.reduce((cur,next) => {
            obj[next.车间.replace(/\s+/g, "")] ? "" : obj[next.车间.replace(/\s+/g, "")] = true && cur.push({
              交期:next.交期,
              数据类型:next.数据类型,
              车间:next.车间,
              实报数:0,
              实时数量:0,
              实时申述:0,
              应报数:0,
              延期数量:0,
              延期申述:0,
              报and申:0,
              提前数量:0,
              提前申述:0,
              
            });
            return cur;
        },[])
        list.forEach((item)=>{
          peon.forEach((items)=>{
            if(item.车间.replace(/\s+/g, "")==items.车间.replace(/\s+/g, "")){
              console.log(items)
              items.实报数 = items.实报数*1+item.实报数
              items.实时数量 = items.实时数量*1+item.实时数量
              items.实时申述 = items.实时申述*1+item.实时申述
              items.应报数 = items.应报数*1+item.应报数
              items.延期数量 = items.延期数量*1+item.延期数量
              items.延期申述 = items.延期申述*1+item.延期申述
              items.报and申 = items.报and申*1+item.报and申
              items.提前数量 = items.提前数量*1+item.提前数量
              items.提前申述 = items.提前申述*1+item.提前申述
              
            }
          })
        })
        this.tableData = peon
        let times 
         if(statDate==endDate){
           times = {
             text:statDate, 
             value:statDate,
           }
         }else{
           times = {
             text:statDate+'~'+endDate, 
             value:statDate+'~'+endDate,
           }
         }

         this.times = times.text
        let lists = JSON.parse(await this.$api.api.get('/api/DTSCBC','')).Table
        let datass = {corpid:'ww4b634cb35b1893b8',corpsecret:'bFQsey2uIhGOvfCb_4o9VA7RW1Nlxe5n9CFanLBxt2U'}
        let access_token = JSON.parse(await this.$api.api.get('/api/weixin',datass)).access_token
        let datas = { access_token:access_token, department_id:1, fetch_child:1, }
        let userlist = JSON.parse(await this.$api.api.get('/api/userlist',datas)).userlist
        lists.forEach((item)=>{
          userlist.forEach((items)=>{
            if(item.用户ID==items.userid){
              item.username = items.name
              item.address =items.address.split('/')[1]
            }
          })
        })
         this.tableData.forEach(async(item)=>{
           item.department =this.util.deprant(item.车间.replace(/\s+/g, "")).name
           let department = []
            lists.forEach((items)=>{
              if(items.增*1==1){
                if(items.模块名.indexOf(item.department)!=-1){
                  department.push(items)
                }
                
              }
            })
          department = department.map((items)=>{ return items.username })
          item.userName = Array.from(new Set(department)).toString()
           item.newNum = item.应报数
           item.tiqian = item.提前数量*1
           item.shishi = item.实时数量*1
           item.yanqi = item.延期数量*1
           item.value = item.newNum -item.tiqian-item.shishi-item.yanqi
           item.type = item.数据类型==null?'':item.数据类型
           let p = JSON.parse(await this.$api.api.get('/api/DTSCBCJ',{a1:item.type})).Table[0]
           item.fen = p.提前*1*item.tiqian+p.延期*1*item.yanqi+p.缺失*1*item.value
           item.交期=times
           let datasss = {wc:item.车间.replace(/\s+/g, ""), date:statDate, }
           let lista = JSON.parse(await this.$api.api.get('/api/DTSCBC',datasss)).Table
           lista = lista.map((item)=>{
            return{
              工单号:item.工单号==null?'':item.工单号.replace(/\s+/g, ""),
              报数员:item.报数员==null?'':item.报数员.replace(/\s+/g, ""),
              报数日期:item.报数日期==null?'':item.报数日期.split(' ')[0],
              生产日期:item.生产日期==null?'':item.生产日期.replace(/\s+/g, ""),
              申述人:item.申述人==null?'':item.申述人.replace(/\s+/g, ""),
              申述时间:item.申述时间==null?'':item.申述时间.replace(/\s+/g, ""),
            }
           })
           item.lista = lista
           this.$set(item)
         })
       
      },
      // 开始日期选择事件
      date(){
        this.endDate = ''
      },
      // 结束日期选择事件
      dates(){
        console.log(this.statDate)
        console.log(this.endDate)
        this.getData(this.statDate,this.endDate)

      },
    }
  }
</script>
<style  >
  .el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
    padding-left: 0px !important;
    padding-right: 0px !important;
    text-align: center !important;
  }
  .el-table th>.cell{
    padding-left: 0px !important;
    padding-right: 0px !important;
  }
  .el-table td, .el-table th{
    padding: 5px 0 !important;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 140px !important;
  }
  .el-dialog{
    margin-top:0px !important;
    margin:0px !important;
    width:100% !important;
  }
  .el-dialog__body,.el-dialog__header{
    padding: 0px !important;
  }
  .el-dialog__header{
    padding: 15px 0 0 0 !important;
  }
  .el-input--suffix .el-input__inner{
    padding-right: 0px !important;
  }
  
</style>