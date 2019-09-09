import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/Home'
import LoginPage from '../views/login/LoginPage'
import Pagina1 from '../views/pagina1/Pagina1'
import Pagina2 from '../views/pagina2/Pagina2'
import Pagina3 from '../views/pagina3/Pagina3'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home Page', component: Home },
    { path: '/login', component: LoginPage },
    { path: '/pagina1', name: 'Pagina 1', component: Pagina1 },
    { path: '/pagina2', name: 'Pagina 2', component: Pagina2 },
    { path: '/pagina3', name: 'Pagina 3', component: Pagina3 },
    { path: '*', redirect: '/' }
  ]
})

router.beforeEach((to, from, next) => {
  // redirect to login page if not logged in and trying to access a restricted page
  // COLOCAR PARA REDIRECIONAR AO SISTEMA DE LOGIN
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('usuario')
  if (authRequired && !loggedIn) {
    return next('/login')
  }
  next()
})
