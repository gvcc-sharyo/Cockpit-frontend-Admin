import { useAuth } from "../context/AuthContext";

export const getAdminRoutePrefix = () => {
  const { instituteId } = useAuth();
  return instituteId ? "/admin/institute" : "/admin";
};
