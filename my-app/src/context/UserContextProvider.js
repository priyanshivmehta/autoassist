import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { getUserProfile, updateUserProfile, deleteUserAccount } from '../api/userApi';
import { getUserProfile } from '../api/userApi';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    // const navigate = useNavigate();

    const fetchUserProfile = async () => {
        try {
            const profile = await getUserProfile();
            setUser(profile);
            console.log("User profile fetched:", profile);
        } catch (error) {
            console.error("Failed to fetch user profile:", error);
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    // const updateProfile = async (updatedData) => {
    //     try {
    //         const updatedProfile = await updateUserProfile(updatedData);
    //         setUser(updatedProfile);
    //     } catch (error) {
    //         console.error("Failed to update profile:", error);
    //     }
    // };

    // const deleteAccount = async () => {
    //     try {
    //         await deleteUserAccount();
    //         setUser(null);
    //         navigate('/login');
    //     } catch (error) {
    //         console.error("Failed to delete account:", error);
    //     }
    // };

    useEffect(() => {
        fetchUserProfile();
    }, []);

    return (
        // <UserContext.Provider value={{ user, loading, updateProfile, deleteAccount }}>
        <UserContext.Provider value={{ user, loading }}>
            {children}
        </UserContext.Provider>
    );
};
export default UserContextProvider;