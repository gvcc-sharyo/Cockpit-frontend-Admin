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
import CloseIcon from "@mui/icons-material/Close";
import Navbar from "../../../components/admin/Navbar";
import CustomButton from "../../../components/admin/CustomButton";
import CustomTypography from "../../../components/admin/CustomTypography";
import CustomTable from "../../../components/admin/CustomTable";
import CustomTextField from "../../../components/admin/CustomTextField";


function StudentProfile() {

    const [openModal, setOpenModal] = useState(false);

    // const [institutes, setInstitutes] = useState([])

    // const fetchInstitute = async () => {
    //     try {
    //         const response = await apiGet('/admin/getInstitute');

    //         if (response.data.status === 200 && response.data.data.length === 0) {
    //             snackbarEmitter('No institutes found', 'info');
    //         }
    //         else if (response.data.status === 200) {
    //             setInstitutes(response.data.data);
    //         }
    //         else {
    //             snackbarEmitter(response.data.message, 'error');
    //         }

    //     } catch (error) {
    //         snackbarEmitter('Something went wrong', 'error');
    //     }
    // };

    // useEffect(() => {
    //     fetchInstitute();
    // }, [])



    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => {
        setOpenModal(false);
        setFormData({});
        setFormErrs({});
    }

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        gender: "",
        password: "",
        address: "",
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [formErrs, setFormErrs] = useState({});

    const handleErrors = () => {
        const errs = {};
        if (!formData.firstName) errs.firstName = "First name is required";
        if (!formData.lastName) errs.lastName = "Last name is required";
        if (!formData.email) errs.email = "Email is required";
        if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email';
        if (!formData.phone) errs.phone = "Phone number is required";
        if (!formData.gender) errs.gender = "Gender is required";
        if (!formData.password) errs.password = "Password is required";
        if (!formData.address) errs.address = "Address is required";
        setFormErrs(errs);
        return errs;
    };

    const handleAddStudent = async () => {
        const errors = handleErrors();

        if (errors.length > 0) {
            return;
        }


        const req = {
            // instituteName: formData.instituteName,
            // department: formData.department,
            // email: formData.email,
            // phone: formData.phone,
            // subscriptionAmt: formData.amount,
            // subscriptionPeriod: formData.period,
            // address: formData.address,
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
                }, 500);
            } else {
                alert("Failed to add institute");
                // Even on failure, delay loader stop by 2 seconds
                setTimeout(() => {
                    setLoading(false);
                }, 500);
            }
        } catch (error) {
            console.error("Error adding institute:", error);
        }
    };

    const tableHeaders = ['Sr No', 'First Name', 'Last Name', 'Gender', 'Phone', 'Status', 'Action'];


    const styles = {
        container: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
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
    }

    return (
        <Navbar title="Student Profile">

            <Grid
                container
                sx={styles.container}
                size={{ xs: 12, sm: 11, md: 11 }}

            >
                <Grid size={{ xs: 6, sm: 6, md: 6 }}>
                    <CustomTypography text='Students' fontWeight={500} fontSize={{ xs: "18px", md: "22px", sm: "20px" }} />
                </Grid>
                <Grid >
                    <CustomButton children='+ Add student' onClick={handleModalOpen} loading={false} bgColor='#EAB308' sx={{ width: { xs: '100%', md: '100%', sm: '100%' }, fontSize: { xs: '12px', md: '14px', sm: '14px' } }} />
                </Grid>

            </Grid>

            <Grid mt={2}>
                <CustomTable maxWidth={"100%"} tableHeaders={tableHeaders} />
            </Grid>



            <Dialog open={openModal} onClose={handleModalClose} fullWidth>
                <DialogTitle sx={styles.dialogTitle}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        Add Student
                    </Typography>
                    <IconButton onClick={handleModalClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <Grid container sx={styles.formGrid}>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <CustomTextField
                                label="First Name*"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                placeholder="Enter"
                                error={!!formErrs.firstName}
                                helperText={formErrs.firstName}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <CustomTextField
                                label="Last name*"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                placeholder="Enter"
                                error={!!formErrs.lastName}
                                helperText={formErrs.lastName}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <CustomTextField
                                select
                                label="Gender*"
                                name="gender"
                                value={formData.gender}
                                onChange={handleInputChange}
                                placeholder="Enter"
                                error={!!formErrs.gender}
                                helperText={formErrs.gender}
                            >
                                <MenuItem value="male">Male</MenuItem>
                                <MenuItem value="female">Female</MenuItem>
                                <MenuItem value="other">Other</MenuItem>
                                
                            </CustomTextField>
                        </Grid>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <CustomTextField
                                label="Phone Number*"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                                placeholder="Enter"
                                error={!!formErrs.phone}
                                helperText={formErrs.phone}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <CustomTextField
                                label="Email*"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter"
                                error={!!formErrs.email}
                                helperText={formErrs.email}
                            />
                        </Grid>

                         <Grid size={{ xs: 12, md: 5 }}>
                            <CustomTextField
                                label="Password*"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                placeholder="Enter"
                                error={!!formErrs.password}
                                helperText={formErrs.password}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 10.5 }}>
                            <CustomTextField
                                label="Address*"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                                placeholder="Enter"
                                error={!!formErrs.address}
                                helperText={formErrs.address}
                            />
                        </Grid>

                    </Grid>
                    <Grid item sx={{ display: "flex", justifyContent: "center" }} size={{ xs: 12, md: 6 }}>
                        <CustomButton children='Add' loading={false} bgColor='#EAB308' sx={{ width: '20%' }} />
                    </Grid>
                </DialogContent>
            </Dialog>

        </Navbar>

    );
}
export default StudentProfile;
