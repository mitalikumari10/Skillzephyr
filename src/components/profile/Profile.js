import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userResponse = await axios.get('/api/user');
        setUser(userResponse.data);
        const rentalsResponse = await axios.get('/api/user/rentals');
        setRentals(rentalsResponse.data);
      } catch (error) {
        console.error('Error fetching profile', error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <h2>{user.username}'s Profile</h2>
          <h3>Rented Movies</h3>
          <ul>
            {rentals.map(rental => (
              <li key={rental.movieId}>{rental.movieTitle}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
