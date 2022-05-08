<template>
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<h3 class="text-center mt-5 mb-3">
					{{ generateQuestionStore.state.group.group.teacher }}
					{{ generateQuestionStore.state.group.group.days }}
					{{ moment(generateQuestionStore.state.group.group.time,"HH:mm:ss").format("HH:mm") }} 
					-
					{{ generateQuestionStore.state.group.level }}
				</h3>
				<router-link 
					to="/supervisor" 
					class="btn btn-secondary btn-sm mb-2 float-end"
				>
					Back
				</router-link>
				<ul>
					<li 
						v-for="student,index in generateQuestionStore.state.students" 
						:key="'student'+index"
					>
						<router-link
							:to="'/supervisor/student/'+student.id+'/questions'"
						>
							{{ student.student }}		
						</router-link>
					</li>
				</ul>
			</div>
		</div>		
	</div>
</template>

<script>
	import {store as generateQuestionStore} from '@/store/modules/generate-questions'
	import moment from 'moment'
	export default{
		data(){
			return {
				moment,
				generateQuestionStore
			}
		},
		mounted(){
	        generateQuestionStore.methods.getSupervisorGroup(this.$route.params.id);
	        generateQuestionStore.methods.getStudents(this.$route.params.id);
	    },
	}
</script>