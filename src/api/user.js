import request from '@/utils/request.js'

// 注册接口的函数
export const userRegisterService = (registerData) => {
    const params = new URLSearchParams()
    for (let key in registerData) {
        params.append(key, registerData[key]);
    }

    return request.post('/user/register', params);
}

// 登录接口的函数
export const userLoginService = (loginData) => {
    const params = new URLSearchParams()
    for (let key in loginData) {
        params.append(key, loginData[key]);
    }

    return request.post('/user/login', params);
}

// 获取用户详细信息
export const userInfoService = () => {
    return request.get('user/getDetailInfo');
}

// 修改个人基本信息
export const userInfoUpdateService = (userInfoData) => {
    return request.put('/user/updateBasicInfo', userInfoData)
}

// 修改头像
export const userAvatarUpdateService = (avatarUrl) => {
    return request.patch('/user/updateAvatar?avatarUrl=' + avatarUrl);
}

// 修改密码
export const userPwdUpdateService = (pwdData) => {
    return request.patch('/user/updatePassword', pwdData)
}