import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);

    const fetchCourses = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await axios.get('https://tm71vy3a35.execute-api.us-east-1.amazonaws.com/dev/items', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses', error);
      }
    };

    if (storedUser) {
      fetchCourses();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('jwtToken');
    setUser(null);
    setCourses([]);
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <div>
      {user ? (
        <div>
          <h2>{user.username}'s Profile</h2>
          <p>Email: {user.email}</p>
          <h3>Enrolled Courses</h3>
          <ul>
            {courses.map(course => (
              <li key={course.courseId}>{course.courseName}</li>
            ))}
          </ul>
          <button onClick={handleLogout}>Logout</button> {/* Add the logout button */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
