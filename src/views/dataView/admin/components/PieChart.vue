<template>
    <div :class="className" :style="{height:height,width:width}"/>
</template>

<script>
    import echarts from 'echarts'
    // echarts theme
    require('echarts/theme/macarons');
    import {debounce} from '@/utils'

    export default {
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
                default: '300px'
            }
        },
        data() {
            return {
                chart: null
            }
        },
        mounted() {
            this.initChart();
            this.__resizeHandler = debounce(() => {
                if (this.chart) {
                    this.chart.resize()
                }
            }, 100);
            window.addEventListener('resize', this.__resizeHandler)
        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            window.removeEventListener('resize', this.__resizeHandler)
            this.chart.dispose();
            this.chart = null
        },
        methods: {
            initChart() {
                this.chart = echarts.init(this.$el, 'macarons')

                this.chart.setOption({
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b} : {c} ({d}%)'
                    },
                    legend: {
                        left: 'center',
                        bottom: '10',
                        data: ['工业', '技术', '外汇', '黄金', '预测']
                    },
                    calculable: true,
                    series: [
                        {
                            name: '每周写一篇文章',
                            type: 'pie',
                            roseType: 'radius',
                            radius: [15, 95],
                            center: ['50%', '38%'],
                            data: [
                                {value: 320, name: '工业'},
                                {value: 240, name: '技术'},
                                {value: 149, name: '外汇'},
                                {value: 100, name: '黄金'},
                                {value: 59, name: '预测'}
                            ],
                            animationEasing: 'cubicInOut',
                            animationDuration: 2600
                        }
                    ]
                })
            }
        }
    }
</script>
