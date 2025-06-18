import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
} from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { useState } from "react";
// import PropTypes from "prop-types";

function CustomTextArea({
  value = "",
  onChange,
  placeholder = "Write something",
  rows = 4,
  disabled = false,
}) {
  // State for text formatting
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);

  // Handle text input changes
  const handleChange = (event) => {
    if (onChange) {
      onChange(event);
    }
  };

  // Toggle formatting states
  const toggleBold = () => setIsBold((prev) => !prev);
  const toggleItalic = () => setIsItalic((prev) => !prev);
  const toggleUnderline = () => setIsUnderlined((prev) => !prev);

  return (
    <Box
      sx={{
        maxWidth: "100%",
        border: "1px solid #ccc",
        borderRadius: "8px",
        overflow: "hidden",
        flexGrow: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #ccc",
          bgcolor: "#fff",
          p: 1,
        }}
      >
        <Button sx={{ color: "#000" }}>Normal</Button>
        <IconButton size="small" onClick={toggleBold}>
          <FormatBold sx={{ color: isBold ? "#000" : "#ccc" }} />
        </IconButton>
        <IconButton size="small" onClick={toggleItalic}>
          <FormatItalic sx={{ color: isItalic ? "#000" : "#ccc" }} />
        </IconButton>
        <IconButton size="small" onClick={toggleUnderline}>
          <FormatUnderlined sx={{ color: isUnderlined ? "#000" : "#ccc" }} />
        </IconButton>
      </Box>

      <TextField
        placeholder={placeholder}
        multiline
        rows={rows}
        fullWidth
        variant="outlined"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        InputProps={{
          sx: {
            backgroundColor: "white",
            borderRadius: 0,
            "& fieldset": { border: "none" },
            fontSize: "14px",
            p: 1,
            fontWeight: isBold ? "bold" : "normal",
            fontStyle: isItalic ? "italic" : "normal",
            textDecoration: isUnderlined ? "underline" : "none",
          },
        }}
      />
    </Box>
  );
}

// Optional PropTypes for type checking
// CustomTextArea.propTypes = {
//   value: PropTypes.string,
//   onChange: PropTypes.func,
//   placeholder: PropTypes.string,
//   rows: PropTypes.number,
//   disabled: PropTypes.bool,
// };

export default CustomTextArea;