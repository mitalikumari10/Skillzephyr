import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TrailerPlayer from './TrailerPlayer';
import RentalButton from './RentalButton';

const MovieDetails = ({ match }) => {
  const [movie, setMovie] = useState(null);
  const movieId = match.params.movieId;

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`/api/movies/${movieId}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details', error);
      }
    };

    fetchMovie();
  }, [movieId]);

  return (
    <div>
      {movie ? (
        <div>
          <h2>{movie.title}</h2>
          <p>{movie.description}</p>
          <TrailerPlayer trailerUrl={movie.trailerUrl} />
          <RentalButton movieId={movieId} />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default MovieDetails;
