import React, { useState } from 'react';
import { TextField, Box, IconButton, List, ListItem, ListItemText } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import coursesData from './courses.json'; // Ensure the path is correct

const SearchBar = ({ onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const navigate = useNavigate();

    const handleSearchChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);

        if (query.length > 1) {
            const allCourses = Object.values(coursesData).flatMap(theme =>
                Object.entries(theme).flatMap(([subject, courses]) =>
                    courses.map(course => ({ ...course, theme, subject }))
                )
            );
            const filteredSuggestions = allCourses.filter(course =>
                course.title.toLowerCase().includes(query.toLowerCase())
            );
            setSuggestions(filteredSuggestions);
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (course) => {
        navigate(`/courses/${encodeURIComponent(course.theme)}/${encodeURIComponent(course.subject)}`);
        onClose();
    };

    const handleSearchSubmit = () => {
        navigate(`/courses/search?query=${encodeURIComponent(searchQuery)}`);
        onClose();
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSearchSubmit();
        }
    };

    return (
        <Box component="form" className="d-flex me-2" onSubmit={(e) => e.preventDefault()} sx={{ position: 'relative', flexGrow: 1, maxWidth: '600px' }}>
            <TextField
                variant="outlined"
                placeholder="Search courses..."
                size="small"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyPress={handleKeyPress}
                sx={{ bgcolor: 'background.paper', borderRadius: 3, width: '100%' }} // Rounded borders and full width
                InputProps={{
                    endAdornment: (
                        <IconButton onClick={handleSearchSubmit}>
                            <SearchIcon />
                        </IconButton>
                    ),
                }}
            />
            {suggestions.length > 0 && (
                <List sx={{ position: 'absolute', top: '100%', left: 0, right: 0, bgcolor: 'background.paper', border: '1px solid #ccc', borderRadius: 1, zIndex: 1000 }}>
                    {suggestions.map((course, index) => (
                        <ListItem button key={index} onClick={() => handleSuggestionClick(course)}>
                            <ListItemText primary={course.title} secondary={`${course.subject} - ${course.theme}`} />
                        </ListItem>
                    ))}
                </List>
            )}
        </Box>
    );
};

export default SearchBar;
