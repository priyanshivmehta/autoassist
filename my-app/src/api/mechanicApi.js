import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: true, // Include cookies
});

export const getMechanicProfile = async () => {
    const res = await API.get('/mechanic/profile');
    return res.data;
};
