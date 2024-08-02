import React from 'react';
import axios from 'axios';

const RentalButton = ({ movieId }) => {
  const handleRent = async () => {
    try {
      await axios.post(`/api/rent`, { movieId });
      // Show success message or update state
    } catch (error) {
      console.error('Error renting movie', error);
    }
  };

  return <button onClick={handleRent}>Rent Movie</button>;
};

export default RentalButton;
