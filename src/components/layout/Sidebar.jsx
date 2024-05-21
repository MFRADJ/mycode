// src/components/Sidebar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar, IconButton } from '@mui/material';
import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import ChatIcon from '@mui/icons-material/Chat';
import BarChartIcon from '@mui/icons-material/BarChart';
import BuildIcon from '@mui/icons-material/Build';
import HelpIcon from '@mui/icons-material/Help';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const Sidebar = () => {
    const [open, setOpen] = useState(true);

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Drawer
            variant="persistent"
            open={open}
            sx={{
                width: open ? 240 : 0,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: 240,
                    boxSizing: 'border-box',
                    transition: 'width 0.3s',
                },
            }}
            onClose={handleDrawerClose}
        >
            <Toolbar />
            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0 8px' }}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
            <List>
                <ListItem button component={Link} to="/trainer-dashboard/courses">
                    <ListItemIcon><DesktopMacIcon /></ListItemIcon>
                    <ListItemText primary="Cours" />
                </ListItem>
                <ListItem button component={Link} to="/trainer-dashboard/communication">
                    <ListItemIcon><ChatIcon /></ListItemIcon>
                    <ListItemText primary="Communication" />
                </ListItem>
                <ListItem button component={Link} to="/trainer-dashboard/performance">
                    <ListItemIcon><BarChartIcon /></ListItemIcon>
                    <ListItemText primary="Performances" />
                </ListItem>
                <ListItem button component={Link} to="/trainer-dashboard/tools">
                    <ListItemIcon><BuildIcon /></ListItemIcon>
                    <ListItemText primary="Outils" />
                </ListItem>
                <ListItem button component={Link} to="/trainer-dashboard/resources">
                    <ListItemIcon><HelpIcon /></ListItemIcon>
                    <ListItemText primary="Ressources" />
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;
