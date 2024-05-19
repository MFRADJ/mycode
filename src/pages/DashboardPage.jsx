import React from 'react';
import { Container, Box, Typography } from '@mui/material';

const DashboardPage = () => {
    return (
        <Container>
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>Welcome to your Dashboard</Typography>
                <Typography variant="body1">Here you can manage your courses, view progress, and more.</Typography>
            </Box>
        </Container>
    );
};

export default DashboardPage;
