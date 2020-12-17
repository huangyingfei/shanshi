import request from '@/router/axios';

export const getList = (current, size, params, deptId) => {
  return request({
    url: '/api/blade-user/page',
    method: 'get',
    params: {
      ...params,
      current,
      size,
      deptId,
    }
  })
}

export const remove = (ids) => {
  return request({
    url: '/api/blade-user/remove',
    method: 'post',
    params: {
      ids,
    }
  })
}

export const add = (row) => {
  return request({
    url: '/api/blade-user/submit',
    method: 'post',
    data: row
  })
}

export const update = (row) => {
  return request({
    url: '/api/blade-user/update',
    method: 'post',
    data: row
  })
}

export const getUser = (id) => {
  return request({
    url: '/api/blade-user/detail',
    method: 'get',
    params: {
      id,
    }
  })
}

export const getUserInfo = () => {
  return request({
    url: '/api/blade-user/info',
    method: 'get',
  })
}

export const resetPassword = (userIds) => {
  return request({
    url: '/api/blade-user/reset-password',
    method: 'post',
    params: {
      userIds,
    }
  })
}

export const updatePassword = (oldPassword, newPassword, newPassword1) => {
  return request({
    url: '/api/blade-user/update-password',
    method: 'post',
    params: {
      oldPassword,
      newPassword,
      newPassword1,
    }
  })
}

export const updateInfo = (row) => {
  return request({
    url: '/api/blade-user/update-info',
    method: 'post',
    data: row
  })
}

export const grant = (userIds, roleIds) => {
  return request({
    url: '/api/blade-user/grant',
    method: 'post',
    params: {
      userIds,
      roleIds,
    }
  })
}

export const checkInfo = (param) => {
  return request({
    url: '/api/blade-user/checkInfo',
    method: 'post',
    data:param
  })
}


export const sendMsg = (phone) => {
  return request({
    url: '/api/blade-user/send-msg',
    method: 'get',
    params: {
      phone,
    }
  })
}


export const vilateCode = (param) => {
  return request({
    url: '/api/blade-user/vilate-code',
    method: 'post',
    data:param
  })
}
export const vilatePhone = (param) => {
  return request({
    url: '/api/blade-user/vilate-phone',
    method: 'post',
    data:param
  })
}

