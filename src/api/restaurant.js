import request from '@/utils/request'

/**
 *  3. 餐饮详情页面接口
 */

/**
 *  3-1. 餐饮关键指标模块（评论数）以及 评论数变化趋势图 模块
 */
export function getShopKeyData() {
    return request({
        url: '/api/restaurantpage/keyindicator',
        method: 'post',
    })
}


//3-2 餐饮详情 获取对应商圈菜系
export function getCuisine(param) {
    return request({
        url:"/api/restaurantpage/selectlist",
        method:"post",
        data:param
    })
}
//3-3 餐饮详情 获取对应商圈菜系餐饮列表
export function getRestaurantList(param) {

    return request({
        url: '/api/restaurantpage/shoplist',
        method: 'post',
        data:param
})
}



/**
 *  3-4. 餐饮详情 获取餐饮好评，差评热度榜表单
 */
export function getShopRankList() {
    return request({
        url: '/api/restaurantpage/ranklist',
        method: 'post',
    })
}

/**
 * 3-5. 餐饮评论智能模块
 */
// 3.5.1 餐饮评论智能模块评论数量统计
export function getShopLabelList() {
    return request({
        url: '/api/restaurantpage/keywordcount',
        method: 'post',
    })
}
// 3.5.2 餐饮评论智能模块 获取评论内容（默认返回6条数据）
export function getShopComment(param) {
    return request({
        url: '/api/restaurantpage/keywords',
        method: 'post',
        data:param
    })
}
/**
 * 3-6. 餐饮详情 获取餐饮评论数饼图
 */
export function getRestaurantPieChartsNum() {
  return request({
      url:"/api/homepage/restaurantpiecharts/num",
      method:"post"
  })
}
/**
 * 3-7. 餐饮详情 获取餐饮评论分数饼图
 */
export function getRestaurantPieChartsScore() {
    return request({
        url:"/api/homepage/restaurantpiecharts/score",
        method:"post"
    })
}

