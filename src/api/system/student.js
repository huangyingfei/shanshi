import request from '@/router/axios';

export const tree = () => {
  return request({
    url: '/api/blade-food/class/tree',
    method: 'get',
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-food/class/save',
    method: 'post',
    data: row
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-food/class/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}


export const update = (row) => {
  return request({
    url: '/api/blade-food/class/update',
    method: 'post',
    data: row
  })
}


export const orderClass = (rows) => {
  return request({
    url: '/api/blade-food/class/upClassListOrder',
    method: 'post',
    data: rows
  })
}

export const getList = (current, size, params,classId) => {
  return request({
    url: '/api/blade-food/student/page',
    method: 'post',
    data: {
      ...params,
      current,
      size,
      classId
    }
  })
}


export const removeStuId = (rows) => {
  return request({
    url: '/api/blade-food/student/remove',
    method: 'post',
    data: rows
  })
}



export const save = (row) => {
  return request({
    url: '/api/blade-food/student/save',
    method: 'post',
    data: row
  })
}

export const updateStu = (row) => {
  return request({
    url: '/api/blade-food/student/update',
    method: 'post',
    data: row
  })
}



export const detail = (id) => {
  return request({
    url: '/api/blade-food/student/detail?id='+id,
    method: 'get',

  })
}


export const getById = (id) => {
  return request({
    url: '/api/blade-food/class/getById?classId='+id,
    method: 'get',

  })
}

export const getChildNo = (student) => {
  return request({
    url: '/api/blade-food/student/getChildNo',
    method: 'post',
    data:student
  })
}


export const createClass = (row) => {
  return request({
    url: '/api/blade-food/class/createClass',
    method: 'post',
    data: row
  })
}



