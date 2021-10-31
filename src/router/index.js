import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import PostPage from '@/views/PostPage.vue'
import About from '@/views/About.vue'
import PostIdPage from '@/views/PostIdPage.vue'
import PostPageVuex from '@/views/PostPageVuex.vue'
import composition from '@/views/composition.vue'

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
    },
    {
        path: '/store',
        component: PostPageVuex
    },
    {
        path: '/composition',
        component: composition
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router