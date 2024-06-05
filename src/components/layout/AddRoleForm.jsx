import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';
import axios from 'axios';

const AddRoleForm = ({ role, fetchRoles, setSelectedRole }) => {
    const [formData, setFormData] = useState(role);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.id) {
                await axios.put(`http://localhost:8080/admin/roles/${formData.id}`, formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
            } else {
                await axios.post('http://localhost:8080/admin/roles', formData, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('authToken')}`
                    }
                });
            }
            fetchRoles();
            setSelectedRole(null);
        } catch (error) {
            console.error('Error saving role', error);
        }
    };

    return (
        <Modal open={Boolean(role)} onClose={() => setSelectedRole(null)}>
            <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '10%', width: 400 }}>
                <Typography variant="h6" gutterBottom>{formData.id ? 'Edit Role' : 'Add Role'}</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        label="Role Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
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

export default AddRoleForm;
