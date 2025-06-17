import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contextApi/AuthContext';
import { CustomSnackbarProvider } from './components/admin/CustomSnackbar';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CustomSnackbarProvider>
      <App />
    </CustomSnackbarProvider>
  </React.StrictMode>
);
