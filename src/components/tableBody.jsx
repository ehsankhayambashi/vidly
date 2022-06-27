import React from "react";
import _ from "lodash";
import { Link, Route } from "react-router-dom";
import Movies from "./movies";

function TableBody(props) {
  const { data, columns } = props;

  function renderCell(movie, column) {
    if (column.content) return column.content(movie);
    if (column.path === "title") {
      const movieTitle = _.get(movie, column.path);
      const movieId = _.get(movie, "_id");
      return <Link to={`/movies/${movieId}`}>{movieTitle}</Link>;
    }
    return _.get(movie, column.path);
  }
  return (
    <tbody>
      {data.map((movie, index) => (
        <tr key={index}>
          {columns.map((column, index) => (
            <td key={index}>{renderCell(movie, column)}</td>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
