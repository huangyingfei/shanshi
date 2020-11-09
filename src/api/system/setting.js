import request from '@/router/axios';

export const saveWeb = (params) => {
  return request({
    url: '/api/blade-system/web/submit',
    method: 'post',
    data: params
  })
}

export const getOneWeb = () => {
  return request({
    url: '/api/blade-system/web/getOneWeb',
    method: 'get',
  })
}
