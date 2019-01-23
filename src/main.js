import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';


axios.defaults.withCredentials = true;
axios.defaults.baseURL = process.env.API_ROOT;
Vue.config.productionTip = false;
Vue.use(ElementUI, {size: 'small', zIndex: 3000});
Vue.use(router);
Vue.prototype.axios = axios;



router.beforeEach((to, from, next) => {
  if (to.meta.requireAuthor) {
    console.log(to.path + " 需要权限验证~！");
    const data = window.localStorage.getItem("LOGIN_USER");
    if (data != null) {
      console.log(to.path + "已校验登录权限 ~！");
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    console.log(to.path + "不需要权限验证~！");
    next();
  }
});

new Vue({
  el: '#app',
  router,
  components: {App},
  template: '<App/>'
});
