import React from "react";

function HeartIcon(props) {
  function generateIcon() {
    const index = props.movies.indexOf(props.movie);
    if (!props.movies[index].like) {
      return <i className="fa fa-heart-o" aria-hidden="true"></i>;
    } else {
      return <i className="fa fa-heart" aria-hidden="true"></i>;
    }
  }

  return (
    <button
      type="button"
      className="btn btn-link"
      style={{ color: "#000000" }}
      onClick={() => props.onUpdateIcone(props.movie)}
    >
      {generateIcon()}
    </button>
  );
}

export default HeartIcon;
