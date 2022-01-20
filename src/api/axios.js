import axios from 'axios'
import {getItem} from '../helpers/localStorage'

axios.defaults.baseURL = process.env.VUE_APP_API_URL + '/v1';

axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

axios.interceptors.request.use(config => {
    const token = getItem('accessToken');
    const authorizationToken = token ? `Bearer ${token}` : '';
    config.headers.Authorization = authorizationToken;
    return config;    
})

export default axios