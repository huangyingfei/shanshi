import request from '@/router/axios';

export const tree = () => {
    return request({
    url: '/api/blade-food/nutrition/tree',
      method: 'get',
    })
  }

  

  export const save = (data) => {
    return request({
    url: '/api/blade-food/tenantnutrition/save',
      method: 'post',
      data
    })
  }


  export const list = (data) => {
    return request({
    url: '/api/blade-food/tenantnutrition/list',
      method: 'get',
    })
  }