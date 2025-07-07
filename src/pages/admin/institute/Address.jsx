import React from "react";
import { Box, Paper, Typography, TextField, Stack, Grid } from "@mui/material";
import CustomTextField from "../../../components/admin/CustomTextField";
import CustomButton from "../../../components/admin/CustomButton";

const Address = () => {
  const styles = {
    card: {
      borderRadius: "16px",
      padding: "24px",
      backgroundColor: "#fff",
      boxShadow: "0px 4px 20px rgba(0,0,0,0.05)",
      width:"100%"

    },
    title: {
      fontFamily: "Jost",
      fontWeight: 600,
      fontSize: "18px",
      color: "#404040",
      marginBottom: "16px",
    },
    label: {
      fontFamily: "Jost",
      fontWeight: 400,
      fontSize: "14px",
      color: "#404040",
      marginBottom: "8px",
    },
    textField: {
      marginBottom: "24px",
      "& .MuiOutlinedInput-root": {
        borderRadius: "10px",
      },
    },
  };

  return (
    <Paper elevation={3} sx={styles.card}>
      <Typography sx={styles.title}>Address</Typography>
      <Grid container spacing={2} sx={{display:"flex",justifyContent:"center"}}>
        <Grid size={{xs:12,md:12}}>
            <CustomTextField label="Current address" />
        </Grid>
        <Grid size={{xs:12,md:12}}>
            <CustomTextField label="Permanent address" />
        </Grid>
        <Box sx={{display:"flex",justifyContent:"center"}}>
            <CustomButton bgColor="#EAB308">Save</CustomButton>
        </Box>
      </Grid>
    </Paper>
  );
};

export default Address;
