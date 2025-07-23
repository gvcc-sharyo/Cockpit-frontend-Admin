import { apiPost } from "../../../api/axios";

const styles = {
  container: {
    borderRadius: "16px",
    p: 3,
    backgroundColor: "#fff",
    width:"auto",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
    height: "auto",
    maxHeight: "600px", 
    overflow: "auto",

   
    "&::-webkit-scrollbar": {
      width: "4px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "#f1f1f1",
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#EAB308", 
      borderRadius: "10px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      backgroundColor: "#EAB308",
    },
  },

  heading: {
    fontFamily: "Jost",
    fontWeight: 600,
    fontSize: "20px",
    color: "#404040",
    mb: 2,
    lineHeight: "100%",
  },
  tableHeadCell: {
    fontFamily: "Jost",
    fontWeight: 600,
    fontSize: "14px",
    color: "#515151",
    lineHeight: "100%",
    border: "none",
  },

  tableCell: {
    fontFamily: "Jost",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "24px",
    letterSpacing: "0%",
    color: "#515151",
  },

  paginationBox: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    mb: 2,
  },
  paginationLabel: {
    fontFamily: "Jost",
    fontWeight: 400,
    fontSize: "14px",
    lineHeight: "24px",
    color: "#000",
    mr: 1,
  },

 
};



function StudentsTable({ instituteId }) {

   const [students, setStudents] = useState([]);






  const getInstituteDetails = async () => {
    try {
      const response = await apiPost("/admin/instituteStudents", { instituteId: instituteId });
      setStudents(response.data.data);
        
      console.log("Fetched institute details:", students);
    } catch (error) {
      console.error("Failed to fetch institute details:", error);
    }
  };


  useEffect(() => {
    if (instituteId) {
      getInstituteDetails();
    }
  }, [instituteId]);


  return (
    <Paper elevation={3} sx={styles.container}>
      {/* Top Row */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography sx={styles.heading}>Students</Typography>

        
      </Box>

      {/* Table */}
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>{["S/N","First Name","Last Name","Gender", "Phone Number", ].map((head, idx) => (
                <TableCell key={idx} sx={styles.tableHeadCell}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {students.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell sx={styles.tableCell}>{idx+1}</TableCell>
                <TableCell sx={styles.tableCell}>{row.firstName}</TableCell>
                <TableCell sx={styles.tableCell}>{row.lastName}</TableCell>
                <TableCell sx={styles.tableCell}>{row.gender}</TableCell>
                <TableCell sx={styles.tableCell}>{row.phone}</TableCell>
                {/* <TableCell sx={styles.tableCell}><IconButton><img src="/images/edit.svg" alt="Edit" style={{ width: '20px', height: '20px' }} /></IconButton></TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default StudentsTable;
