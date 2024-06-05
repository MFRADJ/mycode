import React from 'react';
import { List, ListItem, ListItemText } from '@mui/material';

const SidebarAdmin = ({ setView }) => {
    return (
        <List component="nav">
            <ListItem button onClick={() => setView('users')}>
                <ListItemText primary="Manage Users" />
            </ListItem>
            <ListItem button onClick={() => setView('roles')}>
                <ListItemText primary="Manage Roles" />
            </ListItem>
        </List>
    );
};

export default SidebarAdmin;
