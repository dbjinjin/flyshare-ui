import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';

axios.defaults.withCredentials=true;


//axios.defaults.baseURL="https://106.13.61.81:8553/flyshare/";
axios.defaults.baseURL="http://127.0.0.1:8081/flyshare/";

Vue.config.productionTip = false;
Vue.use(ElementUI,{ size: 'small', zIndex: 3000 });
Vue.use(router);

Vue.prototype.axios = axios;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
