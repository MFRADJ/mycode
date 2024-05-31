import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, Card, CardContent, Grid, List, ListItem, Link, Button } from '@mui/material';
import courseDetailsData from './CoursDetailsStudent.json';

const CoursDetailsStudentPage = () => {
    const { courseId } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        const fetchCourseDetails = async () => {
            const courseDetails = courseDetailsData.find(course => course.id.toString() === courseId);
            setCourse(courseDetails);
        };
        fetchCourseDetails();
    }, [courseId]);

    if (!course) {
        return <Typography variant="h6">Course not found</Typography>;
    }

    return (
        <Container>
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>{course.title}</Typography>
                <Typography variant="h6" gutterBottom>By {course.instructor}</Typography>

                <Grid container spacing={4} sx={{ marginTop: 4 }}>
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Description</Typography>
                                <Typography variant="body1">{course.description}</Typography>
                                <Box sx={{ marginTop: 4 }}>
                                    <Typography variant="h5" gutterBottom>Course Content</Typography>
                                    {course.content.map((section, index) => (
                                        <Box key={index} sx={{ marginBottom: 2 }}>
                                            <Typography variant="h6">{section.title}</Typography>
                                            <ul>
                                                {section.subsections.map((sub, subIndex) => (
                                                    <li key={subIndex}>
                                                        <Typography variant="body2">
                                                            {sub.title} - {sub.duration} minutes
                                                        </Typography>
                                                    </li>
                                                ))}
                                            </ul>
                                        </Box>
                                    ))}
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={4}>
                        <Box sx={{ marginTop: 4 }}>
                            <Typography variant="h5" gutterBottom>Course Sections</Typography>
                            <Card sx={{ marginBottom: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Recordings</Typography>
                                    <List>
                                        {course.recordings.map((recording, index) => (
                                            <ListItem key={index}>
                                                <Link href={recording.url} target="_blank">{recording.title}</Link>
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                            <Card sx={{ marginBottom: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Written Resources</Typography>
                                    <List>
                                        {course.writtenResources.map((resource, index) => (
                                            <ListItem key={index}>
                                                <Link href={resource.url} target="_blank">{resource.title}</Link>
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                            <Card sx={{ marginBottom: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Tests</Typography>
                                    <List>
                                        {course.tests.map((test, index) => (
                                            <ListItem key={index}>
                                                <Link href={test.url} target="_blank">{test.title}</Link>
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                            <Card sx={{ marginBottom: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Quizzes</Typography>
                                    <List>
                                        {course.quizzes.map((quiz, index) => (
                                            <ListItem key={index}>
                                                <Link href={quiz.url} target="_blank">{quiz.title}</Link>
                                            </ListItem>
                                        ))}
                                    </List>
                                </CardContent>
                            </Card>
                            <Card sx={{ marginBottom: 2 }}>
                                <CardContent>
                                    <Typography variant="h6" gutterBottom>Final Evaluation</Typography>
                                    <Button variant="contained" color="primary" href={course.finalEvaluation.url} target="_blank">
                                        Go to Final Evaluation
                                    </Button>
                                </CardContent>
                            </Card>
                        </Box>
                    </Grid>
                </Grid>

                <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h5" gutterBottom>Upcoming Sessions</Typography>
                    {course.liveSessions.map((session, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                            <Typography variant="body1" sx={{ marginRight: 2 }}>
                                {new Date(session.start).toLocaleString()} - {session.title}
                            </Typography>
                            <Button variant="contained" color="primary" href={session.url} target="_blank">
                                Join
                            </Button>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Container>
    );
};

export default CoursDetailsStudentPage;
