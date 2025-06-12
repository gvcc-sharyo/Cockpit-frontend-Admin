import Navbar from "../../../components/admin/Navbar";
import { useEffect, useState } from "react";
import {
    Grid,
    Typography,
    Container,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    MenuItem
} from "@mui/material";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { apiGet, apiPost } from "../../../api/axios";
import CloseIcon from '@mui/icons-material/Close';

function InstitutionDetail() {




    return (
        <>
            <Navbar title="Institution" />

            <Container maxWidth="xl" >

                <Grid container sx={{ flexDirection: 'column', position: "relative", backgroundColor: '#f8f9fa', padding: '10px' }} mt={-60} ml={30} >
           
                </Grid>
            </Container>
        </>
    );
}

export default InstitutionDetail;
