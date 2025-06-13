import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:3000/',
    withCredentials: true, // Include cookies
});

export const getUserProfile = async () => {
    const res = await API.get('/user/profile');
    return res.data;
};

// export const updateUserProfile = async (updatedData) => {
//     const res = await API.put('/user/', updatedData);
//     return res.data;
// };

// export const deleteUserAccount = async () => {
//     await API.delete('/user/');
// };
