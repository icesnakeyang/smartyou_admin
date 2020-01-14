import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'

import guestLayout from "@/pages/layout/guestLayout";
import register from "@/pages/user/register/register";
import baseFooter from "@/pages/layout/baseFooter";
import login from "@/pages/user/login/login";
import baseHeader from "@/pages/layout/baseHeader";
import dashboard from "../pages/dashboard/dashboard";
import adminSider from "../pages/layout/adminSider";
import trainBookingList from "../pages/train/trainBookingList";
import userList from "../pages/user/userList";
import TourDashboard from "../pages/tour/TourDashboard";
import tourList from "../pages/tour/tourList";
import newTour from "../pages/tour/newTour";
import memberTypeList from "../pages/member/memberTypeList";
import createMemberType from "../pages/member/createMemberType";
import editMemberType from "@/pages/member/editMemberType";
import trainOrderDetail from "../pages/train/trainOrderDetail";
import trainOrderMaintain from "../pages/maintain/trainOrderMaintain";
import tourDetail from "@/pages/tour/tourDetail";
import testPic from "../pages/tour/testPic";
import rentVehicleOrderList from "../pages/rentVehicle/rentVehicleOrderList";

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
          path: 'dashboard',
          name: 'dashboard',
          components: {
            header: baseHeader,
            sider: adminSider,
            content: dashboard,
            footer: baseFooter
          }
        },
        {
          path: 'trainBookingList',
          name: 'trainBookingList',
          components: {
            header: baseHeader,
            sider: adminSider,
            content: trainBookingList,
            footer: baseFooter
          }
        },
        {
          path: 'memberTypeList',
          name: 'memberTypeList',
          components: {
            header: baseHeader,
            sider: adminSider,
            content: memberTypeList,
            footer: baseFooter
          }
        },
        {
          path: 'userList',
          name: 'userList',
          components: {
            header: baseHeader,
            sider: adminSider,
            content: userList,
            footer: baseFooter
          }
        },
        {
          path: 'TourDashboard',
          name: 'TourDashboard',
          components: {
            header: baseHeader,
            sider: adminSider,
            content: TourDashboard,
            footer: baseFooter
          }
        },
        {
          path: 'tourList',
          name: 'tourList',
          components: {
            header: baseHeader,
            sider: adminSider,
            content: tourList,
            footer: baseFooter
          }
        },
        {
          path: 'newTour',
          name: 'newTour',
          components: {
            header: baseHeader,
            sider: adminSider,
            content: newTour,
            footer: baseFooter
          }
        },
        {
          path: 'createMemberType',
          name: 'createMemberType',
          components: {
            header: baseHeader,
            sider: adminSider,
            content: createMemberType,
            footer: baseFooter
          }
        },
        {
          path: 'editMemberType',
          name: 'editMemberType',
          components: {
            header: baseHeader,
            sider: adminSider,
            content: editMemberType,
            footer: baseFooter
          }
        },
        {
          path:'trainOrderDetail',
          name:'trainOrderDetail',
          components:{
            header:baseHeader,
            sider:adminSider,
            content:trainOrderDetail,
            footer:baseFooter
          }
        },
        {
          path:'trainOrderMaintain',
          name:'trainOrderMaintain',
          components:{
            header:baseHeader,
            sider:adminSider,
            content:trainOrderMaintain,
            footer:baseFooter
          }
        },
        {
          path:'tourDetail',
          name:'tourDetail',
          components:{
            header:baseHeader,
            sider:adminSider,
            content:tourDetail,
            footer:baseFooter
          }
        },
        {
          path:'testPic',
          name:'testPic',
          components:{
            header:baseHeader,
            sider:adminSider,
            content:testPic,
            footer:baseFooter
          }
        },
        {
          path:'rentVehicleOrderList',
          name:'rentVehicleOrderList',
          components:{
            header:baseHeader,
            sider:adminSider,
            content:rentVehicleOrderList,
            footer:baseFooter
          }
        }
      ]
    }]
})
router.beforeEach((to, from, next) => {
  if (!store.state.gogo_smartyou_token) {
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
    if (to.path === '/') {
      next({
        name: 'dashboard'
      })
    }
    next()
  }
})


export default router
