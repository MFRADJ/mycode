import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VerificationPage = () => {
    const [verificationCode, setVerificationCode] = useState('');
    const [activationStatus, setActivationStatus] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setVerificationCode(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`http://localhost:8080/auth/activate-account?token=${verificationCode}`);
            if (response.status === 200) {
                alert('Your account has been activated successfully!');
                navigate('/login'); // Redirige vers la page de connexion
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setActivationStatus(error.response.data);
            } else {
                setActivationStatus('An error occurred during account activation.');
            }
        }
    };

    return (
        <Container>
            <Box sx={{ padding: 4 }}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h4" gutterBottom>Account Activation</Typography>
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Verification Code"
                                        value={verificationCode}
                                        onChange={handleChange}
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ marginTop: 2 }}
                                    >
                                        Activate My Account
                                    </Button>
                                </form>
                                {activationStatus && (
                                    <Typography variant="body1" color="error" sx={{ marginTop: 2 }}>
                                        {activationStatus}
                                    </Typography>
                                )}
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default VerificationPage;
