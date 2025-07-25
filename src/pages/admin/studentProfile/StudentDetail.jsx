import Navbar from "../../../components/admin/Navbar";
import CustomTypography from "../../../components/admin/CustomTypography";
import ArrowCircleLeftRoundedIcon from "@mui/icons-material/ArrowCircleLeftRounded";

function StudentDetail() {
  return (
    <Navbar title="Student Profile">
      <Box sx={{ display: "flex", space:2}}>
        <IconButton
          onClick={() => window.history.back()}
          sx={{
            color: "#515151",
            position: "absolute",
            top: "20px",
            left: "20px",
          }}
        >
          
        </IconButton>
        <CustomTypography
          text={"Student Profile"}
          sx={{ fontWeight: "bold", color: "#515151", marginLeft: 2 }}
        />
      </Box>

      <Grid container>
        <Grid size={{ xs: 10, md: 3, sm: 6 }}></Grid>

        {/* Right Section */}
        <Grid item size={{ xs: 10, md: 8, sm: 8 }}></Grid>
      </Grid>
      {/* </Box> */}
    </Navbar>
  );
}
export default StudentDetail;
