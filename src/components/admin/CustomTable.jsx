import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { apiGet } from "../../api/axios";
<<<<<<< HEAD:src/components/admin/InstituteTable.jsx
import CustomButton from "./CustomButton";

const styles = {
  tableContainer: {
    boxShadow: 'none',
    maxHeight: 400,
    overflowY: 'auto',
    overflowX: 'auto',
  },
  headCell: {
    fontFamily: 'Jost',
    fontWeight: 500,
    fontSize: '15px',
    color: '#334D6E',
    textAlign: 'center',
  },
  bodyCell: {
    borderBottom: 'none',
    fontWeight: 500,
    fontSize: '14px',
    color: '#334D6E',
    textAlign: 'center',
  },
  button: {
    color: 'white',
    width: 'auto',
  },
};

function InstituteTable({ maxWidth }) {
  const [institutes, setInstitutes] = useState([]);

  const fetchInstitute = async () => {
    try {
      const response = await apiGet('/admin/getInstitute');
      setInstitutes(response.data.data);
    } catch (error) {
      console.error('Error fetching institutes:', error);
    }
  };

  useEffect(() => {
    fetchInstitute();
  }, []);
=======
import CustomTypography from "./CustomTypography";
import CustomButton from "./CustomButton";

function CustomTable({maxWidth, handleClick, institutes, tableHeaders}) {
>>>>>>> 13aa2f4f8731b94ebcd35882efb25d1c181be347:src/components/admin/CustomTable.jsx

  return (
    <Grid>
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{ ...styles.tableContainer, maxWidth }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={styles.headCell}>Sr No</TableCell>
              <TableCell sx={styles.headCell}>Institute Name</TableCell>
              <TableCell sx={styles.headCell}>Number students</TableCell>
              <TableCell sx={styles.headCell}>Status</TableCell>
              <TableCell sx={styles.headCell}>Action</TableCell>
            </TableRow>
          </TableHead>

<<<<<<< HEAD:src/components/admin/InstituteTable.jsx
          <TableBody>
            {institutes.map((institute, index) => (
              <TableRow key={index}>
                <TableCell sx={styles.bodyCell}>{index + 1}</TableCell>
                <TableCell sx={styles.bodyCell}>{institute.instituteName}</TableCell>
                <TableCell sx={styles.bodyCell}>1</TableCell>
                <TableCell sx={styles.bodyCell}>
                  <CustomButton bgColor="#109CF1" sx={styles.button}>
                    Active
                  </CustomButton>
                </TableCell>
                <TableCell sx={{ ...styles.bodyCell }}>
                  <img src="/images/edit.svg" alt="edit" />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Grid>
  );
=======
    return (
        <>
            <Grid>
                <TableContainer component={Paper} elevation={0} sx={{
                    boxShadow: 'none',
                    maxHeight: 400,
                    overflowY: 'auto',
                    maxWidth: maxWidth,
                    overflowX: 'auto'
                }}>
                    <Table>
                        <TableHead>
                            <TableRow>

                                {
                                    tableHeaders?.map((header, index) => (
                                        <TableCell key={index}>
                                            <CustomTypography text={header} fontSize={{ xs: '12px', sm: '14px', md: '14px' }} mb={0} fontWeight={600} />
                                        </TableCell>
                                    ))
                                }
                              
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {institutes?.map((institute, index) => (
                                <TableRow key={index} sx={{ borderBottom: '1px solid #e0e0e0', }}>
                                    <TableCell >{index + 1}</TableCell>
                                    <TableCell sx={{ cursor: 'pointer' }} onClick={handleClick}>{institute.instituteName}</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>
                                       
                                         <CustomButton children='Active' loading={false} bgColor='#109CF1' sx={{ width: { xs: '20%', sm: '20%', md: '20%' }, fontSize: { xs: '10px', sm: '11px', md: '12px' }, }} />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <EditSquareIcon sx={{ color: 'orange' }} fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

        </>
    );
>>>>>>> 13aa2f4f8731b94ebcd35882efb25d1c181be347:src/components/admin/CustomTable.jsx
}

export default CustomTable;
