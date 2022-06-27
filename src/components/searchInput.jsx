import React, { useState } from "react";
import Input from "./input";
import * as moviesAPI from "../services/fakeMovieService";

function InputSerach(props) {
  const { movies, handleSearch } = props;
  var searchedMovies = [];

  const [value, setValue] = useState("");

  function handleChange(e) {
    setValue(e.target.value);
    searchedMovies = moviesAPI.searchMovie(value);
    handleSearch(searchedMovies, value);
  }

  return (
    <React.Fragment>
      <div className="mb-3">
        <input
          onChange={handleChange}
          name="inputSearch"
          type="text"
          className="form-control"
          id="inputSearch"
          autoComplete="off"
          placeholder="search..."
          value={value}
        />
      </div>
    </React.Fragment>
  );
}

export default InputSerach;
