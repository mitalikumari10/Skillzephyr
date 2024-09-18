// src/pages/Homepage.js
import React, { useState, useEffect, useRef } from 'react';
import { useTypewriter } from 'react-simple-typewriter';
import './Homepage.css';
import Slider from 'react-slick';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TopicsCarousel from '../topicstaught/TopicsCarousel';
import CoreOfferings from '../coreoffering/CoreOfferings';
import ImageCarousel from '../companies/ImageCarousel';
import StudentReviews from '../reviews/StudentReviews';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import ParticlesComponent from '../particles';

function Homepage() {
  const [text] = useTypewriter({
    words: ['Data Structures & Algorithms', 'AWS Cloud Development', 'MERN Stack Development'],
    loop: true,
    typeSpeed: 50,
    deleteSpeed: 50,
  });

  const [activeSlide, setActiveSlide] = useState(1);
  const [slide2Movies, setSlide2Movies] = useState([]);
  const [playingSlide2Trailer, setPlayingSlide2Trailer] = useState(null);
  const [muted, setMuted] = useState(true);
  const slide2VideoRefs = useRef([]);
  const navigate = useNavigate();
  const [isDarkMode] = useState(true);

  useEffect(() => {
    const fetchSlide2Movies = async () => {
      try {
        const response = await axios.get('https://tm71vy3a35.execute-api.us-east-1.amazonaws.com/dev/homepage');
        setSlide2Movies(response.data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };
    fetchSlide2Movies();
  }, []);

  useEffect(() => {
    slide2VideoRefs.current.forEach((video) => {
      if (video) {
        video.muted = muted;
      }
    });
  }, [muted]);

  const slide2Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    beforeChange: () => {
      setPlayingSlide2Trailer(null);
    }
  };

  const handleSlide2VolumeToggle = () => {
    setMuted(prevMuted => !prevMuted);
  };

  const handleStartLearning = (courseId) => {
    navigate(`/coursecontent/${courseId}`);
  };

  const handleMouseEnter = (index) => {
    setPlayingSlide2Trailer(index);
  };

  const handleMouseLeave = () => {
    setPlayingSlide2Trailer(null);
  };

  const determineCurrentSlide = () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition < window.innerHeight) {
      return 1;
    } else if (scrollPosition < 2 * window.innerHeight) {
      return 2;
    } else {
      return 3; // Adjust for additional slides
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentSlide = determineCurrentSlide();
      setActiveSlide(currentSlide);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='homepage'>
      {/* Slide 1 */}
      <div className='slide1'>
      {activeSlide === 1 && <ParticlesComponent theme={isDarkMode ? 'dark' : 'light'} />}
        <div className="greeting">WELCOME,</div>
        <div className="staticc">Want to be a Great Developer?</div>
        <div className="static">Learn </div><span>{text}</span>
      </div>

      {/* Slide 2 */}
      <div className='slide2'>
        <div className='headingg'>OUR BEST COURSES</div>
        <Slider {...slide2Settings} style={{ width: '90%', margin: '0 auto' }}>
          {slide2Movies.map((movie, index) => (
            <div
              key={index}
              className="carousel-slide"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <div className="carousel-content">
                <div className="movie-container">
                  <div className="movie-details">
                    <h2>{movie.courseDetails.name}</h2>
                    <p>{movie.courseDetails.ageRating}</p>
                    <button onClick={() => handleStartLearning(movie.courseId)}>Start Learning</button>
                  </div>
                  <div className="movie-banner">
                    {playingSlide2Trailer === index ? (
                      <div className="video-overlay-container">
                        <video
                          ref={(el) => (slide2VideoRefs.current[index] = el)}
                          src={movie.trailer}
                          autoPlay
                          muted={muted}
                          className="video-content"
                        />
                        <div className="fade-bottom"></div>
                        <div className="fade-left"></div>
                        <button className='mute-btn' onClick={handleSlide2VolumeToggle}>
                          {muted ? (
                            <i className="fas fa-volume-mute"></i>
                          ) : (
                            <i className="fas fa-volume-up"></i>
                          )}
                        </button>
                      </div>
                    ) : (
                      <img src={movie.banner} alt={movie.courseDetails.name} className="banner-content" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>

      {/* Slide 3 */}
      <div className='slide3'>
        <div className='headingg'>200+ TOPICS COVERED</div>
        <h3>Begin your learning journey with us today!</h3>
        <TopicsCarousel /> {/* For light mode */}
      </div>

      {/* Slide 4 */}
      <div className='slide4'>
        <div className='headingg'>CORE OFFERINGS</div>
        <CoreOfferings />
      </div>

      {/* Slide 5 */}
      <div className='slide5'>
        <div className='headingg'>TOP COMPANIES YOU CAN BE PLACED AT</div>
        <ImageCarousel />
      </div>

      {/* Slide 6 */}
      <div className='slide6'>
        <div className='headingg'>Our Student Testimonials</div>
        <StudentReviews />
      </div>

      <faq/>
    </div>
  );
}

export default Homepage;
