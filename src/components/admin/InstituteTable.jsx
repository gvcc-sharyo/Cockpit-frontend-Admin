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
}

export default InstituteTable;
