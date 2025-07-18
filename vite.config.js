import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { styled } from "@mui/material/styles"; // <-- Make sure this import is added

export default defineConfig({
  plugins: [react()],
  server: {
    port: 4173,
  },
  esbuild: {
    jsxInject: `
      import React, { useState, useEffect, useContext, useMemo ,useRef, createContext, useCallback} from 'react';
      import {
        AppBar, Avatar, Autocomplete, Badge, Box, Button, 
        Card, CardContent, Checkbox, Container, Collapse, CardActions, CardActionArea, CardMedia, CardHeader,
        Divider, Drawer, Dialog, DialogContent, DialogContentText,  DialogTitle, DialogActions,
        FormControl, FormControlLabel, FormHelperText, FormLabel, FormGroup,
        Grid, 
        IconButton, InputAdornment, InputBase, InputLabel, 
        List, ListItem, ListItemText,ListItemButton, ListItemIcon,
        Menu, MenuItem,
        OutlinedInput,
        Paper,Rating,
        Accordion, AccordionSummary,AccordionDetails,
        Radio, RadioGroup, 
        Select, Stack, Slider,
        TextField, Toolbar, Tooltip, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Tab, Tabs,
        useTheme, useMediaQuery,
        CircularProgress, Chip, ToggleButtonGroup, ToggleButton, Popover, GlobalStyles,
        Alert, Snackbar, Pagination, LinearProgress
      } from '@mui/material';
      
      import {
        AccountCircle, ExpandLess, ExpandMore, ArrowDropDown as ArrowDropDownIcon, AddSharp as AddSharpIcon, ArrowBack as ArrowBackIcon,
        BorderLeft,
        CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon, Close as CloseIcon, 
        CheckCircle as CheckCircleIcon, CancelRounded as CancelRoundedIcon, Camera as CameraAltIcon,
        Delete, Delete as DeleteIcon,Email as EmailOutlinedIcon,EditSquare as EditSquareIcon,Smartphone as SmartphoneIcon,CloudUpload as CloudUploadIcon,
        Edit,ExpandMore as ExpandMoreIcon,
        FacebookOutlined as FacebookOutlinedIcon, FiberManualRecordSharp as FiberManualRecordSharpIcon, Fingerprint as FingerprintIcon, Facebook, FormatBold  as FormatBold,FormatItalic as FormatItalic,FormatUnderlined as FormatUnderlined, 
        MoreHoriz as MoreHorizIcon, Instagram as InstagramIcon, Instagram,
        KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowRight as KeyboardArrowRightIcon,
        Logout as LogoutIcon, Login as LoginIcon,
        Menu as MenuIcon, MenuOpen as MenuOpenIcon,
        NotificationsNoneOutlined as NotificationsNoneOutlinedIcon, 
        PlayCircleFilled as PlayCircleFilledIcon, PlayCircleOutline as PlayCircleOutlineIcon,
        RemoveSharp as RemoveSharpIcon,
        Search as SearchIcon, WorkOutline as WorkOutlineIcon,
        Visibility, VisibilityOff,CalendarToday as CalendarTodayIcon,
        YouTube as YouTubeIcon, YouTube, Label , 
       ArrowForwardIos as ArrowForwardIosIcon, ArrowBackIos as ArrowBackIosIcon
      } from '@mui/icons-material';
       import { useNavigate,useLocation, Routes, Route, BrowserRouter, Outlet, Navigate, useParams } from 'react-router-dom';
       import { styled } from "@mui/material/styles";
       import { Modal } from "@mui/material";
       
    `,
  },
});
