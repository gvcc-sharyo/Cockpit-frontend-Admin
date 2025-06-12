import React from 'react';
import AppRouter from './routers/AppRouter';
import AdminRoute from './routers/AdminRoute';

function App() {
  return (
    <div>
      <AppRouter/>
      <AdminRoute/>
    </div>
  );
}

export default App;
