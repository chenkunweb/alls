<template>
  <div class="kh"   ref="print">
      <div class="hello"  >
         <div class="headers aa" style="text-align: center;">
            <el-select  v-model="decss" :disabled="ywb==true" @change='decsschange' placeholder="请选择">
                <el-option v-for="item in decs" :key="item.value" :label="item.label"  :value="item.value"> </el-option>
            </el-select>
            <p style="font-size:18px">地址：{{gsdizi}}</p>
            <p style="font-size:28px;padding:10px">送货通知单</p>
         </div>
            <div v-if="nones">
             <div  class="block">
                <div  class="nones" style="display:flex;margin-right: 10px;">
                    <el-select v-model="input" @change="chaxuns" filterable placeholder="请选择">
                        <el-option
                        v-for="(item,index) in options"
                        :key="index"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                   
                    <div class="btns" style="display:flex">
                        <el-checkbox v-if="tequan" v-model="tequanCkeds" @change="tequanCked" style="background: #fff;padding: 0 10px;line-height: 40px;border: 1px solid #ccc;border-radius: 5px;margin: 0px 10px;" >特权</el-checkbox>
                        <el-button @click="click" >下载</el-button>
                        <el-button @click="down" v-if="ischongfu==false" :disabled="dateSta==true">保存</el-button>
                        <el-button @click="print" v-if="ischongfu==false" :disabled="dateSta==false">打印</el-button>
                        <el-button  @click="clerk">清屏</el-button>
                        <el-checkbox style="background: #fff;padding: 0 10px;line-height: 40px;border: 1px solid #ccc;border-radius: 5px;margin-left: 10px;" v-model="checked">客户规格型号</el-checkbox>
                    </div>
                </div>
                <div></div>
                <div class="rights" style="display:flex;margin-right: 10px;">
                    <div >
                        <span class="demonstration"></span>
                        <el-date-picker  v-model="valDatas"  type="date" placeholder="选择日期"> </el-date-picker>
                    </div>
                    <div style="line-height:40px">编号：<span style="color:red;font-weight: bold">{{hetongbianhao}}</span></div>
                </div>
                
             </div>
             <div class="block">
                 <div class="downInput" style="display: flex;" >
                    <p>收货单位：</p>
                    <el-select   visible-change="true" @change="shdiChange" :disabled="dateSta==true"  v-model="dizhi" filterable placeholder="请选择">
                            <el-option
                            v-for="(item,index) in shdi"
                            :key="index"
                            :label="item.shdw"
                            :value="item.shdis">
                            </el-option>
                        </el-select>

                </div>
                <div  class="aad">
                    <div style="display:flex">
                        <p>收货地址：</p>
                    <p style="width:350px">{{songhuodizhi}}</p>
                    </div>
                </div>
             </div>
             
         </div>
         <dir v-if="nones==false" class="blocks">
             <div  style="display:flex;justify-content: space-between;margin-top: -42px;">
                <div></div>
                <div class="rights" style="display:flex;margin-right: 50px;">
                    <div >
                        <span class="demonstration"></span>
                        <span style="line-height: 40px;margin-right: 30px;font-size:18px">{{valDatas}}</span>
                    </div>
                    <div style="line-height:40px">编号：<span style="font-size:20px">{{hetongbianhao}}</span></div>
                </div>
            </div>
             <div style="display:flex;background:#fff">
                 <div class="downInput" style="" >
                    <div style="display:flex">
                        <p>收货单位：</p>
                        <p style="width:250px">{{dizhi}}</p>
                    </div>
                    </div>
                    <div  class="aad">
                        <div style="display:flex">
                            <p>收货地址：</p>
                        <p style="width:350px">{{songhuodizhi}}</p>
                        </div>
                    </div>
             </div>
         </dir>
        
   <div id="hot-preview" >
   
   
        <div class="box1">
            <HotTable :root="root" ref="testHot"  :settings="hotSettings" ></HotTable>
            <el-row class="row1">
                <el-col :span="4"><div class="grid-content bg-purple">制单：{{userName}}</div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple-light">计划：</div></el-col>
                <el-col :span="4"><div class="grid-content bg-purple">审批：</div></el-col>
                <el-col :span="5"><div class="grid-content bg-purple-light">送货：</div></el-col>
                <el-col :span="7"><div class="grid-content bg-purple-light">收货盖章：</div></el-col>
            </el-row>
        </div>
          <div  class="box2" style="margin-top:70px">
               <p style="font-size:28px;padding:10px;text-align: center">成品出库放行单</p>
               <div v-if="nones" style="display:flex;justify-content: space-between;">
                   <div></div>
                   <div class="rights" style="display:flex;margin-right: 50px">
                        <div >
                            <span class="demonstration"></span>
                            <span style="    line-height: 40px;margin-right: 30px;">{{valDatas}}</span>
                        </div>
                        <div style="line-height:40px">编号：<span style="color:red">{{hetongbianhao}}</span></div>
                    </div>
               </div>
               <div v-if="nones==false" style="display:flex;justify-content: space-between;">
                   <div></div>
                   <div class="rights" style="display:flex;margin-right: 50px">
                        <div >
                            <span class="demonstration"></span>
                            <span style="    line-height: 40px;margin-right: 30px;font-size:18px">{{valDatas}}</span>
                        </div>
                        <div style="line-height:40px">编号：<span style="font-size:20px">{{hetongbianhao}}</span></div>
                    </div>
               </div>
                <HotTable :root="root" ref="testHots"  :settings="hotSettingss" ></HotTable>
                <el-row class="row1" style="padding:15px 0">
                    <el-col :span="4"><div class="grid-content bg-purple">总件数：{{allNus}}</div></el-col>
                    <el-col :span="5"><div class="grid-content bg-purple-light">QA报告：</div></el-col>
                    <el-col :span="5"><div class="grid-content bg-purple" style="display:flex;">
                        <div>运输方式：</div>
                     
                        <el-select v-model="kuaidiValue" @change="kuaidiChage" allow-create filterable placeholder="请选择" style="width:100px;border:none;background:#ddd">
                            <el-option
                            v-for="(item,index) in kuaidi"
                            :key="index"
                            :label="item"
                            :value="item">
                            </el-option>
                        </el-select>
                        
                        </div></el-col>
                    <el-col :span="5"><div class="grid-content bg-purple-light">送货签名：</div></el-col>
                    <el-col :span="5"><div class="grid-content bg-purple">制单：{{userName}}</div></el-col>
                </el-row>
                 <el-row style="padding:15px 0">
                    
                    <el-col :span="4"><div class="grid-content bg-purple-light">审核：</div></el-col>
                    <el-col :span="5"><div class="grid-content bg-purple">批准：</div></el-col>
                    <el-col :span="5"><div class="grid-content bg-purple-light">保管：</div></el-col>
                    <el-col :span="5"><div class="grid-content bg-purple-light">保安确认：</div></el-col>
                    <el-col :span="5"><div class="grid-content bg-purple-light">放行时间：</div></el-col>
                </el-row>
          </div>
         
        </div>
     
    
  </div>
  </div>
</template>
<script>
    import { HotTable } from '@handsontable-pro/vue'
    import '../../node_modules/handsontable-pro/dist/handsontable.full.css'
    import Handsontable from 'handsontable-pro'
    import * as getData from '../api/getDate';
    import enCH from '../api/en-CH';
    Handsontable.languages.registerLanguageDictionary(enCH);   //注册中文字典
    var _this = {}
    export default {
        data: function() {
            return {
                ischongfu:false,//控制保存打印是否可点击
                ywb:false,//控制排头是否可选择
                nones:true,//打印时隐藏不打印内容
                tequan:false,//是否有特权
                tequanCkeds:false,//特权状态
                options:'',//编号列表
                allNus:0,//总件数
                checked:false,//客户规格型号切换
                kuaidiValue:'',//运输方式
                kuaidi:['葛司机','顺丰快递','速尔快递','顺心捷达'],//运输方式列表
                songhuodizhi:'',//收货地址：
                dizhi:'',//收货单位
                shdi:[],//收货单位列表
                hetongbianhao:'',//合同编号
                valDatas:'',//选择日期
                widths:'',//设备宽度
                input: '',//查询客户送货单初始化
                decss:'深圳市宗泰电机有限公司',//公司初始化
                gsdizi:'深圳龙岗区南湾街道布澜路21号联创科技1号厂房4楼',//地址初始化
                decs:[//选择公司地址
                    {value:'深圳市宗泰电机有限公司', key:'深圳龙岗区南湾街道布澜路21号联创科技1号厂房4楼' },
                    {value:'惠州市宗联机电子科技有限公司', key:'惠州大亚湾西区龙山七路域鑫科技园厂房尚品楼第四层'},
                    {value:'深圳市亿得亨电子有限公司', key:'深圳龙岗区南湾街道布澜路21号联创科技1号厂房4楼'}
                ],
                xuhaos:0,//表格序号
                userid:'',//用户id
                userName:'',//用户名
                root: 'test-hot',//refs
                root: 'test-hots',//refs
                dateSta:false,//判断日期赛选是否触发
                value: '',//下拉框值
                department:[],//部门列表
                // 表1初始化
                hotSettings: {
                    data: [// 数据
                       {},{},{},{},{}, {hetonghao:'合计',}
                    ],
                    colHeaders:['序号', '合同号', '客户物料编码', '规格型号', '件数','数量(pcs)','备注'],
                    columns: [// 列属性
                        {data:'xuhao'},
                        {data: "hetonghao", type: "autocomplete",filter: 'true',source: []},//工单
                        {data: 'kehuwuliaobianma',source: []},//产品型号
                        {data: 'xinghao'},//数量kg
                        {data: 'zhongliang'}, //数量个数
                        {data: 'number',},//加工类型
                        {data: 'beizhu',},//交期
                    ],
                    //隐藏
                    //行列范围
                    startRows: 6,
                    startCols: 6,
                    //最小行列
                    minRows: 6,  
                    minCols: 6,
                    //列留白
                    minSpareCols: 0,
                    //行留白 
                    minSpareRows: 0,
                    columnHeaderHeight:61,
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
                    //  copyPaste: false,
                    //选中拖拽复制 possible values: true, false, "horizontal", "vertical"
                    fillHandle: true, 
                    rowHeights: [61,61,61,61,61,61],
                    //右键菜单
                    contextMenu: _this.util.contextMenu(_this,5,1),
                    // 定义某一行的数据格式
                    cells: function(row, col, prop) {
                        var cellProperties = {};
                        if(row ==5){
                            cellProperties.readOnly= true;
                            cellProperties.type = "text";
                        }
                        if(_this.dateSta == true){
                            cellProperties.readOnly= true;
                        }
                        return cellProperties;
                    },
                    beforeCopy:function(data,coords){
                        if(data[0].length!=1){
                            _this.$dialog({ message: '只能复制单一的某一列数据' });
                            return 
                            
                        }else{
                            if(data.length>5){
                                _this.$dialog({ message: '最多只能复制五个数据，请重新复制' });
                                return 
                            }

                        }
                        this.copyLenght = data.length
                       
                        let a =  data.map((item)=>{
                            let arr = item.map((item,index)=>{
                                let type,cols =  index+coords[0].startCol
                                if(cols==0){type='xuhao'}
                                if(cols==1){type='hetonghao'}
                                if(cols==2){type='kehuwuliaobianma'}
                                if(cols==3){type='xinghao'}
                                if(cols==4){type='zhongliang'}
                                if(cols==5){type='number'}
                                if(cols==6){type='beizhu'}
                                return {
                                        name:item,
                                        type:type
                                    }
                            })
                            return arr
                        })
                        
                        this.copyData = a
                        this.contentParst = 0
                    },
                    //黏贴前
                    beforePaste:function(data, coords){
                        console.log(data)
                        if(data[0].length!=1){
                            _this.$dialog({ message: '只能黏贴单一的某一列数据' });
                            return false
                            
                        }else{
                            console.log(coords)
                            if(this.copyRow+data.length-1>=6){
                                
                                _this.$dialog({ message: '黏贴后行数过多只能存在五个单子，请重新复制黏贴' });
                                return false
                            }
                            if(coords[0].startCol==1){
                                _this.$dialog({ message: '合同号请自己选择' });
                                return false
                            }

                        }
                       
                        
                    },
                    afterSelectionEnd: function(row, column,row2,column2){this.copyRow = row},
                   
                    // 表格数据发生改变后触发
                    afterChange:  function(changes, source) {
                        console.log(this.getSourceData())
                        if(this.getSourceData()[5].number==''||this.getSourceData()[5].number==undefined){
                            this.getSourceData()[5].number = 0
                            this.getSourceData()[5].kehuwuliaobianma ='零'
                        }
                        if(this.getSourceData()[5].zhongliang==''||this.getSourceData()[5].zhongliang==undefined){
                            this.getSourceData()[5].zhongliang = 0
                        }
                        _this.a = this
                        let time = getData.dateUtils.today({ymrSign:true})
                        var reg = /^([0]|[1-9][0-9]*)$/
                        if(changes){
                            changes.forEach(([row,prop,oldValue,newValue]) => {
                                // 合同号选择
                                if(prop == 'hetonghao'&row!=5&_this.dateSta == false){
                                    _this.xuhaos=row+1
                                    if(newValue!=null&newValue!=''){
                                        if(_this.list!=undefined){
                                            if(newValue.indexOf('%')!=-1){
                                                let hetonghao = newValue.split('%')[0]
                                                let kehuwuliao = newValue.split('%')[1]
                                                let xinghao = newValue.split('%')[2]
                                                let towList
                                                let towRow
                                                _this.list.forEach((item,index)=>{
                                                    let cust_po = item.cust_po?item.cust_po:''
                                                    let cust_item = item.cust_item?item.cust_item:''
                                                    let description = item.description?item.description:''
                                                    if(hetonghao == cust_po&kehuwuliao == cust_item&description == xinghao){
                                                        console.log(item)
                                                        towList = item
                                                        towRow = row
                                                        let xinghao = description
                                                        if(_this.checked){
                                                            xinghao = cust_item.split(';')[1]
                                                        }
                                                        // 赋值
                                                        this.getSourceData()[row].hetonghao = cust_po
                                                        this.getSourceData()[row].xuhao = _this.xuhaos
                                                        this.getSourceData()[row].kehuwuliaobianma = cust_item.split(';')[0]
                                                        this.getSourceData()[row].xinghao = xinghao
                                                        this.getSourceData()[row].beizhu = item.end_user
                                                        this.getSourceData()[row].price = item.price
                                                        this.number = item.qty_ordered
                                                    }
                                                })
                                                _this.towList = towList
                                                _this.towRow = towRow
                                                _this.changesSet(1)
                                            }else{
                                                _this.$toast('请选择或者输入正确的合同号'); 
                                                 this.getSourceData()[row].hetonghao = ''
                                            }
                                        }else{
                                            _this.$toast('请选择收货单位'); 
                                        }
                                    }

                                }
                                // 数量填写逻辑
                                if(prop =='number'&row!=5&_this.dateSta == false){
                                    console.log(1)
                                    if(reg.test(newValue)){
                                        let hetonghao = this.getSourceData()[row].hetonghao
                                        let xinghao = this.getSourceData()[row].xinghao
                                        let kehuwuliaobianma  = this.getSourceData()[row].kehuwuliaobianma
                                        if(this.getSourceData()[row].xinghao){
                                            let maxnums = 0
                                            this.getSourceData().forEach((item,index)=>{
                                                if(index!=5&&item.number!=undefined&item.hetonghao!=undefined){
                                                    maxnums = maxnums*1+item.number*1
                                                }
                                            })
                                            this.getSourceData()[5].number = maxnums
                                            this.getSourceData()[5].kehuwuliaobianma = _this.convertCurrency(maxnums)
                                            _this.towNum = newValue
                                            _this.towRow = row
                                            _this.changesSet(2)
                                           
                                        }else{
                                            this.getSourceData()[row].number = ''
                                            _this.$toast('请先选择合同号'); 
                                        }
                                    }else{
                                        this.getSourceData()[row].number = ''
                                        _this.$toast('请输入正整数');
                                    }
                                    
                                }
                                // 重量填写逻辑
                                if(prop =='zhongliang'&row!=5&_this.dateSta == false){
                                    if(reg.test(newValue)){
                                        let hetonghao = this.getSourceData()[row].hetonghao
                                        let xinghao = this.getSourceData()[row].xinghao
                                        let kehuwuliaobianma  = this.getSourceData()[row].kehuwuliaobianma
                                        if(_this.list){
                                            _this.list.forEach((item)=>{//D755028==m
                                                let cust_po = item.cust_po?item.cust_po:''
                                                let cust_item = item.cust_item?item.cust_item:''
                                                let description = item.description
                                                if(_this.checked){
                                                    description = cust_item.split(';')[1]
                                                }
                                                if(hetonghao == cust_po&kehuwuliaobianma == cust_item.split(';')[0]&hetonghao!=undefined){
                                                    if(xinghao ==item.description||xinghao == cust_item.split(';')[1]){
                                                        let maxnums = 0
                                                        this.getSourceData().forEach((item,index)=>{
                                                            if(index!=5&&item.zhongliang!=undefined&item.hetonghao!=undefined){
                                                                maxnums = maxnums*1+item.zhongliang*1
                                                            }
                                                        })
                                                        this.getSourceData()[5].zhongliang = maxnums
                                                        _this.allNus = maxnums
                                                    }
                                                }
                                               
                                            })
                                        }else{
                                            this.getSourceData()[row].zhongliang = ''
                                            _this.$toast('请先选择合同号'); 
                                        }
                                    }else{
                                        this.getSourceData()[row].zhongliang = ''
                                        _this.$toast('请输入正整数');
                                    }
                                }
                                
                            })
                        }
                        this.render();
                        
                    },
                },
                //表2初始化
                hotSettingss: {
                    // 数据
                    data: [
                        {},{},{},{},{},
                        {wuliaodaima:'合计',}
                    ],
                    colHeaders:['序号', '物料代码', '规格型号', '单位', '数量','订单号','生产批号','备注'],
                    // 列属性
                    columns: [
                        {data:'xuhao'},
                        {data: "wuliaodaima"},//工单
                        {data: 'guigexinghao'},//产品型号
                        {data: 'danwei'},//数量kg
                        {data: 'shuliang'}, //数量个数
                        {data: 'dingdanhao',},//加工类型
                        {data: 'shengcanpihao',},//交期
                        {data: 'beizhu',},//交期
                    ],
                    //行列范围
                    startRows: 6,
                    startCols: 6,
                    //最小行列
                    minRows: 6,  
                    minCols: 6,
                    columnHeaderHeight:61,
                    // 合并单元格
                    // mergeCells: [{row: 5, col: 2, rowspan: 1, colspan: 2},],
                    //列留白
                    minSpareCols: 0,
                    //行留白 
                    minSpareRows: 0,
                    // 行高
                    rowHeights: [61,61,61,61,61,61],
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
                    columnSorting: true,
                    //根据宽度横向扩展，last:只扩展最后一列，none：默认不扩展
                    stretchH: 'all',
                    //选中拖拽复制 possible values: true, false, "horizontal", "vertical"
                    fillHandle: true, 
                    //右键菜单
                    contextMenu: _this.$store.state.contextMenu,
                    // 数据发生变化触发
                    afterChange:  function(changes, source) {
                        _this.b = this
                        console.log(this.getSourceData()[5])
                        if(this.getSourceData()[5].shuliang==''||this.getSourceData()[5].shuliang==undefined){
                            this.getSourceData()[5].shuliang = 0
                            this.getSourceData()[5].guigexinghao ='零'
                        }
                        
                    }
                }
            };
        },
        beforeCreate(){ _this = this; },
        created(){
            // 设置分辨率不同的属性
            let widtha = document.documentElement.clientWidth
            this.hotSettings.colWidths = [20,60,75,90,30,35,90,90]
            this.hotSettingss.colWidths = [25,75,100,40,40,60,70,90]
            //初始化日期
            let time = getData.dateUtils.today({ymrSign:true})
            this.valDatas = time
            // 获取公司列表
            this.$api.get('/api/CO','',res=>{
                console.log(res)
                let lists = []
                this.dizi = JSON.parse(res.data).Table
                console.log(JSON.parse(res.data).Table)
                let name = this.$store.state.username
                JSON.parse(res.data).Table.forEach((item)=>{
                    if(name == item.description||name =='陈坤'||name == '肖虹'){
                        let list =item.cust_num+'%'+item.name
                        lists.push({
                            shdw:list,
                            shdis:item.cust_num+'%'+item.name+'%'+item.addr
                        })
                    }
                    
                })
                this.shdi = lists
                this.hotSettings.columns[2].source = lists
            })
            // 赋值路由
            this.$store.state.path = window.location.hash.split('/')[1]
            this.$store.state.name = '客户送货单'
            // 赋值用户信息
            this.userid = this.$store.state.userid
            this.userName = this.$store.state.username
            if(this.userid=='MeiMei'){
                this.decss = '惠州市宗联机电子科技有限公司'
                this.gsdizi = '惠州大亚湾西区龙山七路域鑫科技园厂房尚品楼第四层'
                this.ywb = true
            }
            let tqData = { MKID:'pc端授权-单据操作权限-客户送货单', USERID:this.userid }
            // 获取权限
            this.$api.get('/api/MOUSER',tqData,res=>{
                let tequan = JSON.parse(res.data).Table[0].特权*1
                if(tequan==1){ this.tequan = true }
            })
            // 获取部门列表
            this.$api.get('/api/WC','',res=>{
                console.log( JSON.parse(res.data).Table)
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
                this.department = departments
                let a = ['CNC','模具']
                department = department.concat(a)
                this.hotSettings.columns[6].source = department
            })
            // 获取编号
            this.chaxuns()
        },
        mounted(){},
        methods:{
            //特权
            tequanCked(e){  this.chaxuns()  },
            kuaidiChage(e){
            },
            //金额转化
            convertCurrency(money) {
                var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');//汉字的数字
                var cnIntRadice = new Array('', '拾', '佰', '仟');//基本单位
                var cnIntUnits = new Array('', '万', '亿', '兆');//对应整数部分扩展单位
                var cnDecUnits = new Array('角', '分', '毫', '厘');//对应小数部分单位
                var cnInteger = '整';//整数金额时后面跟的字符
                var cnIntLast = '只';//整型完以后的单位
                var maxNum = 999999999999999.9999;//最大处理的数字
                var integerNum;//金额整数部分
                var decimalNum; //金额小数部分
                var chineseStr = '';//输出的中文金额字符串
                var parts;//分离金额后用的数组，预定义
                if (money == '') { return ''; }
                money = parseFloat(money);
                if (money >= maxNum) { //超出最大处理数字
                    return '';
                }
                if (money == 0) {
                    chineseStr = cnNums[0] + cnIntLast + cnInteger;
                    return chineseStr;
                }
                money = money.toString();//转换为字符串
                if (money.indexOf('.') == -1) {
                    integerNum = money;
                    decimalNum = '';
                } else {
                    parts = money.split('.');
                    integerNum = parts[0];
                    decimalNum = parts[1].substr(0, 4);
                }
                if (parseInt(integerNum, 10) > 0) {//获取整型部分转换
                    var zeroCount = 0;
                    var IntLen = integerNum.length;
                    for (var i = 0; i < IntLen; i++) {
                    var n = integerNum.substr(i, 1);
                    var p = IntLen - i - 1;
                    var q = p / 4;
                    var m = p % 4;
                    if (n == '0') {
                        zeroCount++;
                    } else {
                        if (zeroCount > 0) {
                        chineseStr += cnNums[0];
                        }
                        zeroCount = 0;//归零
                        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                    }
                    if (m == 0 && zeroCount < 4) {
                        chineseStr += cnIntUnits[q];
                    }
                    }
                    chineseStr += cnIntLast;
                }
                if (decimalNum != '') {//小数部分
                    var decLen = decimalNum.length;
                    for (var i = 0; i < decLen; i++) {
                    var n = decimalNum.substr(i, 1);
                    if (n != '0') {
                        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
                    }
                    }
                }
                if (chineseStr == '') {
                    chineseStr += cnNums[0] + cnIntLast + cnInteger;
                } else if (decimalNum == '') {
                    chineseStr += cnInteger;
                }
                return chineseStr;
            },
            // 收货单位选择事件
            shdiChange(e){
                this.clerk()
                let list = e.split('%')
                this.dizhi = list[1]
                this.songhuodizhi = list[2]=='null'?'':list[2]
                this.daimas = list
                // 获取合同号列表
                this.$api.get('/api/CO',{i:0,zz:list[0]},res=>{
                    this.list = JSON.parse(res.data).Table
                    let lists = []
                    JSON.parse(res.data).Table.forEach((item)=>{
                        let cust_po = item.cust_po?item.cust_po:''
                        let cust_item = item.cust_item?item.cust_item:''
                        let description = item.description?item.description:''
                        let co_num = item.co_num?item.co_num:''
                        let list = cust_po+'%'+cust_item+'%'+description+'%'+co_num
                        lists.push(list)
                    })
                    _this.hotSettings.columns[1].source = lists
                })
            },
            //表二数据渲染
            changesSet(e){
                let hot3 = this.$refs.testHots.hotInstance
                hot3.updateSettings({
                    afterCellMetaReset(){
                        if(e ==1){
                            // 赋值
                            this.getSourceData()[_this.towRow].wuliaodaima = _this.towList.item
                            this.getSourceData()[_this.towRow].xuhao = _this.xuhaos
                            this.getSourceData()[_this.towRow].danwei = _this.towList.u_m
                            this.getSourceData()[_this.towRow].guigexinghao = _this.towList.description
                            this.getSourceData()[_this.towRow].dingdanhao = _this.towList.co_num
                            this.getSourceData()[_this.towRow].shengcanpihao = _this.towList.Uf_lyph
                        }else{
                            this.getSourceData()[_this.towRow].shuliang = _this.towNum
                            let maxnums = 0
                            this.getSourceData().forEach((item,index)=>{
                                
                                if(index!=5&&item.shuliang!=undefined){
                                    maxnums = maxnums*1+item.shuliang*1
                                }
                            })
                            this.getSourceData()[5].shuliang = maxnums
                            this.getSourceData()[5].guigexinghao = _this.convertCurrency(maxnums)

                        }
                            
                    }
                });
            },
            // 送货公司选中赋值
            decsschange(e){ 
              
                this.clerk()
                this.decs.forEach((item)=>{ if(item.value ==e){ this.gsdizi = item.key } }) 
            },
            //打印
            print(){
                this.nones = false
                setTimeout(()=>{
                        this.util.onPrint(this,'','@page{size:auto;margin: 0.3cm 1cm 0cm 0.3cm;}')
                        this.nones = true
                },1000)
            },
            // 保存文件
            async down(){
                this.ischongfu=true
                // 最大编号
                let listAll = JSON.parse(await this.$api.api.get('/api/co',{i:-1,zz:this.decss})).Table[0].Column1
                listAll=listAll==null?1:listAll+1
                let shdw,daima,shdz
                if(this.daimas){
                    shdw = this.daimas[1]
                    daima = this.daimas[0]
                    shdz = this.daimas[2]
                    if(this.daimas[2] =='null'){shdz = ''}
                }
                let rq = this.util.dateFormat("YYYY-mm-dd", new Date(this.valDatas))
                
                if(shdw){
                    let datas = [],datasa = [],soles = []
                    _this.a.getSourceData().forEach((item,index)=>{
                        if(typeof item.xuhao =='number'){
                            soles.push(index)
                            if(item.number){
                                datas.push({
                                    a1:this.decss,
                                    a2:listAll,
                                    a3:shdw,
                                    a4:daima||'',
                                    a5:shdz||'',
                                    a6:rq||'',
                                    a7:item.xuhao||'',
                                    a8:item.hetonghao||'',
                                    a9:item.kehuwuliaobianma||'',
                                    a10:item.xinghao||'',
                                    a11:item.zhongliang||'',
                                    a12:item.number||'',
                                    a13:item.beizhu||'',
                                    a14:this.$store.state.username,
                                    a15:'',
                                    a16:'',
                                    a17:'',
                                    a18:'',
                                    a19:item.price
                                })
                            
                            }else{  this.$dialog({ message: '没有送货数量,在'+(item.xuhao)+'行' }); }
                        }
                    })
                    _this.b.getSourceData().forEach((item,index)=>{
                        if(typeof item.xuhao =='number'){
                            datasa.push({
                                A1:listAll,
                                A2:item.xuhao||'',
                                A3:item.wuliaodaima||'',
                                A4:item.guigexinghao||'',
                                A5:item.danwei||'',
                                A6:item.shuliang||'',
                                A7:item.dingdanhao||'',
                                A8:item.shengcanpihao||'',
                                A9:item.beizhu||'',
                                A10:'',
                                A11:'',
                                A12:'',
                                A13:'',
                                A14:this.$store.state.username,
                                A15:'',
                                A16:'',
                                A17:'',
                                A18:'',
                                A19:'',
                                A20:this.decss,
                            })
                        }
                    })
                    if(datas.length==soles.length&datas.length!=0){
                            datas.forEach((item)=>{
                                this.$api.post('/api/CO',item,res=>{})
                            })
                            datasa.forEach((item)=>{
                                this.$api.post('/api/CPCK',item,res=>{this.chaxuns(item.A1)})
                            })
                        this.$dialog({ message: '成功' });
                    }else{
                       
                    }
                }else{
                    this.$dialog({ message: '收货单位' });
                }
            
            },
            // 编号查询
            async chaxuns(e){
                this.ischongfu=false
                function PrefixZero(num, n) { return (Array(n).join(0) + num).slice(-n);}
                let zz = this.$store.state.username
                if(this.tequanCkeds==true){  zz = 'ALL'  }
                // 编号列表
                let listAll = JSON.parse(await this.$api.api.get('/api/CO',{zz:zz})).Table
              
                let lists = listAll.map(item=>{return item.编号})
                this.options =  Array.from(new Set(lists)).map(item=>{
                    let label = PrefixZero(item, 6)
                    return {value: item,label: label}
                })
                if(e){
                    _this.a.loadData([])//表格为空
                    this.dateSta = true
                    let hot3 = this.$refs.testHot.hotInstance
                    _this.checked = false
                    this.hetongbianhao = PrefixZero(e, 6)
                    let list = []
                    listAll.forEach((item=>{
                        if(item.编号==e){
                            console.log(item)
                            list.push(item)
                        }
                    }))
                    this.dizhi = list[0].收货单位
                    this.songhuodizhi = list[0].收货地址
                    let maxnums = 0
                    let allNus = 0
                    list = list.sort((pre, cur) =>pre.序号 - cur.序号);
                     this.valDatas = list[0].日期
                      this.userName = list[0].制单  
                    list.forEach((item,index)=>{

                        _this.a.getSourceData()[index].hetonghao = item.合同号
                        _this.a.getSourceData()[index].xuhao = item.序号
                        _this.a.getSourceData()[index].kehuwuliaobianma = item.客户物料
                        _this.a.getSourceData()[index].xinghao = item.规格型号
                        _this.a.getSourceData()[index].zhongliang = item.送货重量
                        _this.a.getSourceData()[index].number = item.送货数量
                        _this.a.getSourceData()[index].beizhu = item.备注
                        _this.a.getSourceData()[index].chulihao = item.处理号
                        maxnums = maxnums*1+item.送货数量*1//数量
                        allNus = allNus*1+item.送货重量*1//jianshu
                    })
                    _this.a.getSourceData()[5].number = maxnums
                    _this.a.getSourceData()[5].zhongliang = allNus
                    _this.a.getSourceData()[5].kehuwuliaobianma = this.convertCurrency(maxnums)
                    _this.a.getSourceData()[5].hetonghao = '合计'
                    this.allNus = allNus
                    _this.a.render();
                    _this.b.loadData([])
                    this.$api.get('/api/CPCK',{ i:e*1,zz:this.decss},res=>{
                        let lists = JSON.parse(res.data).Table
                        console.log(lists)
                        lists = lists.sort(//排序小到大
                            (pre, cur) =>
                                pre.序号 - cur.序号
                            );
                            let maxnum = 0
                            console.log(lists)
                        lists.forEach((item,index)=>{
                            _this.b.getSourceData()[index].wuliaodaima = item.物料代码
                            _this.b.getSourceData()[index].xuhao = item.序号
                            _this.b.getSourceData()[index].guigexinghao = item.规格型号
                            _this.b.getSourceData()[index].danwei = item.单位
                            _this.b.getSourceData()[index].shuliang = item.数量
                            _this.b.getSourceData()[index].dingdanhao = item.订单号
                            _this.b.getSourceData()[index].shengcanpihao = item.生产批号
                            _this.b.getSourceData()[index].beizhu = item.备注
                            maxnum = maxnum*1+item.数量*1
                        })
                        _this.b.getSourceData()[5].shuliang = maxnum
                        _this.b.getSourceData()[5].guigexinghao = this.convertCurrency(maxnum)
                        _this.b.getSourceData()[5].wuliaodaima = '合计'
                        _this.b.render();
                    })
                     
                }
            },
       
            // 下载文件
            click(){
                    var button1 = document.getElementById('export-file');
                    var exportPlugin1 = _this.a.getPlugin('exportFile');
                    
                    exportPlugin1.downloadFile('csv', {
                        bom: 'UTF-8',
                        columnDelimiter: ',',
                        columnHeaders: false,
                        exportHiddenColumns: true,
                        exportHiddenRows: true,
                        fileExtension: 'csv',
                        filename: '客户送货通知单',
                        mimeType: 'text/csv',
                        rowDelimiter: '\r\n',
                        rowHeaders: true
                    });
                        var exportPlugin2 = _this.b.getPlugin('exportFile');
                        exportPlugin2.downloadFile('csv', {
                            bom: 'UTF-8',
                            columnDelimiter: ',',
                            columnHeaders: false,
                            exportHiddenColumns: true,
                            exportHiddenRows: true,
                            fileExtension: 'csv',
                            filename: '成品出库放行单',
                            mimeType: 'text/csv',
                            rowDelimiter: '\r\n',
                            rowHeaders: true
                        });
            },
            // 清空
            clerk(){
                this.dizhi = ''
                this.allNus = 0
                this.songhuodizhi = ''
                this.hetongbianhao = ''
                this.input = ''
                this.valDatas =getData.dateUtils.today({ymrSign:true})
                _this.hotSettings.columns[1].source = []
                this.dateSta = false
                _this.a.loadData([])
                _this.a.getSourceData()[5].hetonghao = '合计'
                _this.b.loadData([])
                _this.b.getSourceData()[5].wuliaodaima = '合计'
                
            },
       
        },
        // 注册组件
        components: { HotTable }
    }
</script>

<style >
.bg-purple input{
    padding-right:0px !important;
    height: auto !important;
    margin-top: -10px;
    border: none;
    color: #000
}
.bg-purple input::-webkit-input-placeholder{
            color:#000;
        }
.handsontable tr:last-child td:nth-of-type(3) {
    text-align: left
}
.shdw{
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    /* font-weight: bold; */
    background: #fff;
    height: 60px;
}
.shdw .el-input__inner{
    border: none;
    font-size: 18px;
    /* font-weight: bold; */
    height: 25px;
    padding: 0px
   
}
.shdw .el-select{
    width: 80%
}
.el-input.is-disabled .el-input__inner{
    color: #2C3E50 !important;
    background-color:#fff  !important;  
} 

.kh{
        width:977px;
        margin: 0 auto;
    }
.kh .block input,.kh  .rights input{
    width: 145px !important;
}

.kh .block .downInput .el-input__inner{
    width: 100% !important;
}
.kh .block .downInput .el-select{
    width: 84% !important;
}

.kh .block .downInput,
.kh .block .aad{
    font-size: 15px !important;
    width: 50% !important;
    line-height: 40px !important;
}
.kh .blocks .downInput,
.kh .blocks .aad{
    font-size: 16px !important;
    width: 50% !important;
    line-height: 40px !important;
}


.kh .headers{
    text-align: center;
    background: #fff;
}
.aa .el-input__inner{
    border: none;
    text-align: center;
    color: #000;
    font-size: 30px;
}
.kh .headers .el-select{
    width: 100%
}
.kh .el-input__suffix{
    display: none
}
.kh .block{
      display: flex;
      justify-content: space-between;
      height: 40px;
  } 
.handsontable th, .handsontable td{
    display: table-cell;
    vertical-align: middle;
    font-size: 16px !important
       
   } 

   .el-date-editor.el-input, .el-date-editor.el-input__inner{
       width: 100% !important
   }



</style>