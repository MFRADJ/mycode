import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { Grid, MenuItem, Select, FormControl, InputLabel, Slider, Box, Typography } from '@mui/material';
import coursesData from './courses.json';
import CourseCard from './CourseCard';

const CoursePage = () => {
    const { theme, subject } = useParams();
    const location = useLocation();
    const [courses, setCourses] = useState([]);
    const [filteredCourses, setFilteredCourses] = useState([]);
    const [ratingFilter, setRatingFilter] = useState([1, 5]);
    const [durationFilter, setDurationFilter] = useState([0, 20]);
    const [levelFilter, setLevelFilter] = useState('');
    const [languageFilter, setLanguageFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState([0, 50]);
    const [sortOption, setSortOption] = useState('');

    const searchQuery = new URLSearchParams(location.search).get('query');

    useEffect(() => {
        if (theme && subject) {
            const decodedTheme = decodeURIComponent(theme);
            const decodedSubject = decodeURIComponent(subject);
            const coursesForThemeAndSubject = coursesData[decodedTheme]?.[decodedSubject]?.map(course => ({ ...course, theme: decodedTheme, subject: decodedSubject })) || [];
            setCourses(coursesForThemeAndSubject);
            setFilteredCourses(coursesForThemeAndSubject);
        } else if (searchQuery) {
            const decodedSearchQuery = decodeURIComponent(searchQuery);
            const allCourses = Object.values(coursesData).flatMap(theme =>
                Object.entries(theme).flatMap(([subject, courses]) =>
                    courses.map(course => ({ ...course, theme, subject }))
                )
            );
            const filtered = allCourses.filter(course =>
                course.title.toLowerCase().includes(decodedSearchQuery.toLowerCase()) ||
                course.description.toLowerCase().includes(decodedSearchQuery.toLowerCase())
            );
            setCourses(filtered);
            setFilteredCourses(filtered);
        }
    }, [theme, subject, searchQuery]);

    useEffect(() => {
        let filtered = courses;

        filtered = filtered.filter(course => course.rating >= ratingFilter[0] && course.rating <= ratingFilter[1]);
        filtered = filtered.filter(course => course.duration >= durationFilter[0] && course.duration <= durationFilter[1]);
        if (levelFilter) {
            filtered = filtered.filter(course => course.level === levelFilter);
        }
        if (languageFilter) {
            filtered = filtered.filter(course => course.language === languageFilter);
        }
        filtered = filtered.filter(course => course.price >= priceFilter[0] && course.price <= priceFilter[1]);

        if (sortOption) {
            switch (sortOption) {
                case 'popularity':
                    filtered = filtered.sort((a, b) => b.popularity - a.popularity);
                    break;
                case 'rating':
                    filtered = filtered.sort((a, b) => b.rating - a.rating);
                    break;
                case 'recent':
                    filtered = filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
                    break;
                default:
                    break;
            }
        }

        setFilteredCourses(filtered);
    }, [ratingFilter, durationFilter, levelFilter, languageFilter, priceFilter, sortOption, courses]);

    const levels = [...new Set(courses.map(course => course.level))];
    const languages = [...new Set(courses.map(course => course.language))];

    return (
        <div>
            <h1>{subject ? subject : "Search Results"} Courses</h1>
            <div style={{ marginBottom: '20px' }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                    <FormControl variant="outlined" style={{ minWidth: 150 }}>
                        <InputLabel>Level</InputLabel>
                        <Select
                            value={levelFilter}
                            onChange={(e) => setLevelFilter(e.target.value)}
                            label="Level"
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            {levels.map((level) => (
                                <MenuItem key={level} value={level}>
                                    {level}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" style={{ minWidth: 150 }}>
                        <InputLabel>Language</InputLabel>
                        <Select
                            value={languageFilter}
                            onChange={(e) => setLanguageFilter(e.target.value)}
                            label="Language"
                        >
                            <MenuItem value="">
                                <em>All</em>
                            </MenuItem>
                            {languages.map((language) => (
                                <MenuItem key={language} value={language}>
                                    {language}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Box sx={{ width: 200 }}>
                        <Typography id="rating-slider" gutterBottom>
                            Rating
                        </Typography>
                        <Slider
                            value={ratingFilter}
                            onChange={(e, newValue) => setRatingFilter(newValue)}
                            valueLabelDisplay="auto"
                            step={0.5}
                            marks
                            min={1}
                            max={5}
                            aria-labelledby="rating-slider"
                        />
                    </Box>
                    <Box sx={{ width: 200 }}>
                        <Typography id="duration-slider" gutterBottom>
                            Duration (hours)
                        </Typography>
                        <Slider
                            value={durationFilter}
                            onChange={(e, newValue) => setDurationFilter(newValue)}
                            valueLabelDisplay="auto"
                            step={1}
                            marks
                            min={0}
                            max={20}
                            aria-labelledby="duration-slider"
                        />
                    </Box>
                    <Box sx={{ width: 200 }}>
                        <Typography id="price-slider" gutterBottom>
                            Price ($)
                        </Typography>
                        <Slider
                            value={priceFilter}
                            onChange={(e, newValue) => setPriceFilter(newValue)}
                            valueLabelDisplay="auto"
                            step={5}
                            marks
                            min={0}
                            max={50}
                            aria-labelledby="price-slider"
                        />
                    </Box>
                    <FormControl variant="outlined" style={{ minWidth: 150 }}>
                        <InputLabel>Sort By</InputLabel>
                        <Select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            label="Sort By"
                        >
                            <MenuItem value="popularity">Most Popular</MenuItem>
                            <MenuItem value="rating">Best Rated</MenuItem>
                            <MenuItem value="recent">Most Recent</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
            </div>
            <Grid container spacing={2}>
                {filteredCourses.map((course, index) => (
                    <Grid item key={index} xs={12} sm={6} md={4}>
                        <CourseCard course={course} theme={course.theme} subject={course.subject} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default CoursePage;