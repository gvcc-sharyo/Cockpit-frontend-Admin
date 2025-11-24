import ReactDOM from "react-dom/client";
import App from "./App";
import { CustomSnackbarProvider } from "./components/admin/CustomSnackbar";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./context/AuthContext";

const google_client_id = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <GoogleOAuthProvider
        redirect_uri={"http://localhost:5173/adminlogin"}
        clientId={google_client_id}
      >
        <CustomSnackbarProvider>
          <App />
        </CustomSnackbarProvider>
      </GoogleOAuthProvider>
    </AuthProvider>
  </React.StrictMode>
);
