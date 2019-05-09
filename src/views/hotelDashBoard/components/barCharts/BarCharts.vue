<template>
    <div :class="className" :id="id" :style="{height:height,width:width}"/>
</template>

<script>
    import echarts from 'echarts'
    import {debounce} from '@/utils'
    import {getHotelKeyData} from '@/api/hotel'
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
                option: optionData,
            }
        },
        watch: {
            height: {
                handler: function (newVal) {
                    let self = this;
                    setTimeout(function () {
                        if (self.chart) {
                            self.chart.resize()
                        }
                    }, 400);
                }
            }
        },
        mounted() {
            this.loadChart();
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
            loadChart() {
                getHotelKeyData().then(res => {
                    let data = res.data.commentTrendModel.valueList.map((item, index) => {
                        if (item.name === "同比") {
                            let innerdata = item.data.map((d, i) => {
                                return d.slice(0, -1)
                            });
                            return {
                                data: innerdata,
                                name: item.name,
                                type: item.type,
                            };
                        }
                        return item;
                    });
                    data.map((item, index) => {
                        this.option.series.map((d, i) => {
                            if (d.name === item.name) {
                                d.data = item.data
                            }

                        })
                    });
                    this.option.xAxis[0].data = res.data.commentTrendModel.timeList;
                    this.initChart();
                    this.resize();
                })
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