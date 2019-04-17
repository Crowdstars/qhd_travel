import request from '@/utils/request'

/**
 * 3. 获取截止日期(POST)
 */
export function getEndDate() {
    return request({
        url: '/api/getdate',
        method: 'post',
    })
}

/**
 * 5. 景区模块 关键指标(POST)
 */
export function getKeyIndicator(formData) {
    return request({
        url: '/api/homepage/keyindicator',
        method: 'post',
        params: formData,
    })
}

/**
 * 6.景区排行（POST) 近3个月的统计
 */
export function getSpotRank() {
    return request({
        url: '/api/homepage/spotrank',
        method: 'post',
    })
}

/**
 * 7.千岛湖热力图（POST) 近3个月的统计
 */
export function getQDHHeatMap() {
    return request({
        url: '/api/homepage/heatmap',
        method: 'post',
    })
}

/**
 * 9.酒店排行（POST) 近3个月的统计
 */
export function getHotelRank() {
    return request({
        url: '/api/homepage/hotelrank',
        method: 'post',
    })
}

/**
 * 10.餐饮排行（POST) 近3个月的统计
 */
export function getRestaurantRank() {
    return request({
        url: '/api/homepage/restaurantrank',
        method: 'post',
    })
}

/**
 * 11-1.餐饮饼图（POST) 近3个月的分数统计
 */
export function getRestaurantPieChartsScore() {
    return request({
        url: '/api/homepage/restaurantpiecharts/score',
        method: 'post',
    })
}

/**
 * 11-2.餐饮饼图（POST) 近3个月的评论数量统计
 */
export function getRestaurantPieChartsNum() {
    return request({
        url: '/api/homepage/restaurantpiecharts/num',
        method: 'post',
    })
}

/**
 * 12.酒店饼图（POST) 近3个月的统计(已取消)
 */
export function getPiechartsHotel() {
    return request({
        url: '/api/homepage/piecharts/hotel',
        method: 'post',
    })
}

/**
 * 12-1.酒店饼图（POST) 评分近3个月的统计
 */
export function getHotelScorePieCharts() {
    return request({
        url: '/api/homepage/hotel/scorepiecharts',
        method: 'post',
    })
}

/**
 * 12-2.酒店饼图（POST) 评论数量近3个月的统计
 */
export function getHotelNumPieCharts() {
    return request({
        url: '/api/homepage/hotel/numpiecharts',
        method: 'post',
    })
}

/**
 * 13.千岛湖景区热度变化图 （POST) 近1年的统计 按具体使用图表框架返回不同字段 *
 */
export function getSpotHotChange() {
    return request({
        url: '/api/homepage/spothotchange',
        method: 'post',
    })
}