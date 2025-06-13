import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: true, // Include cookies
});

export const getAdminProfile = async () => {
    const res = await API.get('/admin/profile');
    return res.data;
};
