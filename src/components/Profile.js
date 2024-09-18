import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Import the CSS file

const Profile = () => {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('https://tm71vy3a35.execute-api.us-east-1.amazonaws.com/dev/user/profile', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const userData = response.data;
        setUser({
          username: userData.username,
          email: userData.email
        });

        const courseIds = userData.coursesPurchased.map(course => course.courseId);
        fetchCourses(courseIds);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    const fetchCourses = async (courseIds) => {
      try {
        const coursesPromises = courseIds.map(courseId =>
          axios.get(`https://tm71vy3a35.execute-api.us-east-1.amazonaws.com/dev/items/${courseId}`)
        );
        const coursesResponses = await Promise.all(coursesPromises);
        const coursesData = coursesResponses.map(response => response.data);
        setEnrolledCourses(coursesData);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('jwtToken');
    setUser(null);
    setEnrolledCourses([]);
    navigate('/login');
  };

  return (
    <div className="profile-container">
      {user ? (
        <>
          <div className="profile-header">
            <h2>{user.username}'s Profile</h2>
          </div>
          <div className="profile-info">
            <p>Email: {user.email}</p>
          </div>
          <div className="enrolled-courses">
            <h3>Enrolled Courses</h3>
            <ul>
              {enrolledCourses.length > 0 ? (
                enrolledCourses.map(course => (
                  <li key={course.courseId}>{course.courseDetails.name}</li>
                ))
              ) : (
                <p>No enrolled courses yet.</p>
              )}
            </ul>
          </div>
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
