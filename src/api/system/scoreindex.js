import request from '@/router/axios';


export const getList = (current, size, params) => {
    return request({
      url: '/api/blade-food/scoreindex/list',
      method: 'get',
      params: {
        ...params,
        current,
        size,
        
      }
    })
  }

export const add = (row) => {
    return request({
        url: '/api/blade-food/scoreindex/save',
        method: 'post',
        data: row
    })
}

export const update = (row) => {
    return request({
        url: '/api/blade-food/scoreindex/update',
        method: 'post',
        data: row
    })
}

export const remove = (ids) => {
    return request({
      url: '/api/blade-food/scoreindex/remove',
      method: 'post',
      params: {
        ids,
      }
    })
  }