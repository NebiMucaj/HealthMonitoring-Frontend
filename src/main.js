import 'bootstrap'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import Vue from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2';
import Router from 'vue-router'
import 'sweetalert2/dist/sweetalert2.min.css';
import Prescriptionplan from './components/Prescriptionplan.vue'
import login from './components/login'
import Search from './components/Search.vue'
// If you don't need the styles, do not connect

Vue.use(Router)
Vue.use(VueSweetalert2);

Vue.config.productionTip = false

const routes = [
  { path: '/search', component:Search ,meta: {
    requiresAuth: true
  } },
  { path: '/patient/:id',name: 'patient', component: Prescriptionplan ,props: true ,meta: {
    requiresAuth: true
  }},
  {path:'/',component:login}
  
]
const router = new Router({
  mode: 'history',
  routes // short for `routes: routes`
})
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem("jwt") == null) {
      next({
        path: "/"
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

