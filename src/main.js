import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from 'axios';

axios.defaults.baseURL="http://192.168.1.6:8081/flyshare";

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.axios = axios;

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
