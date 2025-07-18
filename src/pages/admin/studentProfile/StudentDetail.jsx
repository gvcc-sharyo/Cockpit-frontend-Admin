import Navbar from "../../../components/admin/Navbar";
import CustomTypography from "../../../components/admin/CustomTypography";

function StudentDetail() {

  const styles = {
  mainContainer: {
    display: "flex",
    gap: 8,
    // p: 2,
  },
  whiteBox: {
    backgroundColor: "#fff",
    padding: 2,
    borderRadius: 2,
    // boxShadow: 1,
    minHeight: "60vh",
  },
  avatarBox: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    mb: 2,
  },
  infoLine: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    mb: 1,
  },
  rightImageBox: {
    display: "flex",
    alignItems: "center",
    gap: 2,
    backgroundColor: "#fff",
    padding: 2,
    borderRadius: 2,
    boxShadow: 1,
    mb: 2,
  },
  halfBox: {
    backgroundColor: "#fff",
    padding: 2,
    borderRadius: 2,
    boxShadow: 1,
    mb: 2,
    height: 100,
  },
  scrollContainer: {
    display: "flex",
    overflowX: "auto",
    gap: 2,
    pb: 2,
  },
  card: {
    minWidth: 250,
    flexShrink: 0,
    backgroundColor: "#fff",
    boxShadow: 1,
  },
};

    return (
      <Navbar title="Student Profile">
      {/* <Box sx={{ p: 2 }}> */}
        <Grid container sx={styles.mainContainer}>
          {/* Left Section */}
          <Grid size={{ xs: 10, md: 3,sm: 6}}>
            <Box sx={styles.whiteBox}>
              <Box sx={styles.avatarBox}>
                <Avatar alt="Student" src="/avatar.jpg" />
                <CustomTypography
                  text="Student name"
                  fontSize={{ xs: "10px", sm: "12px", md: "12px" }}
                  fontWeight={600}
                  sx={{mt:1}}
                />
              </Box>

              <CustomTypography
                text="Info"
                fontSize={{ xs: "10px", sm: "14px", md: "14px" }}
                mb={1}
                fontWeight={600}
              />

              <Box sx={styles.infoLine}>
                {/* <img src="/images/student.svg" alt="Location" style={{ width: "20px" }} /> */}
                <CalendarTodayIcon fontSize="small" />
                <CustomTypography
                  text="Enrolled: Aug 24, 2022"
                  fontSize={{ xs: "10px", sm: "12px", md: "12px" }}
                //   fontWeight={600}
                />
              </Box>

              <CustomTypography
                text="Contact Information"
                fontSize={{ xs: "10px", sm: "12px", md: "12px" }}
                mb={1}
                fontWeight={600}
              />

              <Box sx={styles.infoLine}>
                <EmailOutlinedIcon fontSize="small" />
                <CustomTypography
                  text="john.doe@example.com"
                  fontSize={{ xs: "10px", sm: "12px", md: "12px" }}
                />
              </Box>

              <Box sx={styles.infoLine}>
                <SmartphoneIcon fontSize="small" />
                <CustomTypography
                  text="+1 234 567 8901"
                  fontSize={{ xs: "10px", sm: "12px", md: "12px" }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Right Section */}
          <Grid item size={{ xs: 10, md: 8 ,sm: 8}}>
          
          </Grid>
        </Grid>
      {/* </Box> */}
    </Navbar>

    );
}
export default StudentDetail;
