import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, TextField, Button } from "@mui/material";
import Navbar from "../../../components/admin/Navbar";
import { apiGet, apiPost } from "../../../api/axios";

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

  const handleChange = (index, field, value) => {
    const newForms = [...forms];
    newForms[index] = { ...newForms[index], [field]: value };
    setForms(newForms);

    const newErrors = [...errors];
    newErrors[index] = { ...newErrors[index], [field]: "" };
    setErrors(newErrors);
  };

  const validate = (formData) => {
    const newErrors = {};

    if (!formData.planName || formData.planName.trim() === "") {
      newErrors.planName = "Plan Name is required";
    }

    if (
      formData.price === undefined ||
      formData.price === null ||
      formData.price === "" ||
      isNaN(formData.price) ||
      Number(formData.price) <= 0
    ) {
      newErrors.price = "Price must be a valid number";
    }

    if (!formData.duration || formData.duration.trim() === "") {
      newErrors.duration = "Duration is required";
    }

    return newErrors;
  };

  const handleSubmit = async (index) => {
    const validationErrors = validate(forms[index]);
    if (Object.keys(validationErrors).length > 0) {
      const newErrors = [...errors];
      newErrors[index] = validationErrors;
      setErrors(newErrors);
      return;
    }

    try {
      const res = await apiPost("/admin/createPricing", {
        planName: forms[index].planName.trim(),
        price: parseInt(forms[index].price),
        duration: forms[index].duration.trim(),
      });

      console.log("Submitted successfully:", res.data);

      const newForms = [...forms];
      newForms[index].isNew = false;

      // Add new empty form after successful submission
      newForms.push({ planName: "", price: "", duration: "", isNew: true });
      setForms(newForms);

      const newErrors = [...errors];
      newErrors[index] = {};
      newErrors.push({});
      setErrors(newErrors);
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const getPlanDetails = async () => {
    try {
      const response = await apiGet("/admin/getPricing");
      const rawData = response.data?.data || [];

      const validEntries = rawData.filter(
        (entry) =>
          entry.planName?.trim() &&
          entry.price !== null &&
          entry.duration?.trim()
      );

      const formattedForms = validEntries.map((entry) => ({
        planName: entry.planName,
        price: entry.price.toString(),
        duration: entry.duration,
        isNew: false,
      }));

      setForms(formattedForms);
      setErrors(formattedForms.map(() => ({})));

      console.log("Valid Plans:", formattedForms);
    } catch (error) {
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

  const handleDelete = (index) => {
    if (forms.length === 1) return;
    const newForms = forms.filter((_, i) => i !== index);
    const newErrors = errors.filter((_, i) => i !== index);
    setForms(newForms);
    setErrors(newErrors);
  };

  return (
    <Navbar title={"Pricing"}>
      <Box>
        <Box mb={4}>
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
                p: 4,
                borderRadius: 4,
                boxShadow: 1,
                marginBottom: 2,
              }}
            >
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 12, md: 6, lg: 4, xl: 4 }}>
                  <Typography
                    sx={{
                      fontFamily: "Jost",
                      fontWeight: 400,
                      fontSize: "14px",
                      mb: 1,
                    }}
                  >
                    Plan Name <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    placeholder="Monthly Plan"
                    value={formData.planName}
                    onChange={(e) =>
                      handleChange(index, "planName", e.target.value)
                    }
                    error={!!errors[index]?.planName}
                    helperText={errors[index]?.planName}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        height: "50px",
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
                  <Typography
                    sx={{
                      fontFamily: "Jost",
                      fontWeight: 400,
                      fontSize: "14px",
                      mb: 1,
                    }}
                  >
                    Plan Price <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <TextField
                    type="number"
                    fullWidth
                    required
                    placeholder="169"
                    value={formData.price}
                    onChange={(e) =>
                      handleChange(index, "price", e.target.value)
                    }
                    error={!!errors[index]?.price}
                    helperText={errors[index]?.price}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        height: "50px",
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12, sm: 12, md: 4, lg: 4, xl: 4 }}>
                  <Typography
                    sx={{
                      fontFamily: "Jost",
                      fontWeight: 400,
                      fontSize: "14px",
                      mb: 1,
                    }}
                  >
                    Plan Duration <span style={{ color: "red" }}>*</span>
                  </Typography>
                  <TextField
                    fullWidth
                    required
                    placeholder="1 month"
                    value={formData.duration}
                    onChange={(e) =>
                      handleChange(index, "duration", e.target.value)
                    }
                    error={!!errors[index]?.duration}
                    helperText={errors[index]?.duration}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                        height: "50px",
                      },
                    }}
                  />
                </Grid>

                <Grid size={{ xs: 12 }}>
                  <Box textAlign="center">
                    {formData.isNew && (
                      <Button
                        onClick={() => handleSubmit(index)}
                        sx={{
                          bgcolor: "#EAB308",
                          color: "#fff",
                          borderRadius: 2,
                          px: 4,
                        }}
                      >
                        Save
                      </Button>
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
      </Box>
    </Navbar>
  );
};

export default Pricing;
