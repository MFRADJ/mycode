// import React, { useState } from 'react';
// import { Container, Box, Typography, TextField, Button, Grid, Card, CardContent } from '@mui/material';
//
// const SignupPage = () => {
//     const [formData, setFormData] = useState({
//         name: '',
//         email: '',
//         password: '',
//         confirmPassword: '',
//     });
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Handle form submission logic here (e.g., API call)
//     };
//
//     return (
//         <Container>
//             <Box sx={{ padding: 4 }}>
//                 <Grid container justifyContent="center">
//                     <Grid item xs={12} md={6}>
//                         <Card>
//                             <CardContent>
//                                 <Typography variant="h4" gutterBottom>Sign Up</Typography>
//                                 <form onSubmit={handleSubmit}>
//                                     <TextField
//                                         fullWidth
//                                         margin="normal"
//                                         label="Name"
//                                         name="name"
//                                         value={formData.name}
//                                         onChange={handleChange}
//                                         required
//                                     />
//                                     <TextField
//                                         fullWidth
//                                         margin="normal"
//                                         label="Email"
//                                         name="email"
//                                         value={formData.email}
//                                         onChange={handleChange}
//                                         type="email"
//                                         required
//                                     />
//                                     <TextField
//                                         fullWidth
//                                         margin="normal"
//                                         label="Password"
//                                         name="password"
//                                         value={formData.password}
//                                         onChange={handleChange}
//                                         type="password"
//                                         required
//                                     />
//                                     <TextField
//                                         fullWidth
//                                         margin="normal"
//                                         label="Confirm Password"
//                                         name="confirmPassword"
//                                         value={formData.confirmPassword}
//                                         onChange={handleChange}
//                                         type="password"
//                                         required
//                                     />
//                                     <Button
//                                         type="submit"
//                                         variant="contained"
//                                         color="primary"
//                                         fullWidth
//                                         sx={{ marginTop: 2 }}
//                                     >
//                                         Sign Up
//                                     </Button>
//                                 </form>
//                             </CardContent>
//                         </Card>
//                     </Grid>
//                 </Grid>
//             </Box>
//         </Container>
//     );
// };
//
// export default SignupPage;

import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Grid, Card, CardContent } from '@mui/material';
import usersData from './user.json'; // Assurez-vous que le chemin est correct
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const SignupPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        const existingUser = usersData.find(user => user.email === formData.email);
        if (existingUser) {
            alert('User already exists!');
            return;
        }

        usersData.push({
            name: formData.name,
            email: formData.email,
            password: formData.password
        });

        login();
        navigate('/dashboard');
    };

    return (
        <Container>
            <Box sx={{ padding: 4 }}>
                <Grid container justifyContent="center">
                    <Grid item xs={12} md={6}>
                        <Card>
                            <CardContent>
                                <Typography variant="h4" gutterBottom>Sign Up</Typography>
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
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
                                    <TextField
                                        fullWidth
                                        margin="normal"
                                        label="Confirm Password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
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
                                        Sign Up
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default SignupPage;
