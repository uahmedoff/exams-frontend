import api from '@/api/axios'
import { reactive, readonly } from '@vue/composition-api'

const state = reactive({
    isLoading:false,
    result: {},
    errors: null
})

const methods = {
    async getResult(result_id) {
        state.isLoading = true;
        try {
            state.result = (await api.get(`result/${result_id}`)).data.data;
        } 
        catch (error) {
            state.errors = error.response.data.errors;
        }
        state.isLoading = false;
    },

    async saveResult(result_id,params) {
        state.isLoading = true;
        try {
            await api.put(`result/${result_id}`,{
                ...params
            });
        } 
        catch (error) {
            state.errors = error.response.data.errors;
        }
        state.isLoading = false;
    }
}

export const store = {
    state,
    methods
}