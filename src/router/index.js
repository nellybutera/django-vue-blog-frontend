import { createRouter, createWebHistory } from 'vue-router'
import PostList from '../views/PostList.vue'
import PostDetail from '../views/PostDetail.vue'
import PostCreate from '../views/PostCreate.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: PostList
    },
    {
      path: '/posts',
      name: 'posts',
      component: PostList
    },
    {
      path: '/posts/:id', // This is the dynamic route for a single post
      name: 'post-detail',
      component: PostDetail
    },
    {
        path: '/create',
        name: 'post-create',
        component: PostCreate
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})

export default router
