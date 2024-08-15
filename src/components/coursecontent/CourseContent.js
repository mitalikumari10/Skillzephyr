import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CourseContent.css';
import ImageCarousel from '../companies/ImageCarousel';
import StudentReviews from '../reviews/StudentReviews';
import FAQAccordion from '../faq/FAQAccordion';

const CourseContent = () => {
    const { courseId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
 

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await axios.get('https://sgqwlraw02.execute-api.us-east-1.amazonaws.com/dev/items');
                const selectedCourse = response.data.find(course => course.movieId === courseId);
                if (selectedCourse) {
                    setCourseData(selectedCourse);
                } else {
                    setError('Course not found');
                }
                setLoading(false);
            } catch (err) {
                setError('Error fetching course data');
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [courseId]);

  

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className="course-content">
                <div className="course-details">
                    <h1 className="course-name">{courseData.movieDetails.name}</h1>
                    <ul className="course-features">
                        {courseData.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                    <div className="course-info">
                        <p className="course-price">Price: ${courseData.price}</p>
                        <p className="course-validity">{courseData.validity} validity</p>
                        <button className="enroll-button">Enroll Now</button>
                    </div>
                </div>
                <div className="course-trailer">
                    <video controls>
                        <source src={courseData.trailer} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            <div className='otherstuff'>
                <div className='second'>
                    <h2>Mission</h2>
                    <p>{courseData.mission}</p>
                </div>
                <div className='third'>
                    <h2>Who This Course Is For</h2>
                    <div className="course-for-cards">
                        {courseData.courseFor.collegeStudents && (
                            <div className="course-for-card">
                                <p><strong>College Students:</strong> {courseData.courseFor.collegeStudents}</p>
                            </div>
                        )}
                        {courseData.courseFor.earlyEngineers && (
                            <div className="course-for-card">
                                <p><strong>Early Engineers:</strong> {courseData.courseFor.earlyEngineers}</p>
                            </div>
                        )}
                        {courseData.courseFor.seniorEngineers && (
                            <div className="course-for-card">
                                <p><strong>Senior Engineers:</strong> {courseData.courseFor.seniorEngineers}</p>
                            </div>
                        )}
                    </div>
                </div>
                <div className="forth">
                    <h2>Perks and Benefits</h2>
                    <div className="perks-and-benefits-cards">
                        {courseData.perksAndBenefits.map((perk, index) => (
                            <div className="perks-and-benefits-card" key={index}>
                                <p>{perk}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="fifth">
                    <h2>Learnings</h2>
                    <ul className="learnings-list">
                        {courseData.learnings.map((learning, index) => (
                            <li className="learning-item" key={index}>{learning}</li>
                        ))}
                    </ul>
                </div>
                <FAQAccordion />
                <ImageCarousel />
                <StudentReviews />
            </div>
        </div>
    );
};

export default CourseContent;
