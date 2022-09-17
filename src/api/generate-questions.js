import api from './axios'

const getGroups = (params) => {
    return api.get(`/generate-questions/groups`,{
        params:{
            ...params
        }
    });
}

const getExamGroups = (branch_id,exam_date) => {
    return api.get(`/generate-questions/exam-groups/branch/${branch_id}/exam-date/${exam_date}`);
}

const generateQuestions = (supervisor_group_id) => {
    return api.post(`/generate-questions/supervisor_group/${supervisor_group_id}/generate`);
}

const getSupervisorGroup = (supervisor_group_id) => {
    return api.get(`/generate-questions/supervisor_group/${supervisor_group_id}`);
}

const getStudents = (supervisor_group_id) => {
    return api.get(`/generate-questions/supervisor_group/${supervisor_group_id}/students`);
}

const getStudent = (group_student_id) => {
    return api.get(`/generate-questions/group_student/${group_student_id}`);
}

const getStudentQuestions = (group_student_id) => {
    return api.get(`/generate-questions/group_student/${group_student_id}/questions`);
}

const getGeneratedQuestionSupervisorGroup = (group_student_id) => {
    return api.get(`/generate-questions/group_student/${group_student_id}/supervisor-group`);
}

export default{
    getGroups,
    getExamGroups,
    generateQuestions,
    getSupervisorGroup,
    getStudents,
    getStudent,
    getStudentQuestions,
    getGeneratedQuestionSupervisorGroup
}