import { createRouter, createWebHistory } from 'vue-router';


const routes = [
    {
        path: "/",
        name: "LandingPage",
        meta: { auth: false },
        component: () => import('@/view/TheLandingPage.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: "NotFound",
        meta: { auth: false },
        component: () => import('@/view/NotFound.vue')
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
        path: "/dashboard",
        name: "TheDashboard",
        meta: { auth: true },
        component: () => import('@/view/TheDashboard.vue')
    }
];



const router = createRouter({
    history: createWebHistory(),
    routes,
});
// eslint-disable-next-line no-unused-vars
router.beforeEach((to, from) => {
    const user = localStorage.getItem("user")

    if (to.meta.auth && !user) {
        return { name: "TheSignIn" }
    }
})

export default router;