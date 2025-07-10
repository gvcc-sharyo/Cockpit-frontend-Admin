import { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { apiGet } from "../../api/axios";
import CustomTypography from "./CustomTypography";
import CustomButton from "./CustomButton";

function CustomTable({maxWidth, handleClick, institutes, tableHeaders}) {

  

    return (
        <>
            <Grid>
                <TableContainer component={Paper} elevation={0} sx={{
                    boxShadow: 'none',
                    maxHeight: 400,
                    overflowY: 'auto',
                    maxWidth: maxWidth,
                    overflowX: 'auto'
                }}>
                    <Table>
                        <TableHead>
                            <TableRow>

                                {
                                    tableHeaders?.map((header, index) => (
                                        <TableCell key={index}>
                                            <CustomTypography text={header} fontSize={{ xs: '12px', sm: '14px', md: '14px' }} mb={0} fontWeight={600} />
                                        </TableCell>
                                    ))
                                }
                              
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {institutes?.map((institute, index) => (
                                <TableRow key={index} sx={{ borderBottom: '1px solid #e0e0e0', }}>
                                    <TableCell >{index + 1}</TableCell>
                                    <TableCell sx={{ cursor: 'pointer' }} onClick={handleClick}>{institute.instituteName}</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>
                                       
                                         <CustomButton children='Active' loading={false} bgColor='#109CF1' sx={{ width: { xs: '20%', sm: '20%', md: '20%' }, fontSize: { xs: '10px', sm: '11px', md: '12px' }, }} />
                                    </TableCell>
                                    <TableCell>
                                        <IconButton>
                                            <EditSquareIcon sx={{ color: 'orange' }} fontSize="small" />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>

        </>
    );
}

export default CustomTable;
