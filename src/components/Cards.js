import React from "react";

function Card(props) {
  return (
    <li className="element">
      <div className="element__image-block">
        <img
          className="element__image"
          src={props.picture}
          alt={props.name}
          onClick={props.onOpen}
        />
        <button type="button" className="element__delete"></button>
      </div>
      <div className="element__caption">
        <h2 className="element__name">{props.name}</h2>
        <div>
          <button type="button" className="element__heart"></button>
          <h4 className="element__heart-count">{props.likes}</h4>
        </div>
      </div>
    </li>
  );
}

export default Card;
