<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12 mt-3">
                <h3>{{level.name}} - {{ capitalized(questionType.name) }}</h3>

                <router-link class="btn btn-secondary btn-sm" :to="`/admin-dashboard/level/${$route.params.level_id}/type/${$route.params.question_type}`">Back</router-link>
                
                <div class="mt-5">

                    <!-- Resource -->
                    <table 
                        v-if="questionType.resource_types && questionType.resource_types.length"
                        class="table table-bordered table-condensed table-hover" 
                    >
                        <tr>
                            <th>
                                File
                                <span v-if="questionPlan.resource_id">✅</span>
                                <span v-else>❌</span>
                            </th>
                            <th>
                                <!-- <router-link 
                                    v-if="!questionPlan.resource_id"
                                    :to="`/admin-dashboard/level/${$route.params.level_id}/type/${$route.params.question_type}/qp/${$route.params.qp_id}/resource/add`" 
                                    class="btn btn-success btn-sm"
                                >
                                    Add
                                </router-link> -->
                            </th>
                            <th>
                                <a 
                                    v-if="resourceLoaded"
                                    href="#"
                                    class="btn btn-success btn-sm"
                                    @click.prevent="saveResource()"
                                >
                                    Save
                                </a>
                            </th>
                        </tr>
                        <tr>
                            <td>Type</td>
                            <td>
                                <span v-if="questionType.resource_types && questionType.resource_types.length">
                                    <span v-for="rt,index in questionType.resource_types" :key="index">
                                        <!-- {{ rt.name }} / -->
                                        <label>
                                            <input 
                                                type="radio" 
                                                :value="rt.id"
                                                v-model="resource_type_id"
                                                @change="isResourceLoaded"
                                            > 
                                                {{ rt.name }}
                                        </label> &nbsp;
                                    </span>
                                </span>
                            </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td>File</td>
                            <td>
                                <input type="file" class="form-control form-control-sm" id="file" placeholder="File" @change="fileChanged">
                            </td>
                            <td>
                                <!-- <router-link 
                                    v-if="questionPlan.resource_id"
                                    :to="`/admin-dashboard/level/${$route.params.level_id}/type/${$route.params.question_type}/qp/${$route.params.qp_id}/resource/${questionPlan.resource_id}/edit`"
                                >
                                        Edit
                                    </router-link> -->
                            </td>
                        </tr>
                        <tr v-if="questionPlan.resource_id">
                            <td>Preview</td>
                            <td>
                                <video 
                                    v-if="questionPlan.qresource.src && questionPlan.qresource.type_id == 1"
                                    controls
                                >
                                    <source :src="`${apiUrl}/storage/${questionPlan.qresource.src}`" type="video/mp4">
                                    Your browser does not support the video tag.
                                </video> 
                                <audio 
                                    v-else-if="questionPlan.qresource.src && questionPlan.qresource.type_id == 2"
                                    controls
                                >
                                    <source :src="`${apiUrl}/storage/${questionPlan.qresource.src}`" type="audio/mpeg">
                                    Your browser does not support the audio tag.
                                </audio> 
                                <img 
                                    v-else-if="questionPlan.qresource.src && questionPlan.qresource.type_id == 3"
                                    :src="`${apiUrl}/storage${questionPlan.qresource.src}`" 
                                    class="card-img-top" 
                                >
                                <h6
                                    v-else-if="questionPlan.qresource.type_id == 4"
                                >
                                    {{questionPlan.qresource.text}}
                                </h6>
                            </td>
                            <td>
                                <a 
                                    v-if="questionPlan.resource_id && questionPlan.qresource.src"
                                    href="#" 
                                    @click.prevent="deleteFile(questionPlan.resource_id)"
                                    class="btn bg-danger text-white btn-sm"
                                >
                                    <b-icon icon="trash"></b-icon> 
                                </a>    
                            </td>
                        </tr>
                        <tr v-if="hasText()">
                            <td>Text</td>
                            <td>
                                <textarea 
                                    @input="isResourceLoaded"
                                    class="form-control form-control-sm" 
                                    id="text" 
                                    v-model="resource_text" 
                                    placeholder="Text"
                                ></textarea>
                            </td>
                            <td></td>
                        </tr>
                    </table>

                    <!-- Question -->
                    <table 
                        class="table table-bordered table-condensed table-hover mt-5"
                        style="border:1px solid #555!important"
                    >
                        <tr>
                            <th>
                                Question 
                                <span v-if="questionPlan.question_id">✅</span>
                                <span v-else>❌</span>
                            </th>
                            <th>
                                <template v-if="$route.params.question_type == 5">
                                    Difficulty:
                                    <select 
                                        v-model="question_category_id"
                                    >
                                        <option value="1">Easy</option>
                                        <option value="2">Medium</option>
                                        <option value="3">Difficult</option>
                                    </select>
                                </template>
                            </th>
                            <th>
                                <a 
                                    v-if="currentQuestion.question"
                                    href="#"
                                    class="btn btn-success btn-sm"
                                    @click.prevent="saveQuestion()"
                                >
                                    Save
                                </a>
                            </th>
                        </tr>
                        <tr>
                            <td>Text</td>
                            <td>
                                <textarea 
                                    class="form-control form-control-sm" 
                                    id="text" 
                                    v-model="question_text" 
                                    placeholder="Text"
                                >
                                </textarea>
                            </td>
                            <td>
                                <a 
                                    v-if="questionPlan.question_id"
                                    href="#" 
                                    @click.prevent="deleteQuestion(questionPlan.question_id)"
                                    class="btn bg-danger text-white btn-sm"
                                >
                                    <b-icon icon="trash"></b-icon> 
                                </a>
                            </td>
                        </tr>
                    </table>

                    <table 
                        v-if="questionPlan.question_id"
                        class="table table-bordered table-condensed table-hover mt-5"
                        style="border:1px solid #555!important"
                    >
                        <tr>
                            <th>
                                Answer 
                                <span v-if="
                                    questionPlan.question_id && 
                                    questionPlan.question.answers && 
                                    questionPlan.question.answers.length"
                                >✅</span>
                                <span v-else>❌</span>
                                <select 
                                    v-model="answer_type_id"
                                >
                                    <option value=""></option>
                                    <option value="1">Gap filling</option>
                                    <option value="2">Multiple choice</option>
                                    <option value="3">Choose the correct option</option>
                                    <option value="4">Write the missing letters</option>
                                    <option value="5">Fill gaps with given words</option>
                                    <option value="6">Match questions</option>
                                    <option value="7">Complete the sentences with articles</option>
                                    <option value="8">Complete the sentences with correct verbs</option>
                                </select>
                            </th>
                            <th>
                                Answer
                                <textarea 
                                    class="form-control form-control-sm" 
                                    id="text" 
                                    v-model="answer_text" 
                                    placeholder="Please, type answer..."
                                    cols="5"
                                ></textarea>
                                Is correct?
                                <label>
                                    <input 
                                        type="radio" 
                                        :value="true"
                                        v-model="answer_is_correct"
                                    > 
                                        Yes
                                </label> &nbsp;
                                <label>
                                    <input 
                                        type="radio" 
                                        :value="false"
                                        v-model="answer_is_correct"
                                    > 
                                        No
                                </label> &nbsp;
                            </th>
                            <th>
                                <a 
                                    v-if="
                                        currentAnswer.answer && 
                                        currentAnswer.type_id && 
                                        (currentAnswer.is_correct === true || currentAnswer.is_correct === false)
                                    "
                                    href="#"
                                    class="btn btn-success btn-sm"
                                    @click.prevent="saveAnswer()"
                                >
                                    Save
                                </a>
                            </th>
                        </tr>
                        <template v-if="questionPlan.question_id">
                            <tr v-for="answer,index in questionPlan.question.answers" :key="index">
                                <td>{{answer.answer}}</td>
                                <td>
                                    <span v-if="answer.is_correct">✅</span>
                                    <span v-else>❌</span>
                                </td>
                                <td>
                                    <a 
                                        href="#" 
                                        @click.prevent="removeAnswer(answer.id)"
                                        class="btn bg-danger text-white btn-sm"
                                    >
                                        <b-icon icon="trash"></b-icon> 
                                    </a>
                                </td>
                            </tr>
                        </template>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import StringMix from "@/mixins/String"
export default {
    mixins:[StringMix],
    data(){
        return {
            resourceLoaded: false,
            apiUrl: process.env.VUE_APP_API_URL,
        }
    },
    computed:{
        ...mapState('level',['level']),
        ...mapState('questionType',['questionType']),
        ...mapState('questionPlan',['questionPlan']),
        ...mapState('resource',['currentResource','validationErrors']),
        ...mapState('question',['currentQuestion','validationErrors']),
        ...mapState('answer',['currentAnswer','answerTypeId','validationErrors']),
        resource_type_id:{
            get () {
                return this.currentResource.type_id;
            },
            set (value){
                this.$store.commit('resource/updateType', value);
            }
        },
        resource_text:{
            get () {
                return this.currentResource.text;
            },
            set (value){
                this.$store.commit('resource/updateText', value);
            }
        },
        question_category_id: {
            get () {
                return this.currentQuestion.category_id;
            },
            set (value){
                this.$store.commit('question/updateCategory', value);
            }
        },
        question_text:{
            get () {
                return this.currentQuestion.question;
            },
            set (value){
                this.$store.commit('question/updateQuestion', value);
            }
        },
        answer_text:{
            get () {
                return this.currentAnswer.answer;
            },
            set (value){
                this.$store.commit('answer/updateAnswer', value);
                this.$store.commit('answer/updateQuestionId', this.questionPlan.question_id);
            }
        },
        answer_is_correct:{
            get () {
                return this.currentAnswer.is_correct;
            },
            set (value){
                this.$store.commit('answer/updateIsCorrect', value);
            }
        },
        answer_type_id:{
            get () {
                return this.currentAnswer.type_id;
            },
            set (value){
                this.$store.commit('answer/updateTypeId', value);
                this.$store.commit('answer/updateAnswerTypeId', value);
            }
        },
    },
    mounted(){
        this.getLevel(this.$route.params.level_id);
        this.getQuestionType(this.$route.params.question_type);
        this.getQuestionPlan(this.$route.params.qp_id);
        this.$store.commit('resource/updateLevelId', this.$route.params.level_id)
        this.$store.commit('resource/updateQplId', this.$route.params.qp_id)
        this.$store.commit('question/updateLevelId', this.$route.params.level_id)
        this.$store.commit('question/updateQplId', this.$route.params.qp_id)
        this.$store.commit('question/updateType', this.$route.params.question_type)
        setTimeout(() => {
            this.$store.commit('resource/updateFile', "");
            if(this.questionPlan.resource_id){
                this.getResource(this.questionPlan.resource_id);
            }
            if(this.questionPlan.question_id){
                this.getQuestion(this.questionPlan.question_id);
                this.$store.commit('answer/updateQuestionId', this.questionPlan.question_id)
                this.$store.commit('answer/updateQuestion', this.questionPlan.question.question)
            }
        },1500);
    },
    methods:{
        ...mapActions('level',['getLevel']),
        ...mapActions('resource',['addResource','getResource','updateResource','activateOrInactivateResource']),
        ...mapActions('question',['addQuestion','getQuestion','updateQuestion','activateOrInactivateQuestion']),
        ...mapActions('answer',['addAnswer','deleteAnswer']),
        ...mapActions('questionType',['getQuestionType']),
        ...mapActions('questionPlan',['getQuestionPlan']),
        fileChanged(e){
            let fileReader = new FileReader();            
            fileReader.readAsDataURL(e.target.files[0]);
            fileReader.onload = (e) => {
                this.$store.commit('resource/updateFile', e.target.result);
                if(this.currentResource.type_id)
                    this.resourceLoaded = true;
            }
        },
        async saveResource(){
            if(this.questionPlan.resource_id){
                await this.updateResource(this.questionPlan.resource_id);
            }
            else{
                await this.addResource();
            }
            if(!this.validationErrors){
                await this.getQuestionPlan(this.$route.params.qp_id);   
                this.$store.commit('question/updateResourceId', this.questionPlan.resource_id);
            }
        },
        async deleteFile(resource_id){
            if(confirm("Are you sure?")){
                await this.activateOrInactivateResource(resource_id);
                await this.getResource(resource_id);
                await this.getQuestionPlan(this.$route.params.qp_id);   
            }
        },
        async deleteQuestion(question_id){
            if(confirm("Are you sure?")){
                await this.activateOrInactivateQuestion(question_id);
                this.$store.commit('question/updateQuestion', null);
                await this.getQuestionPlan(this.$route.params.qp_id);   
            }
        },
        isResourceLoaded(){
            if(this.currentResource.text || (this.currentResource.src && this.currentResource.type_id))
                this.resourceLoaded = true;
            else    
                this.resourceLoaded = false;
        },
        async saveQuestion(){
            if(this.questionPlan.question_id){
                await this.updateQuestion(this.questionPlan.question_id);
            }
            else{
                await this.addQuestion();
            }
            if(!this.validationErrors){
                await this.getQuestionPlan(this.$route.params.qp_id);   
                this.$store.commit('question/updateResourceId', null);
            }
        },
        async saveAnswer(){            
            await this.addAnswer();
            if(!this.validationErrors){
                await this.getQuestionPlan(this.$route.params.qp_id);   
                await this.$store.commit('answer/updateTypeId', this.answerTypeId);
            }
        },
        async removeAnswer(answer_id){
            if(confirm("Are you sure?")){
                await this.deleteAnswer(answer_id);
                if(!this.validationErrors)
                    await this.getQuestionPlan(this.$route.params.qp_id);   
            }
        },
        hasText(){
            for(let i=0;i<this.questionType.resource_types.length;i++){
                if(this.questionType.resource_types[i].name == 'text'){
                    return true;
                }
            }
            return false;
        }
    },
    destroyed(){
        this.$store.commit('resource/updateText',null);
        this.$store.commit('question/updateQuestion',null);
        this.$store.commit('answer/updateAnswer',null);
    }
}
</script>

<style  scoped>
    .table, .table th, .table td{
        border: 1px solid #555!important;
    }
    .table th, .table td{
        padding:10px;
    }
    .table th:first-child{
        width:150px
    }
    .table th:nth-child(3){
        width:150px
    }
    .btn-success {
        background-color: #198754!important;
    }
</style>