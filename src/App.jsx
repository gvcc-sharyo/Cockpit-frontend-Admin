import AdminRoute from './routers/AdminRoute';
import { Suspense } from "react";
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    // <AuthProvider>
    <Suspense fallback={<div>Loading...</div>}>
      <AdminRoute />
    </Suspense>
    // </AuthProvider>
  );
}

export default App;
