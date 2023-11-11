// 导入axios
import axios from 'axios';
// 定义公共前缀
//const baseURL = 'http://localhost:8080';
const baseURL = '/api';
const instance = axios.create({baseURL});

import { ElMessage } from 'element-plus';
import {useTokenStore} from '@/stores/token.js';

import router from '@/router';

// 添加请求拦截器
instance.interceptors.request.use(
    (config) => {
        // 请求前的回调
        const tokenStore = useTokenStore(); // 添加token

        // 判断是否有token
        if(tokenStore.token) {
            config.headers.Authorization = tokenStore.token;
        }

        return config;
    },
    (err) => {
        Promise.reject(err);
    }
)

// 添加响应拦截器
instance.interceptors.response.use(
    result=>{
        return result.data;
    },
    err=>{
        // 判断响应状态码
        if(err.response.status===401) {
            ElMessage.error('请先登录');
            router.push('/login');
        } else{
            // alert('出错了');
            ElMessage.error('出错了');
        }
        return Promise.reject(err); // 异步的状态转化成失败的状态
    }
)

export default instance;