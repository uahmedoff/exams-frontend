<template>
	<div class="container">
		<div class="row">
			<div class="col-md-12">
				<h3 class="text-center mt-5 mb-3 no-print">
					{{ generateQuestionStore.state.group.group.teacher }}
					{{ generateQuestionStore.state.group.group.days }}
					{{ moment(generateQuestionStore.state.group.group.time,"HH:mm:ss").format("HH:mm") }} 
					-
					{{ generateQuestionStore.state.group.level }}
				</h3>
				<!-- <router-link 
					to="/supervisor" 
					class="btn btn-secondary btn-sm mb-2 float-end no-print"
				>
					Back
				</router-link> -->
				<router-link 
					to="/assesser" 
					class="btn btn-secondary btn-sm mb-2 float-end no-print"
				>
					Back
				</router-link>
				
				
				<div style="clear:both"></div>

				<div class="col-md-3">
					<ul class="list-group">
						<li 
							v-for="student,index in generateQuestionStore.state.students" 
							:key="'student'+index"
							class="list-group-item"
						>
							<span style="font-size:22px">Variant {{ student.id }}</span>			
							<router-link
								:to="'/supervisor/student/'+student.id+'/answers'"
								class="btn btn-warning btn-sm mb-1 float-end"
							>
								Answers
							</router-link>
							<router-link
								:to="'/supervisor/student/'+student.id+'/questions'"
								class="btn btn-success btn-sm mb-1 float-end"
								style="margin-right:10px"
							>
								View
							</router-link>
							&nbsp;
						</li>
					</ul>	
				</div>
				

				<!-- <div
					v-for="student,index in generateQuestionStore.state.students" 
					:key="'student'+index"			
				>
					<h4 class="text-center mt-5">#{{ student.id }}  <input type="text" readonly style="width:350px"></h4>
					<div class="column2">
						<div 
							v-for="question,index in generateQuestionStore.state.group.generated_questions" :key="'question'+index"
						>
							<div 
								v-if="question.group_student_id == student.id"
								class="card mt-3 mb-3"
							>
								
								<div class="card-body">
								  	<h4
								  		v-if="
								  		question.question.qresource && 
								  		question.question.qresource.type_id == resourceTypes.Text
								  		"
								  	>
								  		{{ question.question.qresource.text }}
								  	</h4>
								    <h5 class="card-title">{{ question.question.question }}</h5>
								    <ol
								    	type="A"
								    >
										<li 
											v-for="answer,index in question.question.answers" 
											:key="'asnwer'+index"
											:class="{'lightgreen':answer.is_correct}"		
										>	
											{{ answer.answer }}
										</li>
									</ol>
								</div>
							</div>
						</div>
					</div>
					<hr class="mt-5 mb-5" />
				</div>	 -->
			</div>
		</div>		
	</div>
</template>

<script>
	import {store as generateQuestionStore} from '@/store/modules/generate-questions'
	import {resourceTypes} from '@/constants/config'
	import moment from 'moment'
	export default{
		data(){
			return {
				moment,
				generateQuestionStore,
				resourceTypes,
			}
		},
		mounted(){
	        generateQuestionStore.methods.getSupervisorGroup(this.$route.params.id);
	        generateQuestionStore.methods.getStudents(this.$route.params.id);
	    },
	}
</script>

<style>
	.column2 {
		columns: auto 2;
	}
	hr{
		border-width:3px;
	}
	@media print{
		.container{
			max-width:100%!important;
		}
		.lightgreen{
			background: #fff!important;
		}		
		.no-print{
			display:none!important;
		}
	}
</style>