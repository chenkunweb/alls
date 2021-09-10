<template>
  <div>
    <header-bom :msg="titles"></header-bom>
    <el-table :data="tableData"  border style="width: 100%">
    <el-table-column prop="gongdan"  label="订单号" > </el-table-column>
    <el-table-column prop="xinghao" label="产品型号" > </el-table-column>
    <el-table-column prop="maxValue" label="订单数量"> </el-table-column>
    <el-table-column prop="gxm" label="工序名"> </el-table-column>
    <el-table-column prop="gonghao" label="员工号"> </el-table-column>
    <el-table-column prop="username" label="员工姓名"> </el-table-column>
    <el-table-column prop="canliang"  label="产量"> </el-table-column>
    <el-table-column   label="调整后产量">
      <template slot-scope="scope">
        <el-input  @input="changeInput(scope.row,)" class="readyonly" v-model="scope.row.调整"/>
      
      </template>
    </el-table-column>
  </el-table>
  <el-button @click="sub" :disabled="baocuns" type="success">保存</el-button>
  </div>
</template>

<script>
export default {
  data() {
      return {
        // 标题
        title:'',
        // 数据
        tableData: [],
        // 是否可保持
        baocuns:true,
      }
    },
  created(){
    
    
    this.config()
    this.titles={
          a:{name:'应用程序',path:'/pages/index/index'},
          b:{name:this.title+'报产审核',path:'/index'},
          c:{name:'产量调整',path:'/tiaozheng'},
      }
  },
  methods:{
    // 输入调整数
    changeInput(e){
        var rex = /^[1-9]{1}[0-9]*$/;
        if(rex.test(e.调整)== true||e.调整==''){
          if(e.调整*1>e.canliang*1){
            this.baocuns=true
            this.$message.error('错了哦，不能大于产量');
          }else{
            let tiaozhengValue = 0
            let maxValue = 0
            this.tableData.forEach((item)=>{
              console.log(item.调整)
              let 调整 = item.调整==undefined?0:item.调整*1
              let canliang = item.canliang==undefined?0:item.canliang*1

              tiaozhengValue+=调整
              maxValue+=canliang
            })
            if(maxValue-tiaozhengValue>=this.$route.query.list.调整数){
              this.baocuns=false
            }else{
              this.baocuns=true
            }

          }
          
          
        }else{
          this.baocuns=true
          this.$message.error('错了哦，数量只能是不以0开头的数字');
        }
    },
    // 保存
    sub(e){
      let i = 0
      console.log(this.tableData)
      this.tableData.forEach((item)=>{
        let tiaozheng = item.调整==undefined?'':item.调整
        if(tiaozheng!=''){
          i=1
          console.log(item)
          this.$api.post('/api/JJGZ4TZ',{id:item.id,cl:item.调整},res=>{
            this.$message({
                  type: 'success',
                  message: '调整成功'
              });
          })

        }
      })
      if(i==0){
        this.$message.error('没有可保存数据');
      }
    },
    // 初始化数据
    async config(){
      this.tableData = []
      let data = {
        BM:this.$route.query.list.BM,
        GD:this.$route.query.list.gongdan,
        GX:this.$route.query.list.gx,
      }
      let list = JSON.parse(await this.$api.api.get('/api/JJGZ4TZ',data)).Table
      let data_list = []
      list.forEach((item)=>{
        data_list.push({
          gongdan:this.$route.query.list.gongdan,
          xinghao:this.$route.query.list.xinghao,
          maxValue:this.$route.query.list.maxValue,
          gxm:item.工序名,
          gonghao:item.工号,
          username:item.姓名,
          gxm:item.工序名,
          canliang:item.产量,
          id:item.记录号
        })
      })
      this.tableData = data_list
    },
    tiaozheng(){
    }
  }
}
</script>

<style>
.el-table th>.cell,.el-table .cell{
  padding: 0px !important
}
</style>