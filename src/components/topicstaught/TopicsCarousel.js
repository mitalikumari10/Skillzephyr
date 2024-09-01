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
  'Greedy Algorithms',
  'Recursion',
  'Binary Search',
  'Breadth-First Search',
  'Depth-First Search',
  'Backtracking',
  'Divide and Conquer',
  'Sorting Algorithms',
  'Searching Algorithms',
  'Bit Manipulation',
  'Trie',
  'Segment Trees',
  'Fenwick Trees',
  'Disjoint Set',
  'Graph Coloring',
  'Kruskal\'s Algorithm',
  'Prim\'s Algorithm',
  'Bellman-Ford Algorithm',
  'Dijkstra\'s Algorithm',
  'Floyd-Warshall Algorithm',
  'Knapsack Problem',
  'Longest Common Subsequence',
  'Minimum Spanning Tree',
  'Max Flow',
  'Topological Sort',
  'Union-Find',
  'AVL Trees',
  'Binary Search Trees',
  'Red-Black Trees',
  'B-Trees',
  'Ternary Search'
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
  'Static Site Generation',
  'JavaScript ES6',
  'TypeScript',
  'State Management',
  'Prop Drilling',
  'Memoization',
  'React Fragments',
  'Portals',
  'Lazy Loading',
  'React Suspense',
  'Code Splitting',
 
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
  'IAM Roles',
  'Elastic Beanstalk',
  'VPC',
  'AWS CloudFront',
  'SQS',
  'SNS',
  'API Gateway',
  'Route 53',
  'AWS Kinesis',
  'AWS Glue',
  'AWS Athena',
  'AWS Redshift',
  'AWS CodePipeline',
  'AWS CodeBuild',
  'AWS CodeDeploy',
  'Elastic Load Balancing',
  'Auto Scaling',
  'AWS OpsWorks',
  'AWS Transit Gateway',
  'AWS App Mesh',
  'AWS CloudTrail',
  'AWS Config',
  'AWS Elasticache',
  'AWS Step Functions',
  'AWS Secrets Manager',
  'AWS Key Management Service (KMS)',
  'AWS Simple Email Service (SES)',
  'AWS Elastic Transcoder',
  'AWS Data Pipeline',
  'AWS Fargate'
];


const TopicsCarousel = ({ theme }) => {
  const containerClass = `carousel-container ${theme === 'light' ? 'light-mode' : ''}`;

  return (
    <div className={containerClass}>

      <div className='carousel-wrapper'>


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
      

    </div>
  );
};

export default TopicsCarousel;
