import api from '@/api/axios'
import { reactive, readonly } from '@vue/composition-api'

const state = reactive({
    keyWord: []
})

const methods = {
    async getQuestionTypes() {
        // state.keyWord = value
        state.keyWord = (await api.get(`question-type`)).data;
    }
}

// const getters = {
//     counterSqueared(){
//         return state.counter * state.counter;
//     }
// }

export const store = readonly({
    state,
    methods
})