import { apiGet, apiPost } from "../../../api/axios";
import CustomTable from "../../../components/admin/CustomTable";
import CustomButton from "../../../components/admin/CustomButton";
import CustomTextField from "../../../components/admin/CustomTextField";
import CustomTypography from "../../../components/admin/CustomTypography";
import { snackbarEmitter } from "../../../components/admin/CustomSnackbar";
import Navbar from "../../../components/admin/Navbar";

const styles = {
    container: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },
    title: {
        fontFamily: "Exo",
        fontWeight: 500,
        fontSize: { xs: "18px", md: "24px" },
        color: "#111827",
    },
    buttonWrap: {
        display: "flex",
        justifyContent: { xs: "flex-end", sm: "flex-end" },
    },
    addBtn: {
        color: "white",
        width: "auto",
        // fontFamily:"Lexend",
        fontWeight: "300"
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
    //   submitBtn: {
    //     backgroundColor: "orange",
    //     color: "white",
    //     fontWeight: "bold",
    //   },
};
function Institution() {
    const [openModal, setOpenModal] = useState(false);
    const [chapterName, setChapterName] = useState([]);





    const [institutes, setInstitutes] = useState([])

    const fetchInstitute = async () => {
        try {
            const response = await apiGet('/admin/getInstitute');

            if (response.data.status === 200 && response.data.data.length === 0) {
                snackbarEmitter('No institutes found', 'info');
            }
            else if (response.data.status === 200) {
                setInstitutes(response.data.data);
            }
            else {
                snackbarEmitter(response.data.message, 'error');
            }

        } catch (error) {
            snackbarEmitter('Something went wrong', 'error');
        }
    };

    useEffect(() => {
        fetchInstitute();
    }, [])



    const handleModalOpen = () => setOpenModal(true);
    const handleModalClose = () => {
        setOpenModal(false);
        setFormData({});
        setFormErrs({});
    }

    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        instituteName: "",
        department: "",
        email: "",
        phone: "",
        amount: "",
        period: "",
        password: "",
        transactionid: "",
        address: "",
    });
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const [formErrs, setFormErrs] = useState({});

    const handleErrors = () => {
        const errs = {};
        if (!formData.instituteName) errs.instituteName = "Institute name is required";
        if (!formData.department) errs.department = "Department is required";
        if (!formData.email) errs.email = "Email is required";
        if (!/\S+@\S+\.\S+/.test(formData.email)) errs.email = 'Invalid email';
        if (!formData.phone) errs.phone = "Phone number is required";
        if (!formData.amount) errs.amount = "Amount is required";
        if (!formData.period) errs.period = "Period is required";
        if (!formData.password) errs.password = "Password is required";
        if (!formData.address) errs.address = "Address is required";
        setFormErrs(errs);
        return errs;
    };

    const handleAddInstitute = async () => {
        const errors = handleErrors();

        if (errors.length > 0) {
            return;
        }


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

    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/admin/institutiondetails');
    }

const tableHeaders = ['Sr no', 'Institute Name', 'Number of students', 'Status', 'Action'];

    return (
        <>
            <Navbar title="Institution">
                <Grid
                    container
                    sx={styles.container}
                >
                    <Grid size={{ xs: 6, sm: 6, md: 6 }}>
                        <CustomTypography text='List of institution' fontWeight={500} fontSize={{ xs: "18px", md: "22px", sm: "20px" }} />
                    </Grid>
                    <Grid >
                        <CustomButton children='Add institute' onClick={handleModalOpen} loading={false} bgColor='#EAB308' sx={{ width: { xs: '100%', md: '100%', sm: '100%' }, fontSize: { xs: '12px', md: '14px', sm: '14px' } }} />
                    </Grid>

                </Grid>

                <Grid size={{ xs: 12 }} mt={2}>
                    <CustomTable maxWidth={"100%"} handleClick={handleClick} institutes={institutes} tableHeaders={tableHeaders} />
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
                                    label="Institute Name*"
                                    name="instituteName"
                                    value={formData.instituteName}
                                    onChange={handleInputChange}
                                    placeholder="Enter"
                                    error={!!formErrs.instituteName}
                                    helperText={formErrs.instituteName}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 5 }}>
                                <CustomTextField
                                    label="Department*"
                                    name="department"
                                    value={formData.department}
                                    onChange={handleInputChange}
                                    placeholder="Enter"
                                    error={!!formErrs.department}
                                    helperText={formErrs.department}
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
                                    label="Label Amount*"
                                    name="amount"
                                    value={formData.amount}
                                    onChange={handleInputChange}
                                    placeholder="Enter"
                                    error={!!formErrs.amount}
                                    helperText={formErrs.amount}
                                />
                            </Grid>
                            <Grid size={{ xs: 12, md: 5 }}>
                                <CustomTextField
                                    label="Subscription Period*"
                                    select
                                    name="period"
                                    value={formData.period}
                                    onChange={handleInputChange}
                                    placeholder="Enter"
                                    error={!!formErrs.period}
                                    helperText={formErrs.period}
                                >
                                    <MenuItem value="1">1 month</MenuItem>
                                    <MenuItem value="6">6 months</MenuItem>
                                    <MenuItem value="12">12 months</MenuItem>
                                </CustomTextField>
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

                            <Grid size={{ xs: 12, md: 5 }}>
                                <CustomTextField
                                    label="Transaction ID"
                                    name="transactionid"
                                    value={formData.transactionid}
                                    onChange={handleInputChange}
                                    placeholder="Enter"
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
                            <CustomButton children='Add' onClick={handleAddInstitute} loading={false} bgColor='#EAB308' sx={{ width: '20%' }} />
                        </Grid>
                    </DialogContent>
                </Dialog>
            </Navbar>
        </>
    );
}
export default Institution;
