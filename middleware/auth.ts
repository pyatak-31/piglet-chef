import { useAuthStore } from '@/store/auth';
// import { isValidToken } from "~~/use/isValidToken";

import jwtDecode from "jwt-decode";
import { DecodeToken } from "~~/type/auth";

const isValidToken = (token: string) => {
    const jwtData = jwtDecode<DecodeToken>(token) || {};
    const expires = jwtData.exp || 0;
    console.log(`Токен умрети через: ${ (expires - (new Date().getTime() / 1000)).toFixed() } сек`);
    return (new Date().getTime() / 1000) < expires;
};


export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();
    
    if (to.path !== '/login' && authStore.isAuth) {
        if (!authStore.isValidToken) {
            await authStore.refresh();
        }
    } else if (to.path !== '/login' && !authStore.isAuth) {
        return navigateTo('/login');
    } else if (to.path === '/login' && authStore.isAuth) {
        if (authStore.isValidToken) {
            return navigateTo('/');
        } else {
            await authStore.refresh();
        }
    } else {
        return true;
    }
});
