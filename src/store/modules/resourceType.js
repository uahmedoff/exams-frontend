import resourceTypeApi from '@/api/resourceType'

const state = {
    isLoading: false,
    resourceTypes: null,
    resourceType: null,
    validationErrors: null,
}

const getters = {
    
};

const mutations = {
    resourceTypesStart(state){
        state.isLoading = true;
        state.validationErrors = null;
    },
    resourceTypesSuccess(state,payload){
        state.isLoading = false;
        state.resourceTypes = payload;
        state.isLoggedIn = true;
    },
    resourceTypesFailure(state,payload){
        state.isLoading = false;
        state.validationErrors = payload;
    },

    resourceTypeStart(state){
        state.isLoading = true;
        state.validationErrors = null;
    },
    resourceTypeSuccess(state,payload){
        state.isLoading = false;
        state.resourceType = payload;
        state.isLoggedIn = true;
    },
    resourceTypeFailure(state,payload){
        state.isLoading = false;
        state.validationErrors = payload;
    },
}

const actions = {
    async getResourceTypes(context){
        context.commit('resourceTypesStart');
        try {
            const response = (await resourceTypeApi.getResourceTypes()).data;
            context.commit('resourceTypesSuccess',response.data)
        } 
        catch (error) {
            context.commit('resourceTypesFailure',error.response.data.errors);
        }
    },

    async getResourceType(context,id){
        context.commit('resourceTypeStart');
        try {
            const response = (await resourceTypeApi.getResourceType(id)).data;
            context.commit('resourceTypeSuccess',response.data)
        } 
        catch (error) {
            context.commit('resourceTypeFailure',error.response.data.errors);
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