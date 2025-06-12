import Navbar from "../../../../components/admin/Navbar";
import { useEffect, useState } from "react";
import {
    Grid,
    Typography,
    Container,
    Button,
} from "@mui/material";

function AddQuestion() {


    
    return (
        <>
            <Navbar title="Training" />

            <Container maxWidth="xl" >

                <Grid container sx={{ flexDirection: 'column', position: "relative", backgroundColor: '#f8f9fa', padding: '10px' }} mt={-60} ml={30} >


                </Grid>
            </Container>

         
        </>
    );
}

export default AddQuestion;
