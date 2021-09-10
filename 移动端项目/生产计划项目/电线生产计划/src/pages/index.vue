<template>
  <div>
    <header-bom :msg="titles"></header-bom>
    
    <el-form ref="form" style="display:flex;justify-content: left;"  :model="form" >
        <el-form-item style="width:35%">
          <el-switch @change="opens" v-model="cxValue" active-text="生产日期" inactive-text="交期"> </el-switch>
        </el-form-item>
        <el-form-item style="width:33%">
          <el-date-picker v-model="form.date1"  type="date"  @change="onSubmit" value-format="yyyy-MM-dd" :placeholder="time"></el-date-picker>
        </el-form-item>
        
     
    </el-form>
    <el-table ref="dataTable" :data="tableData" border :height="height" :cell-style="changeCellStyle"
    :header-cell-style="changeHeaderStyle" @header-click="click"  style="width: 100%">
       <el-table-column prop="riqi" :fixed="fixed['生产日期']" label="生产日期" :width="this.util.flexColumnWidth('riqi',tableData)" > </el-table-column>
      <el-table-column prop="gongdan" :fixed="fixed['工单号']" label="工单号" > </el-table-column>
      <el-table-column prop="pihao" :fixed="fixed['批号']" :width="this.util.flexColumnWidth('pihao',tableData)" label="批号"> </el-table-column>
      <el-table-column prop="xinghao"  :fixed="fixed['产品型号']" :width="this.util.flexColumnWidth('xinghao',tableData)" label="产品型号"> </el-table-column>
      <el-table-column prop="shuliang" :fixed="fixed['数量']" label="数量"> </el-table-column>
      <el-table-column prop="wancheng"   label="完成数量"> </el-table-column>
     <el-table-column prop="shenhe"  label="审核"> </el-table-column>
      <el-table-column prop="jiaoqi" :fixed="fixed['交期']" :width="this.util.flexColumnWidth('jiaoqi',tableData)" label="交期"> </el-table-column>
      <el-table-column prop="zhuangtai" :fixed="fixed['状态']" label="状态"> </el-table-column>
      <el-table-column prop="beizhu" :fixed="fixed['备注']" label="备注"> </el-table-column>
      
    </el-table>
   
  </div>
  
</template>

<script>
import * as getData from '../api/getDate';
export default {
  data(){
    return{
      cxValue:true,//生产日期切换
      height:'',//高度
      fixed:{生产日期:false,工单号:false,批号:false,产品型号:false,数量:false,状态:false,备注:false,交期:false},//固定列
      // 选择器为空内容
      time:getData.dateUtils.today({ymrSign:true}),
      // 时间
      form:{date1:getData.dateUtils.today({ymrSign:true}),},
      // 数据
      tableData: [],
      // 部门代号
      wc:'WC04',
      // 部门名字
      name:'电线'
    }
  },
    created(){
      this.times = getData.dateUtils.today({allTimeSign:true})
      this.height = document.documentElement.clientHeight-77
        this.titles={
            a:{name:'应用程序',path:'/pages/index/index'},
            b:{name:'电线生产计划',path:'/index'},
        }
        if(this.$store.state.date){
          this.form.date1 = this.$store.state.date
        }
        this.onSubmit()
       
    },
    methods:{
      //切换日期重新查询
      opens(){
        this.onSubmit(this.form.date1)
      },
     // 头部列固定颜色
      changeHeaderStyle(row, column, rowIndex, columnIndex){
        if(row.column.fixed === true){
                return 'color: #1296DB'  // 修改的样式
            }else{
                return ''
            }
          
      },
      // 身体列固定颜色
      changeCellStyle (row, column, rowIndex, columnIndex) {
       if(row.column.fixed === true){
                return 'color: #1296DB'  // 修改的样式
            }else{
                return ''
            }
      },
          //固定栏
      click(column, event){
            
            if(column.fixed ==false){
                this.fixed[column.label] = true
            }else{
                this.fixed[column.label] = false
            }
      },
      // 查询
      async onSubmit(e){
        this.tableData = []
        let data = {wc:this.wc,date1:this.form.date1,date2:'',job:'', }
        if(this.cxValue==false){
          data = {wc:this.wc,date2:this.form.date1,date1:'',job:'', }
        }
        let all = JSON.parse(await this.$api.api.get('/api/Plangetp',data)).Table
        let list = all.sort(function(a, b) {
          return b.生产日期 < a.生产日期 ? 1 : -1
        })
        list.forEach((item,index)=>{
         let wancheng = item.完成数量==null?'':item.完成数量.replace(/\s+/g, "")
          let riqi = item.生产日期.replace(/\s+/g, "")
          let riqis = riqi.substring(2,riqi.length);
          let jiaoqi = item.交期.replace(/\s+/g, "")
          let jiaoqis = jiaoqi.substring(2,jiaoqi.length);
          let shenhe = item.审核人==null?'未审核':item.审核人.replace(/\s+/g, "")
            this.tableData.push({
              riqi:riqis,
              gongdan:item.工单号.replace(/\s+/g, ""),
              pihao:item.生产批号.replace(/\s+/g, ""),
              xinghao:item.产品型号.replace(/\s+/g, ""),
              shuliang:item.数量.replace(/\s+/g, ""),
              zhuangtai:item.状态.replace(/\s+/g, ""),
              diandu:item.是否电镀.replace(/\s+/g, ""),
              beizhu:item.备注.replace(/\s+/g, ""),
              jiaoqi:jiaoqis,
              wancheng:wancheng,
              shenhe:shenhe
            })
          })
        console.log(all)
      },
      // 重置
      resetForm(formName) {
        let time = getData.dateUtils.today({ymrSign:true})
        this.form.date1 = time
      },
     
    },
   
    
}
</script>

<style>
.wancheng .el-input__inner{
  padding: 0px !important;
}
.el-form-item{
    margin-bottom: 0px !important;
  }
  .el-table__body-wrapper tbody tr:last-child{
    background-color: #F5F7FA;
  }
  .el-table__body-wrapper tbody tr:last-child td:last-child {
    
    text-align: center
  }
.el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
  padding-left: 0px; 
}
.el-table .cell{
      padding-right: 0px;
}
.el-table td, .el-table th{
  text-align: center
}
  </style>