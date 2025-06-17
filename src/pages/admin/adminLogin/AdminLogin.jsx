import React, { useState } from 'react';
import {
  Grid,
  Button,
  TextField,
  Typography,
  Checkbox,
  FormControlLabel,
  IconButton,
  Box,
  Paper,
  OutlinedInput,
  InputAdornment,
  InputLabel,
  FormControl,
  CircularProgress,
  Snackbar,
  Alert,
  Backdrop
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../../../api/axios';

const styles = {
  containerBox: {
    minHeight: '100vh',
    backgroundImage: 'url(/public/images/signin.svg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  gridBox: {
    display: 'flex',
    alignItems: 'center',
  },
  cardPaper: {
    padding: '2rem',
    borderRadius: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
    color: '#fff',
    width: '100%',
    maxWidth: '500px',
    marginTop: { xs: '10px', md: 0 }
  },
  toggleButton: (isActive) => ({
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    padding: '4px',
    width: '100%',
    marginRight: '1rem',
    textDecoration: 'none',
    cursor: 'pointer',
    backgroundColor: isActive ? '#EAB308' : 'none',
    borderRadius: '50px',
  }),
  centeredBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
    backgroundColor: '#183251',
    borderRadius: '50px',
    padding: '3px',
    width: '100%',
  },
  secondaryText: {
    color: 'white',
    fontSize: {xs: '12px', md: '13px'},
    
  },
  formTextField: {

    marginBottom: '1rem',
    '& .MuiOutlinedInput-root': {
      borderRadius: '50px',
      backgroundColor: 'white',

    },
    '& .MuiInputLabel-root': {
      color: 'grey',
      // textAlign: 'center',
      // width: '100%',

    },
    '& .MuiInputBase-input': {
      color: 'black',
      height: '15px',

    },
  },
  formGrid: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '3px',
  },
  formCheckbox: {
    color: '#bbb',
    '&.Mui-checked': { color: '#f0ad4e' },
     transform: 'scale(0.7)'
  },
  formControlLabel: {
    color: 'white',
     '& .MuiTypography-root': {
      fontSize: {xs: '13px', md: '14px'},
    },
    alignItems: 'center',
    // gap: 1,
   
  },
  submitButton: {
    backgroundColor: '#f0ad4e',
    color: '#fff',
    borderRadius: '50px',
    textTransform: 'none',
    padding: '5px',
    '&:hover': { backgroundColor: '#ec9f3e' },
  },
  socialIcon: {
    height: '30px',
  },
};

function AdminLogin() {
  const [activeForm, setActiveForm] = useState('login');

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ email: '', username: '', password: '' });

  const [loginErrors, setLoginErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const navigate = useNavigate();


  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  const validateLoginForm = () => {
    const errors = {};
    if (!loginForm.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(loginForm.email)) errors.email = 'Invalid email';
    if (!loginForm.password) errors.password = 'Password is required';

    setLoginErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateRegisterForm = () => {
    const errors = {};
    if (!registerForm.email) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(registerForm.email)) errors.email = 'Invalid email';
    if (!registerForm.username) errors.username = 'Username is required';
    if (!registerForm.password) errors.password = 'Password is required';

    setRegisterErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleLogin = async () => {
    // e.preventDefault();
    if (!validateLoginForm()) return;

    const req = { email: loginForm.email, password: loginForm.password };
    setLoading(true);
    try {
      const response = await apiPost('/admin/loginAdmin', req);
      if (response.data.status === 200) {
        localStorage.setItem('adminToken', response.data.token);
        navigate('/admin/dashboard');
        setSnackbar({ open: true, message: response.data.message, severity: 'success' });
        setLoginForm({ email: '', password: '' });
      } else {
        setSnackbar({ open: true, message: response.data.message, severity: 'error' });
      }
    } catch (error) {
      setLoading(true);
      setSnackbar({ open: true, message: 'Failed', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };
  const handleRegister = async (e) => {
    // e.preventDefault();
    if (!validateRegisterForm()) return;

    const req = { ...registerForm, role: 'super_admin' };
    setLoading(true);
    try {
      await apiPost('/admin/registerAdmin', req);
      setSnackbar({ open: true, message: 'Admin registered successfully', severity: 'success' });
      setRegisterForm({ email: '', username: '', password: '' });
      setActiveForm('login');
    } catch (error) {
      setSnackbar({ open: true, message: 'Registration failed', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };


  return (
    <Box sx={styles.containerBox}>
      {
        loading && (
          <Backdrop open={loading} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <CircularProgress size={60} color="inherit" />
          </Backdrop>
        )
      }

      <Grid container>
        <Grid item size={{ xs: 12, sm: 8, md: 10 }} sx={styles.gridBox}>
          <Paper elevation={10} sx={styles.cardPaper}>
            <Typography variant="body2" align="center" gutterBottom mb={2}>
              Welcome to COCKPIT.!
            </Typography>

            <Box sx={styles.centeredBox}>
              <Button sx={styles.toggleButton(activeForm === 'login')} onClick={() => setActiveForm('login')}>
                Login
              </Button>
              <Button style={styles.toggleButton(activeForm === 'register')} onClick={() => setActiveForm('register')}>
                Register
              </Button>
            </Box>

            <Typography variant="body2" align="center" paragraph sx={styles.secondaryText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Typography>

            {activeForm === 'login' && (
              <>
                <Typography variant="body2" gutterBottom>Email</Typography>
                <TextField
                  label="User Id / Email"
                  variant="outlined"
                  fullWidth
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                  sx={styles.formTextField}
                />
                {loginErrors.email && (
                  <Typography variant="caption" color="error">{loginErrors.email}</Typography>
                )}

                <Typography variant="body2" gutterBottom>Access key</Typography>
                <FormControl variant="outlined" fullWidth sx={styles.formTextField}>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                {loginErrors.password && (
                  <Typography variant="caption" color="error">{loginErrors.password}</Typography>
                )}

                <Grid container alignItems="center" sx={styles.formGrid}>
                  {/* <FormControlLabel
                    control={<Checkbox sx={styles.formCheckbox} />}
                    label="Remember me"
                    sx={styles.formControlLabel}
                  /> */}
                  <Typography variant="body2" sx={styles.secondaryText} gutterBottom>Forgot Password?</Typography>
                </Grid>

                <Button fullWidth sx={styles.submitButton} onClick={handleLogin}>
                  Board me
                </Button>

              </>
            )}

            {activeForm === 'register' && (
              <>
                <Typography variant="body2" gutterBottom>Email</Typography>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                  sx={styles.formTextField}
                />
                {registerErrors.email && (
                  <Typography variant="caption" color="error">{registerErrors.email}</Typography>
                )}

                <Typography variant="body2" gutterBottom>Username</Typography>
                <TextField
                  label="User Name"
                  variant="outlined"
                  fullWidth
                  value={registerForm.username}
                  onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                  sx={styles.formTextField}
                />
                {registerErrors.username && (
                  <Typography variant="caption" color="error">{registerErrors.username}</Typography>
                )}

                <Typography variant="body2" gutterBottom>Password</Typography>
                <FormControl variant="outlined" fullWidth sx={styles.formTextField}>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <OutlinedInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword((prev) => !prev)} edge="end">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Password"
                  />
                </FormControl>
                {registerErrors.password && (
                  <Typography variant="caption" color="error">{registerErrors.password}</Typography>
                )}

                <Button fullWidth sx={styles.submitButton} onClick={handleRegister} disabled={loading}>
                  {loading ? <CircularProgress size={24} color="inherit" /> : 'Register'}
                </Button>

              </>
            )}


            <Snackbar
              open={snackbar.open}
              autoHideDuration={3000}
              onClose={handleSnackbarClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
                {snackbar.message}
              </Alert>
            </Snackbar>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminLogin;
