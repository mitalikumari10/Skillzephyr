import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     console.log('Local Storage on fetch:', localStorage);

  //     // Retrieve and parse user data
  //     const userDataStr = localStorage.getItem('user');
  //     const token = localStorage.getItem('jwtToken'); // Updated key

  //     console.log('User data from local storage:', userDataStr);
  //     console.log('Token from local storage:', token);

  //     if (!userDataStr || !token) {
  //       setError('User not logged in.');
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       // Parse user data
  //       const { username } = JSON.parse(userDataStr);

  //       // Fetch user data from backend
  //       const response = await axios.get('https://tm71vy3a35.execute-api.us-east-1.amazonaws.com/dev/profile', {
  //         headers: {
  //           'Authorization': `Bearer ${token}`,
  //         },
  //         params: {
  //           username,
  //         },
  //       });

  //       if (response.status === 200) {
  //         setUserData(response.data);
  //       } else {
  //         setError('Error fetching user data.');
  //       }
  //     } catch (err) {
  //       setError(`Error fetching user data: ${err.message}`);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!userData) {
    return <div>No user data available.</div>;
  }

  const { username, email, coursesPurchased } = userData;

  return (
    <div>
      <h2>Profile</h2>
      <p><strong>Username:</strong> {username}</p>
      <p><strong>Email:</strong> {email || 'No email provided'}</p>
     
      {coursesPurchased && coursesPurchased.length > 0 ? (
        <ul>
          {coursesPurchased.map((course, index) => (
            <li key={index}>
              <p><strong>Course Name:</strong> {course.courseName}</p>
              <p><strong>Course ID:</strong> {course.courseId}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No courses purchased yet.</p>
      )}
    </div>
  );
};

export default Profile;
