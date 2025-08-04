import Navbar from "../../../components/admin/Navbar";
import AdminProfile from './AdminProfile';
import InstituteProfile from './InstituteProfile';

const Profile = () => {
  const adminId = localStorage.getItem("adminId");
  const instituteId = localStorage.getItem("instituteId");

 
  return (
    <Navbar title="Profile">
      {instituteId ? <InstituteProfile /> : <AdminProfile />}
    </Navbar>
  );
};

export default Profile;