import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/admin/dashboard/Dashboard';
import TrainingSyllabus from '../pages/admin/syllabus/TrainingSyllabus';
import Feedback from '../pages/admin/database/Feedback';
import AdminLogin from '../pages/admin/adminLogin/AdminLogin';
import TrainingChapter from '../pages/admin/syllabus/TrainingChapter';
import TrainingQuestion from '../pages/admin/syllabus/TrainingQuestion';
import Institution from '../pages/admin/institute/Institution';
import Notifications from '../pages/admin/Notifications/notifications';
import Pricing from '../pages/admin/Pricing/pricing';
import Profile from '../pages/admin/UserProfile/profile';
import AddQuestion from '../pages/admin/syllabus/AddQuestion';
import TrainingAdd from '../pages/admin/database/training/TrainingAdd';

const AdminRoute = () => {
  const token = localStorage.getItem('adminToken');

  const PrivateRoute = (Component) => {
    return token ? Component : <Navigate to="/" replace />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />

        {/* Protected Routes */}
        <Route path="/admin/dashboard" element={PrivateRoute(<Dashboard />)} />
        <Route path="/admin/trainingsyllabus" element={PrivateRoute(<TrainingSyllabus />)} />
        <Route path="/admin/feedback" element={PrivateRoute(<Feedback />)} />
        <Route path="/admin/trainingChapter" element={PrivateRoute(<TrainingChapter />)} />
        <Route path="/admin/trainingQuestion" element={PrivateRoute(<TrainingQuestion />)} />
        <Route path="/admin/addQuestion" element={PrivateRoute(<AddQuestion />)} />
        <Route path="/admin/trainingAdd" element={PrivateRoute(<TrainingAdd />)} />
        <Route path="/admin/institution" element={PrivateRoute(<Institution />)} />
        <Route path="/admin/notifications" element={PrivateRoute(<Notifications />)} />
        <Route path="/admin/pricing" element={PrivateRoute(<Pricing />)} />
        <Route path="/admin/profile" element={PrivateRoute(<Profile />)} />
      </Routes>
    </BrowserRouter>
  );
};

export default AdminRoute;
