import React, { useState } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`/api/search?query=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error searching movies', error);
    }
  };

  return (
    <div>
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search movies..." />
      <button onClick={handleSearch}>Search</button>
      <div className="movie-grid">
        {results.map(movie => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Search;
