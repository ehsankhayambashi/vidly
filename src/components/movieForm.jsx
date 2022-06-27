import React, { useState, useEffect } from "react";
import * as MovieApi from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import * as Form from "../services/formHelper";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import Joi from "joi";

function MovieForm() {
  const params = useParams();
  const navigation = useNavigate();

  const movieId = params.id;
  const movie = MovieApi.getMovie(movieId);

  const [state, setState] = useState({
    data: {
      title: movie ? movie.title : "",
      genre: movie ? movie.genre.name : "",
      numberInStock: movie ? movie.numberInStock : "",
      dailyRentalRate: movie ? movie.dailyRentalRate : "",
    },
    errors: {},
  });

  const fieldValidation = {
    title: Joi.string().required().label("Title"),
    genre: Joi.string().valid("Action", "Comedy", "Thriller").label("Genre"),
    numberInStock: Joi.number().label("Number In Stock"),
    dailyRentalRate: Joi.number().label("Rate"),
  };
  const schema = Joi.object({
    title: fieldValidation["title"],
    genre: fieldValidation["genre"],
    numberInStock: fieldValidation["numberInStock"],
    dailyRentalRate: fieldValidation["dailyRentalRate"],
  });

  function handleChange(e) {
    const { name, value } = e.target;
    const errors = { ...state.errors };

    const errorMessage = Form.validateField(e.target, fieldValidation);
    if (errorMessage) errors[name] = errorMessage[name];
    else delete errors[name];

    const data = { ...state.data };
    data[name] = value;
    setState((prevValue) => {
      return {
        ...prevValue,
        data,
        errors,
      };
    });
  }

  function handlSaveMovie(e) {
    e.preventDefault();
    const theMovie = {};
    if (movieId) {
      theMovie["_id"] = movieId;
    }
    theMovie["title"] = state.data.title;
    theMovie["genre"] = state.data.genre;
    theMovie["numberInStock"] = state.data.numberInStock;
    theMovie["dailyRentalRate"] = state.data.dailyRentalRate;
    MovieApi.saveMovie(theMovie);
    navigation("/");
  }

  if (movie || movieId === "new") {
    return (
      <React.Fragment>
        <div className="container">
          <h1>Movie From</h1>
          <form onSubmit={handlSaveMovie}>
            {Form.renderInput(
              "Title",
              "title",
              handleChange,
              state.data.title,
              state.errors.title
            )}
            {Form.renderSelect(
              "genre",
              "Genre",
              state.errors.genre,
              getGenres(),
              state.data.genre,
              handleChange
            )}
            {Form.renderInput(
              "Number In Stock",
              "numberInStock",
              handleChange,
              state.data.numberInStock,
              state.errors.numberInStock
            )}
            {Form.renderInput(
              "Rate",
              "dailyRentalRate",
              handleChange,
              state.data.dailyRentalRate,
              state.errors.dailyRentalRate
            )}
            {Form.renderButton("Save", schema, state.data)}
          </form>
        </div>
      </React.Fragment>
    );
  } else {
    return <Navigate to="/not-found" />;
  }
}

export default MovieForm;
