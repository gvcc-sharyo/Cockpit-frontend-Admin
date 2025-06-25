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
  Backdrop,
  Dialog,
  DialogContent
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { apiPost } from '../../../api/axios';
import CustomTextField from '../../../components/admin/CustomTextField';
import { snackbarEmitter } from '../../../components/admin/CustomSnackbar';
import CustomButton from '../../../components/admin/CustomButton';
import CloseIcon from '@mui/icons-material/Close';
import { color } from 'chart.js/helpers';
import './adminLogin.css';

const styles = {
  containerBox: {
    minHeight: '100vh',
    backgroundImage: 'url(/public/images/signin.svg)',
    backgroundSize: 'cover',
    // objectFit: 'cover',
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
  toggleButton: (activeForm) => ({
    border: 'none',
    color: 'white',
    fontWeight: 'bold',
    padding: '4px',
    width: '100%',
    marginRight: '1rem',
    textDecoration: 'none',
    cursor: 'pointer',
    backgroundColor: activeForm ? '#EAB308' : 'none',
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
    fontSize: { xs: '12px', md: '13px' },

  },
  formTextField: {

    // marginBottom: '1rem',
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
      fontSize: { xs: '13px', md: '14px' },
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

  const navigate = useNavigate();


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

  const [loading, setLoading] = useState(false);
  const handleLogin = async () => {
    // e.preventDefault();
    if (!validateLoginForm()) return;

    setLoading(true);

    const req = { email: loginForm.email, password: loginForm.password };
    try {
      const response = await apiPost('/admin/loginAdmin', req);
      // console.log("Response :", response.data);

      setTimeout(() => {
        setLoading(false);

        if (response.data.status === 200) {
          snackbarEmitter(response.data.message, 'success');
          localStorage.setItem('adminToken', response.data.token);
          localStorage.setItem('adminId', response.data.data._id);
          setLoginForm({ email: '', password: '' });
          navigate('/admin/dashboard');
        } else {
          snackbarEmitter(response.data.message, 'error');
        }
      }, 1500)

    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        snackbarEmitter('Something went wrong', 'error');
      }, 1500);
    }
  };

  const handleRegister = async () => {
    // e.preventDefault();
    if (!validateRegisterForm()) return;

    const req = { ...registerForm, role: 'super_admin' };
    setLoading(true);

    try {
      const response = await apiPost('/admin/registerAdmin', req);

      setTimeout(() => {
        setLoading(false);

        if (response.data.status === 200) {
          snackbarEmitter(response.data.message, 'success');
          setRegisterForm({ email: '', username: '', password: '' });
          setActiveForm('login');
        }
        else {
          snackbarEmitter(response.data.message, 'error');
        }
      }, 1500)


    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        snackbarEmitter('Something went wrong', 'error');
      }, 1500)

    }
  };

  const [forgotDialogOpen, setForgotDialogOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotError, setForgotError] = useState('');
  const[forgotLoading, setForgotLoading] = useState(false);

  const handleForgotPassword = async () => {
    if (!forgotEmail) {
      setForgotError('Email is required');
      return;
    } else if (!/\S+@\S+\.\S+/.test(forgotEmail)) {
      setForgotError('Invalid email');
      return;
    }

    setForgotError('');
    setForgotLoading(true);

    try {
      const response = await apiPost('/admin/forgot-password', { email: forgotEmail });

      setTimeout(() => {
        setForgotLoading(false);    
         if (response.data.status === 200) {
          setForgotDialogOpen(false);
          snackbarEmitter(response.data.message, 'success');
          setForgotEmail('');
   
      } else {
        snackbarEmitter(response.data.message, 'error');
      }    
      },1500)
     

    } catch (err) {
      setTimeout(() => {
        setForgotLoading(false);
        snackbarEmitter('Something went wrong', 'error');
      }, 1500);
    }
  };

  return (
    <Box sx={styles.containerBox}>
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
              <Button sx={styles.toggleButton(activeForm === 'register')} onClick={() => setActiveForm('register')}>
                Register
              </Button>
            </Box>

            <Typography variant="body2" align="center" sx={styles.secondaryText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Typography>

            {activeForm === 'login' && (
              <>
                <Grid item >
                  <CustomTextField
                    label="Email"
                    name="email"
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    placeholder="Email"
                    error={!!loginErrors.email}
                    helperText={loginErrors.email}
                    borderRadius='50px'

                  />

                </Grid>

                <Grid item mt={2}>
                  <CustomTextField
                    label="Access Key"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    placeholder="Access Key"
                    error={!!loginErrors.password}
                    helperText={loginErrors.password}
                    borderRadius="50px"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid container alignItems="center" gap={1} sx={styles.formGrid} mt={2} >

                  <Typography onClick={() => setForgotDialogOpen(true)} variant="body2" sx={{ ...styles.secondaryText, cursor: 'pointer' }} gutterBottom>Forgot Password?</Typography>

                  <CustomButton children='Board me' onClick={handleLogin} loading={loading} bgColor='#EAB308' borderRadius='50px' />

                </Grid>

              </>
            )}

            {activeForm === 'register' && (
              <>

                <Grid mt={2}>
                  <CustomTextField
                    label='Email'
                    name="email"
                    value={registerForm.email}
                    onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                    placeholder="Email"
                    error={!!registerErrors.email}
                    helperText={registerErrors.email}
                    borderRadius='50px'
                  />

                </Grid>

                <Grid mt={2}>
                  <CustomTextField
                    label='Username'
                    name="username"
                    value={registerForm.username}
                    onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                    placeholder="Username"
                    error={!!registerErrors.username}
                    helperText={registerErrors.username}
                    borderRadius='50px'
                  />
                </Grid>

                <Grid mt={2} mb={4}>
                  <CustomTextField
                    label='Password'
                    name="password"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                    placeholder="Access Key"
                    error={!!registerErrors.password}
                    helperText={registerErrors.password}
                    borderRadius='50px'
                  />

                </Grid>

                <CustomButton children='Register' onClick={handleRegister} loading={loading} bgColor='#EAB308' borderRadius='50px' />

              </>
            )}

          </Paper>
        </Grid>
      </Grid>

      <Dialog open={forgotDialogOpen} onClose={() => setForgotDialogOpen(false)} maxWidth="xs" fullWidth
        slotProps={
          {
            paper: {
              sx: {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(13px)',
                borderRadius: '1rem',
                color: 'white',
              },
            }
          }
        }
      >
        <DialogContent >
          <IconButton
            onClick={() => setForgotDialogOpen(false)}
            sx={{ position: 'absolute', top: 10, right: 10, color: 'white' }}
            size="small"
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h6" fontWeight="bold" color="white" mb={4} fontSize={{ xs: '18px', sm: '20px', md: '22px' }}>
            Forgot password?
          </Typography>
          <Typography fontWeight="bold" color="white" mb={1} fontSize={{ xs: '14px', sm: '16px', md: '18px' }}>
            Verify your email address
          </Typography>
          <Typography color="white" mb={3} fontSize={{ xs: '12px', sm: '13px' }}>
            We will send you reset password link on this email
          </Typography>

          <Grid  >
            <CustomTextField
              label="Enter your email"
              placeholder="Enter your email"
              value={forgotEmail}
              onChange={(e) => setForgotEmail(e.target.value)}
              error={!!forgotError}
              helperText={forgotError}
              borderRadius="50px"
            />

            <Grid item sx={{ display: 'flex', justifyContent: 'center' }} mt={2}>

              <CustomButton
                children="Send"
                onClick={handleForgotPassword}
                loading={forgotLoading}
                bgColor="#EAB308"
                borderRadius="50px"
                sx={{ width: { xs: '90%', md: '50%', sm: '60%' }, fontSize: { xs: '12px', md: '14px', sm: '14px' } }}
              />
            </Grid>

          </Grid>





        </DialogContent>
      </Dialog>



    </Box>
  );
}

export default AdminLogin;
