<template>
    <div>
        <div :class="className" :id="id" :style="{height:height,width:width}"></div>
        <slot></slot>
    </div>
</template>

<script>

    import echarts from 'echarts'
    import {debounce} from '@/utils'
    import { optionData} from './util'

    export default {
        props: {
            id: {
                type: String,
                default: 'container'
            },
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
            },
            hotelNumData: {
                type: Array,
                default: () => []
            },
            restNumData: {
                type: Array,
                default: () => []
            }
        },
        data() {
            return {
                option: optionData,
                chart: null,
                xh_Height:0
            }
        },
        watch: {
            hotelNumData: {
                handler: function (newVal) {
                    this.option.series[0].data = newVal ;
                    this.initChart();
                },
                deep: true,
            },
            restNumData: {
                handler: function (newVal) {
                    // console.log(112233445);
                    // console.log(newVal);
                    this.option.series[5].data = newVal ;
                    this.initChart();
                },
                deep: true,
            },
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

            this.initChart();
            this.resize();

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
