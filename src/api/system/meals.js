import request from '@/router/axios';


export const mealList = (searchType,isPub,recipeName,isUse,recipeCategory,isRecommend,current,size) => {
  return request({
    url: '/api/blade-food/recipe/list',
    method: 'get',
    params: {
      current,
      size,
      searchType, //1公共食谱
      isPub,//是否公开(0-公开 1-不公开不分享,2-不公开要分享)
      recipeName,
      isUse,//(0-不收藏 1-收藏)
      recipeCategory,//1-学生食谱 2-教职工食谱
      isRecommend//推荐0-不推荐 1-推荐

    }
  })
}
export const grantTree = () => {
  return request({
    url: '/api/blade-system/region/region-tree',
    method: 'get',
  })
}

export  const getDishByBaseId=(isPrivate,typeTemp,dishName,belongRegion,season,isUse)=>{
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


export const jundgeFood=(data)=>{
  return request({
    url: '/api/blade-food/recipe/jundgeFood',
    method: 'post',
    data:data
  })
}

export const jundgeAllergy=(data)=>{
  return request({
    url: '/api/blade-food/recipe/jundgeAllergy',
    method: 'post',
    data:data
  })
}




