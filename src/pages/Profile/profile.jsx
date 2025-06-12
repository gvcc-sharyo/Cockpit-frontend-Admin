import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './profile.css';
import { apiPost } from '../../api/axios';
import { useAuth } from '../../contextApi/AuthContext';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [activeForm, setActiveForm] = useState('login');

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const { setUser } = useAuth();

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    const req = { email, username, password }

    try {
      const response = await apiPost('/registerUser', req);
      console.log('User registered successfully:', response.data);
      alert('User registered successfully');
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

    const req = { email, password }

    try {
      const response = await apiPost('/loginUser', req);

      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('authToken', token);
        localStorage.setItem('user', JSON.stringify(response.data.userData));
        // setUser({
        //   email: response.data.userData.email,
        //   username: response.data.userData.username
        // });
        alert(response.data.message);
        navigate('/');
      }

      else {
        alert(response.data.message);
      }

      setEmail('');
      setPassword('');

    } catch (error) {
      console.log('Login failed', error);
    }
  };

  return (
    <>
      <div className="login-container d-flex justify-content-end">
        <div className="login-card p-4 rounded shadow">
          <div className="text-center mb-4">
            <h6 className="text-white">Welcome to COCKPIT.!</h6>
            <div className="btn-group mt-2">
              <div className="auth-toggle">
                <button
                  className={`toggle-btn ${activeForm === 'login' ? 'active' : ''}`}
                  onClick={() => setActiveForm('login')}
                >
                  Login
                </button>
                <button
                  className={`toggle-btn ${activeForm === 'register' ? 'active' : ''}`}
                  onClick={() => setActiveForm('register')}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
          <p className="text-light small text-center mb-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting industry.
          </p>
          {activeForm === 'login' && (
            <form>
              <div className="mb-4">
                <label htmlFor="loginEmail" className="form-label text-light">User Id / Email</label>
                <input
                  id='loginEmail'
                  type="email"
                  className="form-control rounded-pill"
                  placeholder="Enter your Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-4 position-relative">
                <label htmlFor="loginPassword" className="form-label text-white">Password</label>
                <input
                  id='loginPassword'
                  type="password"
                  className="form-control rounded-pill"
                  placeholder="Enter Your Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i className="bi bi-eye-slash position-absolute end-0 top-50 translate-middle-y me-3 text-muted"></i>
              </div>
              <div className="d-flex justify-content-between text-light small mb-3">
                <div>
                  <input type="checkbox" className="form-check-input me-1" />
                  Remember me
                </div>
                <a href="#" className="text-light text-decoration-none">
                  Forgot Password?
                </a>
              </div>
              <button type='button' className="btn btn-warning w-100 text-white rounded-pill" onClick={handleLogin}>Board me</button>
            </form>
          )}

          {activeForm === 'register' && (
            <form>
              <div className="mb-3">
                <label htmlFor="registerEmail" className="form-label text-white">Email Address</label>
                <input
                  type="email"
                  id="registerEmail"
                  className="form-control rounded-pill"
                  placeholder="Enter Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="registerUser" className="form-label text-white">User Name</label>
                <input
                  type="text"
                  id="registerUser"
                  className="form-control rounded-pill"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="mb-3 position-relative">
                <label htmlFor="registerPassword" className="form-label text-white">Password</label>
                <input
                  type="password"
                  id="registerPassword"
                  className="form-control rounded-pill"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i className="bi bi-eye-slash position-absolute end-0 top-50 translate-middle-y me-3 text-muted"></i>
              </div>
              <div className="d-flex justify-content-between text-light small mb-3">
                <div>
                  <input type="checkbox" className="form-check-input me-1" />
                  Remember me
                </div>
                <a href="#" className="text-light text-decoration-none">
                  Forgot Password?
                </a>
              </div>
              <button type='button' className="btn btn-warning w-100 text-white rounded-pill" onClick={handleRegister}>Register</button>
            </form>
          )}

          <div className="text-light text-center my-3">- OR -</div>
          <div className="d-flex justify-content-center gap-3">
            <button className="btn">
              <img src="images/apple.png" alt="Plane" style={{ height: '40px' }} />
            </button>
            <button className="btn">
              <img src="images/google.png" alt="Plane" style={{ height: '40px' }} />
            </button>
            <button className="btn">
              <img src="images/twitter.png" alt="Plane" style={{ height: '40px' }} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
