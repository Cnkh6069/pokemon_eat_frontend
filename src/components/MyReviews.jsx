import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import './Restaurant.css';

const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Add error state
  const { user } = useAuth0();
  const [editingReview, setEditingReview] = useState(null);
const [updatedReview, setUpdatedReview] = useState({
  rating: 0,
  userReview: ''
});
  
const handleUpdate = (review) => {
  setEditingReview(review);
  setUpdatedReview({
    rating: review.rating,
    userReview: review.userReview
  });
};
const handleUpdateSubmit = async (reviewId) => {
  try {
    const response = await axios.put(`http://localhost:3000/reviews/${reviewId}`, updatedReview);
    setReviews(reviews.map(review => 
      review.id === reviewId ? response.data : review
    ));
    setEditingReview(null);
  } catch (error) {
    console.error('Error updating review:', error);
    setError('Failed to update review');
  }
};

  const handleDelete = async (reviewId) => {
    try {
      await axios.delete(`http://localhost:3000/reviews/${reviewId}`);

      
      setReviews(reviews.filter(review => review.id !== reviewId));
    } catch (error) {
      console.error('Error deleting review:', error);
      setError('Failed to delete review');
    }
  };
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
      {editingReview?.id === review.id ? (
        <div className="edit-form">
          <select
            value={updatedReview.rating}
            onChange={(e) => setUpdatedReview({...updatedReview, rating: Number(e.target.value)})}
          >
            {[1,2,3,4,5].map(num => (
              <option key={num} value={num}>{num} ⭐</option>
            ))}
          </select>
          <textarea
            value={updatedReview.userReview}
            onChange={(e) => setUpdatedReview({...updatedReview, userReview: e.target.value})}
          />
          <div className="review-actions">
            <button 
              className="review-button update-button"
              onClick={() => handleUpdateSubmit(review.id)}
            >
              Save
            </button>
            <button 
              className="review-button delete-button"
              onClick={() => setEditingReview(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <h3>{review.Restaurant?.name || 'Unknown Restaurant'}</h3>
          <div className="rating">
            {Array(review.rating).fill('⭐').join('')}
          </div>
          <p className="review-text">{review.userReview}</p>
          <p className="review-date">
            {new Date(review.createdAt).toLocaleDateString()}
          </p>
          <div className="review-actions">
            <button 
              className="review-button update-button"
              onClick={() => handleUpdate(review)}
            >
              Update
            </button>
            <button 
              className="review-button delete-button"
              onClick={() => handleDelete(review.id)}
            >
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  ))}
</div>
      )}
    </div>
  );
};

export default MyReviews;