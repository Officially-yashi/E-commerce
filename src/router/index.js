  import Vue from 'vue';
  import Router from 'vue-router';

  import Signup from '../pages/Signup.vue';
  import Home from '../pages/Home.vue';
 
  import Login from '../pages/Login.vue';

  import Cart from '../pages/Cart.vue';

  Vue.use(Router);

  const router = new Router({
    
    mode: 'history',
    routes: [
      { path: '/login', name: 'Login', component: Login },
      { path: '/signup', name: 'Signup', component: Signup },
     { path: '/home', name: 'Home', component: Home, meta: { requiresAuth: true } },
      {
        path: '/cart',
        name: 'Cart',
        component: Cart,
        meta: { requiresAuth: true }
      },
      { path: '*', redirect: '/login' } ,
      
    ]
  });


  router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token');
const isLoggedIn = !!token;


  if ((to.path === '/login' || to.path === '/signup') && isLoggedIn ) {
    return next('/home');
  }

    if (to.matched.some(record => record.meta.requiresAuth) && !isLoggedIn) {
      return next('/login');
    }

    next();
  });

  export default router;
