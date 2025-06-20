import { useEffect, useState, } from 'react';
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
  Avatar,
   Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useNavigate, useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { snackbarEmitter } from './CustomSnackbar';
import { apiGet } from '../../api/axios';

const Navbar = ({ title, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const adminId = localStorage.getItem('adminId');

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openDatabase, setOpenDatabase] = useState(false);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);
  const toggleDatabaseMenu = () => setOpenDatabase((prev) => !prev);

  const isActive = (path) => location.pathname === path;

  const handleNavigate = (route) => {
    navigate(route);
    if (sidebarOpen) setSidebarOpen(false);
  };

  const [adminData, setAdminData] = useState({
    username: "",
    role: "",
  });

  const getProfile = async () => {
    try {
      const response = await apiGet(`/admin/getAdmin?adminId=${adminId}`);

      if (response.data.status === 200) {
        setAdminData({
          username: response.data.data.username,
          role: response.data.data.role,
        });

      } else {
        snackbarEmitter(response.data.message, 'error');
      }

    } catch (error) {
      snackbarEmitter("Error fetching profile", "error");
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

    const [open, setOpen] = useState(false);
  // const navigate = useNavigate();

  const handleLogoutClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmLogout = () => {
    localStorage.removeItem('adminToken');
    setOpen(false);
    navigate('/');
  };


  return (
    <Grid container sx={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      <Grid
        item
        size={{ xs: sidebarOpen ? 8 : 0, md: 2, sm: 4 }}
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
                borderRadius: 2,
                mb: 1,
                bgcolor: isActive('/admin/dashboard') ? '#EAB308' : 'white',
                color: isActive('/admin/dashboard') ? 'white' : 'black',
                cursor: 'pointer',
                ":hover": {
                  color: 'black'
                }
              }}
            >
              <ListItemIcon>
                <img src="/images/dashboard.svg" alt="Dashboard" />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItem>

            <ListItem
              button
              onClick={() => handleNavigate('/admin/trainingsyllabus')}
              sx={{
                fontWeight: 'bold',
                borderRadius: 2,
                mb: 1,
                bgcolor: isActive('/admin/trainingsyllabus') ? '#EAB308' : 'white',
                color: isActive('/admin/trainingsyllabus') ? 'white' : 'black',
                cursor: 'pointer',
                ":hover": {
                  color: 'black'
                }
              }}
            >
              <ListItemIcon>
                <img src="/images/syllabus.svg" alt="Syllabus" />
              </ListItemIcon>
              <ListItemText primary="Syllabus" />
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
              <ListItemIcon sx={{ minWidth: 40, mr: 1 }}> {/* Increase space here */}
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
                    borderRadius: 2,
                    bgcolor: isActive('/admin/trainingAdd') ? '#EAB308' : 'white',
                    color: isActive('/admin/trainingAdd') ? 'white' : 'black',
                    cursor: 'pointer',
                    ":hover": {
                      color: 'black'
                    }
                  }}
                  onClick={() => handleNavigate('/admin/trainingAdd')}
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
                    bgcolor: isActive('/admin/feedback') ? '#EAB308' : 'white',
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

            <ListItem
              button
              onClick={() => handleNavigate('/admin/pricing')}
              sx={{
                fontWeight: 'bold',
                borderRadius: 2,
                mb: 1,
                bgcolor: isActive('/admin/pricing') ? '#EAB308' : 'white',
                color: isActive('/admin/pricing') ? 'white' : 'black',
                cursor: 'pointer',
                ":hover": {
                  color: 'black'
                },
                                
              }}
            >
              <ListItemIcon>
                <img src="/images/donate.svg" alt="Pricing" />
              </ListItemIcon>
              <ListItemText primary="Pricing" />
            </ListItem>

            <ListItem
              button
              onClick={handleLogoutClick}
              sx={{
                fontWeight: 'bold',
                borderRadius: 2,
                mb: 1,
                bgcolor:'#EAB308',
                color: 'white',
                cursor: 'pointer',
                ":hover": {
                  color: 'black'
                },
                // mt:15
              }}
            >
              <ListItemIcon>
                <img src="/images/Logout.svg" alt="" />
              </ListItemIcon>
              <ListItemText primary="Logout"  />
            </ListItem>
          </List>
        </Box>
      </Grid>

       <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmLogout} color="error" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>

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
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, cursor: 'pointer' }} onClick={() => handleNavigate('/admin/profile')}>
              <Avatar sx={{ width: 25, height: 25, }}>{adminData.username.charAt(0).toUpperCase()}</Avatar>
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
                fontSize: '12px',
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
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                bgcolor: '#f0f0f0',
                px: 1,
                py: 0.5,
                borderRadius: '5px',
                width: 140, // increased width to fit icon + text
                fontSize: '0.75rem',
                flexShrink: 0,
              }}
            >
              <SearchIcon sx={{ fontSize: 16, mr: 0.5 }} />
              <InputBase
                placeholder="Search..."
                sx={{
                  fontSize: '0.75rem',
                  // width: '100%',
                }}
                inputProps={{ 'aria-label': 'search' }}
              />
            </Box>

            {/* Notification icon */}
            {/* <IconButton size="small" sx={{ p: 0.5 }}>
              <NotificationsIcon fontSize="small" />
            </IconButton> */}
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
            <Box sx={{ display: 'flex', alignItems: 'center', ml: '350px', gap: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  bgcolor: '#f0f0f0',
                  p: 1,
                  borderRadius: '5px',
                  // width: '70%', // increased width to fit icon + text
                  fontSize: '0.75rem',
                  flexShrink: 0,
                }}
              >
                <SearchIcon sx={{ fontSize: '20px', mr: 0.5 }} />
                <InputBase
                  placeholder="Search..."
                  sx={{
                    fontSize: '0.75rem',
                    // width: '100%',
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                />
              </Box>
              {/* <IconButton>
                <NotificationsIcon />
              </IconButton> */}
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, cursor: 'pointer' }} onClick={() => handleNavigate('/admin/profile')}>
              <Avatar sx={{ width: 40, height: 40 }}>{adminData.username.charAt(0).toUpperCase()}</Avatar>
              <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                <Typography variant="body1">
                  {adminData?.username}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {adminData?.role === "super_admin" ? "Super Admin" : "Admin"}
                </Typography>
              </Grid>

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
