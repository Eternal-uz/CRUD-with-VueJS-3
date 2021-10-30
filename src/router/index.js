import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PostPage from '@/views/PostPage.vue'
import About from '@/views/About.vue'
import PostIdPage from '@/views/PostIdPage.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/posts',
        name: 'PostPage',
        component: PostPage

    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/posts/:id',
        component: PostIdPage
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router