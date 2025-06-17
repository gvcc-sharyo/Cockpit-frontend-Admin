// components/Common/CustomTypography.js
import React from "react";
import { Typography } from "@mui/material";

const CustomTypography = ({ text }) => {
  return (
    <Typography
      sx={{
        fontFamily: "Jost",
        fontWeight: 400,
        fontSize: "14px",
        mb: 1,
      }}
    >
      {text}
    </Typography>
  );
};

export default CustomTypography;
