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
    MenuItem
} from "@mui/material";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { apiGet, apiPost } from "../../../api/axios";
import CloseIcon from '@mui/icons-material/Close';
import InstituteTable from "../../../components/admin/InstituteTable";

function Institution() {



     const [openModal, setOpenModal] = useState(false);
         const [chapterName, setChapterName] = useState([]);
     
         const handleModalOpen = () => setOpenModal(true);
         const handleModalClose = () => {
             setOpenModal(false);
         };
     
     
         const [formData, setFormData] = useState({
             instituteName: '',
             department: '',
             email: '',
             phone:'',
             amount:'',
             period:'',
             address: ''
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
                 address: formData.address
             }
     
             try {
                 const response = await apiPost('/admin/addInstitute', req);
                 if (response.status === 200) {
                     alert('Institute added successfully');
                     fetchInstitute();
                     handleModalClose();
                 } else {
                     alert('Failed to add institute');
                 }
             } catch (error) {
                 console.error('Error adding institute:', error);
             }
         }
     


    return (
        <>
            <Navbar title="Institution"  />

            <Container maxWidth="xl" >

                <Grid container sx={{ flexDirection: 'column', position: "relative", backgroundColor: '#f8f9fa', padding: '10px' }} mt={-60} ml={30} >

                    <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Grid>
                            <Typography sx={{ fontSize: '30px' }} gutterBottom >List of Institution</Typography>

                        </Grid>


                        <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }} mb={2}>
                            <Button onClick={handleModalOpen} variant="'outlined" sx={{ backgroundColor: 'orange', color: 'white' }}>+ Add Institute</Button>
                        </Grid>
                    </Grid>

                    <InstituteTable maxWidth={'100%'}/>

                </Grid>
            </Container>

            <Dialog open={openModal} onClose={handleModalClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Add Institution</Typography>
                    <IconButton onClick={handleModalClose}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>

                <DialogContent dividers>

                    <Grid container sx={{ display: 'flex', gap: 3, mb: 3 }}>
                        <Grid size={{ xs: 6, md: 5 }}>
                            <Typography sx={{ fontSize: '14px' }} gutterBottom>Institute Name</Typography>
                            <TextField
                                fullWidth
                                label="enter"
                                name="instituteName"
                                value={formData.instituteName}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 6, md: 5 }}>
                            <Typography sx={{ fontSize: '14px' }} gutterBottom>Department</Typography>
                            <TextField
                                fullWidth
                                label="enter"
                                name="department"
                                value={formData.department}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container sx={{ display: 'flex', gap: 3, mb: 3 }}>
                        <Grid size={{ xs: 6, md: 5 }}>
                            <Typography sx={{ fontSize: '14px' }} gutterBottom>E-mail</Typography>
                            <TextField
                                fullWidth
                                label="enter"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                            />
                          
                        </Grid>
                        <Grid size={{ xs: 6, md: 5 }}>
                            <Typography sx={{ fontSize: '14px' }} gutterBottom>Phone number</Typography>
                            <TextField
                                fullWidth
                                label="enter"
                                name="phone"
                                value={formData.phone}
                                onChange={handleInputChange}
                            />
                          
                        </Grid>
                    </Grid>

                    <Grid container sx={{ display: 'flex', gap: 3, mb: 3 }}>
                        <Grid size={{ xs: 6, md: 5 }}>
                            <Typography sx={{ fontSize: '14px' }} gutterBottom>Subscription amount</Typography>
                            <TextField
                                fullWidth
                                label="enter"
                                name="amount"
                                value={formData.amount}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid size={{ xs: 6, md: 5 }}>
                            <Typography sx={{ fontSize: '14px' }} gutterBottom>Subscription period</Typography>
                            <TextField
                                select
                                fullWidth
                                label="enter"
                                name="period"
                                value={formData.period}
                                onChange={handleInputChange}
                            >
                                <MenuItem value="1">1 month</MenuItem>
                                <MenuItem value="6">6 months</MenuItem>
                                <MenuItem value="12">12 months</MenuItem>
                            </TextField>
                        </Grid>
                    </Grid>

                    <Grid container sx={{ display: 'flex', gap: 3, mb: 3 }}>
                        <Grid size={{ xs: 6, md: 10.5 }}>
                            <Typography sx={{ fontSize: '14px' }} gutterBottom>Address</Typography>
                            <TextField
                                fullWidth
                                label="enter"
                                name="address"
                                value={formData.address}
                                onChange={handleInputChange}
                            />
                          
                        </Grid>
                    </Grid>

                    <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Button
                            // fullWidth
                            variant="contained"
                            sx={{ backgroundColor: 'orange', color: 'white', fontWeight: 'bold' }}
                            onClick={handleAddInstitute}
                        >
                            Add
                        </Button>
                    </Grid>

                </DialogContent>
            </Dialog>

        </>
    );
}

export default Institution;
