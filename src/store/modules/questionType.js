import questionTypeApi from '@/api/questionType'

const state = {
    isLoading: false,
    questionTypes: null,
    questionType: null,
    validationErrors: null,
}

const getters = {
    
};

const mutations = {
    questionTypesStart(state){
        state.isLoading = true;
        state.validationErrors = null;
    },
    questionTypesSuccess(state,payload){
        state.isLoading = false;
        state.questionTypes = payload;
        state.isLoggedIn = true;
    },
    questionTypesFailure(state,payload){
        state.isLoading = false;
        state.validationErrors = payload;
    },

    questionTypeStart(state){
        state.isLoading = true;
        state.validationErrors = null;
    },
    questionTypeSuccess(state,payload){
        state.isLoading = false;
        state.questionType = payload;
        state.isLoggedIn = true;
    },
    questionTypeFailure(state,payload){
        state.isLoading = false;
        state.validationErrors = payload;
    },
}

const actions = {
    async getQuestionTypes(context){
        context.commit('questionTypesStart');
        try {
            const response = (await questionTypeApi.getQuestionTypes()).data;
            context.commit('questionTypeSuccess',response.data)
        } 
        catch (error) {
            context.commit('questionTypesFailure',error.response.data.errors);
        }
    },

    async getQuestionType(context,id){
        context.commit('questionTypeStart');
        try {
            const response = (await questionTypeApi.getQuestionType(id)).data;
            context.commit('questionTypeSuccess',response.data)
        } 
        catch (error) {
            context.commit('questionTypeFailure',error.response.data.errors);
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