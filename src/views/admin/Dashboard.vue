<template>
    <div 
        v-if="isAdmin"
        class="container mt-3"
    >
        <h1>Dashboard</h1>
        <b-skeleton-table
            v-if="isLoading"
            :rows="5"
            :columns="4"
            :table-props="{ bordered: true, striped: true }"
        ></b-skeleton-table>
        <table 
            v-else
            class="table table-bordered table-condensed table-hover table-striped"
        >
            <tr>
                <th></th>
                <th colspan="2">Beginner</th>
                <th colspan="2">Elementary</th>
                <th colspan="2">Pre-Intermediate</th>
                <th colspan="2">Intermediate</th>
                <th colspan="2">Upper-INtermediate</th>
            </tr>
            <tr>
                <th>#</th>
                <th>Mid</th>
                <th>Final</th>
                <th>Mid</th>
                <th>Final</th>
                <th>Mid</th>
                <th>Final</th>
                <th>Mid</th>
                <th>Final</th>
                <th>Mid</th>
                <th>Final</th>
            </tr>
            <tr>
                <td>
                    <strong>Listening</strong>    
                </td>
                <td>
                    No
                </td>
                <td>
                    No
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/3/type/1">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Elementary Mid","Listening") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/4/type/1">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Elementary Final","Listening") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/5/type/1">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Pre-Intermediate Mid","Listening") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/6/type/1">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Pre-Intermediate Final","Listening") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/7/type/1">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Intermediate Mid","Listening") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/8/type/1">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Intermediate Final","Listening") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/9/type/1">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Upper-Intermediate Mid","Listening") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/10/type/1">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Pre-Intermediate Final","Listening") }}
                        </span>    
                    </router-link>
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Reading</strong> (additional)
                </td>
                <td>
                    No
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/2/type/2">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Beginner Final","Reading") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/3/type/2">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Elementary Mid","Reading") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/4/type/2">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Elementary Final","Reading") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/5/type/2">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Pre-Intermediate Mid","Reading") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/6/type/2">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Pre-Intermediate Final","Reading") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/7/type/2">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Intermediate Mid","Reading") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/8/type/2">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Intermediate Final","Reading") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/9/type/2">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Upper-Intermediate Mid","Reading") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/10/type/2">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Pre-Intermediate Final","Reading") }}
                        </span>    
                    </router-link>
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Grammar</strong>    
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/1/type/3">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Beginner Mid","Grammar") }}
                        </span>
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/2/type/3">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Beginner Final","Grammar") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/3/type/3">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Elementary Mid","Grammar") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/4/type/3">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Elementary Final","Grammar") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/5/type/3">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Pre-Intermediate Mid","Grammar") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/6/type/3">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Pre-Intermediate Final","Grammar") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/7/type/3">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Intermediate Mid","Grammar") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/8/type/3">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Intermediate Final","Grammar") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/9/type/3">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Upper-Intermediate Mid","Grammar") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/10/type/3">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Pre-Intermediate Final","Grammar") }}
                        </span>    
                    </router-link>
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Vocabulary</strong>    
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/1/type/4">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Beginner Mid","Vocabulary") }}
                        </span>
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/2/type/4">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Beginner Final","Vocabulary") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/3/type/4">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Elementary Mid","Vocabulary") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/4/type/4">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Elementary Final","Vocabulary") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/5/type/4">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Pre-Intermediate Mid","Vocabulary") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/6/type/4">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Pre-Intermediate Final","Vocabulary") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/7/type/4">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Intermediate Mid","Vocabulary") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/8/type/4">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Intermediate Final","Vocabulary") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/9/type/4">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Upper-Intermediate Mid","Vocabulary") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/10/type/4">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Pre-Intermediate Final","Vocabulary") }}
                        </span>    
                    </router-link>
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Speaking</strong> (new questions)    
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/1/type/5">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Beginner Mid","Speaking") }}
                        </span>
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/2/type/5">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Beginner Final","Speaking") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/3/type/5">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Elementary Mid","Speaking") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/4/type/5">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Elementary Final","Speaking") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/5/type/5">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Pre-Intermediate Mid","Speaking") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/6/type/5">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Pre-Intermediate Final","Speaking") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/7/type/5">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Intermediate Mid","Speaking") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/8/type/5">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Intermediate Final","Speaking") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/9/type/5">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Upper-Intermediate Mid","Speaking") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/10/type/5">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Pre-Intermediate Final","Speaking") }}
                        </span>    
                    </router-link>
                </td>
            </tr>
            <tr>
                <td>
                    <strong>Writing</strong> (new questions)
                </td>
                <td>
                    No
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/2/type/6">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Beginner Final","Writing") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/3/type/6">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Elementary Mid","Writing") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/4/type/6">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Elementary Final","Writing") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/5/type/6">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Pre-Intermediate Mid","Writing") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/6/type/6">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Pre-Intermediate Final","Writing") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/7/type/6">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Intermediate Mid","Writing") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/8/type/6">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Intermediate Final","Writing") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/9/type/6">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Upper-Intermediate Mid","Writing") }}
                        </span>    
                    </router-link>
                </td>
                <td>
                    <router-link to="/admin-dashboard/level/10/type/6">
                        <span class="badge rounded-pill bg-secondary">
                            {{ numberOfQuestions("Pre-Intermediate Final","Writing") }}
                        </span>    
                    </router-link>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import {mapGetters,mapState,mapActions} from 'vuex'
export default {
    computed:{
        ...mapGetters('auth',['isAdmin']),
        ...mapState('question',['isLoading','questionsByLevels'])
    },
    mounted(){
        this.getQuestionsByLevels();
    },
    methods:{
        ...mapActions('question',['getQuestionsByLevels']),
        numberOfQuestions(level,question_type){
            for(let i=0;i<this.questionsByLevels.length;i++){
                if(this.questionsByLevels[i].level == level && this.questionsByLevels[i].question_type == question_type){
                    return this.questionsByLevels[i].number_of_questions;
                }
            }
            return 0;
        }
    }
}
</script>