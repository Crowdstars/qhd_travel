export const idData = {
    scenicSpotFeverId: 'scenicSpotFeverId'
}

let imgone = new Image();
imgone.src = "https://cdn.hzsxkj.cn/huayun/images/grid-no-border.png"
export const optionData = {
    // color: ['#8484FF', '#FFDB5C', '#2FC968'],
    color: ['#B0C14E', '#6A6CCF'],
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'cross', // 默认为直线，可选为：'line' | 'shadow'
            // label: {
            //     backgroundColor: '#283b56'
            // }
        },
    },
    grid: {
        left: 0,
        top: '15%',
        right: 0,
        bottom: '5%',
        containLabel: true,
        show: true,
        backgroundColor: {
            type: "pattern",
            repeat: "repeat",
            image: imgone
        }
    },
    legend: {
        show: true,
        orient: 'horizontal',
        // bottom: "190",
        top:"5",
        textStyle: {
            color: 'black',
            fontSize: 12,

        },
        icon: 'rect',
        itemWidth:10,
        itemHeight:10,
        formatter: function(name) {
            return name
        }
    },
    xAxis: [{
        type: 'category',
        data: [],
        axisTick: {
            show: false,
        },
        axisLabel: {
            color:'black'
        },
        axisLine: {
            onZero: false,
            lineStyle: {
                // color: "#0F4EC5",
               color: "rgba(0,0,0,0)",
                width: "2"
            }
        },
        interval:0,
        z:2
    },{
        type: 'category',
        axisTick: {
            show: false,
        },
        axisLine: {
            onZero: false,
            lineStyle: {
                color: "rgba(0,0,0,0)",
                width: "2" //坐标线的宽度
            }
        },
    }],
    yAxis: [
        {
            type: 'value',
            position: 'left',
            axisTick: {
                inside: true,
                lineStyle: {
                    // color: "blue", //左边线的颜色
                    color: "rgba(0,0,0,0)",
                    width: "2" //坐标线的宽度
                }
            },
            axisLabel: {
                formatter: '{value}',
                color:'black',
                
            },
            axisLine: {
                lineStyle: {
                    // color: "blue", //左边线的颜色
                    color: "rgba(0,0,0,0)",
                    width: "2" //坐标线的宽度
                }
            },
            splitLine: {
                show: false
            },
            z:3
        },
        {
            type: 'value',
            min: -100,
            max: 50,
            opposite: true,
            position: 'right',
            axisLabel: {
                show: true,
                formatter: '{value}%',
                color:'black'
            },
            axisTick: {
                inside: true,
                lineStyle: {
                    // color: "#01F2F8", //左边线的颜色
                    // color:"blue",
                    color: "rgba(0,0,0,0)",
                    width: "2" //坐标线的宽度
                }
            },
            axisLine: {
                lineStyle: {
                    // color: "#01F2F8",
                    // color: "blue",
                    color: "rgba(0,0,0,0)",
                    width: "2"
                }
            },
            splitLine: {
                show: false
            },
            z:3
        },

    ],
    series: [
        {
            yAxisIndex:0,
            name: "评论数量",//当月的评论数量，柱状图显示
            type: "bar",
            data: []
        },
        {
            yAxisIndex:1,
            name: "同比",//当月的评论数量，折线图显示显示
            type: "line",
            data: []
        },

    ]
}