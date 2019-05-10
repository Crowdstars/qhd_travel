const env = process.env.NODE_ENV === 'development' ? 'dev' : 'pro';

const config = {
    /**
     * @description 开发环境请求前缀
     */
    dev: {
        //向后端基础请求地址
        //  url: 'http://120.55.59.187:3000',
        url:'http://localhost:3000',
        //详情跳转请求地址
        // detailUrl: 'http://120.55.59.187:3000',
        detailUrl: 'http://127.0.0.1:8000'
    },
    /**
     * @description 正式打包环境请求前缀
     */
    pro: {
        //向后端基础请求地址
        // url: 'http://120.55.59.187:3000',
        url: 'http://120.55.59.187:3000',
        //详情跳转请求地址
        // detailUrl: 'http://120.55.59.187:3000'
        detailUrl: 'http://120.55.59.187:8000'
    }
};

export default {
    /**
     * @description 标签缓存关键字
     */
    tagNaveListCacheKey: 'sx_tagNaveList',
    /**
     * @description 配置显示在浏览器标签的title
     */
    title: '旅游大屏',
    /**
     * @description token在Cookie中存储的天数，默认1天
     */
    cookieExpires: 1,
    /**
     * @description api请求基础路径
     */
    baseUrl: config[env].url,
    /**
     * @description 详情跳转根路径
     */
    detailUrl: config[env].detailUrl,
    /**
     * @description 默认打开的首页的路由name值，默认为home
     */
    homeName: 'dataView'
}
