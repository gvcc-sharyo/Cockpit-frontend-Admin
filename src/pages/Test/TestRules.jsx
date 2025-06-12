import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './test.css';
import Header from '../../components/Header/Header';
import FooterSection from '../../components/Footer/footer';
import { useLocation, useNavigate } from 'react-router-dom';
import { apiGet } from '../../api/axios';
import { useState, useEffect } from 'react';

function TestRules() {

    const location = useLocation();
    const syllabusTitle = location.state;

    const [books, setBooks] = useState([]);
    const [activeBook, setactiveBook] = useState('rk bali');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const response = await apiGet('/getBooks');
                setBooks(response.data.books);
            } catch (error) {
                console.error('Error fetching syllabus:', error);
            }
        };

        fetchBooks();

    }, [])

    const navigate = useNavigate();
    const handleClick = () => {
        const token = localStorage.getItem('authToken');

        if (token) {
            navigate('/testpage', { state: { activeBook, syllabusTitle } });
        } else {
            navigate('/profile');
        }
    };


    return (
        <>
            <Header />
            <h1>{syllabusTitle} question banks</h1>
            <ul className="nav nav-tabs custom-tabs">
                {books.map((book, index) => (
                    <li className="nav-item" key={index}>
                        <button
                            className={`nav-link ${activeBook === book.bookTitle ? 'active' : ''}`}
                            onClick={() => setactiveBook(book.bookTitle)}
                        >
                            {book.bookTitle}
                        </button>
                    </li>
                ))}
            </ul>

            <button onClick={handleClick}>Get started</button>
            <FooterSection />
        </>
    );
}

export default TestRules;