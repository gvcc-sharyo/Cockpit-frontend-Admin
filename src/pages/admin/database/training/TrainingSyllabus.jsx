import Navbar from "../../../../components/admin/Navbar";
import { useEffect, useState } from "react";
import { apiGet, apiGetToken, apiPostUploadToken } from "../../../../api/axios";
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
  Snackbar
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

function TrainingSyllabus() {
  const [syllabus, setSyllabus] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    title: '',
    category: ''
  });

  const [showAlert1, setShowAlert1] = useState(false);
  const fetchSyllabus = async () => {
    try {
      const response = await apiGetToken('/getSyllabus', 'admin');
      setSyllabus(response.data.data);
      if (syllabus.length === 0) {
        setShowAlert1(true);
      }
    } catch (error) {
      alert('Error fetching syllabus:', error);
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
  };
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const [showAlert, setShowAlert] = useState(false);

  const handleAddSyllabus = async () => {
    const data = new FormData();
    data.append('image', formData.image);
    data.append('title', formData.title);
    data.append('category', formData.category);

    try {
      const response = await apiPostUploadToken('/addSyllabus', data);
      if (response.status === 200) {

        fetchSyllabus();
        handleModalClose();
        setShowAlert(true);

      } else {
        Alert("Something went wrong");
      }
    } catch (error) {
      console.error('Error adding syllabus:', error);
    }
  };

  return (
    <>
      <Navbar title="Training" />

      {
        showAlert && (
          <Snackbar open={showAlert} autoHideDuration={2000} onClose={() => setShowAlert(false)}>
            <Alert onClose={() => setShowAlert(false)} severity="success" sx={{ width: '100%' }}>
              Syllabus added successfully!
            </Alert>
          </Snackbar>
        )
      }

      <Container maxWidth="xl" >


        <Box sx={{ position: "relative", backgroundColor: '#f8f9fa', padding: '10px' }} mt={-60} ml={30} >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>List of Syllabus</Typography>
            <Button onClick={handleModalOpen} variant="contained" sx={{ backgroundColor: 'orange', color: 'white', fontWeight: 'bold' }}> + Add Syllabus</Button>
          </Box>


          <Grid container spacing={4} sx={{ mt: 5 }} >
            {
              syllabus.length === 0 ? (
                <Snackbar
                  open={showAlert1}
                  autoHideDuration={4000}
                  message="Syllabus not found"
                  onClose={() => setShowAlert1(false)}
                  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                />
              ) :
                <>
                  {syllabus.map((item, index) => (
                    <Grid key={index}>
                      <Card sx={{ height: '100%', textAlign: 'center', cursor: 'pointer' }}
                        onClick={() => handleClick(item)}
                      >
                        <CardMedia
                          component="img"
                          image={item.image || "/placeholder.jpg"} // fallback if image is not available
                          alt='image'
                          sx={{
                            // width: 100,
                            // height: 100,
                            borderRadius: '50%',
                            objectFit: 'cover',
                            // mx: 'auto',
                            mt: 2,
                          }}
                        />
                        <CardContent>
                          <Typography variant="h6" component="div">
                            {item.title}
                          </Typography>
                          <Typography variant="body2" sx={{ color: 'orange', fontWeight: 'bold' }}>
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
      </Container>


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
            <Grid size={{ xs: 6, md: 5 }}>
              <Typography sx={{ fontSize: '14px' }} gutterBottom>Syllabus title</Typography>
              <TextField
                fullWidth
                label="Syllabus Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid size={{ xs: 6, md: 5 }}>
              <Typography sx={{ fontSize: '14px' }} gutterBottom>Category</Typography>
              <TextField
                select
                fullWidth
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <MenuItem value="General">General</MenuItem>
                <MenuItem value="Radio">Radio</MenuItem>
              </TextField>
            </Grid>

          </Grid>

          <Grid item sx={{ display: 'flex', justifyContent: 'center' }}>
            <Button
              // fullWidth
              variant="contained"
              sx={{ backgroundColor: 'orange', color: 'white', fontWeight: 'bold' }}
              onClick={handleAddSyllabus}
            >
              Add
            </Button>
          </Grid>

        </DialogContent>
      </Dialog>
    </>
  );
}

export default TrainingSyllabus;
