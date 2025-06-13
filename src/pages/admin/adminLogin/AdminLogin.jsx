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
} from '@mui/material';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom';

const styles = {
  containerBox: {
    minHeight: '100vh',
    backgroundImage: 'url(/public/images/signin.svg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    display: 'flex',
    justifyContent: 'flex-end',
    // alignItems: 'center',
  },
  cardPaper: {
    padding: '2rem',
    borderRadius: '1rem',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backdropFilter: 'blur(10px)',
    color: '#fff',
    width: '100%',
    maxWidth: '500px',
  },
  toggleButton: (isActive) => ({
    border: 'none',
    // background: 'none',
    color: 'white',
    fontWeight: 'bold',
    padding:'4px',
    width:'100%',
    marginRight: '1rem',
    // textTransform: 'none',
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
    width:'100%'
  },
  secondaryText: {
    color: 'white',
  },
  formTextField: {
    marginBottom: '1rem',
    '& .MuiOutlinedInput-root': {
      borderRadius: '50px',
      backgroundColor: 'white',
      // '& fieldset': { borderColor: '#444' },
      // '&:hover fieldset': { borderColor: '#666' },
      // '&.Mui-focused fieldset': { borderColor: '#f0ad4e' },
    },
    '& .MuiInputLabel-root': { color: 'black' },
    '& .MuiInputBase-input': { color: 'black', height: '10px' },
  },
  passwordBox: {
    position: 'relative',
  },
  visibilityIcon: {
    position: 'absolute',
    right: '1rem',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#bbb',
  },
  formGrid: {
    marginBottom: '3px',
  },
  formCheckbox: {
    color: '#bbb',
    '&.Mui-checked': { color: '#f0ad4e' , },

  },
  formControlLabel: {
    color: 'white',
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
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const role = 'super_admin';
    const req = { email, username, password, role };

    try {
      await apiPost('/admin/registerAdmin', req);
      alert('Admin registered successfully');
      setEmail('');
      setUsername('');
      setPassword('');
      setActiveForm('login');
    } catch (error) {
      console.log('Error registering user:', error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const req = { email, password };

    try {
      const response = await apiPost('/admin/loginAdmin', req);
      if (response.status === 200) {
        alert(response.data.message);
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminData', JSON.stringify(response.data.data));
        navigate('/admin/dashboard');
      } else {
        alert(response.data.message);
      }

      setEmail('');
      setPassword('');
    } catch (error) {
      console.log('Login failed', error);
    }
  };

  return (
    <Box sx={styles.containerBox}>
      <Grid container>
        <Grid item size={{ xs: 12, sm: 8, md: 10 }}>
          <Paper elevation={10} sx={styles.cardPaper} mt={5}>
            <Typography variant="body2" align="center" gutterBottom mb={2}>
              Welcome to COCKPIT.!
            </Typography>

            <Box sx={styles.centeredBox}>
              <Button
                sx={styles.toggleButton(activeForm === 'login')}
                onClick={() => setActiveForm('login')}
              >
                Login
              </Button>
              <Button
                style={styles.toggleButton(activeForm === 'register')}
                onClick={() => setActiveForm('register')}
              >
                Register
              </Button>
            </Box>

            <Typography variant="body2" align="center" paragraph sx={styles.secondaryText}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </Typography>

            {activeForm === 'login' && (
              <form onSubmit={handleLogin}>
                <Typography variant="body2" gutterBottom>Email</Typography>
                <TextField
                  label="User Id / Email"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={styles.formTextField}
                />
                <Box sx={styles.passwordBox}>
                  <Typography variant="body2" gutterBottom>Access key</Typography>
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={styles.formTextField}
                  />
                  <IconButton sx={styles.visibilityIcon}>
                    <VisibilityOffIcon />
                  </IconButton>
                </Box>
                <Grid container justifyContent="space-between" alignItems="center" sx={styles.formGrid}>
                  <FormControlLabel
                    control={<Checkbox sx={styles.formCheckbox} />}
                    label="Remember me"
                    sx={styles.formControlLabel}
                  />
                  <Typography variant="body2" sx={styles.secondaryText}>
                    Forgot Password?
                  </Typography>
                </Grid>
                <Button type="submit" fullWidth sx={styles.submitButton}>
                  Board me
                </Button>
              </form>
            )}

            {activeForm === 'register' && (
              <form onSubmit={handleRegister}>
                <Typography variant="body2" gutterBottom>Email</Typography>
                <TextField
                  label="Email Address"
                  variant="outlined"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={styles.formTextField}
                />
                <Typography variant="body2" gutterBottom>Username</Typography>
                <TextField
                  label="User Name"
                  variant="outlined"
                  fullWidth
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={styles.formTextField}
                />
                <Box sx={styles.passwordBox}>
                  <Typography variant="body2" gutterBottom>Password</Typography>
                  <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    fullWidth
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={styles.formTextField}
                  />
                  <IconButton sx={styles.visibilityIcon}>
                    <VisibilityOffIcon />
                  </IconButton>
                </Box>
                <Button type="submit" fullWidth sx={styles.submitButton} mt={2}>
                  Register
                </Button>
              </form>
            )}

            <Typography variant="body2" align="center" sx={{ ...styles.secondaryText, my: 1 }}>
              - OR -
            </Typography>

            <Grid container justifyContent="center" spacing={2}>
              {['apple', 'google', 'twitter'].map((platform) => (
                <Grid item key={platform}>
                  <Button>
                    <img src={`images/${platform}.png`} alt={platform} style={styles.socialIcon} />
                  </Button>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminLogin;
