<template>
  <div>
    <header-bom :msg="titles"></header-bom>
    <div class="jilu-link">
        <router-link to="/index">日达成率</router-link>
        <div class="border"></div>
        <router-link to="/month" >月达成率</router-link>
    
    </div>
    <el-form ref="form" style="display:flex"  >
        <el-form-item>
          <el-date-picker
            v-model="times"
            :editable="false"
            type="daterange"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :placeholder="time"
            @change="onSubmit">
          </el-date-picker>
       </el-form-item>
      
    </el-form>
    <el-table :data="tableData" :height="height" border  @row-click="click" @cell-click="cellClick" :cell-style="changeCellStyle"
    :header-cell-style="changeHeaderStyle" @header-click="clicks"  style="width: 100%">
      <el-table-column prop="部门" :fixed="fixed['部门']" label="部门" > </el-table-column>
      <el-table-column prop="list[0].刚性总达成率" :fixed="fixed['刚性']" label="刚性" ></el-table-column>
      <el-table-column prop="list[0].柔性总达成率" :fixed="fixed['柔性']" label="柔性" ></el-table-column>
      <el-table-column prop="list[0].品质总达成率" :fixed="fixed['品管审核']" label="品管审核" ></el-table-column>
      <el-table-column prop="list[0].仓库总达成率" :fixed="fixed['仓库审核']" label="仓库审核" ></el-table-column>
      <el-table-column prop="list[0].刚性总绩效分" :fixed="fixed['刚性累计']" label="刚性累计绩效分" ></el-table-column>
      <el-table-column prop="list[0].柔性总绩效分" :fixed="fixed['柔性累计']" label="柔性累计绩效分" ></el-table-column>
      <el-table-column prop="list[0].实时完工批次" :fixed="fixed['实时完工批次']" label="实时完工批次" ></el-table-column>
      <el-table-column prop="list[0].合计绩效" :fixed="fixed['合计绩效']" label="合计绩效" ></el-table-column>
      
    </el-table>
    
    
  </div>
  
</template>

<script>
import * as getData from '../api/getDate';
// import wx from 'weixin-js-sdk'
export default {
  data(){
    return{
      // 固定列
      fixed:{部门:false,"刚性":false,"柔性":false,'品管审核':false,'仓库审核':false,'人工统计':false,'刚性累计':false,'柔性累计':false,'实时完工批次':false,'合计绩效':false},
      time:getData.dateUtils.today({ymrSigna:true}),
      // 时间
      times:[],
      // 数据
      tableData: [],
      num:[],
      ooo:0,
      datass:[],
      thdcl:[],
      deslab:false,
      bianji:0,
      startTime:getData.dateUtils.thisMonthFirst({ymrSign:true}),
      endTime:getData.dateUtils.thisMonthLast({ymrSign:true}),
      // 高度
      height:'',
      rjxfLists:''
    }
  },
  
    created(){
    
      this.height = document.documentElement.clientHeight - 122
    
        let yesterday,time
        if(this.$store.state.date!=undefined){
          this.times = this.$store.state.date
          console.log(this.$store.state.date)
          this.startTime = this.$store.state.date[0]
          this.endTime = this.$store.state.date[1]
          yesterday = this.$store.state.date[0]
          time = this.$store.state.date[1]
        }else{
          yesterday = getData.dateUtils.thisMonthFirst({ymrSign:true})
          time = getData.dateUtils.today({ymrSign:true})
        }
        
        this.titles={
            a:{name:'应用程序',path:'/pages/index/index'},
            b:{name:'月达成率汇总',path:'/month'},
        }
       
        
        this.onSubmit([yesterday,time])
    },
    mounted(){
     
     
    },
    methods:{
      // 固定列头部颜色
      changeHeaderStyle(row, column, rowIndex, columnIndex){
        if(row.column.fixed === true){
                return 'color: #1296DB'  // 修改的样式
            }else{
                return ''
            }
          
      },
      // 固定列身体颜色
      changeCellStyle (row, column, rowIndex, columnIndex) {
       if(row.column.fixed === true){
                return 'color: #1296DB'  // 修改的样式
            }else{
                return ''
            }
          },
           // 固定列
        clicks(column, event){
            if(column.fixed ==false){
                this.fixed[column.label] = true
            }else{
                this.fixed[column.label] = false
            }
      },
      // 点击跳转统计
      cellClick(row, column, cell, event){
        
        if(column.label=='刚性'||column.label=='柔性'){
          console.log(row)
          this.$router.push({path: '/tongji',query:{label:column.label}});
          this.$store.state.tongjiList = row
        }
      },
     
    //  点击跳转部门达成率
      click(row, column, event){
       if(column.label!='刚性'&&column.label!='柔性'){
         this.$store.state.department.forEach((item)=>{
           console.log(row.names)
          if(item.name ==row.部门){
            let date = [this.startTime,this.endTime]
            let username = this.$store.state.username
            let address = this.$store.state.address
            let userid = this.$store.state.userid
            let huizong = item.src
            let link = item.link
            // let link = 'http://localhost:8081'
            console.log(link)
            console.log(date)
            window.location = link+"?huizong="+huizong+'&dates='+date+'&type=月达成率'+'&username='+username+'&address='+address+'&userid='+userid
            
          }
        })
       }
        
      },
      // 查询
      async onSubmit(value){
        this.$store.state.date = value
        this.times = value
        this.tableData = []
        let department = JSON.parse(await this.$api.api.get('/api/WC','')).Table
        this.startTime = value[0]
        this.endTime = value[1]
        this.util.dcl(department,value[0],value[1],this)
        console.log(this.tableData)
     
      },
      
     
    },
    watch: {
     
    }
}
</script>

<style>
.el-picker-panel {
  width: 100% !important
}
.el-date-range-picker .el-picker-panel__body{
  min-width: 200px !important;
}
.el-date-range-picker__content .el-date-range-picker__header div{
      margin-left: 0px !important;
    margin-right: 0px !important;
}
.el-date-range-picker__header div{
  margin-right: 0px !important;
}

  </style>