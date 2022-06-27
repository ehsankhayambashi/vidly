import { logDOM } from "@testing-library/react";
import React, { useState } from "react";
import * as moviesAPI from "../services/fakeMovieService";

function DeleteButton(props) {
  return (
    <button
      className="btn btn-danger"
      onClick={() => {
        const movies = moviesAPI.deleteMovie(props.movie._id);
        props.onUpdate(movies);
      }}
    >
      Delete
    </button>
  );
}

export default DeleteButton;
