export const IdData = {
    HotelScoreId: 'HotelScoreId',
    HotelNumId: 'HotelNumId',
}
export const optionData = {
    title : {
        text: '酒店评论数分布',

        x:'center',
        y:"bottom"
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'right',
        data:['少','较少','一般','多'],
        y:"center"
    },
    series: [
        {
            name:'评论数',
            type:'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: true,
            center:['30%','50%'],
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [],
        },
        ]

}
export const optionData1 = {
    title : {
        text: '酒店评分分布',

        x:'center',
        y:"bottom"
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
    },
    legend: {
        orient: 'vertical',
        x: 'right',
        data:['差','较差','良','较好',"好"],
        y:"center"
    },
    series: [
        {
            name:'评分',
            type:'pie',
            radius: ['40%', '60%'],
            avoidLabelOverlap: true,
            center:['30%','50%'],
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [],
        },
    ]
}
