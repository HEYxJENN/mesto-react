import React from "react";

function PopupEditMark() {
  return (
    <>
      <label>
        <input
          type="text"
          name="field-name"
          placeholder="enter name"
          className="popup__input entername"
          id="entername"
          required
          minLength="2"
          maxLength="40"
        />
        <span
          className="popup__forms-input-error entername-error"
          id="entername-error"
        ></span>
      </label>
      <label>
        <input
          type="text"
          name="field-about"
          placeholder="who is it?"
          className="popup__input enterabout"
          id="enterabout"
          required
          minLength="2"
          maxLength="200"
        />
        <span
          className="popup__forms-input-error about-error enterabout-error"
          id="enterabout-error"
        ></span>
      </label>
    </>
  );
}
export default PopupEditMark;
