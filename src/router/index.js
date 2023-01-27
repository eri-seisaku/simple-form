import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignUpView from '../views/SignUpView.vue'
import LoginView from '../views/LoginView.vue'
import ReserveView from '../views/reserve/ReserveView.vue'
import ResultView from '../views/ResultView.vue'
import AdminView from '../views/admin/AdminView.vue'
import PracticeView from '../views/PracticeView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignUpView
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginView
  },
  {
    path: '/reserve',
    name: 'reserve',
    component: ReserveView
  },
  {
    path: '/result',
    name: 'result',
    component: ResultView
    // component: () => import(/* webpackChunkName: "about" */ '../views/ResultView.vue') // この書き方の意味を調べること
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminView
  },
  {
    path: '/practice',
    name: 'practice',
    component: PracticeView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
