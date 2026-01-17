import Navbar from "../../../components/admin/Navbar";
import AdminStudentProfile from "./InstituteStudentProfile";
import SuperAdminStudentProfile from "./SuperAdminInstitute";
import { useAuth } from "../../../context/AuthContext";

function StudentProfile() {
  const { instituteId } = useAuth();

  return (
    <Navbar title="Student Profile">
      {instituteId ? <AdminStudentProfile /> : <SuperAdminStudentProfile />}
    </Navbar>
  );
}
export default StudentProfile;
