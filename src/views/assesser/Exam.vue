<template>
    <div class="container-sm">
        <div class="row">
            <div class="col-lg-12">
                <h3 v-if="isLoading">Loading...</h3>
                <template v-else>
                    <h3 class="mt-4">                        
                        {{student.name}} - 
                        <!-- {{student.group}} -  -->
                        {{student.current_level}}
                    </h3>
                        
                    <h3 v-if="timer.minutes<=0 && timer.seconds<=0">
                        <router-link to="/assesser">Start new quiz</router-link>
                    </h3>
                    <template v-else>
                        <h1 class="mt-3">
                            START.  <br>
                            <span class="color-red">{{  timer.minutes  }} : {{ timer.seconds }}</span>
                            <!-- You have 80 minutes for the exam -->
                        </h1>
                        <h2 class="mt-5">#  
                            <select 
                                v-model="question_type_id"
                                @change.prevent="getQuestions"
                                disabled
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
                            <template v-if="question.qresource && question.qresource.src">
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
                                <center>
                                    <img 
                                        v-if="question.qresource.src && question.qresource.type_id == 3"
                                        :src="`${apiUrl}/storage${question.qresource.src}`" 
                                        class="card-img-top" 
                                        style="max-width:400px"
                                    >
                                </center>
                            </template>
                            <h3
                                v-else-if="question.qresource && question.qresource.type_id == 4"
                            >
                                {{question.qresource.text}}
                            </h3>
                            <h4 class="mt-4">{{ ++index }}. {{ question.question }}</h4>
                            
                            <template v-if="question_type_id == 5">
                                <audio-recorder
                                    :upload-url="apiUrl+'/v1/student/'+student.id+'/exam/'+$route.params.exam_id+'/question/'+question.id+'/upload'"
                                    :headers="{
                                        Authorization: 'Bearer ' + token
                                    }"
                                    :attempts="3"
                                    :time="2"
                                />
                            </template>
                            <template v-else-if="question_type_id == 6">
                                <input type="file" class="form-control form-control-sm" id="file" placeholder="File" @change="fileChanged">
                            </template>
                            <template v-else>
                                <p v-for="answer,index in question.answers" :key="index">
                                    <label v-if="
                                        answer.type_id == answerTypes.multipleChoice || 
                                        answer.type_id == answerTypes.chooseCorrectOption ||
                                        answer.type_id == answerTypes.fillGapsWithGivenWords ||
                                        answer.type_id == answerTypes.matchQuestions ||
                                        answer.type_id == answerTypes.completeTheSentencesWithArticles ||
                                        answer.type_id == answerTypes.completeTheSentencesWithVerbs
                                    ">
                                        <input 
                                            type="radio" 
                                            v-model="question_answers[question.id]" 
                                            :value="question.id + '_' + answer.id + '_' + answer.answer + '_' + answer.is_correct" 
                                        /> {{ answer.answer }}
                                    </label>
                                    <label v-else-if="answer.type_id == answerTypes.gapFilling || answer.type_id == answerTypes.writeTheMissingLetters">
                                        <input 
                                            v-model="question_typed_correct_answers[question.id]"
                                        /> 
                                    </label>
                                </p>
                            </template>
                        </div>
                        <button 
                            v-if="question_type_id"
                            class="btn bg-success text-white mt-3 mb-5"   
                            @click.prevent="saveAnswers"
                        >
                            <template v-if="question_type_id<6">
                                Next
                            </template>
                            <template v-else>
                                Save
                            </template>
                        </button>
                    </template>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import api from '@/api/axios'
import { getItem } from '@/helpers/localStorage'
import { questionTypes,answerTypes } from '@/constants/config'

export default {
    data(){
        return {
            timer: {
                minutes: 79,
                seconds: 60
            },
            image: '',
            isLoading: '',
            student: '',
            questions: [],
            question_answers: [],
            question_types: [],
            question_typed_correct_answers: [],
            question_type_id: '',
            apiUrl: process.env.VUE_APP_API_URL,
            typed_answer: '',
            questionTypes,
            answerTypes,
            token: getItem('accessToken'),
        }
    },
    beforeMount() {
        window.addEventListener("beforeunload", this.preventNav)
    },
    mounted(){
        this.question_type_id = 1;
        this.stopTimer();
        this.clearResult();
        this.student = getItem('student');
        this.getQuestionTypes();
        // this.getQuestions();
        this.startTimer();
    },
    methods:{
        preventNav(event) {
            event.preventDefault();
            event.returnValue = "Are you sure that you want to reload page?";
        },
        async clearResult(){
            await api.delete(`exam/${this.$route.params.exam_id}/results`);
        },
        async getQuestions(){
            let limit;
            switch(this.student.current_level){
                case 'Beginner Mid':{
                    if(this.question_type_id == 3){
                        limit = 40;
                    }
                    else if(this.question_type_id == 4){
                        limit = 40;
                    }
                    else if(this.question_type_id == 5){
                        limit = 10;
                    }
                }
                break;
                case 'Beginner Final':{
                    if(this.question_type_id == 3){
                        limit = 20;
                    }
                    else if(this.question_type_id == 4){
                        limit = 20;
                    }
                    else if(this.question_type_id == 2){
                        limit = 10;
                    }
                    else if(this.question_type_id == 5){
                        limit = 8;
                    }
                    else if(this.question_type_id == 6){
                        limit = 1;
                    }
                }
                break;
                default:{
                    if(this.question_type_id == 1){
                        limit = 5;
                    }
                    if(this.question_type_id == 3){
                        limit = 20;
                    }
                    else if(this.question_type_id == 4){
                        limit = 20;
                    }
                    else if(this.question_type_id == 2){
                        limit = 5;
                    }
                    else if(this.question_type_id == 5){
                        limit = 8;
                    }
                    else if(this.question_type_id == 6){
                        limit = 1;
                    }
                }
                break;
            }
            this.questions = (await api.get(`question`,{
                params:{
                    level: this.student.current_level,
                    type_id: this.question_type_id,
                    order: 'rand',
                    limit: limit
                }
            })).data.data;
            // this.startTimer();
        },
        async getQuestionTypes(){
            this.question_types = (await api.get(`question-type`)).data.data;
        },
        async saveAnswers(){ 
            if(this.questions.length){
                let data = {
                    exam_id: this.$route.params.exam_id,
                    question_answers: this.question_answers,
                    level: this.student.currentLevel,
                    question_typed_correct_answers: this.question_typed_correct_answers,
                    question_type_id: this.question_type_id,
                    image: this.image,
                    question_id: this.questions[0].id,
                };
                await api.post(`result`,data);
            }           
            if(this.question_type_id < 6)
                this.question_type_id += 1;
            else{
                this.timer.minutes = -1;
                this.timer.seconds = -1;
                await api.post(`exam/${this.$route.params.exam_id}/set-finished`);  
                alert("Quiz answers were succesfully saved!");
            }
            this.getQuestions();
        },
        fileChanged(e){
            let fileReader = new FileReader();            
            fileReader.readAsDataURL(e.target.files[0]);
            fileReader.onload = (e) => {
                this.image = e.target.result;
            }
        },
        startTimer(){
            var timer;
            this.timer.seconds--; 
            if (this.timer.seconds < 0){
                this.timer.minutes--;
                if (this.timer.minutes >= 0){
                    this.timer.seconds = 60;
                    this.timer.seconds--; 
                }
                else{
                    clearTimeout(timer); 
                    return false;
                }
            }              
            timer = setTimeout(this.startTimer, 1000);
        }, 
        stopTimer(){
            clearTimeout(this.startTimer);
        }
    }
}
</script>

<style lang="scss" scoped>
    .color-red{
        color:red;
    }
</style>