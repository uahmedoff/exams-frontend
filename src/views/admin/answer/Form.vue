<template>
    <div>
        <div class="row">
            <label for="text" class="col-sm-2 col-form-label">Answer</label>
            <div class="col-sm-10">
                <textarea class="form-control form-control-sm" id="text" v-model="answer" placeholder="Answer"></textarea>
                <!-- <quill-editor
                    v-model="description_uz"
                /> -->
                <span 
                    class="error"
                    v-if="validationErrors && validationErrors.answer"  
                >
                    {{ validationErrors.answer[0] }}
                </span>
            </div>
        </div>
        <div class="row">
            <label for="type" class="col-sm-2 col-form-label">Is correct</label>
            <div class="col-sm-10">
                <select type="text" class="form-control form-control-sm" id="type" v-model="is_correct">
                    <option></option>
                    <option value="1">Yes</option>
                    <option value="0">No</option>
                </select>
                <span 
                class="error"
                v-if="validationErrors && validationErrors.is_correct"  
                >
                {{ validationErrors.is_correct[0] }}
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
        ...mapState('answer',['currentAnswer','validationErrors']),
        answer:{
            get () {
                return this.currentAnswer.answer;
            },
            set (value){
                this.$store.commit('answer/updateAnswer', value)
            }
        },
        is_correct:{
            get () {
                return this.currentAnswer.is_correct;
            },
            set (value){
                this.$store.commit('answer/updateIsCorrect', value)
            }
        },
    },
    mounted(){
        this.$store.commit('answer/updateQuestionId', this.$route.params.question_id)
    },
}
</script>
<style scoped>
    .error{
        color:red;
    }
</style>