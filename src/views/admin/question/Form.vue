<template>
    <div>
        <div class="row">
            <label for="text" class="col-sm-2 col-form-label">Question</label>
            <div class="col-sm-10">
                <textarea class="form-control form-control-sm" id="text" v-model="question" placeholder="Text"></textarea>
                <!-- <quill-editor
                    v-model="description_uz"
                /> -->
                <span 
                    class="error"
                    v-if="validationErrors && validationErrors.question"  
                >
                    {{ validationErrors.question[0] }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
// import 'quill/dist/quill.core.css'
// import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.bubble.css'
// import { quillEditor } from 'vue-quill-editor'
import {mapState} from 'vuex'
export default {
    components: {
        // quillEditor
    },
    computed:{
        ...mapState('question',['currentQuestion','validationErrors']),
        question:{
            get () {
                return this.currentQuestion.question;
            },
            set (value){
                this.$store.commit('question/updateQuestion', value)
            }
        },
    },
    mounted(){
        this.$store.commit('question/updateLevelId', this.$route.params.level_id)
        this.$store.commit('question/updateType', this.$route.params.question_type)
        this.$store.commit('question/updateQplId', this.$route.params.qp_id)
        if(this.$route.query.resource_id){
            this.$store.commit('question/updateResourceId', this.$route.query.resource_id);
        }
    },
}
</script>
<style scoped>
    .error{
        color:red;
    }
</style>