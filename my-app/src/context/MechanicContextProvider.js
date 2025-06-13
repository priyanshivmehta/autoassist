import React, { useState, useEffect, createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
// import { getUserProfile, updateUserProfile, deleteUserAccount } from '../api/userApi';
import { getMechanicProfile } from '../api/mechanicApi';

const MechanicContext = createContext();

export const useMechanic = () => useContext(MechanicContext);

export const MechanicContextProvider = ({ children }) => {
    const [Mechanic, setMechanic] = useState(null);
    const [loading, setLoading] = useState(true);
    // const navigate = useNavigate();

    const fetchMechanicProfile = async () => {
        try {
            const profile = await getMechanicProfile();
            setMechanic(profile);
            console.log("Mechanic profile fetched:", profile);
        } catch (error) {
            console.error("Failed to fetch Mechanic profile:", error);
            setMechanic(null);
        } finally {
            setLoading(false);
        }
    };

    // const updateProfile = async (updatedData) => {
    //     try {
    //         const updatedProfile = await updateMechanicProfile(updatedData);
    //         setMechanic(updatedProfile);
    //     } catch (error) {
    //         console.error("Failed to update profile:", error);
    //     }
    // };

    // const deleteAccount = async () => {
    //     try {
    //         await deleteMechanicAccount();
    //         setMechanic(null);
    //         navigate('/login');
    //     } catch (error) {
    //         console.error("Failed to delete account:", error);
    //     }
    // };

    useEffect(() => {
        fetchMechanicProfile();
    }, []);

    return (
        // <MechanicContext.Provider value={{ Mechanic, loading, updateProfile, deleteAccount }}>
        <MechanicContext.Provider value={{ Mechanic, loading }}>
            {children}
        </MechanicContext.Provider>
    );
};
export default MechanicContextProvider;