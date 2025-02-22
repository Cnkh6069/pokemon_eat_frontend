import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './Restaurant.css';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state
  const { user } = useAuth0();

  useEffect(() => {
    const fetchUserReviews = async () => {
      try {
        setLoading(true);
        //directly fetch reviews using auth0ID
        const reviewsResponse = await axios.get(`http://localhost:3000/reviews/user/${user.sub}`);
        console.log('Reviews data:', reviewsResponse.data);    
        // // Then fetch reviews using database ID
        // const reviewsResponse = await axios.get(`http://localhost:3000/users/${userId}/reviews`, {
        //   params: {
        //     include: ['Restaurant']
        //   }
        // });
        // console.log('Reviews data:', reviewsResponse.data);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error('Error details:', error.response?.data);
        setError(error.response?.data?.error || 'Failed to load your reviews. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchUserReviews();
    }
  }, [user]);

  if (loading) return <div className="my-reviews-container">Loading your reviews...</div>;
  if (error) return <div className="my-reviews-container error">{error}</div>;

  return (
    <div className="my-reviews-container">
   
      {reviews.length === 0 ? (
        <p>No reviews yet</p>
      ) : (
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card">
              <h3>{review.Restaurant.name || 'Unknown Restaurant'}</h3>
              <div className="rating">
                {Array(review.rating).fill('⭐').join('')}
              </div>
              <p className="review-text">{review.userReview}</p>
              <p className="review-date">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyReviews;