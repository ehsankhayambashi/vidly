import React, { useState } from "react";

function TitleCount(props) {
  var message = "";
  if (props.count > 0) {
    message = <p>we have {props.count} movies in database</p>;
  } else {
    message = <p>we have no movie in databade</p>;
  }

  return message;
}
export default TitleCount;
