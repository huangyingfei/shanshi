import request from '@/router/axios';


export const mealList = (isPub) => {
  return request({
    url: '/api/blade-food/recipe/list',
    method: 'get',
    params: {
      isPub,
    }
  })
}
