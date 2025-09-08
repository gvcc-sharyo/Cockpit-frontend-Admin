import Navbar from "../../../components/admin/Navbar";
import CustomTable from "../../../components/admin/CustomTable";
import "./dashboard.css";
import { apiGet } from "../../../api/axios";
import { snackbarEmitter } from "../../../components/admin/CustomSnackbar";
import Graph from "./graph";
import CustomTypography from "../../../components/admin/CustomTypography";

function Dashboard() {
  const adminId = localStorage.getItem("adminId");

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

 
  const stats = [
    {
      title: "Total Users",
      number: totals.totalUsers,
      icon: <img src="/images/users.svg" alt="Users" width={"130%"} />,
    },
    {
      title: "Total Revenue",
      number: totals.totalRevenue,
      icon: <img src="/images/revenue.svg" alt="Revenue" width={"130%"} />,
    },
  ];

  const navigate = useNavigate();

  const handleNavigate = (route, reportID) => {
    navigate(route, { state: {reportID} });
  };

  const classes = {
    statsBox: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      p: { xs: "5px", md: "5px" },
      borderRadius: 1,
      boxShadow: 1,
      bgcolor: "#fff",
      gap: { xs: 1.5, md: 1 },
      height: "100%",
    },
    statTitle: {
      fontSize: { xs: "0.7rem", md: "0.8rem" },
      color: "text.secondary",
      lineHeight: 1.2,
    },
    statNumber: {
      fontSize: { xs: "0.8rem", md: "1.1rem" },
      fontWeight: 600,
      lineHeight: 1,
    },
    iconBox: {
      width: { xs: 24, md: 32 },
      height: { xs: 24, md: 32 },
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    reportBox: {
      bgcolor: "#fff",
      borderRadius: 1,
      boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      p: 2,
      mt: 3,
      width: "100%",
      maxHeight: "50vh",
      overflowY: "auto",
    },
    reportTitle: {
      fontWeight: 600,
      fontSize: { xs: "1rem", md: "1.2rem" },
      mb: 1,
    },
    reportName: {
      fontWeight: "bold",
      fontSize: { xs: "0.9rem", md: "1rem" },
      // mb: 0.5,
    },
    reportLine: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
    reportedText: {
      color: "grey",
      fontSize: { xs: "0.7rem", md: "0.8rem" },
    },
    replyText: {
      color: "orange",
      fontSize: { xs: "0.7rem", md: "0.8rem" },
      fontWeight: 600,
      cursor: "pointer",
    },
  
  };

  return (
    <>
      <Navbar title={"Dashboard"}>
        <Box sx={{ backgroundColor: "#f8f9fa", p: 2 }}>
          <Grid container spacing={2}>
            {stats.map(({ title, number, icon }) => (
              <Grid size={{ xs: 6, md:6,sm:6 }} key={title}>
                <Box sx={classes.statsBox}>
                  <Box>
 
                    <CustomTypography text={title} fontSize={{ xs: '10px', sm: '12px', md: '12px' }} mb={0} fontWeight={600} />
                   
                    <CustomTypography text={number} fontSize={{ xs: '12px', sm: '14px', md: '14x' }}  mb={0} fontWeight={600} />
                  </Box>
                  <Box sx={classes.iconBox}>{icon}</Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* New Report Box */}
          <Grid container spacing={1} sx={{ mt: 4 }}>


            <Grid size={{ xs: 10, md: 12,lg:6.5  }}>
              <Graph />
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
                       <CustomTypography text={` Has reported a question on ${report?.questionsDetails[0]?.syllabusId?.title}`} color='#718096' fontSize={{ xs: '10px', sm: '12px', md: '12px' }} mb={0} fontWeight={400} />
     
                      <CustomTypography text='Reply' onClick={() => handleNavigate(`/admin/feedback`, report?._id)} color='#EAB308' fontSize={{ xs: '10px', sm: '12px', md: '12px' }} mb={0} fontWeight={600} sx={{ cursor: 'pointer' }} />
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