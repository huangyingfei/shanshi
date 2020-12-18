import request from '@/router/axios';

export const getList = (current, size, params) => {
  return request({
    url: '/api/blade-food/studentallergy/page',
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
    url: '/api/blade-food/studentallergy/detail',
    method: 'get',
    params: {
      id
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-food/studentallergy/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-food/studentallergy/save',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-food/studentallergy/update',
    method: 'post',
    data: row
  })
}

export const getTree = (id) => {
  return request({
    url: '/api/blade-food/class/getStudent',
    method: 'get',
    params: {
    }
  })
}

export const getStudentClass = (id) => {
  return request({
    url: '/api/blade-food/class/getStudentClass',
    method: 'get',
    params: {
      id
    }
  })
}

export const getFoodByBaseId = (isPrivate,foodName) => {
  let url='';
  if(foodName){
    url='/api/blade-food/basetype/getFoodByBaseId?isPrivate='+isPrivate+'&foodName='+foodName;
  }else{
    url='/api/blade-food/basetype/getFoodByBaseId?isPrivate='+isPrivate;
  }
  return request({
    url: url,
    method: 'get',
  })
}


