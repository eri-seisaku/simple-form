import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ResultView from '../views/ResultView.vue'
import PracticeView from '../views/PracticeView.vue'
import PracticeView2 from '../views/PracticeView2.vue'
import ErrorView from '../views/ErrorView.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/result',
    name: 'result',
    component: ResultView
    // component: () => import(/* webpackChunkName: "about" */ '../views/ResultView.vue') // この書き方の意味を調べること
  },
  {
    path: '/practice',
    name: 'practice',
    component: PracticeView
  },
  {
    path: '/practice2',
    name: 'practice2',
    component: PracticeView2
  },
  {
    path: '/error',
    name: 'error',
    component: ErrorView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
