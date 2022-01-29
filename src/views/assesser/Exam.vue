<template>
    <div class="container-sm">
        <div class="row">
            <div class="col-lg-12">
                <h3 v-if="isLoading">Loading...</h3>
                <template v-else>
                    <h3 class="mt-4">                        
                        {{student.name}} - 
                        <!-- {{student.group}} -  -->
                        {{student.current_level}}</h3>
                    <h1 class="mt-3">
                        START. 
                        <!-- You have 80 minutes for the exam -->
                    </h1>
                    <h2 class="mt-5">#  
                        <select 
                            v-model="question_type_id"
                            @change.prevent="getQuestions"
                        >
                            <option 
                                v-for="type,index in question_types" 
                                :key="index"
                                :value="type.id"
                            >
                                {{ type.name }}
                            </option>
                        </select>
                    </h2>

                    <div v-for="question,index in questions" :key="index">
                        <template v-if="question.qresource.src">
                            <video 
                                v-if="question.qresource.src && question.qresource.type_id == 1"
                                controls
                            >
                                <source :src="`${apiUrl}/storage/${question.qresource.src}`" type="video/mp4">
                                Your browser does not support the video tag.
                            </video> 
                            <audio 
                                v-if="question.qresource.src && question.qresource.type_id == 2"
                                controls
                            >
                                <source :src="`${apiUrl}/storage/${question.qresource.src}`" type="audio/mpeg">
                                Your browser does not support the audio tag.
                            </audio> 
                            <img 
                                v-if="question.qresource.src && question.qresource.type_id == 3"
                                :src="`${apiUrl}/storage${question.qresource.src}`" 
                                class="card-img-top" 
                            >
                        </template>
                        <h3 class="mt-4">{{ question.question }}</h3>
                        <p v-for="answer,index in question.answers" :key="index">
                            <label>
                                <input 
                                    type="radio" 
                                    v-model="question_answers[question.id-1]" 
                                    :value="question.id + '_' + answer.id + '_' + answer.answer + '_' + answer.is_correct" 
                                /> {{ answer.answer }}
                            </label>
                        </p>
                    </div>
                    <button 
                        v-if="question_type_id"
                        class="btn bg-success text-white mt-3 mb-5"   
                        @click.prevent="saveAnswers"
                    >
                        Save
                    </button>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import api from '@/api/axios'
import { getItem } from '@/helpers/localStorage'
export default {
    data(){
        return {
            isLoading: '',
            student: '',
            questions: [],
            question_answers: [],
            question_types: [],
            question_type_id: '',
            apiUrl: process.env.VUE_APP_API_URL,
        }
    },
    mounted(){
        this.student = getItem('student');
        this.getQuestionTypes();
        // this.getQuestions();
    },
    methods:{
        async getQuestions(){
            this.questions = (await api.get(`question`,{
                params:{
                    level: this.student.current_level,
                    type_id: this.question_type_id,
                    order: 'rand',
                    limit: 10
                }
            })).data.data;
        },
        async getQuestionTypes(){
            this.question_types = (await api.get(`question-type`)).data.data;
        },
        async saveAnswers(){
            await api.post(`result`,{
                exam_id: this.$route.params.exam_id,
                question_answers: this.question_answers,
                level: this.student.currentLevel,
                question_type_id: this.question_type_id
            });
            alert("Quiz answers were succesfully saved!");
        }
    }
}
</script>