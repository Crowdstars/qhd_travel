import request from '@/utils/request'

/**
 * 1.登录(POST)-登录接口
 * @param username 用户名
 * @param password 密码
 */
export function loginByUsername(username, password) {
    let data = {username, password};
    return request({
        url: '/api/login',
        method: 'post',
        data
    })
}

/**
 * 登出接口(当前未启用)
 */
export function logout() {
    return request({
        url: '/api/logout',
        method: 'post'
    })
}

/**
 * 2.获取个人信息(POST)-获取当前登录用户信息
 * @param token
 */
export function getUserInfo(token) {
    const data = {token};
    return request({
        url: '/api/getuser',
        method: 'post',
        data
    })
}

