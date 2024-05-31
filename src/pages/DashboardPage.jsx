import React from 'react';
import { Container, Box, Typography, Grid, Paper, List, ListItem, ListItemText, LinearProgress } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { useNavigate } from 'react-router-dom';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// Register the necessary components for chart.js
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Sample data for chart and courses
const sampleCourses = [
    { id: 1, title: 'Course 1', progress: 70 },
    { id: 2, title: 'Course 2', progress: 50 },
    { id: 3, title: 'Course 3', progress: 30 },
];

const sampleNotifications = [
    'New assignment available for Course 1',
    'Your submission for Course 2 has been graded',
    'New discussion in Course 3',
];

const sampleChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
        {
            label: 'Course Progress',
            data: [65, 59, 80, 81],
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 1,
        },
    ],
};

const DashboardPage = () => {
    const navigate = useNavigate();

    const handleCourseClick = (courseId) => {
        navigate(`/course-details/${courseId}`);
    };

    return (
        <Container>
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" gutterBottom>Welcome to your Dashboard</Typography>
                <Typography variant="body1" gutterBottom>
                    Here you can manage your courses, view progress, and more.
                </Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ padding: 2 }}>
                            <Typography variant="h6" gutterBottom>My Courses</Typography>
                            <List>
                                {sampleCourses.map(course => (
                                    <ListItem
                                        key={course.id}
                                        button
                                        onClick={() => handleCourseClick(course.id)}
                                    >
                                        <ListItemText primary={course.title} />
                                        <Box sx={{ width: '50%' }}>
                                            <LinearProgress variant="determinate" value={course.progress} />
                                            <Typography variant="body2" color="textSecondary">{`${course.progress}% completed`}</Typography>
                                        </Box>
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ padding: 2 }}>
                            <Typography variant="h6" gutterBottom>Notifications</Typography>
                            <List>
                                {sampleNotifications.map((notification, index) => (
                                    <ListItem key={index}>
                                        <ListItemText primary={notification} />
                                    </ListItem>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ padding: 2 }}>
                            <Typography variant="h6" gutterBottom>Progress Statistics</Typography>
                            <Bar data={sampleChartData} />
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <Paper sx={{ padding: 2 }}>
                            <Typography variant="h6" gutterBottom>Upcoming Events</Typography>
                            <Calendar />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default DashboardPage;
