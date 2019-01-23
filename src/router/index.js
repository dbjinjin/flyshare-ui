import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/components/Index';
import Login from '@/components/login/LoginIndex';
import UserMangement from '@/components/user/UserList';
import UserRegister from '@/components/user/UserRegister';

import FontHeader from '@/components/common/font/FontHeader';
import FontFooter from '@/components/common/font/FontFooter';
import BackHeader from '@/components/common/back/BackHeader';
import BackFooter from '@/components/common/back/BackFooter';

Vue.use(Router);
Vue.component('font-header', FontHeader);
Vue.component('font-footer', FontFooter);
Vue.component('back-header', BackHeader);
Vue.component('back-footer', BackFooter);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/register',
      name: 'register',
      component: UserRegister,
    }, {
      path: '/user',
      name: 'User',
      component: UserMangement,
      meta: {
        requireAuthor: true
      }
    }
  ]
})
