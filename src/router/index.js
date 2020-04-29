import Vue from 'vue'
import VueRouter from 'vue-router'
// import Login from '../views/Login'
// import Home from '../views/Home'


Vue.use(VueRouter)

  const routes = [
  // {
  //     path: "/",
  //     redirect: '/login'
  // },
  {
    path: "/",
    name: "登录",
    component: () => import('../views/Login.vue'),
    hidden: true
  },
  {
    path:"/home",
    name:"首页",
    component: () => import("../views/Home.vue"),
    hidden: true
  }
]



// const routes = [
//   {
//    path: '/',
//    name: 'Login', 
//    component: Login, 
//    hidden: true 
//   },{ 
//    path: '/home',
//    name: 'Home', 
//    component: Home, 
//    hidden: true 
//   }
// ]

const router = new VueRouter({
  routes
})

export default router
