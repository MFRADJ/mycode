import React from 'react';
import {BrowserRouter as Router, Route, Routes, useLocation} from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import CoursePage from "./pages/CoursePage";
import CourseDetailPage from "./pages/CourseDetailPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import {AuthProvider} from "./contexts/AuthContext";
import TrainerDashboard from "./pages/TrainerDashboard.js";
import VerificationPage from "./pages/VerificationPage";
import MessagesPage from "./pages/MessagePage";

function App() {


    return (

        <AuthProvider>
        <Router>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/courses/:theme/:subject" element={<CoursePage />} />
                    <Route path="/search/:searchQuery" element={<CoursePage />} />
                    <Route path="/courses/:theme/:subject/:title" element={<CourseDetailPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/messages" element={<MessagesPage/>} />
                    <Route path="/activate-account" element={<VerificationPage/>} />
                    <Route path="/dashboard" element={<DashboardPage />} />
                    <Route path="/trainer-dashboard/*" element={<TrainerDashboard />} />
                </Routes>
            </Layout>
        </Router>
        </AuthProvider>
    );
}

export default App;
