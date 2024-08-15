// CoreOfferings.jsx
import React from 'react';
import './CoreOfferings.css';

const offerings = [
  { title: 'Learn On Demand', description: 'Learn at your own pace, from anywhere in the world.' },
  { title: 'Expert Guidance', description: 'Learn everything from the best in the industry experts.' },
  { title: 'Certificate On Completion', description: 'After completing the course, you\'ll receive a certificate.' },
  { title: 'Closed Premium Community', description: 'Once enrolled in the course, get access to the premium NamasteDev community.' },
  { title: 'Project Based Learning', description: 'Learn everything from scratch by building super-cool projects.' },
  { title: 'In Depth High Quality Videos', description: 'Get access to all the high quality videos at your fingertips.' },
  { title: 'Assignments', description: 'Solve a lot of assignments, and become a better developer.' },
  { title: 'Comprehensive Curriculum', description: 'Make your way through with our latest and comprehensive curriculum.' },
];

const CoreOfferings = () => {
  return (
    <div className="offerings-container">
      {offerings.map((offering, index) => (
        <div key={index} className="offering-box">
          <h3 className="offering-title">{offering.title}</h3>
          <p className="offering-description">{offering.description}</p>
        </div>
      ))}
    </div>
  );
};

export default CoreOfferings;
