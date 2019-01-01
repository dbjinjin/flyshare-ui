import Vue from 'vue';
import Router from 'vue-router';
import MenuList from '@/components/menu/MenuList';
import Carousel  from '@/components/Carousel';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MenuList',
      component: MenuList
    },{
      path: '/carousel',
      name: 'Carousel',
      component: Carousel
    }
  ]
})
