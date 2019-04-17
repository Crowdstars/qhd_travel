export const idData = {
    scenicSpotFeverId: 'scenicSpotFeverId'
}

let imgone = new Image();
imgone.src = "https://cdn.hzsxkj.cn/huayun/images/grid-no-border.png";
export const optionData = {
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
        backgroundColor: {
            type: "pattern",
            repeat: "repeat",
            image: imgone
        }
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
            color:'#ccc'
        },
        axisLine: {
            onZero: false,
            lineStyle: {
                color: "#0F4EC5",
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
                color: "#0F4EC5", //左边线的颜色
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
                    color: "#50E89D", //左边线的颜色
                    width: "2" //坐标线的宽度
                }
            },
            axisLabel: {
                formatter: '{value}',
                color:'#ccc'
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
            z:3
        },
    ],
    series: [
        {
            yAxisIndex:0,
            name: "变化量",//当月的累积评论数量，折线图显示显示
            type: "line",
            data: []
        },
    ]
}