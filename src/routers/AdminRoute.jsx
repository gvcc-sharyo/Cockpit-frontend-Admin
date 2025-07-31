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
import InstitutionDetail from '../pages/admin/institute/InstitutionDetail';
import StudentProfile from '../pages/admin/studentProfile/StudentProfile';
import StudentPerformance from '../pages/admin/studentProfile/StudentPerformance';
import Test from '../pages/admin/database/Test/Test';
import TestQuestions from '../pages/admin/database/Test/TestQuestions';
import AddTestQuestion from '../pages/admin/database/Test/AddTestQuestion';

const AdminRoute = () => {
  const instituteId = localStorage.getItem("instituteId");
  const routePrefix = instituteId ? "/admin/institute" : "/admin";

  const AuthRoute = () => {
    const isAuthenticated = !!localStorage.getItem("adminToken") || !!localStorage.getItem("instituteToken");
    return isAuthenticated ? <Outlet /> : <Navigate to="/adminlogin" />;
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/resetpassword/:token" element={<ResetPassword />} />

        <Route element={<AuthRoute />}>
          <Route path={`${routePrefix}/dashboard`} element={<Dashboard />} />
          <Route path={`${routePrefix}/trainingsyllabus`} element={<TrainingSyllabus />} />
          <Route path={`${routePrefix}/feedback`} element={<Feedback />} />
          <Route path={`${routePrefix}/trainingChapter`} element={<TrainingChapter />} />
          <Route path={`${routePrefix}/trainingQuestion`} element={<TrainingQuestion />} />
          <Route path={`${routePrefix}/addQuestion`} element={<AddQuestion />} />
          <Route path={`${routePrefix}/trainingAdd`} element={<TrainingAdd />} />
          <Route path={`${routePrefix}/institution`} element={<Institution />} />
          <Route path={`${routePrefix}/institutiondetails`} element={<InstitutionDetail />} />
          <Route path={`${routePrefix}/notifications`} element={<Notifications />} />
          <Route path={`${routePrefix}/pricing`} element={<Pricing />} />
          <Route path={`${routePrefix}/profile`} element={<Profile />} />
          <Route path={`${routePrefix}/studentProfile`} element={<StudentProfile />} />
          <Route path={`${routePrefix}/studentPerformance`} element={<StudentPerformance />} />
          <Route path={`${routePrefix}/test`} element={<Test />} />
          <Route path={`${routePrefix}/testQuestions`} element={<TestQuestions />} />
          <Route path={`${routePrefix}/addTestQuestion`} element={<AddTestQuestion />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AdminRoute;
