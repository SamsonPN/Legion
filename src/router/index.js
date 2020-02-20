import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login';
import Home from '../views/Home';
import Select from '../views/Select';
import FAQ from '../views/FAQ';
import Options from '../views/Options';

Vue.use(VueRouter);

const routes = [
  {
    path:'/',
    name: 'login',
    component: Login
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/select',
    name: 'select',
    component: Select
  },
  {
    path: '/faq',
    name: 'faq',
    component: FAQ
  },
  {
    path: '/options',
    name: 'options',
    component: Options
  }
]

const router = new VueRouter({
  routes
})

export default router
