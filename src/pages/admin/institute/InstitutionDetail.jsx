import Navbar from "../../../components/admin/Navbar";
import StudentsTable from "./StudentTable";
import Address from "./Address";
import SubscriptionPlan from "./SubscriptionPlan";
import { apiGet, apiPost } from "../../../api/axios";

function InstitutionDetail() {
  const [value, setValue] = React.useState(0);
  const location = useLocation();
  const instituteId = location.state?.instituteId;

  const [instituteid, setInstituteid] = useState(null);

  useEffect(() => {
    setInstituteid(instituteId);
  }, [instituteId]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  function TabPanel({ children, value, index }) {
    return value === index ? <Box sx={{ pt: 2 }}>{children}</Box> : null;
  }

  const styles = {
    card: {
      width: { xs: "auto", md: "auto", lg: "auto" },
      borderRadius: "8px",
      p: 3,
      fontFamily: "Jost",
    },
    avatarContainer: {
      display: "flex",
      alignItems: "center",
      mb: 3,
      gap: 2,
    },
    avatar: {
      width: 45,
      height: 45,
      mb: 1,
    },
    name: {
      fontFamily: "Jost",
      fontWeight: 700,
      fontSize: "16px",
      color: "#404040",
    },
    sectionHeading: {
      fontWeight: 500,
      color: "#0A0A0A",
      fontSize: "14px",
      mb: 1,
      fontFamily: "Jost",
    },
    iconBox: {
      bgcolor: "#f5f5f5",
      p: 1,
      borderRadius: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    iconBoxPlain: {
      p: 1,
      borderRadius: 2,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    infoPrimary: {
      fontFamily: "Jost",
      fontWeight: 500,
      fontSize: "14px",
    },
    infoSecondary: {
      fontFamily: "Jost",
      fontWeight: 400,
      fontSize: "12px",
    },
    contactLabel: {
      fontFamily: "Jost",
      fontWeight: 400,
      fontSize: "14px",
    },
    contactValue: {
      fontFamily: "Jost",
      fontWeight: 400,
      fontSize: "14px",
    },
    tabRoot: {
      fontFamily: "Jost",
      fontWeight: 400,
      fontSize: "16px",
      textTransform: "none",
      overflow: "auto",
      "&.Mui-selected": {
        color: "#EAB308",
      },
    },
  };

  const [instituteData, setInstituteData] = useState(null);

  const getInstituteDetails = async () => {
    console.log("Fetching institute details for ID:", instituteId);

    try {
      const response = await apiPost("/admin/getInstitute", {
        instituteId: instituteId,
      });
      setInstituteData(response.data?.data);

      console.log("Institute Details:", response);
    } catch (error) {
      console.error("Failed to fetch institute details:", error);
    }
  };

  useEffect(() => {
    getInstituteDetails();
  }, []);

  return (
    <>
      <Navbar title="Institution">
        <Grid container spacing={2}>
          <Grid
            size={{ xs: 12, md: 4, lg: 4, sm: 5 }}
            // sx={{ width: { xs: "100%", md: "auto", sm: "auto" } }}
          >
            <Paper elevation={3} sx={styles.card}>
              <Box sx={styles.avatarContainer}>
                <Avatar alt="Institute" src="" sx={styles.avatar} />
                <Typography sx={styles.name}>
                  {instituteData?.instituteName}
                </Typography>
              </Box>

              <Typography variant="subtitle2" sx={styles.sectionHeading}>
                Info
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <Box sx={styles.iconBox}>
                  <WorkOutlineIcon fontSize="small" color="action" />
                </Box>
                <Box>
                  <Typography sx={styles.infoPrimary}> {instituteData?.department}</Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={styles.infoSecondary}
                  >
                    Department
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center" mb={3}>
                <Box sx={styles.iconBox}>
                  <CalendarTodayIcon fontSize="small" color="action" />
                </Box>
                <Box>
                  <Typography sx={styles.infoPrimary}>
                    {new Date(instituteData?.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={styles.infoSecondary}
                  >
                    Joined date
                  </Typography>
                </Box>
              </Stack>

              <Typography variant="subtitle2" sx={styles.sectionHeading}>
                Contact
              </Typography>

              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <Box sx={styles.iconBoxPlain}>
                  <EmailOutlinedIcon fontSize="small" color="action" />
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={styles.contactLabel}
                  >
                    Email
                  </Typography>
                  <Typography variant="body1" sx={styles.contactValue}>
                    {instituteData?.email}
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={styles.iconBoxPlain}>
                  <SmartphoneIcon fontSize="small" color="action" />
                </Box>
                <Box>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={styles.contactLabel}
                  >
                    Phone
                  </Typography>
                  <Typography variant="body1" sx={styles.contactValue}>
                    {instituteData?.phone}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>

          <Grid size={{ xs: 12, md: 8, lg: 8, sm: 7 }}>
            <Box >
              <Tabs
                value={value}
                onChange={handleChange}
                TabIndicatorProps={{ style: { backgroundColor: "#EAB308" } }}
              >
                <Tab
                  label="Students"
                  sx={{
                    ...styles.tabRoot,
                    color: value === 0 ? "#EAB308" : "inherit",
                  }}
                />
                <Tab
                  label="Subscription Detail"
                  sx={{
                    ...styles.tabRoot,
                    color: value === 1 ? "#EAB308" : "inherit",
                  }}
                />
                {/* <Tab
                  label="Address"
                  sx={{
                    ...styles.tabRoot,
                    color: value === 2 ? "#EAB308" : "inherit",
                  }}
                /> */}
              </Tabs>

              {/* Tab Panels start here */}
              <TabPanel value={value} index={0}>
                <StudentsTable instituteId={instituteId} />
              </TabPanel>

              <TabPanel value={value} index={1}>
                <SubscriptionPlan instituteId={instituteId} />
              </TabPanel>

              {/* <TabPanel value={value} index={2}>
                <Address />
              </TabPanel> */}
            </Box>
          </Grid>
        </Grid>
      </Navbar>
    </>
  );
}

export default InstitutionDetail;
