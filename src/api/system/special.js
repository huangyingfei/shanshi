import request from '@/router/axios';

export const getList = () => {
  return request({
    url: '/api/blade-food/specialpeople/list',
    method: 'get',
  })
}

export const remove = (id) => {
  return request({
    url: '/api/blade-food/specialpeople/remove',
    method: 'get',
    params: {
      id,
    }
  })
}

export const getClassStudent = () => {
  return request({
    url: '/api/blade-food/specialpeople/getClassStudent',
    method: 'get',
  })
}
export const detailByPeopleId = (id) => {
  return request({
    url: '/api/blade-food/specialpeople/detailByPeopleId',
    method: 'get',
    params: {
      id,
    }
  })
}

export const calAgeByStudentIds = (ids) => {
  return request({
    url: '/api/blade-food/specialpeople/calAgeByStudentIds',
    method: 'get',
    params: {
      ids,
    }
  })
}



export const submit = (row) => {
  return request({
    url: '/api/blade-food/specialpeople/submit',
    method: 'post',
    data: row
  })
}
