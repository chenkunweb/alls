<template>

  <div id="myChart" :style="{width: '100%', height: height}" ></div>
  <!-- height为动态高度 -->
</template>

<script>
import * as echarts from 'echarts';
export default {
    data(){
        this.chartSettings = {//设置项
            
        }
        return{
            // 数据
            chartData: {
                columns: ["日期", "达成率"],
                rows: [
                
                ]
            },
            // 高度
            height:''
        }
    },
    created(){
        this.height = document.documentElement.clientHeight - 30+ 'px'
       
    },
    mounted(){
        this.drawLine();
    },
    methods:{
        drawLine(){
            // 基于准备好的dom，初始化echarts实例
            console.log(echarts)
            var myChart = echarts.init(document.getElementById('myChart'));
            let listX = []
            let listY = []
            this.$store.state.tongjiList.list.forEach((item)=>{
                
                listX.push(item[this.$route.query.label+'日达成率'].split('%')[0]*1)
                listY.push(item.交期)
            })
            console.log(this.$store.state.tongjiList.list)
            // 绘制图表
            myChart.setOption({
                xAxis: {
                    type: 'category',
                    // data: this.dataX,
                    data: listY,
                    boundaryGap: false, //控制日期是否在中间显示
                    axisLabel: {
                        show: true, //是否显示日期
                        interval: 3, //强制显示全部 // rotate: 40,//倾斜的角度
                        textStyle: {
                            color: '#000', //日期的颜色
                            fontSize: 12 //字体的大小
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#ccc' // x轴的颜色
                        }
                    }
                },
                title: {
                    text: this.$store.state.tongjiList.部门+this.$route.query.label+'日达成率曲线图',
                },
                tooltip: {
                    show:true,
                    trigger: 'axis',
                    formatter: '日期：{b0}<br />达成率:{c0}%'
                },
                label: {
                    show:true,
                    formatter: '{c0}%'
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}',
                        textStyle: {
                        color: '#000' //数字的颜色
                        },
                        inside: false //控制数据是否在内侧还是外侧显示
                    },
                    axisLine: {
                        lineStyle: {
                        color: '#ccc' // 折线的颜色
                        }
                    }
                },
                series: [
                    {
                        // data: this.dataY,
                        data: listX,
                        type: 'line',
                        symbol: 'circle', //是否显示实心的折线圆点
                        smooth: true, //让折线有弧度
                        symbolSize: 7, //折线圆点的大小
                        
                        itemStyle: {
                        normal: {
                            color: '#efc883', //折线点的颜色
                            lineStyle: {
                            color: '#efc883' //折线的颜色
                            },
                            // label: { show: true }, //是否在折线点上显示数字,
                        }
                        }
                    }
                ]
            });
        }
    },
}
</script>

<style>

</style>