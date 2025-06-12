import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/admin/dashboard/Dashboard';
import TrainingSyllabus from '../pages/admin/database/training/TrainingSyllabus';
import Feedback from '../pages/admin/database/Feedback';
import AdminLogin from '../pages/admin/adminLogin/AdminLogin';
import TrainingChapter from '../pages/admin/database/training/TrainingChapter';
import TrainingQuestion from '../pages/admin/database/training/TrainingQuestion';
import AddQuestion from '../pages/admin/database/training/AddQuestion';
import Institution from '../pages/admin/institute/Institution';

const AdminRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/trainingsyllabus" element={<TrainingSyllabus />} />
        <Route path="/admin/feedback" element={<Feedback />} />
        {/* <Route path="/admin/adminLogin" element={<AdminLogin />} /> */}
        <Route path="/admin/trainingChapter" element={<TrainingChapter />} />
        <Route path="/admin/trainingQuestion/:syllabusName/:bookName/:chapterName" element={<TrainingQuestion />} />
        <Route path="/admin/addQuestion" element={<AddQuestion />} />
        <Route path="/admin/institution" element={<Institution />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AdminRoute;
