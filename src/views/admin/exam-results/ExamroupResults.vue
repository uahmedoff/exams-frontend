<template>
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <h3 class="pt-4 pb-2">Exam Results</h3>
                <h4> 
                    {{ examgroupStore.state.examgroup.data.group_name }} 
                    <span class="badge bg-secondary">
                        {{ examgroupStore.state.examgroup.data.number_of_students }}
                    </span>
                </h4>
                <b-skeleton-table
                    v-if="examStore.state.isLoading"
                    :rows="30"
                    :columns="3"
                    :table-props="{ bordered: true, striped: true }"
                ></b-skeleton-table>
                <template v-else-if="
                    !examStore.state.isLoading && 
                    examStore.state.exams.length
                ">
                    <table class="table table-bordered table-condensed table-hover mb-5">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Student</th>
                                <th>Question</th>
                                <th>Total points</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="exam,index in examStore.state.exams" :key="index">
                                <td>{{ ++index }}</td>
                                <td>{{ exam.student.name }} {{ exam.student.surname }}</td>
                                <td>
                                    <ol>
                                        <li v-for="result,index in exam.results" :key="`result${index}`">
                                            <span v-if="result.qresource">
                                                <video 
                                                    v-if="result.qresource.src && result.qresource.type_id == 1"
                                                    controls
                                                >
                                                    <source :src="`${apiUrl}/storage/${result.qresource.src}`" type="video/mp4">
                                                    Your browser does not support the video tag.
                                                </video> 
                                                <audio 
                                                    v-else-if="result.qresource.src && result.qresource.type_id == 2"
                                                    controls
                                                >
                                                    <source :src="`${apiUrl}/storage/${result.qresource.src}`" type="audio/mpeg">
                                                    Your browser does not support the audio tag.
                                                </audio> 
                                                <img 
                                                    v-else-if="result.qresource.src && result.qresource.type_id == 3"
                                                    :src="`${apiUrl}/storage${result.qresource.src}`" 
                                                    class="card-img-top" 
                                                    style="max-width:400px"
                                                >
                                                <h6
                                                    v-else-if="result.qresource.type_id == 4"
                                                >
                                                    {{result.qresource.text}}
                                                </h6>
                                                <div v-if="result.qresource.created_by">Admin: {{ result.qresource.created_by.name }}</div>
                                                <div v-if="result.qresource.created_by">Edited by: {{ result.qresource.updated_by.name }}</div>
                                            </span>
                                            <hr />
                                            {{ result.question.question }}<br>
                                            <div v-if="result.question.created_by">Admin: {{ result.question.created_by.name }}</div>
                                            <div v-if="result.question.created_by">Edited by: {{ result.question.updated_by.name }}</div>
                                            <hr />
                                            <ul>
                                                <li v-for="answer,index in result.question.answers" :key="`answer${index}`">
                                                    {{ answer.answer }}
                                                    <span v-if="answer.is_correct">✅</span> 
                                                    <span v-else>❌</span>
                                                    (
                                                        <span v-if="answer.created_by">Admin: {{ answer.created_by.name }}, </span>
                                                        <span v-if="answer.created_by">Edited by: {{ answer.updated_by.name }}</span>
                                                    )
                                                </li>
                                            </ul>
                                            Given answer: <br>
                                            <span v-if="result.qanswer">{{ result.qanswer.answer }}</span>
                                            <span v-if="result.answer">{{ result.answer }}</span>
                                            <span v-if="result.file">
                                                <audio 
                                                    v-if="result.file.split('.').pop() == 'mp3'"
                                                    controls
                                                >
                                                    <source :src="`${apiUrl}/storage/${result.file}`" type="audio/mpeg">
                                                    Your browser does not support the audio tag.
                                                </audio> 
                                                <img 
                                                    v-else-if="
                                                        result.file.split('.').pop() == 'jpg' ||
                                                        result.file.split('.').pop() == 'png'
                                                    "
                                                    :src="`${apiUrl}/storage/${result.file}`" 
                                                    class="card-img-top" 
                                                    style="max-width:400px"
                                                >
                                            </span>
                                            <span v-if="result.is_correct == 1">✅</span>
                                            <span v-else-if="result.is_correct == 0">❌</span>
                                            Point: {{ result.score }}

                                        </li>
                                    </ol>
                                </td>
                                <td>
                                    {{ totalScore(exam) }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { store as examgroupStore } from '@/store/modules/examgroup'
import { store as examStore } from '@/store/modules/exam'
export default {
    data(){
        return {
            examgroupStore,
            examStore,
            apiUrl: process.env.VUE_APP_API_URL,
        }
    },
    computed:{
        totalScore(){
            return (exam) => {
                let totalScore = 0;
                exam.results.forEach((result) => {
                    if(result.score)
                        totalScore += parseFloat(result.score);
                });
                return totalScore;
            };
        }
    },
    mounted(){
        examgroupStore.methods.getExamgroup(this.$route.params.eg_id)
        examStore.methods.getNewExamgroups(this.$route.params.eg_id)
    }
}
</script>