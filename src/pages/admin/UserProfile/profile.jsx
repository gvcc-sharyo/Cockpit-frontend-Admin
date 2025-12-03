import Navbar from "../../../components/admin/Navbar";
import AdminProfile from './AdminProfile';
import InstituteProfile from './InstituteProfile';
import { useAuth } from "../../../context/AuthContext";

const Profile = () => {

  const { instituteId } = useAuth();

 
  return (
    <Navbar title="Profile">
      {instituteId ? <InstituteProfile /> : <AdminProfile />}
    </Navbar>
  );
};

export default Profile;