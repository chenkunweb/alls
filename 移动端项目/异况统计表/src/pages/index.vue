<template>
  <div>
    <!-- 头部导航 -->
    <header-bom :msg="titles"></header-bom>
    <!-- 日期选择器 -->
    <el-date-picker size="small" v-model="times" @change="timesChange" value-format="yyyy-MM-dd" type="daterange" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"></el-date-picker>
    <!-- 第一个表格展示所有部门数据 -->
    <el-table :data="tableData" @row-click="tableRowClick" border style="width: 100%">
      <el-table-column  prop="depament" label="部门" ></el-table-column>
      <el-table-column prop="异况数" label="异况数"></el-table-column>
    </el-table>
    <el-dialog :title="depament+'异况分类统计'" :visible.sync="outerVisible">
      <el-table :data="gridData" @row-click="tableRowClicks" border style="width: 100%">
        <el-table-column property="类型" label="异况类型" ></el-table-column>
        <el-table-column property="异况数" label="记录数" ></el-table-column>
      </el-table>
      <el-dialog  :title="depament+'异况类型('+type+')详情'" :visible.sync="innerVisible"  append-to-body>
        <el-table :data="typeData"  border style="width: 100%">
          <el-table-column property="工单号" min-width="8" label="工单号" ></el-table-column>
          <el-table-column property="产品型号" min-width="14" label="产品型号" ></el-table-column>
          <el-table-column property="生产交期" min-width="10" label="交期" ></el-table-column>
          <el-table-column property="计划数量" min-width="8" label="计划数" ></el-table-column>
          <el-table-column property="num" min-width="10" label="未完成数b" ></el-table-column>
          <el-table-column property="类型" min-width="10" label="类型" ></el-table-column>
          <el-table-column property="申述原因" min-width="30" label="申述原因" ></el-table-column>
          <el-table-column property="审核结果" min-width="10" label="审批结果" ></el-table-column>
        </el-table>
      </el-dialog>
    </el-dialog>
  </div>
</template>

<script>
import * as getData from '../api/getDate';
export default {
  data(){
    return{
      // 部门列表
      tableData: [],
      // 类型列表
      gridData:[],
      // 数据列表
      typeData:[],
      // 部门
      depament:'',
      // 类型
      type:'',
      // 异况分类统计弹窗
      outerVisible:false,
      // 异况类型详情弹窗
      innerVisible:false,
      // 时间
      times:[getData.dateUtils.yesterday({ymrSign:true}),getData.dateUtils.today({ymrSign:true})]
    }
  },
  created(){
    //头部导航
    this.titles={
        a:{name:'应用程序',path:'/pages/index/index'},
        b:{name:'异况统计表',path:'/index'},
    }
    // 初始化数据，默认昨天到今天的时间范围
    this.timesChange([getData.dateUtils.yesterday({ymrSign:true}),getData.dateUtils.today({ymrSign:true})])
  },
  methods:{
    // 时间查询
    async timesChange(e){
      this.tableData = []
      let all_Data = {date1:e[0],date2:e[1]}
      let all_list = JSON.parse(await this.$api.api.get('/api/Plansstj',all_Data)).Table
      let department = JSON.parse(await this.$api.api.get('/api/WC','')).Table
      if(all_list!=''){
        all_list.forEach((item)=>{
          department.forEach((items)=>{
            if(items.ERP部门代号==item.车间.replace(/\s+/g, "")){
              item.depament = items.ERP部门
              item.datas = e
            }
          })
        })
        this.tableData = all_list
      }
      
      
    },
    // 部门列表行点击
    async tableRowClick(row, column, event){
      this.gridData = []
      this.depament = row.depament
      let depament_Data = {date1:row.datas[0],date2:row.datas[1],bm:row.车间.replace(/\s+/g, "")}
      let depament_list = JSON.parse(await this.$api.api.get('/api/Plansstj',depament_Data)).Table
      depament_list.forEach((item)=>{
        item.depament = row.车间.replace(/\s+/g, "")
        item.datas = row.datas
      })
      this.outerVisible = true
      this.gridData = depament_list
    },
    // 异况分类统计列表行点击
    async tableRowClicks(row, column, event){
      this.innerVisible = true
      this.type = row.类型.replace(/\s+/g, "")
      this.typeData = []
      let type_Data = {date1:row.datas[0],date2:row.datas[1],bm:row.depament,type:row.类型.replace(/\s+/g, "")}
      let type_list = JSON.parse(await this.$api.api.get('/api/Plansstj',type_Data)).Table
      type_list.forEach((item)=>{
        item.num = item.计划数量*1-item.完成数量*1
      })
      this.typeData = type_list
    }
  },
  mounted(){

  }
  
}
</script>

<style>
.el-date-range-picker .el-picker-panel__body{
  min-width: 0px !important;
  width: 100%
}
.el-picker-panel{
  width: 100% !important;
  left:0px !important;
  top:55px !important;
}
.el-date-range-picker__content{
   width: 100% !important;
   padding: 0px 16px !important;
}
.el-dialog{
  width: 100% !important;
  margin-top:0px !important;
}
.el-dialog__body{
  padding:0px 5px !important;
}
.el-dialog__header{
  text-align: center;
}
.el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
  padding-left: 0px !important; 
}
.el-table .cell{
  padding-right: 0px !important;
}
</style>