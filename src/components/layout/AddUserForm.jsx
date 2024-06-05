import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

const AddUserForm = ({ user, fetchUsers, setSelectedUser }) => {
    const [formData, setFormData] = useState(user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.id) {
                await axios.put(`http://localhost:8080/admin/users/${formData.id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
            } else {
                await axios.post('http://localhost:8080/admin/users', formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
            }
            fetchUsers();
            setSelectedUser(null);
        } catch (error) {
            console.error('Error saving user', error);
        }
    };

    return (
        <Modal open={Boolean(user)} onClose={() => setSelectedUser(null)}>
            <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '10%', width: 400 }}>
                <Typography variant="h6" gutterBottom>{formData.id ? 'Edit User' : 'Add User'}</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="First Name"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Last Name"
                        name="lastName"
                        value={formData.lastName}
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
                    <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
                        Save
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default AddUserForm;
