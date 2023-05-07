import React from "react";
import ReactStars from "react-stars";

const MovieList = (props) => {
  const {
    movies,
    handleFavouritesClick,
    setMovies,
    favouriteComponent: FavouriteComponent,
  } = props;

  return (
    <>
      {movies.map((movie, index) => (
        <div
          className="image-container d-flex justify-content-start m-3"
          key={movie.imdbID}
        >
          <img src={movie.Poster} alt="movie" />
          <div
            onClick={() => handleFavouritesClick(movie)}
            className="overlay d-flex align-items-center justify-content-center"
          >
            <FavouriteComponent />
          </div>
          <ReactStars
            count={5}
            value={movie.rating}
            onChange={(newRating) => {
              const newMovies = [...movies];
              newMovies[index].rating = newRating;
              setMovies(newMovies);
            }}
            size={24}
            color2="#ffd700"
          />
          <div className="review-container">
            <h5>Reviews:</h5>
            {movie.reviews && movie.reviews.length > 0 ? (
              <ul>
                {movie.reviews.map((review) => (
                  <li key={review}>{review}</li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet!</p>
            )}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                const reviewText = event.target.review.value;
                const newMovies = [...movies];
                newMovies[index].reviews = [
                  ...(newMovies[index].reviews || []),
                  reviewText,
                ];
                setMovies(newMovies);
                event.target.reset();
              }}
            >
              <input type="text" name="review" placeholder="Add a review" />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
