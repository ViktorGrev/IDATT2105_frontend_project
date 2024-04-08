// Import necessary dependencies from Vue Router and your views
import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/Authentication/LoginView.vue';
import { useUserInfoStore } from '@/stores/UserStore';

const routes = [
  {
    path: '/',
    name: 'base',
    component: () => import('@/views/BasePageView.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('../views/HomeView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/create',
        name: 'create',
        component: () => import('../views/Quiz/QuizCreateView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/quiz/:id',
        name: 'quiz',
        component: () => import('../views/Quiz/QuizStartView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/play/:id',
        name: 'play',
        component: () => import('../views/Quiz/QuizPlayView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/result/:id',
        name: 'result',
        component: () => import('../views/Quiz/QuizResultView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/profile/:username',
        name: 'profile',
        component: () => import('../views/User/UserProfileView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('../views/Quiz/QuizSearchView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/feedback',
        name: 'feedback',
        component: () => import('../views/User/UserFeedbackView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/settings',
        name: 'settings',
        component: () => import('../views/User/UserSettingsView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/edit/:id',
        name: 'edit',
        component: () => import('../views/Quiz/QuizEditView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/yourLibrary',
        name: 'yourLibrary',
        component: () => import('../views/User/YourLibraryView.vue'),
        meta: { requiresAuth: true },
      },
      {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/AdminFeedback.vue'),
        meta: { requiresAuth: true , requiresAdmin: true},
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFoundView.vue'),
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import('../views/Authentication/SignUpView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'not-found' },
  },
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
  const isLoggedIn = () => !!useUserInfoStore().accessToken;
  const isAdmin = () => useUserInfoStore().role == 'ADMIN';
  console.log(isAdmin())
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  if (requiresAuth && !isLoggedIn()) {
    next({ name: 'login', query: { redirect: to.fullPath } });
  } else if (requiresAdmin && !isAdmin()) {
    next({ name: 'home' });
  }else {
    next();
  }
});

export default router;
