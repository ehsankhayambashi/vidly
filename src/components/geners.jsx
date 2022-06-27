import React from "react";
import * as genresAPI from "../services/fakeGenreService";

function Geners(props) {
  const { getGenere, generId } = props;
  const allGeners = genresAPI.getAllGenres();
  return (
    <ul className="list-group">
      {allGeners.map((gener) => {
        return (
          <li
            key={gener._id}
            className={
              gener._id === generId
                ? "list-group-item active"
                : "list-group-item"
            }
            style={{ cursor: "pointer" }}
            onClick={() => {
              getGenere(gener);
            }}
          >
            {gener.name}
          </li>
        );
      })}
    </ul>
  );
}

export default Geners;
