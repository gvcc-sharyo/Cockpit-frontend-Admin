import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { useState, useEffect } from 'react';
import { apiGetToken } from '../../api/axios';
import { useNavigate } from 'react-router-dom';
import './syllabus.css';

function Syllabus({handleClick}) {

  const[syllabus, setSyllabus]= useState([]);

useEffect(()=>{
      const fetchSyllabus = async () => {
      try {
        const response = await apiGetToken('/getSyllabus')
        setSyllabus(response.data.data);
        
      } catch (error) {
        console.error('Error fetching syllabus:', error);
      }
    };

    fetchSyllabus();

},[])

  return (
       <>
      <section className="p-5 bg-light">
        <div className="container">
          <h1 className="fw-bold text-dark-blue mb-3">
            Discover Our DGCA Question Banks
          </h1>
          <p className="text-muted fs-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus in libero risus semper habitant arcu eget.
          </p>
        </div>
      </section>
      <div className="container mb-5" >
        <div className="course-grid-container" style={{display:'flex', gap:'50px'}}>
          {syllabus.map((course, index) => (
            <div className="course-card" key={index}>
              <div className="course-image">
                <img src={course.imageUrl} alt={course.title} />
              </div>
              <div className="course-content">
                <h4 style={{fontWeight:'bold'}}>{course.title}</h4>
                <p style={{color:'#EAB308'}}>{course.category}</p>
                <button className="start-btn" onClick={()=> handleClick(course.title)}>Start</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Syllabus;