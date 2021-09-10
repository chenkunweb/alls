
<template>
 <div>
   <el-table :data="tableData" :height="height" @row-click="tableRowClick" style="width: 100%">
    <el-table-column   label="每月送货单" >
        <el-table-column  prop="年月" label="年月" > </el-table-column>
        <el-table-column  prop="制单数" label="制单" > </el-table-column>
        <el-table-column  prop="审核数" label="品管" > </el-table-column>
        <el-table-column  prop="送货数" label="送货" > </el-table-column>
        <el-table-column  prop="放行数" label="放行" > </el-table-column>
        <el-table-column  prop="收货数" label="入库" > </el-table-column>
       
    </el-table-column>
    
  </el-table>
  <el-dialog title="" :visible.sync="dialogTableVisible">
    <el-table :data="gridData" @row-click="tableRowClicks" :height="height" style="width: 100%">
      <el-table-column   :label="lable" >
          <el-table-column  prop="车间" label="车间" > </el-table-column>
          <el-table-column  prop="制单数" label="制单" > </el-table-column>
          <el-table-column  prop="审核数" label="品管" > </el-table-column>
          <el-table-column  prop="送货数" label="送货" > </el-table-column>
          <el-table-column  prop="放行数" label="放行" > </el-table-column>
          <el-table-column  prop="收货数" label="入库" > </el-table-column>
      </el-table-column>
      
    </el-table>
  </el-dialog>
  <el-dialog title="" :visible.sync="dialogTableVisibles">
    <el-table :data="self" :height="height" style="width: 100%">
      <el-table-column   :label="lables" >
          <el-table-column  prop="制单" label="制单" > </el-table-column>
          <el-table-column  prop="制单数" label="记录" > </el-table-column>
          <el-table-column  prop="审核" label="品管" > </el-table-column>
          <el-table-column  prop="审核数" label="记录" > </el-table-column>
          <el-table-column  prop="送货" label="送货" > </el-table-column>
          <el-table-column  prop="送货数" label="记录" > </el-table-column>
          <el-table-column  prop="放行" label="放行" > </el-table-column>
          <el-table-column  prop="放行数" label="记录" > </el-table-column>
          <el-table-column  prop="收货" label="入库" > </el-table-column>
          <el-table-column  prop="收货数" label="记录" > </el-table-column>
      </el-table-column>
      
    </el-table>
  </el-dialog>
 </div>
</template>


<script>
  export default {
    data() {
      return {
        // 送货单数据
       tableData: [],
       //  车间送货单弹窗
       dialogTableVisible:false,
       //  详情列表弹窗
       dialogTableVisibles:false,
      //  车间送货单数量
       gridData:[],
      //  详情列表
       self:[],
       //  车间送货单标题
       lable:'',
      //  高度
       height:document.documentElement.clientHeight,
        //  详情列表标题
       lables:''
      };
    },
     mounted(){
      let that = this
      // 动态高度
      window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        that.height = window.fullHeight;
      })()
    };
    },
    created(){
      //  初始化数据
       this.$api.get('/api/SHDTJ','',res=>{
         let list = []
         JSON.parse(res.data).Table.forEach((item)=>{
           let shuliang = item.记录数*1
           let wancheng = item.超前数*1+item.按时数*1+item.延期数*1+item.未完数*1
            list.push({
              年月:item.年月,
              制单数:item.制单数*1,
              审核数:item.审核数*1,
              送货数:item.送货数*1,
              放行数:item.放行数*1,
              收货数:item.收货数*1,
              
              
            })

         })
         this.tableData =list
       })
    },
    methods: {
      // 每月送货单行点击
      tableRowClick(row, column, event){
        this.dialogTableVisible=true
        this.lable = '部门送货单（'+row.年月.split('-')[1]+'月份)'
        this.times = row.年月
        this.$api.get('/api/SHDTJ',{ym:row.年月},res=>{
          let list = []
          JSON.parse(res.data).Table.forEach((item)=>{
            let shuliang = item.记录数*1
            let wancheng = item.超前数*1+item.按时数*1+item.延期数*1+item.未完数*1
              list.push({
                车间:item.发货方,
                制单数:item.制单数*1,
                审核数:item.审核数*1,
                送货数:item.送货数*1,
                放行数:item.放行数*1,
                收货数:item.收货数*1,
              })

          })
          this.gridData =list
        })
      },
       //  车间送货单数量行点击
      async tableRowClicks(row, column, event){
        this.dialogTableVisibles=true
        this.lables = '个人送货单记录（'+row.车间.replace(/\s+/g, "")+'--'+this.times+'月份)'
        let list =[]
        for( let i=1;i<=5;i++){
          let data = {
            ym:this.times,
            bm:row.车间.replace(/\s+/g, ""),
            i:i,
          }
          let all = JSON.parse(await this.$api.api.get('/api/SHDTJ',data)).Table
          if(i==1){
            list = all
          }else{
            list.forEach((item,index)=>{
              if(all!=''){
                all.forEach((items,indexs)=>{
                  if(index==indexs){
                    let  nameKey = Object.keys(items)
                    let  value = Object.values(items)
                    nameKey.forEach((key,values)=>{
                      item[key]=value[values]
                    })
                    console.log(item)
                  }
                })
                
              }
            })
          }
          
        }
        this.self = list
      },
      // 百分号处理函数
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