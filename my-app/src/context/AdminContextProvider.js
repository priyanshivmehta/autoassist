import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { getUserProfile, updateUserProfile, deleteUserAccount } from '../api/userApi';
import { getAdminProfile } from '../api/adminApi';

const AdminContext = createContext();

export const useAdmin = () => useContext(AdminContext);

export const AdminContextProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);
    // const navigate = useNavigate();

    const fetchAdminProfile = async () => {
        try {
            const profile = await getAdminProfile();
            setAdmin(profile);
            console.log("Admin profile fetched:", profile);
        } catch (error) {
            console.error("Failed to fetch Admin profile:", error);
            setAdmin(null);
        } finally {
            setLoading(false);
        }
    };

    // const updateProfile = async (updatedData) => {
    //     try {
    //         const updatedProfile = await updateAdminProfile(updatedData);
    //         setAdmin(updatedProfile);
    //     } catch (error) {
    //         console.error("Failed to update profile:", error);
    //     }
    // };

    // const deleteAccount = async () => {
    //     try {
    //         await deleteAdminAccount();
    //         setAdmin(null);
    //         navigate('/login');
    //     } catch (error) {
    //         console.error("Failed to delete account:", error);
    //     }
    // };

    useEffect(() => {
        fetchAdminProfile();
    }, []);

    return (
        // <AdminContext.Provider value={{ Admin, loading, updateProfile, deleteAccount }}>
        <AdminContext.Provider value={{ admin, loading }}>
            {children}
        </AdminContext.Provider>
    );
};
export default AdminContextProvider;