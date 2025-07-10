import React from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TextField,
} from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";

const styles = {
  container: {
    borderRadius: "16px",
    p: 3,
    backgroundColor: "#fff",
    width:"auto",
    boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
    height: "600px",
    overflow: "auto",

    // 👇 Scrollbar styles
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

  paginationInput: {
    width: "40px",
    "& .MuiOutlinedInput-root": {
      height: "30px",
      borderRadius: "8px",
      fontFamily: "Inter",
      fontWeight: 600,
      fontSize: "14px",
      color: "#EAB308",
      borderColor: "#EAB308",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#EAB308",
    },
    "& .MuiInputBase-input": {
      textAlign: "center",
      padding: "5px 8px",
    },
  },
};

const sampleData = new Array(10).fill({
  sn: "01",
  firstName: "Bhumika",
  lastName: "Prajapathi",
  gender: "Female",
  phone: "0987654321",
});

function StudentsTable() {
  return (
    <Paper elevation={3} sx={styles.container}>
      {/* Top Row */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography sx={styles.heading}>Students</Typography>

        <Box sx={styles.paginationBox}>
          <Typography sx={styles.paginationLabel}>Showing</Typography>
          <TextField
            variant="outlined"
            size="small"
            value={12}
            sx={styles.paginationInput}
          />
          <Typography sx={{ ...styles.paginationLabel, ml: 1 }}>
            per page
          </Typography>
        </Box>
      </Box>

      {/* Table */}
      <TableContainer>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {[
                "S/N",
                "First Name",
                "Last Name",
                "Gender",
                "Phone Number",
                "Action",
              ].map((head, idx) => (
                <TableCell key={idx} sx={styles.tableHeadCell}>
                  {head}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sampleData.map((row, idx) => (
              <TableRow key={idx}>
                <TableCell sx={styles.tableCell}>{row.sn}</TableCell>
                <TableCell sx={styles.tableCell}>{row.firstName}</TableCell>
                <TableCell sx={styles.tableCell}>{row.lastName}</TableCell>
                <TableCell sx={styles.tableCell}>{row.gender}</TableCell>
                <TableCell sx={styles.tableCell}>{row.phone}</TableCell>
                <TableCell sx={styles.tableCell}><IconButton><img src="/images/edit.svg" alt="Edit" style={{ width: '20px', height: '20px' }} /></IconButton></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default StudentsTable;
