import {param2Obj} from '@/utils'

/**
 * 3. 获取截止日期(POST)
 * @type {{code: number, data: {endDate: string 截止日期}, message: string}}
 */
const endDate = {code: 0, message: "", data: {endDate: "2019-03-29"}};

/**
 * 5. 景区模块 关键指标(POST)
 * @type {{code: number 返回码, data: {
        monthNumCumulant: number 本月累积量,
        yearNumCumulant: number 本年累积量,
        monthNumChange: number 本月评论数量变化量,
        yearNumChange: number 本年评论数量变化量,
        monthNumPercent: string 本月同比数量变化量,
        yearNumPercent: string 本年同比数量变化量,
        isMonthNumRise: number 本月评论数量是否上升 0 表示下降 1表示上升,
        isYearNumRise: number 本年评分数量是否上升 0 表示下降 1表示上升,
        monthScoreCumulant: number 本月评分,
        yearScoreCumulant: number 本年评分,
        monthScoreChange: string 本月评分变化量,
        yearScoreChange: string 本年评分变化量,
        monthScorePercent: string 本月同比评分变化量,
        yearScorePercent: string 本年同比评分变化量,
        isMonthScoreRise: number 本月分数是否上升 0表示下降1表示上升,
        isYearScoreRise: number 本年分数是否上升 0表示下降1表示上升,}}}
 */
const keyIndicator = {
    code: 0,
    message: "",
    data: {
        monthNumCumulant: 278,
        yearNumCumulant: 13027,
        monthNumChange: 267,
        yearNumChange: 1105,
        monthNumPercent: "48.99%",
        yearNumPercent: "7.82%",
        isMonthNumRise: 0,
        isYearNumRise: 0,
        monthScoreCumulant: 4.41,
        yearScoreCumulant: "4.49",
        monthScoreChange: "0.20",
        yearScoreChange: "0.02",
        monthScorePercent: "4.34%",
        yearScorePercent: "0.44%",
        isMonthScoreRise: 0,
        isYearScoreRise: 0
    }
};

/**
 * 6.景区排行（POST) 近3个月的统计
 * @type {{code: number, data: {qdhlist: {commentNumber: number 评论数量, commentScore: number 评分, _id: string 景区名字}[], list: {commentNumber: number 评论数量, commentScore: number 评分, _id: string 景点名字}[], message: string}}}
 */
const spotRank = {
    code: 0,
    list: [
        {_id: "根宫", commentScore: 4.57, commentNumber: 64},
        {_id: "黄山", commentScore: 4.55, commentNumber: 2470},
        {_id: "乌镇", commentScore: 4.54, commentNumber: 1219},
        {_id: "南湖", commentScore: 4.53, commentNumber: 200},
        {_id: "三清山", commentScore: 4.53, commentNumber: 314},
        {_id: "鲁迅", commentScore: 4.45, commentNumber: 287},
        {_id: "天台山", commentScore: 4.43, commentNumber: 192},
        {_id: "千岛湖", commentScore: 4.41, commentNumber: 1367},
        {_id: "普陀山", commentScore: 4.12, commentNumber: 1204},
        {_id: "溪口", commentScore: 4.07, commentNumber: 459}
    ],
    qdhlist: [
        {_id: "九咆界", commentScore: 5, commentNumber: 5},
        {_id: "桂花岛", commentScore: 5, commentNumber: 1},
        {_id: "钓鱼岛", commentScore: 5, commentNumber: 3},
        {_id: "龙川", commentScore: 4.88, commentNumber: 9},
        {_id: "白云溪", commentScore: 4.75, commentNumber: 4},
        {_id: "黄山尖", commentScore: 4.66, commentNumber: 6},
        {_id: "森林氧吧", commentScore: 4.57, commentNumber: 83},
        {_id: "东南湖", commentScore: 4.46, commentNumber: 93},
        {_id: "中心湖", commentScore: 4.43, commentNumber: 1086},
        {_id: "秘境", commentScore: 4.33, commentNumber: 3}
    ],
    message: ""
};

/**
 * 7.千岛湖热力图（POST) 近3个月的统计
 * @type {{code: number 返回码, data: {list: {commentNumber: number 评论数量, lng: number 经度, commentScore: number 评分, id: string 景点名字, lat: number 纬度}[], message: string}}}
 */
const qDHHeatMap = {
    code: 0,
    data: {
        list: [
            {_id: "天池岛", commentScore: 3, commentNumber: 1, lat: 29.539735, lng: 119.150892},
            {_id: "桂花岛", commentScore: 5, commentNumber: 1, lat: 29.600132, lng: 119.021076},
            {_id: "秘境", commentScore: 4.33, commentNumber: 3, lat: 29.602111, lng: 119.269412},
            {_id: "龙山岛", commentScore: 3.62, commentNumber: 8, lat: 29.600748, lng: 118.98683},
            {_id: "月光岛", commentScore: 3.8, commentNumber: 5, lat: 29.631394, lng: 119.015656},
            {_id: "黄山尖", commentScore: 4.66, commentNumber: 6, lat: 29.575162, lng: 119.124079},
            {_id: "九咆界", commentScore: 5, commentNumber: 5, lat: 29.61001, lng: 119.051446},
            {_id: "梅峰", commentScore: 4.25, commentNumber: 16, lat: 29.594396, lng: 118.900717},
            {_id: "龙川", commentScore: 4.88, commentNumber: 9, lat: 29.467275, lng: 118.638601},
            {_id: "白云溪", commentScore: 4.75, commentNumber: 4, lat: 29.704721, lng: 118.885111},
            {_id: "文渊狮城", commentScore: 3.55, commentNumber: 18, lat: 29.478633, lng: 118.678015},
            {_id: "石林", commentScore: 4, commentNumber: 18, lat: 29.380513, lng: 119.014528},
            {_id: "渔乐岛", commentScore: 3.14, commentNumber: 7, lat: 29.561853, lng: 118.94942},
            {_id: "森林氧吧", commentScore: 4.57, commentNumber: 83, lat: 29.595154, lng: 119.224824},
            {_id: "钓鱼岛", commentScore: 5, commentNumber: 3, lat: 29.61029, lng: 119.122117},
            {_id: "芹川", commentScore: 4, commentNumber: 1, lat: 29.524434, lng: 118.614757},
            {_id: "东南湖", commentScore: 4.46, commentNumber: 93, lat: 29.591235, lng: 119.082667},
            {_id: "中心湖", commentScore: 4.43, commentNumber: 1086, lat: 29.568668, lng: 119.019049}
        ]
    },
    message: ""
};

/**
 * 9.酒店排行（POST) 近3个月的统计
 * @type {{code: number 返回码, data: {badList 差评top10: [{_id: "酒店名字", commentScore: number 评分, commentNumber: number 评论数量, shopRate: "类型"}], goodList 好评top10: *[]}, message: string}}
 */
const hotelRank = {
    code: 0,
    message: "",
    data: {
        badList: [
            {_id: "千岛湖伯瑞特温泉度假酒店", commentScore: 4.7, commentNumber: 126, shopRate: "豪华型"},
            {_id: "千岛湖滨江希尔顿度假酒店", commentScore: 4.69, commentNumber: 112, shopRate: "豪华型"},
            {_id: "蝶来度假酒店(原浙旅度假酒店)", commentScore: 4.69, commentNumber: 83, shopRate: "经济型"},
            {_id: "千岛湖鼎和度假公寓酒店", commentScore: 4.66, commentNumber: 108, shopRate: "舒适型"},
            {_id: "千岛湖丽景酒店", commentScore: 4.66, commentNumber: 75, shopRate: "舒适型"},
            {_id: "千岛湖鸿廷国际酒店", commentScore: 4.62, commentNumber: 50, shopRate: "舒适型"},
            {_id: "千岛龙庭开元大酒店", commentScore: 4.6, commentNumber: 94, shopRate: "四星级"},
            {_id: "如家快捷酒店(杭州千岛湖广场店)", commentScore: 4.45, commentNumber: 71, shopRate: "经济型"},
            {_id: "千岛湖林业大酒店", commentScore: 4.4, commentNumber: 56, shopRate: "高档型"},
            {_id: "千岛湖奥得酒店(原之元大酒店)", commentScore: 4.29, commentNumber: 69, shopRate: "舒适型"}
        ],
        goodList: [
            {_id: "千岛湖仟陌间", commentScore: 4.98, commentNumber: 59, shopRate: "舒适型"},
            {_id: "倾境千岛湖民宿", commentScore: 4.97, commentNumber: 54, shopRate: "舒适型"},
            {_id: "千岛湖普丽度假酒店", commentScore: 4.87, commentNumber: 57, shopRate: "高档型"},
            {_id: "千岛湖开元颐居酒店", commentScore: 4.86, commentNumber: 105, shopRate: "豪华型"},
            {_id: "千岛湖梅地亚君澜度假酒店", commentScore: 4.86, commentNumber: 126, shopRate: "豪华型"},
            {_id: "千岛湖开元度假村", commentScore: 4.86, commentNumber: 135, shopRate: "五星级"},
            {_id: "千岛湖绿城度假酒店", commentScore: 4.86, commentNumber: 203, shopRate: "豪华型"},
            {_id: "千岛湖峰泰君亭酒店", commentScore: 4.85, commentNumber: 80, shopRate: "豪华型"},
            {_id: "千岛湖花园饭店", commentScore: 4.85, commentNumber: 58, shopRate: "舒适型"},
            {_id: "千岛湖喜来登度假酒店", commentScore: 4.84, commentNumber: 89, shopRate: "五星级"}
        ]
    }

};

/**
 * 10.餐饮排行（POST) 近3个月的统计
 * @type {{code: number, data: {goodList 好评top10: {commentNumber: number 评论数量, commentScore: number 评分, _id: string 餐饮店铺名字}[], message: string, badList 差评top10: {commentNumber: number, commentScore: number, _id: string}[]}}}
 */
const restaurantRank = {
    code: 0,
    message: "",
    data: {
        goodList: [
            {_id: "全乐鱼馆·野生湖鲜", commentNumber: 246, commentScore: 4.75},
            {_id: "千岛鱼府(望湖总店)", commentNumber: 121, commentScore: 4.74},
            {_id: "外婆湾·淳安外婆的记忆和味道(临湖总店)", commentNumber: 138, commentScore: 4.74},
            {_id: "鱼巷子·味尽千岛湖(淳安睦剧文化传承店)", commentNumber: 176, commentScore: 4.72},
            {_id: "大鱼小鱼·沿湖餐厅", commentNumber: 407, commentScore: 4.62},
            {_id: "鱼阿婆·有机农家菜", commentNumber: 133, commentScore: 4.62},
            {_id: "依湖野生鱼馆·绝佳湖景", commentNumber: 284, commentScore: 4.61},
            {_id: "星巴克(千岛湖店)", commentNumber: 133, commentScore: 4.52},
            {_id: "近湖野生鱼味馆·临湖品鱼鲜", commentNumber: 160, commentScore: 4.38},
            {_id: "岭上院子餐厅", commentNumber: 444, commentScore: 4.32}
        ],
        badList: [
            {_id: "丽都制造时尚自助工坊", commentNumber: 112, commentScore: 2.21},
            {_id: "木屋烤鱼·匠造古法烤鱼", commentNumber: 105, commentScore: 3.49},
            {_id: "千岛湖鱼味馆(千岛湖店)", commentNumber: 103, commentScore: 3.53},
            {_id: "老雷家的菜", commentNumber: 144, commentScore: 3.76},
            {_id: "宝荣鱼馆·临湖之宴", commentNumber: 495, commentScore: 3.87},
            {_id: "几荷-临湖而憩", commentNumber: 323, commentScore: 4.08},
            {_id: "鱼舍院子餐厅", commentNumber: 171, commentScore: 4.09},
            {_id: "翠花鱼府(千岛湖店)", commentNumber: 213, commentScore: 4.15},
            {_id: "千岛湖野生鱼馆(秀水广场店)", commentNumber: 180, commentScore: 4.2},
            {_id: "鱼宴馆·农家菜(千岛湖总店)", commentNumber: 389, commentScore: 4.27}
        ]
    }
};

/**
 * 11.餐饮饼图（POST) 近3个月的统计
 * @type {{code: number, message: string, data: {scoreList 评论分数区间段: {name: string 区间段, value: number 统计数量}[]}}}
 */
const restaurantPieChartsScore = {
    code: 0,
    message: "",
    data: {
        scoreList: [
            {name: "(0.0, 3.0]", value: 5},
            {name: "(3.0, 4.0]", value: 22},
            {name: "(4.0, 4.3]", value: 14},
            {name: "(4.3, 4.7]", value: 27},
            {name: "(4.7, 5.0]", value: 5}
        ]
    }
};

/**
 * 11.餐饮饼图（POST) 近3个月的统计
 * @type {{code: number,message: string, data: {numberList 评论数量区间段: {name: string 区间段, value: number 统计数量}[]}}}
 */
const restaurantPieChartsNum = {
    code: 0,
    message: "",
    data: {
        numberList: [
            {name:"(0, 20]",value:58},
            {name:"(20, 50]",value:24},
            {name:"(50, 90]",value:20},
            {name:"(90, 1000]",value:32}
        ]
    }
};

/**
 * 12-1.酒店饼图（POST) 评分近3个月的统计
 * @type {{code: number, data: {scoreList 评论分数区间段: [{name: "区间段", value: number 数额}]}, message: string}}
 */
const hotelScorePieCharts = {
    code: 0,
    message: "",
    data: {
        scoreList: [//  评论分数区间段
            {name: "(0.0, 3.0]", value: 96},
            {name: "(3.0, 4.0]", value: 24},
            {name: "(4.0, 4.3]", value: 6},
            {name: "(4.3, 4.7]", value: 6},
            {name: "(4.7, 5.0]", value: 5}
        ]
    }
};

/**
 * 12-2.酒店饼图（POST) 评论数量近3个月的统计
 * @type {{code: number, data: {numberList 评论数量区间段: [{name: "区间段", value: number 数额},]}, message: string}}
 */
const hotelNumPieCharts = {
    code: 0,
    message: "",
    data: {
        numberList: [// 评论数量区间段
            {name:"(0, 20]",value:152},
            {name:"(20, 50]",value:47},
            {name:"(50, 90]",value:20},
            {name:"(90, 1000]",value:30}
        ]
    }
};

/**
 * 13.千岛湖景区热度变化图 （POST) 近1年的统计 按具体使用图表框架返回不同字段
 * @type {{code: number 返回码, data: {timeList: Array 返回时间区间数组, valueList: []}}}
 */
const spotHotChange = {
    code: 0,
    data: {
        timelist: ["2018-03", "2018-04", "2018-05", "2018-06", "2018-07", "2018-08", "2018-09", "2018-10", "2018-11", "2018-12", "2019-01", "2019-02", "2019-03"],
        valuelist: [
            {
                name: "评论数量",//当月的评论数量，柱状图显示
                type: "bar",
                data: [83, 1075, 1294, 989, 1237, 1946, 1454, 1258, 591, 301, 346, 676, 318]
            },
            {
                name: "同比",//当月的评论数量，折线图显示显示
                type: "line",
                data: ["6.74%", "1.80%", "24.46%", "27.55%", "12.89%", "17.86%", "4.15%", "27.24%", "42.23%", "50.08%", "63.19%", "18.55%", "70.36%"]
            },
            {
                name: "累积量",//当月的累积评论数量，折线图显示显示
                type: "line",
                data: [83, 1158, 2452, 3441, 4678, 6624, 8078, 9336, 9927, 10228, 10574, 11250, 11568]
            }
        ]
    }
};

export default {
    getEndDate: () => endDate,
    getKeyIndicator: () => keyIndicator,
    getSpotRank: () => spotRank,
    getQDHHeatMap: () => qDHHeatMap,
    getHotelRank: () => hotelRank,
    getRestaurantRank: () => restaurantRank,
    getRestaurantPieChartsScore: () => restaurantPieChartsScore,
    getRestaurantPieChartsNum: () => restaurantPieChartsNum,
    getHotelScorePieCharts: () => hotelScorePieCharts,
    getHotelNumPieCharts: () => hotelNumPieCharts,
    getSpotHotChange: () => spotHotChange
}
