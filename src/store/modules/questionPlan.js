import questionPlanApi from '@/api/questionPlan'

const state = {
    isLoading: false,
    questionPlans: null,
    questionPlan: null,
    questionPlansPagination:null,
    numberOfQuestionPlans: null,
    validationErrors: null,
}

const getters = {
    
};

const mutations = {
    questionPlansStart(state){
        state.isLoading = true;
        state.questionPlans = null;
        state.questionPlansPagination = null;
        state.validationErrors = null;
    },
    questionPlansSuccess(state,payload){
        state.isLoading = false;
        state.questionPlans = payload.data;
        state.questionPlansPagination = payload.meta;
        state.isLoggedIn = true;
    },
    questionPlansFailure(state,payload){
        state.isLoading = false;
        state.validationErrors = payload;
    },

    questionPlanStart(state){
        state.isLoading = true;
        state.validationErrors = null;
        state.questionPlan = null;
    },
    questionPlanSuccess(state,payload){
        state.isLoading = false;
        state.questionPlan = payload;
        state.isLoggedIn = true;
    },
    questionPlanFailure(state,payload){
        state.isLoading = false;
        state.validationErrors = payload;
    },

    addQuestionPlanStart(state){
        state.isLoading = true;
        state.validationErrors = null;
    },
    addQuestionPlanSuccess(state,payload){
        state.isLoading = false;
        state.isLoggedIn = true;
    },
    addQuestionPlanFailure(state,payload){
        state.isLoading = false;
        state.validationErrors = payload;
    },

    deleteQuestionPlanStart(state){
        state.isLoading = true;
        state.validationErrors = null;
    },
    deleteQuestionPlanSuccess(state,payload){
        state.isLoading = false;
        state.isLoggedIn = true;
    },
    deleteQuestionPlanFailure(state,payload){
        state.isLoading = false;
        state.validationErrors = payload;
    },

    getNumberOfQuestionPlansStart(state){
        state.isLoading = true;
        state.numberOfQuestionPlans = null;
        state.validationErrors = null;
    },
    getNumberOfQuestionPlansSuccess(state,payload){
        state.isLoading = false;
        state.numberOfQuestionPlans = payload
        state.isLoggedIn = true;
    },
    getNumberOfQuestionPlansFailure(state,payload){
        state.isLoading = false;
        state.validationErrors = payload;
    },

}

const actions = {
    async getQuestionPlans(context,params){
        context.commit('questionPlansStart');
        try {
            const response = (await questionPlanApi.getQuestionPlans(params)).data;
            context.commit('questionPlansSuccess',response)
        } 
        catch (error) {
            context.commit('questionPlansFailure',error.response.data.errors);
        }
    },
    async addQuestionPlan(context,params){
        context.commit('addQuestionPlanStart');
        try {
            const response = (await questionPlanApi.addQuestionPlan(params)).data;
            context.commit('addQuestionPlanSuccess',response.data)
        } 
        catch (error) {
            context.commit('addQuestionPlanFailure',error.response.data.errors);
        }
    },
    async getQuestionPlan(context,id){
        context.commit('questionPlanStart');
        try {
            const response = (await questionPlanApi.getQuestionPlan(id)).data;
            context.commit('questionPlanSuccess',response.data)
        } 
        catch (error) {
            context.commit('questionPlanFailure',error.response.data.errors);
        }
    },
    async deleteQuestionPlan(context,id){
        context.commit('deleteQuestionPlanStart');
        try {
            const response = (await questionPlanApi.deleteQuestionPlan(id)).data;
            context.commit('deleteQuestionPlanSuccess',response.data)
        } 
        catch (error) {
            context.commit('deleteQuestionPlanFailure',error.response.data.errors);
        }
    },
    async getNumberOfQuestionPlans(context,params){
        context.commit('getNumberOfQuestionPlansStart');
        try {
            const response = (await questionPlanApi.getNumberOfQuestionPlans(params)).data;
            context.commit('getNumberOfQuestionPlansSuccess',response)
        } 
        catch (error) {
            context.commit('getNumberOfQuestionPlansFailure',error.response.data.errors);
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