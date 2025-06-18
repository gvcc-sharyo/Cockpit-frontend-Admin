import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import Navbar from "../../../components/admin/Navbar";
import { apiDelete, apiGet, apiPost, apiPut } from "../../../api/axios";
import CustomButton from "../../../components/admin/CustomButton";
import { snackbarEmitter } from "../../../components/admin/CustomSnackbar";
import CustomTextField from "../../../components/admin/CustomTextField";

const Pricing = () => {
  const [forms, setForms] = useState([
    {
      planName: "",
      price: "",
      duration: "",
      isNew: true,
    },
  ]);
  const [errors, setErrors] = useState([{}]);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [loadingUpdateIndex, setLoadingUpdateIndex] = useState(null);

  const clearError = (index, field) => {
    const updated = [...errors];
    updated[index] = { ...updated[index], [field]: "" };
    setErrors(updated);
  };

  const handleChange = (index, field, value) => {
    const updatedForms = [...forms];
    updatedForms[index] = { ...updatedForms[index], [field]: value };
    setForms(updatedForms);
    clearError(index, field);
  };

  const validate = ({ planName, price, duration }) => {
    const errs = {};
    if (!planName?.trim()) errs.planName = "Plan Name is required";
    if (!price || isNaN(price) || Number(price) <= 0)
      errs.price = "Price must be a valid number";
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
  if (Object.keys(validationErrors).length)
    return setValidationErrors(index, validationErrors);

  setLoadingIndex(index);

  try {
    const payload = {
      planName: form.planName.trim(),
      price: parseInt(form.price),
      duration: form.duration.trim(),
    };

    const { data } = await apiPost("/admin/createPricing", payload);
    const updatedForms = [...forms];
    updatedForms[index] = { ...form, isNew: false, _id: data.data._id };
    updatedForms.push({ planName: "", price: "", duration: "", isNew: true });
    setForms(updatedForms);

    const updatedErrors = [...errors];
    updatedErrors[index] = {};
    updatedErrors.push({});
    setErrors(updatedErrors);
    snackbarEmitter(data.message, 'success');
    console.log("Submitted successfully:", data);
  } catch (error) {
    snackbarEmitter('Something went wrong', 'error');
  } finally {
    setTimeout(() => {
      setLoadingIndex(null);
    }, 2000);
  }
};


  const getPlanDetails = async () => {
    try {
      const { data } = await apiGet("/admin/getPricing");
      snackbarEmitter(data.message,'success');
      const plans = (data?.data || []).filter(
        ({ planName, price, duration }) =>
          planName?.trim() && price != null && duration?.trim()
      );

      const formatted = plans.map((p) => ({
        planName: p.planName,
        price: p.price.toString(),
        duration: p.duration,
        _id: p._id,
        isNew: false,
      }));

      setForms(formatted);
      setErrors(formatted.map(() => ({})));

      console.log("Valid Plans:", formatted);
    } catch (error) {
      snackbarEmitter('Something went wrong', 'error');
      console.error("Failed to fetch plan details:", error);
    }
  };

  useEffect(() => {
    getPlanDetails();
  }, []);

  const handleAddPlan = () => {
    setForms([
      ...forms,
      { planName: "", price: "", duration: "", isNew: true },
    ]);
    setErrors([...errors, {}]);
  };

  const handleDelete = async (index) => {
    if (forms.length === 1) return;
    const pricingId = forms[index]?._id;
    console.log("Pricing ID:",pricingId);

    try {
      const res = await apiDelete('/admin/deletePricing', { pricingId });
     if(res.data.status === 200){
        
      snackbarEmitter(res.data.message,'success')
     setForms(forms.filter((_, i) => i !== index));
      console.log("Deleted:", res.data);
     }
      setErrors(errors.filter((_, i) => i !== index));
    } catch (error) {
      console.error("Delete failed:", error?.response?.data || error);
      snackbarEmitter(res.message,'error');
    }
  };

 const handleUpdate = async (index) => {
  const validationErrors = validate(forms[index]);
  if (Object.keys(validationErrors).length > 0) {
    const newErrors = [...errors];
    newErrors[index] = validationErrors;
    setErrors(newErrors);
    return;
  }

  setLoadingUpdateIndex(index);

  try {
    const { _id, planName, price, duration, modules = [] } = forms[index];

    const res = await apiPost("/admin/updatePricing", {
      pricingId: _id,
      planName,
      price: Number(price),
      duration,
      modules,
    });
     snackbarEmitter(res.data.message,'success');
    console.log("Updated successfully:", res.data);

    const updatedForms = [...forms];
    updatedForms[index].isNew = false;
    setForms(updatedForms);

    const updatedErrors = [...errors];
    updatedErrors[index] = {};
    setErrors(updatedErrors);
  } catch (error) {
    console.error("Update failed:", error);
  } finally {
    setTimeout(() => {
      setLoadingUpdateIndex(null); 
    }, 2000);
  }
};


  const fields = [
    {
      label: "Plan Name",
      placeholder: "Monthly Plan",
      valueKey: "planName",
      type: "text",
    },
    {
      label: "Plan Price",
      placeholder: "169",
      valueKey: "price",
      type: "number",
    },
    {
      label: "Plan Duration",
      placeholder: "1 month",
      valueKey: "duration",
      type: "text",
    },
  ];

  return (
    <Navbar title={"Pricing"}>
      <Box>
        <Typography
          variant="h5"
          mb={3}
          sx={{ fontFamily: "Jost", fontWeight: 600 }}
        >
          Plan Details
        </Typography>
        {forms.map((formData, index) => (
          <Box
            key={index}
            sx={{
              bgcolor: "#fff",
              p: { xs: 2, md: 4 },
              borderRadius: 4,
              boxShadow: 1,
              marginBottom: 2,
            }}
          >
            <Grid container spacing={3}>
              {fields.map(({ label, placeholder, valueKey, type }, idx) => (
                <Grid
                  key={valueKey}
                  size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}
                >
                  <CustomTextField
                    label={label}
                    required
                    placeholder={placeholder}
                    type={type}
                    value={formData[valueKey]}
                    onChange={(e) =>
                      handleChange(index, valueKey, e.target.value)
                    }
                    error={!!errors[index]?.[valueKey]}
                    helperText={errors[index]?.[valueKey]}
                  />
                </Grid>
              ))}

              <Grid size={{ xs: 12 }}>
                <Box textAlign="center">
                  {formData.isNew ? (
                    <CustomButton
                      onClick={() => handleSubmit(index)}
                      loading={loadingIndex === index}
                      bgColor="#EAB308"
                      borderRadius="10px"
                      sx={{ px: 4, width: "auto" }}
                    >
                      Save
                    </CustomButton>
                  ) : (
                    <CustomButton
                      onClick={() => handleUpdate(index)}
                      loading={loadingUpdateIndex === index}
                      bgColor="#3B82F6"
                      borderRadius="10px"
                      sx={{ px: 4, width: "auto" }}
                    >
                      Update
                    </CustomButton>
                  )}
                </Box>
              </Grid>
            </Grid>

            <Box sx={{ textAlign: { md: "right", xs: "center" }, mt: 2 }}>
              <Button
                variant="text"
                color="primary"
                onClick={() => handleDelete(index)}
                disabled={forms.length === 1}
              >
                Delete
              </Button>
            </Box>
          </Box>
        ))}
      </Box>

      <Box mt={4} textAlign={{ xs: "center", md: "right" }}>
        <Button
          onClick={handleAddPlan}
          sx={{ bgcolor: "#EAB308", color: "#fff", borderRadius: 2, px: 4 }}
        >
          + Add Plans
        </Button>
      </Box>
    </Navbar>
  );
};

export default Pricing;
