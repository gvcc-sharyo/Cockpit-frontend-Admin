import Navbar from "../../../components/admin/Navbar";
import CustomTable from "../../../components/admin/CustomTable";
import { apiGet } from "../../../api/axios";
import { snackbarEmitter } from "../../../components/admin/CustomSnackbar";
import Graph from "./graph";
import CustomTypography from "../../../components/admin/CustomTypography";
import classes from "./dashboardtemp.js";
import StudentsTable from "../institute/StudentTable.jsx";
import { getAdminRoutePrefix } from "../../../utils/RoutePrefix.jsx";



function Dashboard() {
  const adminId = localStorage.getItem("adminId");
  const instituteId = localStorage.getItem("instituteId");
  const routePrefix = getAdminRoutePrefix();

  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const response = await apiGet("/reports");

      if (response.data.status === 200 ) {
        const filteredReports = response.data.data.filter((report) => report.status === 'pending');
        console.log("filteredReports", filteredReports);
        
        setReports(filteredReports);
      } 
       else {
        snackbarEmitter(response.data.message, "error");
      }
    } catch (error) {
      snackbarEmitter("Something went wrong", "error");
    }
  };



  const [totals, setTotals] = useState([]);
  const getTotals = async () => {
    try {
      const response = await apiGet(`/subscription/getTotalRevenue?adminId=${adminId}`);
      console.log("response", response);

      if (response.data.status === 200) {
        setTotals(response.data.data);  
      } else {
        snackbarEmitter(response.data.message, "error");
      }
    } catch (error) {
      snackbarEmitter("Error fetching profile", "error");
    }
  };


  useEffect(() => {
    fetchReports();
    getTotals();
  }, []);


  const navigate = useNavigate();

  const handleNavigate = (route, reportID) => {
    navigate( `${routePrefix}${route}`, { state: {reportID} });
  };



  return (
    <>
      <Navbar title={"Dashboard"}>
        <Box sx={{ backgroundColor: "#f8f9fa", p: 2 }}>
          <Grid container spacing={2}>
              <Grid size={{ xs: 6, md:6,sm:6 }} >
                <Box sx={classes.statsBox}>
                  <Box>
 
                    <CustomTypography text={"Total users"} fontSize={{ xs: '10px', sm: '12px', md: '12px' }} mb={0} fontWeight={600} />
                   
                    <CustomTypography text={totals.totalUsers} fontSize={{ xs: '12px', sm: '14px', md: '14x' }}  mb={0} fontWeight={600} />
                  </Box>
                  <Box sx={classes.iconBox} component='img' src='/images/users.svg'></Box>
                </Box>

              </Grid>
              {
                adminId &&
                 <Grid size={{ xs: 6, md:6,sm:6 }} >

                <Box sx={classes.statsBox}>
                  <Box>
 
                    <CustomTypography text={"Total Revenue"} fontSize={{ xs: '10px', sm: '12px', md: '12px' }} mb={0} fontWeight={600} />
                   
                    <CustomTypography text={totals.totalRevenue} fontSize={{ xs: '12px', sm: '14px', md: '14x' }}  mb={0} fontWeight={600} />
                  </Box>
                  <Box sx={classes.iconBox} component='img' src='/images/revenue.svg'></Box>
                </Box>
              </Grid>

              }
             
          
          </Grid>

          {/* New Report Box */}
          <Grid container spacing={1} sx={{ mt: 4 }}>


            <Grid size={{ xs: 10, md: 12,lg:6.5  }}>
              {instituteId ? <StudentsTable /> : <Graph />}
            </Grid>



            <Grid size={{ xs: 10, md: 12,lg:5 }}>
              <Box sx={classes.reportBox}>
                <CustomTypography text='Report' fontSize={{ xs: '14px', sm: '16px', md: '16px' }} mb={0} fontWeight={600} />
                { reports.length === 0 ?
                 <CustomTypography text='No pending reports' fontSize={{ xs: '12px', sm: '14px', md: '14px' }} mb={0} fontWeight={600} /> 
                 :
                reports.map((report, index) => (
                  <Box mt={2}>
                    <CustomTypography text={report?.userId?.username} fontSize={{ xs: '12px', sm: '14px', md: '14px' }} mb={0} fontWeight={600} />
                    <Box sx={classes.reportLine}>
                       <CustomTypography text={` Has reported a question on ${report?.questionId?.syllabus}`} color='#718096' fontSize={{ xs: '10px', sm: '12px', md: '12px' }} mb={0} fontWeight={400} />
     
                      <CustomTypography text='Reply' onClick={() => handleNavigate(`/feedback`, report?._id)} color='#EAB308' fontSize={{ xs: '10px', sm: '12px', md: '12px' }} mb={0} fontWeight={600} sx={{ cursor: 'pointer' }} />
                    </Box>
                  </Box>
                ))}
              </Box>
            </Grid>
          </Grid>

        
        </Box>
      </Navbar>
    </>
  );
}

export default Dashboard;