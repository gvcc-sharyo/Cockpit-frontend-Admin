import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { apiPost } from '../../api/axios';
import {
    Container, Typography, Box, Button, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Paper, Grid, Chip, Radio, RadioGroup,
    FormControlLabel, FormControl
} from '@mui/material';
import Header from '../../components/Header/Header';
import FooterSection from '../../components/Footer/footer';

function TestPage2() {
    const location = useLocation();
    const { activeBook, syllabusTitle } = location.state || {};
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOptions, setSelectedOptions] = useState({});
    const [markedForReview, setMarkedForReview] = useState({});
    const [skip, setSkip] = useState({});
    const [timeLeft, setTimeLeft] = useState(90 * 60); // 90 minutes in seconds
    const [openSubmitDialog, setOpenSubmitDialog] = useState(false);

    // Fetch questions
    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const req = { syllabus: syllabusTitle, book: activeBook };
                const response = await apiPost('/randomQuestions', req);
                setQuestions(response.data.data || []);
            } catch (error) {
                console.error('Error fetching questions:', error);
            }
        };
        fetchQuestions();
    }, [activeBook, syllabusTitle]);

    // Timer logic
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 0) {
                    clearInterval(timer);
                    setTimeout(() => confirmSubmit(), 0);
                    // return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Format time
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    // Handle option selection
    const handleOptionSelect = (questionId, optionId) => {
        setSelectedOptions((prev) => ({ ...prev, [questionId]: optionId }));
    };

    // Handle mark for review
    const handleMarkForReview = (questionId) => {
        setMarkedForReview((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
    };
    const handleSkip = (questionId) => {
        setSkip((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
    };

    // Handle navigation
    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex(currentQuestionIndex - 1);
        }
    };

    // Handle reset
    const handleReset = () => {
        const currentQuestionId = questions[currentQuestionIndex]?._id;
        if (!currentQuestionId) return;

        setSelectedOptions((prev) => {
            const updated = { ...prev };
            delete updated[currentQuestionId];
            return updated;
        });

        setMarkedForReview((prev) => {
            const updated = { ...prev };
            delete updated[currentQuestionId];
            return updated;
        });

        setSkip((prev) => {
            const updated = { ...prev };
            delete updated[currentQuestionId];
            return updated;
        });
    };


    // Handle submit
    const handleSubmit = useCallback(() => {
        setOpenSubmitDialog(true);
    }, []);


    // Get chip color based on question status
    const getChipColor = (index, questionId) => {
        const result = evaluation[questionId];

        if (result === 'correct') return 'green';
        if (result === 'incorrect') return 'red';
        if (result === 'skipped') return 'white';

        if (index === currentQuestionIndex) return 'lightblue';
        if (markedForReview[questionId]) return 'blue';
        if (skip[questionId]) return 'white';
        if (selectedOptions[questionId]) return 'green';

        return '#F6F6F6';
    };

    const [evaluation, setEvaluation] = useState({});
    const [resultCounts, setResultCounts] = useState({
        correct: 0,
        incorrect: 0,
        skipped: 0,
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [timeTaken, setTimeTaken] = useState(0); // in seconds

    const confirmSubmit = async () => {
        try {
            const evalResult = {};
            let correct = 0;
            let incorrect = 0;
            let skipped = 0;

            questions.forEach((question) => {
                const selected = selectedOptions[question._id];
                if (!selected) {
                    evalResult[question._id] = 'skipped';
                    skipped++;
                } else {
                    const chosenOption = question.options.find((opt) => opt.id === selected);
                    if (chosenOption?.isCorrect) {
                        evalResult[question._id] = 'correct';
                        correct++;
                    } else {
                        evalResult[question._id] = 'incorrect';
                        incorrect++;
                    }
                }
            });

            setEvaluation(evalResult);
            setResultCounts({ correct, incorrect, skipped });
            setOpenSubmitDialog(false);
            setIsSubmitted(true);
            setTimeTaken((90 * 60) - timeLeft);

        } catch (error) {
            console.error('Error during evaluation:', error);
        }
    };




    return (
        <>


            <Header />

            <Container maxWidth="lg" sx={{ py: 4 }}>


                {/* Question Number Chips */}


                {isSubmitted ? (
                    // ✅ Summary UI
                    <Box sx={{ mt: 2 }}>

                        <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
                            {syllabusTitle} {activeBook} <span style={{ color: '#EAB308' }}>RESULT</span>
                        </Typography>

                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 1, mt: 3 }}>
                            {questions.map((q, index) => {
                                const result = evaluation[q._id];
                                const colorMap = {
                                    correct: 'green',
                                    incorrect: 'red',
                                    skipped: 'white',
                                };
                                return (

                                    <Chip
                                        key={q._id}
                                        label={index + 1}

                                        sx={{
                                            cursor: 'pointer',
                                            minWidth: 60,
                                            backgroundColor: colorMap[result],
                                            color: result === 'skipped' ? 'black' : 'white',
                                            fontWeight: 'bold',
                                            borderRadius: 2

                                        }}
                                    />
                                );
                            })}
                        </Box>

                        <Box mt={7} >
                            <Typography variant="h6" >
                                <span style={{ color: '#183251', fontWeight: 'bold' }}>Time Taken:</span>  <span style={{ color: '#EAB308', fontWeight: 'bold' }}>{formatTime(timeTaken)}</span>
                            </Typography>
                            <Box textAlign={'center'} sx={{ display: 'flex', justifyContent: 'center', gap: 2 }} mt={4}>
                                <Typography variant="body1" gutterBottom sx={{ border: '1px solid', borderRadius: '5px', padding: '20px', backgroundColor: '#22C55E', color: 'white', width: '20%' }}>
                                    Correct
                                    <div>{resultCounts.correct}</div>
                                </Typography>
                                <Typography variant="body1" gutterBottom sx={{ border: '1px solid', borderRadius: '5px', padding: '20px', backgroundColor: 'red', color: 'white', width: '20%' }}>
                                    Incorrect
                                    <div>{resultCounts.incorrect}</div>
                                </Typography>
                                <Typography variant="body1" gutterBottom sx={{ border: '1px solid black', borderRadius: '5px', padding: '20px', width: '20%' }}>
                                    Skipped
                                    <div>{resultCounts.skipped}</div>
                                </Typography>
                            </Box>


                        </Box>



                    </Box>
                ) : (
                    <>
                        <Typography variant="h4" mb={4} sx={{ fontWeight: 'bold' }}>
                            {syllabusTitle} {activeBook}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: 'center', mb: 4 }}>
                            {questions.map((question, index) => (
                                <Chip
                                    key={question._id}
                                    label={index + 1}
                                    onClick={() => setCurrentQuestionIndex(index)}
                                    sx={{
                                        cursor: 'pointer',
                                        minWidth: 60,
                                        backgroundColor: getChipColor(index, question._id),
                                        color: getChipColor(index, question._id) === '#F6F6F6' || 'white' ? 'black' : 'white',
                                        fontWeight: 'bold',
                                        borderRadius: 2
                                    }}
                                />
                            ))}
                        </Box>

                        <Typography variant="h6" sx={{ mb: 4 }}>
                            <span style={{ color: '#183251', fontWeight: 'bold' }}>Time Left:</span>  <span style={{ color: '#EAB308', fontWeight: 'bold' }}> {formatTime(timeLeft)}</span>
                        </Typography>

                        {/* Current Question */}
                        {questions.length > 0 && (
                            <Paper sx={{ p: 3, mb: 4, border: '1px solid', borderColor: 'grey.400' }}>
                                <Typography sx={{ fontSize: '18px', }} >
                                    <span style={{ color: 'white', backgroundColor: '#183251', borderRadius: '50%', padding: '3px', display: 'inline-block', textAlign: 'center', width: '30px', height: '30px' }}>{currentQuestionIndex + 1}</span> <span style={{ color: '183251', fontWeight: '600', marginLeft: '10px' }}>{questions[currentQuestionIndex]?.question}</span>
                                </Typography>
                                <FormControl component="fieldset" sx={{ mt: 2 }}>
                                    <RadioGroup
                                        value={selectedOptions[questions[currentQuestionIndex]._id] || ''}
                                        onChange={(e) =>
                                            handleOptionSelect(
                                                questions[currentQuestionIndex]._id,
                                                parseInt(e.target.value)
                                            )
                                        }
                                    >
                                        {questions[currentQuestionIndex]?.options?.map((option) => (
                                            <FormControlLabel
                                                key={option._id}
                                                value={option.id}
                                                control={<Radio />}
                                                label={option.text}
                                            />
                                        ))}
                                    </RadioGroup>
                                </FormControl>

                            </Paper>
                        )}

                        {/* Navigation Buttons */}
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={handlePrevious}
                                sx={{ backgroundColor: "#183251", color: "white" }}
                            >
                                Previous
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={handleNext}
                                sx={{ backgroundColor: "#183251", color: "white" }}

                            >
                                Next
                            </Button>

                            <Button variant="outlined" onClick={handleReset}
                                sx={{ backgroundColor: "#C5322A", color: "white" }}

                            >
                                Reset
                            </Button>

                            <Button
                                // variant="outlined"
                                sx={{ border: '1px solid #183251', color: "#183251" }}
                                onClick={() => handleSkip(questions[currentQuestionIndex]?._id)}
                            >
                                Skip
                            </Button>

                            <Button
                                sx={{ backgroundColor: "#A855F7", color: "white" }}
                                variant="outlined"
                                onClick={() => handleMarkForReview(questions[currentQuestionIndex]?._id)}
                            >
                                {markedForReview[questions[currentQuestionIndex]?._id]
                                    ? 'Unmark Review'
                                    : 'Mark for Review'}
                            </Button>

                            <Button variant="contained" onClick={handleSubmit}
                                sx={{ backgroundColor: "#C5322A", color: "white" }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </>
                )}


                {/* Timer */}

            </Container>

            {/* Submit Confirmation Dialog */}
            <Dialog open={openSubmitDialog} onClose={() => setOpenSubmitDialog(false)}>
                <DialogTitle>Confirm Submission</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to submit the test?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenSubmitDialog(false)}
                        sx={{ border: '1px solid #183251', color: '#183251' }}
                    >No</Button>
                    <Button onClick={confirmSubmit} variant="contained"
                        sx={{ backgroundColor: '#183251', color: 'white' }}
                    >
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>

            <FooterSection />
        </>
    );
}

export default TestPage2;