import { apiGet, apiPost } from "../../../api/axios";
import Navbar from "../../../components/admin/Navbar";
import CustomTextField from "../../../components/admin/CustomTextField";
import { snackbarEmitter } from "../../../components/admin/CustomSnackbar";
import CustomButton from "../../../components/admin/CustomButton";
import styles from "./profilestyles.js";
import CustomTypography from "../../../components/admin/CustomTypography.jsx";

const InstituteProfile = () => {
  const instituteId = localStorage.getItem("instituteId");

  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    instituteName: "",
    department: "",
    phone: "",
    address: "",
    subsrciptionAmt: "",
    subscriptionPeriod: "",
  });
  const [loading, setLoading] = useState(false);
  const [initialFormData, setInitialFormData] = useState(formData);
  const [profileImage, setProfileImage] = useState(null);
  const [logoImage, setLogoImage] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      try {
        const {
          data: { data },
        } = await apiGet('/getInstitute')
        const newFormData = {
          instituteName: data.instituteName || "",
          phone: data.phone || "",
          department: data.department || "",
          address: data.currentAddress || "",
          subsrciptionAmt: data.subsrciptionAmt || "",
          subscriptionPeriod: data.subscriptionPeriod || "",
        };
        setFormData(newFormData);
        setInitialFormData(newFormData);
        setProfileImage(data.profileimage || "");
        setEmail(data.email);
      } catch (error) {
        snackbarEmitter("Error fetching profile", "error");
      }
    };
    getProfile();
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.instituteName.trim()) errs.firstname = "Institute name is required";
    if (!formData.phone.trim()) {
      errs.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      errs.phone = "Enter Valid Phone Number";
    }
    if (!email.trim()) errs.email = "Email is required";
    if (!formData.address.trim()) errs.address = "Address is required";
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
      const payload1 = { ...formData, profileimage: uploadedImageUrl };

      const { data } = instituteId ? await apiPost("/institute/updateInstitute", payload1) : await apiPost("/admin/updateAdmin", payload);

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
  const handleLogoChange = ({ target: { files } }) => {
    const file = files[0];
    if (file) setLogoImage(file);
  };

  const handleCancel = () => setFormData(initialFormData);

  const inputFields = [
    { name: "institutename", placeholder: "First Name", value: formData.instituteName },
    { name: "phone", placeholder: "Mobile Number", value: formData.phone },
    { name: "email", placeholder: "Email Address", value: email, disabled: true },
    { name: "address", placeholder: "Address", value: formData.address },
    { name: "subsrciptionAmt", placeholder: "Subscription Amount", value: formData.subsrciptionAmt, disabled: true },
    { name: "subscriptionPeriod", placeholder: "Subscription Period", value: formData.subscriptionPeriod, disabled: true },
  ];


  return (
    <Box>
      <Card elevation={3} sx={styles.card}>
        <Grid container spacing={2} component="form" onSubmit={handleSubmit}>
          <Grid size={{ xs: 12, md: 12, sm: 12 }} sx={styles.profileImageContainer}>
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
            <Box sx={styles.profileImageBox}>
              <label htmlFor="profile-upload" style={styles.profileImageLabel}>
                {logoImage ? (
                  <img src={logoImage instanceof File ? URL.createObjectURL(logoImage) : logoImage} alt="image" style={styles.profileImage} />
                ) : (
                  <>
                    {/* <img src='/images/logosample.png' alt="image" style={styles.profileImage} /> */}
                    <CustomTypography
                      text="Click here to upload logo"
                      fontSize={{ xs: '9px', sm: '10px', md: '11px' }}
                      fontWeight={500}
                      color="#666"
                    />
                  </>

                )}
              </label>
              <input type="file" id="profile-upload" accept="image/*" style={{ display: "none" }} onChange={handleLogoChange} />

            </Box>

          </Grid>
          {inputFields.map((field) => (
            <Grid key={field.name} size={{ xs: 12, md: 6 }}>
              <CustomTextField name={field.name} placeholder={field.placeholder} value={field.value} onChange={handleChange} required error={!!errors[field.name]} helperText={errors[field.name]}
                {...(field.disabled && { disabled: true })} />
            </Grid>
          ))}

          <Grid size={{ xs: 12 }} sx={styles.buttonsContainer}>
            <Button variant="contained" onClick={handleCancel} sx={styles.cancelButton} >Cancel </Button>
            <CustomButton type="submit" loading={loading} bgColor="#EAB308" borderRadius="10px" sx={styles.saveButton} >  Save </CustomButton>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default InstituteProfile;