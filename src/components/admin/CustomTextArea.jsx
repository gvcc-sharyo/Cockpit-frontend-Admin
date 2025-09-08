function CustomTextArea({
  value = "",
  onChange,
  placeholder = "Write something",
  rows = 4,
  disabled = false,
}) {
  // Text formatting state
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);

  // Handle text input change
  const handleChange = (event) => {
    if (onChange) {
      onChange(event);
    }
  };

  // Formatting toggles
  const toggleBold = () => setIsBold((prev) => !prev);
  const toggleItalic = () => setIsItalic((prev) => !prev);
  const toggleUnderline = () => setIsUnderlined((prev) => !prev);

  // Reset all formatting to normal
  const resetFormatting = () => {
    setIsBold(false);
    setIsItalic(false);
    setIsUnderlined(false);
  };

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
      {/* Formatting Toolbar */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          borderBottom: "1px solid #ccc",
          bgcolor: "#fff",
          p: 1,
        }}
      >
       <Button sx={{ color: "#000", textTransform: "none" }} onClick={resetFormatting}>Normal</Button>

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

      {/* Text Input Area */}
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

export default CustomTextArea;
