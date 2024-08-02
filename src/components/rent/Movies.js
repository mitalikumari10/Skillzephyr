// src/components/movies/Movies.js
import React, { useState, useRef } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css"; 
import './Movies.css'; // Import the CSS file for styling
import movie1 from "./moviesbanner/movie1.avif";
import movie2 from "./moviesbanner/movie2.avif";
import movie3 from"./moviesbanner/movie3.jpg";
import movie4 from "./moviesbanner/movie4.avif";
import movie5 from "./moviesbanner/movie5.webp";

const Movies = ({ movies }) => {
  const [playingTrailer, setPlayingTrailer] = useState(null);
  const videoRefs = useRef([]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    beforeChange: () => {
      setPlayingTrailer(null); // Stop any playing trailer
    },
    afterChange: (index) => {
      setTimeout(() => setPlayingTrailer(index), 2000); // Start trailer after 2 seconds
    }
  };

  const handleVolumeToggle = (index) => {
    const video = videoRefs.current[index];
    video.muted = !video.muted;
  };

  return (
    <div>
<Slider {...settings} style={{ width: '90%', margin: '0 auto' }}>
      {movies.map((movie, index) => (
        <div key={index} className="carousel-slide">
          <div className="carousel-content">
            <div className="movie-container">
              <div className="movie-details">
                <h2>{movie.name}</h2>
                <p>{movie.ageRating}</p>
                <button onClick={() => alert('More details')}>More Details</button>
              </div>
              <div className="movie-banner">
                {playingTrailer === index ? (
                  <div className="video-overlay-container">
                    <video
                      ref={(el) => (videoRefs.current[index] = el)}
                      src={movie.trailer}
                      autoPlay
                      muted
                      className="video-content"
                    />
                    <div className="fade-bottom"></div>
                    <div className="fade-left"></div>
                    <button onClick={() => handleVolumeToggle(index)}>
                      {videoRefs.current[index]?.muted ? 'Unmute' : 'Mute'}
                    </button>
                  </div>
                ) : (
                  <img src={movie.banner} alt={movie.name} className="banner-content" />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
    <h1 className='topmovies'>Top Movies</h1>
          <div className='movieCards'>
            <div className='movieCard1'>
            <img src={movie1} alt='img'/>
            <h3>Sitaramam</h3>
          <div className='timerate'>
            <h3>5</h3>
            <h3>80 mins</h3>
          </div>
            <h4>Action,drama,romance</h4>
            </div>
           
            <div className='movieCard2'>
            <img src={movie2} alt='img'/>
            <h3>Aazam</h3>
          <div className='timerate'>
            <h3>4</h3>
            <h3>70 mins</h3>
          </div>
            <h4>Action,drama</h4>
            </div>

            <div className='movieCard3'>
            <img src={movie3} alt='img'/>
            <h3>Avtaar 3</h3>
          <div className='timerate'>
            <h3>5</h3>
            <h3>100 mins</h3>
          </div>
            <h4>Action,drama,romance</h4>
            </div>

            <div className='movieCard4'>
            <img src={movie4} alt='img'/>
            <h3>Fast And Furious</h3>
          <div className='timerate'>
            <h3>5</h3>
            <h3>80 mins</h3>
          </div>
            <h4>Action,drama,romance</h4>
            </div>

            <div className='movieCard5'>
            <img src={movie5} alt='img'/>
            <h3>Sitaramam</h3>
          <div className='timerate'>
            <h3>5</h3>
            <h3>80 mins</h3>
          </div>
            <h4>Action,drama,romance</h4>
            </div>

            <div className='movieCard1'>
            <img src={movie1} alt='img'/>
            <h3>Sitaramam</h3>
          <div className='timerate'>
            <h3>5</h3>
            <h3>80 mins</h3>
          </div>
            <h4>Action,drama,romance</h4>
            </div>
           
            <div className='movieCard2'>
            <img src={movie2} alt='img'/>
            <h3>Aazam</h3>
          <div className='timerate'>
            <h3>4</h3>
            <h3>70 mins</h3>
          </div>
            <h4>Action,drama</h4>
            </div>

            <div className='movieCard3'>
            <img src={movie3} alt='img'/>
            <h3>Avtaar 3</h3>
          <div className='timerate'>
            <h3>5</h3>
            <h3>100 mins</h3>
          </div>
            <h4>Action,drama,romance</h4>
            </div>



          </div>
          </div>
        );
      };


export default Movies;
