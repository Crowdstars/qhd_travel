<template>
    <div :class="className" :id="id" :style="{height:height,width:width}"></div>
</template>

<script>
    import echarts from 'echarts'
    import {debounce} from '@/utils'
    import {hotelComNumChange} from '@/api/dataView'
    import {optionData} from './util'

    export default {
        name: "BarCharts",
        props: {
            className: {
                type: String,
                default: 'chart'
            },
            width: {
                type: String,
                default: '100%'
            },
            height: {
                type: String,
                default: '23vh'
            },
            id: {
                type: String,
                default: 'container'
            }
        },
        data() {
            return {
                chart: null,
                //option: optionData,
                option: {
                    color: ['#2FC968', '#8484FF', '#FFDB5C'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: { // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                        },
                    },
                    grid: {
                        left: 0,
                        top: '5%',
                        right: 0,
                        bottom: '15%',
                        containLabel: true,
                        show: true,

                    },
                    legend: {
                        show: true,
                        orient: 'horizontal',
                        bottom: "0",
                        textStyle: {
                            color: '#ccc',
                            fontSize: 12,

                        },
                        icon: 'rect',
                        itemWidth: 10,
                        itemHeight: 10,
                        formatter: function (name) {
                            return name
                        }
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: [],
                            axisTick: {
                                show: false,
                            },
                            axisLabel: {
                                color: '#ccc'
                            },
                            axisLine: {
                                onZero: false,
                                lineStyle: {
                                    color: "#0F4EC5",
                                    width: "2"
                                }
                            },
                            interval: 0,
                            z: 2
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '评论数量',
                            position: 'left',
                            axisTick: {
                                inside: true,
                                lineStyle: {
                                    color: "#50E89D", //左边线的颜色
                                    width: "2" //坐标线的宽度
                                }
                            },
                            axisLabel: {
                                formatter: '{value}',
                                color: '#ccc'
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "#50E89D", //左边线的颜色
                                    width: "2" //坐标线的宽度
                                }
                            },
                            splitLine: {
                                show: false
                            },
                            z: 3
                        },
                        {
                            type: 'value',
                            name: '同比',
                            /*min: 0,*/
                            max: 100,
                            opposite: true,
                            position: 'right',
                            axisLabel: {
                                show: true,
                                formatter: '{value}%',
                                color: '#ccc'
                            },
                            axisTick: {
                                inside: true,
                                lineStyle: {
                                    color: "#01F2F8", //左边线的颜色
                                    width: "2" //坐标线的宽度
                                }
                            },
                            axisLine: {
                                lineStyle: {
                                    color: "#01F2F8",
                                    width: "2"
                                }
                            },
                            splitLine: {
                                show: false
                            },
                            z: 3
                        },

                    ],
                    series: [
                        {
                            yAxisIndex: 0,
                            name: "评论数量",//当月的评论数量，柱状图显示
                            type: "bar",
                            data: []
                        },
                        {
                            yAxisIndex: 1,
                            name: "同比",//当月的评论数量，折线图显示显示
                            type: "line",
                            data: []
                        },
                    ]
                }
            }
        },
        mounted() {
            this.hotelComNumChangeFun();
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            window.removeEventListener('resize', this.__resizeHandler);
            this.chart.dispose();
            this.chart = null
        },
        methods: {
            //设置图表数据

            hotelComNumChangeFun: function () {
                hotelComNumChange().then(res => {
                    if(res.data.valuelist[0].name == '评论数量') {
                        this.option.xAxis[0].data
                    }
                    this.option.series[0].data
                    this.option.xAxis[0].data = res.data.timelist;
                    this.initChart();
                    this.resize();
                });
            },

            initChart() {
                this.chart = echarts.init(document.getElementById(this.id));
                this.chart.setOption(this.option, true)
            },
            resize() {
                this.__resizeHandler = debounce(() => {
                    if (this.chart) {
                        this.chart.resize()
                    }
                }, 100);
                window.addEventListener('resize', this.__resizeHandler)
            },
        }
    }
</script>

<style scoped>

</style>