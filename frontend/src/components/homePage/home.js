import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get('/api/locations');
        setLocations(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLocations();
  }, []);

  return (
    <div>
      <h1>Locations</h1>
      <ul>
        {locations.map(location => (
          <li key={location.id}>
            <h2>{location.Name}</h2>
            <p>{location.Address}</p>
            <p>{location.Phone}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
