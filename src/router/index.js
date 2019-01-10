import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/login/LoginIndex';
import MenuList from '@/components/menu/MenuList';
import UserList from '@/components/user/UserList';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },{
      path: '/user',
      name: 'UserList',
      component: UserList
    },{
      path: '/menu',
      name: 'MenuList',
      component: MenuList
    }
  ]
})
