import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CourseContent.css';
import ImageCarousel from '../companies/ImageCarousel';
import StudentReviews from '../reviews/StudentReviews';
import FAQAccordion from '../faq/FAQAccordion';
import { Context } from '../..';

const CourseContent = () => {
    const { cId } = useParams();
    const [courseData, setCourseData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [buttonText, setButtonText] = useState('Enroll Now');
    const [presignedUrl, setPresignedUrl] = useState(null);
    const { isauthenticated, user } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourseData = async () => {
            try {
                const response = await axios.post(
                    'https://27977u1eql.execute-api.us-east-1.amazonaws.com/dev/course',
                    { courseId: cId },
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );

                const data = response.data;
                setCourseData(data);

                // Update button and presigned URL if the course is still valid
                if (data.presignedUrl) {
                    setButtonText('Launch');
                    setPresignedUrl(data.presignedUrl);
                } else {
                    setButtonText('Enroll Now');
                }
            } catch (err) {
                console.error('Error fetching course data:', err);
                setError('Failed to load course data. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchCourseData();
    }, [cId]);

    const handlePayment = async () => {
        if (!isauthenticated) {
            alert('You need to be logged in to enroll in this course.');
            navigate('/login');
            return;
        }

        try {
            const orderResponse = await axios.post(
                'https://27977u1eql.execute-api.us-east-1.amazonaws.com/dev/create-payment-order',
                {
                    amount: courseData.price * 100,
                    currency: 'INR',
                    receipt: `${user.username}_${cId}`
                },
                { withCredentials: true }
            );

            const options = {
                key: 'rzp_test_v2477Ctg5BxIwp',
                amount: courseData.price * 100,
                currency: 'INR',
                name: courseData.courseDetails.name,
                description: 'Course Enrollment',
                image: courseData.trailer,
                order_id: orderResponse.data.orderId,
                handler: async function (response) {
                    try {
                        const verificationData = {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            courseId: cId,
                        };

                        const verifyResponse = await axios.post(
                            'https://27977u1eql.execute-api.us-east-1.amazonaws.com/dev/verify-payment',
                            verificationData,
                            { withCredentials: true }
                        );

                        if (verifyResponse.status === 200) {
                            alert('Payment verified successfully!');
                            setPresignedUrl(verifyResponse.data.presignedUrl);
                            setButtonText('Launch');
                        } else {
                            alert('Payment verification failed!');
                        }
                    } catch (error) {
                        console.error('Payment verification error:', error);
                        alert('Failed to verify payment.');
                    }
                },
                prefill: {
                    name: user.username,
                    email: user.email
                },
                theme: {
                    color: '#3399cc'
                }
            };

            const paymentObject = new window.Razorpay(options);
            paymentObject.open();
        } catch (error) {
            console.error('Error during payment:', error);
            alert('Error initiating payment. Please try again.');
        }
    };

    const handleButtonClick = () => {
        if (buttonText === 'Launch' && presignedUrl) {
            if (!isauthenticated) {
                alert('You need to log in to access the course.');
                navigate('/login');
            } else {
                window.open(presignedUrl, '_blank');
            }
        } else if (buttonText === 'Enroll Now') {
            handlePayment();
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
                        <p className="course-price">Price: ₹{courseData.price}</p>
                        <p className="course-validity">
                            Valid until: {new Date(courseData.validity).toLocaleDateString()}
                        </p>
                        <button onClick={handleButtonClick}>
                            {buttonText}
                        </button>
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
