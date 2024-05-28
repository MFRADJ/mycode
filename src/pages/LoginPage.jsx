import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Grid, Card, CardContent, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';

const LoginPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/authenticate', formData);
            if (response.status === 200) {
                login();
                navigate('/dashboard');
            }
        } catch (error) {
            alert('Invalid email or password');
        }
    };


    const handleForgotPassword = () => {
        navigate('/forgot-password');
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    return (
        <Container>
            <Box sx={{ padding: 4 }}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h4" gutterBottom>Login</Typography>
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        type="email"
                                        required
                                    />
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        type="password"
                                        required
                                    />
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ marginTop: 2 }}
                                    >
                                        Login
                                    </Button>
                                </form>
                                <Grid container justifyContent="space-between" sx={{ marginTop: 2 }}>
                                    <Grid item>
                                        <Link component="button" variant="body2" onClick={handleForgotPassword}>
                                            Mot de passe oublié ?
                                        </Link>
                                    </Grid>
                                    <Grid item>
                                        <Link component="button" variant="body2" onClick={handleSignUp}>
                                            Vous n'avez pas un compte ? S'inscrire
                                        </Link>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default LoginPage;
