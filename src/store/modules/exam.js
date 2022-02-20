import api from '@/api/axios'
import { reactive, readonly, computed } from '@vue/composition-api'

const state = reactive({
    isLoading:false,
    exams: [],
    errors: null
})

const methods = {
    async getNewExamgroups(examgroup_id) {
        state.isLoading = true;
        try {
            state.exams = (await api.get(`examgroup/${examgroup_id}/exams`)).data.data;
        } 
        catch (error) {
            state.errors = error.response.data.errors;
        }
        state.isLoading = false;
    }
}

const getters = {
    examsWithQuestionType: computed(() => {
        let ext,exams;
        exams = state.exams;
        for(let i=0; i<exams.length; i++){
            for(let j=0; j<exams[i].results.length; j++){
               ext = exams[i].results[j].file.split('.').pop();
               if(ext == 'mp3'){
                exams[i].results[j]['question_type'] = 'speaking';
               } 
               else if(ext == 'jpg' || ext == 'png'){
                exams[i].results[j]['question_type'] = 'writing';
               }
            }
        }
        return exams;
    }),
}

export const store = readonly({
    state,
    methods,
    getters
})