import React from "react";
import { Typography } from "@mui/material";
const CustomTypography = ({ text,   fontSize = { xs: '12px', sm: '13px', md: '14px' }, fontWeight=400, color, mb=1, sx = {}}) => {
  return (
    <Typography
      sx={{
        fontFamily: "Jost",
        fontWeight: fontWeight,
        fontSize: fontSize,
        mb: mb,
        color: color,
        ...sx
      }}
    >
      {text}
    </Typography>
  );
};
export default CustomTypography;