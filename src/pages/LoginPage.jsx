import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Grid, Card, CardContent, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

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

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     try {
    //         await login(formData.email, formData.password);
    //         const response = await axios.get('http://localhost:8080/auth/authenticate', { withCredentials: true });
    //         if (response.status === 200) {
    //             const user = response.data;
    //             if (user.role && user.role.some(role => role.name === 'ROLE_ADMIN')) {
    //                 navigate('/admin-dashboard');
    //             } else {
    //                 navigate('/dashboard');
    //             }
    //         }
    //     } catch (error) {
    //         alert('Invalid email or password');
    //     }
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/auth/authenticate', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            });
            if (response.status === 200) {
                login();
                navigate('/dashboard');
            }
        } catch (error) {
            if (error.response) {
                // La requête a été faite et le serveur a répondu avec un code de statut
                // qui tombe en dehors de la plage des 2xx
                console.error('Erreur réponse:', error.response.data);
                console.error('Statut erreur:', error.response.status);
                console.error('En-têtes erreur:', error.response.headers);
                if (error.response.status === 403) {
                    alert('Accès interdit : identifiants invalides ou permissions insuffisantes');
                } else {
                    alert(`Erreur: ${error.response.data.message || 'Erreur inconnue'}`);
                }
            } else if (error.request) {
                // La requête a été faite mais aucune réponse n'a été reçue
                console.error('Requête erreur:', error.request);
                alert('Aucune réponse reçue du serveur');
            } else {
                // Quelque chose s'est passé lors de la configuration de la requête qui a déclenché une erreur
                console.error('Message erreur:', error.message);
                alert('Erreur dans la configuration de la requête');
            }
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
