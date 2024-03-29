import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: '/',
      name: 'signin',
      component: Signin
    },
    {
      path: '/Signup',
      name: 'signup',
      component: Signup
    },
    {
      path: '/Search',
      name: 'search',
      component: Search
    }
  ]
})
