<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12 mt-5">
                <router-link 
                    to="/invigilator/checking-page"
                    class="btn btn-secondary btn-sm mb-3"
                >
                    Back
                </router-link>
                <b-skeleton-table
                    v-if="examsStore.state.isLoading"
                    :rows="5"
                    :columns="3"
                    :table-props="{ bordered: true, striped: true }"
                ></b-skeleton-table>
                <table 
                    v-else-if="examsStore.getters.examsWithQuestionType.value.length"    
                    class="table table-bordered table-condensed table-hover"
                >
                    <thead>
                        <tr>
                            <th>Students</th>
                            <th>Writing (max {{ maxScore(examsStore.state.exams[0].level_id).maxWritingScore }})</th>
                            <th>Speaking (max {{ maxScore(examsStore.state.exams[0].level_id).maxSpeakingScore }})</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="exam,index in examsStore.getters.examsWithQuestionType.value" :key="index">
                            <td>Student</td>
                            <td>
                                <table class="table table-bordered table-condensed">
                                    <thead>
                                        <tr>
                                            <th>File</th>
                                            <th>Comments</th>
                                            <th>Score</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr 
                                            v-for="result,index in exam.results" :key="'resultw'+index"
                                            :class="{
                                                'bg-success':(result.score),
                                                'bg-danger':(!result.score)
                                            }"
                                        >
                                            <template v-if="result.question_type == 'writing'">
                                                <th>
                                                    <!-- <img 
                                                        :src="`${apiUrl}/storage/${result.file}`"
                                                        class="img-fluid"
                                                    /> -->
                                                    Image
                                                </th>
                                                <th>{{ result.comment }}</th>
                                                <th>{{ result.score }}</th>
                                                <th>
                                                    <router-link 
                                                        :to="`/invigilator/ceg/${$route.params.examgroup_id}/result/${result.id}/mark`"
                                                        class="btn btn-sm btn-success"
                                                    >
                                                        <b-icon icon="check"></b-icon>
                                                    </router-link>
                                                </th>
                                            </template>    
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                            <td>
                                <table 
                                    class="table table-bordered table-condensed" 
                                >
                                    <thead>
                                        <tr>
                                            <th>File</th>
                                            <th>Comments</th>
                                            <th>Score</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr 
                                            v-for="result,index in exam.results" :key="'results'+index"
                                            :class="{
                                                'bg-success':(result.score),
                                                'bg-danger':(!result.score)
                                            }"
                                        >
                                            <template v-if="result.question_type == 'speaking'">
                                                <th>
                                                    <!-- <audio 
                                                        controls
                                                    >
                                                        <source :src="`${apiUrl}/storage/${result.file}`" type="audio/mpeg">
                                                        Your browser does not support the audio tag.
                                                    </audio>  -->
                                                    Audio
                                                </th>
                                                <th>{{ result.comment }}</th>
                                                <th>{{ result.score }}</th>
                                                <th>
                                                    <router-link 
                                                        :to="`/invigilator/ceg/${$route.params.examgroup_id}/result/${result.id}/mark`"
                                                        class="btn btn-sm btn-success"
                                                    >
                                                        <b-icon icon="check"></b-icon>
                                                    </router-link>
                                                </th>
                                            </template>    
                                        </tr>
                                    </tbody>
                                </table>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import {store as examsStore} from '@/store/modules/exam'
import { maxScore } from '@/helpers/scores'
export default {
    data(){
        return {
            examsStore,
            maxScore,
            apiUrl: process.env.VUE_APP_API_URL
        }
    },
    mounted(){
        examsStore.methods.getNewExamgroups(this.$route.params.examgroup_id,true);
    }
}
</script>

<style scoped>
    .bg-success{
        background: lightgreen!important
    }
    .bg-danger{
        background: #ffcccb!important
    }
</style>