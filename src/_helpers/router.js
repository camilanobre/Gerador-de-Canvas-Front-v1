import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/home/Home'
import LoginPage from '../views/login/LoginPage'
import ComoCriarPage from '../views/comoCriarCanvas/ComoCriarPage'
import IniciarProjetoPage from '../views/iniciarProjeto/IniciarProjetoPage'
import SobrePage from '../views/sobre/SobrePage'

Vue.use(Router)

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home Page', component: Home },
    { path: '/login', component: LoginPage },
    { path: '/comoCriar', name: 'Como criar um Canvas?', component: ComoCriarPage },
    { path: '/iniciarProjeto', name: 'Iniciando um projeto :)', component: IniciarProjetoPage },
    { path: '/Sobre', name: 'Sobre nós', component: SobrePage },
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
