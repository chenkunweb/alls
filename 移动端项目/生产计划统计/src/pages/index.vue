
<template>
 <div>
   <header-bom :msg="titles"></header-bom>
   <el-table :data="tableData" :height="height" @row-click="tableRowClick" style="width: 100%;margin-top: 35px">
    <el-table-column   label="每月生产计划" >
      <el-table-column   >
        <el-table-column  prop="年月" label="年月" > </el-table-column>
      </el-table-column>
      <el-table-column   label="记录"  >
        <el-table-column  prop="记录数" label="数量(条)" > </el-table-column>
        <el-table-column  prop="不及时数" label="无计划送货" > </el-table-column>
        <el-table-column  prop="取消数" label="取消比" > </el-table-column>
        <el-table-column  prop="删除数" label="删除比" > </el-table-column>
      </el-table-column>
      <el-table-column   label="完成">
        <el-table-column  prop="超前数" label="超前比" > </el-table-column>
        <el-table-column  prop="按时数" label="按时比" > </el-table-column>
        <el-table-column  prop="延期数" label="延期比" > </el-table-column>
        <el-table-column  prop="未完数" label="未完比" > </el-table-column>
      </el-table-column>
    </el-table-column>
    
  </el-table>
  <el-dialog title="" :visible.sync="dialogTableVisible">
    <el-table :data="gridData" :height="height" style="width: 100%">
      <el-table-column   :label="lable" >
        <el-table-column   >
          <el-table-column  prop="车间" label="车间" min-width="10"> </el-table-column>
        </el-table-column>
        <el-table-column   label="记录"  >
          <el-table-column  prop="记录数" label="数量(条)" min-width="10"> </el-table-column>
          <el-table-column  prop="不及时数" label="无计划送货" min-width="10"> </el-table-column>
          <el-table-column  prop="取消数" label="取消比" min-width="10"> </el-table-column>
          <el-table-column  prop="删除数" label="删除比" min-width="10"> </el-table-column>
        </el-table-column>
        <el-table-column   label="完成">
          <el-table-column  prop="超前数" label="超前比" min-width="10"> </el-table-column>
          <el-table-column  prop="按时数" label="按时比" min-width="10"> </el-table-column>
          <el-table-column  prop="延期数" label="延期比" min-width="10"> </el-table-column>
          <el-table-column  prop="未完数" label="未完比" min-width="10"> </el-table-column>
        </el-table-column>
      </el-table-column>
      
    </el-table>
  </el-dialog>
 </div>
</template>


<script>
  export default {
    data() {
      return {
        // 数据列表
       tableData: [],
      //  弹窗
       dialogTableVisible:false,
      //  弹窗数据列表
       gridData:[],
      //  弹窗标题
       lable:'',
      //  高度
       height:document.documentElement.clientHeight-35
      };
    },
    mounted(){
      let that = this
      // 动态高度获取
      window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight-35;
        that.height = window.fullHeight;
      })()
    };
    },
    created(){
      this.titles={
          a:{name:'应用程序',path:'/pages/index/index'},
          b:{name:'生产计划统计',path:'/index'},
      }
      // 初始化数据获取
       this.$api.get('/api/SCJHTJ','',res=>{
         let list = []
         JSON.parse(res.data).Table.forEach((item)=>{
           let shuliang = item.记录数*1
           let wancheng = item.超前数*1+item.按时数*1+item.延期数*1+item.未完数*1
            list.push({
              年月:item.年月,
              记录数:item.记录数*1,
              不及时数:item.不及时数*1,
              取消数:shuliang==0?shuliang:this.toPercent(item.取消数*1/shuliang),
              删除数:shuliang==0?shuliang:this.toPercent(item.删除数*1/shuliang) ,
              超前数:wancheng==0?wancheng:this.toPercent(item.超前数*1/wancheng) ,
              按时数:wancheng==0?wancheng:this.toPercent(item.按时数*1/wancheng) ,
              延期数:wancheng==0?wancheng:this.toPercent(item.延期数*1/wancheng) ,
              未完数:wancheng==0?wancheng:this.toPercent(item.未完数*1/wancheng) ,
            })

         })
         this.tableData =list
       })
    },
    methods: {
      // 表格行点击
      tableRowClick(row, column, event){
        this.gridData = []
        this.dialogTableVisible=true
        this.lable = '部门生产计划（'+row.年月.split('-')[1]+'月份)'
        this.$api.get('/api/SCJHTJ',{ym:row.年月},res=>{
          let list = []
          JSON.parse(res.data).Table.forEach((item)=>{
            let shuliang = item.记录数*1
            let wancheng = item.超前数*1+item.按时数*1+item.延期数*1+item.未完数*1
              list.push({
                车间:this.util.deprant(item.车间.replace(/\s+/g, "")).name,
                记录数:item.记录数*1,
                不及时数:item.不及时数*1,
                取消数:shuliang==0?shuliang:this.toPercent(item.取消数*1/shuliang),
                删除数:shuliang==0?shuliang:this.toPercent(item.删除数*1/shuliang) ,
                超前数:wancheng==0?wancheng:this.toPercent(item.超前数*1/wancheng) ,
                按时数:wancheng==0?wancheng:this.toPercent(item.按时数*1/wancheng) ,
                延期数:wancheng==0?wancheng:this.toPercent(item.延期数*1/wancheng) ,
                未完数:wancheng==0?wancheng:this.toPercent(item.未完数*1/wancheng) ,
              })

          })
          this.gridData =list
        })
      },
      // 百分比处理函数
      toPercent(point){
            if (point==0) {
                return 0;
            }
            var str=Number(point*100).toFixed(2);
            str+="%";
            return str;
        }
    },

    watch:{
      height(val){
        console.log(val)
      }
    }
  };
</script>
<style >
html,body{
  margin:0px;
  padding: 0px;
}
  .el-dialog{
    width: 100% !important;
    margin-top: 0px !important;
  }
   .el-table th>.cell,.el-table .cell{
    padding-left: 0px !important;
    padding-right: 0px !important;
    text-align: center !important;
  }
  .el-table th{
    padding:5px 0px !important;
  }
  .el-table__indent{
    padding-left: 0px !important;
  }
  .el-table [class*=el-table__row--level] .el-table__expand-icon{
    margin-right: 0px !important;
  }
  .el-dialog__headerbtn{
    top:0px !important;
  }
  .el-dialog__body{
    padding: 0px !important;
  }

</style>