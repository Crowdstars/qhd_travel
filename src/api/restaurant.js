import request from '@/utils/request'

/**
 *  3. 餐饮详情页面接口
 */

/**
 *  3-1. 餐饮关键指标模块（评论数）以及 评论数变化趋势图 模块
 */
export function getShopKeyData() {
    return request({
        url: '/api/restaurant/keyindicator',
        method: 'post',
    })
}

/**
 *  3-3. 餐饮选择模块
 */
export function getShopSelector() {
    return request({
        url: '/api/restaurant/selectlist',
        method: 'post',
    })
}

/**
 *  3-4. 餐饮排行列表模块
 */
export function getShopRankList() {
    return request({
        url: '/api/restaurant/ranklist',
        method: 'post',
    })
}

/**
 * 3-5. 餐饮评论智能模块
 */
export function getShopComment(keywords) {
    let data = {
        keywords
    }
    return request({
        url: '/api/restaurant/keywords',
        method: 'post',
        data
    })
}