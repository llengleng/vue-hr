import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'font-awesome/css/font-awesome.css'

import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import ElementUI, { MessageBox } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


import {postKeyValueRequest,getRequest,postRequest,
putRequest,deleteRequest} from './utils/api'
import {initMenu} from './utils/menus'

Vue.prototype.postKeyValueRequest = postKeyValueRequest;
Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.deleteRequest = deleteRequest;


Vue.use(ElementUI)
Vue.config.productionTip = false



//路由的前置导航守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/') {
    next();
  } else {
    if(window.sessionStorage.getItem('user')) {
      initMenu(router, store)
      console.log(to)
      console.log(from)
      next()
    } else {
      // 未登录用户跳转到登录页
      next('/?redirect=' + to.path)
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
