import React from "react";
import "../index.css";
import ApiX from "../utils/Api.js";
import Head from "./Head.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupEditMark from "./MarkupEdit.js";
import PopupAddMark from "./MarkupAdd.js";
import PopupAvatarMark from "./MarkupAvatar.js";
import { useState } from "react";

<Head />;

function App() {
  const [isEditAvatarOpen, setEditAvatarOpen] = useState(false);
  const handleEditAvatarClick = () => {
    setEditAvatarOpen(!isEditAvatarOpen);
  };

  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const handleEditProfileClick = () => {
    setEditProfileOpen(!isEditProfileOpen);
  };

  const [isAddPlaceOpen, setAddPlaceOpen] = useState(false);
  const handleAddPlaceClick = () => {
    setAddPlaceOpen(!isAddPlaceOpen);
  };

  const [selectedCard, setSelectedCard] = useState(null);
  const handleSelectedCardClick = (card) => {
    console.log(card.target.src);
    setSelectedCard(card.target.src);
  };

  const closeAllPopups = () => {
    setEditProfileOpen(false);
    setAddPlaceOpen(false);
    setEditAvatarOpen(false);
    setSelectedCard(null);
  };

  return (
    <div className="body">
      <div className="page">
        <Header />
        <Main
          onEditProfile={handleEditProfileClick}
          onAddPlace={handleAddPlaceClick}
          onEditAvatar={handleEditAvatarClick}
          onCardClick={handleSelectedCardClick}
        />
        <Footer />
        <ImagePopup
          card={selectedCard}
          isOpen={!!selectedCard}
          onClose={closeAllPopups}
        />
        <PopupWithForm
          id="popup__edit"
          title="Редактировать профиль"
          isOpen={isEditProfileOpen}
          onClose={closeAllPopups}
        >
          {<PopupEditMark />}
        </PopupWithForm>
        <PopupWithForm
          id="popup__add"
          title="Новое место"
          isOpen={isAddPlaceOpen}
          onClose={closeAllPopups}
        >
          {<PopupAddMark />}
        </PopupWithForm>
        <PopupWithForm
          id="popup__avatar"
          title="Обновить аватар"
          isOpen={isEditAvatarOpen}
          onClose={closeAllPopups}
        >
          {<PopupAvatarMark />}
        </PopupWithForm>
      </div>
    </div>
  );
}

export default App;
