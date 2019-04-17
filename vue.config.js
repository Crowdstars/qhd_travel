'use strict'
const path = require('path');

const resolve = dir => {
    return path.join(__dirname, dir)
};

// 项目部署基础
const BASE_URL = process.env.NODE_ENV === 'production' ? './' : '/';

module.exports = {
    runtimeCompiler: true,
    transpileDependencies: ['element-ui'],
    publicPath: BASE_URL,
    // 如果你不需要使用eslint，把lintOnSave设为false即可
    lintOnSave: false,
    chainWebpack: config => {
        config.entry('polyfill').add('@babel/polyfill');
        config.resolve.alias
            .set('@', resolve('src')) // key,value自行定义，比如.set('@@', resolve('src/components'))
            .set('_c', resolve('src/components'));

        // set svg-sprite-loader
        config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end();
        config.module.rule('icons').test(/\.svg$/).include.add(resolve('src/assets/icons')).end().use('svg-sprite-loader').loader('svg-sprite-loader').options({symbolId: 'icon-[name]'}).end();
        // set preserveWhitespace
        config.module.rule('vue').use('vue-loader').loader('vue-loader').tap(options => {
            options.compilerOptions.preserveWhitespace = true;
            return options
        }).end()
    },
    // 设为false打包时不生成.map文件
    productionSourceMap: false,
    // configureWebpack: {
    //   plugins: [
    //     //引入JQuery组件
    //     new webpack.ProvidePlugin({
    //       $: "jquery",
    //       jQuery: "jquery",
    //       "windows.jQuery": "jquery"
    //     })
    //   ]
    // },
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src')
            }
        },
        externals: {
            "BMap": "BMap",
        }
    },
    css: {
        loaderOptions: { // 向 CSS 相关的 loader 传递选项
            less: {
                javascriptEnabled: true
            }
        }
    }
    ,
// 调用接口的基础路径，来解决跨域，如果设置了代理，那你本地开发环境的axios的baseUrl要写为 '' ，即空字符串
    devServer: {
        // 端口号
        port: 8080,
        // host: 'localhost',
        //是否启用HTTPS
        https: false,
        // 配置自动启动浏览器
        open: true,
        // 热更新
        hotOnly: true,
        //是否开启HOST地址检测
        disableHostCheck: false,
        proxy: {
            '/api': {
                target: 'http://120.55.59.187:3000',
                changeOrigin: true,// 允许跨域
                ws: true,
                pathRewrite: {'^/api': ''}
            }
        }
    }
};

