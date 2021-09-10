<template>
    <div>
        <el-select v-model="value" @change="selectChange" v-if="isselete==0||isselete!=3" :disabled="ismouser" filterable default-first-option placeholder="销售单号">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
        <el-select v-model="values" @change="selectChanges" v-if="isselete==0||isselete!=2" :disabled="ismousers" filterable placeholder="合同评审号">
            <el-option v-for="item in optionss" :key="item.value" :label="item.label" :value="item.value"> </el-option>
        </el-select>
        <div style="font-size:30px;font-weight: bold;display:flex;justify-content:center">合同评审记录</div>
        
        <div  ref="print">
            <div style="border-bottom: 1px solid;display:flex;justify-content:space-between">
                <div></div>
                <div>{{iszero(maxval,8)}}</div>
            </div>
            <div>
                <el-row >
                    <el-col :span="4"><div class="grid-content ">合同内容及要求：</div></el-col>
                    <el-col :span="2"><div class="grid-content "></div></el-col>
                    <el-col :span="2"><div class="grid-content "></div></el-col>
                    <el-col :span="2"><div class="grid-content "></div></el-col>
                    <el-col :span="2" class="bors"><div class="grid-content "></div></el-col>
                    <el-col :span="4"><div class="grid-content ">合同内容及要求：</div></el-col>
                    <el-col :span="2"><div class="grid-content "></div></el-col>
                    <el-col :span="2"><div class="grid-content "></div></el-col>
                    <el-col :span="2"><div class="grid-content "></div></el-col>
                    <el-col :span="2"><div class="grid-content "></div></el-col>
                </el-row>
                <el-row v-for="(value, key, index) in tablist" :key="index">
                    <el-col :span="4"><div class="grid-content ">{{key}}</div></el-col>
                    <el-col :span="8"  v-for="(item,indexs) in list" :key="indexs" :class="indexs==0?'bors':''"><div class="grid-content ">{{list[indexs][key]}}</div></el-col>
                    <!-- <el-col :span="8"><div class="grid-content ">2</div></el-col> -->
                    
                </el-row>
            </div>
            <div v-if="list!=''">
                <div>
                    <el-row >
                        <el-col :span="4"><div class="grid-content ">合同类型：</div></el-col>
                        <el-col :span="8" class="bors"><div class="grid-content ">
                            <el-radio v-model="list[0].type" @change="radioChange" :disabled="isselete==3" label="0">常规合同</el-radio>
                            <el-radio v-model="list[0].type" @change="radioChange" :disabled="isselete==3" label="1">特殊合同</el-radio>
                            
                        </div></el-col>
                        <div v-if="list.length==2">
                            <el-col :span="4"><div class="grid-content ">合同类型：</div></el-col>
                            <el-col :span="8" ><div class="grid-content " >
                                <el-radio v-model="list[1].type" @change="radioChanges" :disabled="isselete==3" label="0">常规合同</el-radio>
                                <el-radio v-model="list[1].type"  @change="radioChanges" :disabled="isselete==3" label="1">特殊合同</el-radio>
                                
                            </div></el-col>
                        </div>
                         <div v-else>
                            <el-col :span="4"><div class="grid-content ">合同类型：</div></el-col>
                            <el-col :span="8" ><div class="grid-content " >
                                <el-radio  @change="radioChanges" :disabled="true" label="0">常规合同</el-radio>
                                <el-radio   @change="radioChanges" :disabled="true" label="1">特殊合同</el-radio>
                                
                            </div></el-col>
                        </div>
                        
                    </el-row>
                    <el-row >
                        <el-col :span="4"><div class="grid-content ">目标价格：</div></el-col>
                        <el-col :span="8" class="bors"><div class="grid-content "><el-input></el-input></div></el-col>
                        <div v-if="list.length==2">
                            <el-col :span="4"><div class="grid-content ">目标价格：</div></el-col>
                            <el-col :span="8"><div class="grid-content "><el-input></el-input></div></el-col>
                        </div>
                        <div v-else>
                            <el-col :span="4"><div class="grid-content ">目标价格：</div></el-col>
                            <el-col :span="8"><div class="grid-content "><el-input></el-input></div></el-col>
                        </div>
                    </el-row>
                    <el-row >
                        <el-col :span="4"><div class="grid-content ">是否有效：</div></el-col>
                        <el-col :span="8" class="bors"><div class="grid-content ">
                            <el-radio v-model="list[0].istrue" :disabled="isselete==3"  label="0">有且有效</el-radio>
                            <el-radio v-model="list[0].istrue" :disabled="isselete==3"  label="1">无或无效</el-radio>
                        </div></el-col>
                        <div v-if="list.length==2">
                            <el-col :span="4"><div class="grid-content ">是否有效：</div></el-col>
                            <el-col :span="8" ><div class="grid-content ">
                                <el-radio v-model="list[1].istrue" :disabled="isselete==3" label="0">有且有效</el-radio>
                                <el-radio v-model="list[1].istrue" :disabled="isselete==3" label="1">无或无效</el-radio>
                            </div></el-col>
                        </div>
                        <div v-else>
                            <el-col :span="4"><div class="grid-content ">是否有效：</div></el-col>
                            <el-col :span="8" ><div class="grid-content ">
                                <el-radio  :disabled="true" label="0">有且有效</el-radio>
                                <el-radio  :disabled="true" label="1">无或无效</el-radio>
                            </div></el-col>
                        </div>
                        
                    </el-row>
                    <el-row >
                        <el-col :span="4"><div class="grid-content ">技术备注：</div></el-col>
                        <el-col :span="8" class="bors" v-if="list[0].type=='1'"><div class="grid-content ">
                            <el-input v-model="list[0].jsbz"></el-input>
                        </div></el-col>
                        <el-col :span="8" v-else class="bors"><div class="grid-content "></div></el-col>
                        <div v-if="list.length==2">
                            <el-col :span="4"><div class="grid-content ">技术备注：</div></el-col>
                            <el-col :span="8" v-if="list[1].type=='1'"><div class="grid-content " >
                                <el-input v-model="list[1].jsbz"></el-input>
                            </div></el-col>
                            <el-col :span="8" v-else><div class="grid-content "></div></el-col>
                        </div>
                        <div v-else>
                            <el-col :span="4"><div class="grid-content ">技术备注：</div></el-col>
                            
                            <el-col :span="8" ><div class="grid-content "></div></el-col>
                        </div>
                    </el-row>
                    <el-row >
                        <el-col :span="4"><div class="grid-content ">指定技术签字人：</div></el-col>
                        <div v-if="list[0].type=='1'">
                            <el-col :span="3"><div class="grid-content ">
                                <el-select v-model="list[0].tuisong" @change="tuisongChange1"  :disabled="list[0].tuisong!=''" filterable placeholder="请选择">
                                    <el-option v-for="(item,index) in tsList" :key="index" :label="item.label" :value="item.value"> </el-option>
                                </el-select>
                            </div></el-col>
                            <el-col :span="2"><div class="grid-content ">技术签字</div></el-col>
                            <el-col :span="3" class="bors"><div class="grid-content ">
                                <el-button type="primary" v-if="list[0].jsqz==''" @click="sca1Click(0,'jsqz',17)">签名</el-button>
                                <span v-else>{{list[0].jsqz}}</span>
                            </div></el-col>
                        </div>
                        <el-col :span="8" v-else class="bors"><div class="grid-content "></div></el-col>
                        <div v-if="list.length==2">
                            <el-col :span="4"><div class="grid-content ">指定技术签字人：</div></el-col>
                            <div v-if="list[1].type=='1'">
                                <el-col :span="3"><div class="grid-content ">
                                    <el-select v-model="list[1].tuisong" @change="tuisongChange2"  :disabled="list[1].tuisong!=''" filterable placeholder="请选择">
                                        <el-option v-for="(item,index) in tsList" :key="index" :label="item.label" :value="item.value"> </el-option>
                                    </el-select>
                                </div></el-col>
                                <el-col :span="2"><div class="grid-content ">技术签字</div></el-col>
                                <el-col :span="3"><div class="grid-content ">
                                    <el-button type="primary" v-if="list[1].jsqz==''" @click="sca1Click(1,'jsqz',17)">签名</el-button>
                                    <span v-else>{{list[1].jsqz}}</span>
                                </div></el-col>
                            </div>
                            <el-col :span="8" v-else ><div class="grid-content "></div></el-col>
                        </div>
                        <div v-else>
                            <el-col :span="4"><div class="grid-content ">指定技术签字人：</div></el-col>
                           
                            <el-col :span="8"><div class="grid-content "></div></el-col>
                        </div>
                    </el-row>
                    <el-row >
                        <el-col :span="4"><div class="grid-content ">对应工单：</div></el-col>
                        <el-col :span="2"><div class="grid-content ">{{list[0].gongdan}}</div></el-col>
                        <el-col :span="2"><div class="grid-content ">在库数</div></el-col>
                        <el-col :span="1"><div class="grid-content ">{{list[0].ruku}}</div></el-col>
                        <el-col :span="3" class="bors"><div class="grid-content ">
                            <el-switch v-model="list[0].iskeyong" @change="isswitch(list[0].iskeyong,0)" active-text="可用" inactive-text="不可用"> </el-switch>
                        </div></el-col>
                        <div v-if="list.length==2">
                            <el-col :span="4"><div class="grid-content ">对应工单：</div></el-col>
                            <el-col :span="2"><div class="grid-content ">{{list[1].gongdan}}</div></el-col>
                            <el-col :span="2"><div class="grid-content ">在库数</div></el-col>
                            <el-col :span="1"><div class="grid-content ">{{list[1].ruku}}</div></el-col>
                            <el-col :span="3" ><div class="grid-content ">
                            <el-switch v-model="list[1].iskeyong" @change="isswitch(list[1].iskeyong,1)" active-text="可用" inactive-text="不可用"> </el-switch>
                            </div></el-col>
                        </div>
                        <div v-else>
                            <el-col :span="4"><div class="grid-content ">对应工单：</div></el-col>
                            <el-col :span="2"><div class="grid-content "></div></el-col>
                            <el-col :span="2"><div class="grid-content ">在库数</div></el-col>
                            <el-col :span="1"><div class="grid-content "></div></el-col>
                            <el-col :span="3" ><div class="grid-content ">
                            <el-switch  active-text="可用" inactive-text="不可用"> </el-switch>
                            </div></el-col>
                        </div>
                    </el-row>
                </div>
                <div class="border" >
                    <el-row >
                        <el-col :span="2"><div class="grid-content ">评审记录</div></el-col>
                        <el-col :span="25"><div class="grid-content ">一次</div></el-col>
                        <el-col :span="25"><div class="grid-content ">两次</div></el-col>
                        <el-col :span="25"><div class="grid-content ">三次</div></el-col>
                        <el-col :span="25" ><div class="grid-content ">四次</div></el-col>
                        <el-col :span="2"><div class="grid-content ">评审记录</div></el-col>
                        <el-col :span="25"><div class="grid-content ">一次</div></el-col>
                        <el-col :span="25"><div class="grid-content ">两次</div></el-col>
                        <el-col :span="25"><div class="grid-content ">三次</div></el-col>
                        <el-col :span="25"><div class="grid-content ">四次</div></el-col>
                    </el-row>
                    <el-row >
                        <el-col :span="2"><div class="grid-content ">客户需求日</div></el-col>
                        <el-col :span="25"><div class="grid-content size">{{list[0].xuqiu1}}</div></el-col>
                        <el-col :span="25"><div class="grid-content size">{{list[0].xuqiu2}}</div></el-col>
                        <el-col :span="25"><div class="grid-content size">{{list[0].xuqiu3}}</div></el-col>
                        <el-col :span="25" ><div class="grid-content size">{{list[0].xuqiu4}}</div></el-col>
                        <div v-if="list.length==2">
                            <el-col :span="2"><div class="grid-content ">客户需求日</div></el-col>
                            <el-col :span="25"><div class="grid-content size">{{list[1].xuqiu1}}</div></el-col>
                            <el-col :span="25"><div class="grid-content size">{{list[1].xuqiu2}}</div></el-col>
                            <el-col :span="25"><div class="grid-content size">{{list[1].xuqiu3}}</div></el-col>
                            <el-col :span="25"><div class="grid-content size">{{list[1].xuqiu4}}</div></el-col>
                        </div>
                        <div v-else>
                            <el-col :span="2"><div class="grid-content ">客户需求日</div></el-col>
                            <el-col :span="25"><div class="grid-content size"></div></el-col>
                            <el-col :span="25"><div class="grid-content size"></div></el-col>
                            <el-col :span="25"><div class="grid-content size"></div></el-col>
                            <el-col :span="25"><div class="grid-content size"></div></el-col>
                        </div>
                    </el-row>
                    <el-row >
                        <el-col :span="2"><div class="grid-content ">市场1</div></el-col>
                        <el-col :span="25"><div class="grid-content ">
                            <el-button type="primary" v-if="list[0].sca1==''" @click="sca1Click(0,'sca1',5)" v-model="list[0].sca1">签名</el-button>
                            <span v-else>{{list[0].sca1}}</span>
                        </div></el-col>
                        <el-col :span="25"><div class="grid-content ">
                            <el-button type="primary" v-if="list[0].sca2==''" @click="sca1Click(0,'sca2',6)" :disabled="list[0].scabtn2">签名</el-button>
                            <span v-else>{{list[0].sca2}}</span>
                        </div></el-col>
                        <el-col :span="25"><div class="grid-content ">
                            <el-button type="primary" v-if="list[0].sca3==''" @click="sca1Click(0,'sca3',7)" :disabled="list[0].scabtn3">签名</el-button>
                            <span v-else>{{list[0].sca3}}</span>
                        </div></el-col>
                        <el-col :span="25" ><div class="grid-content ">
                            <el-button type="primary" v-if="list[0].sca4==''" @click="sca1Click(0,'sca4',8)" :disabled="list[0].scabtn4">签名</el-button>
                            <span v-else>{{list[0].sca4}}</span>
                        </div></el-col>
                        <div v-if="list.length==2">
                            <el-col :span="2"><div class="grid-content ">市场1</div></el-col>
                            <el-col :span="25"><div class="grid-content ">
                                <el-button type="primary" v-if="list[1].sca1==''" @click="sca1Click(1,'sca1',5)" v-model="list[1].sca1">签名</el-button>
                                <span v-else>{{list[1].sca1}}</span>
                            </div></el-col>
                            <el-col :span="25"><div class="grid-content ">
                                <el-button type="primary" v-if="list[1].sca2==''" @click="sca1Click(1,'sca2',6)" :disabled="list[1].scabtn2">签名</el-button>
                                <span v-else>{{list[1].sca2}}</span>
                            </div></el-col>
                            <el-col :span="25"><div class="grid-content ">
                                <el-button type="primary" v-if="list[1].sca3==''" @click="sca1Click(1,'sca3',7)" :disabled="list[1].scabtn3">签名</el-button>
                                <span v-else>{{list[1].sca3}}</span>
                            </div></el-col>
                            <el-col :span="25" ><div class="grid-content ">
                                <el-button type="primary" v-if="list[1].sca4==''" @click="sca1Click(1,'sca4',8)" :disabled="list[1].scabtn4">签名</el-button>
                                <span v-else>{{list[1].sca4}}</span>
                            </div></el-col>
                        </div>
                        <div v-else>
                            <el-col :span="2"><div class="grid-content ">市场1</div></el-col>
                            <el-col :span="25"><div class="grid-content size"></div></el-col>
                            <el-col :span="25"><div class="grid-content size"></div></el-col>
                            <el-col :span="25"><div class="grid-content size"></div></el-col>
                            <el-col :span="25"><div class="grid-content size"></div></el-col>
                        </div>
                    </el-row>
                    <el-row >
                        <el-col :span="2"><div class="grid-content ">市场2</div></el-col>
                        <el-col :span="25"><div class="grid-content ">
                            <el-button type="primary" v-if="list[0].scb1==''" @click="sca1Click(0,'scb1',9)" v-model="list[0].scb1">签名</el-button>
                            <span v-else>{{list[0].scb1}}</span>
                        </div></el-col>
                        <el-col :span="25"><div class="grid-content ">
                            <el-button type="primary" v-if="list[0].scb2==''" @click="sca1Click(0,'scb2',10)" :disabled="list[0].scabtn2">签名</el-button>
                            <span v-else>{{list[0].scb2}}</span>
                        </div></el-col>
                        <el-col :span="25"><div class="grid-content ">
                            <el-button type="primary" v-if="list[0].scb3==''" @click="sca1Click(0,'scb3',11)" :disabled="list[0].scabtn3">签名</el-button>
                            <span v-else>{{list[0].scb3}}</span>
                        </div></el-col>
                        <el-col :span="25" ><div class="grid-content ">
                            <el-button type="primary" v-if="list[0].scb4==''" @click="sca1Click(0,'scb4',12)" :disabled="list[0].scabtn4">签名</el-button>
                            <span v-else>{{list[0].scb4}}</span>
                        </div></el-col>
                        <div v-if="list.length==2">
                            <el-col :span="2"><div class="grid-content ">市场2</div></el-col>
                            <el-col :span="25"><div class="grid-content ">
                                <el-button type="primary" v-if="list[1].scb1==''" @click="sca1Click(1,'scb1',9)" v-model="list[1].scb1">签名</el-button>
                                <span v-else>{{list[1].scb1}}</span>
                            </div></el-col>
                            <el-col :span="25"><div class="grid-content ">
                                <el-button type="primary" v-if="list[1].scb2==''" @click="sca1Click(1,'scb2',10)" :disabled="list[1].scabtn2">签名</el-button>
                                <span v-else>{{list[1].scb2}}</span>
                            </div></el-col>
                            <el-col :span="25"><div class="grid-content ">
                                <el-button type="primary" v-if="list[1].scb3==''" @click="sca1Click(1,'scb3',11)" :disabled="list[1].scabtn3">签名</el-button>
                                <span v-else>{{list[1].scb3}}</span>
                            </div></el-col>
                            <el-col :span="25" ><div class="grid-content ">
                                <el-button type="primary" v-if="list[1].scb4==''" @click="sca1Click(1,'scb4',12)" :disabled="list[1].scabtn4">签名</el-button>
                                <span v-else>{{list[1].scb4}}</span>
                            </div></el-col>
                        </div>
                        <div v-else>
                            <el-col :span="2"><div class="grid-content ">市场2</div></el-col>
                            <el-col :span="25"><div class="grid-content size"></div></el-col>
                            <el-col :span="25"><div class="grid-content size"></div></el-col>
                            <el-col :span="25"><div class="grid-content size"></div></el-col>
                            <el-col :span="25"><div class="grid-content size"></div></el-col>
                        </div>
                    </el-row>
                    <el-row >
                        <el-col :span="2"><div class="grid-content ">计划承诺日</div></el-col>
                        <el-col :span="25"><div class="grid-content size">{{list[0].jhjq1}}</div></el-col>
                        <el-col :span="25"><div class="grid-content size">{{list[0].jhjq2}}</div></el-col>
                        <el-col :span="25"><div class="grid-content size">{{list[0].jhjq3}}</div></el-col>
                        <el-col :span="25" ><div class="grid-content size">{{list[0].jhjq4}}</div></el-col>
                        <div v-if="list.length==2">
                            <el-col :span="2"><div class="grid-content size">计划承诺日</div></el-col>
                            <el-col :span="25"><div class="grid-content size">{{list[1].jhjq1}}</div></el-col>
                            <el-col :span="25"><div class="grid-content size">{{list[1].jhjq2}}</div></el-col>
                            <el-col :span="25"><div class="grid-content size">{{list[1].jhjq3}}</div></el-col>
                            <el-col :span="25"><div class="grid-content size">{{list[1].jhjq4}}</div></el-col>
                        </div>
                        <div v-else>
                            <el-col :span="2"><div class="grid-content ">计划承诺日</div></el-col>
                            <el-col :span="25"><div class="grid-content size"></div></el-col>
                            <el-col :span="25"><div class="grid-content size"></div></el-col>
                            <el-col :span="25"><div class="grid-content size"></div></el-col>
                            <el-col :span="25"><div class="grid-content size"></div></el-col>
                        </div>
                    </el-row>
                    <el-row >
                        <el-col :span="2"><div class="grid-content ">计划签字</div></el-col>
                        <el-col :span="25"><div class="grid-content ">
                            <el-button type="primary" v-if="list[0].jhqz1==''" @click="sca1Click(0,'jhqz1',13)" :disabled="list[0].jhqzbtn1">签名</el-button>
                            <span v-else>{{list[0].jhqz1}}</span>
                        </div></el-col>
                        <el-col :span="25"><div class="grid-content ">
                            <el-button type="primary" v-if="list[0].jhqz2==''" @click="sca1Click(0,'jhqz2',14)" :disabled="list[0].jhqzbtn2">签名</el-button>
                            <span v-else>{{list[0].jhqz2}}</span>
                        </div></el-col>
                        <el-col :span="25"><div class="grid-content ">
                            <el-button type="primary" v-if="list[0].jhqz3==''" @click="sca1Click(0,'jhqz3',15)" :disabled="list[0].jhqzbtn3">签名</el-button>
                            <span v-else>{{list[0].jhqz3}}</span>
                        </div></el-col>
                        <el-col :span="25" ><div class="grid-content ">
                            <el-button type="primary" v-if="list[0].jhqz4==''" @click="sca1Click(0,'jhqz4',16)" :disabled="list[0].jhqzbtn4">签名</el-button>
                            <span v-else>{{list[0].jhqz4}}</span>
                        </div></el-col>
                        <div v-if="list.length==2">
                            <el-col :span="2"><div class="grid-content ">计划签字</div></el-col>
                            <el-col :span="25"><div class="grid-content ">
                            <el-button type="primary" v-if="list[1].jhqz1==''" @click="sca1Click(1,'jhqz1',13)" :disabled="list[1].jhqzbtn1">签名</el-button>
                                <span v-else>{{list[1].jhqz1}}</span>
                            </div></el-col>
                            <el-col :span="25"><div class="grid-content ">
                                <el-button type="primary" v-if="list[1].jhqz2==''" @click="sca1Click(1,'jhqz2',14)" :disabled="list[1].jhqzbtn2">签名</el-button>
                                <span v-else>{{list[1].jhqz2}}</span>
                            </div></el-col>
                            <el-col :span="25"><div class="grid-content ">
                                <el-button type="primary" v-if="list[1].jhqz3==''" @click="sca1Click(1,'jhqz3',15)" :disabled="list[1].jhqzbtn3">签名</el-button>
                                <span v-else>{{list[1].jhqz3}}</span>
                            </div></el-col>
                            <el-col :span="25" ><div class="grid-content ">
                                <el-button type="primary" v-if="list[1].jhqz4==''" @click="sca1Click(1,'jhqz4',16)" :disabled="list[1].jhqzbtn4">签名</el-button>
                                <span v-else>{{list[1].jhqz4}}</span>
                            </div></el-col>
                        </div>
                        <div v-else>
                            <el-col :span="2"><div class="grid-content ">计划签字</div></el-col>
                            <el-col :span="25"><div class="grid-content size"></div></el-col>
                            <el-col :span="25"><div class="grid-content size"></div></el-col>
                            <el-col :span="25"><div class="grid-content size"></div></el-col>
                            <el-col :span="25"><div class="grid-content size"></div></el-col>
                        </div>
                    </el-row>
                    <el-row >
                        <el-col :span="2"><div class="grid-content ">计划签字日</div></el-col>
                        <el-col :span="25"><div class="grid-content size">{{list[0].jhqzri1}}</div></el-col>
                        <el-col :span="25"><div class="grid-content size">{{list[0].jhqzri2}}</div></el-col>
                        <el-col :span="25"><div class="grid-content size">{{list[0].jhqzri3}}</div></el-col>
                        <el-col :span="25" ><div class="grid-content size">{{list[0].jhqzri4}}</div></el-col>
                        <div v-if="list.length==2">
                            <el-col :span="2"><div class="grid-content ">计划签字日</div></el-col>
                            <el-col :span="25"><div class="grid-content size">{{list[1].jhqzri1}}</div></el-col>
                            <el-col :span="25"><div class="grid-content size">{{list[1].jhqzri2}}</div></el-col>
                            <el-col :span="25"><div class="grid-content size">{{list[1].jhqzri3}}</div></el-col>
                            <el-col :span="25"><div class="grid-content size">{{list[1].jhqzri4}}</div></el-col>
                        </div>
                         <div v-else>
                            <el-col :span="2"><div class="grid-content ">计划签字日</div></el-col>
                            <el-col :span="25"><div class="grid-content size"></div></el-col>
                            <el-col :span="25"><div class="grid-content size"></div></el-col>
                            <el-col :span="25"><div class="grid-content size"></div></el-col>
                            <el-col :span="25"><div class="grid-content size"></div></el-col>
                        </div>
                    </el-row>
                </div>
                <div>
                    <el-row >
                        <el-col :span="4"><div class="grid-content ">制单人</div></el-col>
                        <el-col :span="8" ><div class="grid-content ">{{zhidan}}</div></el-col>
                        <el-col :span="4"><div class="grid-content ">制单日期</div></el-col>
                        <el-col :span="8"><div class="grid-content ">{{time}}</div></el-col>
                    
                    </el-row>
                </div>
            </div>
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
    </div>
</template>

<script>
import * as getData from '../api/getDate';
export default {
    data(){
        return{
            prints:true,
            tablist:{//数据自定义循环体
                订单日期:'',
                客户代号:'',
                客户订单号:'',
                销售订单号:'',
                型号捺印:'',
                零件编码:'',
                制造型号:'',
                数量:'',
                交期:'',
                生产批号:'',
            },
            maxval:0,//最大合同评审号赋值
            value:'',//销售单号赋值
            ismouser:false,//销售单号下拉框禁用判断值
            options:[],//销售单号下拉框值
            values:'',//合同评审号赋值
            ismousers:false,//合同评审号下拉框禁用判断值
            optionss:[],//合同评审号下拉框值
            isselete:0,//头部下拉框切换判断值
            iszero:function PrefixZero(num, n) { return (Array(n).join(0) + num).slice(-n);},//补零函数
            dialogTableVisible:false,//控制模态框显示隐藏
            gridData: [],//模态框表格数据
            list:[],//页面数据
            istrue1:'0',//记录1是否有效
            istrue2:'0',//记录2是否有效
            iskeyong1:false,//记录1是否可用
            iskeyong2:false,//记录2是否可用
            iszuofei:false,//是否为作废记录
            I:0,//调用接口处理
            tsList:[],//指定技术人列表
            disabled:false,//控制保存按钮
            zuofeis:true,//控制作废按钮
            zhidan:'',
        }
    },
    created(){
        this.getData()
        this.options = this.$store.state.options
        this.optionss = this.$store.state.optionss
        let username,list = []
        
        this.$store.state.userlist.forEach((item)=>{
            list.push({
                label:item.name,
                value:item.name,
            })
            if(this.util.parse_url('userid')==item.userid){
                username = item.name
            }
        })
        this.username = username
        this.zhidan = username
        this.time = getData.dateUtils.today({ymrSign:true})
        this.tsList=list
        let aaa = {
            a1:'123',
            a2:'',
            a3:'null',
            a4:null,
        }
        // this.chuli(aaa)
        
    },
    methods:{
        //初始化权限数据获取
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
                this.reportTo = report.汇报给ID
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
        //销售单号选择事件
        async selectChange(e){
            this.isselete = 2
            this.dialogTableVisible = true
            this.disabled=false
            this.prints = true
            let maxValue = JSON.parse(await this.$api.api.get('/api/HTPS',{i:0,start:''})).Table[0].最大号*1
            this.maxval = maxValue+1
            let ljdmValue = JSON.parse(await this.$api.api.get('/api/HTPS',{start:e})).Table
            let ljdmValues = JSON.parse(await this.$api.api.get('/api/HTPS',{i:3,start:e})).Table
            ljdmValue.forEach((item,index)=>{
                ljdmValues.forEach((items)=>{
                    if(item.co_line*1==items.行号*1){
                        ljdmValue.splice(index,1)
                    }
                })
            })
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
                    ruku:item.qty_sum,
                    行号:item.co_line,
                    type:'0',
                    istrue:'0',
                    tuisong:'',
                    i:1,
                    xuqiu1:item.due_date.split('T')[0]
                }
            })

        },
        //模态框表格选择函数
        select(selection, row) {
            if (selection.length > 2) {
                let del_row = selection.shift();
                this.$refs.multipleTable.toggleRowSelection(del_row, false); 
            }
            this.list = selection
            console.log(this.list)
        },
        isswitch(e,index){//是否可用触发函数
            console.log(e)
            console.log(this.list[index])
            
            if(e==true){
                if(this.list[index].数量*1<=this.list[index].ruku*1){
                    let bbb = {
                        jhjq1:this.list[index].jhjq1,
                        jhjq2:this.list[index].jhjq2,
                        jhjq3:this.list[index].jhjq3,
                        jhjq4:this.list[index].jhjq4,
                    }
                    
                    let isnulljq = this.chulis(bbb)
                    console.log(isnulljq)
                    let ins = isnulljq.split('jhjq')[1]
                    this.list[index][isnulljq]=this.list[index].交期
                    this.list[index]['jhqzbtn'+ins]=false
                    this.isnulljq = isnulljq
                }
                
            }else{
                if(this.list[index].数量*1<=this.list[index].ruku*1){
                    let ins = this.isnulljq.split('jhjq')[1]
                    this.list[index]['jhqzbtn'+ins]=true
                    this.list[index][this.isnulljq]=''
                }
            }
        },
        // 签名处理函数
        chuli(list){
            let a
            for(var key in list){  
                    if(list[key]==null){
                        a=key
                        break; 
                    }
                }
            
            
            return a
        },
        // 签名处理函数
        chulis(list){
            let a
            for(var key in list){  
                    if(list[key]==''){
                        a=key
                        break; 
                    }
                }
            
            
            return a
        },
        //模态框表格全选函数
        selectAll(selection) {
            if (selection.length > 2) {
                selection.length = 2;
            }
            this.list = selection
        },
        //合同评审号选择事件
        async selectChanges(e){
            this.disabled=true
            this.isselete = 3
            this.prints = false
            let list = JSON.parse(await this.$api.api.get('/api/HTPS',{start:e,i:1})).Table
            // let lists = JSON.parse(await this.$api.api.get('/api/HTPS',{start:e,i:2})).Table[0]
            console.log(list)
            this.maxval = list[0].合同评审号
            this.zuofeis = this.mouser.删除*1==1?false:true
            this.iszuofei = list[0].作废*1==0?false:true
            this.list = list.map((item)=>{
                let jhqz1= item.计划签字1==null?'':item.计划签字1.replace(/\s+/g, "")
                let jhqz2= item.计划签字2==null?'':item.计划签字2.replace(/\s+/g, "")
                let jhqz3= item.计划签字3==null?'':item.计划签字3.replace(/\s+/g, "")
                let jhqz4= item.计划签字4==null?'':item.计划签字4.replace(/\s+/g, "")
                this.zhidan=item.制单人==null?'':item.制单人.replace(/\s+/g, ""),
                this.time=item.制单目期==null?'':item.制单目期.replace(/\s+/g, ""),
                console.log(item)
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
                    库存数量:item.在库数量,
                    行号:item.行号*1,
                    type:item.合同类型.replace(/\s+/g, ""),
                    istrue:item.有效性.replace(/\s+/g, ""),
                    tuisong:item.指定技术签字人.replace(/\s+/g, ""),
                    xuqiu1:item.客户需求日期1.replace(/\s+/g, ""),
                    xuqiu2:item.客户需求日期2==null?'':item.客户需求日期2.replace(/\s+/g, ""),
                    xuqiu3:item.客户需求日期3==null?'':item.客户需求日期3.replace(/\s+/g, ""),
                    xuqiu4:item.客户需求日期4==null?'':item.客户需求日期4.replace(/\s+/g, ""),
                    sca1:item.市场A1==null?'':item.市场A1.replace(/\s+/g, ""),
                    
                    sca2:item.市场A2==null?'':item.市场A2.replace(/\s+/g, ""),
                    sca3:item.市场A3==null?'':item.市场A3.replace(/\s+/g, ""),
                    sca4:item.市场A4==null?'':item.市场A4.replace(/\s+/g, ""),
                    scabtn2:item.客户需求日期2==null?true:false,
                    scabtn3:item.客户需求日期3==null?true:false,
                    scabtn4:item.客户需求日期4==null?true:false,
                    scb1:item.市场B1==null?'':item.市场B1.replace(/\s+/g, ""),
                    scb2:item.市场B2==null?'':item.市场B2.replace(/\s+/g, ""),
                    scb3:item.市场B3==null?'':item.市场B3.replace(/\s+/g, ""),
                    scb4:item.市场B4==null?'':item.市场B4.replace(/\s+/g, ""),
                    jhjq1:item.计划交期1==null?'':item.计划交期1.replace(/\s+/g, ""),
                    jhjq2:item.计划交期2==null?'':item.计划交期2.replace(/\s+/g, ""),
                    jhjq3:item.计划交期3==null?'':item.计划交期3.replace(/\s+/g, ""),
                    jhjq4:item.计划交期4==null?'':item.计划交期4.replace(/\s+/g, ""),
                    jhqz1:jhqz1,
                    jhqz2:jhqz2,
                    jhqz3:jhqz3,
                    jhqz4:jhqz4,
                    jhqzbtn1:item.计划交期1==null?true:false,
                    jhqzbtn2:item.计划交期2==null?true:false,
                    jhqzbtn3:item.计划交期3==null?true:false,
                    jhqzbtn4:item.计划交期4==null?true:false,
                    jhqzri1:item.计划签字日期1==null?'':item.计划签字日期1.replace(/\s+/g, ""),
                    jhqzri2:item.计划签字日期2==null?'':item.计划签字日期2.replace(/\s+/g, ""),
                    jhqzri3:item.计划签字日期3==null?'':item.计划签字日期3.replace(/\s+/g, ""),
                    jhqzri4:item.计划签字日期4==null?'':item.计划签字日期4.replace(/\s+/g, ""),
                    iskeyong:item.是否可用*1==1?true:false,
                    gongdan:item.对应工单==null?'':item.对应工单.replace(/\s+/g, ""),
                    ruku:item.在库数量==null?'':item.在库数量.replace(/\s+/g, ""),
                    jsqz:item.技术签字==null?'':item.技术签字.replace(/\s+/g, ""),
                    jsbz:item.技术备注==null?'':item.技术备注.replace(/\s+/g, ""),
                    // rukus:ruku
                }
            })
            console.log(this.list)
            list.forEach(async(item,index)=>{
                console.log()
                let aaa = {
                    xuqiu1:item.客户需求日期1,
                    xuqiu2:item.客户需求日期2,
                    xuqiu3:item.客户需求日期3,
                    xuqiu4:item.客户需求日期4,
                }
                let isnull = this.chuli(aaa)
                if(isnull!=undefined){
                    let aindex = (isnull.split('xuqiu')[1]*1)-1
                    let nonull = ''
                    if(aindex!=0){
                        nonull = item['客户需求日期'+aindex].replace(/\s+/g, "")
                    }
                    let lists = JSON.parse(await this.$api.api.get('/api/HTPS',{start:item.销售订单号.replace(/\s+/g, ""),i:item.行号*1+100})).Table[0].到期日期.split('T')[0]
                    
                    if(nonull!=lists){
                        this.list[index][isnull]=lists
                        let data = {
                            I:isnull.split('xuqiu')[1]*1,
                            A0:this.maxval,//合同评审号
                            A1:item.行号==null?'':item.行号*1,//行号
                            A2:lists,//订单日期
                            A3:'',//客户代码
                            A4:'',//客户订单号
                            A5:'',//销售订单号
                            A6:'',//捺印型号
                            A7:'',//零件编码
                            A8:'',//制造型号
                            A9:'',//数量
                            A10:'',//交期
                            A11:'',//生产批号
                            A12:'',//合同类型
                            A13:'',//有效性
                            A14:'',//指定技术签字人
                            A15:'',//客户需求日期
                            A16:'',//制单人
                            A17:'',//制单日期
                            A18:'',//在库数
                        }
                        this.$api.post('/api/HTPS',data,res=>{ })
                    }
                }
                
                let listsa = JSON.parse(await this.$api.api.get('/api/HTPS',{start:item.生产批号.replace(/\s+/g, ""),i:5})).Table[0]
                console.log(listsa)
                if(listsa!=undefined){
                    console.log(listsa)
                    let gongdan = listsa.工单号
                    listsa = listsa.到期日期
                    let bbb = {
                        jhjq1:item.计划交期1,
                        jhjq2:item.计划交期2,
                        jhjq3:item.计划交期3,
                        jhjq4:item.计划交期4,
                    }
                    let isnulljq = this.chuli(bbb)
                    console.log(isnulljq)
                   
                    if(isnulljq!=undefined){
                        let bindex = (isnulljq.split('jhjq')[1]*1)-1
                        console.log(bindex)
                        let nonulljq = this.list[index][this.chuli(bbb,2)]
                        if(bindex!=0){
                            nonulljq= item['计划交期'+bindex].replace(/\s+/g, "")
                        }
                        if(nonulljq!=listsa){
                            let y = 
                            this.list[index][isnulljq]=listsa
                            this.list[index]['jhqzbtn'+(isnulljq.split('jhjq')[1])]=false
                            this.list[index].gongdan=gongdan
                            console.log(item)
                            console.log(this.list[index])
                            let jhdata = {
                                I:isnulljq.split('jhjq')[1]*1+12,
                                A0:this.maxval,//合同评审号
                                A1:item.行号==null?'':item.行号*1,//行号
                                A2:gongdan==null?'':gongdan,//订单日期
                                A3:this.list[index].iskeyong==false?0:1,//客户代码
                                A4:listsa,//客户订单号
                                A5:this.list[index]['jhqz'+isnulljq.split('jhjq')[1]],//销售订单号
                                A6:this.list[index]['jhqzri'+isnulljq.split('jhjq')[1]],//捺印型号
                                A7:'',//零件编码
                                A8:'',//制造型号
                                A9:'',//数量
                                A10:'',//交期
                                A11:'',//生产批号
                                A12:'',//合同类型
                                A13:'',//有效性
                                A14:'',//指定技术签字人
                                A15:'',//客户需求日期
                                A16:'',//制单人
                                A17:'',//制单日期
                                A18:'',//在库数
                            }
                            console.log(jhdata)
                            this.$api.post('/api/HTPS',jhdata,res=>{ })
                        }
                    }
                   
                    
                }
                
                
                


            })
        },
        //记录1合同类型选择函数
        radioChange(e){
            if(this.isselete==2){
                if(e=='1'){
                    this.disabled=true
                }else{
                    this.disabled=false
                    this.list[0].tuisong = ''
                }
            }
        },
        //记录2合同类型选择函数
        radioChanges(e){
            if(this.isselete==2){
                if(e=='1'){
                    this.disabled=true
                }else{
                    this.disabled=false
                    this.list[1].tuisong = ''
                }
            }
        },
        //记录1选择指定人函数
        tuisongChange1(e){
            console.log(e)
            this.disabled=false
        },
        //记录2选择指定人函数
        tuisongChange2(e){this.disabled=false},
        //保存
        sub(){
            console.log(this.list)
            let istrue = 0
            this.list.forEach((item)=>{
                
                let data
                if(item.i==1){
                    data = {
                        I:item.i,
                        A0:this.maxval,//合同评审号
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
                        A12:item.type,//合同类型
                        A13:item.istrue,//有效性
                        A14:item.tuisong==undefined?'':item.tuisong,//指定技术签字人
                        A15:item.交期==null?'':item.交期,//客户需求日期
                        A16:this.username,//制单人
                        A17:this.time,//制单日期
                        A18:item.ruku==null?'':item.ruku//在库数量
                    }
                }else{
                    console.log(item)
                    if(item.i!=undefined){
                        data = {
                            I:item.i,
                            A0:this.maxval,//合同评审号
                            A1:item.行号==null?'':item.行号*1,//行号
                            A2:this.username,//订单日期
                            A3:'',//客户代码
                            A4:'',//客户订单号
                            A5:'',//销售订单号
                            A6:'',//捺印型号
                            A7:'',//零件编码
                            A8:'',//制造型号
                            A9:'',//数量
                            A10:'',//交期
                            A11:'',//生产批号
                            A12:'',//合同类型
                            A13:'',//有效性
                            A14:'',//指定技术签字人
                            A15:'',//客户需求日期
                            A16:'',//制单人
                            A17:'',//制单日期
                            A18:'',//在库数
                        }
                        if(item.i==13||item.i==14||item.i==15||item.i==16){
                            console.log(item['jhjq'+(item.i-12)])
                            data = {
                                I:item.i,
                                A0:this.maxval,//合同评审号
                                A1:item.行号==null?'':item.行号*1,//行号
                                A2:item.gongdan,//订单日期
                                A3:item.iskeyong==false?0:1,//客户代码
                                A4:item['jhjq'+(item.i-12)],//客户订单号
                                A5:this.username,//销售订单号
                                A6:getData.dateUtils.today({ymrSign:true}),//捺印型号
                                A7:'',//零件编码
                                A8:'',//制造型号
                                A9:'',//数量
                                A10:'',//交期
                                A11:'',//生产批号
                                A12:'',//合同类型
                                A13:'',//有效性
                                A14:'',//指定技术签字人
                                A15:'',//客户需求日期
                                A16:'',//制单人
                                A17:'',//制单日期
                                A18:'',//在库数
                            }
                        }
                        if(item.i==17){
                            data = {
                                I:item.i,
                                A0:this.maxval,//合同评审号
                                A1:item.行号==null?'':item.行号*1,//行号
                                A2:item.jsbz,//订单日期
                                A3:item.jsqz,//客户代码
                                A4:'',//客户订单号
                                A5:'',//销售订单号
                                A6:'',//捺印型号
                                A7:'',//零件编码
                                A8:'',//制造型号
                                A9:'',//数量
                                A10:'',//交期
                                A11:'',//生产批号
                                A12:'',//合同类型
                                A13:'',//有效性
                                A14:'',//指定技术签字人
                                A15:'',//客户需求日期
                                A16:'',//制单人
                                A17:'',//制单日期
                                A18:'',//在库数
                            }
                        }
                    }
                }
                
                if(data!=undefined){
                    // this.disabled=true
                    // this.prints = false
                    this.$api.post('/api/HTPS',data,res=>{
                         if(data.A12*1==1){
                            let name = this.$store.state.userlist.find(item=>item.name==data.A14).userid
                            let dclsss = '## 合同评审\n你有新的合同需要评审\n合同评审号为:'+'<font color=\'info\'>'+this.maxval+'</font>\n请点击：[评审](https://www.zanty.net:8140?userid='+name+'&maxval='+this.maxval+')'
                            let datas = {
                            access_token:this.token,//消息推送凭证
                            // touser:'WoBuShiDouHao',  
                            touser:name, //推送对象
                            msgtype:"markdown",//推送模式
                            agentid:"1000069",//应用ID
                            content:dclsss//推送内容
                            }
                            this.$api.post('/api/Message1',datas,res=>{})//推送接口
                        }
                        let names = this.reportTo
                        names.split(',').forEach((item)=>{
                            let dclsss = '## 合同评审\n你有新的合同需要评审\n合同评审号为:'+'<font color=\'info\'>'+this.maxval+'</font>\n请点击：[评审](https://www.zanty.net:8140?userid='+item+'&maxval='+this.maxval+')'
                            let datasa = {
                                access_token:this.token,//消息推送凭证
                                // touser:'WoBuShiDouHao',  
                                touser:item, //推送对象
                                 msgtype:"markdown",//推送模式
                                agentid:"1000069",//应用ID
                                content:dclsss//推送内容
                            }
                            this.$api.post('/api/Message1',datasa,res=>{})//推送接口
                        })
                        this.disabled=true
                        this.prints = false
                    })
                }
                // this.$api.post('/api/HTPS',data,res=>{ })
            })
        },
        // 签名赋值
        async sca1Click(index,e,id){
            this.disabled=false
            
            this.list[index][e] = this.username
            this.list[index].i = id
            if(id==13||id==14||id==15||id==16){
                console.log('jhqzri'+e.split('jhqz')[1])
                this.list[index]['jhqzri'+e.split('jhqz')[1]] = getData.dateUtils.today({ymrSign:true})

            }
        },
        // 打印
        print(){
            this.util.onPrint(this,'合同评审记录','@page{size:auto;margin: 2.3cm 0.3cm 0cm 0.3cm;}')
        },
        // 作废
        zuofei(){
            let data = {
                I:18,
                A0:this.maxval,//合同评审号
                A1:1,//行号
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
                A12:'',//合同类型
                A13:'',//有效性
                A14:'',//指定技术签字人
                A15:'',//客户需求日期
                A16:'',//制单人
                A17:'',//制单日期
                A18:'',//在库数
                        
            }
            this.$api.post('/api/HTPS',data,res=>{ })
        }
    }
}
</script>

<style>
.grid-content {
    min-height: 30px !important;
    line-height: 30px !important;
    margin-bottom: 15px !important
  }
  .border .grid-content{
      border: 1px solid !important;
      margin-bottom: 0px !important
  }
  .el-switch__label--left{
      margin-right: 0px !important;
  }
  .el-switch__label--right{
      margin-left: 0px !important;
  }
  .el-col-8:last-child{
      border-right:none !important
  }
  .el-button{
      
      padding: 7px 20px !important
  }
  .size{
      font-size: 14px !important
  }
  .bors{
      border-right: 1px solid #ccc !important
  }
  .el-col-2-5{
      width: 10.42% !important
  }
  .el-col-25{
      width: 10.40% !important
  }
</style>