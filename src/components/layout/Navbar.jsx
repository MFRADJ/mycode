// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Changed icon
import categoriesData from './catogries.json'; // Ensure the path is correct
import SearchBar from './SearchBar'; // Import the SearchBar component

const Navbar = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [subAnchorEl, setSubAnchorEl] = useState(null);
    const [currentCategory, setCurrentCategory] = useState('');
    const [categories, setCategories] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        setCategories(categoriesData);
    }, []);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSubAnchorEl(null);
        setCurrentCategory('');
    };

    const handleSubMenuClick = (event, category) => {
        setSubAnchorEl(event.currentTarget);
        setCurrentCategory(category);
    };

    const handleCourseClick = (theme, subject) => {
        navigate(`/courses/${theme}/${subject}`);
        handleClose();
    };

    return (
        <AppBar position="static" className="navbar navbar-expand-lg">
            <Toolbar className="container-fluid">
                <Link to="/" className="navbar-brand" style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                    <img src="/logo192.png" alt="Acme Courses" style={{ height: '40px', marginRight: '10px' }} />
                    <Typography variant="h6" component="div">MyCode</Typography>
                </Link>
                <Button aria-controls="categories-menu" aria-haspopup="true" onClick={handleClick}>
                    Catégories
                </Button>
                <Menu
                    id="categories-menu"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    {Object.keys(categories).map((category) => (
                        <MenuItem key={category} onClick={(event) => handleSubMenuClick(event, category)}>
                            {category}
                        </MenuItem>
                    ))}
                </Menu>
                <Menu
                    id="sub-categories-menu"
                    anchorEl={subAnchorEl}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    open={Boolean(subAnchorEl)}
                    onClose={handleClose}
                >
                    {currentCategory && Object.keys(categories[currentCategory]).map((subject) => (
                        <MenuItem key={subject} onClick={() => handleCourseClick(currentCategory, subject)}>
                            {subject}
                        </MenuItem>
                    ))}
                </Menu>
                <SearchBar onClose={handleClose} />
                <Button color="inherit" component={Link} to="/become-teacher">Formateur</Button>
                <Button color="inherit" component={Link} to="/signup">Inscription</Button>
                <Button color="inherit" component={Link} to="/login">Connexion</Button>
                <IconButton edge="end" aria-label="account" aria-controls="menu-appbar" aria-haspopup="true" color="inherit">
                    <ShoppingCartIcon /> {/* Changed icon */}
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
