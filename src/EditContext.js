import React, { createContext, useContext, useState } from 'react';

// Create a context
const EditContext = createContext();

// Create a provider component
export const EditProvider = ({ children }) => {
    const [editData, setEditData] = useState(null);

    // Function to update the edit data
    const updateEditData = (data) => {
        setEditData(data);
    };

    return (
        <EditContext.Provider value={{ editData, updateEditData }}>
            {children}
        </EditContext.Provider>
    );
};

// Custom hook to use edit context
export const useEditContext = () => useContext(EditContext);
