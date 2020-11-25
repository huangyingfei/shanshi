import request from '@/router/axios';

//获取平台端审核食谱列表
export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-food/recipe/getAuditRecipeList',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}


