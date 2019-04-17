import {param2Obj} from '@/utils'

const userMap = {
    admin: {
        code: 0,
        data: {
            token: 'admin',
            username: 'admin'
        },
        message: ''
    },
    editor: {
        code: 0,
        data: {
            token: 'editor',
            username: 'editor'
        },
        message: ''
    },
    tokenInvalid: {
        code: 8,
        data: {
            token: 'errorPwd',
            username: 'editor'
        },
        message: '登录令牌失效'
    },
    notFoundUser: {
        code: 9,
        data: {
            token: 'notFoundUser',
            username: 'editor'
        },
        message: '用户不存在'
    },
    errorPwd: {
        code: 10,
        data: {
            token: 'errorPwd',
            username: 'editor'
        },
        message: '用户密码错误'
    }
};

export default {
    loginByUsername: config => {
        const {username} = JSON.parse(config.body);
        return userMap[username] ? userMap[username] : userMap['notFoundUser']
    },
    getUserInfo: config => {
        let {token} = JSON.parse(config.body);
        // token = 1;
        if (userMap[token]) {
            return userMap[token]
        } else {
            return userMap['tokenInvalid']
        }
    },
    logout: () => 'success'
}
