import React from "react";

function PopupAvatarMark() {
  return (
    <>
      <label>
        <input
          type="url"
          name="field-link"
          placeholder="введите ссылку на новый аватар"
          className="popup__input enterlinkAv enterAvatarLink"
          id="enterlinkAv"
          required
        />
        <span className="popup__forms-input-error enterlinkAv-error"></span>
      </label>
    </>
  );
}

export default PopupAvatarMark;
