import Navbar from "../../../../components/admin/Navbar";
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
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import EditSquareIcon from '@mui/icons-material/EditSquare';
import { apiGet, apiGetToken } from "../../../../api/axios";

function TrainingQuestion() {

    const [questions, setQuestions] = useState([]);

    const { syllabusName, bookName, chapterName } = useParams();

    const fetchQuestions = async () => {
        try {
            const response = await apiGetToken('/questions');
            setQuestions(response.data.data);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [])

    const filteredQuestions = questions.filter(q => q.syllabus === syllabusName && q.book === bookName && q.chapter === chapterName);

    const navigate = useNavigate();
    const handleAddClick = () => {
        navigate('/admin/addQuestion');
    }
    
    return (
        <>
            <Navbar title="Training" />

            <Container maxWidth="xl" >

                <Grid container sx={{ flexDirection: 'column', position: "relative", backgroundColor: '#f8f9fa', padding: '10px' }} mt={-60} ml={30} >

                    <Grid sx={{ display: 'flex', justifyContent: 'flex-end' }} mb={2}>
                        <Button onClick={handleAddClick} variant="'outlined" sx={{ backgroundColor: 'orange', color: 'white' }}>+ Add questions</Button>
                    </Grid>

                    <Grid>
                        <TableContainer component={Paper} elevation={0} sx={{
                            boxShadow: 'none',
                            maxHeight: 400,
                            overflowY: 'auto',
                        }}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell><Typography fontWeight="bold">Ques. No</Typography></TableCell>
                                        <TableCell><Typography fontWeight="bold">Questions</Typography></TableCell>
                                        <TableCell><Typography fontWeight="bold">Category name</Typography></TableCell>
                                        <TableCell><Typography fontWeight="bold">Active</Typography></TableCell>
                                        <TableCell><Typography fontWeight="bold">Action</Typography></TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredQuestions.map((question, index) => (
                                        <TableRow key={index} sx={{ borderBottom: '1px solid #e0e0e0', }}>
                                            <TableCell >{index + 1}</TableCell>
                                            <TableCell>{question.question}</TableCell>
                                            <TableCell>
                                                <Button variant="contained" sx={{ backgroundColor: '#109CF1', color: 'white' }}>
                                                    Active
                                                </Button>
                                            </TableCell>
                                            <TableCell >General</TableCell>
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

                </Grid>
            </Container>


        </>
    );
}

export default TrainingQuestion;
