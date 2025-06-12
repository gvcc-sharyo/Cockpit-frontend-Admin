import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Header.css';
import { useAuth } from '../../contextApi/AuthContext';
import { Avatar,Box, Typography } from '@mui/material';

function Header() {
  // const {user} = useAuth();
  
const user = JSON.parse(localStorage.getItem('user'));
console.log("user is", user);
const navigate = useNavigate();

  return (
    <header className="py-3 bg-white border-bottom">
      <div className="container d-flex justify-content-between align-items-center">

        <div className="d-flex align-items-center">
          <img src="images/logo.png" alt="Plane" style={{ height: '60px' }} />
        </div>

        <nav className="d-flex gap-4">
          <Link to="/" className="nav-link py-2">Home</Link>
          <Link to="/training" className="nav-link py-2">Training</Link>
          <Link to="/test" className="nav-link py-2">Test</Link>
          <Link to="/pricing" className="nav-link py-2">Pricing</Link>
        </nav>

        {
          user ? (
            <>
              <Box sx={{ display:'flex',cursor:'pointer', alignItems:'center', gap:'5px'}}
              onClick={() => navigate('/userprofile')}
              >
                <Avatar />
                <Typography>{user.username}</Typography>
              </Box>
            </>
          ) : (
            <Link to="/profile" className="btn btn-outline-warning px-4 py-2">Get Boarding Pass</Link>
          )
        }


      </div>
    </header>
  );
}

export default Header;
