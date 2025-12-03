import Navbar from "../../../components/admin/Navbar";
import { apiGet, apiPostUpload, apiDelete } from "../../../api/axios";
import { snackbarEmitter } from "../../../components/admin/CustomSnackbar";
import CustomTextField from "../../../components/admin/CustomTextField";
import CustomButton from "../../../components/admin/CustomButton";
import CustomTypography from "../../../components/admin/CustomTypography";
import { getAdminRoutePrefix } from "../../../utils/RoutePrefix";
import { Switch } from "@mui/material";


function TrainingSyllabus() {
  const routePrefix = getAdminRoutePrefix();
  const [syllabus, setSyllabus] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    image: null,
    title: '',
    category: '',
    isBlocked: false
  });
  const adminId = localStorage.getItem("adminId");

  const fetchSyllabus = async () => {
    try {
      const response = await apiGet('/getSyllabus');


      if (response.data.status === 200 && response.data.data.length === 0) {
        setSyllabus([]);
        // setMenuItem([]);
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
    navigate(`${routePrefix}/trainingChapter`, {
      state: {
        syllabusID: item._id,
        syllabusTitle: item.title,
        category: item.category
      }
    });
  };

  const handleModalOpen = () => setOpenModal(true);
  const handleModalClose = () => {
    setOpenModal(false);
    setFormData({ image: null, title: '', category: '' });
    setFormErrors({ title: '', category: '' });
    setIsEditing(false);
    closeMenu();
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
  });

  const [loading, setLoading] = useState(false);

  const handleAddSyllabus = async () => {

    const errors = {};

    if (!formData.title) errors.title = 'Title is required';
    if (!formData.image) errors.image = 'Image is required';

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setLoading(true);

    const data = new FormData();
    data.append('image', formData.image);
    data.append('title', formData.title);
    data.append('category', formData.category);
    data.append('isBlocked', formData.isBlocked);
    if (isEditing) {
      data.append('syllabusId', menuItem._id);
    }

    try {
      const endpoint = isEditing ? '/updateSyllabus' : '/addSyllabus';
      const response = await apiPostUpload(endpoint, data);

      // const response = await apiPostUpload('/addSyllabus', data);
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

        closeMenu();

      }, 500)

    } catch (error) {
      setTimeout(() => {
        setLoading(false);
        snackbarEmitter('Something went wrong', 'error');
        closeMenu();
      }, 500);


    }
  };

  const [menuAnchor, setMenuAnchor] = useState(false);
  const [menuItem, setMenuItem] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  const openMenu = (e, item) => {

    setMenuAnchor(e.currentTarget);
    setMenuItem(item);
  };

  const closeMenu = () => {
    setMenuAnchor(null);
    setMenuItem([]);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormData(
      {
        image: menuItem.imageUrl,
        title: menuItem.title,
        category: menuItem.category,
        isBlocked: menuItem.isBlocked
      }
    )
    handleModalOpen();

  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState('');

  const handleDeleteModalClose = () => {
    setOpenDeleteModal(false);
    setDeleteId('');
  }

  const handleDelete = () => {
    setOpenDeleteModal(true);
    setDeleteId(menuItem._id);
  }

  const handleDeleteSyllabus = async () => {

    setLoading(true);
    try {
      const response = await apiDelete(`/deleteSyllabus/${deleteId}`);

      setTimeout(() => {
        setLoading(false);
        if (response.data.status === 200) {
          snackbarEmitter(response.data.message, 'success');
          handleDeleteModalClose();
        } else {
          snackbarEmitter(response.data.message, 'error');
          handleDeleteModalClose();
        }
        closeMenu();
        fetchSyllabus();
      }, 500)

    } catch (error) {
      setLoading(false);
      snackbarEmitter('Something went wrong', 'error');
      handleModalClose();
      fetchSyllabus();
      closeMenu();
    }
  }

  const styles = {
    textField: {
      '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
      },
    }
  }

  const handleToggleBlocked = (event) => {
    setFormData((prev) => ({
      ...prev,
      isBlocked: event.target.checked,
    }));
  };


  return (

    <Navbar title="Syllabus">

      <Box >
        <Box sx={{ display: 'flex', mb: 1, alignItems: 'center', justifyContent: 'space-between' }}>
          <CustomTypography text='List of syllabus' fontWeight='600' fontSize={{ xs: '14px', sm: '18px', md: '18px' }} />
          <CustomButton children=' + Add syllabus' onClick={handleModalOpen} loading={false} bgColor='#EAB308' sx={{ width: { xs: '50%', md: '20%', sm: '30%' }, fontSize: { xs: '12px', md: '14px', sm: '14px' } }} />
        </Box>

        <Grid container spacing={4} sx={{ mt: 5, maxHeight: '70vh', overflowY: 'scroll' }}>

          {
            syllabus.length > 0 && syllabus.map((item, index) => (

              <Grid size={{ xs: 6, sm: 4, md: 3 }} key={index}>
                <Card sx={{ height: '90%', textAlign: 'center' }}

                >
                  <Box sx={{ display: "flex", justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <CardMedia
                      component="img"
                      image={item.imageUrl} // fallback if image is not available
                      alt='image'
                      sx={{
                        height: { xs: 55, sm: 70, md: 80 },
                        width: { xs: 55, sm: 70, md: 80 },
                        borderRadius: '50%',
                        objectFit: 'cover',
                        mx: { xs: 'auto', sm: '10px', md: '10px' },
                        mt: 2,
                        cursor: 'pointer',

                        //  ml:2
                      }}
                      onClick={() => handleClick(item)}
                    />

                    <IconButton
                      onClick={(e) => openMenu(e, item)}
                    // sx={{ position: 'absolute', top: 20, right: 0 }}
                    >
                      <MoreHorizIcon />
                    </IconButton>
                  </Box>

                  <CardContent onClick={() => handleClick(item)} sx={{ cursor: 'pointer' }}>
                    {/* <Typography sx={{ fontSize: { xs: '12px', sm: '14px', md: '14px', fontWeight: 'bold' } }} component="div">
                        {item.title}
                      </Typography> */}
                    <CustomTypography text={item.title} fontWeight='500' fontSize={{ xs: '10px', sm: '14px', md: '16px' }} />
                    <CustomTypography text={item.category} color='#EAB308' fontSize={{ xs: '10px', sm: '13px', md: '13px' }} />
                  </CardContent>

                </Card>

              </Grid>

            ))}


          <Menu anchorEl={menuAnchor} open={Boolean(menuAnchor)} onClose={closeMenu}
          >
            <MenuItem onClick={handleEdit} >Edit</MenuItem>
            <MenuItem onClick={handleDelete} >Delete</MenuItem>
          </Menu>

        </Grid>
      </Box>

      <Dialog open={openModal} onClose={handleModalClose} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CustomTypography text='Add syllabus' fontWeight='800' fontSize={{ xs: '14px', sm: '18px', md: '18px' }} />
          <IconButton onClick={handleModalClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent dividers>

          <Grid container spacing={2} sx={{ display: 'flex', mb: 3 }}>
            <Grid size={{ xs: 12, md: adminId ? 6 : 12 }}
            >
              <Box sx={{ mb: 2 }}>
                <Button variant="outlined" component="label" sx={{ color: 'black' }}>
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

                {formErrors.image && (
                  <Typography variant="body2" sx={{ mt: 1, color: 'red' }}>
                    {formErrors.image}
                  </Typography>
                )}
              </Box>
            </Grid>
            {adminId && <Grid size={{ xs: 12, md: 6, sm: 6 }}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.isBlocked}
                    onChange={handleToggleBlocked}
                    color="primary"
                  />
                }
                label="Hide syllabus if not subscribed"
              />
            </Grid>}

            <Grid size={{ xs: 12, md: 6, sm: 6 }}>
              <CustomTextField
                label="Syllabus Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Syllabus Title"
                error={!!formErrors.title}
                helperText={formErrors.title}
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6, sm: 6 }}>
              <CustomTextField
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                placeholder="Category"
              />
            </Grid>
          </Grid>

          <Grid sx={{ display: 'flex', justifyContent: 'center' }}>
            <CustomButton
              children={isEditing ? 'Update' : 'Add'}
              onClick={handleAddSyllabus}
              loading={loading}
              bgColor='#EAB308'
              sx={{ width: '20%' }}
            />
          </Grid>
        </DialogContent>
      </Dialog>






      <Dialog open={openDeleteModal} onClose={handleDeleteModalClose} maxWidth="md">
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <CustomTypography text="Confirm deletion" fontSize={{ xs: '16px', sm: '18px', md: '18px' }} mb={0} fontWeight={600} />
          <IconButton onClick={handleDeleteModalClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>

          <Grid container sx={{ display: 'flex', alignItems: 'center', gap: 3 }} >
            <Grid item>
              <CustomTypography text="Do you want to delete this syllabus?" fontSize={{ xs: '14px', sm: '16px', md: '16px' }} mb={0} fontWeight={400} />
            </Grid>
            <Grid item>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>

                  <CustomButton children='Yes' onClick={handleDeleteSyllabus} loading={loading} bgColor='#EAB308' sx={{ width: '20%' }} />
                </Grid>
                <Grid item>
                  <CustomButton children='No' onClick={handleDeleteModalClose} bgColor='#BF0000' sx={{ width: '20%', }} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>

    </Navbar>
  );
}

export default TrainingSyllabus;
