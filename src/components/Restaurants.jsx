import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../components/Restaurant.css';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [locations, setLocations] = useState([]);
  const [cuisines, setCuisines] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    cuisine: '',
    minRating:''//add rating filter
  });
  
  const itemsPerPage = 8;

  useEffect(() => {
    fetchRestaurants();
  }, [filters]);

  const fetchRestaurants = async () => {
    try {
      const response = await axios.get('http://localhost:3000/restaurants');
      console.log('Restaurant data:', response.data);
      
      //Filter the restaurant based on selected criteria
      let filteredRestaurants = response.data;

      if (filters.location){
        filteredRestaurants = filteredRestaurants.filter(restaurant => restaurant.location === filters.location);
      }
      if (filters.cuisine) {
        filteredRestaurants = filteredRestaurants.filter(
          restaurant => restaurant.cuisine === filters.cuisine
        );
      }
      if (filters.minRating) {
        filteredRestaurants = filteredRestaurants.filter(
          restaurant => restaurant.averageRating >= parseFloat(filters.minRating)
        );
      }
      setRestaurants(filteredRestaurants);
       // Set filter options using the original unfiltered data
      const uniqueLocations = [...new Set(response.data.map(r => r.location))];
      const uniqueCuisines = [...new Set(response.data.map(r => r.cuisine))];
      setLocations(uniqueLocations);
      setCuisines(uniqueCuisines);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setRestaurants([]);
    }
  };

  const totalPages = Math.ceil((restaurants?.length || 0) / itemsPerPage);
  const currentRestaurants = Array.isArray(restaurants) ? restaurants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ) : [];

  const handleFilterChange = (type, value) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
    setCurrentPage(1);
  };

  return (
    <div className="restaurants-container">
      
      <div className="filters">
      <div className="filter-group">
          <label>Cuisine:</label>
          <select
            value={filters.cuisine}
            onChange={(e) => handleFilterChange('cuisine', e.target.value)}
          >
            <option value="">All Cuisines</option>
            {cuisines.map(cuisine => (
              <option key={cuisine} value={cuisine}>{cuisine}</option>
            ))}
          </select>
        </div>
        <div className="filter-group">
          <label>Location:</label>
          <select 
            value={filters.location}
            onChange={(e) => handleFilterChange('location', e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

       
        <div className="filter-group">
          <label>Minimum Rating:</label>
          <select
            value={filters.minRating}
            onChange={(e) => handleFilterChange('minRating', e.target.value)}
          >
            <option value="">All Ratings</option>
            <option value="4">4+ ⭐</option>
            <option value="3">3+ ⭐</option>
            <option value="2">2+ ⭐</option>
            <option value="1">1+ ⭐</option>
          </select>
        </div>
      </div>

      <div className="restaurants-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Cuisine</th>
              <th>Location</th>
              <th>Address</th>
              <th>Rating</th>
              <th>User Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentRestaurants.map(restaurant => (
              <tr key={restaurant.id}>
                <td>
                  <Link to={`/restaurants/${restaurant.id}`}>
                    {restaurant.name}
                  </Link>
                </td>
                <td>{restaurant.cuisine}</td>
                <td>{restaurant.location}</td>
                <td>{restaurant.address}</td>
                <td>
                  {restaurant.averageRating ? (
                    <span>
                      {Number(restaurant.averageRating).toFixed(1)} ⭐
                    </span>
                  ) : (
                    'No ratings'
                  )}
                </td>
            
                <td>
                <Link to={`/reviews/create/${restaurant.id}`} className="create-review-btn">
      Submit Review
    </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button 
          onClick={() => setCurrentPage(1)} 
          disabled={currentPage === 1}
        >
          First
        </button>
        <button 
          onClick={() => setCurrentPage(prev => prev - 1)} 
          disabled={currentPage === 1}
        >
          Previous
        </button>
        
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx + 1}
            className={currentPage === idx + 1 ? 'active' : ''}
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </button>
        ))}
        
        <button 
          onClick={() => setCurrentPage(prev => prev + 1)} 
          disabled={currentPage === totalPages}
        >
          Next
        </button>
        <button 
          onClick={() => setCurrentPage(totalPages)} 
          disabled={currentPage === totalPages}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default Restaurants;