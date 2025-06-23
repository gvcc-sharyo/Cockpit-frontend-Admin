import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import Navbar from "../../../components/admin/Navbar";
import { apiDelete, apiGet, apiPost } from "../../../api/axios";
import CustomButton from "../../../components/admin/CustomButton";
import { snackbarEmitter } from "../../../components/admin/CustomSnackbar";
import CustomTextField from "../../../components/admin/CustomTextField";
const Pricing = () => {
  const [forms, setForms] = useState([{ planName: "", price: "", duration: "", isNew: true }]);
  const [errors, setErrors] = useState([{}]);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [loadingUpdateIndex, setLoadingUpdateIndex] = useState(null);
  const [confirmIndex, setConfirmIndex] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => { getPlanDetails(); }, []);
  const clearError = (index, field) => {
    const updated = [...errors];
    updated[index] = { ...updated[index], [field]: "" };
    setErrors(updated);
  };
  const handleChange = (index, field, value) => {
    // Enforce numeric input for price field
    if (field === "price" && value !== "" && !/^\d*$/.test(value)) {
      return; // Ignore non-numeric input
    }
    const updatedForms = [...forms];
    updatedForms[index][field] = value;
    setForms(updatedForms);
    clearError(index, field);
  };
  const validate = ({ planName, price, duration }) => {
    const errs = {};
    if (!planName?.trim()) errs.planName = "Plan Name is required";
    if (!price || isNaN(price) || Number(price) <= 0) errs.price = "Price must be a valid number";
    if (!duration?.trim()) errs.duration = "Duration is required";
    return errs;
  };
  const setValidationErrors = (index, validationErrors) => {
    const updated = [...errors];
    updated[index] = validationErrors;
    setErrors(updated);
  };
  const handleSubmit = async (index) => {
    const form = forms[index];
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length) return setValidationErrors(index, validationErrors);
    setLoadingIndex(index);
    try {
      const payload = { planName: form.planName.trim(), price: parseInt(form.price), duration: form.duration.trim() };
      const { data } = await apiPost("/admin/createPricing", payload);
      const updatedForms = [...forms];
      updatedForms[index] = { ...form, isNew: false, _id: data.data._id };
      updatedForms.push({ planName: "", price: "", duration: "", isNew: true });
      setForms(updatedForms);
      setErrors([...errors.slice(0, index + 1), {}, ...errors.slice(index + 1)]);
      snackbarEmitter(data.message, "success");
    } catch (error) {
      snackbarEmitter("Something went wrong", "error");
    } finally {
      setTimeout(() => setLoadingIndex(null), 2000);
    }
  };
  const getPlanDetails = async () => {
    try {
      const { data } = await apiGet("/admin/getPricing");
      const formatted = (data?.data || []).filter(p => p.planName?.trim() && p.price != null && p.duration?.trim())
        .map(p => ({ ...p, price: p.price.toString(), isNew: false }));
      setForms(formatted);
      setErrors(formatted.map(() => ({})));
    } catch (error) {
      snackbarEmitter("Something went wrong", "error");
    }
  };
  const handleAddPlan = () => {
    setForms([...forms, { planName: "", price: "", duration: "", isNew: true }]);
    setErrors([...errors, {}]);
  };
  const handleDelete = async (index) => {
    try {
      const res = await apiDelete("/admin/deletePricing", { pricingId: forms[index]?._id });
      if (res.data.status === 200) {
        snackbarEmitter(res.data.message, "success");
        setForms(forms.filter((_, i) => i !== index));
      }
      setErrors(errors.filter((_, i) => i !== index));
    } catch (error) {
      snackbarEmitter(error?.message || "Delete failed", "error");
    }
  };
  const handleUpdate = async (index) => {
    const validationErrors = validate(forms[index]);
    if (Object.keys(validationErrors).length) return setValidationErrors(index, validationErrors);
    setLoadingUpdateIndex(index);
    try {
      const { _id, planName, price, duration, modules = [] } = forms[index];
      const res = await apiPost("/admin/updatePricing", { pricingId: _id, planName, price: Number(price), duration, modules });
      setTimeout(() => setLoadingUpdateIndex(snackbarEmitter(res.data.message, "success")), 2000);
      const updatedForms = [...forms];
      updatedForms[index].isNew = false;
      setForms(updatedForms);
      setErrors(prev => { const copy = [...prev]; copy[index] = {}; return copy; });
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setTimeout(() => setLoadingUpdateIndex(null), 2000);
    }
  };
  const fields = [
    { label: "Plan Name", placeholder: "Monthly Plan", valueKey: "planName", type: "text" },
    { label: "Plan Price", placeholder: "169", valueKey: "price", type: "text", inputMode: "numeric", pattern: "[0-9]*" },
    { label: "Plan Duration", placeholder: "1 month", valueKey: "duration", type: "text" },
  ];
  return (
    <Navbar title="Pricing">
      <Box>
        <Typography variant="h5" mb={3} sx={{ fontFamily: "Jost", fontWeight: 600 }}>Plan Details</Typography>
        {forms.map((formData, index) => (
          <Box key={index} sx={{ bgcolor: "#fff", p: { xs: 2, md: 4 }, borderRadius: 4, boxShadow: 1, mb: 2 }}>
            <Grid container spacing={3}>
              {fields.map(({ label, placeholder, valueKey, type, inputMode, pattern }) => (
                <Grid key={valueKey} size={{ xs: 12, md: 4 }}>
                  <CustomTextField
                    label={label}
                    required
                    placeholder={placeholder}
                    type={type}
                    inputMode={inputMode}
                    pattern={pattern}
                    value={formData[valueKey]}
                    onChange={(e) => handleChange(index, valueKey, e.target.value)}
                    error={!!errors[index]?.[valueKey]}
                    helperText={errors[index]?.[valueKey]}
                  />
                </Grid>
              ))}
              <Grid size={{ xs: 12 }} textAlign="center">
                <CustomButton onClick={() => formData.isNew ? handleSubmit(index) : handleUpdate(index)} loading={formData.isNew ? loadingIndex === index : loadingUpdateIndex === index} bgColor="#EAB308" borderRadius="10px" sx={{ px: 4, width: "auto" }}>
                  {formData.isNew ? "Save" : "Update"}
                </CustomButton>
              </Grid>
            </Grid>
            <Box sx={{ textAlign: { md: "right", xs: "center" }, mt: 2 }}>
              <Button variant="text" color="primary" disabled={formData.isNew} onClick={() => { setConfirmIndex(index); setOpenDialog(true); }}>Delete</Button>
            </Box>
          </Box>
        ))}
      </Box>
      <Box mt={4} textAlign={{ xs: "center", md: "right" }}>
        <Button onClick={handleAddPlan} sx={{ bgcolor: "#EAB308", color: "#fff", borderRadius: 2, px: 4 }}>+ Add Plans</Button>
      </Box>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="xs">
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to delete this Pricing?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} variant="outlined">Cancel</Button>
          <Button onClick={() => { handleDelete(confirmIndex); setOpenDialog(false); }} variant="contained" color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Navbar>
  );
};
export default Pricing;
