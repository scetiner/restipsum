import Vue from 'vue'
import VueAnalytics from "vue-analytics"
import NProgress from 'vue-nprogress'
import VueRouter from 'vue-router'
import { store } from './store/index'

import App from './App.vue'


import HomePage from './pages/HomePage.vue'


// import 'vuetify/dist/vuetify.min.css'
import Vuetify from 'vuetify'
import colors from 'vuetify/es5/util/colors'
 
Vue.use(Vuetify, {
  theme: {
    primary: colors.green.darken1, 
    secondary: colors.green.darken1,
    accent: colors.green.darken1 
  }
})
Vue.use(NProgress);
Vue.use(VueRouter);

// The matching uses path-to-regexp, which is the matching engine used
// by express as well, so the same matching rules apply.
// For detailed rules, see https://github.com/pillarjs/path-to-regexp
const router = new VueRouter({    
  mode: 'history',
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: HomePage
    }
  ]
});

  Vue.use(VueAnalytics,{
    id:'UA-75645310-3',
    router:router,
    autoTracking: {
      screenview: true
    }
  });

new Vue({
  router:router,
  store:store,  
  el: '#app',
  render: h => h(App)
});