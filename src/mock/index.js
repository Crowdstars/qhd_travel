import Mock from 'mockjs'
import loginAPI from './login'
import dataViewAPI from './dataView'

// 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
// https://github.com/nuysoft/Mock/issues/300
Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send;
Mock.XHR.prototype.send = function () {
    if (this.custom.xhr) {
        this.custom.xhr.withCredentials = this.withCredentials || false;
        this.custom.xhr.responseType = this.responseType
    }
    this.proxy_send(...arguments)
};

// 配置Ajax请求延时，可用来测试网络延迟大时项目中一些效果
// Mock.setup({
//     timeout: 1000
// });

/**登录相关*/
//1.登录(POST)
Mock.mock(/\/api\/login/, 'post', loginAPI.loginByUsername);
Mock.mock(/\/api\/logout/, 'post', loginAPI.logout);
//2.获取个人信息(POST)
Mock.mock(/\/api\/getuser\.*/, 'post', loginAPI.getUserInfo);

/**大屏相关接口*/
//3.获取截止日期(POST)
Mock.mock(/\/api\/getdate/, 'post', dataViewAPI.getEndDate);
//5.景区模块 关键指标(POST)
Mock.mock(/\/api\/homepage\/keyindicator/, 'post', dataViewAPI.getKeyIndicator);
//6.景区排行（POST) 近3个月的统计
Mock.mock(/\/api\/homepage\/spotrank/, 'post', dataViewAPI.getSpotRank);
//7.千岛湖热力图（POST) 近3个月的统计
Mock.mock(/\/api\/homepage\/heatmap/, 'post', dataViewAPI.getQDHHeatMap);
//9.酒店排行（POST) 近3个月的统计
Mock.mock(/\/api\/homepage\/hotelrank/, 'post', dataViewAPI.getHotelRank);
//10.餐饮排行（POST) 近3个月的统计
Mock.mock(/\/api\/homepage\/restaurantrank/, 'post', dataViewAPI.getRestaurantRank);
//11-1.餐饮饼图（POST) 近3个月的分数统计
Mock.mock(/\/api\/homepage\/restaurantpiecharts\/score/, 'post', dataViewAPI.getRestaurantPieChartsScore);
//11-2.餐饮饼图（POST) 近3个月的评论数量统计
Mock.mock(/\/api\/homepage\/restaurantpiecharts\/num/, 'post', dataViewAPI.getRestaurantPieChartsNum);
//12-1.酒店饼图（POST) 评分近3个月的统计
Mock.mock(/\/api\/homepage\/hotel\/scorepiecharts/, 'post', dataViewAPI.getHotelScorePieCharts);
//12-2.酒店饼图（POST) 评论数量近3个月的统计
Mock.mock(/\/api\/homepage\/hotel\/numpiecharts/, 'post', dataViewAPI.getHotelNumPieCharts);
//13.千岛湖景区热度变化图 （POST) 近1年的统计 按具体使用图表框架返回不同字段
Mock.mock(/\/api\/homepage\/spothotchange/, 'post', dataViewAPI.getSpotHotChange);


export default Mock
