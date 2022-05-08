import { roles } from '../constants/config';
import {getItem} from './localStorage'

export function initialize(store, router) { 
    router.beforeEach((to, from, next) => {
        const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
        const currentUser = !!(store.state.auth.currentUser || getItem('user'));
        const isAdmin =  store.getters["auth/isAdmin"];
        const isAssesser =  store.getters["auth/isAssesser"];
        const isInvigilator =  store.getters["auth/isInvigilator"];
        const isSupervisor =  store.getters["auth/isSupervisor"];
        if(requiresAuth && !currentUser) {
            next('/auth/login');
        }
        else if(currentUser && to.path == '/auth/login'){
            next('/');
        } 
        else if(isAdmin && to.path == '/'){
            next('/admin-dashboard');
        }
        else if(isAssesser && to.path == '/'){
            next('/assesser');
        }
        else if(isInvigilator && to.path == '/'){
            next('/invigilator');
        }
        else if(isSupervisor && to.path == '/'){
            next('/supervisor');
        }
        else {
            next();
        }
    });
}