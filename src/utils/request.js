import axios from 'axios'
import {MessageBox, Message} from 'element-ui'
import store from '@/store'
import config from '@/config'
import {getToken} from '@/utils/auth'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 创建axios实例
const service = axios.create({
    baseURL: config.baseUrl, // api 的 base_url
    timeout: 30000, // request timeout
    withCredentials: false, // 表示跨域请求时是否需要使用凭证
});

// request interceptor
service.interceptors.request.use(
    config => {
        // Do something before request is sent
        if (store.getters.token) {
            // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
            config.headers['Authorization'] = 'Bearer ' + getToken()
        }
        return config
    },
    error => {
        // Do something with request error
        console.log(error); // for debug
        Promise.reject(error)
    }
);

// response interceptor
service.interceptors.response.use(
    // response => response,
    /**
     * 下面的注释为通过在response里，自定义code来标示请求状态
     * 当code返回如下情况则说明权限有问题，登出并返回到登录页
     * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
     * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
     */
    response => {
        const res = response.data;
        if (res.code !== 0) {
            Message({
                message: res.message,
                type: 'error',
                duration: 5 * 1000
            });
            // 8:登录令牌失效;
            if (res.code === 8 || res.code === 50012 || res.code === 50014) {
                // 请自行在引入 MessageBox
                // import { Message, MessageBox } from 'element-ui'
                MessageBox.confirm('您的登录信息已失效，请重新登录', '提示', {
                    showClose: false,
                    showCancelButton: false,
                    confirmButtonText: '确定',
                    type: 'warning'
                }).then(() => {
                    store.dispatch('FedLogOut').then(() => {
                        location.reload() // 为了重新实例化vue-router对象 避免bug
                    })
                })
            }
            return Promise.reject('error')
        } else {
            return response.data
        }
    },
    error => {
        console.log('err:' + error); // for debug
        Message({
            message: '网络繁忙,请稍后再试',
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error)
    }
);

export default service
