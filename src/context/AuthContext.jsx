import { createContext, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [adminToken, setAdminToken] = useState(localStorage.getItem("adminToken"));
  const[adminId, setAdminId] = useState(localStorage.getItem("adminId"));
  const [instituteToken, setInstituteToken] = useState(localStorage.getItem("instituteToken"));
  const [instituteId, setInstituteId] = useState(localStorage.getItem("instituteId"));

  useEffect(() => {
    if (adminToken) localStorage.setItem("adminToken", adminToken);
    else localStorage.removeItem("adminToken");

    if (adminId) localStorage.setItem("adminId", adminId);
    else localStorage.removeItem("adminId");

    if (instituteToken) localStorage.setItem("instituteToken", instituteToken);
    else localStorage.removeItem("instituteToken");

    if (instituteId) localStorage.setItem("instituteId", instituteId);
    else localStorage.removeItem("instituteId");

  }, [adminToken, adminId, instituteToken, instituteId]);

  const logout = () => {
    setAdminToken(null);
    setAdminId(null);
    setInstituteToken(null);
    setInstituteId(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{
      adminToken,
      setAdminToken,
      adminId,
      setAdminId,
      instituteToken,
      setInstituteToken,
      instituteId,
      setInstituteId,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
