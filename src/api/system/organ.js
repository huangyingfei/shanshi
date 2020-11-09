import request from '@/router/axios';

export const getList = (current, size, params) => {
    return request({
        url: '/api/blade-system/tenant/orgList',
      method: 'get',
      params: {
        ...params,
        current,
        size,
      }
    })
  }
  export const getPage = (current, size, params) => {
    return request({
        url: '/api/blade-system/tenant/page',
      method: 'get',
      params: {
        ...params,
        current,
        size,
      }
    })
  }
  export const getRoleTree = (tenantId) => {
    return request({
      url: '/api/blade-system/role/tree',
      method: 'get',
      params: {
        tenantId,
      }
    })
  }

  export const lazyList = (parentCode) => {
    return request({
      url: '/api/blade-system/region/lazy-list',
      method: 'get',
      params: {
        parentCode,
      }
    })
  }
  export const getNutritionList = () => {
    return request({
      url: '/api/blade-food/nutritionsetting/getList',
      method: 'get',
    })
  }


  export const getPowerSettingList = () => {
    return request({
      url: '/api/blade-food/powersetting/getList',
      method: 'get',
    })
  }

  export const add = (row) => {
    return request({
      url: '/api/blade-system/tenant/submit',
      method: 'post',
      data: row
    })
  }

  export const remove = (ids) => {
    return request({
      url: '/api/blade-system/tenant/remove',
      method: 'get',
      params: {
        ids,
      }
    })
  }
  

  export const getDeptTree = () => {
    return request({
      url: '/api/blade-system/dept/tree',
      method: 'get',
    })
  }


  export const tenantEnable = (id,status) => {
    return request({
      url: '/api/blade-system/tenant/enable?id='+id+"&status="+status,
      method: 'get',
    })
  }


  export const tenantDetail = (id) => {
    return request({
      url: '/api/blade-system/tenant/detail',
      method: 'get',
      params:{id}
    })
  }

  

