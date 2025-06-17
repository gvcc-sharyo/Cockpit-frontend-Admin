import React from "react";
import { Box, TextField } from "@mui/material";
import CustomTypography from "./CustomTypography";
const CustomTextField = ({
  label,
  required = false,
  value,
  onChange,
  placeholder = "",
  name = "",
  borderRadius = "10px",
  bgcolor,
  ...rest
}) => {
  return (
    <Box>
      {label && <CustomTypography text={label} />}
      <TextField
        fullWidth
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius,
            height: "45px",
            backgroundColor: 'white'
          },
          "& .MuiInputBase-input": {
            padding: "0 14px",
          },
        }}
        {...rest}
      />
    </Box>
  );
};
export default CustomTextField;