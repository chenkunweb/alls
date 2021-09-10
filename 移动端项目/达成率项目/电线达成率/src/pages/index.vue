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
          <span>交期：</span>
          <el-date-picker
            v-model="time"
            @change="onSubmit"
            type="date"
            :editable="false"
            value-format="yyyy-MM-dd" >
          </el-date-picker>
       </el-form-item>
        
      
    </el-form>
    <el-table :data="tableData" border :height="height" show-summary :summary-method="getSummaries" :cell-style="changeCellStyle"
    :header-cell-style="changeHeaderStyle" @header-click="click" @row-click="btnslink" style="width: 100%">
      <el-table-column prop="产品型号" :fixed="fixed['产品型号']" :width="this.util.flexColumnWidth('产品型号',tableData)" label="产品型号" > </el-table-column>
      <el-table-column prop="工单号" :fixed="fixed['工单']"  label="工单"> </el-table-column>
      <el-table-column prop="数量" :fixed="fixed['计划数']"  label="计划数"> </el-table-column>
      <el-table-column prop="完成数量" :fixed="fixed['完成数']"  label="完成数"> </el-table-column>
      <el-table-column prop="取消数量" :fixed="fixed['取消数']"  label="取消数"> </el-table-column>
      <el-table-column prop="完成1"  label="刚性"> </el-table-column>
      <el-table-column prop="完成"  label="柔性"> </el-table-column>
      <el-table-column prop="完成3"  label="品质"> </el-table-column>
      <el-table-column prop="完成2"  label="仓库"> </el-table-column>
    </el-table>
     
  </div>
  
</template>

<script>
import * as getData from '../api/getDate';
export default {
  data(){
    return{
      // 高度
      height:'',
      // 固定列
      fixed:{产品型号:false,工单:false,计划数:false,完成数:false,取消数:false},
      // 时间
      time:getData.dateUtils.yesterday({ymrSign:true}),
      // 数据
      tableData: [],
      index:0,
      num:[],
      // 部门代号
      wc:'WC04',
      // 部门名
      name:'电线',
    }
  },
    created(){
       this.$store.state.username =this.util.parse_url("username")
      this.$store.state.address =this.util.parse_url("address")
      this.$store.state.userid =this.util.parse_url("userid")
      console.log(this.$store.state)
      this.height = document.documentElement.clientHeight - 110
        
        this.titles={
            a:{name:'应用程序',path:'/pages/index/index'},
            b:{name:'电线达成率',path:'/index'},
        } 
        let time
        if(this.$store.state.date!=undefined){
          this.time = this.$store.state.date
          time = this.$store.state.date
        }else{
          time = getData.dateUtils.yesterday({ymrSign:true})
        }
        this.onSubmit([time,time])
    },
    methods:{
      // 点击跳转生产异况说明
      btnslink(row, column, event){
        let gongdan = row.工单号.replace(/\s+/g, "")+'/'+row.产品型号.replace(/\s+/g, "")+'/'+row.生产日期.replace(/\s+/g, "")
        let username = this.$store.state.username
        let address = this.$store.state.address
        let userid = this.$store.state.userid
        let data = {m4:userid,m1:'移动端授权-应用程序展示-生产异况说明-'+this.name }
        this.$api.get('/api/TSPL',data,res=>{
          console.log(JSON.parse(res.data).Table)
          if(JSON.parse(res.data).Table==''){
            this.$alert('没有访问异况说明权限，如有需要联系管理员', '提示', {
              confirmButtonText: '确认',
              cancelButtonText: false,
              showClose:false,
              type: 'warning'
            })
          }else{
            if(JSON.parse(res.data).Table[0].查*1==1){
              let link = 'https://www.zanty.net:8108?gongdan='+gongdan+'&date='+this.time+'&username='+username+'&address='+this.wc+'&userid='+userid
             window.location = link
            }else{
              this.$alert('没有访问异况说明权限，如有需要联系管理员', '提示', {
                confirmButtonText: '确认',
                cancelButtonText: false,
                showClose:false,
                type: 'warning'
              })
            }
            
          }
        })
      },
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
        click(column, event){
            
            if(column.fixed ==false){
                this.fixed[column.label] = true
            }else{
                this.fixed[column.label] = false
            }
        },
         // 合计
      getSummaries(param) {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = '日达成率';
            return;
          }
          const values = data.map(item => item[column.property]);
          if(index === 5||index === 6||index === 7||index === 8){
            let lengths = 0
            values.forEach((items)=>{
              if(items =='已完成'){
                lengths += 1
              }
            })
             let a
            if(values == ''){
              a='*'
            }else{
              a = Math.floor((lengths/values.length) * 100) + '%'
            }
             sums[index] = a;
          }
       
          
        });

        return sums;
      },
      // 查询
      async onSubmit(value){
        let data = {bm:this.wc,date1:value,date2:value}
        let all = JSON.parse(await this.$api.api.get('/api/HT2',data)).Table
        this.tableData = this.util.dcl(all)
      },
     
    },

}
</script>

<style>



  </style>