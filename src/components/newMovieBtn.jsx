import React from "react";
import { Navigate, Link, useNavigate, Routes, Route } from "react-router-dom";
import MovieForm from "./movieForm";
function NewMovieBtn() {
  const navigation = useNavigate();
  return (
    <React.Fragment>
      <Link to="/movies/new" className="btn btn-primary">
        New Movie
      </Link>
    </React.Fragment>
  );
}

export default NewMovieBtn;
