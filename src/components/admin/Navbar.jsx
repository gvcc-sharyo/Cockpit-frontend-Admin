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
import NotificationsIcon from '@mui/icons-material/Notifications';
import DashboardIcon from '@mui/icons-material/Dashboard';
import StorageIcon from '@mui/icons-material/Storage';
import SchoolIcon from '@mui/icons-material/School';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate, useLocation } from 'react-router-dom';


const Navbar = ({ title }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDatabase, setOpenDatabase] = useState(false);

    const adminData = JSON.parse(localStorage.getItem("adminData"));

  const handleNavigate = (route) => {
    navigate(route);
  };

  const toggleDatabaseMenu = () => {
    setOpenDatabase((prev) => !prev);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <Grid container>
      {/* Sidebar */}
      <Grid item size={{ xs: 6, md: 2 }} mt={2}>
        <Box sx={{ height: '100vh', p: 2 }}>
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
                <img src="/images/dashboard.svg" alt="Dashboard"/>
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            {/* Database (collapsible) */}
            <ListItem
              button
              sx={{
                fontWeight: 'bold',
                borderRadius: 1,
                mb: 1,
                cursor: 'pointer',
              }}
            >
              <ListItemIcon>
                <img src="/images/database.svg" alt="Dashboard" />
              </ListItemIcon>
              <ListItemText primary="Database" />

              <ListItemIcon sx={{ ml: 9 }} onClick={toggleDatabaseMenu}>
                {openDatabase ? <ExpandLess /> : <ExpandMore />}
              </ListItemIcon>

            </ListItem>

            {/* Sub-menu for Database */}
            <Collapse in={openDatabase} timeout={"auto"} unmountOnExit>
              <List component="div" disablePadding>
                <ListItem
                  button
                  sx={{
                    pl: 4, mb: 1,
                    bgcolor: isActive('/admin/training') ? 'orange' : 'white',
                    color: isActive('/admin/training') ? 'white' : 'black',
                    cursor: 'pointer',
                  }}
                  onClick={() => handleNavigate('/admin/trainingsyllabus')}

                >
                  <ListItemIcon>
                    <img src="/images/database.svg" alt="Dashboard" />
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
                    <img src="/images/database.svg" alt="Dashboard" />
                  </ListItemIcon>
                  <ListItemText primary="Feedback" />
                </ListItem>
              </List>
            </Collapse>

            {/* Institution */}
            <ListItem
              button
              onClick={() => handleNavigate('/admin/institution')}
              sx={{
                fontWeight: 'bold',
                borderRadius: 1,
                mb: 1,
                cursor: 'pointer',
              }}
            >
                  <ListItemIcon >
               <img src="/images/institution.svg" alt="Dashboard" />
              </ListItemIcon>
              <ListItemText primary="Institution" />
            </ListItem>

          </List>
        </Box>
      </Grid>

      {/* Main Content */}
      <Grid item size={{ xs: 6, md: 9 }} sx={{ bgcolor: 'white' }} mt={2}>
        <AppBar position="static" color="white" elevation={0}>
          <Toolbar sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                sx={{
                  fontSize: { xs: '1.2rem', md: '1.5rem' },
                  fontWeight: 'bold',
                }}
              >
                {title}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: { xs: 1, md: 0 } }}>
              <InputBase
                placeholder="Search..."
                sx={{
                  bgcolor: '#f0f0f0',
                  px: 2,
                  py: 0.5,
                  borderRadius: '5px',
                  width: { xs: 120, sm: 160, md: 200 },
                }}
              />
              <IconButton>
                <NotificationsIcon />
              </IconButton>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="body1">{adminData.username}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {adminData.role === 'super_admin' ? 'Super Admin' : 'Sub Admin'}
                </Typography>
              </Box>
            </Box>
          </Toolbar>
        </AppBar>
      </Grid>
    </Grid>
  );
};

export default Navbar;
