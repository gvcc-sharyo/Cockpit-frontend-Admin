import Navbar from "../../../../components/admin/Navbar";
import { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Box,
  FormControl,
  Divider,
  Radio,
  RadioGroup,
  MenuItem,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import Training from "../../../../components/admin/Training";

function TrainingAdd() {

  return (
    <>
      <Navbar title="Training">
        <Training />
      </Navbar>
    </>
  );
}
export default TrainingAdd;