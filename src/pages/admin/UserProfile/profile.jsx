import React from "react";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Card,
  Typography,
  Box,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Navbar from "../../../components/admin/Navbar";

const Profile = () => {
  return (
    <Navbar title={"Profile"}>
      <Box className="d-flex" >
        <Card
          elevation={3}
          sx={{ borderRadius: 4, width: "auto", p: 6, backgroundColor: "#fff" }}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12 }}>
              <Box
                display="flex"
                alignItems="flex-start"
                sx={{
                  width: 100,
                  height: 100,
                  border: "1px solid #ccc",
                  borderRadius: 2,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#f5f5f5",
                }}
              >
                <CameraAltIcon fontSize="large" />
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="First Name"
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
              <TextField
                fullWidth
                label="Last Name"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "50px",
                    borderRadius: "10px",
                  },
                }}
              />
            </Grid>

            <Grid  size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Mobile Number"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "50px",
                    borderRadius: "10px",
                  },
                }}
              />
            </Grid>
            <Grid  size={{ xs: 12, md: 6 }}>
              <TextField
                fullWidth
                label="Email Address"
                type="email"
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
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
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
                  defaultValue=""
                  label="Gender"
                  sx={{
                    height: "50px",
                    borderRadius: "10px",
                  }}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <TextField
                fullWidth
                label="Address"
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    height: "50px",
                    borderRadius: "10px",
                  },
                }}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel>City</InputLabel>
                <Select
                  defaultValue=""
                  label="City"
                  sx={{
                    height: "50px",
                    borderRadius: "10px",
                  }}
                >
                  <MenuItem value="City 1">City 1</MenuItem>
                  <MenuItem value="City 2">City 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel>State</InputLabel>
                <Select
                  defaultValue=""
                  label="State"
                  sx={{
                    height: "50px",
                    borderRadius: "10px",
                  }}
                >
                  <MenuItem value="State 1">State 1</MenuItem>
                  <MenuItem value="State 2">State 2</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <FormControl fullWidth>
                <InputLabel>ZIP Code</InputLabel>
                <Select
                  defaultValue=""
                  label="ZIP Code"
                  sx={{
                    height: "50px",
                    borderRadius: "10px",
                  }}
                >
                  <MenuItem value="123456">123456</MenuItem>
                  <MenuItem value="654321">654321</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid
          
              size={{ xs: 12 }}
              display="flex"
              justifyContent="flex-end"
              gap={2}
            >
              <Button variant="outlined" sx={{ px: 4 }}>
                Cancel
              </Button>
              <Button
                variant="contained"
                sx={{
                  px: 4,
                  backgroundColor: "#EAB308",
                  color: "white",
                  borderRadius: 2,
                  "&:hover": { backgroundColor: "#d8a207" },
                }}
              >
                Next
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Navbar>
  );
};

export default Profile;
