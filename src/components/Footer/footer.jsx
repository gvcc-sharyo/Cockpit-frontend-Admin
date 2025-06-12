import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './footer.css'; 
import { Link } from 'react-router-dom';

function FooterSection() {
  return (
    <footer className="bg-dark-blue text-white pt-5 pb-3">
      <div className="container">
        <div className="row text-center text-md-start">
          <div className="col-md-4 mb-4">
            <h3 className="logo-text">
              <img src="images/logo.png" alt="plane" className="plane-icon" />
            </h3>
            <p className="fs-4">RUNWAY TO SKY</p>
          </div>

          <div className="col-md-2 mb-4">
            <h5 className="text-warning">Resources</h5>
            <p>Press</p>
            <p>FAQ</p>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="text-warning">Platforms</h5>
            <p >  <Link to='/' className='link-text'>Home</Link> </p>
            <p> <Link to="/training" className='link-text'>Training</Link></p>
            <p> <Link to="/test" className='link-text'> Test</Link></p>
            <p>Syllabus</p>
          </div>

          <div className="col-md-3 mb-4">
            <h5 className="text-warning">CONTACT US</h5>
            <p>Tel: + (91) 0000000000</p>
            <p>Mail: support@gmail.com</p>
            <div className="d-flex gap-3 mt-2 justify-content-center justify-content-md-start">



            </div>
          </div>
        </div>

        <hr className="border-light" />
        <p className="text-center small mt-3">
          Made For aviators with ❤️ to see them in cockpit one day | copyright © 2025{' '}
          <span className="text-warning">cockpit</span> inc. all rights reserved
        </p>
      </div>
    </footer>
  );
}
export default FooterSection;