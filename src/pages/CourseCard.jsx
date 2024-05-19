import React from 'react';
import { Card, CardContent, Typography, CardActions, Button, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course,theme, subject }) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/courses/${theme}/${subject}/${course.title}`);
    };

    return (
        <Card sx={{ maxWidth: 345, margin: 2 }} onClick={handleCardClick}>
            <CardContent>
                <Typography variant="h5" component="div">
                    {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Instructor: {course.instructor}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Duration: {course.duration} hours
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Level: {course.level}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Language: {course.language}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Price: ${course.price}
                </Typography>
                <Rating name="read-only" value={course.rating} readOnly />
            </CardContent>
            <CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>
        </Card>
    );
};

export default CourseCard;
