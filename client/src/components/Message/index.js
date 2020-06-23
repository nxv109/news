import React from "react";

export default function(props) {
  return (
    <div className="alert alert-danger text-center">
      <div id="idMsg">
        <h3>{props.message}</h3>
      </div>
    </div>
  );
}
