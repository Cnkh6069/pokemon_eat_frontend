import React from 'react';

const FilterSection = ({ filters, cuisines, locations, handleFilterChange }) => {
  return (
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
  );
};

export default FilterSection;