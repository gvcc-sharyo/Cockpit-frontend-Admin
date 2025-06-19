import React, { useState, useEffect } from "react";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Card,
  Box,
  Typography,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { apiGet, apiPost, apiPostToken, apiPut } from "../../../api/axios";
import Navbar from "../../../components/admin/Navbar";
import CustomTextField from "../../../components/admin/CustomTextField";
import { snackbarEmitter } from "../../../components/admin/CustomSnackbar";
import CustomButton from "../../../components/admin/CustomButton";

const Profile = () => {
  const adminId = localStorage.getItem("adminId");

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    dob: "",
    phone: "",
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    gender: "",
    profileimage: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);

  const [initialFormData, setInitialFormData] = useState(formData);

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const response = await apiGet(`/admin/getAdmin?adminId=${adminId}`);
      const data = response.data.data;
      console.log(response.data);

      if (response.data.status === 200) {
        snackbarEmitter(response.data.message, "success");
      } else {
        snackbarEmitter("Unexpected error", "error");
      }

      console.log("Fetched profile data:", data);

      const newFormData = {
        username: data.username || "",
        email: data.email || "",
        dob: data.dob ? data.dob.split("T")[0] : "",
        phone: data.phone || "",
        firstname: data.firstname || "",
        lastname: data.lastname || "",
        address: data.address || "",
        city: data.city || "",
        state: data.state || "",
        zipcode: data.zipcode || "",
        gender: data.gender || "",
        profileimage: data.profileimage || "",
        role: data.role || "",
      };

      setFormData(newFormData);
      setInitialFormData(newFormData);
    } catch (error) {
      console.error("Error fetching profile:", error);
      snackbarEmitter("Failed to fetch profile", "error");
    }
  };

  const updateProfile = async () => {
    setLoading(true);

    try {
      const payload = {
        adminId,
        ...formData,
      };
      console.log("Sending data:", payload);

      

      const response = await apiPost("/admin/updateAdmin", payload);

      if (response.data.status === 200) {
        setTimeout(() => {
          snackbarEmitter(response.data.message, "success");
        }, 2000);
      } else {
         setTimeout(() => {
          snackbarEmitter(response.data.message, "warning");
        }, 2000);
      }
      setTimeout(() => {
        setLoading(false);
      }, 2000);

      console.log("Profile updated:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
      snackbarEmitter("Unexpected Error", "error");

      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    console.log("Enter Data", formData);
    e.preventDefault();
    updateProfile();
  };

  const handleCancel = () => {
    setFormData(initialFormData);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        profileimage: file,
      }));
    }
  };

  return (
    <Navbar title={"Profile"}>
      <Box>
        <Card
          elevation={3}
          sx={{
            borderRadius: 4,
            width: "auto",
            p: { md: 6, xs: 1 },
            backgroundColor: "#fff",
          }}
        >
          <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
            <Grid size={{ xs: 12 }}>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{
                  width: 100,
                  height: 100,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  backgroundColor: "#f5f5f5",
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <label
                  htmlFor="profile-upload"
                  style={{ width: "100%", height: "100%", cursor: "pointer" }}
                >
                  {formData.profileimage ? (
                    <img
                      src={URL.createObjectURL(formData.profileimage)}
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      sx={{ width: "100%", height: "100%" }}
                    >
                      <CameraAltIcon fontSize="large" />
                    </Box>
                  )}
                </label>
                <input
                  type="file"
                  id="profile-upload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                name="firstname"
                placeholder="First Name"
                value={formData.firstname}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                name="lastname"
                placeholder="Last Name"
                value={formData.lastname}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                name="phone"
                placeholder="Mobile Number"
                value={formData.phone}
                onChange={handleChange}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                placeholder="Date of Birth"
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "50px",
                    borderRadius: "10px",
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormControl fullWidth>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  label="Gender"
                  sx={{
                    height: "50px",
                    borderRadius: "10px",
                  }}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <CustomTextField
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel>City</InputLabel>
                <Select
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  label="City"
                  sx={{
                    height: "50px",
                    borderRadius: "10px",
                  }}
                >
                  <MenuItem value="New York">New York</MenuItem>
                  <MenuItem value="Los Angeles">Los Angeles</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  label="State"
                  sx={{
                    height: "50px",
                    borderRadius: "10px",
                  }}
                >
                  <MenuItem value="NY">NY</MenuItem>
                  <MenuItem value="CA">CA</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel>ZIP Code</InputLabel>
                <Select
                  name="zipcode"
                  value={formData.zipcode}
                  onChange={handleChange}
                  label="ZIP Code"
                  sx={{
                    height: "50px",
                    borderRadius: "10px",
                  }}
                >
                  <MenuItem value="10001">10001</MenuItem>
                  <MenuItem value="90001">90001</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid
              size={{ xs: 12 }}
              display="flex"
              justifyContent="flex-end"
              gap={2}
            >
              <Button variant="outlined" sx={{ px: 4,width:"auto" }} onClick={handleCancel}>
                Cancel
              </Button>
              <CustomButton
                type="submit"
                loading={loading}
                bgColor="#EAB308"
                borderRadius="10px"
                sx={{
                  px: 4,
                  width: { xs: "auto", sm: "auto" },
                }}
              >
                Save
              </CustomButton>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Navbar>
  );
};

export default Profile;
