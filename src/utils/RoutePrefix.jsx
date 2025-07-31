// src/utils/getAdminRoutePrefix.js
export const getAdminRoutePrefix = () => {
  const instituteId = localStorage.getItem("instituteId");
  return instituteId ? "/admin/institute" : "/admin";
};
