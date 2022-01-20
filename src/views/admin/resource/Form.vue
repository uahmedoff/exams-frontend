<template>
    <div>
        <div class="row">
            <label for="type" class="col-sm-2 col-form-label">Type</label>
            <div class="col-sm-10">
                <select type="text" class="form-control form-control-sm" id="type" v-model="type">
                    <option></option>
                    <option :value="resourceTypes['Video']">Video</option>
                    <option :value="resourceTypes['Audio']">Audio</option>
                    <option :value="resourceTypes['Image']">Image</option>
                    <option :value="resourceTypes['Text']">Text</option>
                </select>
                <span 
                class="error"
                v-if="validationErrors && validationErrors.type"  
                >
                {{ validationErrors.type[0] }}
                </span>
            </div>
        </div>
        <div class="row">
            <label for="file" class="col-sm-2 col-form-label">File</label>
            <div class="col-sm-10">
                <input type="file" class="form-control form-control-sm" id="file" placeholder="File" @change="fileChanged">
                <span 
                class="error"
                v-if="validationErrors && validationErrors.src"  
                >
                {{ validationErrors.src[0] }}
                </span>
            </div>
        </div>
        <div class="row">
            <label for="text" class="col-sm-2 col-form-label">Text</label>
            <div class="col-sm-10">
                <textarea class="form-control form-control-sm" id="text" v-model="text" placeholder="Text"></textarea>
                <!-- <quill-editor
                    v-model="description_uz"
                /> -->
                <span 
                    class="error"
                    v-if="validationErrors && validationErrors.text"  
                >
                    {{ validationErrors.text[0] }}
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
import {resourceTypes} from '@/constants/config'
import {mapState} from 'vuex'
export default {
    data(){
        return {
            resourceTypes: resourceTypes
        }
    },
    components: {
        // quillEditor
    },
    computed:{
        ...mapState('resource',['currentResource','validationErrors']),
        type:{
            get () {
                return this.currentResource.type;
            },
            set (value){
                this.$store.commit('resource/updateType', value)
            }
        },
        text:{
            get () {
                return this.currentResource.text;
            },
            set (value){
                this.$store.commit('resource/updateText', value)
            }
        },
    },
    mounted(){
        this.$store.commit('resource/updateLevelId', this.$route.params.level_id)
        setTimeout(() => {
            this.$store.commit('resource/updateFile', "")
        },1000);
    },
    methods:{
        fileChanged(e){
            let fileReader = new FileReader();
            fileReader.readAsDataURL(e.target.files[0]);
            fileReader.onload = (e) => {
                this.$store.commit('resource/updateFile', e.target.result)
            }
        },
    }
}
</script>
<style scoped>
    .error{
        color:red;
    }
</style>