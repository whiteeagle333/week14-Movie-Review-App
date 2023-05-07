/* This code is a functional component in React that renders a movie search application. 
It imports various components including MovieList, 
MovieListHeading, SearchBox, AddFavourites, and RemoveFavourites.
Here is a breakdown of what each section of the code does:
Importing required modules and components:*/

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MovieList from "./components/MovieList";
import MovieListHeading from "./components/MovieListHeading";
import SearchBox from "./components/SearchBox";
import AddFavourites from "./components/AddFavourites";
import RemoveFavourites from "./components/RemoveFavourites";

//Defining the App component:

const App = () => {
  //Setting up state variables using the useState hook:
  const [movies, setMovies] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  /*Defining an asynchronous function getMovieRequest that makes an API call to the Open Movie Database
 (OMDB) using the fetch method to retrieve movies based on the search value entered by the user:*/

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=eb84f290`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if (responseJson.Search) {
      const movies = responseJson.Search.map((movie) => {
        return {
          ...movie,
          rating: 0,
        };
      });

      setMovies(movies);
    }
  };

  //Using the useEffect hook to call the getMovieRequest
  // function whenever the searchValue state changes:

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue]);

  //Using the useEffect hook to retrieve and set
  // the favourites state from local storage when the component mounts:

  useEffect(() => {
    const movieFavourites = JSON.parse(
      localStorage.getItem("react-movie-app-favourites")
    );

    if (movieFavourites) {
      setFavourites(movieFavourites);
    }
  }, []);

  //Defining a function saveToLocalStorage that saves favourites to local storage:

  const saveToLocalStorage = (items) => {
    localStorage.setItem("react-movie-app-favourites", JSON.stringify(items));
  };

  //Defining a function addFavouriteMovie that adds a movie to the favourites
  //list and calls saveToLocalStorage to save the updated favourites to local storage:

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favourites, movie];
    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favourites.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );

    setFavourites(newFavouriteList);
    saveToLocalStorage(newFavouriteList);
  };

  //Defining a function handleRatingChange that updates the rating of a movie in the movies state:

  const handleRatingChange = (newRating, index) => {
    const newMovies = [...movies];
    newMovies[index].rating = newRating;
    setMovies(newMovies);
  };
  // Render the app
  return (
    <div className="container-fluid movie-app">
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Movies" />
        <SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className="row">
        <MovieList
          movies={movies}
          setMovies={setMovies}
          handleFavouritesClick={addFavouriteMovie}
          favouriteComponent={AddFavourites}
          onRatingChange={handleRatingChange}
        />
      </div>
      <div className="row d-flex align-items-center mt-4 mb-4">
        <MovieListHeading heading="Favourites" />
      </div>
      <div className="row">
        <MovieList
          movies={favourites}
          setMovies={setMovies}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={RemoveFavourites}
        />
      </div>
    </div>
  );
};

export default App;
