import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CourseContent.css';
import ImageCarousel from '../companies/ImageCarousel';
import StudentReviews from '../reviews/StudentReviews';
import FAQAccordion from '../faq/FAQAccordion';

const CourseContent = () => {
    const { cId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await axios.get('https://tm71vy3a35.execute-api.us-east-1.amazonaws.com/dev/items');
                const selectedCourse = response.data.find(course => course.courseId === cId);
                if (selectedCourse) {
                    setCourseData(selectedCourse);
                } else {
                    setError('Course not found');
                }
            } catch (err) {
                setError('Error fetching course data');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [cId]);

    const handleEnroll = async () => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            navigate('/login');
            return;
        }

        const token = localStorage.getItem('jwtToken');

        try {
            const orderResponse = await axios.post('https://tm71vy3a35.execute-api.us-east-1.amazonaws.com/dev/create-payment-order', {
                amount: courseData.price,
                currency: 'INR',
                receipt: `${user.username}_${cId}`
            }, {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            const options = {
                key: 'rzp_test_v2477Ctg5BxIwp', // Replace with your Razorpay key
                amount: courseData.price * 100, // Razorpay amount is in paise
                currency: 'INR',
                name: courseData.courseDetails.name,
                description: 'Course Enrollment',
                image: courseData.trailer,
                order_id: orderResponse.data.orderId,
                handler: async function (response) {
                    await axios.post('https://tm71vy3a35.execute-api.us-east-1.amazonaws.com/dev/verify-payment', {
                        razorpay_order_id: response.razorpay_order_id,
                        razorpay_payment_id: response.razorpay_payment_id,
                        razorpay_signature: response.razorpay_signature,
                        courseId: cId,
                        username: user.username
                    }, {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });

                    navigate(`/profile`);
                },
                prefill: {
                    name: user.username,
                    email: user.email,
                },
                theme: {
                    color: '#3399cc'
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Error during payment:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <div className="course-content">
                <div className="course-details">
                    <h1 className="course-name">{courseData.courseDetails.name}</h1>
                    <ul className="course-features">
                        {courseData.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                        ))}
                    </ul>
                    <div className="course-info">
                        <p className="course-price">Price: ${courseData.price}</p>
                        <p className="course-validity">{courseData.validity} validity</p>
                        <button className="enroll-button" onClick={handleEnroll}>Enroll Now</button>
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
                <div className='carousell'>
                    <div className='headinggg'>TOP COMPANIES YOU CAN BE PLACED AT</div>
                    <ImageCarousel />
                </div>

                <div className='reviews'>
                    <div className='headinggg'>Our Student Testimonials</div>
                    <StudentReviews />
                </div>
            </div>
        </div>
    );
};

export default CourseContent;
