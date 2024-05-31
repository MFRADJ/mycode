import React, { useState } from 'react';
import { Container, Box, Typography, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

const ScheduleEvaluationPage = ({ professorId }) => {
    const [open, setOpen] = useState(false);
    const [evaluationDetails, setEvaluationDetails] = useState({
        quizzes: [],
        tests: [],
        finalEvaluation: { title: '', url: '' },
    });

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEvaluationDetails({ ...evaluationDetails, [name]: value });
    };

    const handleAddQuiz = () => {
        setEvaluationDetails({
            ...evaluationDetails,
            quizzes: [...evaluationDetails.quizzes, { title: '', questions: [] }]
        });
    };

    const handleAddTest = () => {
        setEvaluationDetails({
            ...evaluationDetails,
            tests: [...evaluationDetails.tests, { title: '', url: '' }]
        });
    };

    const handleSaveEvaluation = async () => {
        try {
            const response = await axios.post('/api/evaluations', {
                ...evaluationDetails,
                professorId
            });
            console.log('Evaluation saved:', response.data);

            setOpen(false);
            setEvaluationDetails({
                quizzes: [],
                tests: [],
                finalEvaluation: { title: '', url: '' },
            });

        } catch (error) {
            console.error('Error saving evaluation', error);
        }
    };

    return (
        <Container>
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>Planifier une Évaluation</Typography>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Ajouter une Évaluation
                </Button>

                <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                    <DialogTitle>Ajouter une Évaluation</DialogTitle>
                    <DialogContent>
                        <Typography variant="h6">Quiz</Typography>
                        {evaluationDetails.quizzes.map((quiz, index) => (
                            <Box key={index} sx={{ marginBottom: 2 }}>
                                <TextField
                                    label={`Titre du Quiz ${index + 1}`}
                                    value={quiz.title}
                                    onChange={(e) => {
                                        const newQuizzes = [...evaluationDetails.quizzes];
                                        newQuizzes[index].title = e.target.value;
                                        setEvaluationDetails({ ...evaluationDetails, quizzes: newQuizzes });
                                    }}
                                    fullWidth
                                    margin="normal"
                                />
                                {/* Add more fields for questions if needed */}
                            </Box>
                        ))}
                        <Button onClick={handleAddQuiz} variant="outlined">
                            Ajouter un Quiz
                        </Button>

                        <Typography variant="h6" sx={{ marginTop: 4 }}>Tests</Typography>
                        {evaluationDetails.tests.map((test, index) => (
                            <Box key={index} sx={{ marginBottom: 2 }}>
                                <TextField
                                    label={`Titre du Test ${index + 1}`}
                                    value={test.title}
                                    onChange={(e) => {
                                        const newTests = [...evaluationDetails.tests];
                                        newTests[index].title = e.target.value;
                                        setEvaluationDetails({ ...evaluationDetails, tests: newTests });
                                    }}
                                    fullWidth
                                    margin="normal"
                                />
                                <TextField
                                    label={`URL du Test ${index + 1}`}
                                    value={test.url}
                                    onChange={(e) => {
                                        const newTests = [...evaluationDetails.tests];
                                        newTests[index].url = e.target.value;
                                        setEvaluationDetails({ ...evaluationDetails, tests: newTests });
                                    }}
                                    fullWidth
                                    margin="normal"
                                />
                            </Box>
                        ))}
                        <Button onClick={handleAddTest} variant="outlined">
                            Ajouter un Test
                        </Button>

                        <Typography variant="h6" sx={{ marginTop: 4 }}>Évaluation Finale</Typography>
                        <TextField
                            label="Titre de l'Évaluation Finale"
                            name="finalEvaluation.title"
                            value={evaluationDetails.finalEvaluation.title}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="URL de l'Évaluation Finale"
                            name="finalEvaluation.url"
                            value={evaluationDetails.finalEvaluation.url}
                            onChange={handleInputChange}
                            fullWidth
                            margin="normal"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary">Annuler</Button>
                        <Button onClick={handleSaveEvaluation} color="primary">Enregistrer</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Container>
    );
};

export default ScheduleEvaluationPage;
