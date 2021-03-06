import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-food/recipe/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
    }
  })
}

export const getDetail = (id) => {
  return request({
    url: '/api/blade-food/recipe/detail',
    method: 'get',
    params: {
      id
    }
  })
}
export const getRecipeDetail = (id) => {
  return request({
    url: '/api/blade-food/recipe/recipeDetail',
    method: 'get',
    params: {
      id
    }
  })
}

export function calRecipeDetail(){
  
}



export const remove = (ids) => {
  return request({
    url: '/api/blade-food/recipe/remove',
    method: 'get',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-food/recipe/save',
    method: 'post',
    data: row
  })
}


export const changeInfo = (id,isPub,isRecommend,isUse) => {
  return request({
    url: '/api/blade-food/recipe/changeInfo',
    method: 'get',
    params: {
      id,
      isPub,
      isRecommend,
      isUse
    }
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-food/recipe/update',
    method: 'post',
    data: row
  })
}

