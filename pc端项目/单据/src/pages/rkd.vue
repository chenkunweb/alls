<template>
  <div class="rkd">
    <div class="hello">
        <div v-if="nones==false" class="headers aa" style="text-align: center;padding:8px">
            <h2>深圳市宗泰电机有限公司送货单</h2>
        </div>
        <div  v-if="nones==false" class="block no-print">
            <div style="width:40%">查询
                <el-select v-model="types" @change='selectChanges' placeholder="类型">
                    <el-option v-for="item in type" :key="item" :label="item"  :value="item"> </el-option>
                </el-select>
                <el-input v-model="input" @change='selectChanges' class="inputs" placeholder="编号"></el-input>
                <el-select @change='selectChange'  v-model="shouhuofangs" placeholder="收货方">
                    <el-option v-for="item in shouhuofang" :key="item" :label="item"  :value="item"> </el-option>
                </el-select>
            </div>
           
            <div class="btns">
                <el-button @click="click">下载</el-button>
                <el-button @click="down" v-if="yizuofei==false" :disabled="dateSta==true">保存</el-button>
                <el-button @click="onPrint" v-if="yizuofei==false" :disabled="dateSta==false">打印</el-button>
                <el-button type="danger" v-if="yizuofei==true" :disabled="true">已作废</el-button>
                <el-button @click="zuofei" v-if="yizuofei==false" :disabled="dateSta==false">作废</el-button>
                <el-button  @click="clerk">清屏</el-button>
                <el-button  style="padding:10px 15px"><el-switch @change="switchChange" v-model="switchs" active-color="#13ce66" inactive-color="#E6E8EB" active-text="全部" inactive-text="当天"> </el-switch></el-button>
                
            </div>
        </div>
        <div id="hot-preview" ref="print">
        <div >
            <div  style="justify-content: space-between;display: flex;">
                <div></div>
                <div v-if="nones==true" style="line-height: 100px;font-size: 30px;margin-left: 200px;">{{decss}}</div>
                <!-- <div id="qrCode" ref="qrCodeDiv"></div> -->
                <vue-qr 
                v-if="nones==true"
                class="aaa"
                :correctLevel="0" 
                :autoColor="false" 
                :text="codeUrl" 
                :size="150" 
                :margin="0" 
                :logoMargin="3"></vue-qr>
            </div>
            <HotTable :root="root" ref="testHot" :settings="hotSettings" ></HotTable>
                
        </div>
        <p v-if="nones==false">ps：工单号只显示当前日期前后各2个月之间的日生产计划工单，请注意工单的生产日期！</p>
        <p v-if="nones==false">ps：本单据的计划日期为生产计划的计划生产日期，请注意选择工单号的时候最后面的计划生产日期！</p>
        <p v-if="nones==false">ps：工单号：<span style="color:red">{{gongdanhao}}</span>，工单数量：<span style="color:red">{{gongdanshu}}</span>，已入库数：<span style="color:red">{{rukushu}}</span></p  >
    </div>
   
    <van-dialog v-model="show" title="新增加工类型" show-cancel-button @confirm="confirm">
        <el-input v-model="input" placeholder="请输入要保存的加工类型"></el-input>
    </van-dialog>
    <van-dialog v-model="shf" title="新增收货方" show-cancel-button @confirm="confirmdialog">
        <el-input v-model="shfinput" placeholder="请输入要保存的收货方"></el-input>
    </van-dialog>
    <van-dialog v-model="names" title="请输入制单人" show-cancel-button @confirm="confirmName">
        <el-input v-model="inputName" placeholder="请输入制单人"></el-input>
    </van-dialog>
    
    
  </div>
  </div>
</template>

<script>
  import { HotTable } from '@handsontable-pro/vue'
  import '../../node_modules/handsontable-pro/dist/handsontable.full.css'
  import Handsontable from 'handsontable-pro'
  import * as getData from '../api/getDate';
  import WwLogin from '../api/a';
  import enCH from '../api/en-CH';
   import QRCode from 'qrcodejs2';
   import VueQr from 'vue-qr'
   import axios from 'axios';
  Handsontable.languages.registerLanguageDictionary(enCH);   //注册中文字典
   
  var _this = {}
  export default {
    data: function() {
      return {
          shf:false,//新增收货方
          switchs:false,//当天/全部日期切换
          shfinput:'',//保存收货方的值
        reportTo:'',//汇报给谁
        codeUrl:'',//二维码内容
        indexs:0,//序号
        names:false,//制单人
        show:false,//控制加工类型
        nones:false,//控制二维码
        yizuofei:false,//控制保存按钮
        gongdanhao:'',//工单号
        gongdanshu:'',//工单数
        rukushu:'',//入库数
        inputName:'',//制单人
        input:'',//编号
        userid:'',//用户id
        userName:'',//用户名
        root: 'test-hot',
        shuliangPCSa:0,//数量pcs
        shuliangKGa:0,//数量kg
        dateSta:false,//判断日期赛选是否触发
        options: [],//查询框数据
        decss:'深圳市宗泰电机有限公司送货单',//公司初始化
        //选择公司地址
        type:['生产入库','电镀','外协','返修入库','采购入库'],
        types:'',
        shouhuofang:[],//收货方列表
        shouhuofangs:'',//收货方

        decs:[],
        value: '',//查询初始化
        chaxun:[],//查询数据
        department:[],//部门列表
        readOnly:false,
        readOnlys:false,
        readOnlyss:false,
        hotSettings: {
            data: [
                {gongdan:'类型',fahuofang:'发货方',shuliangKG:'收货方',type:'编号',jiaoqi:'送货日期'},
                {gongdan:'*工单号',xinghao:'*产品型号',fahuofang:'数量KG',fahuofang:'*数量PCS',shuliangKG:'数量KG',shuliangPCS:'数量PCS',type:'加工类型',bianhao:'',jiaoqi:'计划日期',beizhu:'备注'},
                {},{},{},{},{},{},{},{},{},{},
                {xinghao:'合计'},
                {gongdan:'制单',fahuofang:'品管',shuliangKG:'送货',type:'收货',jiaoqi:'放行'},
               
            ],
            colHeaders:['','','','','','','','','',''],
            columns: [
                // {}, //时间
                {data: "gongdan", type: "autocomplete",filter: 'true',source: [],},//工单
                {data: 'xinghao'},//产品型号
                {data: 'fahuofang'},//产品型号
                {data: 'fahuofangs'},//产品型号
                {data: 'shuliangKG',},//数量kg
                {data: 'shuliangPCS',}, //数量个数
                {data: 'type',type: "autocomplete",filter: true, source: [],},//加工类型
                {data: 'bianhao',source:[]},//交期
                {data: 'jiaoqi',},//交期
                {data: 'beizhu',},//备注
            ],
            //行列范围
            startRows: 13,
            startCols: 10,
            //最小行列
            minRows: 13,  
            minCols: 10,
            //列留白
            minSpareCols: 10,
            //行留白 
            minSpareRows: 0,
            //自动换行
            autoWrapRow: true, 
            //开启筛选
            filters: true,
            //手动移动列
            manualColumnMove: true, 
            //手动移动行
            manualRowMove: true,   
            //手工更改列距
            manualColumnResize: true,
            //手动更改行距
            manualRowResize: true,
            //排序
            columnSorting: false,
            //根据宽度横向扩展，last:只扩展最后一列，none：默认不扩展
            stretchH: 'all',
            allowInsertRow: false,
            allowInsertColumn:false,
            //选中拖拽复制 possible values: true, false, "horizontal", "vertical"
            fillHandle: true, 
            rowHeights: 33,
            // rowHeights: _this.$store.state.rowHeights,
            //右键菜单
            // enables the mergeCells plugin
            margeCells: true,
           
            // declares a list of merged sections
           
            contextMenu: _this.util.contextMenu(_this,7,2),
            // 定义某一行的数据格式
            cells: function(row, col, prop) {
                var cellProperties = {};
                cellProperties.readOnly= true;
                if(row==0){
                   cellProperties.type = "text";
                   if(col==1){
                       cellProperties.readOnly= false;
                       cellProperties.type = "autocomplete";
                       cellProperties.source = _this.type
                   }
                   if(col==3){
                       cellProperties.type = "autocomplete";
                      
                       cellProperties.source = _this.department
                       if(_this.readOnly==true){
                           cellProperties.readOnly= false;
                       }
                       
                   }
                   if(col==5){
                        // cellProperties.readOnly= false;
                        cellProperties.type = "autocomplete";
                         cellProperties.strict = true;
                       cellProperties.allowInvalid = false;
                        cellProperties.source =_this.source
                        if(_this.readOnlys==true){
                           cellProperties.readOnly= false;
                       }

                    }
                }
                if(_this.readOnlyss==true){
                    cellProperties.readOnly= false;
                    if(row==0){
                        if(col==0||col==2||col==4||col==6||col==8||col==7){
                            cellProperties.readOnly= true;
                        }
                    }
                    
                }
                if(row==1||row==12||row==13){
                    cellProperties.type = "text";
                    cellProperties.readOnly= true;
                }
              
                if(_this.dateSta == true){
                    cellProperties.readOnly= true;
                }
                if(col==8){
                    cellProperties.readOnly= true;
                }
                return cellProperties;
            },
            
            // 行初始化
            afterSelectionEnd: function(row, column,row2,column2){this.copyRow = row},
            // 数据发生改变
            afterChange:  function(changes, source) {
                console.log(_this.ff)
                if(_this.ff==1){
                    if(_this.aaa!=undefined){
                        this.getSourceData()[0].xinghao =_this.aaa
                    }
                }
                if(_this.ff==2){
                    this.getSourceData()[0].xinghao =_this.aaa
                    if(_this.ccc!=undefined){
                        this.getSourceData()[0].fahuofangs =_this.ccc
                        this.getSourceData()[0].wc =_this.eee
                    }
                }
                if(_this.ff==3){
                    this.getSourceData()[0].xinghao =_this.aaa
                    this.getSourceData()[0].fahuofangs =_this.ccc
                    this.getSourceData()[0].wc =_this.eee
                    if(_this.bbb!=undefined){
                         this.getSourceData()[0].shuliangPCS =_this.bbb
                         this.getSourceData()[0].bianhao =_this.ddd
                    }
                }
                // console.log(_this.aaa)
            
                _this.a = this
                 var reg = new RegExp("^\\d+(\\.\\d+)?$");//正则判断是不是数字 reg.test(newValue) == true
                if(_this.dateSta == false){
                 
                    this.getSourceData()[13].xinghao = _this.userName}
                if(changes){
                    // console.log( _this.hotSettings.columns[5].source)
                    changes.forEach(([row,prop,oldValue,newValue]) => {
                        
                        if(row!=0&row!=1&row!=13){
                            if(newValue!=''&newValue!=null){
                                this.getSourceData()[row].down=true 
                            }else{
                                let a = this.getSourceData()[row]
                                let arr = Object.values(a)
                                if(arr!=''){
                                    let list = []
                                    arr.forEach((item)=>{
                                        if(item!=''){
                                            list.push(item)
                                        }
                                    })
                                    if(list.length==0){
                                        this.getSourceData()[row].down=false
                                    }
                                }
                            }
                        }
                        if(oldValue!=newValue){
                            // 型号逻辑
                            if(row==0&&prop=='xinghao'){
                                
                                if(newValue!=''){
                                    _this.readOnly = true
                                    _this.value = ''
                                    _this.aaa = newValue
                                    _this.ff = 1
                                    _this.getbianhao()
                                    _this.dateSta = false
                                    _this.yizuofei = false
                                    _this.readOnlys = false
                                    _this.readOnlyss = false
                                   
                                    _this.a.loadData([
                                        {gongdan:'类型',fahuofang:'发货方',shuliangKG:'收货方',type:'编号',jiaoqi:'送货日期'},
                                        {gongdan:'工单号',xinghao:'产品型号',fahuofang:'',fahuofang:'',shuliangKG:'数量KG',shuliangPCS:'数量PCS',type:'加工类型',bianhao:'',jiaoqi:'计划日期',beizhu:'备注'},
                                        {},{},{},{},{},{},{},{},{},{},
                                        {xinghao:'合计'},
                                        {gongdan:'制单',fahuofang:'品管',shuliangKG:'送货',type:'收货',jiaoqi:'放行'},
                                    ])
                                    let time = getData.dateUtils.today({ymrSign:true})
                                    _this.a.getSourceData()[0].beizhu = time
                                  
                                }
                                
                            }
                            // 数量逻辑
                            if(row==0&&prop=='shuliangPCS'){
                                console.log(newValue)
                                if(newValue!=''&newValue!='新增收货方'){
                                    _this.readOnlyss = true
                                    _this.value = ''
                                    
                                    let data = {
                                        type:this.getSourceData()[row].xinghao,
                                        USER: _this.userName,
                                        shf:newValue,
                                    }
                                    _this.$api.get('/api/SHD',data,res=>{
                                        console.log(JSON.parse(res.data).Table[0])
                                        let nums = 0
                                        if(JSON.parse(res.data).Table[0].最大编号!=null){
                                            nums = JSON.parse(res.data).Table[0].最大编号

                                        }
                                        this.getSourceData()[row].bianhao = nums+1
                                        // this.getSourceData()[row].fahuofangs=''
                                        console.log(nums+1)
                                        _this.bbb = newValue
                                        _this.ddd = nums+1
                                        _this.ff = 3
                                        _this.getbianhao()
                                        _this.dateSta = false
                                        _this.yizuofei = false
                                        _this.readOnlys = false
                                    
                                        _this.a.loadData([
                                            {gongdan:'类型',fahuofang:'发货方',shuliangKG:'收货方',type:'编号',jiaoqi:'送货日期'},
                                            {gongdan:'工单号',xinghao:'产品型号',fahuofang:'',fahuofang:'',shuliangKG:'数量KG',shuliangPCS:'数量PCS',type:'加工类型',bianhao:'',jiaoqi:'计划日期',beizhu:'备注'},
                                            {},{},{},{},{},{},{},{},{},{},
                                            {xinghao:'合计'},
                                            {gongdan:'制单',fahuofang:'品管',shuliangKG:'送货',type:'收货',jiaoqi:'放行'},
                                        ])
                                        let time = getData.dateUtils.today({ymrSign:true})
                                        _this.a.getSourceData()[0].beizhu = time
                                        this.render();
                                    })
                                    

                                }
                            }
                            // 发货方逻辑
                            if(row==0&&prop=='fahuofangs'){
                                console.log(newValue)
                                if(newValue!=''){
                                    _this.readOnlys = true
                                    
                                    // _this.hotSettings.columns[5].source=
                                    if(_this.util.deprant(newValue)!=undefined){
                                        console.log(_this.util.deprant(newValue))
                                    
                                        let departmentId = _this.util.deprant(newValue).id
                                        let beforeThirty = getData.dateUtils.beforeThirty({ymrSign:true})
                                        let afterThirty = getData.dateUtils.afterThirty({ymrSign:true})
                                        let today = getData.dateUtils.today({ymrSign:true})
                                        
                                        if(_this.switchs==true){
                                            let data = {  wc:departmentId, date1:afterThirty, }
                                             _this.$api.get('/api/SHD',data,res=>{
                                                console.log(JSON.parse(res.data).Table)
                                                if(JSON.parse(res.data).Table!=''&_this.$store.state.username!='外协'){
                                                    let lists = []
                                                    let listss = []
                                                    JSON.parse(res.data).Table.forEach((item)=>{
                                                        let 完成数量 = item.完成数量==null?'':item.完成数量*1
                                                        let 取消数量 = item.取消数量==null?'':item.取消数量*1
                                                        let max_num = item.数量*1-完成数量-取消数量
                                                        let list = item.工单号.replace(/\s+/g, "")+'%'+item.产品型号.replace(/\s+/g, "")+'%'+item.生产日期.replace(/\s+/g, "")+'%'+max_num
                                                        lists.push(list)
                                                        listss.push(item)
                                                    })
                                                    console.log(lists)
                                                    _this.hotSettings.columns[0].source = lists
                                                    this.list = listss
                                                }
                                                _this.ccc = newValue
                                                _this.ff = 2
                                                this.getSourceData()[row].wc = departmentId
                                                _this.eee = departmentId
                                                _this.getbianhao()
                                                _this.dateSta = false
                                                _this.yizuofei = false
                                                _this.readOnlyss = false
                                                _this.a.loadData([
                                                    {gongdan:'类型',fahuofang:'发货方',shuliangKG:'收货方',type:'编号',jiaoqi:'送货日期'},
                                                    {gongdan:'工单号',xinghao:'产品型号',fahuofang:'',fahuofang:'',shuliangKG:'数量KG',shuliangPCS:'数量PCS',type:'加工类型',bianhao:'',jiaoqi:'计划日期',beizhu:'备注'},
                                                    {},{},{},{},{},{},{},{},{},{},
                                                    {xinghao:'合计'},
                                                    {gongdan:'制单',fahuofang:'品管',shuliangKG:'送货',type:'收货',jiaoqi:'放行'},
                                                ])
                                                let time = getData.dateUtils.today({ymrSign:true})
                                                 _this.a.getSourceData()[0].beizhu = time
                                                
                                                
                                            })
                                        }else{
                                            let data = {  wc:departmentId, date1:today, }
                                             _this.$api.get('/api/SHD1',data,res=>{
                                                console.log(JSON.parse(res.data).Table)
                                                if(JSON.parse(res.data).Table!=''&_this.$store.state.username!='外协'){
                                                    let lists = []
                                                    let listss = []
                                                    JSON.parse(res.data).Table.forEach((item)=>{
                                                        let 完成数量 = item.完成数量==null?'':item.完成数量*1
                                                        let 取消数量 = item.取消数量==null?'':item.取消数量*1
                                                        let max_num = item.数量*1-完成数量-取消数量
                                                        let list = item.工单号.replace(/\s+/g, "")+'%'+item.产品型号.replace(/\s+/g, "")+'%'+item.生产日期.replace(/\s+/g, "")+'%'+max_num
                                                        lists.push(list)
                                                        listss.push(item)
                                                    })
                                                    console.log(lists)
                                                    _this.hotSettings.columns[0].source = lists
                                                    this.list = listss
                                                }
                                                 _this.ccc = newValue
                                                 _this.ff = 2
                                                 this.getSourceData()[row].wc = departmentId
                                                 _this.eee = departmentId
                                                _this.getbianhao()
                                                _this.dateSta = false
                                                _this.yizuofei = false
                                                _this.readOnlyss = false
                                                _this.a.loadData([
                                                    {gongdan:'类型',fahuofang:'发货方',shuliangKG:'收货方',type:'编号',jiaoqi:'送货日期'},
                                                    {gongdan:'工单号',xinghao:'产品型号',fahuofang:'',fahuofang:'',shuliangKG:'数量KG',shuliangPCS:'数量PCS',type:'加工类型',bianhao:'',jiaoqi:'计划日期',beizhu:'备注'},
                                                    {},{},{},{},{},{},{},{},{},{},
                                                    {xinghao:'合计'},
                                                    {gongdan:'制单',fahuofang:'品管',shuliangKG:'送货',type:'收货',jiaoqi:'放行'},
                                                ])
                                                let time = getData.dateUtils.today({ymrSign:true})
                                                _this.a.getSourceData()[0].beizhu = time
                                                
                                                
                                            })
                                        }
                                        console.log(_this.switchs)
                                        // let data = {  wc:departmentId, date1:beforeThirty, date2:afterThirty, }
                                       
                                    }
                                    this.render();
                                    
                                }
                            }
                            
                        }
                        // 工单逻辑
                        if(row!=0&row!=1&row!=12&row!=13&prop=='gongdan'){
                            console.log('aaa')
                            if(newValue!=null&&this.list!=undefined){
                                console.log(newValue)
                                let value = newValue.split('%')
                                if(value.length==1){
                                     _this.$dialog({ message: '不能手动做单' });
                                    this.getSourceData()[row].gongdan = ''
                                    this.getSourceData()[row].xinghao = ''
                                    this.getSourceData()[row].jiaoqi = ''
                                    this.getSourceData()[row].shuliangKG = ''
                                    this.getSourceData()[row].shuliangPCS = ''
                                    this.getSourceData()[row].type = ''
                                    this.getSourceData()[row].beizhu = ''
                                }else{
                                    let isPaican=false

                                    this.list.forEach((item)=>{
                                        
                                        let 工单号 = item.工单号.replace(/\s+/g, "")
                                        // let 交期 = item.交期.replace(/\s+/g, "")
                                        let 日期 = item.生产日期.replace(/\s+/g, "")
                                        let 产品型号 = item.产品型号.replace(/\s+/g, "")
                                        let 计划车间=  item.计划车间.replace(/\s+/g, "")
                                        
                                        let diandu = item.是否电镀==null?'':item.是否电镀.replace(/\s+/g, "")
                                        let name = item.创建人==null?'':item.创建人.replace(/\s+/g, "")
                                        
                                        if(value[0]==工单号&value[1]==产品型号&value[2]==日期){
                                            console.log(item)
                                            isPaican=true
                                            this.getSourceData()[row].gongdan = 工单号
                                            this.getSourceData()[row].xinghao = 产品型号
                                            this.getSourceData()[row].jiaoqi = 日期
                                            this.getSourceData()[row].diandu = diandu
                                            this.getSourceData()[row].name = name
                                            this.getSourceData()[row].记录号 = item.记录号
                                            // this.getSourceData()[row].shuliangPCS = max_num
                                            if(item.工单车间!=null&item.工单车间 !=计划车间){
                                                this.getSourceData()[row].beizhu = _this.util.deprant(item.工单车间).name
                                            }
                                            
                                            _this.gongdanhao = 工单号
                                            _this.gongdanshu = item.工单数量
                                            _this.rukushu = item.已入库数
                                        }
                                    })
                                    console.log(isPaican)
                                    if(isPaican==false){
                                        this.getSourceData()[row].isPaican = false
                                        this.getSourceData()[row].diandu = ''
                                    }
                                }
                                
                            }
                        }
                        if(row!=0&row!=1&row!=12&row!=13&prop=='shuliangKG'){
                            let nus = 0
                            this.getSourceData().forEach((items,index)=>{
                                if(index!=0&index!=1&index!=12&index!=13&items.shuliangKG!=''&items.shuliangKG!=undefined){
                                    nus+=items.shuliangKG*1
                                }
                            })
                            
                            this.getSourceData()[12].shuliangKG =nus
                           
                        }
                        if(row!=0&row!=1&row!=12&row!=13&prop=='shuliangPCS'){
                            if(reg.test(newValue) != true&&newValue!=null){
                                this.getSourceData()[row].shuliangPCS = ''
                                _this.$dialog({ message: '必须是纯数字或者大于0' });
                            }
                            let nus = 0
                            this.getSourceData().forEach((items,index)=>{
                                if(index!=0&index!=1&index!=12&index!=13&items.shuliangPCS!=''&items.shuliangPCS!=undefined){
                                    nus+=items.shuliangPCS*1
                                }
                            })
                            
                            this.getSourceData()[12].shuliangPCS =nus
                        }
                        // 类型逻辑
                        if(prop=='type'){
                            if(newValue=='新增加工类型'){
                                _this.show = true
                                this.getSourceData()[row].type = ''
                            }
                        }
                        if(prop=='shuliangPCS'&row==0){
                            if(newValue=='新增收货方'){
                                console.log(newValue)
                                _this.shf = true
                                this.getSourceData()[row].shuliangPCS = ''
                            }
                        }
                        
                        
                    
                    })
                    this.render();
                }
            },
        //    合并单元格
             mergeCells: [
                {row: 1, col: 1, rowspan: 1, colspan: 3 },
                {row: 2, col: 1, rowspan: 1, colspan: 3},
                {row: 3, col: 1, rowspan: 1, colspan: 3},
                {row: 4, col: 1, rowspan: 1, colspan: 3},
                {row: 5, col: 1, rowspan: 1, colspan: 3},
                {row: 6, col: 1, rowspan: 1, colspan: 3},
                {row: 7, col: 1, rowspan: 1, colspan: 3},
                {row: 8, col: 1, rowspan: 1, colspan: 3},
                {row: 9, col: 1, rowspan: 1, colspan: 3},
                {row: 10, col: 1, rowspan: 1, colspan: 3},
                {row: 11, col: 1, rowspan: 1, colspan: 3},
                {row: 12, col: 1, rowspan: 1, colspan: 3},

                {row: 1, col: 6, rowspan: 1, colspan: 2 },
                {row: 2, col: 6, rowspan: 1, colspan: 2},
                {row: 3, col: 6, rowspan: 1, colspan: 2},
                {row: 4, col: 6, rowspan: 1, colspan: 2},
                {row: 5, col: 6, rowspan: 1, colspan: 2},
                {row: 6, col: 6, rowspan: 1, colspan: 2},
                {row: 7, col: 6, rowspan: 1, colspan: 2},
                {row: 8, col: 6, rowspan: 1, colspan: 2},
                {row: 9, col: 6, rowspan: 1, colspan: 2},
                {row: 10, col: 6, rowspan: 1, colspan: 2},
                {row: 11, col: 6, rowspan: 1, colspan: 2},
                {row: 12, col: 6, rowspan: 1, colspan: 2},
            ],
            
        }
      };
    },
    beforeCreate(){ _this = this; },
    created(){
        // 获取部门列表
        this.$api.get('/api/WC','',res=>{
            let department = []
            let departments = []
            JSON.parse(res.data).Table.forEach((item)=>{
                if(item.ERP部门 !=''){
                    department.push(item.ERP部门)
                    departments.push({
                        name:item.ERP部门,
                        id:item.ERP部门代号
                    })
                }
            })
            this.department = department.concat('模具','样品','仓库')
            console.log(this.department)
            
        })
        // 赋值路由
        this.$store.state.path = window.location.hash.split('/')[1]
        this.$store.state.name = '入库送货单'
        // 赋值用户信息
        console.log(this.$store.state.userid)
        console.log(this.$store.state.username)
        
        //获取工单筛选数据//获取工单筛选数据
        this.$api.get('/api/JGLX','',res=>{
            let lists = ['新增加工类型']
            if(JSON.parse(res.data).Table){
                JSON.parse(res.data).Table.forEach((item)=>{
                    lists.push(item.加工类型)
                    
                }) 
            }else{
                 lists = lists
            }
            this.hotSettings.columns[6].source = lists
        })
        // 获取收货方列表
        this.$api.get('/api/SHF','',res=>{
            console.log(JSON.parse(res.data).Table)
            this.isShfList = JSON.parse(res.data).Table
            let lists = ['新增收货方']
            let list = []
            if(JSON.parse(res.data).Table){
                JSON.parse(res.data).Table.forEach((item)=>{
                    lists.push(item.收货方.replace(/\s+/g, ""))
                    this.shouhuofang.push(item.收货方.replace(/\s+/g, ""))
                    
                }) 
            }else{
                 lists = lists
            }
            this.source = lists
            this.hotSettings.columns[5].source = lists
        })
       
        
        // this.getbianhao()
        if(this.$store.state.userid==undefined){
            this.confirmName()
        }else{
            this.userid = this.$store.state.userid
            this.userName = this.$store.state.username
            this.$api.get('/api/SHD',{USER:this.userName},res=>{
                console.log(JSON.parse(res.data).Table)
                this.chaxun = JSON.parse(res.data).Table
                let list = []
                JSON.parse(res.data).Table.forEach((item)=>{
                    list.push({
                        value:item.类型.replace(/\s+/g, "")+'-'+item.编号*1,
                        label:item.类型.replace(/\s+/g, "")+'-'+item.编号*1,
                    })
                })
                var obj = {};
                console.log(list)
                list = list.reduce(function(item, next) {
                    obj[next.value] ? '' : obj[next.value] = true && item.push(next);
                    return item;
                }, []);
                console.log(list)
                this.options = list
            }) 
        }
        
      
        
    },
    mounted(){
        let a = []
        let time = getData.dateUtils.today({ymrSign:true})
        _this.a.getSourceData()[0].beizhu = time
        },
    methods:{
        // 当天全部日期切换
        switchChange(e){ this.clerk() },
        // 新增收货方
        confirmdialog(){
            this.hotSettings.columns[5].source.push(this.shfinput)
            _this.a.getSourceData()[0].shuliangPCS = this.shfinput
            this.a.render()
            this.$api.post('/api/SHF',{type:this.shfinput},res=>{
                    this.$api.get('/api/SHF','',res=>{
                        this.isShfList = JSON.parse(res.data).Table
                    })
            })
        },
        // 新增制单人
        confirmName(){
            this.names=true
            this.$api.get('/api/SHD',{USER:this.inputName},res=>{
                this.chaxun = JSON.parse(res.data).Table
                let list = []
                JSON.parse(res.data).Table.forEach((item)=>{
                    list.push({
                        value:item.类型.replace(/\s+/g, "")+'-'+item.编号*1,
                        label:item.类型.replace(/\s+/g, "")+'-'+item.编号*1,
                    })
                })
                var obj = {};
                list = list.reduce(function(item, next) {
                    obj[next.value] ? '' : obj[next.value] = true && item.push(next);
                    return item;
                }, []);
                this.options = list
                this.userid = this.inputName
                this.userName = this.inputName
                this.a.getSourceData()[13].xinghao = this.inputName
                this.a.render()

            })
        },
        // 生成二维码
        bindQRCode(e) {
            let shf
            this.isShfList.forEach((item)=>{
                if(item.收货方.replace(/\s+/g, "")==e.shf.replace(/\s+/g, "")){
                    shf = item.编号
                }
            })
             let type = this.util.isType(e.type).id
             let user = this.userid
             let state = type+'-'+user+'-'+e.id+'-'+shf
            this.codeUrl= 'http://shdqstest.zanty.net?a='+state
        },
        // 新增加工类型
        confirm(){
           this.$api.post('/api/JGLX',{type:this.input},res=>{
                this.$api.get('/api/JGLX','',res=>{
                    let lists = ['新增加工类型']
                    if(JSON.parse(res.data).Table){
                        JSON.parse(res.data).Table.forEach((item)=>{
                            lists.push(item.加工类型)
                        }) 
                    }else{
                        lists = lists
                    }
                    this.hotSettings.columns[6].source = lists
                })
           })
        },
        //获取编号
        getbianhao(){
            this.$api.get('/api/SCRKD',{USER:this.userName},res=>{
                let index = JSON.parse(res.data).Table[0].Column1
                let id
                if(index == null){
                id = 1
                }else{
                    id =index + 1
                }
                this.index = id
                
            })
        },
        // 接收数量获取
        jieshoushu(a,b,c){
            
        },
        //打印
        onPrint(){
            this.nones = true
            this.bindQRCode(this.bianhaos);
            setTimeout(()=>{
                this.nones = false
                this.util.onPrint(this,'','@page{size:auto;margin: 0cm 1cm 0cm 0.3cm;}')
            },1000)
        },
        // 保存文件
        async down(){
            let dcl_token_data={ corpid : 'ww4b634cb35b1893b8',  corpsecret:'5N2oqnhF6jTeO6VVfaUmnNjyAxsnpzCrCfN6cJL98Io' }
            let dcl_token = JSON.parse(await this.$api.api.get('/api/weixin',dcl_token_data)).access_token
            let time = getData.dateUtils.getFormat(new Date(),1)
            let times = getData.dateUtils.today({allTimeSign:true})
            let type,fh,sh,bh,rq,zd,wc//送料员
            _this.a.getSourceData().forEach((item,index)=>{
                if(index == 0){
                    type = item.xinghao
                    fh = item.fahuofangs
                    sh = item.shuliangPCS
                    bh = item.bianhao
                    rq = time
                    wc= item.wc
                }
                if(index == 13){
                    zd = item.xinghao
                }
            })
            let reportto_data = {userid:'系统',modu:'消息推送授权-前台-送货单制单到品管-'+fh}
            let reportList = JSON.parse(await this.$api.api.get('/api/reportto',reportto_data)).Table
            let dclsss = dclsss = '## '+fh+'送货单\n'+getData.dateUtils.today({ymrSign:true})+'\n>**制单人**：<font color=\'info\'>'+zd+'</font>\n>**编号**：<font color=\'info\'>'+bh+'</font>\n>**请品管及时核查**'
            let tuisong_data
            if(reportList!=''){
                let report = reportList[0].汇报给ID.replace(/,/g,"|")
                tuisong_data = {
                    access_token:dcl_token,
                    touser:report, 
                    msgtype:"markdown",
                    agentid:"1000062",
                    content:dclsss
                }
            }
            let istype = type
            if(type=='生产入库'||type=='返修入库'){istype=''}
            let isDiandu = false
            let islist = ['单据类型与工单号类型不匹配/生产计划没排产']
            if(sh!=''&fh!=''&type!=''){
                let datas = []
                let soles = []
                _this.a.getSourceData().forEach((item,index)=>{
                    let vas = Object.values(item)
                    let vasl  = []
                    let vasls  = []
                    vas.forEach((items)=>{
                        if(items!=true){
                            vasl.push(items)
                            if(items==''){
                               vasls.push(items)  
                            }
                        }
                    })
                  
                    if(vasl.length!=0&vasl.length==vasls.length){ item.down=false }
                    if(item.down==true){
                        datas.push(item)
                        if(item.isPaican==false){
                            islist.push(item.gongdan+'该工单生产计划没排产，提醒计划员排产')
                           isDiandu = true 
                        }else{
                            if(item.diandu.indexOf(istype)!=0){
                                let isa = item.diandu==''?'生产入库':item.diandu
                                islist.push(item.gongdan+'：类型为'+isa)
                                isDiandu = true
                            }
                        }
                        
                        if(item.gongdan==undefined||item.gongdan==''||item.xinghao==undefined||item.xinghao==''||item.shuliangPCS==undefined||item.shuliangPCS==''){
                            if(item.gongdan==undefined||item.gongdan==''){
                                this.$dialog({ message: '工单号必填项' });
                            }
                                
                            if(item.xinghao==undefined||item.xinghao==''){
                                this.$dialog({ message: '型号必填项' });
                            }
                            if(item.shuliangPCS==undefined||item.shuliangPCS==''){
                                this.$dialog({ message: '数量PCS必填项' });
                            }
                        }else{
                            soles.push(item)
                        }
                    }
                })
                let isfhs = false
                this.department.forEach((item)=>{
                    if(item==fh){
                        isfhs=true
                    }
                })
                if(isfhs==false){
                    isDiandu=false
                }
                if(datas.length!=0){
                    if(datas.length==soles.length){
                        
                        
                        
                        if(isDiandu==true){
                            let confirmText = islist
                            const newDatas = []
                            const h = this.$createElement
                            for (const i in confirmText) {
                            newDatas.push(h("p", null, confirmText[i]))
                            }
                            this.$confirm('提示', {
                                title: "提示",
                                showClose:false,
                                message: h("div", null, newDatas),
                                confirmButtonText: '确定',
                                showCancelButton:false,
                                type: 'warning'
                            }).then(() => {
                                console.log(datas)
                                console.log(type)
                                datas.forEach((item,index)=>{
                                    console.log(item.记录号)
                                    if(item.记录号!=undefined){
                                        let data = {
                                            a1:type||'',
                                            a2:fh||'',
                                            a3:sh||'',
                                            a4:bh||'',
                                            a5:rq||'',
                                            a6:item.gongdan||'',
                                            a7:item.xinghao||'',
                                            a8:item.shuliangKG||'',
                                            a9:item.shuliangPCS||'',
                                            a10:item.type||'',
                                            a11:item.jiaoqi||'',
                                            a12:item.beizhu||'',
                                            a13:zd||'',
                                            a14:index+1,
                                            a15:wc,
                                            a16:item.记录号
                                        }
                                        console.log(data)
                                        if(data.a2=='宗联机'){
                                            let sc_data = {
                                                a3:data.a6,
                                                a4:data.a9,
                                                a5:data.a13,
                                                a6:data.a12,
                                                a7:1,
                                            }
                                            this.$api.post('/api/SCJHWGZLJ',sc_data,res=>{})
                                            console.log(sc_data)
                                        }
                                        let dataa = {
                                            
                                            a3:item.记录号,
                                            a4:item.shuliangPCS||'',
                                            a5:zd||'',
                                            a6:item.beizhu||'',
                                            a7:1,
                                        }
                                        this.$api.post('/api/SHD',data,res=>{
                                            this.$api.post('/api/SCJHWG',dataa,res=>{})
                                            this.dateSta = true 
                                            let datas = {
                                                type:data.a1,
                                                USER:this.userName,
                                                id:bh,
                                                shf:sh,
                                            }
                                            this.bianhaos = datas
                                            this.types = type
                                            this.input = bh
                                            this.shouhuofangs = sh
                                            this.$message({
                                                type: 'success',
                                                message: '保存成功!'
                                            });
                                            
                                        })
                                    }
                                    
                                    if(item.name!=''||item.isPaican==false){
                                        let reports = ''
                                        this.$store.state.userList.forEach((items)=>{
                                            if(item.name==items.name){
                                                reports = items.userid
                                            }
                                        })
                                        let datab
                                        console.log(item)
                                        if(item.name!=''){
                                            datab  = {
                                                access_token:this.$store.state.access_token,
                                                touser:reports,
                                                page:'pages/index/index',
                                                title:fh+'送货单',
                                                description:times,
                                                key:'类型修改',
                                                value:'请将'+fh+item.gongdan+'的是否电镀一栏的值改为'+type
                                            }
                                        }
                                        if(item.isPaican==false){
                                            datab  = {
                                                access_token:this.$store.state.access_token,
                                                touser:reports,
                                                page:'pages/index/index',
                                                title:fh+'送货单',
                                                description:times,
                                                key:'工单排产',
                                                value:fh+item.gongdan+'生产计划未做单，请尽快做单，类型为'+type
                                            }
                                        }
                                        
                                         this.$api.post('/api/Message',datab,res=>{})   
                                        console.log(datab)
                                    }
                                    
                                })
                                if(tuisong_data!=''){this.$api.post('/api/Message1',tuisong_data,res=>{})}
                            }).catch(() => {
                                      
                            });
                        }else{
                            console.log(datas)
                            datas.forEach((item,index)=>{
                                if(item.记录号!=undefined){
                                    let data = {
                                    a1:type||'',
                                    a2:fh||'',
                                    a3:sh||'',
                                    a4:bh||'',
                                    a5:rq||'',
                                    a6:item.gongdan||'',
                                    a7:item.xinghao||'',
                                    a8:item.shuliangKG||'',
                                    a9:item.shuliangPCS||'',
                                    a10:item.type||'',
                                    a11:item.jiaoqi||'',
                                    a12:item.beizhu||'',
                                    a13:zd||'',
                                    a14:index+1,
                                    a15:wc,
                                    a16:item.记录号
                                }
                                console.log(data)
                                if(data.a2=='宗联机'){
                                            let sc_data = {
                                                a3:data.a6,
                                                a4:data.a9,
                                                a5:data.a13,
                                                a6:data.a12,
                                                a7:1,
                                            }
                                            this.$api.post('/api/SCJHWGZLJ',sc_data,res=>{})
                                            console.log(sc_data)
                                        }
                                let dataa = {
                                    a3:item.记录号,
                                    a4:item.shuliangPCS||'',
                                    a5:zd||'',
                                    a6:item.beizhu||'',
                                    a7:1,
                                }
                                this.$api.post('/api/SHD',data,res=>{
                                            this.$api.post('/api/SCJHWG',dataa,res=>{})
                                            this.dateSta = true 
                                            let datas = {
                                                type:data.a1,
                                                USER:this.userName,
                                                id:bh,
                                                shf:sh,
                                            }
                                            this.bianhaos = datas
                                            this.types = type
                                            this.input = bh
                                            this.shouhuofangs = sh
                                            this.$message({
                                                type: 'success',
                                                message: '保存成功!'
                                            });
                                            
                                        })
                                console.log(data)
                                 
                                }
                                
                            })
                            if(tuisong_data!=''){this.$api.post('/api/Message1',tuisong_data,res=>{})}
                            
                        }
                        
                        
                    }
                    
                }else{
                    this.$dialog({ message: '没有可保持数据' });
                }
              
            }else{
                this.$dialog({ message: '第一行信息必填' });
            }
          
        },
        // 类型选择
        selectChanges(e){
            this.shouhuofangs = ''
        },
        // 收货方选择
        selectChange(e){
            if(this.input==''||this.types==''){
                console.log('aa')
                this.$dialog({ message: '类型和编号必填' });
                this.shouhuofangs = ''
            }else{
            this.clerk()
            this.dateSta = true
            let data = {
                type:this.types,
                USER:this.userName,
                id:this.input,
                shf:e,
            }
            this.bianhaos = data
            this.$api.get('/api/SHD',data,res=>{
                let list = JSON.parse(res.data).Table
                if(list[0].作废!=null){
                    this.yizuofei = true
                }else{
                    this.yizuofei = false
                }
                _this.a.getSourceData()[0].xinghao = list[0].类型
                _this.a.getSourceData()[13].xinghao = list[0].制单 
                _this.a.getSourceData()[0].fahuofangs = list[0].发货方
                _this.a.getSourceData()[13].fahuofangs = list[0].审核
                _this.a.getSourceData()[0].shuliangPCS = list[0].收货方
                _this.a.getSourceData()[13].shuliangPCS = list[0].送货
                _this.a.getSourceData()[0].bianhao = list[0].编号 
                _this.a.getSourceData()[13].bianhao = list[0].收货 
                _this.a.getSourceData()[0].beizhu = list[0].日期.split(' ') [0]
                _this.a.getSourceData()[13].beizhu = list[0].放行
                list = list.sort((pre, cur) =>pre.行号 - cur.行号);
                let shuliangPCSa = 0
                let shuliangKGa = 0
                list.forEach((item,index)=>{
                     shuliangPCSa = item.数量PCS*1+shuliangPCSa*1
                     shuliangKGa = item.数量KG*1+shuliangKGa*1
                    _this.a.getSourceData()[index+2].gongdan = item.工单号
                    _this.a.getSourceData()[index+2].xinghao = item.产品型号
                    _this.a.getSourceData()[index+2].shuliangKG = item.数量KG
                    _this.a.getSourceData()[index+2].shuliangPCS = item.数量PCS
                    _this.a.getSourceData()[index+2].type = item.加工类型
                    _this.a.getSourceData()[index+2].jiaoqi = item.交期
                    _this.a.getSourceData()[index+2].beizhu = item.备注
                    _this.a.getSourceData()[index+2].记录号 = item.计划记录号
                    
                    
                })
                _this.a.getSourceData()[12].shuliangPCS = shuliangPCSa
                _this.a.getSourceData()[12].shuliangKG = shuliangKGa
                this.a.render()
            })
            }
            
        },
       
        // 下载文件
        click(){
            if(this.dpts){
                var button1 = document.getElementById('export-file');
                var exportPlugin1 = _this.a.getPlugin('exportFile');
                exportPlugin1.downloadFile('csv', {
                    bom: 'UTF-8',
                    columnDelimiter: ',',
                    columnHeaders: false,
                    exportHiddenColumns: true,
                    exportHiddenRows: true,
                    fileExtension: 'csv',
                    filename: this.dpts+'生产入库送货单',
                    mimeType: 'text/csv',
                    rowDelimiter: '\r\n',
                    rowHeaders: true
                });
            }else{
                this.$dialog({ message: '没有必要内容' });
            }
            
        },
        // 作废
        zuofei(){
            let data = {
                type:this.types,
                USER:this.userName,
                id:this.input,
                shf:this.shouhuofangs,
            }
            let zd = _this.a.getSourceData()[13].xinghao
            let wc = this.util.deprant(_this.a.getSourceData()[0].fahuofangs.replace(/\s+/g, ""))
            let fhf
            _this.a.getSourceData().forEach((item,index)=>{
                
                if(index==0){
                    fhf = item.fahuofangs.replace(/\s+/g, "")
                }
                    if(index!=1&index!=0&index!=13&item.gongdan!=undefined&item.shuliangPCS!=undefined&item.jiaoqi!=undefined){
                        console.log(item)
                        console.log(fhf)
                        if(fhf=='宗联机'){
                            let sc_data = {
                                a3:item.gongdan,
                                a4:-item.shuliangPCS,
                                a5:zd,
                                a6:item.beizhu,
                                a7:1,
                            }
                            this.$api.post('/api/SCJHWGZLJ',sc_data,res=>{})
                            console.log(sc_data)
                        }
                         let dataa = {
                                            
                            a3:item.记录号,
                            a4:-item.shuliangPCS||'',
                            a5:zd||'',
                            a6:item.beizhu||'',
                            a7:1,
                        }
                        // let dataa = {
                        //     a1:item.jiaoqi||'',
                        //     a2:item.gongdan||'',
                        //     a3:getData.dateUtils.getFormat(new Date(),1),
                        //     a4:-item.shuliangPCS*1||'',
                        //     a5:zd||'',
                        //     a6:item.beizhu||'',
                        //     a7:wc.id||'',
                        // }
                        this.$api.post('/api/SCJHWG',dataa,res=>{})
                        console.log(dataa)
                    }
            })
          
            console.log(this.a.getSourceData())
           this.$api.get('/api/SHDZF',data,res=>{
               this.selectChange(this.shouhuofangs)
           })




        },
        //清空
        clerk(){
            
            _this.readOnly = true
            _this.value = ''
            // _this.aaa = newValue
            _this.ff = 1
            _this.getbianhao()
            _this.dateSta = false
            _this.yizuofei = false
            _this.readOnlys = false
            _this.readOnlyss = false
            
            _this.a.loadData([
                {gongdan:'类型',fahuofang:'发货方',shuliangKG:'收货方',type:'编号',jiaoqi:'送货日期'},
                {gongdan:'工单号',xinghao:'产品型号',fahuofang:'',fahuofang:'',shuliangKG:'数量KG',shuliangPCS:'数量PCS',type:'加工类型',bianhao:'',jiaoqi:'计划日期',beizhu:'备注'},
                {},{},{},{},{},{},{},{},{},{},
                {xinghao:'合计'},
                {gongdan:'制单',fahuofang:'品管',shuliangKG:'送货',type:'收货',jiaoqi:'放行'},
            ])
            let time = getData.dateUtils.today({ymrSign:true})
            _this.a.getSourceData()[0].beizhu = time
            
            
        },
       
    },
    // 注册组件
    components: {
      HotTable,
      VueQr
    }
  }
</script>

<style >
.rkd .headers{
    text-align: center;
    background: #fff;
}
.aa .el-input__inner{
    border: none;
    text-align: center;
    color: #000;
    font-size: 30px;
}
.rkd .headers .el-select{
    width: 100%
}
.rkd .el-input__suffix{
    display: none
}

.rkd{
        width:977px;
        margin: 0 auto;
    }


.rkd .headers{
    background: #fff;
}
.rkd .headers .el-input__inner{
    border: none;
    color: #000;
    font-size: 30px;
}
.rkd .headers .el-select{
    width: 100%
}
.rkd .el-input__suffix{
    display: none
} 
.rkd .handsontable th,.rkd .handsontable td{
    line-height: 0px !important;
    font-size: 16px !important
}
.rkd .el-select,.rkd .inputs{
    width: 28% !important
}


</style>