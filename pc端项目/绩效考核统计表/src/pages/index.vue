<template>
    <div>
        <el-date-picker v-model="value1"  type="daterange" @change="pickerChange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
        <el-table :data="tableData" :span-method="arraySpanMethod" border style="width: 100%" class="orderTable">
            <el-table-column prop="date" :label="title" >
                <el-table-column type="index" label="序号"> </el-table-column>
                <el-table-column prop="dates" label="日期"> </el-table-column>
                <el-table-column prop="xiangqing" label="事故详情/产品型号"  > </el-table-column>
                <el-table-column prop="baoliao" label="报料人"> </el-table-column>
                <el-table-column prop="neirong" label="事故调查内容"  > </el-table-column>
                <el-table-column prop="jieguo" label="稽核审查结果"> </el-table-column>
                <el-table-column prop="zeren" label="责任人"  > </el-table-column>
                <el-table-column prop="kaohe" label="考核"> </el-table-column>
            </el-table-column>
            
        </el-table>
        <el-button type="primary" style="background-color: #0086b3" @click="exportExcel">导出</el-button>

    </div>
</template>

<script>
import * as getData from '../api/getDate';
import FileSaver from 'file-saver'
import XLSX from 'xlsx'

export default {
    data(){
        return{
            value1:[getData.dateUtils.today({ymrSign:true}),getData.dateUtils.today({ymrSign:true})],//时间
            // 头部信息
            title:'品质事故的定义：1.客户批退或去客户处返工处理；2.导致现场生产中断的品质问题；3.品质检出批量不良。第一条由市场报料 ，第二条由生产部门主管或计划中心报料，第三条由品质部报料',
            tableData: [],//数据
            mergeObj: {}//数据源
        }
    },
    created(){
      this.pickerChange(this.value1)
    },
     mounted () {
     },
    methods:{
      // 时间查询
      async pickerChange(e){
        console.log(e)
        let list = JSON.parse(await this.$api.api.get('/api/JXKHDCB',{date1:e[0],date2:e[1]})).Table
        console.log(list)
        list = list.sort(//排序小到大
          (pre, cur) =>
            pre.ID - cur.ID
        );
        let a
        list.forEach((item,index)=>{
          if(index==0){
            a = [item.ID,index,1]
          }else{
            if(a[0]==item.ID){
              list[a[1]].isa = true
              list[index].isa = true
              list[index].isb=0
              a[2]+=1
            }else{
              list[a[1]].isb = a[2]
              a = [item.ID,index,1]
            }
          }
        })
        console.log(list)
        this.tableData = list.map(item=>{
          return {
            id:item.ID,
            type:item.事故类型==null?'':item.事故类型.replace(/\s+/g, ""),
            xiangqing:item.事故详情==null?'':item.事故详情.replace(/\s+/g, ""),
            neirong:item.事故调查内容==null?'':item.事故调查内容.replace(/\s+/g, ""),
            baoliao:item.报料人==null?'':item.报料人.replace(/\s+/g, ""),
            bm:item.报料部门==null?'':item.报料部门.replace(/\s+/g, ""),
            dates:item.日期==null?'':item.日期.replace(/\s+/g, ""),
            jihe:item.稽核人==null?'':item.稽核人.replace(/\s+/g, ""),
            jieguo:item.稽核调查结果==null?'':item.稽核调查结果.replace(/\s+/g, ""),
            kaohe:item.考核分数==null?'':item.考核分数.replace(/\s+/g, ""),
            diaocha:item.调查人==null?'':item.调查人.replace(/\s+/g, ""),
            zeren:item.责任人==null?'':item.责任人.replace(/\s+/g, ""),
            zrbm:item.责任部门==null?'':item.责任部门.replace(/\s+/g, ""),
            isa:item.isa,
            isb:item.isb,
          }
        })
        let numerical = 0;
        let mergeObj = {
          dates:[],//日期
          xiangqing:[],//事故详情
          baoliao:[],//报料人
          neirong:[],//事故调查内容
          jieguo:[],//稽核调查结果
          zeren:[],//责任人
          kaohe:[],//考核分数
        }
        for (let key in mergeObj) {
          // console.log(key)
          this.tableData.forEach((item,index) => {
            if(key=='zeren'||key=='kaohe'){
              mergeObj[key].push(1)
            }else{
                if(item.isa==true){
                mergeObj[key].push(0)
                if (item[key] === this.tableData[index+1][key]) {
                  
                  mergeObj[key][index]=item.isb
                }
                
              }else{

                mergeObj[key].push(1)
              }
            }
          
            
          })
        }
        console.log(mergeObj)
        this.mergeObj = mergeObj
      },
      // 导出Excel
      exportExcel () {
        var wb = XLSX.utils.table_to_book(document.querySelector('.orderTable'))
        var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
        try {
          FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '绩效考核统计表.xlsx')
        } catch (e) { if (typeof console !== 'undefined') console.log(e, wbout) }
        return wbout
      },
      // 合并单元格
      arraySpanMethod({ row, column, rowIndex, columnIndex }) {
        
        if(this.mergeObj[column.property]!=undefined){
           if (this.mergeObj[column.property][rowIndex]) {
            return {
              rowspan:this.mergeObj[column.property][rowIndex],
              colspan:1
            }
          } else {
            return {
              rowspan: 0,
              colspan: 0
            }
          }
        }
      },
      
    }
}
</script>

<style>
.el-table td, .el-table th{
    text-align: center !important
}
.el-table .cell, .el-table--border td:first-child .cell, .el-table--border th:first-child .cell{
  padding-left: 0px !important
}
.el-table th>.cell{
   padding-left: 0px !important;
    padding-right: 0px !important
}
.el-table .cell{
  padding-right: 0px !important
}
</style>