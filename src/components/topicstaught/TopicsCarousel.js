import React from 'react';
import './TopicsCarousel.css';

const dsaTopics = [
  'Arrays', 
  'Linked Lists', 
  'Stacks', 
  'Queues', 
  'Hash Tables', 
  'Trees', 
  'Graphs', 
  'Heaps', 
  'Dynamic Programming', 
  'Greedy Algorithms'
];

const devTopics = [
  'React Hooks', 
  'Redux', 
  'Component Lifecycle', 
  'Context API', 
  'Custom Hooks', 
  'React Router', 
  'Error Boundaries', 
  'Performance Optimization', 
  'Server-Side Rendering', 
  'Static Site Generation'
];

const cloudTopics = [
  'AWS EC2', 
  'S3 Storage', 
  'Lambda Functions', 
  'DynamoDB', 
  'RDS', 
  'CloudFormation', 
  'ECS', 
  'EKS', 
  'CloudWatch', 
  'IAM Roles'
];

const TopicsCarousel = ({ theme }) => {
  const containerClass = `carousel-container ${theme === 'light' ? 'light-mode' : ''}`;

  return (
    <div className={containerClass}>
      <div className="carousel-track left-to-right">
        {dsaTopics.concat(dsaTopics).map((topic, index) => (
          <div key={index} className="carousel-item">{topic}</div>
        ))}
      </div>
      <div className="carousel-track right-to-left">
        {devTopics.concat(devTopics).map((topic, index) => (
          <div key={index} className="carousel-item">{topic}</div>
        ))}
      </div>
      <div className="carousel-track left-to-right">
        {cloudTopics.concat(cloudTopics).map((topic, index) => (
          <div key={index} className="carousel-item">{topic}</div>
        ))}
      </div>
    </div>
  );
};

export default TopicsCarousel;
