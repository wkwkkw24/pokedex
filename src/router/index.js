import { createRouter, createWebHistory } from "vue-router";
import Home from '@/views/Home.vue';
import Details from '@/views/Detail.vue';
import Capture from '@/views/Capture.vue';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/pokemon/:name',
            name: 'Details',
            component: Details
        },
        {
path: '/capture',
name: 'capture',
component: Capture
        }
    ]
})

export default router