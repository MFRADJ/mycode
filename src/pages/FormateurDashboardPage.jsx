import React from 'react';
import { Container, Box, Typography } from '@mui/material';

const TrainerDashboardPage = () => {
    return (
        <Container>
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>Tableau de Bord du Formateur</Typography>
                <Typography variant="body1">Ici, vous pouvez gérer vos cours, voir les progrès des étudiants et plus encore.</Typography>
            </Box>
        </Container>
    );
};

export default TrainerDashboardPage;
