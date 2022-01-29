import api from './axios'

const login = (credentials) => {
    return api.post(`/auth/login`,credentials);
}

const getCurrentUser = () => {
    return api.post(`/auth/me`);
}

const getStudent = () => {
    return api.get(`/students`)
}

export default{
    login,
    getCurrentUser
}