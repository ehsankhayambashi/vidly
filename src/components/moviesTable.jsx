import React from "react";
import _ from "lodash";
import HeartIcon from "./heartIcon";
import DeleteButton from "./deleteButton";
import Table from "./Table";

function MoviesTable(props) {
  const {
    currentMovies,
    updateHeartIcone,
    getMovies,
    movies,
    onSort,
    sortColumn,
  } = props;

  const columns = [
    { path: "title", lable: "Title" },
    { path: "genre.name", lable: "Genre" },
    { path: "numberInStock", lable: "Stock" },
    { path: "dailyRentalRate", lable: "Rate" },
    {
      lable: "Like",
      content: (movie) => (
        <HeartIcon
          movie={movie}
          movies={movies}
          onUpdateIcone={() => updateHeartIcone(movie)}
        />
      ),
    },
    {
      lable: "Delete",
      content: (movie) => (
        <DeleteButton
          movies={currentMovies}
          movie={movie}
          onUpdate={getMovies}
        />
      ),
    },
  ];

  function sortChange(path) {
    const sortCol = sortColumn;
    if (sortCol.path === path) {
      sortCol.order = sortCol.order === "asc" ? "desc" : "asc";
    } else {
      sortCol.path = path;
      sortCol.order = "asc";
    }
    //current movie o sort kon
    const updatedCurrentMovies = _.orderBy(
      currentMovies,
      sortCol.path,
      sortCol.order
    );
    onSort(sortCol, updatedCurrentMovies);
  }

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      sortChange={sortChange}
      updateHeartIcone={updateHeartIcone}
      movies={movies}
      getMovies={getMovies}
      data={currentMovies}
    />
  );
}

export default MoviesTable;
