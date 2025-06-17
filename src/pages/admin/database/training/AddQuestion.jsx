import Navbar from "../../../../components/admin/Navbar";
import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Container,
  Button,
  MenuItem,
  Box,
  FormControl,
  Select,
  IconButton,
  TextField,
  Divider,
  Radio,
  FormControlLabel,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  Code,
  FormatListBulleted,
  FormatListNumbered,
  FormatAlignLeft,
  ArrowDropDown,
} from "@mui/icons-material";
import CustomTextField from "../../../../components/admin/customTextfield";
import CustomTypography from "../../../../components/admin/CustomTypography";
import CustomTextArea from "../../../../components/admin/CustomTextArea";
function AddQuestion() {
  return (
    <>
      <Navbar title="Training">
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              select
              label="Chapter"
              required
              placeholder="Chapter"
              name="chapter"
            >
              <MenuItem value="chapter1">Chapter 1: Introduction</MenuItem>
              <MenuItem value="chapter2">Chapter 2: Basics</MenuItem>
              <MenuItem value="chapter3">Chapter 3: Advanced Concepts</MenuItem>
              <MenuItem value="chapter4">Chapter 4: Summary</MenuItem>
            </CustomTextField>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <CustomTextField
              select
              label="Book"
              required
              placeholder="Enter your full name"
              name="fullName"
            >
              <MenuItem value="book1">Book 1</MenuItem>
              <MenuItem value="book2">Book 2</MenuItem>
            </CustomTextField>
          </Grid>

          <Grid size={{ xs: 12 }}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#EAB308",
                  color: "white",
                  borderRadius: "10px",
                }}
              >
                +Add Image
              </Button>
            </Box>
          </Grid>
        </Grid>

        <Grid container spacing={2} sx={{ mt: 2, mb: 2 }}>
          <Grid size={{ xs: 12, md: 12 }}>
          <CustomTextArea />
          </Grid>
        </Grid> 

        <Divider sx={{ border: "1px solid #DBDBDB", mb: 2 }} />

        <Box sx={{ justifyContent: "space-between", display: "flex" }}>
          <CustomTypography text="Selected options" />
          <CustomTypography text="Choices" />
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#EAB308",
              color: "white",
              borderRadius: "10px",
            }}
          >
            +Add Option
          </Button>
        </Box>

        <FormControl>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label=<CustomTextArea />
              sx={{
                ml: 1,
                mb:2,
                "& .MuiFormControlLabel-label": {
                  marginLeft: "100px",
                },
              }}
            />

            <FormControlLabel
              value="male"
              control={<Radio />}
              label=<CustomTextArea />
              sx={{
                ml: 1,
                "& .MuiFormControlLabel-label": {
                  marginLeft: "100px",
                },
              }}
            />
          </RadioGroup>
        </FormControl>
      </Navbar>
    </>
  );
}

export default AddQuestion;
