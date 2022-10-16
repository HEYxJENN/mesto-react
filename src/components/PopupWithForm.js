import React from "react";

function PopupWithForm(props) {
  const classyName = `popup ${props.isOpen ? "popup_opened" : ""}`;
  const content = `${
    props.id === "popup__avatar" ? "popup__content-small" : "popup__content"
  } `;

  React.useEffect(() => {
    const handleEscPress = (e) => {
      if (e.key === "Escape") {
        props.onClose();
      }
    };
    props.isOpen
      ? document.addEventListener("keydown", handleEscPress)
      : document.removeEventListener("keydown", handleEscPress);
  }, [props.isOpen, props.onClose]);

  return (
    <div className={classyName} id={props.id} onClick={props.onClose}>
      <div className={content}>
        <button
          type="button"
          className="popup__close"
          onClick={props.onClose}
        ></button>
        <h2 className="popup__edit">{props.title}</h2>
        <form
          className="popup__forms"
          id="form__edit"
          name="form-edit"
          noValidate
        >
          <fieldset className="popup__forms-fieldset">
            {props.children}
            <button
              className="popup__save"
              type="submit"
              id="sure__edit_button"
            >
              Сохранить
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

// <div class="popup" id="popup__areusure">
//   <div class="popup__content-verysmall">
//     <button type="button" class="popup__close"></button>
//     <h2 class="popup__edit  ">Вы уверены</h2>
//     <form
//       class="popup__forms"
//       id="sure__edit"
//       name="form-edit"
//       novalidate
//     >
//       <fieldset class="popup__forms-fieldset">
//         <button class="popup__save" type="submit" id="sure__edit_button">
//           Да
//         </button>
//       </fieldset>
//     </form>
//   </div>
// </div> */

export default PopupWithForm;
