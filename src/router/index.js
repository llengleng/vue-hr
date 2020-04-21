import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/Login'
// import Home from '../views/Home'


Vue.use(VueRouter)

  const routes = [
  {
      path: "/",
      redirect: '/login'
  },
  {
    path: "/login",
    name:"登录",
    component: () => import('../views/Login.vue'),
    hidden: true
  },
  {
    path:"/home",
    name:"主页",
    component: () => import("../views/Home.vue"),
    hidden: true
  }

 
]

const router = new VueRouter({
  routes
})

export default router
