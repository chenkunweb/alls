<template>
<div>
  <el-tabs tab-position="left" style="height: 80vh;" v-model="oneName" @tab-click="handleClick">
    <el-tab-pane v-for="(item2,index2) in resArr" :key="index2" :label="item2.name" :name="item2.name+'%'+item2.type+'%'+item2.index+'%'+item2.icon+'%'+item2.part">
      <el-tabs v-if="item2.children!=''" tab-position="left" style="height: 80vh;" v-model="twoName" @tab-click="handleClick" >
        <el-tab-pane v-for="(item3,index3) in item2.children" :key="index3" :label="item3.name" :name="item3.name+'%'+item3.type+'%'+item3.index+'%'+item3.icon+'%'+item3.part">
          <el-tabs v-if="item3.children!=''" tab-position="left" style="height: 80vh;" v-model="threeName" @tab-click="handleClick">
            <el-tab-pane v-for="(item4,index4) in item3.children" :key="index4" :label="item4.name" :name="item4.name+'%'+item4.type+'%'+item4.index+'%'+item4.icon+'%'+item4.part">
              <el-tabs v-if="item4.children!=''" tab-position="left" style="height: 80vh;" v-model="fourName" @tab-click="handleClick">
                <el-tab-pane v-for="(item5,index5) in item4.children" :key="index5" :label="item5.name" :name="item5.name+'%'+item5.type+'%'+item5.index+'%'+item5.icon+'%'+item5.part">
                  <el-tabs v-if="item5.children!=''" tab-position="left" style="height: 80vh;" v-model="fiveName" @tab-click="handleClick">
                    <el-tab-pane v-for="(item6,index6) in item5.children" :key="index6" :label="item6.name" :name="item6.name+'%'+item6.type+'%'+item6.index+'%'+item6.icon+'%'+item6.part">
                      <div >
                        <el-input placeholder="输入关键字进行过滤" v-model="pcFilter"> </el-input>
                        <el-tree ref="pcRef" :filter-node-method="filterNode"  :props="props" :load="loadNode" node-key="id"
                          :default-checked-keys="checks" @check-change="click"  lazy show-checkbox>
                        </el-tree>
                      </div>
                    </el-tab-pane>
                  </el-tabs>
                  <div v-else>
                    <el-input placeholder="输入关键字进行过滤" v-model="pcFilter"> </el-input>
                    <el-tree ref="pcRef" :filter-node-method="filterNode"  :props="props" :load="loadNode" node-key="id"
                      :default-checked-keys="checks" @check-change="click"  lazy show-checkbox>
                    </el-tree>
                  </div>
                </el-tab-pane>
              </el-tabs>
              <div v-else>
                <el-input placeholder="输入关键字进行过滤" v-model="pcFilter"> </el-input>
                <el-tree ref="pcRef" :filter-node-method="filterNode"  :props="props" :load="loadNode" node-key="id"
                  :default-checked-keys="checks" @check-change="click"  lazy show-checkbox>
                </el-tree>
              </div>
            </el-tab-pane>
          </el-tabs>
          <div v-else>
            <el-input placeholder="输入关键字进行过滤" v-model="pcFilter"> </el-input>
            <el-tree ref="pcRef" :filter-node-method="filterNode"  :props="props" :load="loadNode" node-key="id"
              :default-checked-keys="checks" @check-change="click" lazy show-checkbox>
            </el-tree>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div v-else>
        <el-input placeholder="输入关键字进行过滤" v-model="pcFilter"> </el-input>
        <el-tree ref="pcRef" :filter-node-method="filterNode"  :props="props" :load="loadNode" node-key="id"
          :default-checked-keys="checks" @check-change="click"  lazy show-checkbox>
        </el-tree>
      </div>
    </el-tab-pane>  
  </el-tabs>
  <div style="text-align: center;">
    <el-button type="primary" @click="submit">保存权限</el-button>
    <el-button type="primary" @click="dialogmessages=true">消息推送频率</el-button>
    <el-dialog title="消息推送频率" @close="close" :visible.sync="dialogmessages">
      <div id="Cold_all">
        <div class="Cold_Left">
          <el-row>
            <el-col :span="24" style="">
              <el-table size="mini" height="400px" :data="messagesDate.datas" border style="width: 100%;margin:auto" highlight-current-row>
                <el-table-column v-for="(item,index) in messagesDate.messagecol" :label="item.label" sortable :prop="item.prop" :key="index" >
                  <template slot-scope="scope">
                    <span v-if="scope.row.isSet">
                      <el-input size="mini" placeholder="请输入内容" v-model="messagesDate.sel[item.prop]"></el-input>
                    </span>
                    <span v-else>{{scope.row[item.prop]}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <span class="Insert_Cold" style="cursor: pointer;" @click.stop="saveRows(scope.row,scope.$index)" >保存</span>
                    <span class="Edit_Cold" style="cursor: pointer;" @click="editRows(scope.row,scope.$index)" >编辑</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :span="24">
              <div class="el-table-add-row" style="width: 99.2%;" @click="adds()">
                <el-button type="primary">+ 添加</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>

    <el-button type="primary" @click="jixiaofenMessage=true">绩效分设置</el-button>
    <el-dialog title="绩效分设置" @close="close" :visible.sync="jixiaofenMessage">
      <div id="Cold_all">
        <div class="Cold_Left">
          <el-row>
            <el-col :span="24" style="">
              <el-table size="mini" height="400px" :data="jixiaofen.datas" border style="width: 100%;margin:auto" highlight-current-row>
                <el-table-column v-for="(item,index) in jixiaofen.messagecol" :label="item.label" :sortable="item.prop=='type'" :prop="item.prop" :key="index" >
                  <template slot-scope="scope">
                    <span v-if="scope.row.isSet">
                      <el-input size="mini" placeholder="请输入内容" v-model="jixiaofen.sel[item.prop]"></el-input>
                    </span>
                    <span v-else>{{scope.row[item.prop]}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <span class="Insert_Cold" style="cursor: pointer;" @click.stop="jxfSaveRows(scope.row,scope.$index)" >保存</span>
                    <span class="Edit_Cold" style="cursor: pointer;" @click="jxfEditRows(scope.row,scope.$index)" >编辑</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :span="24">
              <div class="el-table-add-row" style="width: 99.2%;" @click="jxfAdds()">
                <el-button type="primary">+ 添加</el-button>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>

    <el-button type="primary" @click="dialogTableVisible = true">操作模块</el-button>
    <el-dialog title="操作模块" @close="close" :visible.sync="dialogTableVisible">
      <div id="Cold_all">
        <div class="Cold_Left">
          <el-row>
            <el-col :span="24" style="">

              <el-table size="mini" height="400px" :data="master_user.data" border style="width: 100%;margin:auto" highlight-current-row>
                <el-table-column v-for="(item,index) in master_user.columns" :label="item.label"  :filters="item.filters" :filter-method="filterHandler"
                  sortable :prop="item.prop"  :key="index" >
                  <template slot-scope="scope">
                    <span v-if="scope.row.isSet">
                      <el-input size="mini" placeholder="请输入内容" v-model="master_user.sel[item.prop]"></el-input>
                    </span>
                    <span v-else>{{scope.row[item.prop]}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <span class="Insert_Cold" style="cursor: pointer;" @click.stop="saveRow(scope.row,scope.$index)" >保存</span>
                    <span class="Edit_Cold" style="cursor: pointer;" @click="editRow(scope.row,scope.$index)" >编辑</span>
                    <span class="Delete_Cold" style="cursor: pointer;" @click="deleteRow(scope.$index,master_user.data,scope.row.id)" >删除</span>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
            <el-col :span="24">
              <div class="el-table-add-row" style="width: 99.2%;" @click="add()">
                <el-button type="primary">+ 添加</el-button>
              </div>
              <ul style="text-align: left;
        list-style: none;">
                  <li>父级模块名：所添加模块的上一级模块名</li>
                  <li>模块名：自己定义的模块名</li>
                  <li>类型：保存权限接口的类型，1为保存消息推送,2为系统自动推送,3为移动端,4为pc端</li>
                  <li>移动端模块图片：移动端才需要添加,小程序首页展示的图片</li>
                  <li>网页地址：上传后的网页地址</li>
              </ul>
            </el-col>
          </el-row>
        </div>
      </div>
    </el-dialog>
  </div>
  
</div>
  
</template>

<script>
import * as getData from '../api/getDate';
export default {
  data(){
    return{
      dialogmessages:false,//控制消息推送频率弹窗
      dialogTableVisible: false,//控制操作模块弹窗
      jixiaofenMessage:false,//控制绩效分设置弹窗
      rjxfLists:'',//柔性绩效分
      messagesDate:{// 消息推送频率设置数据
        sel:null,//选中行
        messagecol:[
          { prop:"dates", label:"推送日期",  },
          { prop:"times", label:"推送时间",  },
          { prop:"names", label:"模块名",  },
        ],
        datas: []

      },
      jixiaofen:{//绩效分数据
        sel:null,//选中行
        messagecol:[
          { prop:"bumen", label:"部门", },
          { prop:"type", label:"类型", },
          { prop:"A105", label:"100%", },
          { prop:"A100", label:"99%-99.99%", },
          { prop:"A99", label:"98%-98.99%", },
          { prop:"A98", label:"97%-97.99%", },
          { prop:"A97", label:"96%-96.99%", },
          { prop:"A96", label:"95%-95.99%", },
          { prop:"A95", label:"94%-94.99%", },
          { prop:"A94", label:"93%-93.99%", },
          { prop:"A93", label:"92%-92.99%", },
          { prop:"A92", label:"91%-91.99%", },
          { prop:"A91", label:"90%-90.99%", },
          { prop:"A90", label:"89%-89.99%", },
          { prop:"A89", label:"88%-88.99%", },
          { prop:"A88", label:"87%-87.99%", },
          { prop:"A87", label:"86%-86.99%", },
          { prop:"A86", label:"85%-85.99%", },
          { prop:"A85", label:"84%-84.99%", },
          { prop:"A84", label:"83%-83.99%", },
          { prop:"A83", label:"82%-82.99%", },
          { prop:"A82", label:"81%-81.99%", },
          { prop:"A81", label:"80%-80.99%", },
          { prop:"A80", label:"75%-79.99%", },
          { prop:"A75", label:"70%-74.99%", },
          { prop:"A70", label:"65%-69.99%", },
          { prop:"A65", label:"60%-64.99%", },
          { prop:"A60", label:"55%-59.99%", },
          { prop:"A55", label:"50%-54.99%", },
          { prop:"A50", label:"45%-49.99%", },
          { prop:"A45", label:"40%-44.99%", },
          { prop:"A40", label:"35%-39.99%", },
          { prop:"A35", label:"30%-34.99%", },
          { prop:"A30", label:"25%-29.99%", },
          { prop:"A25", label:"20%-24.99%", },
          { prop:"A20", label:"15%-19.99%", },
          { prop:"A15", label:"10%-14.99%", },
          { prop:"A10", label:"5%-9.99%", },
          { prop:"A05", label:"0%-4.99%", },
        ],
        datas: []

      },
      master_user: {//操作权限数据
        sel: null, //选中行
        columns: [
          { prop: "par", label: "父级模块名", filters:[] },
          { prop: "name", label: "模块名", filters:[]  },
          { prop: "type", label: "类型", filters:[{text: '1', value: '1'},{text: '2', value: '2'},{text: '3', value: '3'},{text: '4', value: '4'}] },
          { prop: "pic", label: "移动端模块图片", filters:[] } ,
          { prop: "dre", label: "网页地址", filters:[] }
        ],
          data: []
      },
      resArr:'',//树结构数据
      props: { id:'id', userid:'userid', username:'username', label: 'label', isLeaf: 'leaf', },//树结构
      a:[],//树结构点击选中列表
      moren:[],//树结构默认选中列表
      type:'',
      pcFilter:'',//搜索
      checks:[],//搜索选中值
      oneName:'',//第一级名字
      twoName:'',//第二级名字
      threeName:'',//第三级名字
      fourName:'',//第四级名字
      fiveName:'',//第五级名字
      mdpermissions:['增加','删除','修改','查看'],//移动端权限
      permissions:['增加','删除','修改','查看','特权'],//生产计划操作权限
      allUserid:[],//通讯录所有userid
      allUsername:[],//通讯录所有username
      datas:[],//达成率数据列表
      journaluuid_list:[],
      index:0,//循环树结构下标
      timer:null, //定时器名称
      messages:[],//模块名
      aus:0,//操作模块index 1新增 2修改
      msgaus:0,//消息推送频率index 1新增 2修改
      jxfGaus:0,//绩效分设置index 1新增 2修改

    }
  },
  beforeDestroy(){
   clearInterval(this.timer);      //清除定时器  
   this.timer = null;//定时器名称
},
  mounted(){
    this.timer = setInterval(() => {//开启定时器
        setTimeout(this.message, 0)//调用消息推送函数
    }, 1000*60)
    
    

   
    
  },
  created(){
    this.getData()//初始化数据函数调用
    let yesterday = getData.dateUtils.yesterday({ymrSign:true})//时间获取，当前时间前一天
    this.dachengl(yesterday)//达成率计算调用
    // 消息推送获取
    this.$api.get('/api/MKMEP','',res=>{
      let list = []
      JSON.parse(res.data).Table.forEach((item)=>{
        if(item.模块名.replace(/\s+/g, "")!=''){
          this.messages.push(item)//模块名赋值
          list.push({
            dates: item.推送日期.replace(/\s+/g, ""),
            times: item.推送时间.replace(/\s+/g, ""),
            names: item.模块名.replace(/\s+/g, ""),
            isSet: false,
          })
        }
      })
      this.messagesDate.datas =list//消息推送列表数据赋值
    })
    this.$api.get('/api/THDCJX2','',res=>{
      console.log(JSON.parse(res.data).Table)
      this.rjxfLists = JSON.parse(res.data).Table//柔性绩效分列表赋值
    })
    this.$api.get('/api/THDCJX','',res=>{
      this.jxfLists = JSON.parse(res.data).Table//刚性绩效分列表赋值
      let list = []
      JSON.parse(res.data).Table.forEach((item)=>{
          list.push({
            bumen: item.部门.replace(/\s+/g, ""),
            type: item.类型.replace(/\s+/g, ""),
            A05:item.A05,
            A10: item.A10,
            A15: item.A15,
            A20: item.A20,
            A25: item.A25,
            A30: item.A30,
            A35: item.A35,
            A40: item.A40,
            A45: item.A45,
            A50: item.A50,
            A55: item.A55,
            A60: item.A60,
            A65: item.A65,
            A70: item.A70,
            A75: item.A75,
            A80: item.A80,
            A81: item.A81,
            A82: item.A82,
            A83: item.A83,
            A84: item.A84,
            A85: item.A85,
            A86: item.A86,
            A87: item.A87,
            A88: item.A88,
            A89: item.A89,
            A90: item.A90,
            A91: item.A91,
            A92: item.A92,
            A93: item.A93,
            A94: item.A94,
            A95: item.A95,
            A96: item.A96,
            A97: item.A97,
            A98: item.A98,
            A99: item.A99,
            A100: item.A100,
            A105: item.A105,
            isSet: false,
          })
      })
      this.jixiaofen.datas =list//绩效分列表数据赋值
    })
  },
  methods:{
    rjxffun(bm){//柔性绩效分处理函数
      let list
      this.rjxfLists.forEach((item)=>{
        if(bm == item.部门.replace(/\s+/g, "")){
          list = item
        }
      })
      return list
    },
    close(){location.reload()},//弹窗关闭更新页面
    filterHandler(value, row, column) {//操作模块弹窗数据赛选
      const property = column['property'];
      if(property=='par'){
        return row[property] === value||row[property] === '';
      }else{
        return row[property] === value
      }
      
    },
    //异步请求
    async getData(){
      // ==树形结构处理函数
      var removePropertyOfNull=function(obj){
          Object.keys(obj).forEach(item=>{
              if(!obj[item])  delete obj[item]
          })
          return obj;
      }
      //通行证
      let data = {corpid:'ww4b634cb35b1893b8',corpsecret:'bFQsey2uIhGOvfCb_4o9VA7RW1Nlxe5n9CFanLBxt2U'}
      let access_token = JSON.parse(await this.$api.api.get('/api/weixin',data)).access_token
      //用户列表
      let datas = { access_token:access_token, department_id:1, fetch_child:1, }
      let userlist = JSON.parse(await this.$api.api.get('/api/userlist',datas)).userlist
      this.list = this.util.name_sort(userlist).map((item)=>{return {userid:item.userid,label:item.name,}})
      this.list.forEach((item)=>{
        this.allUserid.push(item.userid)
        this.allUsername.push(item.label)
      })
      // 树形结构数据转化
      let list = JSON.parse(await this.$api.api.get('/api/HTMK','')).Table
      let lists = []
      let par = []
      let name = []
      list.forEach((item)=>{
        par.push(item.par.replace(/\s+/g, ""))
        name.push(item.name.replace(/\s+/g, ""))
          lists.push({
            index: item.id,
            par: item.par.replace(/\s+/g, ""),
            name: item.name.replace(/\s+/g, ""),
            type: item.type.replace(/\s+/g, ""),
            pic: item.pic.replace(/\s+/g, ""),
            dre: item.dre.replace(/\s+/g, ""),
            isSet: false,
            id:item.id,
            
          })
      })
      this.lists = lists
      let names = Array.from(new Set(name)).map(item=>{
        let list = {
          text:item,
          value:item,
        }
        return list
      })
      this.master_user.columns[1].filters =names
      let pars = Array.from(new Set(par)).map(item=>{
        let list = {
          text:item,
          value:item,
        }
        return list
      })
      this.master_user.columns[0].filters =pars
      this.master_user.data =lists
      let all = list.map((item)=>{
        let list = {
          name:item.name.replace(/\s+/g, ""),
          par:item.par.replace(/\s+/g, ""),
          type:item.type.replace(/\s+/g, ""),
          icon:item.pic.replace(/\s+/g, ""),
          part:item.dre.replace(/\s+/g, ""),
        }
        
        return removePropertyOfNull(list)
      })
      let  resArr=[];
      this.func(this.translateDataToTree(all),resArr);
      this.resArr = resArr
      
    },
    
    add() {//操作模块弹窗输入列表
      for (let i of this.master_user.data) {
        if (i.isSet) return this.$message.error("请先保存当前编辑项");
      }
      let j = { index: "", par: "", name: "", type: "", pic: "", dre: "", isSet: true, id:'', };
      this.master_user.data.push(j);
      this.master_user.sel = JSON.parse(JSON.stringify(j));
      this.aus =1
    },
    fact(name,list){//操作模块弹窗路径处理函数
      let part
      list.forEach((item)=>{
        if(item.name==name){
          part=item.name
          this.fact(item.par,list)
        }
      })
      if(this.parts!=undefined&this.parts!=''){
        this.parts = this.parts+'-'+part
      }else{
        this.parts = part
      }
      

    },
    saveRow(row, index) {//操作模块弹窗保存函数
      if(row.isSet){
        let data = JSON.parse(JSON.stringify(this.master_user.sel));
        for (let k in data) { row[k] = data[k]; }
        row.isSet = false;
        let datas
        if(this.aus ==1){//新增
          datas = { i:1, id:'', name:row.name, par:row.par, pic:row.pic, dre:row.dre, type:row.type }
        }
        if(this.aus ==2){//修改
          datas = { i:2, id:row.id, name:row.name, par:row.par, pic:row.pic, dre:row.dre, type:row.type }
          let i
          if(row.type=='1'||row.type=='2'){i = 1}
          if(row.type=='3'){i=3}
          if(row.type=='4'){i=2}
          let a = this.oldpart.split('-')
          let newPart = this.oldpart.replace(new RegExp(a[a.length-1]),row.name);
          let olddata = { i:i, a1:this.oldpart, a2:newPart,  }
          this.$api.post('/api/MKIDSG',olddata,res=>{console.log(res)})
          this.oldpart = ''
          this.part = ''
       }
          this.$api.post('/api/HTMK',datas,res=>{console.log(res)})
      }else{
        this.$message.error("没有改动数据无法保存")
      }
     
      
        
      
      
    },
    editRow(row) {//操作模块弹窗编辑函数
      this.index = row.id
      if(row.type==''){ this.$message.error("不是子级不可修改");
      }else{
        for (let i of this.master_user.data) { if (i.isSet) return this.$message.error("请先保存当前编辑项"); }
        this.fact(row.par,this.lists)
        this.oldpart = this.parts+'-'+row.name
        this.master_user.sel = row;
        row.isSet = true;
        this.aus = 2
      }
      
    },
    deleteRow(index, rows,id) {//操作模块弹窗删除函数
      rows.forEach((item,index)=>{
          if(rows[index].id ==id){
              rows.splice(index,1);
              let datas = {
                i:3,
                id:item.id,
                name:item.name,
                par:item.par,
                pic:item.pic,
                dre:item.dre,
                type:item.type
              }
              this.$api.post('/api/HTMK',datas,res=>{
              })
          }
      })
    },
    
    adds() {//消息推送频率输入列表
      for (let i of this.messagesDate.datas) { if (i.isSet) return this.$message.error("请先保存当前编辑项");  }
      let j = { index: "", dates: "", times: "", names: "", isSet: true, id:'', };
      this.messagesDate.datas.push(j);
      this.messagesDate.sel = JSON.parse(JSON.stringify(j));
      this.msgaus =1
    },
    saveRows(row, index) {//消息推送频率保存函数
      if(this.msgaus ==1){
        let data = JSON.parse(JSON.stringify(this.messagesDate.sel));
        for (let k in data) { row[k] = data[k]; }
        row.isSet = false;
        let datas = { m1 : row.names,  m2 : row.times,  m3 : row.dates, }
        this.$api.post('/api/MKMEP',datas,res=>{ })
        this.msgaus = 2
      }
        
      
      
    },
    editRows(row) {//消息推送频率编辑函数
      this.msgaus = 1
      //编辑
      for (let i of this.messagesDate.datas) { if (i.isSet) return this.$message.error("请先保存当前编辑项"); }
      this.messagesDate.sel = row;
      row.isSet = true;
    },
    jxfAdds(){//绩效分弹窗输入列表
      for (let i of this.jixiaofen.datas) { if (i.isSet) return this.$message.error("请先保存当前编辑项");  }
      let j = { index: "", type: "", A105: "",A100: "",A99: "",A98: "",A97: "",A96: "", A95: "", A94: "",A93: "",A92: "",A91: "",A90: "",A89: "",A88: "",A87: "",A86: "", A85: "",A84: "",A83: "",A82: "",A81: "", A80: "", A75: "", A70: "",A65: "",A60: "",A55: "",A50: "",A45: "",A40: "",A35: "",A30: "",A25: "",A20: "",A15: "",A10: "",A05: "", isSet: true, id:'', };
      this.jixiaofen.datas.push(j);
      this.jixiaofen.sel = JSON.parse(JSON.stringify(j));
      this.jxfGaus =1
    },
    //保存
    jxfSaveRows(row, index){//绩效分弹窗保存函数
      if(this.jxfGaus ==1){
        let data = JSON.parse(JSON.stringify(this.jixiaofen.sel));
        for (let k in data) { row[k] = data[k]; }
        row.isSet = false;
        let datas = {
            bm: row.bumen.replace(/\s+/g, ""),
            type : row.type.replace(/\s+/g, ""),
            A05 : row.A05==''?'':row.A05.replace(/\s+/g, ""),
            A10 : row.A10==''?'':row.A10.replace(/\s+/g, ""),
            A15 : row.A15==''?'':row.A15.replace(/\s+/g, ""),
            A20 : row.A20==''?'':row.A20.replace(/\s+/g, ""),
            A25 : row.A25==''?'':row.A25.replace(/\s+/g, ""),
            A30 : row.A30==''?'':row.A30.replace(/\s+/g, ""),
            A35 : row.A35==''?'':row.A35.replace(/\s+/g, ""),
            A40 : row.A40==''?'':row.A40.replace(/\s+/g, ""),
            A45 : row.A45==''?'':row.A45.replace(/\s+/g, ""),
            A50 : row.A50==''?'':row.A50.replace(/\s+/g, ""),
            A55 : row.A55==''?'':row.A55.replace(/\s+/g, ""),
            A60 :  row.A60==''?'':row.A60.replace(/\s+/g, ""),
            A65 :  row.A65==''?'':row.A65.replace(/\s+/g, ""),
            A70 :  row.A70==''?'':row.A70.replace(/\s+/g, ""),
            A75 :  row.A75==''?'':row.A75.replace(/\s+/g, ""),
            A80 :  row.A80==''?'':row.A80.replace(/\s+/g, ""),
            A81 :  row.A81==''?'':row.A81.replace(/\s+/g, ""),
            A82 :  row.A82==''?'':row.A82.replace(/\s+/g, ""),
            A83 :  row.A83==''?'':row.A83.replace(/\s+/g, ""),
            A84 :  row.A84==''?'':row.A84.replace(/\s+/g, ""),
            A85 :  row.A85==''?'':row.A85.replace(/\s+/g, ""),
            A86 :  row.A86==''?'':row.A86.replace(/\s+/g, ""),
            A87 :  row.A87==''?'':row.A87.replace(/\s+/g, ""),
            A88 :  row.A88==''?'':row.A88.replace(/\s+/g, ""),
            A89 :  row.A89==''?'':row.A89.replace(/\s+/g, ""),
            A90 :  row.A90==''?'':row.A90.replace(/\s+/g, ""),
            A91 :  row.A91==''?'':row.A91.replace(/\s+/g, ""),
            A92 :  row.A92==''?'':row.A92.replace(/\s+/g, ""),
            A93 :  row.A93==''?'':row.A93.replace(/\s+/g, ""),
            A94 :  row.A94==''?'':row.A94.replace(/\s+/g, ""),
            A95 :  row.A95==''?'':row.A95.replace(/\s+/g, ""),
            A96 :  row.A96==''?'':row.A96.replace(/\s+/g, ""),
            A97 :  row.A97==''?'':row.A97.replace(/\s+/g, ""),
            A98 :  row.A98==''?'':row.A98.replace(/\s+/g, ""),
            A99 :  row.A99==''?'':row.A99.replace(/\s+/g, ""),
            A100 :  row.A100==''?'':row.A100.replace(/\s+/g, ""),
            A105 :  row.A105==''?'':row.A105.replace(/\s+/g, ""),
          }
        this.$api.post('/api/THDCJX',datas,res=>{ console.log(res) })
        this.jxfGaus = 2
      }
    },
    // 编辑
    jxfEditRows(row){//绩效分弹窗编辑函数
      this.jxfGaus = 1
      for (let i of this.jixiaofen.datas) { if (i.isSet) return this.$message.error("请先保存当前编辑项");  }
      this.jixiaofen.sel = row;
      row.isSet = true;
    },
    func(tdata,resData){//增加index==树形结构处理函数
      if(Array.isArray(tdata) && tdata.length>0){
        tdata.forEach((v,i)=>{
          let name = v.name
          let type = v.type
          if(v.type){
            this.index += 1
            resData[i]={};
            resData[i].name=name;
            resData[i].type=type;
            resData[i].index=this.index;
            if(v.part||v.icon){resData[i].icon=v.icon;resData[i].part=v.part;}
            var arr=[];
            this.func(v.children,arr);
            resData[i].children=arr;
          }else{
            resData[i]={};
            resData[i].name=name;
            var arr=[];
            this.func(v.children,arr);
            resData[i].children=arr;
          }
        });
      }
    },
    translateDataToTree(data) {//转化为树结构数据==树形结构处理函数
        let parents = data.filter(value => value.par == 'undefined' || value.par == null)
        let children = data.filter(value => value.par !== 'undefined' && value.par != null)
        let translator = (parents, children) => {
          parents.forEach((parent) => {
            children.forEach((current, index) => {
              if (current.par === parent.name&&parent.type==undefined) {
                let temp = JSON.parse(JSON.stringify(children))
                temp.splice(index, 1)
                translator([current], temp)
                typeof parent.children !== 'undefined' ? parent.children.push(current) : parent.children = [current]
              }
            }
            )
          }
          )
        }
    
      translator(parents, children)
      return parents
    },
    filterNode(value, data) { if (!value) return true; return data.label.indexOf(value) !== -1; },//筛选
    async loadNode(node, resolve){// table懒加载
      if (node.level === 0) {//一级
        let a = ['宗泰电机']
        var nodes = a.map(item => { return {  label: item, leaf: false , id:0, disabled: true  };   });
        this.getDetails(node.level)
        resolve(nodes);
      }
      if (node.level === 1) {//二级
        let a = this.list
        var nodes
        if(this.type==2){
          nodes = a.map(item => {
            return {
              id: this.part+'|'+item.userid,
              parnodeid:'系统',
              parnodename:'系统',
              userid:item.userid,
              label: item.label,
              leaf: true,
              type:this.type,
            }
          });
        }else{
          if(this.type==3){
            nodes = a.map(item => {
              return {
                id: this.part+'|'+item.userid,
                userid:item.userid,
                label: item.label,
                leaf: false,
                type:this.type,
                icon:this.icon,
                src:this.src,
                
              };
            });
          }else{
            if(this.type==1){
              nodes = a.map(item => {
                return {
                  id: this.part+'|'+item.userid,
                  userid:item.userid,
                  label: item.label,
                  leaf: false,
                  type:this.type,
                };
              });
            }else{
              nodes = a.map(item => {
                return {
                  id: this.part+'|'+item.userid,
                  userid:item.userid,
                  label: item.label,
                  leaf: false,
                  type:this.type,
                };
              });
            }
            
          }
          
        }
        this.getDetails(node.level)
        resolve(nodes);
      }
      if (node.level === 2) {//三级
        let nodes
        if(this.type==1){
          let a = this.list
          nodes = a.map(item => {
            return {
              id: this.part+'|'+node.data.userid+'|'+item.userid,
              parnodeid:node.data.userid,
              parnodename:node.data.label,
              userid:item.userid,
              label: item.label,
              leaf: true,
              type:this.type,
            }
          });
        }
        if(this.type==3){
          let a = this.mdpermissions
          nodes = a.map(item => {
            return {
              id: this.part+'|'+node.data.userid+'|'+item,
              parnodeid:node.data.userid,
              parnodename:node.data.label,
              userid:item,
              label: item,
              leaf: true,
              type:this.type,
              icon:this.icon,
              src:this.src,
            };
          });

        }
        if(this.type==4){
          let a = this.permissions
          nodes = a.map(item => {
            return {
              id: this.part+'|'+node.data.userid+'|'+item,
              parnodeid:node.data.userid,
              parnodename:node.data.label,
              userid:item,
              label: item,
              leaf: true,
              type:this.type,
            };
          });
        }
        this.getDetails(node.level,node.data.userid)
        resolve(nodes);
      }
    },
    getDetails (nodes,userids) {//树状图默认选中数据获取
      if(this.type==1){//消息推送-前台
        if(nodes ==1||nodes==0){
          this.list.forEach((item)=>{
            let data = { userid:item.userid, modu:this.part  }
            this.$api.get('/api/reportto',data,res=>{
              if(JSON.parse(res.data).Table!=''){
                let list = JSON.parse(res.data).Table[0]
                this.moren.push(list)
                let keys = list.模块ID.replace(/\s+/g,"")+'|'+list.用户ID
                let id
                  this.$refs.pcRef[this.index - 1].getNode(0).indeterminate = true
                  this.$refs.pcRef[this.index - 1].getNode(keys).indeterminate = true
               
              }
            })
          })
        }else{
          let data = { userid:userids,  modu:this.part  }
            this.$api.get('/api/reportto',data,res=>{
              if(JSON.parse(res.data).Table!=''){
                let list = JSON.parse(res.data).Table[0]
                this.moren.push(list)
                let keys = list.模块ID.replace(/\s+/g,"")+'|'+list.用户ID
                 let id
                 this.$refs.pcRef[this.index - 1].getNode(keys).indeterminate = true
                  if(list.汇报给ID =='all'){
                    this.allUserid.forEach((items)=>{
                      id = keys+'|'+items
                      this.$refs.pcRef[this.index - 1].getNode(id).checked = true
                    })
                  }else{
                    list.汇报给ID.split(',').forEach((items)=>{
                      id = keys+'|'+items
                      this.$refs.pcRef[this.index - 1].getNode(id).checked = true
                    })
                  }
              }
            })
        }
        
      }
      if(this.type==2){//消息推送-后台
            let data = { userid:'系统', modu:this.part }
            this.$api.get('/api/reportto',data,res=>{//消息推送
              if(JSON.parse(res.data).Table!=''){
                let list = JSON.parse(res.data).Table[0]
                let keys = list.模块ID.replace(/\s+/g,"")
                let id
                if(list.汇报给ID =='all'){
                  this.allUserid.forEach((items)=>{
                    id = keys+'|'+items
                    this.$refs.pcRef[this.index - 1].getNode(0).indeterminate = true
                    this.$refs.pcRef[this.index - 1].getNode(id).checked = true
                  })
                }else{
                  list.汇报给ID.split(',').forEach((items)=>{
                    id = keys+'|'+items
                    this.$refs.pcRef[this.index - 1].getNode(0).indeterminate = true
                    this.$refs.pcRef[this.index - 1].getNode(id).checked = true
                  })
                }
                
              
              }
            })
      }
      if(this.type==3){//手机端授权
        if(nodes ==1||nodes==0){
          this.list.forEach((item)=>{
            
           let data = {m1:this.part,m4:item.userid,}
           this.$api.get('/api/TSPL',data,res=>{
             if(JSON.parse(res.data).Table!=''){
               let list = JSON.parse(res.data).Table[0]
               let a = list.增.replace(/\s+/g, "")
               let b = list.删.replace(/\s+/g, "")
               let c = list.改.replace(/\s+/g, "")
               let d = list.查.replace(/\s+/g, "")
               if(a!='0'||b!='0'||c!='0'||d!='0'){
                 let keys = list.模块名.replace(/\s+/g, "")+'|'+list.用户ID.replace(/\s+/g, "")
                 if(nodes ==1||nodes==0){
                   this.$refs.pcRef[this.index - 1].getNode(0).indeterminate = true
                   this.$refs.pcRef[this.index - 1].getNode(keys).indeterminate = true
                 }
                              
               }
             }
           })
         })
        }else if(nodes ==2){
          let data = {m1:this.part,m4:userids,}
           this.$api.get('/api/TSPL',data,res=>{
             if(JSON.parse(res.data).Table!=''){
               let list = JSON.parse(res.data).Table[0]
               let a = list.增.replace(/\s+/g, "")
               let b = list.删.replace(/\s+/g, "")
               let c = list.改.replace(/\s+/g, "")
               let d = list.查.replace(/\s+/g, "")
               if(a!='0'||b!='0'||c!='0'||d!='0'){
                 let keys = list.模块名.replace(/\s+/g, "")+'|'+list.用户ID.replace(/\s+/g, "")
                   this.$refs.pcRef[this.index - 1].getNode(keys).indeterminate = true
                    if(a!='0'){let id = keys+'|增加';this.$refs.pcRef[this.index - 1].getNode(id).checked = true;}
                    if(b!='0'){let id = keys+'|删除';this.$refs.pcRef[this.index - 1].getNode(id).checked = true}
                    if(c!='0'){let id = keys+'|修改';this.$refs.pcRef[this.index - 1].getNode(id).checked = true}
                    if(d!='0'){let id = keys+'|查看';this.$refs.pcRef[this.index - 1].getNode(id).checked = true}
               }
             }
           })
        }
        
      }
      if(this.type==4){//pc端授权
        if(nodes ==1||nodes ==0){
          this.$api.get('/api/MOUSER','',res=>{
              JSON.parse(res.data).Table.forEach((item)=>{
                if(this.part==item.模板ID.replace(/\s+/g, "")){
                  let a = item.增加.replace(/\s+/g, "")
                  let b = item.删除.replace(/\s+/g, "")
                  let c = item.修改.replace(/\s+/g, "")
                  let d = item.查看.replace(/\s+/g, "")
                  let e = item.特权.replace(/\s+/g, "")
                  if(a!='0'||b!='0'||c!='0'||d!='0'||e!='0'){
                    let keys = item.模板ID.replace(/\s+/g, "")+'|'+item.用户ID.replace(/\s+/g, "")
                    console.log(keys)
                      this.$refs.pcRef[this.index - 1].getNode(0).indeterminate = true
                      this.$refs.pcRef[this.index - 1].getNode(keys).indeterminate = true
                  }
                }
              })
            })
        }else{
          this.$api.get('/api/MOUSER',{MKID:this.part,USERID:userids},res=>{
            if(JSON.parse(res.data).Table!=''){
              let list = JSON.parse(res.data).Table[0]
              let a = list.增加.replace(/\s+/g, "")
              let b = list.删除.replace(/\s+/g, "")
              let c = list.修改.replace(/\s+/g, "")
              let d = list.查看.replace(/\s+/g, "")
              let e = list.特权.replace(/\s+/g, "")
              if(a!='0'||b!='0'||c!='0'||d!='0'||e!='0'){
                let keys = list.模板ID.replace(/\s+/g, "")+'|'+list.用户ID.replace(/\s+/g, "")
                this.$refs.pcRef[this.index - 1].getNode(keys).indeterminate = true
                if(a!='0'){
                  let id = keys+'|增加';
                  if(this.$refs.pcRef[this.index - 1].getNode(id)!=null){
                    this.$refs.pcRef[this.index - 1].getNode(id).checked = true
                  }
                  
                }
                if(b!='0'){
                  let id = keys+'|删除';
                  if(this.$refs.pcRef[this.index - 1].getNode(id)!=null){
                    this.$refs.pcRef[this.index - 1].getNode(id).checked = true
                  }
                }
                if(c!='0'){
                  let id = keys+'|修改';
                  if(this.$refs.pcRef[this.index - 1].getNode(id)!=null){
                    this.$refs.pcRef[this.index - 1].getNode(id).checked = true
                  }
                }
                if(d!='0'){
                  let id = keys+'|查看';
                  if(this.$refs.pcRef[this.index - 1].getNode(id)!=null){
                    this.$refs.pcRef[this.index - 1].getNode(id).checked = true
                  }
                }                 
                if(e!='0'){
                  let id = keys+'|特权';
                  if(this.$refs.pcRef[this.index - 1].getNode(id)!=null){
                    this.$refs.pcRef[this.index - 1].getNode(id).checked = true
                  }
                }      

              }
            }
           
            })
        }
        
      }
     
      

    },
    handleClick(e){//Table点击事件==赋值路径
      let oneName = '',twoName = '',threeName = '',fourName = '',fiveName = ''
      if(e.name.split('%')[0]==this.oneName.split('%')[0]){
        this.twoName = ''
        this.threeName = ''
        this.fourName = ''
        this.fiveName = ''
      }
      if(e.name.split('%')[0]==this.twoName.split('%')[0]){
        this.threeName = ''
        this.fourName = ''
        this.fiveName = ''
      }
      if(e.name.split('%')[0]==this.threeName.split('%')[0]){
        this.fourName = ''
        this.fiveName = ''
      }
      if(e.name.split('%')[0]==this.fourName.split('%')[0]){
        this.fiveName = ''
      }
    
      if(this.oneName!=0){oneName = this.oneName.split('%')[0]}
      if(this.twoName!=0){twoName = '-'+this.twoName.split('%')[0]}
      if(this.threeName!=0){threeName = '-'+this.threeName.split('%')[0]}
      if(this.fourName!=0){fourName = '-'+this.fourName.split('%')[0]}
      if(this.fiveName!=0){fiveName = '-'+this.fiveName.split('%')[0]}
     
      this.pcFilter = ''
      this.part = `${oneName}${twoName}${threeName}${fourName}${fiveName}`
      if(e.name.split('%')[1]!='undefined'){
        this.type = e.name.split('%')[1]
        this.index = e.name.split('%')[2]
        this.$refs.pcRef[this.index - 1].getNode(0).indeterminate = true
        this.icon = e.name.split('%')[3]
        this.src = e.name.split('%')[4]
        
      }
    },
    click(a,b,c){// 树状图点击选择事件
      if(c ==false&a.id!=0){
        a.a = b
        this.a.push(a)
      }
    },
    duplicate(arr) {//权限保存处理函数
		  var map = {},
			dest = [];
      for (var i = 0; i < arr.length; i++) {
        var ai = arr[i];
        var modu 
        if(ai.type =='1'||ai.type =='3'||ai.type =='4'){modu = ai.id.split('|')[0]+'|'+ai.id.split('|')[1]}
        if(ai.type =='2'){modu = ai.id.split('|')[0]}
        if (!map[modu]) {
          dest.push({
            id: modu,
            parnodeid:ai.parnodeid,
            parnodename:ai.parnodename,
            leaf:ai.leaf,
            type:ai.type,
            label: ai.label,
            userid: ai.userid,
            src: ai.src,
            icon: ai.icon,
            api:ai.api,
            index:ai.index
            
          });
          map[modu] = ai;
        } else {
          for (var j = 0; j < dest.length; j++) {
            var dj = dest[j];
            var modu1 
            if(dj.type =='1'||dj.type =='3'||dj.type =='4'){modu1 = dj.id.split('|')[0]+'|'+dj.id.split('|')[1]}
            if(dj.type =='2'){modu1 = dj.id.split('|')[0]}
            if (modu1 == modu) {
              dj.userid = dj.userid+'|'+ai.userid;
              dj.label = dj.label+'|'+ai.label;
              break;
            }
          }
        }
      };
		  return dest
    },
    submit(){//权限保存事件
      let a = Array.from(new Set(this.a))
      let rgts = []
      let c = []
      let d = []
      let xtts
      let data = []
      a.forEach((item,index)=>{
        if(item.leaf ==false){
          if(item.a ==true){
            if(item.type =='1'){
               data.push({
                 id:item.type,
                 index:index,
                 data:{
                  userid:item.userid,
                  user:item.label,
                  reporttoid:'all',
                  report:'all',
                  modu:item.id.split('|')[0]
                }
               })
            }
            if(item.type =='3'){
              data.push({
                id:item.type,
                index:index,
                data:{
                  m1:item.id.split('|')[0],
                  m2:item.src,
                  m3:item.icon,
                  m4:item.userid,
                  m5:1,
                  m6:1,
                  m7:1,
                  m8:1,
                }
              })
            }
            if(item.type =='4'){
              data.push({
                id:item.type,
                index:index,
                data:{
                  a1:item.id.split('|')[0],
                  a2:item.id.split('|')[0],
                  a3:item.userid,
                  a4:item.label,
                  a5:1,
                  a6:1,
                  a7:1,
                  a8:1,
                  a9:1,
                }
              })

            }
           
          }else{
            if(item.type =='1'){
              data.push({
                id:item.type,
                index:index,
                data:{
                  userid:item.userid,
                  user:item.label,
                  reporttoid:'',
                  report:'',
                  modu:item.id.split('|')[0]
                }
              })
            }
            if(item.type =='3'){
              data.push({
                id:item.type,
                index:index,
                data:{
                  m1:item.id.split('|')[0],
                  m2:item.src,
                  m3:item.icon,
                  m4:item.userid,
                  m5:0,
                  m6:0,
                  m7:0,
                  m8:0,
                }
              })
            }
            if(item.type =='4'){
              data.push({
                id:item.type,
                index:index,
                data:{
                  a1:item.id.split('|')[0],
                  a2:item.id.split('|')[0],
                  a3:item.userid,
                  a4:item.label,
                  a5:0,
                  a6:0,
                  a7:0,
                  a8:0,
                  a9:0,
                }
              })
            }
            
          }
        
        }else{
          
          if(item.a ==true){
            item.index = index
            if(item.type =='1'||item.type =='2'){
              rgts.push(item)
            
            }
            if(item.type =='3'){
            
              rgts.push(item)
            }
            if(item.type =='4'){
               rgts.push(item)
            }
          }
        }
      })
      this.duplicate(rgts).forEach((item)=>{
        if(item.type =='1'||item.type =='2'){
          let reportuser = item.label.split('|')
          let reportid = item.userid.split('|')
           data.push({
             id:item.type,
             data:{
              userid:item.parnodeid,
              user:item.parnodename,
              reporttoid:reportid,
              report:reportuser,
              modu:item.id.split('|')[0]
            }
           })
          
        }
        if(item.type =='3'){
          let m5 = item.userid.indexOf('增加')!=-1?1:0
          let m6 = item.userid.indexOf('删除')!=-1?1:0
          let m7 = item.userid.indexOf('修改')!=-1?1:0
          let m8 = item.userid.indexOf('查看')!=-1?1:0
           data.push({
             id:item.type,
             data:{
              m1:item.id.split('|')[0],
              m2:item.src,
              m3:item.icon,
              m4:item.parnodeid,
              m5:m5,
              m6:m6,
              m7:m7,
              m8:m8,
            }
           })
          
        }
        if(item.type =='4'){
         
          let a5 = item.userid.indexOf('增加')!=-1?1:0
          let a6 = item.userid.indexOf('删除')!=-1?1:0
          let a7 = item.userid.indexOf('修改')!=-1?1:0
          let a8 = item.userid.indexOf('查看')!=-1?1:0
          let a9 = item.userid.indexOf('特权')!=-1?1:0
           data.push({
             id:item.type,
             data:{
              a1:item.id.split('|')[0],
              a2:item.id.split('|')[0],
              a3:item.parnodeid,
              a4:item.parnodename,
              a5:a5,
              a6:a6,
              a7:a7,
              a8:a8,
              a9:a9,
            }
           })
         
        }
      })
      let link
      data.forEach((item)=>{
        if(item.id==1||item.id==2){link = 'api/reportto'}
        if(item.id ==3){link = 'api/TSPL'}
        if(item.id ==4){link = 'api/MOUSER'}
        this.$api.post(link,item.data,res=>{this.$toast('权限保存成功');location.reload()})
      })
      // this.$api.post(link,item.data,res=>{this.$toast('权限保存成功');location.reload();})
    },
    async dachengl(yesterday){//达成率计算
      this.datas= []
      let departments = JSON.parse(await this.$api.api.get('/api/WC','')).Table//获取部门
      let a_list = []
      departments.forEach(async(item)=>{//部门循环
        if(item.ERP部门!=''){
          let wc = item.ERP部门代号
          let name = item.ERP部门
          // 月达成率
          let firstday = yesterday.substring(0,8)+'01'
          let lastday = getData.dateUtils.thisMonthLast({ymrSign:true})
          let zf_data = {bm:wc,date1:firstday,date2:yesterday}
          let zf_list = JSON.parse(await this.$api.api.get('/api/HT2',zf_data)).Table//生产计划数据获取
          if(zf_list!=''){
            let objs = {};
            zf_list.forEach((item, index) => {
              let jiaoqi = item.交期.replace(/\s+/g, "")
                if (!objs[jiaoqi]) {
                    objs[jiaoqi] = []
                }
                objs[jiaoqi].push(item);
            });
            let all_lists = Object.values(objs)//日达成率数据
            all_lists.forEach((items)=>{
              items.forEach((itemss)=>{
                let gongdan = itemss.工单号.replace(/\s+/g, "")
                let shuliang = itemss.数量*1
                let jiaoqi = itemss.交期.replace(/\s+/g, "")
                let wancheng = itemss.完成数量*1
                let ck_wancheng = itemss.审核状态*1
                let quxiao = itemss.取消数量*1
                let max_num = wancheng
                let ckmax_num = ck_wancheng
                let 审核结果 = itemss.异况审核==null?'':itemss.异况审核.replace(/\s+/g, "")
                let 品质审核结果 = itemss.品质审核结果==null?'':itemss.品质审核结果.replace(/\s+/g, "")
                if(品质审核结果=='合格'||品质审核结果=='特采'){itemss.完成3 = 1}
                //完成--柔性
                //完成1--刚性
                //完成2--仓库
                //完成3--品质
                //达成率计算
                if(ckmax_num>=shuliang){
                  if(itemss.报数日期!=null){
                    let 报数日期 = itemss.报数日期.substring(0,10)
                    if(报数日期<=jiaoqi){ itemss.完成2=1; }
                  }else{ itemss.完成2=1; }
                }
                if(max_num>=shuliang){
                  if(itemss.报数日期!=null){
                    let 报数日期 = itemss.报数日期.substring(0,10)
                    if(报数日期<=jiaoqi){ itemss.完成=1;itemss.完成1=1; }else{itemss.未完成=1}
                  }else{ itemss.完成=1;itemss.完成1=1; }
                }else{
                  itemss.未完成=1
                }
                if(审核结果=='同意'){  itemss.完成=1 }
             
              })
              
            })
            let 柔性总绩效分 = 0,刚性总绩效分 = 0,仓库总绩效分 = 0,品质总绩效分 = 0
            let 柔性总完成 = 0,刚性总完成 = 0,仓库总完成 = 0,品质总完成 = 0
            let 总条 = zf_list.length
            // console.log(all_lists)
            all_lists.forEach((items)=>{
              let 柔性日总完成 = 0,刚性日总完成 = 0,仓库日总完成 = 0,品质日总完成 = 0,未完成 = []
              items.forEach((itemss)=>{
                if(itemss.完成==1){柔性日总完成+=1}
                if(itemss.完成1==1){刚性日总完成+=1}
                if(itemss.完成2==1){仓库日总完成+=1}
                if(itemss.完成3==1){品质日总完成+=1}
                if(itemss.未完成==1){未完成.push(itemss)}
              })
              let 柔性日达成率 = Math.floor((柔性日总完成/items.length) * 100)
              let 刚性日达成率 = Math.floor((刚性日总完成/items.length) * 100)
              let 仓库日达成率 = Math.floor((仓库日总完成/items.length) * 100)
              let 品质日达成率 = Math.floor((品质日总完成/items.length) * 100)
              let rjxf=0,gjxf=0,cjxf=0
              console.log(柔性日达成率)
              if(柔性日达成率<98){
                if(柔性日达成率>=90&柔性日达成率<98){
                  rjxf = (98-柔性日达成率)*0.5
                }else{
                  rjxf = (98-柔性日达成率)*1
                }
              }
              console.log(rjxf)
              // rjxf = (this.rjxffun(name).扣分起点.split('%')[0]*1-柔性日达成率)*this.rjxffun(name).每百分点扣分*1
              this.jxfLists.forEach((jxfs)=>{
                if(name ==jxfs.部门.replace(/\s+/g, "")&jxfs.类型.replace(/\s+/g, "")=='刚性'){
                  if(this.util.jxf(刚性日达成率)==undefined){
                    gjxf = 0
                    cjxf = 0
                  }else{
                    gjxf = jxfs[this.util.jxf(刚性日达成率)]*1
                    cjxf = jxfs[this.util.jxf(仓库日达成率)]*1
                  }
                }
              })
              
              let 柔性日绩效分 = -rjxf
              if(rjxf=0){柔性日绩效分 = 0}
              let 刚性日绩效分 = gjxf
              let 仓库日绩效分 = cjxf

              柔性总绩效分+=柔性日绩效分
              刚性总绩效分+=刚性日绩效分
              仓库总绩效分+=仓库日绩效分
              
              柔性总完成+=柔性日总完成
              刚性总完成+=刚性日总完成
              仓库总完成+=仓库日总完成
              品质总完成+=品质日总完成
              items.柔性日达成率条 = items.length
              items.刚性日达成率条 = items.length   
              items.仓库日达成率条 = items.length
              items.品质日达成率条 = items.length
              items.柔性日达成率 = 柔性日达成率
              items.刚性日达成率 = 刚性日达成率
              items.仓库日达成率 = 仓库日达成率
              items.品质日达成率 = 品质日达成率
              items.柔性日绩效分 = 柔性日绩效分
              items.刚性日绩效分 = 刚性日绩效分
              items.仓库日绩效分 = 仓库日绩效分
              items.交期 = items[0].交期
              items.柔性日总完成 = 柔性日总完成
              items.刚性日总完成 = 刚性日总完成
              items.仓库日总完成 = 仓库日总完成
              items.品质日总完成 = 品质日总完成
              items.未完成 = 未完成
            })
            let 实时完工批次 = 刚性总完成
            let 合计绩效 = 实时完工批次*1+Math.round(柔性总绩效分*10)/10+Math.round(刚性总绩效分*10)/10
            let 柔性总达成率 = Math.floor((柔性总完成/总条) * 100)
            let 刚性总达成率 = Math.floor((刚性总完成/总条) * 100)
            let 仓库总达成率 = Math.floor((仓库总完成/总条) * 100)
            let 品质总达成率 = Math.floor((品质总完成/总条) * 100)
            let all_data = []
            all_lists.forEach((items)=>{
              all_data.push({
                交期:items.交期.replace(/\s+/g, ""),
                车间:items[0].车间.replace(/\s+/g, ""),
                柔性总达成率:柔性总达成率+'%',
                刚性总达成率:刚性总达成率+'%',
                仓库总达成率:仓库总达成率+'%',
                品质总达成率:品质总达成率+'%',
                柔性总绩效分:Math.round(柔性总绩效分*10)/10+'分',
                刚性总绩效分:Math.round(刚性总绩效分*10)/10+'分',
                仓库总绩效分:Math.round(仓库总绩效分*10)/10+'分',
                品质总绩效分:' * ',
                柔性日达成率:items.柔性日达成率+'%',
                刚性日达成率:items.刚性日达成率+'%',
                仓库日达成率:items.仓库日达成率+'%',
                品质日达成率:items.品质日达成率+'%',
                柔性日绩效分:items.柔性日绩效分+'分',
                刚性日绩效分:items.刚性日绩效分+'分',
                仓库日绩效分:items.仓库日绩效分+'分',
                未完成:items.未完成,
                品质日绩效分:' * ',
                实时完工批次:实时完工批次,
                合计绩效:合计绩效+'分',
              })
            })
            let list = all_data.sort(function(a, b) {
              return b.交期 < a.交期 ? 1 : -1
            })
            console.log(list)
            this.datas.push({
              部门:name,
              list:list
            })
          }
        
        }
        
      })
      
    },
    dataQYWXHB(cursor){
      let srt =  getData.dateUtils.beforeYesterday({ymrSign:true})
      let end =  getData.dateUtils.tomorrow({ymrSign:true})
      let dataQYWXHB={
        starttime:new Date(srt).getTime().toString().substring(0,10),
        endtime:new Date(end).getTime().toString().substring(0,10),
        cursor:cursor,
        limit:5,
      }
      this.$api.post('/api/QYWXHB/Postjournaluuid',dataQYWXHB,res=>{
        this.journaluuid_list = this.journaluuid_list.concat(JSON.parse(res.data).journaluuid_list)
        console.log(this.journaluuid_list)
        if(JSON.parse(res.data).endflag==0){
          this.dataQYWXHB(JSON.parse(res.data).next_cursor)
        }else{
          if(this.journaluuid_list!=''){
            this.journaluuid_list.forEach((item)=>{
                this.$api.post('/api/QYWXHB1/Postinfo',{journaluuid:item},res=>{
                  let info = JSON.parse(res.data).info
                 
                  let data = {
                    A1:info.journal_uuid,
                    A2:JSON.stringify(info),
                  }
                   this.$api.post('/api/QYWXHBSAVE',data,res=>{ })
                 
                })
            })
          }
        }
      })
    },
    async message(){// 消息自动推送
      let startday = getData.dateUtils.thisMonthFirst({ymrSign:true})
      let endday = getData.dateUtils.thisMonthLast({ymrSign:true})
      let times = getData.dateUtils.getFormat(new Date(),1)
      let yesterTmes = getData.dateUtils.getFormat(new Date  (),5)
      if(times.indexOf('23:40') !=-1){
        this.journaluuid_list = []
        this.dataQYWXHB(0)
      }
      
      if(times.indexOf('23:59') !=-1){ location.reload() }//每天23：59刷新页面
      if(times.indexOf(':57') !=-1){ this.dachengl(yesterTmes)  }//每个小时59分重新计算达成率
      let rdclhz = []//日达成率数据提取
      this.datas.forEach((items,index)=>{
        rdclhz.push({ 车间:items.部门, })
        let a = 0
        items.list.forEach((itemss)=>{
          if(itemss.交期==yesterTmes){
            a = 1
            rdclhz[index].lists = {
              交期:itemss.交期,
              柔性总达成率:itemss.柔性总达成率,
              柔性总绩效分:itemss.柔性总绩效分,
              柔性日达成率:itemss.柔性日达成率,
              柔性日绩效分:itemss.柔性日绩效分,
              刚性总达成率:itemss.刚性总达成率,
              刚性总绩效分:itemss.刚性总绩效分,
              刚性日达成率:itemss.刚性日达成率,
              刚性日绩效分:itemss.刚性日绩效分,
              仓库总达成率:itemss.仓库总达成率,
              仓库总绩效分:itemss.仓库总绩效分,
              仓库日达成率:itemss.仓库日达成率,
              仓库日绩效分:itemss.仓库日绩效分,
              品质总达成率:itemss.品质总达成率,
              品质总绩效分:itemss.品质总绩效分,
              品质日达成率:itemss.品质日达成率,
              品质日绩效分:itemss.品质日绩效分,
              实时完工批次:itemss.实时完工批次,
              合计绩效:itemss.合计绩效,
              未完成:itemss.未完成,
              list:items.list,
            }
          }
        })
        if(a==0){
          console.log(items.list[0])
            console.log(items.list[0].品质总达成率)
          rdclhz[index].lists = {
              交期:items.list[0].交期,
              柔性总达成率:items.list[0].柔性总达成率,
              柔性总绩效分:items.list[0].柔性总绩效分,
              柔性日达成率:' * ',
              柔性日绩效分:' * ',
              刚性总达成率:items.list[0].刚性总达成率,
              刚性总绩效分:items.list[0].刚性总绩效分,
              刚性日达成率:' * ',
              刚性日绩效分:' * ',
              仓库总达成率:items.list[0].仓库总达成率,
              仓库总绩效分:items.list[0].仓库总绩效分,
              仓库日达成率:' * ',
              仓库日绩效分:' * ',
              品质总达成率:items.list[0].品质总达成率,
              品质总绩效分:items.list[0].品质总绩效分,
              品质日达成率:' * ',
              品质日绩效分:' * ',
              实时完工批次:items.list[0].实时完工批次,
              合计绩效:items.list[0].合计绩效,
              list:items.list,
              未完成:[],
            }
           
        }
        
      }) 
      let messages = [ {推送日期:'',推送时间:'17:14',模块名:'日达成率汇总'}, ]//达成率推送假数据
     this.messages.forEach(async(item)=>{
        let mokuai = item.模块名.replace(/\s+/g, "")
        if(times.indexOf(item.推送时间.replace(/\s+/g, ""))!=-1){//符合推送条件进入下一步
          //通行证获取
          let tkdata = {corpid:'ww4b634cb35b1893b8',corpsecret:'bFQsey2uIhGOvfCb_4o9VA7RW1Nlxe5n9CFanLBxt2U'}
          let tkList = JSON.parse(await this.$api.api.get('/api/weixin',tkdata)).access_token
          let week = new Date().getDay();//星期获取
          let yesterday = getData.dateUtils.yesterday({ymrSign:true})
          let lastday = getData.dateUtils.thisMonthLast({ymrSign:true}).split('-')[2]
          let today = getData.dateUtils.today({ymrSign:true}).split('-')[2]
          let day = item.推送日期*1>lastday?lastday:item.推送日期*1
          //推送对象获取
          // let hbReport = JSON.parse(await this.$api.api.get('/api/reportto',{userid:'系统',modu:'消息推送授权-后台-自动推送-工作汇报'})).Table[0]
          //通行证
          let dcl_token_data={ corpid : 'ww4b634cb35b1893b8',  corpsecret:'jDJAQ859VWDpvZnX6eYZ7apfpDPdcDmDvbLIJHnMJd8' }
          let dcl_token = JSON.parse(await this.$api.api.get('/api/weixin',dcl_token_data)).access_token
          if(mokuai=='生产计划未达成记录'&rdclhz!=''){  
            //推送对象获取
            rdclhz.forEach(async(items)=>{
              let reportList = JSON.parse(await this.$api.api.get('/api/reportto',{userid:'系统',modu:'消息推送授权-后台-自动推送-生产计划未达成记录-'+items.车间})).Table[0]
              console.log(reportList)
              if(reportList!=undefined){
                let report = reportList.汇报给ID.replace(/,/g,"|")
                //推送主题样式处理
                let dclsss = '## ('+yesterTmes+items.车间+')未完成记录\n工单号 状态\n>'
                let oc 
                items.lists.未完成.forEach((items)=>{
                  let 工单号 = items.工单号.replace(/\s+/g, "")
                  if(oc==undefined){ oc = 工单号+' 未完成\n>'
                  }else{  oc = oc+工单号+' 未完成\n>' }
                })
                if(oc==undefined){  dclsss='## ('+yesterTmes+items.车间+')未完成记录\n无记录'
                }else{ dclsss = dclsss+oc }
                let data = {
                  access_token:dcl_token,
                  // touser:'WoBuShiDouHao',  
                  touser:report, 
                  msgtype:"markdown",
                  agentid:"1000066",
                  content:dclsss
                }
                this.$api.post('/api/Message1',data,res=>{})
              }
            })
              
            
          }
          console.log(mokuai)
          console.log(rdclhz)
          if(mokuai=='日达成率汇总'&rdclhz!=''){   
            rdclhz.forEach(async(items)=>{
              //推送对象获取
              let reportList = JSON.parse(await this.$api.api.get('/api/reportto',{userid:'系统',modu:'消息推送授权-后台-自动推送-达成率-'+items.车间})).Table[0]
              if(reportList!=undefined){
                  //推送主题样式处理
                  let dclsss
                  let report = reportList.汇报给ID.replace(/,/g,"|")
                  let a = items.lists.刚性日绩效分
                  if(a.indexOf('*')==-1){a = a.split('分')[0]==0?'0分':'<font color=\'info\'>+'+a+'</font>'}
                  let 刚性日绩效分 = items.lists.刚性日绩效分.indexOf('-')!=-1?'\`'+items.lists.刚性日绩效分+'\`':a
                  let b = items.lists.刚性总绩效分
                  if(b.indexOf('*')==-1){b = b.split('分')[0]==0?'0分':'<font color=\'info\'>+'+b+'</font>'}
                  let 刚性总绩效分 = items.lists.刚性总绩效分.indexOf('-')!=-1?'\`'+items.lists.刚性总绩效分+'\`':b
                  let c = items.lists.柔性日绩效分
                  if(c.indexOf('*')==-1){c = c.split('分')[0]==0?'0分':'<font color=\'info\'>+'+c+'</font>'}
                  let 柔性日绩效分 = items.lists.柔性日绩效分.indexOf('-')!=-1?'\`'+items.lists.柔性日绩效分+'\`':c
                  let d = items.lists.柔性总绩效分
                  if(d.indexOf('*')==-1){d = d.split('分')[0]==0?'0分':'<font color=\'info\'>+'+d+'</font>'}
                  let 柔性总绩效分 = items.lists.柔性总绩效分.indexOf('-')!=-1?'\`'+items.lists.柔性总绩效分+'\`':d
                  let 品质日绩效分 = items.lists.品质日绩效分
                  let 品质总绩效分 = items.lists.品质总绩效分
                  let e = items.lists.仓库日绩效分
                  if(e.indexOf('*')==-1){e = e.split('分')[0]==0?'0分':'<font color=\'info\'>+'+e+'</font>'}
                  let 仓库日绩效分 = items.lists.仓库日绩效分.indexOf('-')!=-1?'\`'+items.lists.仓库日绩效分+'\`':e
                  let f = items.lists.仓库总绩效分
                  if(f.indexOf('*')==-1){f = f.split('分')[0]==0?'0分':'<font color=\'info\'>+'+f+'</font>'}
                  let 仓库总绩效分 = items.lists.仓库总绩效分.indexOf('-')!=-1?'\`'+items.lists.仓库总绩效分+'\`':f
                  let g = items.lists.合计绩效
                  if(g.indexOf('*')==-1){g = g.split('分')[0]==0?'0分':'<font color=\'warning\'>+'+g+'</font>'}
                  let 合计绩效 = items.lists.合计绩效.indexOf('-')!=-1?'<font color=\'warning\'>'+items.lists.合计绩效+'</font>':g
                  dclsss = '## '+items.车间+'生产计划达成率\n'+yesterTmes+'\n>刚性\n>**今日达成率**：<font color=\'info\'>'+items.lists.刚性日达成率+'</font>\n>**今日绩效**：'+刚性日绩效分+'\n>**平均达成率**：<font color=\'info\'>'+items.lists.刚性总达成率+'</font>\n>**本月累计绩效**：'+刚性总绩效分+'\n>柔性\n>**今日达成率**：<font color=\'info\'>'+items.lists.柔性日达成率+'</font>\n>**今日绩效**：'+柔性日绩效分+'\n>**平均达成率**：<font color=\'info\'>'+items.lists.柔性总达成率+'</font>\n>**本月累计绩效**：'+柔性总绩效分+'\n>**实时完工批次**：<font color=\'info\'>'+items.lists.实时完工批次+'</font>\n>**合计绩效**：'+合计绩效+'\n>仓库入库\n>**今日达成率**：<font color=\'info\'>'+items.lists.仓库日达成率+'</font>\n>**今日绩效**：'+仓库日绩效分+'\n>**平均达成率**：<font color=\'info\'>'+items.lists.仓库总达成率+'</font>\n>**本月累计绩效**：'+仓库总绩效分+'\n>品质\n>**今日达成率**：<font color=\'info\'>'+items.lists.品质日达成率+'</font>\n>**今日绩效**：'+品质日绩效分+'\n>**平均达成率**：<font color=\'info\'>'+items.lists.品质总达成率+'</font>\n>**本月累计绩效**：'+品质总绩效分+'\n>'
                
                  let data = {
                    access_token:dcl_token,
                    // touser:'WoBuShiDouHao',  
                    touser:report, 
                    msgtype:"markdown",
                    agentid:"1000066",
                    content:dclsss
                  }
                  this.$api.post('/api/Message1',data,res=>{})
               
              }
            })
            // let rdclhz_Data = '## 日达成率汇总('+yesterTmes+')\n>**部   门**   **今日达成率**   **今日绩效**   **累计达成率**   **累计绩效**\n'
            // rdclhz.forEach((items)=>{
              
            //   let department = items.车间
            //   if(items.车间.length==2){
            //     department = items.车间.substring(0,1)+'   '+items.车间.substring(1,2)
            //   }
            //   rdclhz_Data = rdclhz_Data+'**'+department+'**         <font color=\'info\'>'+items.日达成率+'</font>             <font color=\'info\'>'+items.日绩效分+'</font>          <font color=\'info\'>'+items.总达成率+'</font>          <font color=\'info\'>'+items.总绩效分+'</font>\n>'
            // })
            // let rdcl_data = {
            //   access_token:dcl_token,
            //   touser:'YuHui', 
            //   // touser:'WoBuShiDouHao', 
            //   // touser:report, 
            //   msgtype:"markdown",
            //   agentid:"1000066",
            //   content:rdclhz_Data
            // }
            // this.$api.post('/api/Message1',rdcl_data,res=>{})
          }
          // if(mokuai == '月达成率汇总'){
          //   if(day*1 == today*1){
          //       this.datas.forEach(async(items)=>{
          //         let reportList = JSON.parse(await this.$api.api.get('/api/reportto',{userid:'系统',modu:'消息推送授权-后台-自动推送-达成率-'+items.部门})).Table[0]
          //         if(reportList!=undefined){
          //           let report = reportList.汇报给ID.replace(/,/g,"|")
          //           let dclsss = '## '+items.部门.replace(/\s+/g, "")+'月达成率汇总('+startday.substring(5,10)+'~'+endday.substring(5,10)+')'+'\n>'//日达成率数据
          //           items.list.forEach((itemss)=>{
          //             let time = itemss.交期.substring(5,10)
          //             let 达成率TH = itemss.日达成率
          //             let 扣分 = itemss.日绩效分
          //             dclsss = dclsss+time+','+'达成率：'+达成率TH+',绩效分：'+扣分+'\n>'
          //           })
          //           let data = {
          //             access_token:dcl_token,
          //             touser:report, 
          //             // touser:'WoBuShiDouHao', 
          //             msgtype:"markdown",
          //             agentid:"1000066",
          //             content:dclsss+'**汇总**,'+'**达成率**:'+items.list[0].总达成率+'**绩效分**:'+items.list[0].总绩效分+'\n>'
          //           }
          //           // this.$api.post('/api/Message1',data,res=>{})
          //         }
          //       })
          //   }
          // }
          

        }
      })
  
 
      
      
    },
  },
  watch:{
    pcFilter(val){//搜索监听
      this.$refs.pcRef[this.index -1].filter(val)
    }
  }
}
</script>

<style>
.el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner{
  background-color: #409EFF !important;
    border-color: #409EFF !important;
}
.el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner::before{
  background-color: #fff;
    border-color: #fff;
}
.el-tree{
  height: 80vh;
  padding-bottom: 80px;
  overflow-y: scroll
}
.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: #fff !important;
    color: #409eff
}
.addclass {
        color: red;
    }
.el-checkbox__inner{
  margin-top: 8px
}
.address-list-center > .transfer-center-item[data-v-38146094]{
  height: 100% !important;
  padding: 270px 10px 0 !important;
}
.transfer-right-item:nth-of-type(1){
    height: 100% !important;
}
.transfer-right-item:nth-of-type(2){
    display: none !important;
}
.transfer-right-small{
    display: none !important;
}
.el-submenu__title{
  padding: 0px !important
}
.el-submenu .el-menu {
    margin-left: 20px
}
.el-submenu__title * {
    margin-left: -20px;
}
.el-col-lg-20{
  text-align: center
}
.modal-dialog{
max-width: 80% !important;
overflow: hidden;

}
.list td,
.list th{
  text-align: center
}


.modal-body{
  display: flex;
  justify-content: space-between;
  max-height: 80vh;
    overflow: auto;
}
.el-submenu .el-menu-item {
  min-width: 0;
}
.all{
  display: flex
}
.all .el-tree{
  overflow: auto;
  height: 50vh;
}
.all-show{
  color:#88898c;
  padding:0px 30px
}
.all-list{
  overflow: auto;
  height:50vh
}
.position{
  border: 1px solid #ddd;
    margin-left: 10px;
}

.position span{
  padding: 0px 30px
}
.el-tabs__nav-scroll{
  overflow: auto !important
}
.el-tabs__nav-scroll::-webkit-scrollbar,.modal-body::-webkit-scrollbar,
.modal::-webkit-scrollbar,
.modal-open::-webkit-scrollbar,
body::-webkit-scrollbar,
.el-menu::-webkit-scrollbar {
    display: none !important;
}
.el-dialog {
  width: 100% !important
}
.el-table th>.cell{
  padding-left: 0px !important;
  padding-right: 0px !important;
}

</style>