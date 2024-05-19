import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    AppBar, Toolbar, Typography, Button, TextField, Box, IconButton, Menu, MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import categoriesData from './catogries.json'; // Assurez-vous que le chemin est correct

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
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Link to="/" className="navbar-brand" style={{ display: 'flex', alignItems: 'center' }}>
                    <img src="/logo192.png" alt="Acme Courses" style={{ height: '40px', marginRight: '10px' }} />
                </Link>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
                <div>
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
                </div>
                <Box component="form" className="d-flex me-2">
                    <TextField
                        variant="outlined"
                        placeholder="Search courses..."
                        size="small"
                        sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
                        InputProps={{
                            endAdornment: (
                                <IconButton>
                                    <SearchIcon />
                                </IconButton>
                            ),
                        }}
                    />
                </Box>
                <Button color="inherit" component={Link} to="/become-teacher">Devenir Prof</Button>
                <Button color="inherit" component={Link} to="/signup">Inscription</Button>
                <Button color="inherit" component={Link} to="/login">Connexion</Button>
                <IconButton edge="end" aria-label="account" aria-controls="menu-appbar" aria-haspopup="true" color="inherit">
                    <AccountCircle />
                </IconButton>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
