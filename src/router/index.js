import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

import HelloWorld from '@/components/HelloWorld'
import guestLayout from "@/pages/layout/guestLayout";
import registerHeader from "@/pages/user/register/registerHeader";
import register from "@/pages/user/register/register";
import baseFooter from "@/pages/layout/baseFooter";

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/guest',
      component: guestLayout,
      children: [
        {
          path: '/register',
          name: 'register',
          components: {
            header: registerHeader,
            content: register,
            footer: baseFooter
          }
        }
      ]
    }
  ]
})

export default router
