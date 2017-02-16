import Router from 'vue-router';
import Vue from 'vue';

import Goods from 'components/goods/goods';
import Ratings from 'components/ratings/ratings';
import Seller from 'components/seller/seller';

Vue.use(Router);
const routes = [{
  path: '/',
  redirect: '/goods'
}, {
  path: '/goods',
  component: Goods
}, {
  path: '/ratings',
  component: Ratings
}, {
  path: '/seller',
  component: Seller
}];
export default new Router({
  routes,
  linkActiveClass: 'active'
});
