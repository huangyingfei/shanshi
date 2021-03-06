export default {
  column: [{
    label: '个人信息',
    prop: 'info',
    option: {
      submitText: '修改',
      column: [{
        label: '头像',
        type: 'upload',
        listType: 'picture-img',
        propsHttp: {
          res: 'data',
          url: 'link',
        },
        canvasOption: {
          text: ' ',
          ratio: 0.1
        },
        action: '/api/blade-resource/oss/endpoint/put-file',
        tip: '建议上传180 x 180px的图片',
        span: 12,
        row: true,
        prop: 'avatar'
      }, {
        label: '姓名',
        span: 12,
        row: true,
        prop: 'name'
      }, {
        label: '用户名',
        span: 12,
        row: true,
        prop: 'realName'
      }, {
        label: '手机号',
        span: 12,
        row: true,
        prop: 'phone'
      }, {
        label: '邮箱',
        prop: 'email',
        span: 12,
        row: true,
      },  {
        label: '角色',
        prop: 'roleName',
        span: 12,
        row: true,
        disabled:true,
      }]
    }
  }, {
    label: '修改密码',
    prop: 'password',
    option: {
      submitText: '修改',
      column: [{
        label: '原密码',
        span: 12,
        row: true,
        type: 'password',
        prop: 'oldPassword'
      }, {
        label: '新密码',
        span: 12,
        row: true,
        type: 'password',
        prop: 'newPassword'
      }, {
        label: '确认密码',
        span: 12,
        row: true,
        type: 'password',
        prop: 'newPassword1'
      }]
    }
  }]
}
