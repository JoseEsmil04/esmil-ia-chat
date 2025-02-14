import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/WelcomeView.vue'),
    },
    {
      path: '/chat/:name?',
      name: 'chat',
      component: () => import('@/views/ChatView.vue'),
      props: true,
      beforeEnter: (to, from, next) => {
        if (!to.params.name) {
          next({ name: 'home' });
        } else {
          next();
        }
      },
    },    
  ],
})


export default router
