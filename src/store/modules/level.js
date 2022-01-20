import levelApi from '@/api/level'

const state = {
    isSubmitting: false,
    isLoading: false,
    levels: null,
    level: null,
    currentLevel: {
        id: '',
        created_at: '',
        updated_at: '',
        name: '',
        is_active: '',
        created_by: '',
        updated_by: ''
    },
    validationErrors: null,
}

const getters = {
    
};

const mutations = {
    levelStart(state){
        state.isLoading = true;
        state.validationErrors = null;
    },
    levelSuccess(state,payload){
        state.isLoading = false;
        state.level = payload;
        state.isLoggedIn = true;
    },
    levelFailure(state,payload){
        state.isLoading = false;
        state.validationErrors = payload;
    },
}

const actions = {
    async getLevel(context,id){
        context.commit('levelStart');
        try {
            const response = (await levelApi.getLevel(id)).data;
            context.commit('levelSuccess',response.data)
        } 
        catch (error) {
            context.commit('levelFailure',error.response.data.errors);
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