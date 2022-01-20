<template>
    <div class="mt-3">
        <b-skeleton 
            v-if="isLevelLoading"
            type="input"
        ></b-skeleton>
        <h1 v-else>
            Resource and questions of {{level.name}} - {{questionTypes[$route.params.question_type]}}
        </h1>

        <div class="row">
            <div class="col-lg-12">
                <div class="card mt-3 mb-3">
                    <div class="card-header">
                        Resources
                    </div>
                    <div class="card-body">
                        <router-link 
                            class="btn btn-success btn-sm mb-2"
                            :to="`/admin-dashboard/level/${$route.params.level_id}/type/${$route.params.question_type}/resource/add`"
                        >
                            <b-icon icon="plus"></b-icon>
                        </router-link>
                        <div 
                            v-for="resource,index in resources"
                            :key="index"
                            class="row bg-light rounded mb-4 pt-3 pb-3"
                        >
                            <div 
                                class="col-lg-6"
                            >   
                                <div class="card">
                                    <div class="card-body">
                                        <span 
                                            v-if="!resource.is_active"
                                            class="badge bg-danger"
                                        >
                                            Deleted
                                        </span>
                                        <a 
                                            v-if="resource.is_active"
                                            href="#"
                                            class="btn btn-danger btn-sm float-end ml-1 mr-1"
                                            @click.prevent="activateOrInactivateR(resource.id)"
                                        >
                                            <b-icon icon="trash"></b-icon>
                                        </a>
                                        <a 
                                            v-else
                                            href="#"
                                            class="btn btn-success btn-sm float-end ml-1 mr-1"
                                            @click.prevent="activateOrInactivateR(resource.id)"
                                        >
                                            <b-icon icon="check"></b-icon>
                                        </a>
                                        <router-link 
                                            class="btn btn-warning btn-sm mb-2 float-end ms-1 me-1"
                                            :to="`/admin-dashboard/level/${$route.params.level_id}/type/${$route.params.question_type}/resource/${resource.id}/edit`"
                                        >
                                            <b-icon icon="pencil"></b-icon>
                                        </router-link>
                                        
                                    </div>
                                
                                    <video 
                                        v-if="resource.src && resource.type == resourceTypes['Video']"
                                        controls
                                    >
                                        <source :src="`${apiUrl}/storage/${resource.src}`" type="video/mp4">
                                        Your browser does not support the video tag.
                                    </video> 
                                    <audio 
                                        v-if="resource.src && resource.type == resourceTypes['Audio']"
                                        controls
                                    >
                                        <source :src="`${apiUrl}/storage/${resource.src}`" type="audio/mpeg">
                                        Your browser does not support the audio tag.
                                    </audio> 
                                    <img 
                                        v-if="resource.src && resource.type == resourceTypes['Image']"
                                        :src="`${apiUrl}/storage${resource.src}`" 
                                        class="card-img-top" 
                                    >
                                    <div 
                                        class="card-body"
                                    >
                                        <p class="card-text">{{ resource.text }}</p>
                                    </div>
                                </div>
                            </div>
                            <div 
                                class="col-lg-6"
                            >   
                                <router-link 
                                    class="btn btn-success btn-sm mb-2"
                                    :to="`/admin-dashboard/level/${$route.params.level_id}/type/${$route.params.question_type}/question/add?resource_id=${resource.id}`"
                                >
                                    <b-icon icon="plus"></b-icon>
                                </router-link>
                                <div 
                                    v-for="question,index in resource.questions" 
                                    :key="index"
                                    class="card mb-2"
                                >
                                    <div class="card-body">
                                        <span 
                                            v-if="!question.is_active"
                                            class="badge bg-danger"
                                        >
                                            Deleted
                                        </span>
                                        <a 
                                            v-if="question.is_active"
                                            href="#"
                                            class="btn btn-danger btn-sm float-end ml-1 mr-1"
                                            @click.prevent="activateOrInactivateQ(question.id)"
                                        >
                                            <b-icon icon="trash"></b-icon>
                                        </a>
                                        <a 
                                            v-else
                                            href="#"
                                            class="btn btn-success btn-sm float-end ml-1 mr-1"
                                            @click.prevent="activateOrInactivateQ(question.id)"
                                        >
                                            <b-icon icon="check"></b-icon>
                                        </a>
                                        <router-link 
                                            class="btn btn-warning btn-sm mb-2 float-end ms-1 me-1"
                                            :to="`/admin-dashboard/level/${$route.params.level_id}/type/${$route.params.question_type}/question/${question.id}/edit`"
                                        >
                                            <b-icon icon="pencil"></b-icon>
                                        </router-link>
                                        <h5>{{ question.question  }}</h5>
                                        <router-link 
                                            class="btn btn-success btn-sm mb-2"
                                            :to="`/admin-dashboard/level/${$route.params.level_id}/type/${$route.params.question_type}/question/${question.id}/answer/add`"
                                        >
                                            <b-icon icon="plus"></b-icon>
                                        </router-link>
                                        <ul>
                                            <li v-for="answer,index in question.answers" :key="index">
                                                <strike v-if="!answer.is_active">
                                                    {{ answer.answer }}
                                                </strike>
                                                <template v-else>
                                                    {{ answer.answer }}
                                                </template>
                                                <span v-if="answer.is_correct">✅</span>
                                                <span v-else>❌</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- <pagination 
                            :data="pagination" 
                            size="small"
                            limit="0"
                            @pagination-change-page="getResources({
                                level_id: $route.params.level_id,
                                order: 'desc',
                                page: currentPage
                            })">
                            <span slot="prev-nav">&lt; Previous</span>
                            <span slot="next-nav">Next &gt;</span>
                        </pagination> -->
                    </div>
                </div>

                <div class="card">
                    <div class="card-header">
                        Questions
                    </div>

                    <div class="card-body">
                        <div 
                            v-for="question,index in questions" 
                            :key="index"
                            class="card mb-2"
                        >
                            <div class="card-body">
                                <h5>{{ question.question  }}</h5>
                                <ul>
                                    <li v-for="answer,index in question.answers" :key="index">
                                        <strike v-if="!answer.is_active">
                                            {{ answer.answer }}
                                        </strike>
                                        <template v-else>
                                            {{ answer.answer }}
                                        </template>
                                        <span v-if="answer.is_correct">✅</span>
                                        <span v-else>❌</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
import {questionTypes,resourceTypes} from '@/constants/config'
export default {
    data(){
        return {
            questionTypes: questionTypes,
            resourceTypes: resourceTypes,
            apiUrl: process.env.VUE_APP_API_URL,
            currentPage: 1
        }
    },
    computed:{
        ...mapState('level',['level']),
        ...mapState('resource',['resources','pagination']),
        ...mapState('question',['questions']),
        isLevelLoading(){
            return this.$store.state.level.isLoading;
        },
    },
    mounted(){
        this.getLevel(this.$route.params.level_id);
        this.getResources({
            level_id: this.$route.params.level_id,
            order: "desc"
        });
        this.getQuestions({
            level_id: this.$route.params.level_id,
            type: this.$route.params.question_type,
            without_resource: true,
            order: "desc"
        });
    },
    methods:{
        ...mapActions('level',['getLevel']),
        ...mapActions('resource',['getResources','activateOrInactivateResource']),
        ...mapActions('question',['getQuestions','activateOrInactivateQuestion']),
        async activateOrInactivateR(resource_id){
            if(confirm("Are you sure?")){
                await this.activateOrInactivateResource(resource_id);
                await this.getResources({
                    level_id: this.$route.params.level_id,
                    order: "desc"
                });
            }
        },
        async activateOrInactivateQ(question_id){
            if(confirm("Are you sure?")){
                await this.activateOrInactivateQuestion(question_id);
                await this.getResources({
                    level_id: this.$route.params.level_id,
                    order: "desc"
                });
            }
        }
    }
}
</script>