import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Typography, Rating, Card, CardContent, Grid } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import courseDetailsData from './CourseDetails.json';

const localizer = momentLocalizer(moment);

const CourseDetailPage = () => {
    const { theme, subject, title } = useParams();
    const [course, setCourse] = useState(null);

    useEffect(() => {
        if (courseDetailsData[theme] && courseDetailsData[theme][subject]) {
            const courseDetails = courseDetailsData[theme][subject].find(course => course.title === title);
            setCourse(courseDetails);
        }
    }, [theme, subject, title]);

    if (!course) {
        return <Typography variant="h6">Course not found</Typography>;
    }

    const events = course.liveSessions.map(session => ({
        title: session.title,
        start: new Date(session.start),
        end: new Date(session.end),
    }));

    return (
        <Container>
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>{title}</Typography>
                <Typography variant="h6" gutterBottom>By {course.instructor}</Typography>
                <Rating name="read-only" value={course.rating} readOnly />

                <Grid container spacing={4} sx={{ marginTop: 4 }}>
                    <Grid item xs={12} md={8}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Description</Typography>
                                <Typography variant="body1">{course.description}</Typography>
                                <Box sx={{ marginTop: 4 }}>
                                    <Typography variant="h5" gutterBottom>Course Objectives</Typography>
                                    <ul>
                                        {course.objectives.map((obj, index) => (
                                            <li key={index}><Typography variant="body1">{obj}</Typography></li>
                                        ))}
                                    </ul>
                                </Box>
                                <Box sx={{ marginTop: 4 }}>
                                    <Typography variant="h5" gutterBottom>Prerequisites</Typography>
                                    <ul>
                                        {course.prerequisites.map((prereq, index) => (
                                            <li key={index}><Typography variant="body1">{prereq}</Typography></li>
                                        ))}
                                    </ul>
                                </Box>
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
                        <Card>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Course Details</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Language:</strong> {course.language}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Level:</strong> {course.level}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Duration:</strong> {course.duration} hours
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Price:</strong> ${course.price}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Number of Participants:</strong> {course.participants}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    <strong>Creation Date:</strong> {course.date}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card sx={{ marginTop: 4 }}>
                            <CardContent>
                                <Typography variant="h5" gutterBottom>Enroll Now</Typography>
                                <Typography variant="h6" color="primary">${course.price}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    40% off - Limited time offer
                                </Typography>
                                <Box sx={{ marginTop: 2 }}>
                                    <button style={{ width: '100%', padding: '10px', backgroundColor: '#3f51b5', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Add to Cart</button>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Box sx={{ marginTop: 4 }}>
                    <Typography variant="h5" gutterBottom>Live Sessions Calendar</Typography>
                    <Card>
                        <CardContent>
                            <Calendar
                                localizer={localizer}
                                events={events}
                                startAccessor="start"
                                endAccessor="end"
                                style={{ height: 500 }}
                            />
                        </CardContent>
                    </Card>
                </Box>
            </Box>
        </Container>
    );
};

export default CourseDetailPage;
