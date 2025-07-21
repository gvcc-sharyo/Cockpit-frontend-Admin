import { apiGet, apiPost } from "../../../api/axios";
import Navbar from "../../../components/admin/Navbar";
import CustomTextField from "../../../components/admin/CustomTextField";
import { snackbarEmitter } from "../../../components/admin/CustomSnackbar";
import CustomButton from "../../../components/admin/CustomButton";
import styles from "./profilestyles.js";



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
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      try {
        const {
          data: { data },
        } = await apiGet(`/admin/getAdmin?adminId=${adminId}`);
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
        snackbarEmitter("Error fetching profile", "error");
      }
    };
    getProfile();
  }, [adminId]);

  const validate = () => {
    const errs = {};
    if (!formData.firstname.trim()) errs.firstname = "First name is required";
    if (!formData.lastname.trim()) errs.lastname = "Last name is required";
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errs.phone = "Enter Valid Phone Number";
    }
    if (!email.trim()) errs.email = "Email is required";
    if (!formData.dob) errs.dob = "Date of birth is required";
    if (!formData.gender) errs.gender = "Gender is required";
    if (!formData.address.trim()) errs.address = "Address is required";
    if (!formData.city.trim()) errs.city = "City is required";
    if (!formData.state.trim()) errs.state = "State is required";
    if (!formData.zipcode.trim()) errs.zipcode = "Zip code is required";
    return errs;
  };
  

  const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();
  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    snackbarEmitter("Please fill all required fields", "warning");
    return;
  }
  setErrors({});
  setLoading(true);
  try {
    let uploadedImageUrl = profileImage;

    if (profileImage instanceof File) {
      const formDataImage = new FormData();
      formDataImage.append("image", profileImage);
      const { data } = await apiPost(`/admin/uploadAdminImage?adminId=${adminId}`, formDataImage);
      uploadedImageUrl = data.data.profileimage;
    }

    const payload = { adminId, ...formData, profileimage: uploadedImageUrl };
    const { data } = await apiPost("/admin/updateAdmin", payload);

    if (data.status === 200) {
      setTimeout(() => {
        snackbarEmitter(data.message, "success");
        setLoading(false);
         navigate(0)
      }, 500);
    } else {
      setTimeout(() => {
        snackbarEmitter(data.message, "warning");
        setLoading(false);
      }, 500);
    }
  } catch (error) {
    setLoading(false);
    snackbarEmitter("Unexpected Error", "error");
  }
};


  const handleChange = ({ target: { name, value } }) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = ({ target: { files } }) => {
    const file = files[0];
    if (file) setProfileImage(file);
  };

  const handleCancel = () => setFormData(initialFormData);

  const inputFields = [
    { name: "firstname", placeholder: "First Name", value: formData.firstname },
    { name: "lastname", placeholder: "Last Name", value: formData.lastname },
    { name: "phone", placeholder: "Mobile Number", value: formData.phone },
    { name: "email", placeholder: "Email Address", value: email },
  ];

  const addressFields = [
  { name: "address", placeholder: "Address", value: formData.address, size: { xs: 12 } },
  { name: "city", placeholder: "City", value: formData.city, size: { xs: 12, md: 4 } },
  { name: "state", placeholder: "State", value: formData.state, size: { xs: 12, md: 4 } },
  { name: "zipcode", placeholder: "ZipCode", value: formData.zipcode, size: { xs: 12, md: 4 } }
];

 
  return (
    <Navbar title="Profile">
      <Box>
        <Card elevation={3} sx={styles.card}>
          <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
            <Grid size={{ xs: 12 }} sx={styles.profileImageContainer}>
              <Box sx={styles.profileImageBox}>
                <label htmlFor="profile-upload" style={styles.profileImageLabel}>
                  {profileImage ? (
                    <img src={profileImage instanceof File ? URL.createObjectURL(profileImage) : profileImage} alt="Profile" style={styles.profileImage} />
                  ) : (
                    <CameraAltIcon fontSize="large" />
                  )}
                </label>
                <input type="file" id="profile-upload" accept="image/*" style={{ display: "none" }} onChange={handleImageChange} />

              </Box>
            </Grid>
            {inputFields.map((field) => (
              <Grid key={field.name} size={{ xs: 12, md: 6 }}>
               <CustomTextField name={field.name} placeholder={field.placeholder} value={field.value} onChange={handleChange} required error={!!errors[field.name]} helperText={errors[field.name]} />
              </Grid>
            ))}
            <Grid size={{ xs: 12, md: 6 }}>
             <TextField fullWidth placeholder="Date of Birth" type="date" name="dob" required value={formData.dob} onChange={handleChange} InputLabelProps={{ shrink: true }} variant="outlined" sx={styles.dobTextField} error={!!errors.dob} helperText={errors.dob} />
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <CustomTextField select required placeholder="Gender" name="gender" value={formData.gender} onChange={handleChange} SelectProps={{ native: false }} error={!!errors.gender} helperText={errors.gender}>  
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </CustomTextField>
            </Grid>
            {addressFields.map((field) => (
              <Grid key={field.name} size={field.size}>
                <CustomTextField required name={field.name} placeholder={field.placeholder} value={field.value} onChange={handleChange} error={!!errors[field.name]} helperText={errors[field.name]} />
              </Grid>
            ))}
            <Grid size={{ xs: 12 }} sx={styles.buttonsContainer}>
              <Button variant="contained" onClick={handleCancel} sx={styles.cancelButton} >Cancel </Button>
              <CustomButton type="submit" loading={loading} bgColor="#EAB308" borderRadius="10px" sx={styles.saveButton} >  Save </CustomButton>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Navbar>
  );
};

export default Profile;