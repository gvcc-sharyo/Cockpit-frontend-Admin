import { apiPost } from '../../../api/axios';
import CustomTextField from '../../../components/admin/CustomTextField';
import CustomButton from '../../../components/admin/CustomButton';
import { snackbarEmitter } from '../../../components/admin/CustomSnackbar';
import CustomTypography from '../../../components/admin/CustomTypography';

const styles = {
    containerBox: {
        minHeight: '100vh',
        backgroundImage: 'url(/public/images/signin.svg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'flex-end',
    },
    gridBox: {
        display: 'flex',
        alignItems: 'center',
    },
    cardPaper: {
        padding: '2rem',
        borderRadius: '1rem',
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        backdropFilter: 'blur(10px)',
        color: '#fff',
        width: '100%',
        maxWidth: '500px',
        marginTop: { xs: '10px', md: 0 },
    },
    heading: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: { xs: '20px', md: '24px' },
        marginBottom: '0.5rem',
    },
    secondaryText: {
        color: 'white',
        fontSize: { xs: '12px', md: '13px' },
        textAlign: 'center',
        marginBottom: '1.5rem',
    },
    submitButton: {
        backgroundColor: '#f0ad4e',
        color: '#fff',
        borderRadius: '50px',
        textTransform: 'none',
        padding: '8px',
        '&:hover': { backgroundColor: '#ec9f3e' },
    },
};

function ResetPassword() {
    const [form, setForm] = useState({ password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

     const { token } = useParams();
     console.log('reset token', token);
     
    const cleanedToken = token.startsWith(':') ? token.substring(1) : token;

    console.log('cleaned token', cleanedToken);
    console.log('cleaned token type', typeof cleanedToken);

    const validate = () => {
        const errs = {};
        if (!form.password) errs.password = 'Password is required';
        if (!form.confirmPassword) errs.confirmPassword = 'Confirm password is required';

        if (form.password && form.confirmPassword) {
            if (form.password !== form.confirmPassword) {
                errs.confirmPassword = 'Passwords do not match';
            }
        }
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleUpdatePassword = async () => {

        if (!validate()) return;

        if (!token) {
            snackbarEmitter('Server error', 'error');
            return;
        }

        setLoading(true);

        try {
            const response = await apiPost('/admin/reset-password', {
                token: cleanedToken,
                newPassword: form.password,
            });
            
            setTimeout(() => {
                setLoading(false);

                if (response.data.status === 200) {
                    snackbarEmitter(response.data.message, 'success');
                    navigate('/adminlogin'); // Redirect after success
                } else {
                    snackbarEmitter(response.data.message, 'error');
                }
            }, 500)

        } catch (error) {
            setTimeout(() => {
                setLoading(false);
                snackbarEmitter('Something went wrong', 'error');
            }, 500)

        }
    };

    return (
        <Box sx={styles.containerBox}>
            <Grid container sx={{display: 'flex', justifyContent: 'center', }}>
                <Box
                          sx={{
                            position: 'absolute',
                            top: { xs: 10, md: 15 },
                            left: { xs: 10, md: 45 },
                          }}
                        >
                          <Box
                            component="img"
                            src="/public/images/full logo.svg"
                            alt="logo"
                            sx={{
                              height: { xs: 40, sm: 60, md: 90 }, // Responsive height
                              width: 'auto',
                            }}
                          />
                        </Box>
                <Grid item size={{ xs: 11, sm: 10, md: 10 }} sx={styles.gridBox}>
                    <Paper elevation={10} sx={styles.cardPaper}>
                        {/* <Typography sx={styles.heading}>Reset Password</Typography> */}
                         <CustomTypography text="Reset Password" fontSize={{ xs: '20px', sm: '22px', md: '22px' }} sx={{ mb: 2, textAlign: 'center' }} fontWeight={600} />

                         <CustomTypography text="Create a new password. Ensure it differs from previous ones for security" fontSize={{ xs: '12px', sm: '14px', md: '14px' }} sx={{ mb: 2}} fontWeight={600} />

                        <CustomTextField
                            label="New Password"
                            type={showPassword1 ? 'text' : 'password'}
                            value={form.password}
                            error={!!errors.password}
                            helperText={errors.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            placeholder="Enter new password"
                            borderRadius="50px"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword1(!showPassword1)}
                                            edge="end"
                                            sx={{ color: 'grey' }}
                                        >
                                            {showPassword1 ? <Visibility /> :<VisibilityOff /> }
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Box mt={2}>
                            <CustomTextField
                                label="Confirm Password"
                                type={showPassword2 ? 'text' : 'password'}
                                value={form.confirmPassword}
                                error={!!errors.confirmPassword}
                                helperText={errors.confirmPassword}
                                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                placeholder="Confirm new password"
                                borderRadius="50px"
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                onClick={() => setShowPassword2(!showPassword2)}
                                                edge="end"
                                                sx={{ color: 'grey' }}
                                            >
                                                {showPassword2 ? <Visibility /> : <VisibilityOff /> }
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            />
                        </Box>

                        <Box mt={4} sx={{ textAlign: 'center' }}>
                            <CustomButton
                                children="Update Password"
                                onClick={handleUpdatePassword}
                                loading={loading}
                                bgColor="#EAB308"
                                borderRadius="50px"
                                sx={{ width: { xs: '90%', md: '50%', sm: '60%' }, fontSize: { xs: '12px', md: '14px', sm: '14px' } }}
                            />
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default ResetPassword;
