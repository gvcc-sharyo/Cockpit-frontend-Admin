import { FormatBold, FormatItalic, FormatUnderlined } from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";






function CustomTextArea() {
    return (
         <Box
                     sx={{
                       maxWidth: "100%",
                       border: "1px solid #ccc",
                       borderRadius: "8px",
                       overflow: "hidden",
                       flexGrow:1
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
                       <IconButton size="small">
                         <FormatBold />
                       </IconButton>
                       <IconButton size="small">
                         <FormatItalic />
                       </IconButton>
                       <IconButton size="small">
                         <FormatUnderlined />
                       </IconButton>
                     </Box>
       
                     <TextField
                       placeholder="Write something"
                       multiline
                       rows={4}
                       fullWidth
                       variant="outlined"
                       InputProps={{
                         sx: {
                           backgroundColor: "white",
                           borderRadius: 0,
                           "& fieldset": { border: "none" },
                           fontSize: "14px",
                           p: 1,
                         },
                       }}
                     />
                   </Box>
    )
}
export default CustomTextArea;