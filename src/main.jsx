import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contextApi/AuthContext';
import { CustomSnackbarProvider } from './components/admin/CustomSnackbar';
import { GoogleOAuthProvider} from '@react-oauth/google';

const google_client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider redirect_uri={"http://localhost:5173/adminlogin"}  clientId={google_client_id}>
      <CustomSnackbarProvider>
        <App />
      </CustomSnackbarProvider>
    </GoogleOAuthProvider>

  </React.StrictMode>
);
