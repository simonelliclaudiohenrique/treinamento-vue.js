import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/layout/'),
    children: [
      {
        path: '',
        redirect: '/inicio'
      },
      {
        path: '/inicio',
        name: 'Início',
        component: () => import('@/views/home/')
      },
      {
        path: 'cadastro/produto',
        name: 'Pagina Cadastro de Produto',
        component: () => import('@/views/produto/')
      }
    ],
    beforeEnter: (to, from, next) => localStorage.getItem('treinamento:token') ? next() : next('/login')
  },
  {
    path: '/login',
    component: () => import('@/views/auth/'),
    children: [
      {
        path: '',
        name: 'Login',
        component: () => import('@/views/auth/')
      }
    ],
    beforeEnter: (to, from, next) => localStorage.getItem('treinamento:token') ? next('/') : next()
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
