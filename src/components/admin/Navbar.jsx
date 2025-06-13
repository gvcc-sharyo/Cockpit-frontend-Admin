import React, { useState } from 'react';
import {
  Grid,
  Box,
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Collapse,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ title, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adminData = JSON.parse(localStorage.getItem('adminData') || '{}');

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openDatabase, setOpenDatabase] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleDatabaseMenu = () => setOpenDatabase((prev) => !prev);

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (route) => {
    navigate(route);
    if (sidebarOpen) setSidebarOpen(false);
  };

  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Grid
        item
        size={{ xs: sidebarOpen ? 8 : 0, md: 2 }}
        sx={{
          bgcolor: 'white',
          borderRight: '1px solid #ddd',
          height: '100vh',
          overflowY: 'auto',
          position: { xs: 'fixed', md: 'relative' },
          top: 0,
          left: 0,
          zIndex: 1300,
          display: { xs: sidebarOpen ? 'block' : 'none', md: 'block' },
          transition: 'all 0.3s ease',
          boxShadow: { xs: sidebarOpen ? '2px 0 5px rgba(0,0,0,0.3)' : 'none', md: 'none' },
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* Close button for mobile */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'flex-end',
              mb: 2,
            }}
          >
            <IconButton onClick={() => setSidebarOpen(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Logo */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <img
              src="/images/logo.png"
              alt="Logo"
              style={{ width: '100px', height: 'auto', marginBottom: '10px' }}
            />
          </Box>

          <List>
            {/* Dashboard */}
            <ListItem
              button
              onClick={() => handleNavigate('/admin/dashboard')}
              sx={{
                fontWeight: 'bold',
                borderRadius: 1,
                mb: 1,
                bgcolor: isActive('/admin/dashboard') ? 'orange' : 'white',
                color: isActive('/admin/dashboard') ? 'white' : 'black',
                cursor: 'pointer',
              }}
            >
              <ListItemIcon>
                <img src="/images/dashboard.svg" alt="Dashboard" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            {/* Database collapsible */}
            <ListItem
              button
              onClick={toggleDatabaseMenu}
              sx={{
                fontWeight: 'bold',
                borderRadius: 1,
                mb: 1,
                cursor: 'pointer',
              }}
            >
              <ListItemIcon>
                <img src="/images/database.svg" alt="Database" />
              </ListItemIcon>
              <ListItemText primary="Database" />
              {openDatabase ? <ExpandLess /> : <ExpandMore />}
            </ListItem>

            <Collapse in={openDatabase} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  sx={{
                    pl: 4,
                    mb: 1,
                    bgcolor: isActive('/admin/trainingsyllabus') ? 'orange' : 'white',
                    color: isActive('/admin/trainingsyllabus') ? 'white' : 'black',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleNavigate('/admin/trainingsyllabus')}
                >
                  <ListItemIcon>
                    <img src="/images/database.svg" alt="Training" />
                  </ListItemIcon>
                  <ListItemText primary="Training" />
                </ListItem>

                <ListItem
                  button
                  sx={{
                    pl: 4,
                    bgcolor: isActive('/admin/feedback') ? 'orange' : 'white',
                    color: isActive('/admin/feedback') ? 'white' : 'black',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleNavigate('/admin/feedback')}
                >
                  <ListItemIcon>
                    <img src="/images/database.svg" alt="Feedback" />
                  </ListItemIcon>
                  <ListItemText primary="Feedback" />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Box>
      </Grid>

      {/* Main Content */}
      <Grid
        item
        size={{ xs: 12, md: 10 }}
        sx={{
          bgcolor: 'white',
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          ml: { xs: 0, md: 0 },
        }}
      >
        {/* Header */}
        <AppBar position="static" color="white" elevation={0}>

          {/* Mobile View: Top Row */}
          <Toolbar
            sx={{
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2,
              py: 0.5,
              minHeight: 48,
            }}
          >
            {/* Menu icon */}
            <IconButton onClick={toggleSidebar} size="small" edge="start" color="inherit">
              <MenuIcon fontSize="small" />
            </IconButton>

            {/* Logo center */}
            <Box sx={{ flexGrow: 1, textAlign: 'center' }}>
              <img
                src="/images/logo.png"
                alt="Logo"
                style={{ width: '80px', height: 'auto' }}
              />
            </Box>

            {/* Admin text */}
            <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end'}}>
              <Typography variant="caption" sx={{ fontWeight: 'bold', fontSize: '0.75rem' }}>
                {adminData?.username || 'Admin'}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ fontSize: '0.65rem' }}>
                {adminData?.role === 'super_admin' ? 'Super Admin' : 'Sub Admin'}
              </Typography>
            </Box>
          </Toolbar>

          {/* Mobile View: Second Row */}
          <Toolbar
            sx={{
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'space-between',
              alignItems: 'center',
              px: 2,
              py: 0.5,
              minHeight: 40,
              gap: 1,
            }}
          >
            {/* Title */}
            <Typography
              sx={{
                fontSize: '1rem',
                fontWeight: 'bold',
                flexGrow: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              noWrap
            >
              {title}
            </Typography>

            {/* Search bar */}
            <InputBase
              placeholder="Search..."
              sx={{
                bgcolor: '#f0f0f0',
                px: 1,
                py: 0.3,
                borderRadius: '5px',
                width: 100,
                fontSize: '0.75rem',
                flexShrink: 0,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />

            {/* Notification icon */}
            <IconButton size="small" sx={{ p: 0.5 }}>
              <NotificationsIcon fontSize="small" />
            </IconButton>
          </Toolbar>

          {/* Desktop / Laptop View: Single Clean Row */}
          <Toolbar
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'space-between',
              alignItems: 'center',
              // px: 2,
              // py: 1,
            }}
          >
            {/* Title */}
            <Typography
              sx={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
              }}
            >
              {title}
            </Typography>

            {/* Right section */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <InputBase
                placeholder="Search..."
                sx={{
                  bgcolor: '#f0f0f0',
                  px: 2,
                  py: 0.5,
                  borderRadius: '5px',
                  width: 200,
                }}
              />
              <IconButton>
                <NotificationsIcon />
              </IconButton>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body1">
                  {adminData?.username || 'Admin'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {adminData?.role === 'super_admin' ? 'Super Admin' : 'Sub Admin'}
                </Typography>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>


        {/* Content area */}
        <Box sx={{ flexGrow: 1, p: 2, bgcolor: '#fafafa' }}>{children}</Box>
      </Grid>
    </Grid>
  );
};

export default Navbar;
