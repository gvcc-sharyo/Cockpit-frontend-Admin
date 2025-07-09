import Navbar from "../../../components/admin/Navbar";
import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Container,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  MenuItem,
  Box,
} from "@mui/material";
import EditSquareIcon from "@mui/icons-material/EditSquare";
import { apiGet, apiPost } from "../../../api/axios";
import CloseIcon from "@mui/icons-material/Close";
import InstituteTable from "../../../components/admin/InstituteTable";
import CustomButton from "../../../components/admin/CustomButton";
import CustomTextField from "../../../components/admin/CustomTextField";
import { snackbarEmitter } from "../../../components/admin/CustomSnackbar";

const styles = {
  container: {
    p: { xs: 2, md: 5 },
  },
  title: {
    fontFamily: "Exo",
    fontWeight: 500,
    fontSize: { xs: "18px", md: "24px" },
    color:"#111827",
  },
  buttonWrap: {
    display: "flex",
    justifyContent: { xs: "flex-end", sm: "flex-end" },
  },
  addBtn: {
    color: "white",
    width: "auto",
    fontFamily:"Lexend",
    fontWeight:"300"
  },
  dialogTitle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formGrid: {
    display: "flex",
    gap: 2,
    mb: 3,
    justifyContent: { md: "center", xs: "left" },
  },
  submitBtn: {
    backgroundColor: "orange",
    color: "white",
    fontWeight: "bold",
  },
};

function Institution() {
  const [openModal, setOpenModal] = useState(false);
  const [chapterName, setChapterName] = useState([]);

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => setOpenModal(false);
  const [loading, setLoading] = useState(false); 

  const [formData, setFormData] = useState({
    instituteName: "",
    department: "",
    email: "",
    phone: "",
    amount: "",
    period: "",
    address: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddInstitute = async () => {
    const req = {
      instituteName: formData.instituteName,
      department: formData.department,
      email: formData.email,
      phone: formData.phone,
      subscriptionAmt: formData.amount,
      subscriptionPeriod: formData.period,
      address: formData.address,
    };

    try {
      setLoading(true);

      const response = await apiPost("/admin/addInstitute", req);
      console.log(response.data.message);

      if (response.status === 200) {
        snackbarEmitter(response.data.message, "success");
        handleModalClose();
        setFormData({
          instituteName: "",
          department: "",
          email: "",
          phone: "",
          amount: "",
          period: "",
          address: "",
        });

       
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      } else {
        alert("Failed to add institute");

        // Even on failure, delay loader stop by 2 seconds
        setTimeout(() => {
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      console.error("Error adding institute:", error);
    }
  };

  return (
    <>
      <Navbar title="Institution">
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          spacing={2}
          sx={styles.container}
        >
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography sx={styles.title} gutterBottom>
              List of Institution
            </Typography>
          </Grid>

          <Grid size={{ xs: "auto", sm: 6 }} sx={styles.buttonWrap}>
            <CustomButton
              onClick={handleModalOpen}
              bgColor="#EAB308"
              sx={styles.addBtn}
            >
              + Add Institute
            </CustomButton>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <InstituteTable maxWidth={"100%"} />
          </Grid>
        </Grid>

        <Dialog open={openModal} onClose={handleModalClose} fullWidth>
          <DialogTitle sx={styles.dialogTitle}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              Add Institution
            </Typography>
            <IconButton onClick={handleModalClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>

          <DialogContent dividers>
            <Grid container sx={styles.formGrid}>
              <Grid size={{ xs: 12, md: 5 }}>
                <CustomTextField
                  label="Institute Name"
                  name="instituteName"
                  value={formData.instituteName}
                  onChange={handleInputChange}
                  placeholder="enter"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <CustomTextField
                  label="Department"
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  placeholder="enter"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <CustomTextField
                  label="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="enter"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <CustomTextField
                  label="Phone Number"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="enter"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <CustomTextField
                  label="Label Amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleInputChange}
                  placeholder="enter"
                />
              </Grid>
              <Grid size={{ xs: 12, md: 5 }}>
                <CustomTextField
                  label="Subscription Period"
                  select
                  name="period"
                  value={formData.period}
                  onChange={handleInputChange}
                  placeholder="enter"
                >
                  <MenuItem value="1">1 month</MenuItem>
                  <MenuItem value="6">6 months</MenuItem>
                  <MenuItem value="12">12 months</MenuItem>
                </CustomTextField>
              </Grid>
              <Grid size={{ xs: 12, md: 10.5 }}>
                <CustomTextField
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder="enter"
                />
              </Grid>
            </Grid>

            <Grid item sx={{ display: "flex", justifyContent: "center" }}>
              <CustomButton
                onClick={handleAddInstitute}
                loading={loading}
                bgColor="orange"
                sx={styles.submitBtn}
              >
                Add
              </CustomButton>
            </Grid>
          </DialogContent>
        </Dialog>
      </Navbar>
    </>
  );
}

export default Institution;
