import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home';
import Select from '../views/Select';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/select',
    name: 'select',
    component: Select
  },
  {
    path: '/options',
    name: 'options'
  }
]

const router = new VueRouter({
  routes
})

export default router
