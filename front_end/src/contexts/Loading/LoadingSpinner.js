import React from "react";
import "../Loading/styles.css";

export default function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
