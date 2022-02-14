import { createRouter, createWebHistory, Router } from 'vue-router'


const Login = () => import('../views/Login/index.vue')
const Dashboard = () => import('../views/Dashboard/index.vue')
const Exercicios = () => import('../views/Exercicios/index.vue')

const routes = [

  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },

  {
    path: '/exercicios',
    name: 'Exercicios',
    component: Exercicios
  },

  {
    path: '/',
    name: 'home',
    component: Login
  },



  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home' }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
