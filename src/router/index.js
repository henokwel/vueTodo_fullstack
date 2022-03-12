import { createRouter, createWebHistory } from 'vue-router';

 
const routes = [
    {
        path: "/",
        name: "LandingPage",
        meta: { auth: false },
        component: () => import('@/view/TheLandingPage.vue')
    },
    {
        path: "/signup",
        name: "TheSignUp",
        meta: { auth: false },
        component: () => import('@/view/TheSignUp.vue')
    },
    {
        path: "/signin",
        name: "TheSignIn",
        meta: { auth: false },
        component: () => import('@/view/TheSignIn.vue')
    },
    {
        path:"/dashboard",
        name:"TheDashboard",
        meta: { auth: true },
        component: () => import('@/view/TheDashboard.vue')
    }
];



const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;