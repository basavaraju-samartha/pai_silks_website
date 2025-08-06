import React from "react";
import './ReviewCard.css'
const ReviewCard = ({ review }) => {
  return (
    <div className="review-card">
      <div className="left-section">
        <img src={review.image} alt={review.name} />
      </div>
      <div className="right-section">
        <h2>{review.name}</h2>
        <div className="stars">
          {"⭐".repeat(review.rating)}
        </div>
        <p>{review.description}</p>
      </div>
    </div>
  );
};

export default ReviewCard;