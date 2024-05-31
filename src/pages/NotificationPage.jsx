import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

const NotificationsPage = ({ userId, userType }) => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await axios.get(`/api/notifications/${userId}/${userType}`);
                setNotifications(response.data);
            } catch (error) {
                console.error('Error fetching notifications', error);
            }
        };

        fetchNotifications();
    }, [userId, userType]);

    return (
        <Container>
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>Notifications</Typography>
                <List>
                    {notifications.map((notification) => (
                        <ListItem key={notification.id}>
                            <ListItemText
                                primary={notification.title}
                                secondary={notification.message}
                            />
                        </ListItem>
                    ))}
                </List>
            </Box>
        </Container>
    );
};

export default NotificationsPage;
