import resourceApi from '@/api/resource'

const state = {
    isSubmitting: false,
    isLoading: false,
    resources: null,
    pagination: {},
    resource: null,
    currentResource: {
        id: '',
        created_at: '',
        updated_at: '',
        src: '',
        type_id: '',
        text: '',
        level_id: '',
        is_active: '',
        qp_id: '',
        created_by: '',
        updated_by: ''
    },
    validationErrors: null,
}

const getters = {
    
};

const mutations = {
    getResourcesStart(state){
        state.isLoading = true;
        state.validationErrors = null;
    },
    getResourcesSuccess(state,payload){
        state.isLoading = false;
        state.resources = payload.data;
        state.pagination = payload.meta;
        state.isLoggedIn = true;
    },
    getResourcesFailure(state,payload){
        state.isLoading = false;
        state.validationErrors = payload;
    },

    updateId(state,payload){
        state.currentResource.id = payload;
    },
    updateQplId(state,payload){
        state.currentResource.qp_id = payload;
    },
    updateLevelId(state,payload){
        state.currentResource.level_id = payload;
    },
    updateType(state,payload){
        state.currentResource.type_id = payload;
    },
    updateText(state,payload){
        state.currentResource.text = payload;
    },
    updateFile(state,payload){
        state.currentResource.src = payload;
    },
    setCurrentResourceNull(state){
        state.currentResource = {
            id: '',
            created_at: '',
            updated_at: '',
            src: '',
            type: '',
            text: '',
            level_id: '',
            is_active: '',
            created_by: '',
            updated_by: ''
        };
    },

    addResourceStart(state){
        state.validationErrors = null;
        state.isLoading = true;
    },
    addResourceSuccess(state,payload){
        state.isLoading = false;
        state.currentResource = payload;
    },
    addResourceFailure(state,payload){
        state.isLoading = false;
        state.validationErrors = payload;
    },

    currentResourceStart(state){
        state.validationErrors = null;
        state.isLoading = true;
        state.currentResource = {
            id: '',
            created_at: '',
            updated_at: '',
            src: '',
            type: '',
            text: '',
            level_id: '',
            is_active: '',
            created_by: '',
            updated_by: ''
        };
    },
    currentResourceSuccess(state,payload){
        state.isLoading = false;
        state.currentResource = payload.data;
    },
    currentResourceFailure(state,payload){
        state.isLoading = false;
    },

    updateResourceStart(state){
        state.isSubmitting = true;
        state.validationErrors = null;
    },
    updateResourceSuccess(state){
        state.isSubmitting = false;
    },
    updateResourceFailure(state,payload){
        state.isSubmitting = false;
        state.validationErrors = payload;
    },

    activateOrInactivateResourceStart(state){
        state.validationErrors = null;
        state.isLoading = true;
    },
    activateOrInactivateResourceSuccess(state,payload){
        state.isLoading = false;
    },
    activateOrInactivateResourceFailure(state,payload){
        state.isLoading = false;
        state.validationErrors = payload;
    },
}

const actions = {
    async getResources(context,params){
        context.commit('getResourcesStart');
        try {
            const response = (await resourceApi.getResources(params)).data;
            context.commit('getResourcesSuccess',response)
        } 
        catch (error) {
            context.commit('getResourcesFailure',error.response.data.errors);
        }
    },
    async addResource(context){
        context.commit('addResourceStart');
        try {
            const response = (await resourceApi.addResource(context.state.currentResource));
            context.commit('addResourceSuccess',response);
        } 
        catch (error) {
            context.commit('addResourceFailure',error.response.data.errors);
        }
    },
    async getResource(context,id){
        context.commit('currentResourceStart');
        try {
            context.commit('setCurrentResourceNull');
            const response = (await resourceApi.getResource(id));
            context.commit('currentResourceSuccess',response.data);
        } 
        catch (error) {
            context.commit('currentResourceFailure',error.response.data.errors);
        }
    },
    async updateResource(context,id){
        context.commit('updateResourceStart');
        try {
            const response = (await resourceApi.updateResource({
                id: id,
                currentResource: context.state.currentResource 
            }));
            context.commit('currentResourceSuccess',response.data);
        } 
        catch (error) {
            context.commit('currentResourceFailure',error.response.data.errors);
        }
    },
    async activateOrInactivateResource(context,id){
        context.commit('activateOrInactivateResourceStart');
        try {
            const response = (await resourceApi.activateOrInactivateResource(id));
            context.commit('activateOrInactivateResourceSuccess',response);
        } 
        catch (error) {
            context.commit('activateOrInactivateResourceFailure',error.response.data.errors);
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