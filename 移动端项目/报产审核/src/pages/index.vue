<template>
  <div>
    <header-bom :msg="titles"></header-bom>
    <el-select v-model="values" @change="selectChge" placeholder="请选择部门">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
    </el-select>
    <el-table :data="tableData"  border style="width: 100%">
    <el-table-column prop="gongdan" label="订单号" > </el-table-column>
    <el-table-column prop="xinghao"  label="产品型号" > </el-table-column>
    <el-table-column prop="maxValue"  label="订单数量"> </el-table-column>
    <el-table-column prop="gxm"  label="工序名"> </el-table-column>
    <el-table-column prop="canliang"  label="产量">
      <template slot-scope="scope">
        <span style="color:red" @click="tiaozheng(scope.row)" v-if="scope.row.hong">{{scope.row.canliang}}</span>
        <span v-else @click="tiaozheng(scope.row)">{{scope.row.canliang}}</span>
      
      </template>
    </el-table-column>
    <el-table-column prop="buliang"  label="工序不良数量"> </el-table-column>
    <el-table-column prop="zhengshi"  label="工序完成数量"> </el-table-column>
  </el-table>
  <el-button @click="sub" :disabled="baocuns" type="success">保存</el-button>
  </div>
</template>

<script>
export default {
  data() {
      return {
        // 标题
        titles:'',
        // 数据
        tableData: [],
        // 是否可保持
        baocuns:false,
        // 部门列表
        options:[],
        // 部门
        values:'',
      }
    },
  created(){
    this.titless('')
    this.config()
  },
  methods:{
    // 导航
    titless(e){
      this.titles={
          a:{name:'应用程序',path:'/pages/index/index'},
          b:{name:e+'报产审核',path:'/index'},
      }
    },
    // 初始化数据
    async config(){
      this.tableData = []
      let depament = this.util.parse_url("address").split('/')[1]
      let departments = JSON.parse(await this.$api.api.get('/api/WC','')).Table
      let depament_list = []
      this.depament = departments
      departments.forEach(async(item)=>{
        let data = {m4:this.util.parse_url("userid"),m1:'移动端授权-应用程序展示-员工报产审核-'+item.ERP部门 }
        let List = JSON.parse(await this.$api.api.get('/api/TSPL',data)).Table
        if(List!=''){
          if(List[0].查*1==1){
            this.options.push({
              value:item.ERP部门,
              label:item.ERP部门,
            })
            if(this.$store.state.options!=undefined){
              this.values = this.$store.state.options
              this.selectChge(this.$store.state.options)
            }
          }
        }
      })
    },
    // 选择部门事件
    async selectChge(e){
      this.titless(e)
      this.$store.state.options = e
      let depament
      this.depament.forEach((item)=>{
        if(item.ERP部门==e){
          depament = item.计件工资部门
        }
      })
      this.tableData = []
      let list = JSON.parse(await this.$api.api.get('/api/JJCS',{BM:depament})).Table
      if(list!=''){
        list.forEach(async(items)=>{
          let JJGZ4_datas={  BM:items.部门, ITEM:items.零件代码, GD:items.订单号, GX:items.工序,}
          let JJGZ4s = JSON.parse(await this.$api.api.get('/api/JJGZ4',JJGZ4_datas)).Table[0]
          let maxValue = JSON.parse(await this.$api.api.get('/api/JJSH',{job:items.订单号})).Table[0].计划数量
          let zhengshi = JJGZ4s==undefined?'':JJGZ4s.工序完成产量
          let max = items.工序完成产量+zhengshi-items.不良和
          let hong = false
          if(max>maxValue){hong = true ,this.baocuns = true}
          let 调整数 = max-maxValue
          this.tableData.push({
            gongdan:items.订单号,
            xinghao:items.零件名称,
            maxValue:maxValue,
            gxm:items.工序名,
            canliang:items.工序完成产量,
            buliang:items.不良和,
            zhengshi:zhengshi,
            hong:hong,
            gonghao:this.util.parse_url("address").split('/')[1],
            username:this.util.parse_url("username"),
            调整数:调整数,
            BM:items.部门,
            gx:items.工序,
          })
        })
      }
    },
    // 跳转调整页面
    tiaozheng(e){
      this.$router.push({path: '/tiaozheng',query:{list:e}});
    },
    // 保存
    sub(){
      this.tableData.forEach((item)=>{
        let data = {BM:item.BM,GD:item.gongdan,GX:item.gx,}
        this.$api.post('/api/JJGZ4SH',{BM:item.BM,GD:item.gongdan,GX:item.gx,},res=>{})
        this.$api.post('/api/JJGZ4SH1',{I:2,BM:item.BM,GD:item.gongdan,GX:item.gx,},res=>{})
        this.$api.post('/api/JJGZ4SH1',{I:1,BM:item.BM,GD:item.gongdan,GX:item.gx,},res=>{
          this.$message({
                    type: 'success',
                    message: '保存成功'
                });
        })
      })
    }
  }
}
</script>

<style>
.el-table th>.cell,.el-table .cell{
  padding: 0px !important
}
</style>