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

//获取选择人群数据
export const getSpecialPeopleList = (tenantId) => {
  return request({
    url: '/api/blade-food/specialpeople/list',
    method: 'get',
    params: {
      tenantId
    }
  })
}
//获取食谱数据
export const detail = (id) => {
  return request({
    url: '/api/blade-food/recipe/detail',
    method: 'get',
    params:{
      id
    }
  })
}

//计算分数
export const calRecipe = (recipe) => {
  return request({
    url: '/api/blade-food/recipe/calRecipe',
    method: 'post',
    data:recipe
  })
}

//确定审核食谱
export const auditRecipe = (params) => {
  return request({
    url: '/api/blade-food/recipe/audit',
    method: 'post',
    params: {
      ...params,
      // id: params.id,      //食谱主键
      // status: params.status,       //1-审核通过 2-不通过 
      // refuseReason: params.refuseReason //拒绝原因
    }
  })
}

