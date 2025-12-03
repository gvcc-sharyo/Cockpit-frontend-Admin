import ReactDOM from "react-dom/client";
import App from "./App";
import { CustomSnackbarProvider } from "./components/admin/CustomSnackbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";
import { Suspense } from "react";


const google_client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <GoogleOAuthProvider
      clientId={google_client_id}
    >
      <CustomSnackbarProvider>
        <Suspense fallback={<div>Loading...</div>}>
          <App />
        </Suspense>
      </CustomSnackbarProvider>
    </GoogleOAuthProvider>
  </AuthProvider>
);
