import React, { useState, useEffect, useRef } from 'react';
import Slider from 'react-slick';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Movies.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [playingTrailer, setPlayingTrailer] = useState(null);
  const videoRefs = useRef([]);
  const [user, setUser] = useState(null); // User state for authentication

  useEffect(() => {
    // Fetch movies from your API
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://oyjf02ykcf.execute-api.us-east-1.amazonaws.com/dev/items');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movie data:', error);
      }
    };

    // Fetch current authenticated user
    const fetchUser = async () => {
      try {
        const user = await Auth.currentAuthenticatedUser();
        setUser(user);
      } catch (error) {
        console.error('Error fetching authenticated user', error);
      }
    };

    fetchMovies();
    fetchUser();
  }, []);

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

  const handleRent = async (movieId) => {
    if (!user) {
      alert('Please log in to rent a movie');
      return;
    }

    try {
      // Initiate payment on your server
      const response = await axios.post('/api/initiatePayment', { movieId, userId: user.username });
      const { orderId, amount } = response.data;

      const options = {
        key: 'YOUR_RAZORPAY_KEY', // Replace with your Razorpay key
        amount: amount,
        currency: 'INR',
        name: 'Movie Rental',
        description: 'Rent movie',
        order_id: orderId,
        handler: async (response) => {
          // Handle payment success
          try {
            await axios.post('/api/paymentSuccess', {
              movieId,
              userId: user.username,
              paymentId: response.razorpay_payment_id
            });
            alert('Payment successful, you can now stream the movie');
          } catch (error) {
            console.error('Error handling payment success', error);
          }
        },
        prefill: {
          name: user.attributes.name,
          email: user.attributes.email,
          contact: '9999999999'
        },
        theme: {
          color: '#F37254'
        }
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error('Error initiating payment', error);
    }
  };

  return (
    <div>
      <Slider {...settings} style={{ width: '90%', margin: '0 auto' }}>
        {movies.map((movie, index) => (
          <div key={index} className="carousel-slide">
            <div className="carousel-content">
              <div className="movie-container">
                <div className="movie-details">
                  <h2>{movie.movieDetails.name}</h2>
                  <p>{movie.movieDetails.ageRating}</p>
                  <button onClick={() => alert('More details')}>More Details</button>
                  <button onClick={() => handleRent(movie.movieId)}>Rent</button>
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
                      <button className='mutebtn' onClick={() => handleVolumeToggle(index)}>
                        {videoRefs.current[index]?.muted ? 'Unmute' : 'Mute'}
                      </button>
                    </div>
                  ) : (
                    <img src={movie.banner} alt={movie.movieDetails.name} className="banner-content" />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <h1 className='topmovies'>Top Movies</h1>
      <div className='movieCards'>
        {movies.map((movie, index) => (
          <div key={index} className='movieCard'>
            <img src={movie.banner} alt={movie.movieDetails.name} />
            <div className='movieCardDetails'>
              <h3>{movie.movieDetails.name}</h3>
              <div className='timerate'>
                <p>Rating: {movie.movieDetails.ageRating}</p>
                <p>{movie.movieDetails.duration}</p>
              </div>
              <h4>{movie.movieDetails.genres.join(', ')}</h4>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Movies;
