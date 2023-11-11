import request from '@/utils/request.js'
// import { useTokenStore } from '@/stores/token.js'

// 查询文章分类
export const categoryListService = () => {
    // const tokenStore = useTokenStore();
    // return request.get('/category', { headers: { 'Authorization': tokenStore.token } });
    return request.get('/category');
}

// 添加文章分类
export const categoryAddService = (categoryData) => {
    return request.post('/category', categoryData);
}

// 修改文章分类
export const categoryUpdateService = (categoryData) => {
    return request.put('/category', categoryData);
}

// 删除文章分类
export const categoryDeleteService = (id) => {
    return request.delete('/category?id=' + id);
}
