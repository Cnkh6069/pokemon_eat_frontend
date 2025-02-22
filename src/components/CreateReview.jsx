import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import './Restaurant.css';

const CreateReview = () => {
  const { restaurantId } = useParams();
  const navigate = useNavigate();
  const {user} = useAuth0();
  const [review, setReview] = useState({
    rating: 5,
    comment: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Log the data being sent
    console.log('Sending review data:', {
        rating: review.rating,
        userReview: review.comment, // Changed from comment to userReview to match backend
        restaurantId: parseInt(restaurantId),
        userId: user.sub
      });

      const response = await axios.post(`http://localhost:3000/reviews/restaurant/${restaurantId}`, {
        rating: review.rating,
        userReview: review.comment,
        restaurantId: parseInt(restaurantId),
        userId: user.sub //using Auth0 to get user ID
      });
         // Handle successful response
    if (response.data.rewardedPokemon) {
        alert(`Review submitted! You received a ${response.data.rewardedPokemon.name} as a reward!`);
      }
      navigate(`/restaurant/${restaurantId}`);
    } catch (error) {
      console.error('Error creating review:', error);
      // Add error handling for user feedback
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert('Failed to create review. Please try again.');
      }
    }
  };

  return (
    <div className="create-review">
      <h2>Write a Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Rating:</label>
          <select
            value={review.rating}
            onChange={(e) => setReview({ ...review, rating: Number(e.target.value) })}
          >
            <option value="5">5 ⭐</option>
            <option value="4">4 ⭐</option>
            <option value="3">3 ⭐</option>
            <option value="2">2 ⭐</option>
            <option value="1">1 ⭐</option>
          </select>
        </div>
        <div className="form-group">
          <label>Comment:</label>
          <textarea
            value={review.comment}
            onChange={(e) => setReview({ ...review, comment: e.target.value })}
            required
          />
        </div>
        <button type="submit">Submit Review</button>
      </form>
    </div>
  );
};

export default CreateReview;