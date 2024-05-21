// src/contexts/DashboardNavbarContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DashboardNavbarContext = createContext();

export const DashboardNavbarProvider = ({ children }) => {
    const [showDashboardNavbar, setShowDashboardNavbar] = useState(false);
    const location = useLocation();

    const isDashboardRoute = location.pathname.startsWith('/trainer-dashboard');

    useEffect(() => {
        setShowDashboardNavbar(isDashboardRoute);
    }, [isDashboardRoute]);

    return (
        <DashboardNavbarContext.Provider value={{ showDashboardNavbar }}>
            {children}
        </DashboardNavbarContext.Provider>
    );
};

export const useDashboardNavbar = () => {
    return useContext(DashboardNavbarContext);
};
