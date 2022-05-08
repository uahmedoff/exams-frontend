import authApi from '@/api/auth'
import {setItem,getItem,removeItem} from '@/helpers/localStorage'
import router from '@/router'
import {roles} from "@/constants/config"

const state = {
    isSubmitting: false,
    isLoading: false,
    currentUser: null,
    student: null,
    validationErrors: null,
    isLoggedIn: null
}

const getters = {
    currentUser: state => {
        return state.currentUser;
    },
    isLoggedIn: state => {
        return Boolean(state.isLoggedIn);
    },
    isAnonymous: state => {
        return state.isLoggedIn === false;
    },
    isAdmin: state => {
        if(state.currentUser)
            return state.currentUser.role == roles.Admin;
        if(getItem('user'))
            return getItem('user').role == roles.Admin;   
        return null;
    },
    isInvigilator: state => {
        if(state.currentUser)
            return state.currentUser.role == roles.Invigilator;
        if(getItem('user'))
            return getItem('user').role == roles.Invigilator;   
        return null;
    },
    isAssesser: state => {
        if(state.currentUser)
            return state.currentUser.role == roles.Assesser;
        if(getItem('user'))
            return getItem('user').role == roles.Assesser;   
        return null;
    },
    isSupervisor: state => {
        if(state.currentUser)
            return state.currentUser.role == roles.Supervisor;
        if(getItem('user'))
            return getItem('user').role == roles.Supervisor;   
        return null;
    },
};

const mutations = {
    loginStart(state){
        state.isSubmitting = true;
        state.validationErrors = null;
    },
    loginSuccess(state,payload){
        state.isSubmitting = false;
        state.currentUser = payload;
        state.isLoggedIn = true;
        
    },
    loginFailure(state,payload){
        state.isSubmitting = false;
        state.validationErrors = payload;
    },
    
    getCurrentUserStart(state){
        state.isLoading = true;
    },
    getCurrentUserSuccess(state,payload){
        state.isLoading = false;
        state.currentUser = payload;
        state.isLoggedIn = true;
    },
    getCurrentUserFailure(state){
        state.isLoading = false;
        state.isLoggedIn = false;
        state.currentUser = null;
    },
    getStudentStart(state){
        state.isLoading = false;
        state.isLoggedIn = false;
        state.currentUser = null;
    },
    getStudentSuccess(state,payload){
        state.isLoading = false;
        state.student = payload;
    },
    getStudentFailure(state,payload){
        state.isLoading = false;
        state.validationErrors = payload;
    },
    logout(state){
        state.currentUser = null
        state.isLoggedIn = false
    }
}

const actions = {
    async login(context,credentials){
        context.commit('loginStart');
        try {
            const response = (await authApi.login(credentials)).data;
            context.commit('loginSuccess',response.data)
            setItem('user',response.data);
            setItem('accessToken',response.meta.token);
        } 
        catch (error) {
            context.commit('loginFailure',error.response.data.errors);
        }
    },
    async getCurrentUser(context){
        context.commit('getCurrentUserStart');
        try {
            const response = (await authApi.getCurrentUser()).data;
            context.commit('getCurrentUserSuccess',response.data)
        } 
        catch (error) {
            context.commit('getCurrentUserFailure',error.response.data.errors);
            removeItem('user');
            removeItem('accessToken');
            console.log(router.currentRoute);
        }
    },
    logout(context){
        setItem('accessToken','');
        context.commit('logout')
        removeItem('user');
        removeItem('accessToken');
        router.push('/auth/login');
    },
    async getStudent(context){
        context.commit('getStudentStart');
        try {
            const response = (await authApi.getStudent()).data;
            context.commit('getStudentSuccess',response.data)
        } 
        catch (error) {
            context.commit('getStudentFailure',error.response.data.errors);
        }
    },
    
}

export default{
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}