import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { apiPost } from '../../api/axios';
import {
  Box,
  Button,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper
} from '@mui/material';

function TestPage() {
  const location = useLocation();
  const { activeBook, syllabusTitle } = location.state;

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timer, setTimer] = useState(90 * 60); // 90 minutes
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);

  // Fetch questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const req = { syllabus: syllabusTitle, book: activeBook };
        const response = await apiPost('/randomQuestions', req);
        setQuestions(response.data.data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, []);

  // Countdown timer
  useEffect(() => {
    if (timer <= 0) {
      handleSubmit();
      return;
    }
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleAnswer = (qId, optionId) => {
    setAnswers({ ...answers, [qId]: { selected: optionId, review: false } });
  };

  const handleReview = (qId) => {
    setAnswers({ ...answers, [qId]: { ...answers[qId], review: true } });
  };

  const handleReset = () => {
    const qId = questions[currentQuestionIndex]._id;
    const newAnswers = { ...answers };
    delete newAnswers[qId];
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    console.log('Submitted Answers:', answers);
    alert('Test Submitted!');
    setShowSubmitDialog(false);
  };

  const getBoxColor = (index) => {
    const qId = questions[index]?._id;
    if (currentQuestionIndex === index) return 'primary';
    if (answers[qId]?.review) return 'warning';
    if (answers[qId]?.selected !== undefined) return 'success';
    return 'default';
  };

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>{syllabusTitle} - {activeBook}</Typography>

      {/* Question Navigation Boxes */}
      <Grid container spacing={1} sx={{ mb: 2 }}>
        {questions.map((_, index) => (
          <Grid item key={index}>
            <Button
              variant="contained"
              color={getBoxColor(index)}
              size="small"
              onClick={() => setCurrentQuestionIndex(index)}
              sx={{ minWidth: '30px', bgcolor: getBoxColor(index) === 'default' ? '#e0e0e0' : undefined }}
            >
              {index + 1}
            </Button>
          </Grid>
        ))}
      </Grid>

      {/* Timer */}
      <Typography variant="h6" color="error" gutterBottom>
        Time Left: {formatTime(timer)}
      </Typography>

      {/* Question Display */}
      {questions.length > 0 && (
        <Paper variant="outlined" sx={{ p: 2, mb: 2 }}>
          <Typography variant="subtitle1">
            Q{currentQuestionIndex + 1}. {questions[currentQuestionIndex].question}
          </Typography>
          <Box mt={2}>
            {questions[currentQuestionIndex].options.map((opt, idx) => (
              <Button
                key={opt._id}
                variant={
                  answers[questions[currentQuestionIndex]._id]?.selected === opt.id
                    ? 'contained'
                    : 'outlined'
                }
                color="info"
                fullWidth
                sx={{ mb: 1, textAlign: 'left' }}
                onClick={() => handleAnswer(questions[currentQuestionIndex]._id, opt.id)}
              >
                {opt.text}
              </Button>
            ))}
          </Box>
        </Paper>
      )}

      {/* Navigation Buttons */}
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button
          disabled={currentQuestionIndex === 0}
          onClick={() => setCurrentQuestionIndex((prev) => prev - 1)}
        >
          Previous
        </Button>
        <Button onClick={() => handleReview(questions[currentQuestionIndex]._id)}>
          Mark for Review
        </Button>
        <Button onClick={handleReset}>Reset</Button>
        <Button
          disabled={currentQuestionIndex === questions.length - 1}
          onClick={() => setCurrentQuestionIndex((prev) => prev + 1)}
        >
          Next
        </Button>
        <Button
          color="error"
          variant="contained"
          onClick={() => setShowSubmitDialog(true)}
        >
          Submit
        </Button>
      </Box>

      {/* Submit Dialog */}
      <Dialog open={showSubmitDialog} onClose={() => setShowSubmitDialog(false)}>
        <DialogTitle>Submit Test</DialogTitle>
        <DialogContent>
          Are you sure you want to submit the test?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowSubmitDialog(false)}>Cancel</Button>
          <Button color="error" onClick={handleSubmit}>
            Yes, Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default TestPage;
