import React from "react";
import ReactStars from "react-rating-stars-component";

const RatingChanged = () => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <ReactStars
      count={5}
      value={4}
      onChange={ratingChanged}
      size={24}
      activeColor="#ffd700"
    />
  );
};

export default RatingChanged;
