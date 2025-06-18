import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;
// const BASE_URL = 'http://13.235.91.167:8000/cockpit';

// GET
export const apiGet = async (endpoint) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  return await axios.get(`${BASE_URL}${endpoint}`, { headers });
};

export const apiGetToken = async (endpoint,  userType='student', data) => {
  const tokenType = userType === 'student' ? 'authToken' : 'adminToken';
  const token = localStorage.getItem(tokenType); 

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }), 
    // 'User-Type': userType
  };
  
  return await axios.get(`${BASE_URL}${endpoint}`, { headers });
};


export const apiPost = async (endpoint, data) => {
             
  const headers = {
    'Content-Type': 'application/json',
  };

  return await axios.post(`${BASE_URL}${endpoint}`, data, { headers });
};




export const apiPostToken = async (endpoint, data) => {
  const token = localStorage.getItem('adminToken'); 

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }), 
  };

  return await axios.post(`${BASE_URL}${endpoint}`, data, { headers });
};

export const apiPostUpload = async (endpoint, data) => {
             

  const headers = {
    'Content-Type': 'multipart/form-data',
  };


  return await axios.post(`${BASE_URL}${endpoint}`, data, { headers });
};

// PUT
export const apiPut = async (endpoint, data) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  return await axios.put(`${BASE_URL}${endpoint}`, data, { headers });
};


// DELETE
export const apiDelete = async (endpoint, body) => {
  const headers = {
    'Content-Type': 'application/json',
  };

  return await axios.delete(`${BASE_URL}${endpoint}`, { headers });
};
