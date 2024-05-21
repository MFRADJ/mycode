// src/components/layout/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import ChatIcon from '@mui/icons-material/Chat';
import BarChartIcon from '@mui/icons-material/BarChart';
import BuildIcon from '@mui/icons-material/Build';
import HelpIcon from '@mui/icons-material/Help';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = ({ isOpen, toggleDrawer }) => {
    return (
        <>
            <Drawer
                variant="permanent"
                open={isOpen}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: isOpen ? 240 : 60,
                        transition: 'width 0.3s',
                        overflowX: 'hidden',
                    },
                }}
            >
                <IconButton onClick={toggleDrawer} sx={{ margin: '10px' }}>
                    <MenuIcon />
                </IconButton>
                <List>
                    <ListItem button component={Link} to="/trainer-dashboard/courses">
                        <ListItemIcon><DesktopMacIcon /></ListItemIcon>
                        {isOpen && <ListItemText primary="Cours" />}
                    </ListItem>
                    <ListItem button component={Link} to="/trainer-dashboard/communication">
                        <ListItemIcon><ChatIcon /></ListItemIcon>
                        {isOpen && <ListItemText primary="Communication" />}
                    </ListItem>
                    <ListItem button component={Link} to="/trainer-dashboard/performance">
                        <ListItemIcon><BarChartIcon /></ListItemIcon>
                        {isOpen && <ListItemText primary="Performances" />}
                    </ListItem>
                    <ListItem button component={Link} to="/trainer-dashboard/tools">
                        <ListItemIcon><BuildIcon /></ListItemIcon>
                        {isOpen && <ListItemText primary="Outils" />}
                    </ListItem>
                    <ListItem button component={Link} to="/trainer-dashboard/resources">
                        <ListItemIcon><HelpIcon /></ListItemIcon>
                        {isOpen && <ListItemText primary="Ressources" />}
                    </ListItem>
                </List>
            </Drawer>
        </>
    );
};

export default Sidebar;
