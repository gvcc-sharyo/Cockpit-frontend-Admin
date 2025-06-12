import Header from "../../components/Header/Header";
import FooterSection from "../../components/Footer/footer";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function UserProfile() {
    const navigate = useNavigate();
  
const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    navigate('/');
  };

  return (
    <>
    <Header/>
      <div>User profile</div>
      <Button onClick={handleLogout} variant="contained">Logout</Button>
      <FooterSection/>
    </>
  );
}

export default UserProfile;
