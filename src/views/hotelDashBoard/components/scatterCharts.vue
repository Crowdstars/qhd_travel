<template>
    <div :class="className" :style="{height:height,width:width}"></div>
</template>
<script>
    import echarts from 'echarts'
    import 'echarts/extension/bmap/bmap.js'
    // echarts theme
    require('echarts/theme/macarons');
    import {debounce} from '@/utils'
    import {baiDuMapStyleJson3} from './baiduMapUtil'
    import {getQDHHeatMap} from "@/api/dataView"

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
                default: '240px'
            },
            zoom: {
                type: Number,
                default: 3,
            }
        },
        data() {
            return {
                chart: null,
                mapData: [],
                geoCoordMapData: [],
                visualMapMax: null,
                labelVisible: null,
                mapZoom:null,
            }
        },
        watch: {
            //监听屏幕高度变化
            height(val) {
                if (this.chart) {
                    this.chart.resize();
                }
            },
            //地图缩放等级改变时设置label是否显示
            mapZoom(val){
                this.setLabel();
            }
        },
        methods: {
            initChart() {
                let mapData = this.mapData;
                this.chart = echarts.init(this.$el, 'macarons');
                this.chart.setOption({
                    title: {
                        text: '千岛湖景点热力图',
                        left: 'left',
                        textStyle: {
                            color: '#01FFFA'
                        }
                    },
                    tooltip: {
                        trigger: 'item',
                        position: 'right',
                        formatter: function (params) {
                            return params.name + ' : ' + params.value[2];
                        }
                    },
                    visualMap: {
                        min: 0,
                        max: this.visualMapMax,
                        type: 'piecewise',
                        inRange: {
                            color: ['#50a3ba', '#eac736', 'red']
                        },
                        textStyle: {
                            color: '#fff'
                        },
                        show: false,
                    },
                    bmap: {
                        center: [118.969682, 29.616078],
                        roam: true,
                        mapStyle: {
                            style: 'midnight'
                        }
                    },
                    series: [
                        {
                            name: '千岛湖',
                            type: 'scatter',
                            coordinateSystem: 'bmap',
                            data: this.convertData(mapData),
                            symbolSize: 12,//固定大小
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: false
                                },
                                emphasis: {
                                    show: true
                                }
                            },
                            itemStyle: {
                                normal: {
                                    color: '#ddb926'
                                }
                            }
                        },
                        // top5特效
                        {
                            name: 'Top 5',
                            type: 'effectScatter',
                            coordinateSystem: 'bmap',
                            data: this.convertData(mapData.sort(function (a, b) {
                                return b.value - a.value;
                            }).slice(0, 5)),
                            symbolSize: 12,
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            // hoverAnimation: true,
                            itemStyle: {
                                normal: {
                                    color: '#f4e925',
                                    shadowBlur: 10,
                                    shadowColor: '#333'
                                }
                            },
                            label: {
                                normal: {
                                    formatter: '{b}',
                                    position: 'right',
                                    show: true
                                }
                            },
                            zlevel: 1
                        }
                    ]
                })
            },
            convertData(data) {
                let res = [], geoCoordMapData = this.geoCoordMapData;
                for (let i = 0; i < data.length; i++) {
                    let geoCoord = geoCoordMapData[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            },
            // 根据当前zoom大小设置是否显示非TOP景点label
            setLabel(){
                let bmap = null, geoCoordMapData = this.geoCoordMapData;
                this.chart._model.eachComponent('bmap', function (bmapModel) {
                    if (bmap == null) {
                        bmap = bmapModel.__bmap;
                    }
                });
                this.labelVisible = ((bmap.getZoom()>10)?true:false);
                let option = this.chart.getOption();

                option.series[0].label={
                    normal: {
                        show: this.labelVisible
                    }
                };
                this.chart.setOption(option);
            },
            setMap() {
                // 获取bmap对象
                let bmap = null, geoCoordMapData = this.geoCoordMapData;
                this.chart._model.eachComponent('bmap', function (bmapModel) {
                    if (bmap == null) {
                        bmap = bmapModel.__bmap;
                    }
                });
                // 设置样式（3.0API）
                if( baiDuMapStyleJson3 && baiDuMapStyleJson3.length > 0 ) {
                    bmap.setMapStyleV2({styleJson: baiDuMapStyleJson3});
                }

                // 景点坐标数组
                let bPoints = [];
                Object.keys(geoCoordMapData).forEach(function (key) {
                    let point = new BMap.Point(geoCoordMapData[key][0], geoCoordMapData[key][1]);
                    bPoints.push(point);
                });
                // 根据景点坐标数组自动缩放
                // 会使设置的固定中心点失效
                bmap.setViewport(bPoints);
                // 缩放等级
                bmap.setMinZoom(4);
                bmap.setMaxZoom(18);

                this.setLabel();
                // 地图缩放结束获取当前缩放等级
                bmap.addEventListener("zoomend", ()=>{
                    this.mapZoom=bmap.getZoom()
                });
            },
            initQDHHeatMap() {
                this.initChart();
                this.setMap();
                this.__resizeHandler = debounce(() => {
                    if (this.chart) {
                        this.chart.resize();
                        this.getMap();
                    }
                }, 100);
                window.addEventListener('resize', this.__resizeHandler);
            },
            getMap(){
                getQDHHeatMap().then(res => {
                    const data = res.data;
                    let mapData = [];
                    let geoCoordMapData = [];
                    let arr = [];
                    if (data.list && data.list.length > 0) {
                        data.list.forEach(function (item) {
                            mapData.push({name: item._id, value: item.commentNumber});
                            geoCoordMapData[item._id] = [item.lng, item.lat];
                            arr.push(item.commentNumber);
                        });
                    }
                    this.visualMapMax = Math.max.apply(null, arr);
                    this.mapData = mapData;
                    this.geoCoordMapData = geoCoordMapData;
                    this.initQDHHeatMap();
                }).catch(err => {
                    console.log(err);
                });
            }
        },
        created() {
            this.getMap();
        },
        mounted() {

        },
        beforeDestroy() {
            if (!this.chart) {
                return
            }
            window.removeEventListener('resize', this.__resizeHandler);
            this.chart.dispose();
            this.chart = null
        }
    }
</script>

<style>
    /*取消百度地图logo*/
    .anchorBL {
        display: none;
    }
</style>
