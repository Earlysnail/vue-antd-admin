import Vue from 'vue'
import Router from 'vue-router'
import PageView from '@/layouts/PageView'
import RouteView from '@/layouts/RouteView'
import MenuView from '@/layouts/MenuView'
import Login from '@/pages/login/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: '登录页',
      component: Login,
      invisible: true
    },
    {
      path: '/',
      name: '首页',
      component: MenuView,
      redirect: '/login',
      icon: 'none',
      invisible: true,
      children: [
        {
          path: '/用户管理',
          name: '用户管理',
          role: [1, 2, 3],
          component: RouteView,
          icon: 'dashboard',
          children: [
            {
              path: '/user/userinfo',
              name: '个人信息',
              role: [1, 2, 3],
              component: () => import('@/pages/user/UserInfo'),
              icon: 'none'
            },
            {
              path: '/user/list',
              name: '用户列表',
              role: [1],
              component: () => import('@/pages/user/List'),
              icon: 'none'
            }
          ]
        },
        {
          path: '/成绩管理',
          name: '成绩管理',
          role: [2, 3],
          component: RouteView,
          icon: 'dashboard',
          children: [
            {
              path: '/score/scorelist',
              name: '成绩列表',
              role: [2, 3],
              component: () => import('@/pages/score/ScoreList'),
              icon: 'none'
            },
            {
              path: '/score/scoreentry',
              name: '成绩录入',
              role: [2],
              component: () => import('@/pages/score/ScoreEntry'),
              icon: 'none'
            }
          ]
        },
        {
          path: '/教学评估',
          name: '教学评估',
          role: [1, 3],
          component: RouteView,
          icon: 'dashboard',
          children: [
            {
              path: '/evaluation/evaluationscreen',
              name: '教学评估',
              role: [3],
              component: () => import('@/pages/evaluation/EvaluationScreen'),
              icon: 'none'
            }, {
              path: '/evaluation/evaluationresult',
              name: '教评结果',
              role: [1],
              component: () => import('@/pages/evaluation/EvaluationResult'),
              icon: 'none'
            }
          ]
        },
        {
          path: '/课程管理',
          name: '课程管理',
          role: [1, 2, 3],
          component: RouteView,
          icon: 'dashboard',
          children: [
            {
              path: '/course/coursemanage',
              name: '所有课程',
              role: [1, 2],
              component: () => import('@/pages/course/CourseManage'),
              icon: 'none'
            },
            {
              path: '/course/courselist',
              name: '查看课程',
              role: [3],
              component: () => import('@/pages/course/CourseList'),
              icon: 'none'
            },
            {
              path: '/course/selectCourse',
              name: '选课',
              role: [3],
              component: () => import('@/pages/course/SelectCourse'),
              icon: 'none'
            },

          ]
        }
      ]
    }
  ]
})
