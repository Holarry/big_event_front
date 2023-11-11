import request from '@/utils/request.js'

// 查询文章
export const articleListService = (params) => {
    return request.get('/article', { params: params });
}

// 添加文章
export const articleAddService = (articleData) => {
    return request.post('/article', articleData);
}

// 编辑文章
export const articleUpdateService = (articleData) => {
    return request.put('/article', articleData);
}

// 删除文章
export const articleDeleteService = (id) => {
    return request.delete('/article?id=' + id);
}