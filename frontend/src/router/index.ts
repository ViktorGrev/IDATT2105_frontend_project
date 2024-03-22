import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SignUpView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  
  /*
  if (to.name === 'about') {
    next({ name: 'home' });
  }else {
    next(); // Make sure to call next() to continue navigation for other routes
  }*/
  next();
});

export default router
