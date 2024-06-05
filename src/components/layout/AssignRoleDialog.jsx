import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

const AssignRoleDialog = ({ open, onClose, users, roles }) => {
    const [selectedUserId, setSelectedUserId] = useState('');
    const [selectedRoleId, setSelectedRoleId] = useState('');

    const handleAssign = async () => {
        try {
            await axios.put(`http://localhost:8080/admin/roles/${selectedRoleId}/users/${selectedUserId}`);
            alert('Role assigned successfully');
            onClose();
        } catch (error) {
            alert('Error assigning role');
            console.error(error);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Assign Role to User</DialogTitle>
            <DialogContent>
                <FormControl fullWidth margin="normal">
                    <InputLabel>User</InputLabel>
                    <Select
                        value={selectedUserId}
                        onChange={(e) => setSelectedUserId(e.target.value)}
                    >
                        {users.map((user) => (
                            <MenuItem key={user.id} value={user.id}>
                                {user.firstName} {user.lastName} ({user.email})
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Role</InputLabel>
                    <Select
                        value={selectedRoleId}
                        onChange={(e) => setSelectedRoleId(e.target.value)}
                    >
                        {roles.map((role) => (
                            <MenuItem key={role.id} value={role.id}>
                                {role.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Cancel
                </Button>
                <Button onClick={handleAssign} color="primary">
                    Assign
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AssignRoleDialog;
