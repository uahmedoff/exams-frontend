import api from './axios'

const getGroups = () => {
    return api.get(`/generate-questions/groups`);
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

export default{
    getGroups,
    generateQuestions,
    getSupervisorGroup,
    getStudents,
    getStudent,
    getStudentQuestions
}