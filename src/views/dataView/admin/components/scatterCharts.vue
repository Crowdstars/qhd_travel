<template>
    <div :class="className" :style="{height:height,width:width}"/>
</template>
<script>
    let data1 = [
        {name:'千岛湖',value:170},
        {name:'千岛湖1',value:300},
        {name:'千岛湖2',value:30},
        {name:'千岛湖3',value:100},
        {name:'千岛湖4',value:250},
    ];
    let geoCoordMap = {
        // 经纬度
        '千岛湖':[118.969682,29.616078],
        '千岛湖1':[118.969882,29.618078],
        '千岛湖2':[118.964682,29.611078],
        '千岛湖3':[118.951682,29.610078],
        '千岛湖4':[118.959682,29.609078],
    };
    var styleJson3 = [{
            "featureType": "land",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "color": "#091220ff"
            }
        }, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "color": "#113549ff"
            }
        }, {
            "featureType": "green",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "color": "#0e1b30ff"
            }
        }, {
            "featureType": "building",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "building",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#ffffffb3"
            }
        }, {
            "featureType": "building",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#dadadab3"
            }
        }, {
            "featureType": "subwaystation",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "color": "#b15454B2"
            }
        }, {
            "featureType": "education",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "color": "#e4f1f1ff"
            }
        }, {
            "featureType": "medical",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "color": "#f0dedeff"
            }
        }, {
            "featureType": "scenicspots",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "color": "#e2efe5ff"
            }
        }, {
            "featureType": "highway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "weight": 4
            }
        }, {
            "featureType": "highway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#f7c54dff"
            }
        }, {
            "featureType": "highway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#fed669ff"
            }
        }, {
            "featureType": "highway",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "highway",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#8f5a33ff"
            }
        }, {
            "featureType": "highway",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffffff"
            }
        }, {
            "featureType": "highway",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "arterial",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "weight": 2
            }
        }, {
            "featureType": "arterial",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#d8d8d8ff"
            }
        }, {
            "featureType": "arterial",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffeebbff"
            }
        }, {
            "featureType": "arterial",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "arterial",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#525355ff"
            }
        }, {
            "featureType": "arterial",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffffff"
            }
        }, {
            "featureType": "local",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "weight": 1
            }
        }, {
            "featureType": "local",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#d8d8d8ff"
            }
        }, {
            "featureType": "local",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffffff"
            }
        }, {
            "featureType": "local",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "local",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#979c9aff"
            }
        }, {
            "featureType": "local",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffffff"
            }
        }, {
            "featureType": "railway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "weight": 1
            }
        }, {
            "featureType": "railway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#123c52ff"
            }
        }, {
            "featureType": "railway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#12223dff"
            }
        }, {
            "featureType": "subway",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on",
                "weight": 1
            }
        }, {
            "featureType": "subway",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#d8d8d8ff"
            }
        }, {
            "featureType": "subway",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "subway",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "subway",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#979c9aff"
            }
        }, {
            "featureType": "subway",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffffff"
            }
        }, {
            "featureType": "continent",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "continent",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "continent",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#333333ff"
            }
        }, {
            "featureType": "continent",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffffff"
            }
        }, {
            "featureType": "city",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "city",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "city",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#454d50ff"
            }
        }, {
            "featureType": "city",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffffff"
            }
        }, {
            "featureType": "town",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "town",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "town",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#454d50ff"
            }
        }, {
            "featureType": "town",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffffff"
            }
        }, {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": {
                "color": "#12223dff"
            }
        }, {
            "featureType": "poilabel",
            "elementType": "labels",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "districtlabel",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "road",
            "elementType": "geometry",
            "stylers": {
                "visibility": "on"
            }
        }, {
            "featureType": "road",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "road",
            "elementType": "geometry.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "district",
            "elementType": "labels",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "poilabel",
            "elementType": "labels.icon",
            "stylers": {
                "visibility": "off"
            }
        }, {
            "featureType": "poilabel",
            "elementType": "labels.text.fill",
            "stylers": {
                "color": "#2dc4bbff"
            }
        }, {
            "featureType": "poilabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffff00"
            }
        }, {
            "featureType": "manmade",
            "elementType": "geometry",
            "stylers": {
                "color": "#12223dff"
            }
        }, {
            "featureType": "districtlabel",
            "elementType": "labels.text.stroke",
            "stylers": {
                "color": "#ffffffff"
            }
        }, {
            "featureType": "entertainment",
            "elementType": "geometry",
            "stylers": {
                "color": "#ffffffff"
            }
        }, {
            "featureType": "shopping",
            "elementType": "geometry",
            "stylers": {
                "color": "#12223dff"
            }
        }
    ];
    var styleJson2 = [{
        'featureType': 'water',
        'elementType': 'all',
        'stylers': {
          'color': '#031628'
        }
      },
      {
        'featureType': 'land',
        'elementType': 'geometry',
        'stylers': {
          'color': '#000102'
        }
      },
      {
        'featureType': 'highway',
        'elementType': 'all',
        'stylers': {
          'visibility': 'off'
        }
      },
      {
        'featureType': 'arterial',
        'elementType': 'geometry.fill',
        'stylers': {
          'color': '#000000'
        }
      },
      {
        'featureType': 'arterial',
        'elementType': 'geometry.stroke',
        'stylers': {
          'color': '#0b3d51'
        }
      },
      {
        'featureType': 'local',
        'elementType': 'geometry',
        'stylers': {
          'color': '#000000'
        }
      },
      {
        'featureType': 'railway',
        'elementType': 'geometry.fill',
        'stylers': {
          'color': '#000000'
        }
      },
      {
        'featureType': 'railway',
        'elementType': 'geometry.stroke',
        'stylers': {
          'color': '#08304b'
        }
      },
      {
        'featureType': 'subway',
        'elementType': 'geometry',
        'stylers': {
          'lightness': -70
        }
      },
      {
        'featureType': 'building',
        'elementType': 'geometry.fill',
        'stylers': {
          'color': '#000000'
        }
      },
      {
        'featureType': 'all',
        'elementType': 'labels.text.fill',
        'stylers': {
          'color': '#857f7f'
        }
      },
      {
        'featureType': 'all',
        'elementType': 'labels.text.stroke',
        'stylers': {
          'color': '#000000'
        }
      },
      {
        'featureType': 'building',
        'elementType': 'geometry',
        'stylers': {
          'color': '#022338'
        }
      },
      {
        'featureType': 'green',
        'elementType': 'geometry',
        'stylers': {
          'color': '#062032'
        }
      },
      {
        'featureType': 'boundary',
        'elementType': 'all',
        'stylers': {
          'color': '#465b6c'
        }
      },
      {
        'featureType': 'manmade',
        'elementType': 'all',
        'stylers': {
          'color': '#022338'
        }
      },
      {
        'featureType': 'label',
        'elementType': 'all',
        'stylers': {
          'visibility': 'off'
        }
      },
      {
        "featureType": "poi",
        "elementType": "all",
        "stylers": {
          "color": "#03FED2",
          "visibility": "off"
        }
      }
    ]
    import echarts from 'echarts'
    import 'echarts/extension/bmap/bmap.js'
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
            },
            zoom:{
              type:Number,
              default:3,
            }
        },
        data() {
            return {
                chart: null,
            }
        },
        mounted() {
            this.initChart();
            this.setMap();
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
                    title: {
                        text: '千岛湖景区热力图',
                        left: 'left',
                        textStyle: {
                            // color: '#fff'
                        }
                    },
                    tooltip : {
                        trigger: 'item',
                        formatter: function (params) {
                            return params.name + ' : ' + params.value[2];
                        }
                    },
                    visualMap: {
                        min: 0,
                        max: 300,
                        type: 'piecewise',
                        inRange: {
                            color: ['#50a3ba', '#eac736', '#d94e5d']
                        },
                        textStyle: {
                            color: '#fff'
                        },
                        show:false,
                    },
                    bmap: {
                        center: [118.969682,29.616078],
                        // zoom: 13,
                        roam: true,
                        mapStyle: {
                          style: 'midnight'
                          // 2.0接口样式
                            // styleJson:styleJson
                        }
                    },
                    series : [
                        {
                            name: '千岛湖',
                            type: 'scatter',
                            coordinateSystem: 'bmap',
                            data: this.convertData(data1),
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
                        // top3特效
                        {
                            name: 'Top 3',
                            type: 'effectScatter',
                            // coordinateSystem: 'geo',
                            coordinateSystem: 'bmap',
                            data: this.convertData(data1.sort(function (a, b) {
                                return b.value - a.value;
                            }).slice(0, 3)),
                            // symbolSize: function (val) {
                            //     return val[2] / 10;
                            // },
                            symbolSize:12,
                            showEffectOn: 'render',
                            rippleEffect: {
                                brushType: 'stroke'
                            },
                            hoverAnimation: true,
                            // label: {
                            //     normal: {
                            //         formatter: '{b}',
                            //         position: 'right',
                            //         show: true
                            //     }
                            // },
                            itemStyle: {
                                normal: {
                                    color: '#f4e925',
                                    shadowBlur: 10,
                                    shadowColor: '#333'
                                }
                            },
                            zlevel: 1
                        }
                    ]})
            },
            convertData(data) {
                var res = [];
                for (var i = 0; i < data.length; i++) {
                    var geoCoord = geoCoordMap[data[i].name];
                    if (geoCoord) {
                        res.push({
                            name: data[i].name,
                            value: geoCoord.concat(data[i].value)
                        });
                    }
                }
                return res;
            },
            setMap(){
                // 获取bmap对象
                var bmap = null;
                this.chart._model.eachComponent('bmap', function (bmapModel) {			
                    if(bmap == null){
                        bmap = bmapModel.__bmap;
                    }
                });
                // 设置样式（3.0API）
                bmap.setMapStyleV2({styleJson:styleJson3});
                // (2.0API)
                // bmap.setMapStyle({styleJson:styleJson2});

                // 景点坐标数组
                var bPoints = new Array();
                Object.keys(geoCoordMap).forEach(function(key){
                    var point = new BMap.Point(geoCoordMap[key][0],geoCoordMap[key][1]);
                    bPoints.push(point);
                });

                // 根据景点坐标数组自动缩放
                var view = bmap.getViewport(eval(bPoints));
                var mapZoom = view.zoom;
                var centerPoint = view.center;
                bmap.centerAndZoom(centerPoint, mapZoom);
            },
        },   
    }
</script>

<style>
/*取消百度地图logo*/
 .anchorBL{  
       display:none;  
   } 
</style>
