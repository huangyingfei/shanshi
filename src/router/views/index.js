import Layout from "@/page/index/";

export default [
  {
    path: "/wel",
    component: Layout,
    redirect: "/wel/index",
    children: [
      {
        path: "index",
        name: "首页",
        meta: {
          i18n: "dashboard",

        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/wel/index")
      },
      {
        path: "dashboard",
        name: "控制台",
        meta: {
          i18n: "dashboard",
          menu: false
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/wel/dashboard")
      }
    ]
  },
  // {
  //   path: "/desk",
  //   component: Layout,
  //   redirect: "/desk/settings/addedmtp",
  //   children: [
  //     {
  //       path: "addedmtp",
  //       name: "新增营养素建议摄入量设置",
  //       meta: {
  //         i18n: "test"
  //       },
  //       component: () =>
  //         import(
  //           /* webpackChunkName: "views" */ "@/views/desk/settings/addedmtp"
  //         )
  //     }
  //   ]
  // },
  {
    path: "/test",
    component: Layout,
    redirect: "/test/index",
    children: [
      {
        path: "index",
        name: "测试页",
        meta: {
          i18n: "test"
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/util/test")
      }
    ]
  },
  {
    path: "/dict-horizontal",
    component: Layout,
    redirect: "/dict-horizontal/index",
    children: [
      {
        path: "index",
        name: "字典管理",
        meta: {
          i18n: "dict"
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/util/demo/dict-horizontal"
          )
      }
    ]
  },
  {
    path: "/dict-vertical",
    component: Layout,
    redirect: "/dict-vertical/index",
    children: [
      {
        path: "index",
        name: "字典管理",
        meta: {
          i18n: "dict"
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/util/demo/dict-vertical"
          )
      }
    ]
  },
  {
    path: "/info",
    component: Layout,
    redirect: "/info/index",
    children: [
      {
        path: "index",
        name: "个人信息",
        meta: {
          i18n: "info"
        },
        component: () =>
          import(/* webpackChunkName: "views" */ "@/views/system/userinfo")
      }
    ]
  },
  {
    path: "/work/process/leave",
    component: Layout,
    redirect: "/work/process/leave/form",
    children: [
      {
        path: "form/:processDefinitionId",
        name: "请假流程",
        meta: {
          i18n: "work"
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/work/process/leave/form"
          )
      },
      {
        path: "handle/:taskId/:processInstanceId/:businessId",
        name: "处理请假流程",
        meta: {
          i18n: "work"
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/work/process/leave/handle"
          )
      },
      {
        path: "detail/:processInstanceId/:businessId",
        name: "请假流程详情",
        meta: {
          i18n: "work"
        },
        component: () =>
          import(
            /* webpackChunkName: "views" */ "@/views/work/process/leave/detail"
          )
      }
    ]
  },
  {
    path: "/oprate",
    component: Layout,
    redirect: "/oprate/addStudent",
    children: [
      {
        path: "addStudent",
        name: "学生信息",
        component: () =>
          import(/* webpackChunkName: "views" */  "@/views/organ/recipeManager/studentInfo")
      }
    ]
  },
  // {
  //   path: "/editMeals",
  //   component: Layout,
  //   redirect: "/editMeals/editMeals",
  //   children: [
  //     {
  //       path: "editMeals",
  //       name: "编辑智能配餐",
  //       component: () =>
  //         import(/* webpackChunkName: "views" */  "@/views/message/meals")
  //     }
  //   ]
  // },
  {
    path: "/recipeManager",
    component: Layout,
    children: [
      {
        path: "auditRecipeConfirm/auditRecipeConfirm",
        name: "确认审核",
        component: () =>
          import(/* webpackChunkName: "views" */  "@/views/recipeManager/auditRecipeConfirm/auditRecipeConfirm")
      },
      {
        path: "addstudenttallergy",
        name:"新增过敏信息",
        component: () =>
          import(/* webpackChunkName: "views" */  "@/views/recipeManager/addstudenttallergy")
      },
      {
        path: "addstudenttallergy2",
        name:"修改过敏信息",
        component: () =>
          import(/* webpackChunkName: "views" */  "@/views/recipeManager/addstudenttallergy")
      }
    ],

  },
]
