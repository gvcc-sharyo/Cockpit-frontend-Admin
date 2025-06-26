import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
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
import ResetPassword from '../pages/admin/resetPassword/ResetPassword';

const AdminRoute = () => {

  const AuthRoute = () => {
    const isAuthenticated = !!localStorage.getItem("adminToken");
    return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />
        
        <Route element={<AuthRoute />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/trainingsyllabus" element={<TrainingSyllabus />} />
        <Route path="/admin/feedback" element={<Feedback />} />
        <Route path="/admin/trainingChapter" element={<TrainingChapter />} />
        <Route path="/admin/trainingQuestion" element={<TrainingQuestion />} />
        <Route path="/admin/addQuestion" element={<AddQuestion />} />
        <Route path="/admin/trainingAdd" element={<TrainingAdd />} />
        <Route path="/admin/institution" element={<Institution />} />
        <Route path="/admin/notifications" element={<Notifications />} />
        <Route path="/admin/pricing" element={<Pricing />} />
        <Route path="/admin/profile" element={<Profile />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
};

export default AdminRoute;