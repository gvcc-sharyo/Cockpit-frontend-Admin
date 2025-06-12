import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './training.css';
import Header from '../../components/Header/Header';
import FooterSection from '../../components/Footer/footer';
import { useEffect, useState } from 'react';
import { apiGet } from '../../api/axios';
import Syllabus from '../../components/syllabus/Syllabus';
import { useNavigate } from 'react-router-dom';

function TrainingSyllabus() {

   const navigate = useNavigate();

  const handleClick = (params) => {
    navigate('/chapter', { state: params }); 
  };
        
  return (
    <>
      <Header />
      <Syllabus handleClick={handleClick}/>
      <FooterSection />
    </>
  );
}

export default TrainingSyllabus;