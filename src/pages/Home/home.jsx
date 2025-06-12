import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './home.css';
import Header from '../../components/Header/Header';
import FooterSection from '../../components/Footer/footer';
import { useNavigate } from 'react-router-dom';

function HomeSection() {

   const navigate = useNavigate();
   const handleClick = () => {
     navigate('/training');
   };

return (
<>
<Header/>
<section>
   <div className="hero-section text-center text-md-start mt-3">
      <div className="container py-5 mt-5 position-relative">
         <div className="row align-items-center">
            <div className="col-md-12">
               <h1 className="display-5 fw-bold text-primary-emphasis">
                  Build Your Skills With <br />
                  <span className="text-warning">COCKPIT</span> — Your Gateway To The Skies!
               </h1>
               <p className="banner-text mt-4">
                  Embark on your aviation journey with expert-led training and personalised learning. Whether
                  you’re a beginner or preparing for exams, we’ll help you soar higher.
               </p>
               <p className="fw-semibold">Ready for Takeoff?</p>
               <button className="btn-lg px-4 mt-2" onClick={handleClick}> Get Started</button>
            </div>
            <div className="col-md-12 text-center position-relative">
               <img src="/images/Plane.png" alt="Plane" className="img-fluid mt-4 plane-img" />
            </div>
         </div>
      </div>
   </div>
</section>
<section2>
   <div className="offer py-5 text-center">
      <div className="container">
         <h2 className="fw-bold text-warning mb-3">What We Deliver For Your Takeoff!</h2>
         <p className="mb-5 fs-5 text-dark">
            Unlock your potential with training and insights built for pilots, whether you’re just starting or aiming for the high skies
         </p>
         <div className="row g-4 text-start">
            <div className="col-md-6 col-lg-3">
               <div className="card h-100 shadow-sm border-0 rounded-4 p-3">
                  <div className="card-body">
                     <h5 className="card-title fw-bold mt-3">Latest Practice Material</h5>
                     <p className="card-text small text-muted mt-3 mb-3">
                        Dive into a rich collection of chapter-wise practice questions, updated regularly to cover the latest syllabus topics. Explore a variety of subjects with well-organized content designed to help you master each concept step-by-step.
                     </p>
                     <a href="#" className="fw-semibold text-dark text-decoration-none">Discover <span>&rarr;</span></a>
                  </div>
               </div>
            </div>
            <div className="col-md-6 col-lg-3">
               <div className="card h-100 shadow-sm border-0 rounded-4 p-3">
                  <div className="card-body">
                     <h5 className="card-title fw-bold mt-3">Realistic Practice Tests</h5>
                     <p className="card-text small text-muted mt-3 mb-3">
                        Experience exam-like tests that mimic real conditions, complete with a timer and a wide range of questions. After each test, get a detailed breakdown of your performance to boost your confidence and readiness.
                     </p>
                     <a href="#" className="fw-semibold text-dark text-decoration-none">Learn more <span>&rarr;</span></a>
                  </div>
               </div>
            </div>
            <div className="col-md-6 col-lg-3">
               <div className="card h-100 shadow-sm border-0 rounded-4 p-3">
                  <div className="card-body">
                     <h5 className="card-title fw-bold mt-3">Personalized Progress Tracking</h5>
                     <p className="card-text small text-muted mt-3 mb-3">
                        Monitor your learning journey with easy-to-read charts and graphs. Get tailored suggestions to improve your scores over time.
                     </p>
                     <a href="#" className="fw-semibold text-dark text-decoration-none">Learn more <span>&rarr;</span></a>
                  </div>
               </div>
            </div>
            <div className="col-md-6 col-lg-3">
               <div className="card h-100 shadow-sm border-0 rounded-4 p-3">
                  <div className="card-body">
                     <h5 className="card-title fw-bold mt-3">Be A Part Of Our Club</h5>
                     <p className="card-text small text-muted mt-3 mb-3">
                        Connect with a vibrant community of learners and educators. Ask doubts, share tips, and receive guidance for your exam preparation.
                     </p>
                     <a href="#" className="fw-semibold text-dark text-decoration-none">Discover <span>&rarr;</span></a>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
</section2>
<section className="py-5 mt-5 bg-light">
      <div className="container">
        <h2 className="text-center fw-bold mb-3">Frequently Asked Questions</h2>
        <p className="text-center text-muted mb-5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus in libero risus semper habitant arcu eget.
        </p>
        <div className='row'>
            <div className='col-md-2'></div>
            <div className='col-md-8'>
                <div className="accordion" id="faqAccordion">
                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingOne">
                    <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                    >
                        What Is Cockpit?
                    </button>
                    </h2>
                    <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#faqAccordion"
                    >
                    <div className="accordion-body text-muted fst-italic">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus in libero risus semper habitant arcu eget. 
                        Et integer facilisi Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingTwo">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseTwo"
                        aria-expanded="false"
                        aria-controls="collapseTwo"
                    >
                        What Is Cockpit?
                    </button>
                    </h2>
                    <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#faqAccordion"
                    >
                    <div className="accordion-body text-muted fst-italic">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus in libero risus semper habitant arcu eget.
                    </div>
                    </div>
                </div>

                <div className="accordion-item">
                    <h2 className="accordion-header" id="headingThree">
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                    >
                        What Is Cockpit?
                    </button>
                    </h2>
                    <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    aria-labelledby="headingThree"
                    data-bs-parent="#faqAccordion"
                    >
                    <div className="accordion-body text-muted fst-italic">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Faucibus in libero risus semper habitant arcu eget.
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className='col-md-2'></div>
        </div>
      </div>
    </section>

    <FooterSection/>
</>
);
}
export default HomeSection;