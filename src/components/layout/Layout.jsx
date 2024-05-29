import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import DashboardNavbar from './DashboardNavbar'; // Importez la nouvelle barre de navigation
import Footer from './Footer';
import {useAuth} from "../../contexts/AuthContext";

const Layout = ({ children }) => {
    const location = useLocation();
    const { isAuthenticated } = useAuth();
    const hideNavbarRoutes = ['/login', '/signup', '/become-teacher'];
    const dashboardRoutes = ['/dashboard'];

    const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);
    const isDashboardRoute = dashboardRoutes.includes(location.pathname);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            {!shouldHideNavbar && !isDashboardRoute && <Navbar />}
            {isDashboardRoute && isAuthenticated && <DashboardNavbar />}

            {/*{!shouldHideNavbar && !isAuthenticated && <Navbar />}*/}
            {/*{!shouldHideNavbar && isDashboardRoute && isAuthenticated && <DashboardNavbar />}*/}
            <main style={{ flex: 1 }}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
