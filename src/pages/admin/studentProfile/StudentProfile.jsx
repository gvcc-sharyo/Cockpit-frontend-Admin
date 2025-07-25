import Navbar from "../../../components/admin/Navbar";
import CustomButton from "../../../components/admin/CustomButton";
import CustomTypography from "../../../components/admin/CustomTypography";
import CustomTable from "../../../components/admin/CustomTable";
import CustomTextField from "../../../components/admin/CustomTextField";
import { apiGet, apiGetToken, apiPost } from "../../../api/axios";
import { snackbarEmitter } from "../../../components/admin/CustomSnackbar";
import AdminStudentProfile from "./InstituteStudentProfile";
import SuperAdminStudentProfile from "./SuperAdminInstitute";

function StudentProfile() {


  const instituteId = localStorage.getItem("instituteId");
      

 


  
  

  

  return (
    <Navbar title="Student Profile">
     {instituteId ? <AdminStudentProfile /> : <SuperAdminStudentProfile />}   
    </Navbar>
  );
}
export default StudentProfile;
