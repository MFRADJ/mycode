import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
    Container, Box, Typography, Button, Table, TableBody, TableCell, TableContainer,
    TableHead, TableRow, Paper, Modal
} from '@mui/material';
import AddUserForm from '../components/layout/AddUserForm';
import AddRoleForm from '../components/layout/AddRoleForm';

const DashboardAdmin = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [openUserModal, setOpenUserModal] = useState(false);
    const [openRoleModal, setOpenRoleModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [selectedRole, setSelectedRole] = useState(null);

    useEffect(() => {
        fetchUsers();
        fetchRoles();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8080/admin/users', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users', error);
        }
    };

    const fetchRoles = async () => {
        try {
            const response = await axios.get('http://localhost:8080/admin/roles', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            setRoles(response.data);
        } catch (error) {
            console.error('Error fetching roles', error);
        }
    };

    const handleOpenUserModal = (user) => {
        setSelectedUser(user);
        setOpenUserModal(true);
    };

    const handleOpenRoleModal = (role) => {
        setSelectedRole(role);
        setOpenRoleModal(true);
    };

    const handleCloseUserModal = () => {
        setOpenUserModal(false);
        setSelectedUser(null);
        fetchUsers();
    };

    const handleCloseRoleModal = () => {
        setOpenRoleModal(false);
        setSelectedRole(null);
        fetchRoles();
    };

    return (
        <Container>
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>Admin Dashboard</Typography>
                <Button variant="contained" color="primary" onClick={() => handleOpenUserModal(null)}>
                    Add New User
                </Button>
                <Button variant="contained" color="secondary" onClick={() => handleOpenRoleModal(null)}>
                    Add New Role
                </Button>

                <Typography variant="h6" sx={{ marginTop: 4 }}>Users</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>First Name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleOpenUserModal(user)}>Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Typography variant="h6" sx={{ marginTop: 4 }}>Roles</Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {roles.map((role) => (
                                <TableRow key={role.id}>
                                    <TableCell>{role.id}</TableCell>
                                    <TableCell>{role.name}</TableCell>
                                    <TableCell>
                                        <Button onClick={() => handleOpenRoleModal(role)}>Edit</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Modal
                    open={openUserModal}
                    onClose={handleCloseUserModal}
                >
                    <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '10%' }}>
                        <AddUserForm user={selectedUser} onClose={handleCloseUserModal} />
                    </Box>
                </Modal>

                <Modal
                    open={openRoleModal}
                    onClose={handleCloseRoleModal}
                >
                    <Box sx={{ padding: 4, backgroundColor: 'white', margin: 'auto', marginTop: '10%' }}>
                        <AddRoleForm role={selectedRole} onClose={handleCloseRoleModal} />
                    </Box>
                </Modal>
            </Box>
        </Container>
    );
};

export default DashboardAdmin;
