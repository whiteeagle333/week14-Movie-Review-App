//This section imports React and two other components - ReactStars and Review.

import React, { useState } from "react";
import ReactStars from "react-stars";
import Review from "./Review";

const Movie = ({
  movie,
  handleFavouritesClick,
  favouriteComponent: FavouriteComponent,
  handleRatingChange,
}) => {
  //This declares a functional component named Movie. It accepts several props -
  // movie, handleFavouritesClick, favouriteComponent, and handleRatingChange.
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");

  /* This section initializes two states - reviews and reviewText
   using the useState hook.
   reviews is an array that will hold reviews added by the user,
    and reviewText is a string that holds the user's input for a new review.
  */

  const handleSubmit = (e) => {
    e.preventDefault();
    if (reviewText.trim() === "") return;
    const newReview = { text: reviewText };
    setReviews([...reviews, newReview]);
    setReviewText("");
  };

  /* 
  This defines a function named handleSubmit. It is called when the user submits a new review. 
  The function checks whether the input is empty or not. If the input is not empty,
   the function creates a new review object and appends it to the reviews array.
    Finally, the function clears the input field.
  */

  return (
    <div className="movie">
      <img src={movie.Poster} alt={movie.Title} />
      <div className="movie-info">
        <h3>{movie.Title}</h3>
        <ReactStars
          count={5}
          value={movie.rating}
          onChange={(newRating) => handleRatingChange(newRating, movie)}
          size={24}
          color2="#ffd700"
        />
        <div className="overlay">
          <FavouriteComponent onClick={() => handleFavouritesClick(movie)} />
        </div>
        <div className="reviews">
          <h4>Reviews:</h4>
          <ul>
            {reviews.map((review, index) => (
              <Review key={index} text={review.text} />
            ))}
          </ul>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Add a review"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
            />
            <button type="submit">Add</button>
          </form>
        </div>
      </div>
    </div>
  );
};
//This exports the Movie component so that it can be imported and used in other parts of the application.

export default Movie;
