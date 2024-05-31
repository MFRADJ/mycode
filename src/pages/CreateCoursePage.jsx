import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Grid, Paper, List, ListItem, ListItemText, TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import axios from 'axios';

const CreateCoursePage = ({ professorId }) => {
    const [courses, setCourses] = useState([]);
    const [open, setOpen] = useState(false);
    const [courseDetails, setCourseDetails] = useState({
        title: '',
        description: '',
        content: [],
    });

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/api/courses/professor/${professorId}`);
                setCourses(response.data);
            } catch (error) {
                console.error('Error fetching courses', error);
            }
        };

        fetchCourses();
    }, [professorId]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCourseDetails({ ...courseDetails, [name]: value });
    };

    const handleAddSection = () => {
        setCourseDetails({
            ...courseDetails,
            content: [...courseDetails.content, { title: '', subsections: [] }]
        });
    };

    const handleAddSubsection = (index) => {
        const newContent = [...courseDetails.content];
        newContent[index].subsections.push({ title: '', duration: 0, content: '' });
        setCourseDetails({ ...courseDetails, content: newContent });
    };

    const handleSaveCourse = async () => {
        try {
            const courseResponse = await axios.post('http://localhost:8080/api/courses', {
                title: courseDetails.title,
                description: courseDetails.description,
                professor: { id: professorId } // Ensure professor ID is included
            });

            const courseId = courseResponse.data.id;

            for (const section of courseDetails.content) {
                const sectionResponse = await axios.post('http://localhost:8080/api/sections', {
                    title: section.title,
                    course: { id: courseId }
                });

                const sectionId = sectionResponse.data.id;

                for (const subsection of section.subsections) {
                    const subSectionResponse = await axios.post('http://localhost:8080/api/subsections', {
                        title: subsection.title,
                        duration: subsection.duration,
                        section: { id: sectionId }
                    });

                    const subSectionId = subSectionResponse.data.id;

                    await axios.post('http://localhost:8080/api/contentsubsections', {
                        text: subsection.content,
                        subSection: { id: subSectionId }
                    });
                }
            }

            setOpen(false);
            setCourseDetails({
                title: '',
                description: '',
                content: [],
            });
            // Fetch updated list of courses
            const response = await axios.get(`http://localhost:8080/api/courses/professor/${professorId}`);
            setCourses(response.data);
        } catch (error) {
            console.error('Error saving course', error);
        }
    };

    return (
        <Container>
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>Professor Dashboard</Typography>
                <Button variant="contained" color="primary" onClick={handleOpen}>
                    Add New Course
                </Button>
                <Grid container spacing={4} sx={{ marginTop: 4 }}>
                    <Grid item xs={12}>
                        <Paper sx={{ padding: 2 }}>
                            <Typography variant="h6" gutterBottom>My Courses</Typography>
                            <List>
                                {courses.map(course => (
                                    <ListItem key={course.id}>
                                        <ListItemText primary={course.title} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle>Add/Edit Course</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Title"
                        name="title"
                        value={courseDetails.title}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Description"
                        name="description"
                        value={courseDetails.description}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                        multiline
                    />
                    <Box>
                        <Typography variant="h6">Course Content</Typography>
                        {courseDetails.content.map((section, index) => (
                            <Box key={index} sx={{ marginBottom: 2 }}>
                                <TextField
                                    label={`Section ${index + 1} Title`}
                                    value={section.title}
                                    onChange={(e) => {
                                        const newContent = [...courseDetails.content];
                                        newContent[index].title = e.target.value;
                                        setCourseDetails({ ...courseDetails, content: newContent });
                                    }}
                                    fullWidth
                                    margin="normal"
                                />
                                {section.subsections.map((sub, subIndex) => (
                                    <Box key={subIndex} sx={{ marginLeft: 4 }}>
                                        <TextField
                                            label={`Subsection ${subIndex + 1} Title`}
                                            value={sub.title}
                                            onChange={(e) => {
                                                const newContent = [...courseDetails.content];
                                                newContent[index].subsections[subIndex].title = e.target.value;
                                                setCourseDetails({ ...courseDetails, content: newContent });
                                            }}
                                            fullWidth
                                            margin="normal"
                                        />
                                        <TextField
                                            label={`Subsection ${subIndex + 1} Duration (minutes)`}
                                            type="number"
                                            value={sub.duration}
                                            onChange={(e) => {
                                                const newContent = [...courseDetails.content];
                                                newContent[index].subsections[subIndex].duration = e.target.value;
                                                setCourseDetails({ ...courseDetails, content: newContent });
                                            }}
                                            fullWidth
                                            margin="normal"
                                        />
                                        <TextField
                                            label={`Subsection ${subIndex + 1} Content`}
                                            value={sub.content}
                                            onChange={(e) => {
                                                const newContent = [...courseDetails.content];
                                                newContent[index].subsections[subIndex].content = e.target.value;
                                                setCourseDetails({ ...courseDetails, content: newContent });
                                            }}
                                            fullWidth
                                            margin="normal"
                                            multiline
                                        />
                                    </Box>
                                ))}
                                <Button onClick={() => handleAddSubsection(index)} variant="outlined">
                                    Add Subsection
                                </Button>
                            </Box>
                        ))}
                        <Button onClick={handleAddSection} variant="outlined">
                            Add Section
                        </Button>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary">
                        Cancel
                    </Button>
                    <Button onClick={handleSaveCourse} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default CreateCoursePage;
