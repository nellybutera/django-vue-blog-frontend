import { createRouter, createWebHistory } from 'vue-router';
// import PostList from '../views/PostList.vue';
// import PostDetail from '../views/PostDetail.vue';
// import PostCreate from '../views/PostCreate.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL), // ✅ Works with Vite
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: PostList,
    // },
    // {
    //   path: '/posts',
    //   name: 'posts',
    //   component: PostList,
    // },
    // {
    //   path: '/posts/:id',
    //   name: 'post-detail',
    //   component: PostDetail,
    //   props: true, // ✅ Makes :id available as a prop inside PostDetail
    // },
    // {
    //   path: '/posts/create',
    //   name: 'post-create',
    //   component: PostCreate,
    // },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    // {
    //   // ✅ Catch-all route for 404s
    //   path: '/:pathMatch(.*)*',
    //   name: 'not-found',
    //   component: () => import('../views/NotFound.vue'),
    // },
  ],
});

export default router;
