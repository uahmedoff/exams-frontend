<template>
	<div class="container">
        <div class="row">
            <div class="col-lg-12">
                <h3 class="mt-5 mb-3">Exams</h3>
          		<div class="row">
          			<div class="col-md-3">
          				<select
          					v-model="branch_id"
          					class="form-control"
          				>
          					<option></option>
          					<option value="7">Darkhan</option>
          					<option value="9">Drujba</option>
          					<option value="11">Tinchlik</option>
          					<option value="12">Oybek</option>
          					<option value="29">Sergeli</option>
          					<option value="30">Yunusobod</option>
          					<option value="33">Novza</option>
          				</select>
          			</div>
          			<div class="col-md-3">
          				<b-form-datepicker id="example-datepicker" v-model="exam_date" class="mb-2"></b-form-datepicker>
          			</div>
          			<div class="col-md-3">
          				<button @click.prevent="store.methods.getExamGroups(branch_id,exam_date)">Get groups</button>
          			</div>
          		</div>
          		<div class="row">
          			<div class="col-md-12">
          				<!-- {{ store.state.groups }} -->
          				
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
								<tr v-for="group,index in store.state.groups" :key="'group'+index">
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
											v-if="store.state.isBuilding"
											class="btn btn-success btn-sm disabled"
										>
											Generating exam questions. Please wait...
										</a>
										<a 
											v-else-if="group.exam_date == moment().format('YYYY-MM-DD') && !group.generated_questions_count"
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
		</div>
	</div>
</template>

<script>
	import { store } from '@/store/modules/generate-questions'
	import moment from 'moment'
	export default{
		data(){
			return {
				store,
				moment,
				branch_id: '',
				exam_date: moment().format("YYYY-MM-DD"),
				date: moment().format("YYYY-MM-DD")
			}
		},
		methods:{
	    	async generateExamQuestions(group_id){
	    		await store.methods.generateQuestions(group_id);
	    		await store.methods.getExamGroups(this.branch_id,this.exam_date);

	    		// await store.methods.getGroups({
		     	//    	date: this.date
			    // });	

	    	}
	    }
	}
</script>