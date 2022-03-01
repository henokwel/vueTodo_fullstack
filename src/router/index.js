import { createRouter, createWebHistory } from 'vue-router';
import LandingPage from '@/view/TheLandingPage.vue'
import TheSignIn from '@/view/TheSignIn.vue'
import TheSignUp from '@/view/TheSignUp.vue'

const routes = [
    {
        path: "/",
        name: "LandingPage",
        component: LandingPage,
    },
    {
        path: "/signup",
        name: "TheSignUp",
        component: TheSignUp,
    },
    {
        path: "/signin",
        name: "TheSignIn",
        component: TheSignIn,
    },
];




const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;