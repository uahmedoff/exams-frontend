import { roles } from '../constants/config';
import {getItem} from './localStorage'

export function initialize(store, router) { 
    router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const currentUser = !!(store.state.auth.currentUser || getItem('user'));
        const isAdmin =  store.getters["auth/isAdmin"];
        if(requiresAuth && !currentUser) {
            next('/auth/login');
        }
        else if(currentUser && to.path == '/auth/login'){
            next('/');
        } 
        else if(isAdmin && to.path == '/'){
            next('/admin-dashboard');
        }
        else {
            next();
        }
    });
}