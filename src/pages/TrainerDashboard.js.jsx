// src/components/TrainerDashboard.js
import React, { useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Box, Toolbar, Typography, Button, IconButton, Menu, MenuItem, AppBar } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Sidebar from '../components/layout/Sidebar';

const TrainerDashboard = () => {
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);

    const handleProfileMenuClick = (event) => {
        setProfileAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setProfileAnchorEl(null);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar />
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <AppBar position="static" color="default">
                    <Toolbar>
                        <Box sx={{ flexGrow: 1 }} />
                        <IconButton color="inherit" component={Link} to="/messages">
                            <MessageIcon />
                        </IconButton>
                        <IconButton color="inherit" component={Link} to="/notifications">
                            <NotificationsIcon />
                        </IconButton>
                        <IconButton edge="end" aria-label="account" aria-controls="profile-menu" aria-haspopup="true" color="inherit" onClick={handleProfileMenuClick}>
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="profile-menu"
                            anchorEl={profileAnchorEl}
                            keepMounted
                            open={Boolean(profileAnchorEl)}
                            onClose={handleProfileMenuClose}
                        >
                            <MenuItem component={Link} to="/participants">Participants</MenuItem>
                            <MenuItem component={Link} to="/trainer-dashboard/courses">Mes cours</MenuItem>
                            <MenuItem component={Link} to="/portfolio">Mon profil (Portfolio)</MenuItem>
                            <MenuItem component={Link} to="/profile-settings">Paramètres de profil</MenuItem>
                            <MenuItem component={Link} to="/logout">Se déconnecter</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>
                <Toolbar />
                <Routes>
                    <Route path="courses" element={<Courses />} />
                    <Route path="communication" element={<Communication />} />
                    <Route path="performance" element={<Performance />} />
                    <Route path="tools" element={<Tools />} />
                    <Route path="resources" element={<Resources />} />
                </Routes>
            </Box>
        </Box>
    );
};

const Courses = () => (
    <div>
        <Typography variant="h4" gutterBottom>
            Gérer vos cours
        </Typography>
        <Button variant="contained" color="primary">
            Créez votre cours
        </Button>
    </div>
);

const Communication = () => (
    <div>
        <Typography variant="h4" gutterBottom>
            Communication avec les participants
        </Typography>
        {/* Add content here */}
    </div>
);

const Performance = () => (
    <div>
        <Typography variant="h4" gutterBottom>
            Suivi des performances
        </Typography>
        {/* Add content here */}
    </div>
);

const Tools = () => (
    <div>
        <Typography variant="h4" gutterBottom>
            Outils de formateur
        </Typography>
        {/* Add content here */}
    </div>
);

const Resources = () => (
    <div>
        <Typography variant="h4" gutterBottom>
            Ressources pour les formateurs
        </Typography>
        {/* Add content here */}
    </div>
);

export default TrainerDashboard;
