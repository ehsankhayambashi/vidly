import React, { useState } from "react";
import * as moviesAPI from "../services/fakeMovieService";
import Geners from "./geners";
import MoviesTable from "./moviesTable";
import Pagination from "./pagination";
import TitleCount from "./titleCount";
import _ from "lodash";
import NewMovieBtn from "./newMovieBtn";
import InputSerach from "./searchInput";

function Movies() {
  const [state, setstate] = useState({
    movieNum: moviesAPI.getMovies().length,
    movies: moviesAPI.getMovies(),
    currentMovies: moviesAPI.startCurrentMovies(moviesAPI.getMovies(), 1, 3),
    currentPage: 1,
    generID: "0",
    sortColumn: { path: "title", order: "asc" },
  });

  function getMovies(movies) {
    var updatedcurrentMovie = moviesAPI.generateCurrentMoviesWithPage(
      state.currentPage,
      movies
    );
    if (updatedcurrentMovie.length === 0) {
      var page = state.currentPage;
      page = page - 1;
      updatedcurrentMovie = moviesAPI.generateCurrentMoviesWithPage(
        page,
        moviesAPI.getMovies()
      );
      setstate((prevState) => {
        return {
          ...prevState,
          movieNum: movies.length,
          movies: movies,
          currentMovies: updatedcurrentMovie,
          currentPage: page,
          generID: "0",
        };
      });
    } else {
      var updatedcurrentMovie = moviesAPI.generateCurrentMoviesWithPage(
        state.currentPage,
        movies
      );
      setstate((prevState) => {
        return {
          ...prevState,
          movieNum: movies.length,
          movies: movies,
          currentMovies: updatedcurrentMovie,
        };
      });
    }
  }

  function updateHeartIcone(movie) {
    const movies = [...state.movies];
    const index = movies.indexOf(movie);
    movies[index].like = !movies[index].like;
    setstate((prevState) => {
      return {
        ...prevState,
        movies: movies,
      };
    });
  }

  function paginate(currentPage) {
    const movies = [...state.movies];
    const postPerPage = 3;
    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirstPost = indexOfLastPost - postPerPage;
    const currentMovies = movies.slice(indexOfFirstPost, indexOfLastPost);
    setstate((prevState) => {
      return {
        ...prevState,
        currentMovies: currentMovies,
        currentPage: currentPage,
      };
    });
  }

  function getGenere(genere) {
    var moviesByGeners = null;
    var updatedCurrentMovies = null;
    if (genere._id === "0") {
      moviesByGeners = moviesAPI.getMovies();
      updatedCurrentMovies = moviesAPI.generateCurrentMoviesWithPage(
        1,
        moviesByGeners
      );
    } else {
      moviesByGeners = moviesAPI.getMoviesByGenerId(genere._id);
      updatedCurrentMovies = moviesAPI.generateCurrentMoviesWithPage(
        1,
        moviesByGeners
      );
    }

    setstate((prevState) => {
      return {
        ...prevState,
        currentMovies: updatedCurrentMovies,
        movies: moviesByGeners,
        generID: genere._id,
        currentPage: 1,
      };
    });
  }

  function handleSort(sortColumn, updatedCmovies) {
    setstate((prevState) => {
      return {
        ...prevState,
        sortColumn,
        currentMovies: updatedCmovies,
      };
    });
  }

  function handleSearch(result, val) {
    if (result != []) {
      setstate((prevState) => {
        return {
          ...prevState,
          currentMovies: moviesAPI.startCurrentMovies(result, 1, 3),
          generID: "0",
          movies: moviesAPI.getMovies(),
        };
      });
    }
    if (val.length === 1) {
      setstate((prevState) => {
        return {
          ...prevState,
          currentMovies: moviesAPI.startCurrentMovies(state.movies, 1, 3),
          generID: "0",
          movies: moviesAPI.getMovies(),
        };
      });
    }
  }
  return (
    <main className="container">
      <div className="row">
        <div className="col-lg-2">
          <Geners getGenere={getGenere} generId={state.generID} />
        </div>
        <div className="col-lg-10">
          <NewMovieBtn />
          <TitleCount count={state.movies.length} />
          <InputSerach movies={state.movies} handleSearch={handleSearch} />
          <MoviesTable
            currentMovies={state.currentMovies}
            updateHeartIcone={updateHeartIcone}
            getMovies={getMovies}
            movies={state.movies}
            onSort={handleSort}
            sortColumn={state.sortColumn}
          />
          <Pagination
            movies={state.movies}
            paginate={paginate}
            currentPage={state.currentPage}
          />
        </div>
      </div>
    </main>
  );
}

export default Movies;
