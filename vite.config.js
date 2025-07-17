import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  esbuild: {
    jsxInject: `
      import React from 'react';
      import { useState, useEffect, useContext, useMemo, useRef, createContext, useCallback } from 'react';
      import {
        AppBar, Avatar, Autocomplete, Badge, Box, Button,
        Card, CardContent, Checkbox, Container, Collapse, CardActions, CardActionArea, CardMedia, CardHeader,
        Divider, Drawer, Dialog, DialogContent, DialogContentText, DialogTitle, DialogActions,
        FormControl, FormControlLabel, FormHelperText, FormLabel, FormGroup,
        Grid,
        IconButton, InputAdornment, InputBase, InputLabel,
        List, ListItem, ListItemText, ListItemButton, ListItemIcon,
        Menu, MenuItem,
        OutlinedInput,
        Paper, Rating,
        Accordion, AccordionSummary, AccordionDetails,
        Radio, RadioGroup,
        Select, Stack, Slider,
        TextField, Toolbar, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Tab, Tabs,
        useTheme, useMediaQuery,
        CircularProgress, Chip, ToggleButtonGroup, ToggleButton, Popover, GlobalStyles,
        Alert, Snackbar, Pagination, LinearProgress
      } from '@mui/material';
      import {
        AccountCircle, ExpandLess, ExpandMore, ArrowDropDown as ArrowDropDownIcon, AddSharp as AddSharpIcon, ArrowBack as ArrowBackIcon,
        BorderLeft, FormatBold, FormatItalic, FormatUnderlined,
        CheckBox as CheckBoxIcon, CheckBoxOutlineBlank as CheckBoxOutlineBlankIcon, Close as CloseIcon,
        CheckCircle as CheckCircleIcon, CancelRounded as CancelRoundedIcon, Camera,
        Delete, CalendarToday as CalendarTodayIcon,
        Edit, WorkOutlined as WorkOutlineIcon, EmailOutlined as EmailOutlinedIcon, Smartphone as SmartphoneIcon, NotificationsNone as NotificationsNoneIcon,
        FacebookOutlined as FacebookOutlinedIcon, FiberManualRecordSharp as FiberManualRecordSharpIcon, Fingerprint as FingerprintIcon,
        Instagram as InstagramIcon,
        KeyboardArrowDown as KeyboardArrowDownIcon, KeyboardArrowRight as KeyboardArrowRightIcon,
        Logout as LogoutIcon, Login as LoginIcon,
        Menu as MenuIcon, MenuOpen as MenuOpenIcon,
        NotificationsNoneOutlined as NotificationsNoneOutlinedIcon,
        PlayCircleFilled as PlayCircleFilledIcon, PlayCircleOutline as PlayCircleOutlineIcon,
        RemoveSharp as RemoveSharpIcon,
        Search as SearchIcon,
        Visibility, VisibilityOff, CalendarToday,
        YouTube as YouTubeIcon, Label, CameraAlt as CameraAltIcon, MoreHoriz as MoreHorizIcon,
        EditSquare as EditSquareIcon, CloudUpload as CloudUploadIcon,
        ArrowForwardIos as ArrowForwardIosIcon, ArrowBackIos as ArrowBackIosIcon
      } from '@mui/icons-material';
      import { useNavigate, useLocation, Routes, Route, BrowserRouter, Outlet, Navigate, useParams } from 'react-router-dom';
      import { styled } from '@mui/material/styles';
      import { Modal } from '@mui/material';
    `
  },
  server: {
    port: 4173
  }
});

