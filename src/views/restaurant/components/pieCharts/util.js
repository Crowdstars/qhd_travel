export const IdData = {
    RestScoreId: 'RestScoreId',
    RestNumId: 'RestNumId'
}
export const optionData = {
    color: ['#4CDCFF', '#AEFF33', '#ECFF0A', '#9494FF', '#F5D001'],
    grid: {
        top: 0,
        bottom: 10,
        left: 0,
        right: 0,
        containLabel: true,
    },
    legend: {
        orient: 'horizontal',
        x: 'center',
        top: "top",
        textStyle: {
            color: '#ccc',
            fontSize: 12,

        },
        itemWidth: 10,
        itemHeight: 10,
        icon: 'roundRect',
        formatter: function (name) {
            return name;
        },
        show: true
    },
    series: [
        // 主要展示层的
        {
            selectedMode: 'single',
            radius: ['15%', '30%'],
            center: ['75%', '55%'],
            type: 'pie',
            zlevel: 10,
            label: {
                normal: {
                    show: true,
                    formatter: "{c}%",
                    textStyle: {
                        fontSize: 12,

                    },
                    position: 'outside'
                },
                emphasis: {
                    show: true
                }
            },
            labelLine: {
                normal: {
                    show: true,
                    length: 5,
                    length2: 10,
                },
                emphasis: {
                    show: true
                }
            },
            data: [],
        },
        // 边框的设置
        {
            radius: ['0%', '1%'],
            center: ['75%', '55%'],
            type: 'pie',
            zlevel: 7,
            data: [{
                value: 0,
                labelLine: {
                    normal: {
                        show: false,
                    },
                },
                itemStyle: {
                    color: "#465376",
                },
            }],
        }, 
        {
            radius: ['1%', '3%'],
            center: ['75%', '55%'],
            type: 'pie',
            zlevel: 6,
            data: [{
                value: 0,
                labelLine: {
                    normal: {
                        show: false
                    },
                },
                itemStyle: {
                    color: "#fff",
                },
            }],
        }, 
        {
            radius: ['3%', '6%'],
            center: ['75%', '55%'],
            type: 'pie',
            zlevel: 7,
            data: [{
                value: 0,
                labelLine: {
                    normal: {
                        show: false,
                    },
                },
                itemStyle: {
                    color: "#fff",
                },
            }],
        }, 
        {
            name: '外边框',
            type: 'pie',
            hoverAnimation: false, //鼠标移入变大
            center: ['75%', '55%'],
            radius: ['30%', '32%'],
            zlevel: 2,
            label: {
                normal: {
                    show: false
                }
            },
            data: [{
                value: 0,
                name: '',
                labelLine: {
                    normal: {
                        show: false
                    },
                },
                itemStyle: {
                    normal: {
                        borderWidth: 0,
                        borderColor: '#4B4B4B',
                        color: 'rgba(250,250,250,0.3)',
                    }
                }
            }]
        }
    ]
}
export const optionData1 = {
    color: ['#4CDCFF', '#AEFF33', '#ECFF0A', '#9494FF', '#F5D001'],
    grid: {
        top: 0,
        bottom: 10,
        left: 0,
        right: 0,
        containLabel: true,
    },
    legend: {
        orient: 'horizontal',
        x: 'center',
        top: "top",
        textStyle: {
            color: '#ccc',
            fontSize: 12,

        },
        itemWidth: 10,
        itemHeight: 10,
        icon: 'roundRect',
        formatter: function (name) {
            switch (name) {
                case "(0.0, 3.0]":
                    return "差";
                case "(3.0, 4.0]":
                    return "较差";
                case "(4.0, 4.3]":
                    return "良";
                case "(4.3, 4.7]":
                    return "较好";
                case "(4.7, 5.0]":
                    return "好";
                default:
                    return name
            }
        },
        show: true
    },
    series: [
        // 主要展示层的
        {
            selectedMode: 'single',
            radius: ['15%', '30%'],
            center: ['25%', '55%'],
            type: 'pie',
            zlevel: 10,
            label: {
                normal: {
                    show: true,
                    formatter: "{c}%",
                    textStyle: {
                        fontSize: 12,
                    },
                    position: 'outside'
                },
                emphasis: {
                    show: true
                }
            },
            labelLine: {
                normal: {
                    show: true,
                    length: 5,
                    length2: 10,
                },
                emphasis: {
                    show: true
                }
            },
            data: [],
        },
        // 边框的设置
        {
            radius: ['0%', '1%'],
            center: ['75%', '55%'],
            type: 'pie',
            zlevel: 7,
            data: [{
                value: 0,
                labelLine: {
                    normal: {
                        show: false,
                    },
                },
                itemStyle: {
                    color: "#465376",
                },
            }],
        },
        {
            radius: ['1%', '3%'],
            center: ['75%', '55%'],
            type: 'pie',
            zlevel: 6,
            data: [{
                value: 0,
                labelLine: {
                    normal: {
                        show: false
                    },
                },
                itemStyle: {
                    color: "#fff",
                },
            }],
        },
        {
            radius: ['3%', '6%'],
            center: ['75%', '55%'],
            type: 'pie',
            zlevel: 7,
            data: [{
                value: 0,
                labelLine: {
                    normal: {
                        show: false,
                    },
                },
                itemStyle: {
                    color: "#fff",
                },
            }],
        },
        {
            name: '外边框',
            type: 'pie',
            hoverAnimation: false, //鼠标移入变大
            center: ['75%', '55%'],
            radius: ['30%', '32%'],
            zlevel: 2,
            label: {
                normal: {
                    show: false
                }
            },
            data: [{
                value: 0,
                name: '',
                labelLine: {
                    normal: {
                        show: false
                    },
                },
                itemStyle: {
                    normal: {
                        borderWidth: 0,
                        borderColor: '#4B4B4B',
                        color: 'rgba(250,250,250,0.3)',
                    }
                }
            }]
        }
    ]
}