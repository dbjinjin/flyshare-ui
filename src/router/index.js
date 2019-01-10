import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/login/LoginIndex';
import MenuList from '@/components/menu/MenuList';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/menu',
      name: 'MenuList',
      component: MenuList
    },{
      path: '/',
      name: 'login',
      component: Login
    }
  ]
})
