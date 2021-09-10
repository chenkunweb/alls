<template>
  <div>

      <el-date-picker v-model="datePickerValue" type="daterange" @change="pickerChange" value-format="yyyy-MM-dd" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
      <el-table :data="tableData"  border style="width: 100%">
        <el-table-column prop="khdah" min-width="7" label="客户订单号"></el-table-column>
        <el-table-column prop="hanghao" min-width="3" label="行号" > </el-table-column>
        <el-table-column  prop="xinghao" min-width="15" label="产品型号"> </el-table-column>
        <el-table-column  prop="khxqsl" min-width="7" label="客需量"> </el-table-column>
        <el-table-column  prop="xuqiu1" min-width="7" label="客需时1"> </el-table-column>
        <el-table-column  prop="xuqiu2" min-width="7" label="客需时2"> </el-table-column>
        <el-table-column  prop="xuqiu3" min-width="7" label="客需时3"> </el-table-column>
        <el-table-column  prop="xuqiu4" min-width="7" label="客需时4"> </el-table-column>
        <el-table-column  prop="gongdan" min-width="7" label="工单"> </el-table-column>
        <el-table-column  prop="sjrksj" min-width="7" label="入库时间"> </el-table-column>
        <el-table-column  prop="jiaoqi1" min-width="7" label="协商交期1"> </el-table-column>
        <el-table-column  prop="jiaoqi2" min-width="7" label="协商交期2"> </el-table-column>
        <el-table-column  prop="jiaoqi3" min-width="7" label="协商交期3"> </el-table-column>
        <el-table-column  prop="jiaoqi4" min-width="7" label="协商交期4"> </el-table-column>
        <el-table-column  prop="sjcksj" min-width="7" label="实际出库时间"> </el-table-column>
        <el-table-column  prop="TK1" min-width="3" label="TK1"> </el-table-column>
        <el-table-column  prop="TH1" min-width="3" label="TH1"> </el-table-column>
        <el-table-column  prop="TK2" min-width="3" label="TK2"> </el-table-column>
        <el-table-column  prop="TH2" min-width="3" label="TH2"> </el-table-column>
        <el-table-column  prop="TK3" min-width="3" label="TK3"> </el-table-column>
        <el-table-column  prop="TH3" min-width="3" label="TH3"> </el-table-column>
        <el-table-column  prop="TK4" min-width="3" label="TK4"> </el-table-column>
        <el-table-column  prop="TH4" min-width="3" label="TH4"> </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
    data(){
        return{
            datePickerValue:'',//日期初始值
            tableData: [],//表格数据
        }
    },
    created(){
        // this.getData()
    },
    methods:{
        async pickerChange(e){
            this.tableData = []
            let data = { start:e[0],  end:e[1], }
            // 获取数据列表
            let list = JSON.parse(await this.$api.api.get('/api/THTKTJ',data)).Table
            console.log(list)
            list.forEach(async(item,index)=>{
                // 列表赋值
                this.tableData.push({
                    khdah:item.客户订单号,//客户订单号
                    hanghao:item.行号,//行号
                    xinghao:item.产品型号,//产品型号
                    khxqsl:item.订单数量,//客户需求数量
                    xuqiu1:'',
                    xuqiu2:'',
                    xuqiu3:'',
                    xuqiu4:'',
                    gongdan:'',
                    sjrksj:'',
                    jiaoqi1:'',
                    jiaoqi2:'',
                    jiaoqi3:'',
                    jiaoqi4:'',
                    sjcksj:item.出库日期==null?'':item.出库日期.split('T')[0],//实际出库时间
                    TK1:0,
                    TH1:0,
                    TK2:0,
                    TH2:0,
                    TK3:0,
                    TH3:0,
                    TK4:0,
                    TH4:0,
                })
                let datas = { start:item.行号, end:item.客户订单号.replace(/\s+/g, ""),  }
                // 获取工单
                let lists = JSON.parse(await this.$api.api.get('/api/THTKTJ',datas)).Table[0]
                if(lists!=undefined){
                    // 赋值
                    this.tableData[index].xuqiu1 = lists.客户需求日期1==null?'':lists.客户需求日期1.replace(/\s+/g, "")//客户需求日期1
                    this.tableData[index].xuqiu2 = lists.客户需求日期2==null?'':lists.客户需求日期2.replace(/\s+/g, "")//客户需求日期2
                    this.tableData[index].xuqiu3 = lists.客户需求日期3==null?'':lists.客户需求日期3.replace(/\s+/g, "")//客户需求日期3
                    this.tableData[index].xuqiu4 = lists.客户需求日期4==null?'':lists.客户需求日期4.replace(/\s+/g, "")//客户需求日期4
                    this.tableData[index].gongdan = lists.对应工单==null?'':lists.对应工单.replace(/\s+/g, "")//工单号
                    this.tableData[index].jiaoqi1 = lists.计划交期1==null?'':lists.计划交期1.replace(/\s+/g, "")//计划交期1
                    this.tableData[index].jiaoqi2 = lists.计划交期2==null?'':lists.计划交期2.replace(/\s+/g, "")//计划交期2
                    this.tableData[index].jiaoqi3 = lists.计划交期3==null?'':lists.计划交期3.replace(/\s+/g, "")//计划交期3
                    this.tableData[index].jiaoqi4 = lists.计划交期4==null?'':lists.计划交期4.replace(/\s+/g, "")//计划交期4
                    
                    if(this.tableData[index].gongdan!=''){
                        // 获取计算值
                        let datass = { start:'0', end:this.tableData[index].gongdan, }
                        let listss = JSON.parse(await this.$api.api.get('/api/THTKTJ',datass)).Table
                        if(listss!=''){
                            let max_list = ''
                            let max_val = 0
                            listss = listss.sort(//排序小到大
                            (pre, cur) =>{
                                new Date(pre.处理日期).getTime() - new Date(cur.处理日期).getTime()
                            })
                            listss.some((items)=>{
                               max_val+=items.入库数
                               if(max_val>=item.订单数量){
                                  
                                  return max_list = items 
                               }
                            })
                            if(max_list==''){
                               this.tableData[index].TK1=0 
                               this.tableData[index].TH1=0 
                               this.tableData[index].TK2=0 
                               this.tableData[index].TH2=0 
                               this.tableData[index].TK3=0 
                               this.tableData[index].TH3=0 
                               this.tableData[index].TK4=0 
                               this.tableData[index].TH4=0 
                            }else{
                                // thtk计算
                                let riqi = max_list.处理日期.split('T')[0]
                                this.tableData[index].sjrksj = riqi//实际入库时间
                                this.tableData[index].TK1=riqi<=this.tableData[index].xuqiu1?1:0//TK
                                this.tableData[index].TH1 = riqi<=this.tableData[index].jiaoqi1?1:0//TH 
                                this.tableData[index].TK2=riqi<=this.tableData[index].xuqiu2?1:0//TK
                                this.tableData[index].TH2 = riqi<=this.tableData[index].jiaoqi2?1:0//TH 
                                this.tableData[index].TK3=riqi<=this.tableData[index].xuqiu3?1:0//TK
                                this.tableData[index].TH3 = riqi<=this.tableData[index].jiaoqi3?1:0//TH 
                                this.tableData[index].TK4=riqi<=this.tableData[index].xuqiu4?1:0//TK
                                this.tableData[index].TH4 = riqi<=this.tableData[index].jiaoqi4?1:0//TH 
                            }
                        }
                    }
                }
            })
        }
    }
}
</script>

<style>

</style>