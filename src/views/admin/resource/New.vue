<template>
    <div>
        <h3>Add new resource</h3>
        <form @submit.prevent="add">
            <Form />
			<input type="submit" value="Add" class="btn btn-success btn-sm">
			<a href="#" class="btn btn-secondary btn-sm" @click.prevent="$router.go(-1)">Back</a>
		</form>
    </div>
</template>

<script>
import {mapActions,mapState} from 'vuex'
const Form = () => import('./Form')
export default {
    components:{
        Form
    },
    computed:{
        ...mapState('resource',['validationErrors'])
    },
    methods:{
        ...mapActions('resource',['addResource']),
        async add(){
            await this.addResource();
            if(!this.validationErrors)
                this.$router.push(`/admin-dashboard/level/${this.$route.params.level_id}/type/${this.$route.params.question_type}/qp/${this.$route.params.qp_id}/fill`);
        } 
    },
    created(){
        this.$store.commit('resource/setCurrentResourceNull'); 
    }
}
</script>
