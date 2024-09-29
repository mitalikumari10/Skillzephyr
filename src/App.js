import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/homepage/Homepage';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import CourseContent from './components/coursecontent/CourseContent';
import TermsAndConditions from './components/tc/TermsAndConditions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Context } from '.';

function App() {
  const { setIsauthenticated, setUser } = useContext(Context);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          'https://27977u1eql.execute-api.us-east-1.amazonaws.com/dev/fetching',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Changed from 'Authorization' to 'application/json'
            },
            credentials: 'include', // Include cookies for authentication
          }
        );
        if (response.ok) {
          const data = await response.json();
          if (data.isAuthenticated) {
            setUser({
              username: data.user.username,
              email: data.user.email,
            });
            setIsauthenticated(true);
          } else {
            setUser({});
            setIsauthenticated(false);
          }
        } else {
          setUser({});
          setIsauthenticated(false);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser({});
        setIsauthenticated(false);
      }
    };

    fetchUserData();
  }, [setIsauthenticated, setUser]);

  useEffect(() => {
    const removeExpiredCourses = async () => {
      try {
        const response = await fetch(
          'https://27977u1eql.execute-api.us-east-1.amazonaws.com/dev/remove-expired-courses',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', // Ensure this matches server expectations
              // Include any other headers if needed, e.g., Authorization
            },
            credentials: 'include', // Include cookies if authentication is required
          }
        );

        // Log status and response text for debugging
        console.log(`Response Status: ${response.status}`);

        if (response.ok) {
          const data = await response.json();
          console.log('Expired courses removed:', data.message);
          toast.success('Expired courses removed successfully!');
        } else {
          const errorData = await response.json();
          console.error('Failed to remove expired courses.', errorData);
          toast.error(`Failed to remove expired courses: ${errorData.message || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error removing expired courses:', error);
        toast.error(`Error removing expired courses: ${error.message}`);
      }
    };

    removeExpiredCourses();
  }, []);

  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/coursecontent/:cId" element={<CourseContent />} />
          <Route path="/policy" element={<TermsAndConditions />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;
