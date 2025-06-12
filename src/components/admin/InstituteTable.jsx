import { useEffect, useState } from "react";
import {
    Grid,
    Typography,
    Button,
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { apiGet } from "../../api/axios";

function InstituteTable({maxWidth}) {

    const [institutes, setInstitutes] = useState([])

    const fetchInstitute = async () => {
        try {
            const response = await apiGet('/admin/getInstitute');
            setInstitutes(response.data.data);
        } catch (error) {
            console.error('Error fetching institutes:', error);
        }
    };

    useEffect(() => {
        fetchInstitute();
    }, [])


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
                                <TableCell><Typography fontWeight="bold">Sr No</Typography></TableCell>
                                <TableCell><Typography fontWeight="bold">Institute Name</Typography></TableCell>
                                <TableCell><Typography fontWeight="bold">Number students</Typography></TableCell>
                                <TableCell><Typography fontWeight="bold">Status</Typography></TableCell>
                                <TableCell><Typography fontWeight="bold">Action</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {institutes.map((institute, index) => (
                                <TableRow key={index} sx={{ borderBottom: '1px solid #e0e0e0', }}>
                                    <TableCell >{index + 1}</TableCell>
                                    <TableCell>{institute.instituteName}</TableCell>
                                    <TableCell>1</TableCell>
                                    <TableCell>
                                        <Button variant="contained" sx={{ backgroundColor: '#109CF1', color: 'white' }}>
                                            Active
                                        </Button>
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

export default InstituteTable;
