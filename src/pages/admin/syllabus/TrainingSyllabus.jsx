import Navbar from "../../../components/admin/Navbar";
import { useEffect, useState } from "react";
import { apiGet, apiPostUpload } from "../../../api/axios";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  TextField,
  MenuItem,
  Alert,
  Snackbar,
  CircularProgress,
  Backdrop
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { snackbarEmitter } from "../../../components/admin/CustomSnackbar";
import CustomTextField from "../../../components/admin/CustomTextField";
import CustomButton from "../../../components/admin/CustomButton";

function TrainingSyllabus() {
  const [syllabus, setSyllabus] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    title: '',
    category: ''
  });

  const fetchSyllabus = async () => {
    try {
      const response = await apiGet('/getSyllabus');


      if (response.data.status === 200 && response.data.data.length === 0) {
        snackbarEmitter('No syllabus found', 'info');
      }

      else if (response.data.status === 200) {
        setSyllabus(response.data.data);
      }

      else {
        snackbarEmitter(response.data.message, 'error');
      }


    } catch (error) {
      snackbarEmitter('Something went wrong', 'error');
    }
  };

  useEffect(() => {
    fetchSyllabus();
  }, []);

  const navigate = useNavigate();
  const handleClick = (item) => {
    navigate('/admin/trainingChapter', { state: item.title });
  };

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => {
    setOpenModal(false);
    setFormData({ image: null, title: '', category: '' });
    setFormErrors({ title: '', category: '' });
  };
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };


  const [formErrors, setFormErrors] = useState({
    title: '',
    category: '',
  });

  const [loading, setLoading] = useState(false);

  const handleAddSyllabus = async () => {

    const errors = {};

    if (!formData.title) errors.title = 'Title is required';
    if (!formData.category) errors.category = 'Category is required';

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setLoading(true);

    const data = new FormData();
    data.append('image', formData.image);
    data.append('title', formData.title);
    data.append('category', formData.category);

    try {

      const response = await apiPostUpload('/addSyllabus', data);
      setTimeout(() => {
        setLoading(false);
        if (response.data.status === 200) {
          snackbarEmitter(response.data.message, 'success');
          fetchSyllabus();
          handleModalClose();

        } else {
          snackbarEmitter(response.data.message, 'error');
          fetchSyllabus();
          handleModalClose();
        }

      }, 1500)

    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        snackbarEmitter('Something went wrong', 'error');
      }, 1500);


    }
  };


  const styles = {
    textField: {
      '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
      },
    }
  }

  return (

    <Navbar title="Syllabus">

      <Box >
        <Box sx={{ display: 'flex', mb: 1, alignItems: 'center' }}>
          <Typography sx={{ flexGrow: 0.8, fontWeight: 'bold', fontSize: { xs: '14px', sm: '15px', md: '18px' } }}>List of Syllabus</Typography>
          <CustomButton children=' + Add syllabus' onClick={handleModalOpen} loading={false} bgColor='#EAB308' sx={{ width: { xs: '70%', md: '20%', sm: '30%' }, fontSize: { xs: '12px', md: '14px', sm: '14px' } }} />
        </Box>

        <Grid container spacing={4} sx={{ mt: 5 }} >
          {
            <>
              {syllabus.length > 0 && syllabus.map((item, index) => (
                <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
                  <Card sx={{ height: '100%', textAlign: 'center', cursor: 'pointer' }}
                    onClick={() => handleClick(item)}
                  >
                    <CardMedia
                      component="img"
                      image={item.image || "/placeholder.jpg"} // fallback if image is not available
                      alt='image'
                      sx={{
                        // height: 100,
                        borderRadius: '50%',
                        objectFit: 'cover',
                        // mx: 'auto',
                        mt: 2,
                      }}
                    />
                    <CardContent>
                      <Typography sx={{ fontSize: { xs: '12px', sm: '14px', md: '14px' } }} component="div">
                        {item.title}
                      </Typography>
                      <Typography sx={{ color: 'orange', fontWeight: 'bold', fontSize: { xs: '10px', sm: '12px', md: '12px' } }}>
                        {item.category}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </>
          }
        </Grid>
      </Box>

      <Dialog open={openModal} onClose={handleModalClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Add Syllabus</Typography>
          <IconButton onClick={handleModalClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Box sx={{ mb: 2 }}>

            <Button variant="outlined" component="label" sx={{ gap: 1, color: 'black' }}>
              <CameraAltIcon />
              Upload
              <input
                hidden
                type="file"
                accept="image/*"
                name="image"
                onChange={handleInputChange}
              />
            </Button>
            {formData.image && (
              <Typography variant="body2" sx={{ mt: 1 }}>
                {formData.image.name}
              </Typography>
            )}
          </Box>

          <Grid container sx={{ display: 'flex', gap: 3, mb: 3 }}>
            <Grid size={{ xs: 10, md: 5, sm: 5 }}>
              <CustomTextField
                label="Syllabus Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Syllabus Title"
                error={!!formErrors.title} //error={formErrors.title ? true : false}
                helperText={formErrors.title}

              />
            </Grid>

            <Grid size={{ xs: 10, md: 5, sm: 5 }} >
              <CustomTextField
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="Category"
                error={!!formErrors.category}
                helperText={formErrors.category}
                select
              >
                <MenuItem value="General">General</MenuItem>
                <MenuItem value="Radio">Radio</MenuItem>
              </CustomTextField>
            </Grid>

          </Grid>

          <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
            <CustomButton children='Add' onClick={handleAddSyllabus} loading={loading} bgColor='#EAB308' sx={{ width: '20%' }} />
          </Grid>

        </DialogContent>
      </Dialog>
    </Navbar>
  );
}

export default TrainingSyllabus;
