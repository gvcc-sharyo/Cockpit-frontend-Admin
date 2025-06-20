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
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { apiGet, apiPost } from "../../../api/axios";
import Navbar from "../../../components/admin/Navbar";
import CustomTextField from "../../../components/admin/CustomTextField";
import { snackbarEmitter } from "../../../components/admin/CustomSnackbar";
import CustomButton from "../../../components/admin/CustomButton";

const Profile = () => {
  const adminId = localStorage.getItem("adminId");
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    dob: "",
    phone: "",
    firstname: "",
    lastname: "",
    address: "",
    city: "",
    state: "",
    zipcode: "",
    gender: "",
    role: "",
  });
  const [loading, setLoading] = useState(false);
  const [initialFormData, setInitialFormData] = useState(formData);
  const [profileImage, setProfileImage] = useState(null);

  // Combined getProfile and useEffect into single function
  useEffect(() => {
    const getProfile = async () => {
      try {
        const {
          data: { data },
        } = await apiGet(`/admin/getAdmin?adminId=${adminId}`);
        console.log("Fetched profile data:", data);
        const newFormData = {
          username: data.username || "",
          dob: data.dob?.split("T")[0] || "",
          phone: data.phone || "",
          firstname: data.firstname || "",
          lastname: data.lastname || "",
          address: data.address || "",
          city: data.city || "",
          state: data.state || "",
          zipcode: data.zipcode || "",
          gender: data.gender || "",
          role: data.role || "",
        };
        setFormData(newFormData);
        setInitialFormData(newFormData);
        setProfileImage(data.profileimage);
        setEmail(data.email);
      } catch (error) {
        console.error("Error fetching profile:", error);
        snackbarEmitter("Error fetching profile", "error");
      }
    };
    getProfile();
  }, [adminId]); // Added adminId as dependency

  // Combined updateProfile and uploadImage into single submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload image if present
      if (profileImage instanceof File) {
        const formDataImage = new FormData();
        formDataImage.append("image", profileImage);
        const { data } = await apiPost(
          `/admin/uploadAdminImage?adminId=${adminId}`,
          formDataImage
        );
        setProfileImage(data.data.profileimage);
      }

      // Update profile
      const payload = { adminId, ...formData, profileimage: profileImage };
      console.log("Sending data:", payload);
      const { data } = await apiPost("/admin/updateAdmin", payload);

      setTimeout(() => {
        snackbarEmitter(
          data.message,
          data.status === 200 ? "success" : "warning"
        );
        setLoading(false);
      }, 2000);

      console.log("Profile updated:", data);
    } catch (error) {
      console.error("Error:", error);
      setTimeout(() => {
        snackbarEmitter("Unexpected Error", "error");
        setLoading(false);
      }, 2000);
    }
  };

  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = ({ target: { files } }) => {
    const file = files[0];
    if (file) setProfileImage(file);
  };

  // Simplified cancel handler
  const handleCancel = () => setFormData(initialFormData);

  const inputFields = [
    { name: "firstname", placeholder: "First Name", value: formData.firstname },
    { name: "lastname", placeholder: "Last Name", value: formData.lastname },
    { name: "phone", placeholder: "Mobile Number", value: formData.phone },
    { name: "email", placeholder: "Email Address", value: email },
  ];

  const addressFields = [
    {
      name: "address",
      placeholder: "Address",
      value: formData.address,
      size: { xs: 12 },
    },
    {
      name: "city",
      placeholder: "City",
      value: formData.city,
      size: { xs: 12, md: 4 },
    },
    {
      name: "state",
      placeholder: "State",
      value: formData.state,
      size: { xs: 12, md: 4 },
    },
    {
      name: "zipcode",
      placeholder: "ZipCode",
      value: formData.zipcode,
      size: { xs: 12, md: 4 },
    },
  ];

  return (
    <Navbar title="Profile">
      <Box>
        <Card
          elevation={3}
          sx={{ borderRadius: 4, p: { md: 6, xs: 1 }, backgroundColor: "#fff" }}
        >
          <Grid container spacing={2} component="form" onSubmit={handleSubmit}>


            <Grid size={{ xs: 12 }} sx={{justifyContent:{xs:"center",md:"left"},display:"flex"}}>
              <Box
                sx={{
                  width: 100,
                  height: 100,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  backgroundColor: "#f5f5f5",
                  cursor: "pointer",
                  overflow: "hidden",
                  position: "relative",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <label
                  htmlFor="profile-upload"
                  style={{ width: "100%", height: "100%", cursor: "pointer" }}
                >
                  {profileImage ? (
                    <img
                      src={
                        profileImage instanceof File
                          ? URL.createObjectURL(profileImage)
                          : profileImage
                      }
                      alt="Profile"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                  ) : (
                    <CameraAltIcon fontSize="large" />
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

            {inputFields.map((field) => (
              <Grid key={field.name} size={{ xs: 12, md: 6 }}>
                <CustomTextField
                  name={field.name}
                  placeholder={field.placeholder}
                  value={field.value}
                  onChange={handleChange}
                />
              </Grid>
            ))}

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
                    height: "45px",
                    borderRadius: "10px",
                  },
                }}
              />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField
                select
                required
                placeholder="Gender"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                SelectProps={{ native: false }}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </CustomTextField>
            </Grid>
            {addressFields.map((field) => (
              <Grid key={field.name} size={field.size}>
                <CustomTextField name={field.name} placeholder={field.placeholder} value={field.value} onChange={handleChange}/>
              </Grid>
            ))}

            <Grid size={{ xs: 12 }} display="flex" justifyContent="flex-end" gap={2}>
              <Button variant="outlined" sx={{ px: 4, width: "auto" }} onClick={handleCancel}> Cancel </Button>
              <CustomButton  type="submit" loading={loading} bgColor="#EAB308" borderRadius="10px" sx={{ px: 4, width: { xs: "auto", sm: "auto" } }}>Save </CustomButton>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Navbar>
  );
};

export default Profile;
