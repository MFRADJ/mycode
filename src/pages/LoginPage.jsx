// import React, { useState } from 'react';
// import { Container, Box, Typography, TextField, Button, Grid, Card, CardContent } from '@mui/material';
//
// const LoginPage = () => {
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
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
//                                 <Typography variant="h4" gutterBottom>Login</Typography>
//                                 <form onSubmit={handleSubmit}>
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
//                                     <Button
//                                         type="submit"
//                                         variant="contained"
//                                         color="primary"
//                                         fullWidth
//                                         sx={{ marginTop: 2 }}
//                                     >
//                                         Login
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
// export default LoginPage;
import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Grid, Card, CardContent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import usersData from './user.json'; // Assurez-vous que le chemin est correct
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

    const handleSubmit = (e) => {
        e.preventDefault();

        // Check user credentials from the users.json file
        const user = usersData.find(user => user.email === formData.email && user.password === formData.password);
        if (user) {
            login();
            navigate('/dashboard');
        } else {
            alert('Invalid email or password');
        }
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
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default LoginPage;
