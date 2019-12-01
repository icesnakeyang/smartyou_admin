import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

import guestLayout from "@/pages/layout/guestLayout";
import register from "@/pages/user/register/register";
import baseFooter from "@/pages/layout/baseFooter";
import login from "@/pages/user/login/login";
import baseHeader from "@/pages/layout/baseHeader";
import dashboard from "@/pages/dashboard";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: guestLayout,
      children: [
        {
          path: 'register',
          name: 'register',
          components: {
            header: baseHeader,
            content: register,
            footer: baseFooter
          }
        },
        {
          path: 'login',
          name: 'login',
          components: {
            header: baseHeader,
            content: login,
            footer: baseFooter
          }
        },
        {
          path:'dashboard',
          name:'dashboard',
          components:{
            header:baseHeader,
            content:dashboard,
            footer:baseFooter
          }
        }
      ]
    }]
})
router.beforeEach((to, from, next) => {
  console.log(to)
  if (!store.state.gogo_smartyou_token) {
    window.console.log(to)
    if (to.name === 'register') {
      next()
    } else {
      if (to.name === 'login') {
        next()
      } else {
        next({
          name: 'login'
        })
      }
    }
  } else {
    window.console.log(to)
    next()
  }
})


export default router
