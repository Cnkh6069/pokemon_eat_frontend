import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Restaurant.css';

const RestaurantDetails = () => {
  const { id } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const [restaurantRes, reviewsRes] = await Promise.all([
          axios.get(`http://localhost:3000/restaurants/${id}`),
          axios.get(`http://localhost:3000/restaurants/${id}/reviews`)
        ]);

           // If the restaurant data is nested in a data property, extract it
      const restaurantData =  restaurantRes.data;
      const reviewsData = reviewsRes.data;

      setRestaurant(restaurantData);
      setReviews(Array.isArray(reviewsData) ? reviewsData : []);
      } catch (error) {
        console.error('Error fetching restaurant details:', error);
      }
    };

    if (id) {
      fetchRestaurantDetails();
    }
  }, [id]);

  if (!restaurant) return <div>Loading...</div>;

  return (
    <div className="restaurant-details">
      <div className="restaurant-info">
        <h2>{restaurant.name}</h2>
        <div className="info-grid">
          <div>
          <p><strong>Restaurant Name:</strong> {restaurant.name}</p>
            <p><strong>Cuisine:</strong> {restaurant.cuisine}</p>
            <p><strong>Location:</strong> {restaurant.location}</p>
            <p><strong>Address:</strong> {restaurant.address}</p>
          </div>
          <div>
            <p><strong>Average Rating:</strong> {restaurant.averageRating ? 
              `${restaurant.averageRating.toFixed(1)} ⭐` : 'No ratings yet'}</p>
          </div>
        </div>
      </div>

      <div className="reviews-section">
        <h3>What Others Say?</h3>
        {reviews.length > 0 ? (
          <div className="reviews-list">
            {reviews.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                <span className="reviewer">{review.User?.userName || 'Anonymous'}</span>
                  <span className="rating">{Array(review.rating).fill('⭐').join('')}</span>
                </div>
                <p className="review-text">{review.userReview}</p>
                <p className="review-date">
                  {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p>No reviews yet</p>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetails;