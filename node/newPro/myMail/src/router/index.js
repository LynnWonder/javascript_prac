import Vue from 'vue';
import Router from 'vue-router';
import HelloWorld from '@/components/HelloWorld';
import GoodList from '../components/GoodList';
import Title from '../components/Title';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld,
    },
    {
      path: '/good',
      name: 'GoodList',
      component: GoodList,
      children: [
        {
          path: 'title',
          name: 'GoodListTitle',
          component: Title,
        },
      ],
    },
  ],
});
