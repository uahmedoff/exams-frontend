<template>
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<h3 class="text-center mt-5 mb-3">Groups</h3>
				<table class="table table-bordered table-condensed table-hover">
					<thead>
						<tr>
							<th>#</th>
							<th>Group</th>
							<th>Exam type</th>
							<th>Exam date</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="group,index in generateQuestionStore.state.groups" :key="'group'+index">
							<td>{{++index}}</td>	
							<td>
								<router-link 
									v-if="group.generated_questions_count"
									:to="'/supervisor/group/'+group.id"
								>
									{{group.group.teacher}} {{group.group.days}} {{moment(group.group.time,"HH:mm:ss").format("HH:mm")}}
								</router-link>	
								<span v-else>{{group.group.teacher}} {{group.group.days}} {{moment(group.group.time,"HH:mm:ss").format("HH:mm")}}</span>
							</td>	
							<td>{{group.level}}</td>	
							<td>{{moment(group.exam_date).format("DD.MM.YYYY")}}</td>	
							<td>
								<a 
									v-if="generateQuestionStore.state.isBuilding"
									class="btn btn-success btn-sm disabled"
								>
									Generating exam questions. Please wait...
								</a>
								<a 
									v-else-if="!group.generated_questions_count"
									class="btn btn-success btn-sm"
									href="#" 
									@click.prevent="generateExamQuestions(group.id)"
								>
									Generate exam questions
								</a>
							</td>
						</tr>	
					</tbody>
				</table>	
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
	        generateQuestionStore.methods.getGroups();
	    },
	    methods:{
	    	async generateExamQuestions(group_id){
	    		await generateQuestionStore.methods.generateQuestions(group_id);
	    		await generateQuestionStore.methods.getGroups();		
	    	}
	    }
	}
</script>