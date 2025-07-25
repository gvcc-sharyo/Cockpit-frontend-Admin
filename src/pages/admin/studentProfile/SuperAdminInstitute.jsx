import Navbar from "../../../components/admin/Navbar";
import CustomButton from "../../../components/admin/CustomButton";
import CustomTypography from "../../../components/admin/CustomTypography";
import CustomTable from "../../../components/admin/CustomTable";
import CustomTextField from "../../../components/admin/CustomTextField";
import { apiGet, apiGetToken, apiPost } from "../../../api/axios";
import { snackbarEmitter } from "../../../components/admin/CustomSnackbar";

function SuperAdminStudentProfile() {
  const [openModal, setOpenModal] = useState(false);



 
  
  const [students, setStudents] = useState([]);

  const getStudents = async () => {
    try {
      const response = await apiGet("/admin/getAllStudents");
      console.log("Fetched students:", response.data.data);
      if (response.status === 200) {
        setStudents(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
      snackbarEmitter("Something went wrong", "error");
    }
  };

  useEffect(() => {
    getStudents();
  }, []);




  const tableHeaders = [
    "Sr No",
    " Name",
    
    "Status",
    "Subscription",
  ];

  const tableData = students.map((student) => ({
     row: [
      
       student.username,
       
       student.isActive ? "Active" : "Inactive",
       student.is_subscribed ? "Subscribed" : "Not Subscribed",
     ],
  }));

 

  

  const styles = {
    container: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
    },
 
  };

  return (
    <Grid container sx={styles.container} size={{ xs: 12, sm: 11, md: 11 }}>
        <Grid size={{ xs: 12, sm: 12, md: 12 }}>
          <CustomTypography
            text="Students"
            fontWeight={500}
            fontSize={{ xs: "18px", md: "22px", sm: "20px" }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 12, md: 12 }} mt={2}>
          <CustomTable
            maxWidth={"100%"}
            tableHeaders={tableHeaders}
            tableData={tableData}
            
          />
        </Grid>
      </Grid>
  );
}
export default SuperAdminStudentProfile;
