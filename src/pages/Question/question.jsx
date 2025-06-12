import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './question.css';
import Header from '../../components/Header/Header';
import FooterSection from '../../components/Footer/footer';

const questions = [
  {
    id: 1,
    text: 'The Registration mark shall be letters, numbers or a combination of letters and numbers and shall be that assigned by:',
    options: [
      { id: 'A', text: 'The State Of Registry Or Common Mark Registering Authority', isCorrect: true },
      { id: 'B', text: 'The State Of registry Only', isCorrect: false },
      { id: 'C', text: 'The ICAO', isCorrect: false }
    ],
    explanation: 'The registration mark shall be letters, numbers, or a combination of letters and numbers consisting of 1 to 5 digits or characters and shall be that assigned by the state of registry or common mark registering authority.'
  },
  {
    id: 2,
    text: 'Which of the following is known as the Red Planet?',
    options: [
      { id: 'A', text: 'Earth', isCorrect: false },
      { id: 'B', text: 'Mars', isCorrect: true },
      { id: 'C', text: 'Venus', isCorrect: false }
    ],
    explanation: 'Mars is called the Red Planet because of its reddish appearance due to iron oxide on its surface.'
  }
];

const MultiQuestionCard = () => {
  const [answers, setAnswers] = useState({});

  const handleSelect = (qId, optionId) => {
    setAnswers({ ...answers, [qId]: optionId });
  };

  return (
    <>
      <Header />
      <section className="pt-5 bg-light">
        <div className="container">
          <h1 className="fw-bold text-dark-blue mb-3">
            Discover Our DGCA Question Banks
          </h1>
          <h2 className="fw-bold text-center text-warning">
            Solar System
          </h2>
        </div>
      </section>
      <div className='container'>
      <div className="question-list">
        {questions.map((q) => {
          const selected = answers[q.id];
          const correctOption = q.options.find(o => o.isCorrect);
          return (
            <div className="question-box" key={q.id}>
              <div className="question-header">
                <span className="icon">{q.id}</span>
                <span className="question-text">{q.text}</span>
              </div>
              <div className="options">
                {q.options.map((opt) => {
                  const isSelected = selected === opt.id;
                  const isCorrect = opt.isCorrect;
                  return (
                    <label
                      key={opt.id}
                      htmlFor={`q-${q.id}-${opt.id}`}
                      className={`option ${isSelected ? 'selected' : ''} ${isSelected && isCorrect ? 'correct' : isSelected && !isCorrect ? 'incorrect' : ''}`}
                    >
                      <input
                        type="radio"
                        id={`q-${q.id}-${opt.id}`}
                        name={`q-${q.id}`}
                        value={opt.id}
                        checked={isSelected}
                        onChange={() => handleSelect(q.id, opt.id)}
                      />
                      {opt.text}
                    </label>
                  );
                })}
              </div>
              {selected && (
                <div className="answer-box">
                  <span className="answer-tag">Answer</span>
                  <p className="explanation">{q.explanation}</p>
                  <a href="#" className="help-link text-end">Help?</a>
                </div>
              )}
            </div>
          );
        } )}        
        <div className="plan-box">
          <label>File your Plan</label>
          <textarea placeholder="Write your Explanation"></textarea>
        </div>
      </div>
      </div>
      <FooterSection />
    </>
  );
};
export default MultiQuestionCard;
