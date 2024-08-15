import React from 'react';
import './StudentReviews.css';

const reviews = [
  {
    name: 'John Doe',
    profilePic: 'https://via.placeholder.com/50',
    review: 'This course has been a game-changer for me. The project-based learning helped me apply what I learned in real-world scenarios.'
  },
  {
    name: 'Jane Smith',
    profilePic: 'https://via.placeholder.com/50',
    review: 'The expert guidance and comprehensive curriculum made this course worth every penny. Highly recommended!'
  },
  {
    name: 'Alice Johnson',
    profilePic: 'https://via.placeholder.com/50',
    review: 'I appreciated the flexibility of learning at my own pace. The assignments were challenging and rewarding.'
  },
  {
    name: 'Bob Brown',
    profilePic: 'https://via.placeholder.com/50',
    review: 'The community support and high-quality videos were invaluable. I gained a lot of practical knowledge from this course.'
  },
];

const StudentReviews = () => {
  return (
    <div className="reviews-container">
      {reviews.map((review, index) => (
        <div key={index} className="review-box">
          <img src={review.profilePic} alt={`profile-${index}`} className="profile-pic" />
          <div className="review-content">
            <h4 className="reviewer-name">{review.name}</h4>
            <p className="review-text">{review.review}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StudentReviews;
