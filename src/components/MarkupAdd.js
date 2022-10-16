import React from "react";

function PopupAddMark() {
  return (
    <>
      <label>
        <input
          type="text"
          name="field-placename"
          placeholder="название"
          className="popup__input enterplacename"
          id="enterplacename"
          required
          minLength="2"
          maxLength="30"
        />
        <span className="popup__forms-input-error enterplacename-error"></span>
      </label>
      <label>
        <input
          type="url"
          name="field-link"
          placeholder="ссылка на картинку"
          className="popup__input enterlink"
          id="enterlink"
          required
        />
        <span className="popup__forms-input-error enterlink-error"></span>
      </label>
    </>
  );
}

export default PopupAddMark;
