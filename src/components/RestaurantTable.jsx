import React from 'react';
import { Link } from 'react-router-dom';

const RestaurantTable = ({ restaurants }) => {
  return (
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
          {restaurants.map(restaurant => (
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
  );
};

export default RestaurantTable;