<template>
  <div >
      <el-select v-model="value" @change="selectChange" v-if="isselete==0||isselete!=3" :disabled="ismouser" filterable placeholder="销售单号">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
      <el-select v-model="values" @change="selectChanges" v-if="isselete==0||isselete!=2" :disabled="ismousers" filterable placeholder="合同评审号">
        <el-option v-for="item in optionss" :key="item.value" :label="item.label" :value="item.value"> </el-option>
      </el-select>
      <div style="font-size:30px;font-weight: bold;display:flex;justify-content:center">合同评审记录</div>
      <div ref="print" >
          <div style="width:95%">
                <div style="border-bottom: 1px solid;display:flex;justify-content:space-between">
                    <div></div>
                    <!-- <div style="font-size:30px;font-weight: bold;">合同评审记录</div> -->
                    <div>{{maxval}}</div>
                </div>
                <div>
                    <el-row >
                        <el-col :span="4"><div class="grid-content ">合同内容及要求：</div></el-col>
                    </el-row>
                    <el-row v-for="(value, key, index) in tablist" :key="index">
                        <el-col :span="4"><div class="grid-content ">{{key}}：</div></el-col>
                        <div v-if="list!=''">
                            <el-col :span="6" v-for="(item,indexs) in list" :key="indexs">
                                <div class="grid-content -light" >{{list[indexs][key]}}</div>
                            </el-col>
                        </div>
                    </el-row>
                </div>
                <div style="border-bottom: 1px solid;text-align: center;margin-top:100px">
                    <el-row >
                        <el-col :span="24"><div class="grid-content ">
                            合同种类判别：
                            <el-radio v-model="radio" label="0">常规合同</el-radio>
                            <el-radio v-model="radio" label="1">特殊合同</el-radio>
                        </div></el-col>
                    </el-row>
                    <el-row >
                        <el-col :span="24"><div class="grid-content ">(常规合同不需要技术部签字，特殊合同则需要技术部签字)</div></el-col>
                    </el-row>
                </div>
                <div v-if="isdes==false">
                    <el-row > <el-col :span="4"><div class="grid-content ">评审单位及记录：</div></el-col> </el-row>
                    <el-row >
                        <el-col :span="4"><div class="grid-content "></div></el-col>
                        <el-col :span="4"><div class="grid-content ">市场部</div></el-col>
                        <el-col :span="4"><div class="grid-content " style="display:flex"><span>1.</span><el-input @input="input" v-model="shichang1"></el-input></div></el-col>
                        <el-col :span="4"><div class="grid-content " style="display:flex"><span>2.</span><el-input @input="input" v-model="shichang2"></el-input></div></el-col>
                    </el-row>
                    <el-row >
                        <el-col :span="4"><div class="grid-content "></div></el-col>
                        <el-col :span="4"><div class="grid-content ">计划中心</div></el-col>
                        <el-col :span="4"><div class="grid-content " style="display:flex"><span>1.</span><el-input @input="input" v-model="jihua1"></el-input></div></el-col>
                        <el-col :span="4"><div class="grid-content " style="display:flex"><span>2.</span><el-input @input="input" v-model="jihua2"></el-input></div></el-col>
                        <el-col :span="4"><div class="grid-content " style="display:flex"><span>3.</span><el-input  @input="input" v-model="jihua3"></el-input></div></el-col>
                    </el-row>
                    <el-row >
                        <el-col :span="4"><div class="grid-content "></div></el-col>
                        <el-col :span="4"><div class="grid-content ">技术部</div></el-col>
                        <el-col :span="4"><div class="grid-content " style="display:flex"><span>1.</span><el-input  @input="input" v-model="jishu"></el-input></div></el-col>
                        <el-col :span="4"><div class="grid-content ">目标价格：</div></el-col>
                        <el-col :span="4"><div class="grid-content " ><el-input  @input="input" v-model="jiage"></el-input></div></el-col>
                    </el-row>
                    <el-row >
                        <el-col :span="12"><div class="grid-content "></div></el-col>
                        <el-col :span="4"><div class="grid-content "><el-radio v-model="radios" @change="input" label="1">有且有效</el-radio></div></el-col>
                        <el-col :span="4"><div class="grid-content "><el-radio v-model="radios" @change="input" label="0">无或无效</el-radio></div></el-col>
                    </el-row>
                </div>
                <div v-if="isdes==false">
                    <el-row >
                        <el-col :span="3"><div class="grid-content ">合同更改内容：</div></el-col>
                        <el-col :span="7">
                            <div class="grid-content " style="display:flex">
                                <span>一次：</span>
                                <el-date-picker  value-format="yyyy-MM-dd" @input="input" :disabled="form.genggai1!=''" v-model="genggai1" type="date" > </el-date-picker>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content " style="display:flex">
                                <span>二次：</span>
                                <el-date-picker  value-format="yyyy-MM-dd" @input="input" :disabled="form.genggai2!=''" v-model="genggai2" type="date" > </el-date-picker>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content " style="display:flex">
                                <span>三次：</span>
                                <el-date-picker  value-format="yyyy-MM-dd" @input="input" :disabled="form.genggai3!=''" v-model="genggai3" type="date" > </el-date-picker>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row >
                        <el-col :span="3"><div class="grid-content ">评审记录：</div></el-col>
                        <el-col :span="7">
                            <div class="grid-content " style="display:flex">
                                <span>一次：</span>
                                <el-date-picker  value-format="yyyy-MM-dd" @input="input" :disabled="form.jilv1!=''" v-model="jilv1" type="date" > </el-date-picker>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content " style="display:flex">
                                <span>二次：</span>
                                <el-date-picker  value-format="yyyy-MM-dd" @input="input" :disabled="form.jilv2!=''" v-model="jilv2" type="date" > </el-date-picker>
                            </div>
                        </el-col>
                        <el-col :span="7">
                            <div class="grid-content " style="display:flex">
                                <span>三次：</span>
                                <el-date-picker  value-format="yyyy-MM-dd" @input="input" :disabled="form.jilv3!=''" v-model="jilv3" type="date" > </el-date-picker>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row >
                        <el-col :span="3"><div class="grid-content ">备注：</div></el-col>
                        <div v-if="list!=''">
                            <el-col :span="7">
                                <div class="grid-content ">{{list[0].零件编码}}:{{list[0].库存数量}}
                                    <el-checkbox @change="input" v-model="list[0].isky">可用</el-checkbox>
                                </div>
                            </el-col>
                            <el-col :span="7" v-if="list.length==2">
                                <div class="grid-content ">{{list[1].零件编码}}:{{list[1].库存数量}}
                                    <el-checkbox @change="input" v-model="list[1].isky">可用</el-checkbox>
                                </div>
                            </el-col>
                        </div>
                    </el-row>
                    <el-row >
                        <el-col :span="3"><div class="grid-content ">所属工单：</div></el-col>
                        <div v-if="list!=''">
                            <el-col :span="7">
                                <div class="grid-content " style="display:flex">
                                    <span>工单1：{{list[0].gongdan}}</span>
                                    <!-- <el-select v-model="list[0].gongdan" @change="input" filterable allow-create default-first-option >
                                        <el-option  v-for="item in option1" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select> -->
                                    <!-- <el-input  @input="input" v-model="list[0].gongdan"></el-input> -->
                                </div>
                            </el-col>
                            <el-col :span="7" v-if="list.length==2">
                                <div class="grid-content " style="display:flex">
                                    <span>工单2：{{list[1].gongdan}}</span>
                                    <!-- <el-select v-model="list[1].gongdan" @change="input" multiple filterable allow-create default-first-option >
                                        <el-option  v-for="item in option2" :key="item.value" :label="item.label" :value="item.value"></el-option>
                                    </el-select> -->
                                    <!-- <el-input  @input="input" v-model="list[1].gongdan"></el-input> -->
                                </div>
                            </el-col>
                        </div>
                    </el-row>
                    <el-row >
                        <el-col :span="3"><div class="grid-content ">入库：</div></el-col>
                        <div v-if="list!=''">
                            <el-col :span="7">
                                <div class="grid-content " style="display:flex">
                                    <span>入库1：{{list[0].ruku}}</span>
                                    <!-- <el-date-picker  value-format="yyyy-MM-dd" v-model="list[0].ruku" :disabled="true" @change="input" type="date" ></el-date-picker> -->
                                </div>
                            </el-col>
                            <el-col :span="7" v-if="list.length==2">
                                <div class="grid-content "  style="display:flex">
                                    <span>入库2：{{list[1].ruku}}</span>
                                    <!-- <el-date-picker  value-format="yyyy-MM-dd" v-model="list[1].ruku" :disabled="true" @change="input" type="date" > </el-date-picker> -->
                                </div>
                            </el-col>
                        </div>
                    </el-row>
                </div>
                <div class="qianzi">
                    <el-row >
                        <el-col :span="4"><div class="grid-content ">市场部提交时间</div></el-col>
                        <el-col :span="4"><div class="grid-content ">物料计划签字</div></el-col>
                        <el-col :span="4"><div class="grid-content ">物料计划完成时间</div></el-col>
                        <el-col :span="4"><div class="grid-content ">生产计划签字</div></el-col>
                        <el-col :span="4"><div class="grid-content ">生产计划完成时间</div></el-col>
                        <el-col :span="4"><div class="grid-content ">市场签字</div></el-col>
                    </el-row>
                    <el-row >
                        <el-col :span="4"><div class="grid-content ">
                            {{sctisj}}
                        </div></el-col>
                        <el-col :span="4"><div class="grid-content ">{{wjlhqz}}</div></el-col>
                        <el-col :span="4"><div class="grid-content ">
                            {{wljhsj}}
                        </div></el-col>
                        <el-col :span="4"><div class="grid-content ">{{scjhqz}}</div></el-col>
                        <el-col :span="4"><div class="grid-content ">{{scjhsj}}
                        </div></el-col>
                        <el-col :span="4"><div class="grid-content ">{{scqz}}</div></el-col>
                    </el-row>
                
                </div>
          </div>
      </div>
            
            
        
        
        
      
    
        
      <div v-if="iszuofei">
          <el-button type="primary" @click="sub" :disabled="true">保存</el-button>
          <el-button type="danger" @click="zuofei" :disabled="true">已作废</el-button>
          <el-button type="primary" @click="print" :disabled="prints">打印</el-button>
      </div>
      <div v-else>
          <el-button type="primary" @click="sub" :disabled="disabled">保存</el-button>
          <el-button type="primary" @click="zuofei" :disabled="zuofeis">作废</el-button>
          <el-button type="primary" @click="print" :disabled="prints">打印</el-button>
      </div>
      
      
      <el-dialog title="收货地址" :visible.sync="dialogTableVisible">
        <el-table :data="gridData" empty-text="此订单号已做完合同评审。没有数据可供做单" ref="multipleTable" @select="select" @select-all="selectAll">
            <el-table-column type="selection" width="55"> </el-table-column>
            <el-table-column property="客户代号" label="客户代号" ></el-table-column>
            <el-table-column property="制造型号" label="制造型号"></el-table-column>
            <el-table-column property="零件编码" label="零件编码"></el-table-column>
            <el-table-column property="生产批号" label="生产批号"></el-table-column>
            <el-table-column property="数量" label="数量"></el-table-column>
        </el-table>
        </el-dialog>
  </div>
</template>

<script>
import * as getData from '../api/getDate';
export default {
    data(){
        return{
            isselete:0,
            isshow:'',
            value:'',
            values:'',
            radio: '0',//合同类型
            radios: '1',
            options:[],
            optionss:[],
            option1:[],
            option2:[],
            maxval:0,
            ljdmValue:[],
            list:[],
            checked:false,
            disabled:true,
            isdes:true,
            ismouser:true,
            ismousers:true,
            zuofeis:true,
            iszuofei:false,
            prints:true,
            dialogTableVisible:false,
            gridData: [],
            checkeds:false,
            isky:false,
            iskys:false,
            tablist:{
                订单日期:'11',
                客户代号:'21',
                客户订单号:'31',
                销售订单号:'41',
                型号捺印:'51',
                零件编码:'61',
                制造型号:'71',
                数量:'81',
                交期:'91',
                生产批号:'111',
            },
            form:{
                genggai1:'',
                genggai2:'',
                genggai3:'',
                jilv1:'',
                jilv2:'',
                jilv3:'',
            },
            shichang1:'',
            shichang2:'',
            jihua1:'',
            jihua2:'',
            jihua3:'',
            jishu:'',
            jiage:'',
            genggai1:'',
            genggai2:'',
            genggai3:'',
            jilv1:'',
            jilv2:'',
            jilv3:'',
            sctisj:getData.dateUtils.today({ymrSign:true}),
            wjlhqz:'',
            wljhsj:'',
            scjhqz:'',
            scjhsj:'',
            scqz:'',
            reportTo:'',
            username:'',
            
        }
    },
    created(){
        this.getData()
         this.options = this.$store.state.options
         this.optionss = this.$store.state.optionss
        console.log(this.$store.state.userlist)
        console.log(this.util.parse_url('userid'))
        let username
        this.$store.state.userlist.forEach((item)=>{
            if(this.util.parse_url('userid')==item.userid){
                username = item.name
            }
        })
        console.log(username)
        this.scqz = username
        this.username = username
        
        
        // this.radio = '1'
        
    },
    methods:{
        async getData(){
            let token_data={ corpid : 'ww4b634cb35b1893b8',  corpsecret:'ETR1wnZEcxDCdOsuZi6kgWyYf4I-fT_-a49VntogDD8' }
            this.token = JSON.parse(await this.$api.api.get('/api/weixin',token_data)).access_token
            console.log(this.token)
            let datas = {
                userid:this.util.parse_url('userid'),
                modu:'消息推送授权-前台-合同评审记录'
            }
            let report = JSON.parse(await this.$api.api.get('/api/reportto',datas)).Table[0]
            if(report!=undefined){
                this.reportTo = report.汇报给ID.replace(/,/g,"|")
            }
            console.log(report)
            let data = {
                MKID:'pc端授权-合同评审记录',
                USERID:this.util.parse_url('userid')
            }
            let mouser = JSON.parse(await this.$api.api.get('/api/MOUSER',data)).Table[0]
            if(mouser!=undefined){
                if(mouser.增加*1==1){
                    this.ismouser = false
                }
                if(mouser.修改*1==1){
                    this.ismousers = false
                }
            }
            this.mouser = mouser
            console.log(this.util.parse_url('maxval'))
            if(this.util.parse_url('maxval')!=null){
                this.selectChanges(this.util.parse_url('maxval')) 
            }
            console.log(mouser)
           

        },
        input(e){
            this.disabled = false
        },
        async selectChange(e){
            this.option1 = []
            this.option2 = []
            this.isdes = false
            this.isselete = 2
            function PrefixZero(num, n) { return (Array(n).join(0) + num).slice(-n);}
            let maxValue = JSON.parse(await this.$api.api.get('/api/HTPS',{i:0,start:''})).Table[0].最大号*1
            let label = maxValue+1
            this.maxval = PrefixZero(label,8)
            this.maxvals = label
            this.list = []
            this.dialogTableVisible = true
            let ljdmValue = JSON.parse(await this.$api.api.get('/api/HTPS',{start:e})).Table
            console.log(ljdmValue)
            let ljdmValues = JSON.parse(await this.$api.api.get('/api/HTPS',{i:3,start:e})).Table
            console.log(ljdmValues)
            this.ljdmValue = ljdmValue
            let maxs = []
            ljdmValue.forEach((item,index)=>{
                ljdmValues.forEach((items)=>{
                    if(item.co_line*1==items.行号*1){
                        ljdmValue.splice(index,1)
                    }
                })
               
            })
            console.log(maxs)
            this.gridData = ljdmValue.map((item)=>{
                
                return{
                    订单日期:item.order_date.split('T')[0],
                    客户代号:item.cust_num,
                    客户订单号:item.cust_po,
                    销售订单号:item.co_num,
                    型号捺印:item.description,
                    零件编码:item.item,
                    制造型号:item.description,
                    数量:item.qty_ordered,
                    交期:item.due_date.split('T')[0],
                    生产批号:item.Uf_lyph,
                    库存数量:item.qty_sum,
                    行号:item.co_line
                }
            })
            // this.isshow = '123123'
            // ljdmValue.forEach(async(item,index)=>{
            //     console.log(item.Uf_lyph)
            //     if(item.Uf_lyph!=null){
            //         let list = JSON.parse(await this.$api.api.get('/api/HTPS',{i:5,start:item.Uf_lyph})).Table
            //         console.log(list)
            //         if(list!=''){
            //             let option = []
            //             list.forEach((items)=>{
            //                 option.push({
            //                     label:items.工单号,
            //                     value:items.工单号,
            //                 })
            //             })
            //             if(index==0){
            //                this.option1 =  option
            //             }else{
            //                 this.option2 =  option
            //             }
            //         }
            //     }
            // })
            // console.log(list)
            // console.log(e)
            // this.gridData = list
            // this.tablist = list
        },
        async selectChanges(e){
            this.option1 = []
            this.option2 = []
            this.isdes = false
            if(this.mouser.删除*1==1){this.zuofeis = false}
            function PrefixZero(num, n) { return (Array(n).join(0) + num).slice(-n);}
            this.isselete = 3
            console.log(e)
             let list = JSON.parse(await this.$api.api.get('/api/HTPS',{start:e,i:1})).Table
             let lists = JSON.parse(await this.$api.api.get('/api/HTPS',{start:e,i:2})).Table[0]
             console.log(lists)
             let 作废 = lists.作废==null?'':lists.作废.replace(/\s+/g, "")
             if(作废=='Y'){ this.iszuofei = true  }else{this.iszuofei = false}
            console.log(list)
            
            this.prints = false
            this.list = list.map((item)=>{
                let ruku = item.入库时间.replace(/\s+/g, "")==''?false:true
                return{
                    订单日期:item.订单日期,
                    客户代号:item.客户代码,
                    客户订单号:item.客户订单号,
                    销售订单号:item.销售订单号,
                    型号捺印:item.捺印型号,
                    零件编码:item.零件编码,
                    制造型号:item.制造型号,
                    数量:item.数量,
                    交期:item.交期,
                    生产批号:item.生产批号,
                    库存数量:item.库存现有量,
                    行号:item.行号,
                    isky:item.是否可用*1==1?true:false,
                    gongdan:item.对应工单号.replace(/\s+/g, ""),
                    ruku:item.入库时间.replace(/\s+/g, ""),
                    // rukus:ruku
                }
            })
            list.forEach(async(item,index)=>{
                console.log(item.生产批号.replace(/\s+/g, "")=='')
                if(item.生产批号.replace(/\s+/g, "")!=''){
                    let lista = JSON.parse(await this.$api.api.get('/api/HTPS',{i:5,start:item.生产批号.replace(/\s+/g, "")})).Table
                    console.log(lista)
                    if(lista!=''){
                    // if(lista!=''&&this.username == '胡国良'){
                        // let option = []
                        lista.forEach((items,indexs)=>{
                            console.log(index)
                            this.list[index].gongdan = items.工单号
                            this.list[index].ruku = items.到期日期
                            console.log(this.list[index])
                            // option.push({
                            //     label:items.工单号,
                            //     value:items.工单号,
                            // })
                        })
                        // console.log(index)
                        // if(index==0){
                        //    this.option1 =  option
                        // }else{
                        //     this.option2 =  option
                        // }
                        
                        console.log(this.list)
                    }
                }
            })
            console.log(lists.合同类型*1)
            this.maxval = PrefixZero(lists.合同评审号,8)
            this.maxvals = lists.合同评审号
            console.log(this.maxvals)
            this.radio = lists.合同类型.replace(/\s+/g, "")
            this.radios = lists.是否有效.replace(/\s+/g, "")
            this.shichang1 = lists.市场1.replace(/\s+/g, "")
            this.shichang2 = lists.市场2.replace(/\s+/g, "")
            this.jihua1 = lists.计划中心1.replace(/\s+/g, "")
            this.jihua2 = lists.计划中心2.replace(/\s+/g, "")
            this.jihua3 = lists.计划中心3.replace(/\s+/g, "")
            this.jishu = lists.技术部.replace(/\s+/g, "")
            this.jiage = lists.目标价格.replace(/\s+/g, "")
            this.genggai1 = lists.合同更改内容1.replace(/\s+/g, "")
            this.form.genggai1 = this.genggai1
            this.genggai2 = lists.合同更改内容2.replace(/\s+/g, "")
            this.form.genggai2 = this.genggai2
            this.genggai3 = lists.合同更改内容3.replace(/\s+/g, "")
            this.form.genggai3 = this.genggai3
            this.jilv1 = lists.评审记录1.replace(/\s+/g, "")
            this.form.jilv1 = this.jilv1
            this.jilv2 = lists.评审记录2.replace(/\s+/g, "")
            this.form.jilv2 = this.jilv2
            this.jilv3 = lists.评审记录3.replace(/\s+/g, "")
            this.form.jilv3 = this.jilv3
            this.sctisj = lists.市场部提交时间.replace(/\s+/g, "")
            this.wjlhqz = lists.物料计划签字.replace(/\s+/g, "")
            this.wljhsj = lists.物料计划完成时间.replace(/\s+/g, "")
            this.scjhqz = lists.生产计划签字.replace(/\s+/g, "")
            this.scjhsj = lists.生产计划完成时间.replace(/\s+/g, "")
            this.scqz = lists.市场签字.replace(/\s+/g, "")
            if(this.username=='胡国良'){
                this.scjhqz = this.username
                this.scjhsj = getData.dateUtils.today({ymrSign:true})
            }
            
        },
        select(selection, row) {
            if (selection.length > 2) {
                let del_row = selection.shift();
                this.$refs.multipleTable.toggleRowSelection(del_row, false); 
            }
            this.list = selection
            this.disabled = selection==''?true:false

        },

        selectAll(selection) {
            if (selection.length > 2) {
                selection.length = 2;
            }
            this.list = selection
            this.disabled = selection==''?true:false

        },
       
        sub(){
            console.log(this.radio)
            this.list.forEach((item,index)=>{
                let data
                if(this.isselete==2){
                    data = {
                        I:1,
                        A0:this.maxvals,//合同评审号
                        A1:item.行号==null?'':item.行号,//行号
                        A2:item.订单日期==null?'':item.订单日期,//订单日期
                        A3:item.客户代号==null?'':item.客户代号,//客户代码
                        A4:item.客户订单号==null?'':item.客户订单号,//客户订单号
                        A5:item.销售订单号==null?'':item.销售订单号.replace(/\s+/g, ""),//销售订单号
                        A6:item.型号捺印==null?'':item.型号捺印,//捺印型号
                        A7:item.零件编码==null?'':item.零件编码,//零件编码
                        A8:item.制造型号==null?'':item.制造型号,//制造型号
                        A9:item.数量==null?'':item.数量,//数量
                        A10:item.交期==null?'':item.交期,//交期
                        A11:item.生产批号==null?'':item.生产批号,//生产批号
                        A12:item.gongdan==undefined?'':item.gongdan,//对应工单号
                        A13:item.库存数量==null?'':item.库存数量,//库存现有量
                        A14:item.isky==true?1:0,//是否可用
                        A15:item.ruku==undefined?'':item.ruku,//入库
                        A16:'',
                        A17:'',
                        A18:'',
                        A19:'',
                        A20:'',
                        A21:'',
                        A22:''
                    }
                }else{
                    data = {
                        I:4,
                        A0:this.maxvals,//合同评审号
                        A1:item.行号==null?'':item.行号,//行号
                        A2:'',//订单日期
                        A3:'',//客户代码
                        A4:'',//客户订单号
                        A5:'',//销售订单号
                        A6:'',//捺印型号
                        A7:'',//零件编码
                        A8:'',//制造型号
                        A9:'',//数量
                        A10:'',//交期
                        A11:'',//生产批号
                        A12:item.gongdan,//对应工单号
                        A13:'',
                        A14:item.isky==true?1:0,//是否可用
                        A15:item.ruku,//入库
                        A16:'',
                        A17:'',
                        A18:'',
                        A19:'',
                        A20:'',
                        A21:'',
                        A22:''
                    }
                }
                this.$api.post('/api/HTPS',data,res=>{ })
                console.log(data)
                
            })
            let datas = {
                I:this.isselete,
                A0:this.maxvals,//合同评审号
                A1:this.radio,//合同类型
                A2:this.shichang1,//市场1
                A3:this.shichang2,//市场2
                A4:this.jihua1,//计划中心1
                A5:this.jihua2,//计划中心2
                A6:this.jihua3,//计划中心3
                A7:this.jishu,//技术部
                A8:this.jiage,//目标价格
                A9:this.genggai1,//合同更改内容1
                A10:this.genggai2,//合同更改内容2
                A11:this.genggai3,//合同更改内容3
                A12:this.jilv1,//评审记录1
                A13:this.jilv2,//评审记录2
                A14:this.jilv3,//评审记录3
                A15:this.sctisj,//市场部提交时间
                A16:this.wjlhqz,//物料计划签字
                A17:this.wljhsj,//物料计划完成时间
                A18:this.scjhqz,//生产计划签字   
                A19:this.scjhsj,//生产计划完成时间
                A20:this.scqz,//市场签字
                A21:this.radios,//是否有效
                A22:''
            }
            
            this.$api.post('/api/HTPS',datas,res=>{
                let dclsss = '## 合同评审\n你有新的合同需要评审\n合同评审号为:'+'<font color=\'info\'>'+this.maxvals+'</font>\n请点击：[评审](https://www.zanty.net:8140?userid='+this.util.parse_url('userid')+'&maxval='+this.maxvals+')'
                let data = {
                  access_token:this.token,//消息推送凭证
                  // touser:'WoBuShiDouHao',  
                  touser:this.reportTo, //推送对象
                  msgtype:"markdown",//推送模式
                  agentid:"1000069",//应用ID
                  content:dclsss//推送内容
                }
                this.$api.post('/api/Message1',data,res=>{})//推送接口
            })
            console.log(datas)
            this.disabled = true
            this.prints = false
        },
        zuofei(){
            for(var i=5;i<7;i++){
                console.log(i)
                let data = {
                    I:i,
                    A0:this.maxvals,//合同评审号
                    A1:'',//行号
                    A2:'',//订单日期
                    A3:'',//客户代码
                    A4:'',//客户订单号
                    A5:'',//销售订单号
                    A6:'',//捺印型号
                    A7:'',//零件编码
                    A8:'',//制造型号
                    A9:'',//数量
                    A10:'',//交期
                    A11:'',//生产批号
                    A12:'',//对应工单号
                    A13:'',
                    A14:'',//是否可用
                    A15:'',//入库
                    A16:'',
                    A17:'',
                    A18:'',
                    A19:'',
                    A20:'',
                    A21:'',
                    A22:'Y'
                }
                this.$api.post('/api/HTPS',data,res=>{

                })
                console.log(data)
            }
        },
        print(){
            this.util.onPrint(this,'合同评审记录','@page{size:auto;margin: 2.3cm 0cm 0cm 0.3cm;}')
        }
    }
}
</script>

<style>

  .grid-content {
    min-height: 40px;
    line-height: 40px;
    margin-bottom: 5px
  }
  .qianzi .grid-content{
      border: 1px solid;
      margin-bottom: 0px
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .el-input{
      max-width: 150px;
  }
</style>