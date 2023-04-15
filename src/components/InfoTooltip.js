import React from "react";
import Apr from "../images/Approved.png";
import Dec from "../images/Declined.png";

function InfoTool() {
  return (
    <div className="popup">
      <div className="popup__content">
        <button
          type="button"
          className="popup__close"
          //   onClick={props.onClose}
        ></button>
        <img src={Apr} alt="green" />
        <h3 className="">Done</h3>
      </div>
    </div>
  );
}

export default InfoTool;
