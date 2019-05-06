import request from '@/utils/request'

/**
 *  4. 酒店详情页面接口
 * 
 */

/**
 *  4.1. 酒店关键指标模块（评论数）
 */
export function getHotelKeyData() {
    return request({
        url: '/api/hotelpage/keyindicator',
        method: 'post',
    })
}

/**
 * 4.2.酒店饼图模块
 */

// 4.2.1 酒店评分饼图模块
export function getHotelPieChartsScore() {
    return request({
        url: '/api/homepage/hotel/scorepiecharts',
        method: 'post',
    })
}

// 4.2.2 酒店评论数量饼图模块
export function getHotelPieChartsNum() {
    return request({
        url: '/api/homepage/hotel/numpiecharts',
        method: 'post',
    })
}

/**
 * 4.3 商圈选择对应酒店等级模块
 */
export function getHotelSend(param) {
    return request({
        url: '/api/hotelpage/selectlist',
        method: 'post',
        data: param
    })
}

/**
 * 4.4 对应商圈等级酒店显示列表
 * 
 * params: 
 *   businessArea: // 商圈。（默认加载全部 businessArea: ”全部“）
 *   hotelRate： //酒店等级（默认加载全部 hotelrate: ”全部“）
 *   pageSize： //每页显示餐馆数量
 *   sortWay： //排序方式，降序传1，升序传2 默认传1
 *   commentType: //排序关键字，按照评分传1，按照评论数量传2 默认传1
 *   currPage： // 当前页面
 */
export function getHotelList(param) {
    return request({
        url: '/api/hotelpage/shoplist',
        method: 'post',
        data: param
    })
}

/**
 * 4.5 酒店好评， 差评， 热度榜表单
 */
export function getHotelRankList() {
    return request({
        url: '/api/hotelpage/ranklist',
        method: 'post',
    })
}

/**
 * 4.6 评论文本分析
 */
// // 4.6.1 获取不同方面评论数目（例如： 性价比： 250，位置： 300，  服务： 300）
// export function getHotelLabelList() {
//     return request({
//         url: '/api/qdhhotelcomtagsum',
//         method: 'post',
//     })
// }

// 4.6.2 获取具体方面的评论
/**
 * params: 
 *    c: ‘评论相关方面’ // 性价比， 位置， 	服务 //默认传性价比
 *    currpage：‘ 当前页面’
 *    commentclass：” 评论质量“ // 差评  0    好评   1 默认传好评
 */
export function getHotelComment(param) {
    return request({
        url: '/api/hotelpage/keywords',
        method: 'post',
        data: param
    })
}