import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './components/homepage/Homepage';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import Login from './components/login/Login';
import Profile from './components/profile/Profile';
import CourseContent from './components/coursecontent/CourseContent';
import TermsAndConditions from './components/tc/TermsAndConditions';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
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
