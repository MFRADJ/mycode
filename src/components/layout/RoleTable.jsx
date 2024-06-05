import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import axios from 'axios';

const RoleTable = ({ roles, fetchRoles }) => {

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/admin/roles/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            fetchRoles();
        } catch (error) {
            console.error('Error deleting role', error);
        }
    };

    return (
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
                    {roles.map(role => (
                        <TableRow key={role.id}>
                            <TableCell>{role.id}</TableCell>
                            <TableCell>{role.name}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="secondary" onClick={() => handleDelete(role.id)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default RoleTable;
