import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

const ScheduleSessionPage = ({ professorId }) => {
    const [open, setOpen] = useState(false);
    const [liveSession, setLiveSession] = useState({ title: '', start: '', end: '', url: '' });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setLiveSession({ ...liveSession, [name]: value });
    };

    const handleSaveSession = async () => {
        try {
            const response = await axios.post('/api/live-sessions', {
                ...liveSession,
                professorId
            });
            console.log('Live session saved:', response.data);

            setOpen(false);
            setLiveSession({ title: '', start: '', end: '', url: '' });

        } catch (error) {
            console.error('Error saving live session', error);
        }
    };

    return (
        <Container>
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>Planifier une Séance en Direct</Typography>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Ajouter une Séance
                </Button>

                <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                    <DialogTitle>Ajouter une Séance en Direct</DialogTitle>
                    <DialogContent>
                        <TextField
                            label="Titre"
                            name="title"
                            value={liveSession.title}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Début"
                            name="start"
                            type="datetime-local"
                            value={liveSession.start}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Fin"
                            name="end"
                            type="datetime-local"
                            value={liveSession.end}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="URL"
                            name="url"
                            value={liveSession.url}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">Annuler</Button>
                        <Button onClick={handleSaveSession} color="primary">Enregistrer</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
};

export default ScheduleSessionPage;
