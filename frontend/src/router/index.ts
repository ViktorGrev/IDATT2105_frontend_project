// Import necessary dependencies from Vue Router and your views
import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView2.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/SignUpView.vue'),
  },
  {
    path: '/create',
    name: 'create',
    component: () => import('../views/CreateView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/play',
    name: 'play',
    component: () => import('../views/PlayView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/quiz',
    name: 'quiz',
    component: () => import('../views/QuizView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/result',
    name: 'result',
    component: () => import('../views/ResultView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/UserView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/searchView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('../views/FeedbackView.vue'),
    meta: { requiresAuth: true },
  }
];

// Create the router instance and pass the `routes` option
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior() {
    // Always scroll to top on route change
    return { top: 0 };
  },
});

router.beforeEach((to, from, next) => {
  console.log(sessionStorage.getItem("userToken"));
  const isLoggedIn = () => !!sessionStorage.getItem("userToken");
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  if (requiresAuth && !isLoggedIn()) {
    next({ name: 'login', query: { redirect: to.fullPath } });
  } else {
    next(); 
  }
});

export default router;
