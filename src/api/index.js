import Request from '../utils/request'
import qs from 'qs';
export function login(userInfo) {
  console.log('登录', userInfo)
  return Request({
    url: '/user/login',
    method: 'post',
    data: qs.stringify(userInfo),
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}

export function register(userInfo) {
  console.log('注册', userInfo)
  let data = userInfo
  return Request({
    url: '/user/register',
    method: 'post',
    data: data
  })
}

export function getUser() {
  console.log('请求所有用户')
  return Request({
    url: '/user/all',
    method: 'get'
  })
}

export function getCourse() {
  console.log('请求所有课程')
  return Request({
    url: '/course/all',
    method: 'get'
  })
}

export function addCourse(courseInfo) {
  console.log('添加课程', courseInfo)
  let data = courseInfo
  return Request({
    url: '/course/add',
    method: 'post',
    data: data
  })
}

export function getSelectCourse() {
  console.log('查询选课')
  return Request({
    url: '/selectCourse/all',
    method: 'get',
  })
}

export function selectCourse(selectCourse) {
  console.log('选课', selectCourse)
  let data = selectCourse
  return Request({
    url: '/selectCourse/select',
    method: 'post',
    data: data
  })
}

export function getCourseStudent(courseId) {
  console.log('课程学生', courseId)
  let data = {
    id: courseId
  }
  return Request({
    url: '/selectCourse/getStudentByCourseId',
    method: 'post',
    data:data
  })
}

export function getEvaluation(id) {
  console.log('评教结果', id)
  let data = {id}
  return Request({
    url: '/evaluation/all',
    method: 'get',
    data:data
  })
}

export function evaluation(evaluation) {
  console.log('评教', evaluation)
  let data = evaluation
  return Request({
    url: '/evaluation/add',
    method: 'post',
    data: data
  })
}

export function writeScore(data) {
  console.log('录入成绩', data)
  return Request({
    url: '/selectCourse/postCourseScore',
    method: 'post',
    data: data
  })
}