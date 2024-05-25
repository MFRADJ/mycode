// src/components/TrainerDashboard.js
import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import {
    Box,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Menu,
    MenuItem,
    AppBar,
    Card,
    CardContent,
    CardActions
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Sidebar from '../components/layout/Sidebar';
import CreatePage from './CreatePage';

const TrainerDashboard = () => {
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const handleProfileMenuClick = (event) => {
        setProfileAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setProfileAnchorEl(null);
    };

    const toggleDrawer = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <Sidebar isOpen={isSidebarOpen} toggleDrawer={toggleDrawer} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: 3,
                    marginLeft: isSidebarOpen ? '240px' : '60px', // Ajustement dynamique de la marge
                    transition: 'margin-left 0.3s',
                }}
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
                    <Route path="create" element={<CreatePage />} /> {/* Ajouter la route pour CreatePage */}
                </Routes>
            </Box>
        </Box>
    );
};

const Courses = () => {
    const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

    const courses = [
        { id: 1, title: 'Cours 1', description: 'Description du cours 1' },
        { id: 2, title: 'Cours 2', description: 'Description du cours 2' },
        { id: 3, title: 'Cours 3', description: 'Description du cours 3' },
    ];

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                Gérer vos cours
            </Typography>
            <Button
                variant="contained"
                color="primary"
                onClick={() => navigate('/trainer-dashboard/create')} // Rediriger vers CreatePage
            >
                Créer Un cours
            </Button>
            <Typography variant="h5" gutterBottom sx={{ marginTop: 4 }}>
                Mes cours
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                {courses.map((course) => (
                    <Card key={course.id} sx={{ width: 300 }}>
                        <CardContent>
                            <Typography variant="h6">
                                {course.title}
                            </Typography>
                            <Typography variant="body2">
                                {course.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">Modifier</Button>
                            <Button size="small" color="secondary">Supprimer</Button>
                        </CardActions>
                    </Card>
                ))}
            </Box>
        </div>
    );
};

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
