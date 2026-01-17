import { apiGet, apiPostUpload, apiDelete } from "../../../api/axios";
import CustomTable from "../../../components/admin/CustomTable";
import CustomButton from "../../../components/admin/CustomButton";
import CustomTextField from "../../../components/admin/CustomTextField";
import CustomTypography from "../../../components/admin/CustomTypography";
import { snackbarEmitter } from "../../../components/admin/CustomSnackbar";
import Navbar from "../../../components/admin/Navbar";
import { getAdminRoutePrefix } from "../../../utils/RoutePrefix";


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
    fontWeight: "300",
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
  generateButton: {
    position: "absolute",
    right: 0,
    top: "15%",
    transform: "translateY(-50%)",
    color: "#109CF1",
    textTransform: "none",
    textDecoration: "underline",
    minWidth: "auto",
    padding: 0,
    fontFamily: "Jost",
    fontWeight: 400,
    fontStyle: "normal",
    fontSize: "14px",
  },
};

function Advertise() {
  const [openModal, setOpenModal] = useState(false);
  const [ads, setAds] = useState([]);
  const [id, setId] = useState();
  const [formData, setFormData] = useState({});
  const [formErrs, setFormErrs] = useState({});
  const routePrefix = getAdminRoutePrefix();
  const fileInputRef = useRef();

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const handleDeleteOpen = (adId) => {
    setDeleteId(adId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
    setDeleteId(null);
  };

  const handleDelete = async () => {
    try {
      const response = await apiGet(`/admin/deleteAdvertisement/${deleteId}`);
      snackbarEmitter("Advertisement deleted", "success");
      handleDeleteClose();
      fetchAds();
    } catch (error) {
      snackbarEmitter("Delete failed", "error");
    }
  };



  const handleModalOpen = (ad = null) => {
    if (ad) {
      setFormData({
        link: ad.link,
        timeLimit: ad.timeLimit,
        image: ad.image, // You can also preview image here if needed
      });
      setId(ad._id);
    }
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
    setFormData({});
    setFormErrs({});
    setId(undefined);
  };

  const tableHeaders = [
    "Sr no",
    "Created Date",
    "Link",
    "Time Limit",
    // "Status",
    "Action",
  ];

  const fetchAds = async () => {
    try {
      const response = await apiGet("/admin/getAllAdvertisement");
      setAds(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const table = ads.map((ad, index) => ({
    row: [
      new Date(ad.createdAt).toLocaleDateString(),
      <Box sx={{ textAlign: "left", paddingLeft: "120px" }}>{ad.link}</Box>,
      ad.timeLimit,
      // <CustomButton
      //   children={ad.isactive ? "Active" : "Inactive"}
      //   loading={false}
      //   bgColor={ad.isactive ? "#109CF1" : "#F44336"}
      //   sx={{
      //     width: { xs: "50px", sm: "60px", md: "70px" },
      //     fontSize: { xs: "10px", sm: "11px", md: "12px" },
      //   }}
      // />,
      <Box>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleModalOpen(ad);
          }}
        >
          <img
            src="/images/edit.svg"
            alt="Edit"
            style={{ width: 20, height: 20 }}
          />
        </IconButton>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            handleDeleteOpen(ad._id);
          }}
        >
          <DeleteIcon sx={{ color: "#C21802" }} />
        </IconButton>
      </Box>
    ],
  }));

  const handleFileClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validate = () => {
    let errs = {};
    if (!formData.link) errs.link = "Link is required";
    if (!formData.timeLimit) errs.timeLimit = "Time Limit is required";
    if (!formData.image) errs.image = "Image is required";
    setFormErrs(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const payload = new FormData();
    payload.append("link", formData.link);
    payload.append("timeLimit", formData.timeLimit);
    payload.append("image", formData.image);

    try {
      const response = await apiPostUpload(
        "/admin/createAdvertisement",
        payload
      );
      snackbarEmitter(response.data.message, "success");
      handleModalClose();
      fetchAds();
    } catch (err) {
      console.error(err);
    }
  };

  const updateAds = async () => {
    if (!validate()) return;

    const payload = new FormData();
    payload.append("advertisementId", id);
    payload.append("link", formData.link);
    payload.append("timeLimit", formData.timeLimit);
    if (formData.image instanceof File) {
      payload.append("image", formData.image);
    }

    try {
      const response = await apiPostUpload(
        `/admin/updateAdvertisement`,
        payload
      );
      console.log(response);
      snackbarEmitter("Advertisement updated", "success");
      handleModalClose();
      fetchAds();
    } catch (err) {
      console.error(err);
      snackbarEmitter("Update failed", "error");
    }
  };

  return (
    <>
      <Navbar title="Advertisement">
        <Grid container sx={styles.container}>
          <Grid size={{ xs: 6, sm: 6, md: 6 }}>
            <CustomTypography
              text="List of Advertisement"
              fontWeight={500}
              fontSize={{ xs: "18px", md: "22px", sm: "20px" }}
            />
          </Grid>
          <Grid>
            <CustomButton
              children="Add Advertisement"
              onClick={() => handleModalOpen()}
              bgColor="#EAB308"
              sx={{
                width: { xs: "100%", md: "100%", sm: "100%" },
                fontSize: { xs: "12px", md: "14px", sm: "14px" },
              }}
            />
          </Grid>
        </Grid>

        <Grid size={{ xs: 12 }} mt={2}>
          <CustomTable
            maxWidth={"100%"}
            tableData={table}
            tableHeaders={tableHeaders}
          />
        </Grid>

        <Dialog open={openModal} onClose={handleModalClose} fullWidth>
          <DialogTitle sx={styles.dialogTitle}>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>
              {id ? "Edit" : "Add"} Advertisement
            </Typography>
            <IconButton onClick={handleModalClose}>
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <CustomTextField
                  label="Link*"
                  name="link"
                  value={formData.link || ""}
                  onChange={handleChange}
                  placeholder="Enter"
                  error={!!formErrs.link}
                  helperText={formErrs.link}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <CustomTextField
                  label="Time Limit (Hours)*"
                  name="timeLimit"
                  type="number"
                  value={formData.timeLimit || ""}
                  onChange={handleChange}
                  placeholder="Enter"
                  error={!!formErrs.timeLimit}
                  helperText={formErrs.timeLimit}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 12 }}>
                <CustomTextField
                  label="Image*"
                  name="image"
                  value={
                    formData.image instanceof File
                      ? formData.image.name
                      : formData.image || ""
                  }
                  placeholder="Click to upload image"
                  readOnly
                  error={!!formErrs.image}
                  helperText={formErrs.image}
                  onClick={handleFileClick}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <CustomButton
                          children="Choose File"
                          bgColor="#EAB308"
                          onClick={(e) => {
                            e.stopPropagation(); // prevent triggering textfield click
                            handleFileClick();
                          }}
                          sx={{
                            // height: "40px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            // borderRadius: "8px",
                            // padding: "6px",
                          }}
                        />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              {/* <Grid size={{ xs: 12, md: 7 }}>
                <CustomTextField
                  label="Image*"
                  name="image"
                  value={
                    formData.image instanceof File
                      ? formData.image.name
                      : formData.image || ""
                  }
                  placeholder="Click to upload image"
                  readOnly
                  error={!!formErrs.image}
                  helperText={formErrs.image}
                  sx={{ cursor: "pointer", borderRadius: "10px" }}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <CustomButton
                  children="Upload"
                  bgColor="#EAB308"
                  onClick={handleFileClick}
                  sx={{
                    width: "100%",
                    height: "56px",
                    fontWeight: "bold",
                    fontSize: "14px",
                    borderRadius: "10px",
                    mt: 3,
                  }}
                />
              </Grid> */}

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
            </Grid>

            <Grid
              item
              sx={{ display: "flex", justifyContent: "center", mt: 2 }}
              size={{ xs: 12, md: 6 }}
            >
              <CustomButton
                children={id ? "Update" : "Add"}
                bgColor="#EAB308"
                sx={{ width: "20%" }}
                onClick={id ? updateAds : handleSubmit}
              />
            </Grid>
          </DialogContent>
        </Dialog>


        {/* Delete option */}
        <Dialog open={deleteDialogOpen} onClose={handleDeleteClose}>
          <DialogTitle sx={{ fontWeight: "bold" }}>
            Confirm Delete
          </DialogTitle>

          <DialogContent dividers>
            <Typography>Are you sure you want to delete this advertisement?</Typography>
          </DialogContent>

          <DialogActions>
            <CustomButton
              children="No"
              bgColor="#9CA3AF"
              onClick={handleDeleteClose}
              sx={{ width: "80px" }}
            />

            <CustomButton
              children="Yes"
              bgColor="#EF4444"
              onClick={handleDelete}
              sx={{ width: "80px" }}
            />
          </DialogActions>
        </Dialog>


      </Navbar>
    </>
  );
}

export default Advertise;
