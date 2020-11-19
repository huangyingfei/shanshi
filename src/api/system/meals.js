import request from '@/router/axios';


export const mealList = (searchType,isPub,recipeName,isUse) => {
  return request({
    url: '/api/blade-food/recipe/list',
    method: 'get',
    params: {
      searchType,
      isPub,
      recipeName,
      isUse,
    }
  })
}
export const grantTree = () => {
  return request({
    url: '/api/blade-system/region/region-tree',
    method: 'get',
  })
}

export  const getDishByBaseId=(isPrivate,dishName,belongRegion,season,isUse,typeTemp)=>{
  return request({
    url: '/api/blade-food/basetype/getDishByBaseId',
    method: 'get',
    params: {
      isPrivate,
      dishName,
      belongRegion,
      season,
      isUse,
      typeTemp
    }
  })
}

export const dishDetail = (id) => {
  return request({
    url: '/api/blade-food/dish/dishDetail',
    method: 'get',
    params: {
    id
    }
  })
}


export const calRecipe = (recipe) => {
  return request({
    url: '/api/blade-food/recipe/calRecipe',
    method: 'post',
    data:recipe
  })
}

export const save = (row) => {
  return request({
    url: '/api/blade-food/recipe/save',
    method: 'post',
    data:row
  })
}
export const update = (row) => {
  return request({
    url: '/api/blade-food/recipe/update',
    method: 'post',
    data:row
  })
}

export const detail = (id) => {
  return request({
    url: '/api/blade-food/recipe/detail',
    method: 'get',
    params:{
      id
    }
  })
}








