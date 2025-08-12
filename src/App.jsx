import AdminRoute from './routers/AdminRoute';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    // <AuthProvider>
      <AdminRoute />
    // </AuthProvider>
  );
}

export default App;
