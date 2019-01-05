import Vue from 'vue';
import Router from 'vue-router';
import Login from '@/components/login/LoginIndex';
import MenuList from '@/components/menu/MenuList';
import Carousel  from '@/components/Carousel';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/menu',
      name: 'MenuList',
      component: MenuList
    },{
      path: '/carousel',
      name: 'Carousel',
      component: Carousel
    },{
      path: '/',
      name: 'login',
      component: Login
    }
  ]
})
