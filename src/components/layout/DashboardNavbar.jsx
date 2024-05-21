import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem, Drawer, List, ListItem, ListItemText, Collapse
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MessageIcon from '@mui/icons-material/Message';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ButtonBase from '@mui/material/ButtonBase';
import SearchBar from './SearchBar'; // Assurez-vous que le chemin est correct
import './Navbar.module.css'; // Ajoutez des styles spécifiques si nécessaire
import categoriesData from './catogries.json'; // Assurez-vous que le chemin est correct

function DashboardNavbar() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [profileAnchorEl, setProfileAnchorEl] = useState(null);
    const [subAnchorEl, setSubAnchorEl] = useState(null);
    const [currentCategory, setCurrentCategory] = useState('');
    const [categories, setCategories] = useState({});
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [openCategory, setOpenCategory] = useState({});
    const [openSubCategory, setOpenSubCategory] = useState({});
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

    const handleProfileMenuClick = (event) => {
        setProfileAnchorEl(event.currentTarget);
    };

    const handleProfileMenuClose = () => {
        setProfileAnchorEl(null);
    };

    const handleSubMenuClick = (event, category) => {
        setSubAnchorEl(event.currentTarget);
        setCurrentCategory(category);
    };

    const handleCourseClick = (theme, subject) => {
        navigate(`/courses/${encodeURIComponent(theme)}/${encodeURIComponent(subject)}`);
        handleClose();
        setDrawerOpen(false);
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleCategoryClick = (category) => {
        setOpenCategory((prevOpenCategory) => ({
            ...prevOpenCategory,
            [category]: !prevOpenCategory[category],
        }));
    };

    const handleSubCategoryClick = (category, subCategory) => {
        setOpenSubCategory((prevOpenSubCategory) => ({
            ...prevOpenSubCategory,
            [`${category}-${subCategory}`]: !prevOpenSubCategory[`${category}-${subCategory}`],
        }));
    };

    return (
        <AppBar position="static" className="navbar navbar-expand-lg">
            <Toolbar className="container-fluid">
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2, display: { xs: 'block', md: 'none' } }}
                    onClick={toggleDrawer(true)}
                >
                    <MenuIcon />
                </IconButton>
                <Drawer
                    anchor="left"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                >
                    <Box
                        sx={{ width: 250 }}
                        role="presentation"
                        onClick={(event) => event.stopPropagation()} // Prevent the drawer from closing when clicking inside
                        onKeyDown={(event) => event.stopPropagation()} // Prevent the drawer from closing when navigating with keys inside
                    >
                        <List>
                            <ListItem>
                                <SearchBar onClose={toggleDrawer(false)} />
                            </ListItem>
                            <ListItem>
                                <ButtonBase onClick={() => handleCategoryClick('categories')}>
                                    <ListItemText primary="Catégories" />
                                    {openCategory['categories'] ? <ExpandLess /> : <ExpandMore />}
                                </ButtonBase>
                            </ListItem>
                            <Collapse in={openCategory['categories']} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {Object.keys(categories).map((category) => (
                                        <React.Fragment key={category}>
                                            <ListItem>
                                                <ButtonBase onClick={() => handleSubCategoryClick('categories', category)} sx={{ pl: 4 }}>
                                                    <ListItemText primary={category} />
                                                    {openSubCategory[`categories-${category}`] ? <ExpandLess /> : <ExpandMore />}
                                                </ButtonBase>
                                            </ListItem>
                                            <Collapse in={openSubCategory[`categories-${category}`]} timeout="auto" unmountOnExit>
                                                <List component="div" disablePadding>
                                                    {Object.keys(categories[category]).map((subject) => (
                                                        <ListItem key={subject}>
                                                            <ButtonBase onClick={() => handleCourseClick(category, subject)} sx={{ pl: 8 }}>
                                                                <ListItemText primary={subject} />
                                                            </ButtonBase>
                                                        </ListItem>
                                                    ))}
                                                </List>
                                            </Collapse>
                                        </React.Fragment>
                                    ))}
                                </List>
                            </Collapse>
                            <ListItem>
                                <ButtonBase component={Link} to="/trainer-dashboard">
                                    <ListItemText primary="Formateur" />
                                </ButtonBase>
                            </ListItem>
                            <ListItem>
                                <ButtonBase component={Link} to="/dashboard">
                                    <ListItemText primary="Mon Apprentissage" />
                                </ButtonBase>
                            </ListItem>
                        </List>
                    </Box>
                </Drawer>
                <Link to="/" className="navbar-brand" style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
                    <img src="/logo192.png" alt="Acme Courses" style={{ height: '40px', marginRight: '10px' }} />
                    <Typography variant="h6" component="div">MyCode</Typography>
                </Link>
                <Button aria-controls="categories-menu" aria-haspopup="true" onClick={handleClick} color="inherit">
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
                <Box sx={{ flexGrow: 1, mx: 2 }}>
                    <SearchBar onClose={() => {}} sx={{ width: '600px' }} /> {/* Ajustez la largeur selon vos besoins */}
                </Box>
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                    <Button color="inherit" component={Link} to="/trainer-dashboard">Formateur</Button>
                    <Button color="inherit" component={Link} to="/dashboard">Mon Apprentissage</Button>
                    <IconButton color="inherit" component={Link} to="/messages">
                        <MessageIcon />
                    </IconButton>
                    <IconButton color="inherit" component={Link} to="/notifications">
                        <NotificationsIcon />
                    </IconButton>
                    <IconButton color="inherit" component={Link} to="/cart">
                        <ShoppingCartIcon />
                    </IconButton>
                    <IconButton edge="end" aria-label="account" aria-controls="profile-menu" aria-haspopup="true" color="inherit" onClick={handleProfileMenuClick}>
                        <AccountCircle />
                    </IconButton>
                    <Menu
                        id="profile-menu"
                        anchorEl={profileAnchorEl}
                        keepMounted
                        open={Boolean(profileAnchorEl)}
                        onClose={handleProfileMenuClose}
                    >
                        <MenuItem component={Link} to="/dashboard">Mon Apprentissage</MenuItem>
                        <MenuItem component={Link} to="/subscriptions">Mes Abonnements</MenuItem>
                        <MenuItem component={Link} to="/current-courses">Cours en Cours</MenuItem>
                        <MenuItem component={Link} to="/profile-settings">Paramètres de Profil</MenuItem>
                        <MenuItem component={Link} to="/logout">Déconnexion</MenuItem>
                    </Menu>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default DashboardNavbar;
