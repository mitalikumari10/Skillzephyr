import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FAQAccordion.css';

const FAQAccordion = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCourseIndex, setSelectedCourseIndex] = useState(0); // Default to the first course

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get('https://tm71vy3a35.execute-api.us-east-1.amazonaws.com/dev/items');
                setCourses(response.data);
                console.log('Courses Data:', response.data);
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };

        fetchCourses();
    }, []);

    const [activeIndexes, setActiveIndexes] = useState({});

    const toggleFAQ = (faqIndex) => {
        setActiveIndexes(prevActiveIndexes => ({
            ...prevActiveIndexes,
            [faqIndex]: prevActiveIndexes[faqIndex] === faqIndex ? null : faqIndex
        }));
    };

    const handleCourseSelection = (courseIndex) => {
        setSelectedCourseIndex(courseIndex);
    };

    return (
        <div className="faq-container">
            <h2 className="faq">Frequently Asked Questions</h2>
            <div className="course-selector">
                {courses.map((course, courseIndex) => (
                    <button
                        key={course.movieId}
                        className={`course-button ${selectedCourseIndex === courseIndex ? 'active' : ''}`}
                        onClick={() => handleCourseSelection(courseIndex)}
                    >
                        {course.courseDetails.name}
                    </button>
                ))}
            </div>
            {courses[selectedCourseIndex] && (
                <div className="course-faq">
                    <h3>{courses[selectedCourseIndex].courseDetails.name}</h3>
                    <ul className="faq-list">
                        {courses[selectedCourseIndex].FAQ.map((faq, faqIndex) => (
                            <li key={faqIndex} className="faq-item">
                                <input
                                    type="checkbox"
                                    id={`faq-${faqIndex}`}
                                    checked={activeIndexes[faqIndex] === faqIndex}
                                    onChange={() => toggleFAQ(faqIndex)}
                                />
                                <label htmlFor={`faq-${faqIndex}`}>
                                    <div className="faq-question">{faq.question}</div>
                                    <span className={`faq-icon ${activeIndexes[faqIndex] === faqIndex ? 'open' : ''}`}>+</span>
                                </label>
                                <div className={`content ${activeIndexes[faqIndex] === faqIndex ? 'open' : ''}`}>
                                    <p>{faq.answer}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default FAQAccordion;
