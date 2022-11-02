import React from "react";
import "../index.css";
import ApiX from "../utils/Api.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup";
import { useState } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [isEditAvatarOpen, setEditAvatarOpen] = useState(false);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [isAddPlaceOpen, setAddPlaceOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const handleEditAvatarClick = () => {
    setEditAvatarOpen(!isEditAvatarOpen);
  };

  const handleEditProfileClick = () => {
    setEditProfileOpen(!isEditProfileOpen);
  };

  const handleAddPlaceClick = () => {
    setAddPlaceOpen(!isAddPlaceOpen);
  };

  const handleSelectedCardClick = (card) => {
    const crt = card.target;
    setSelectedCard(crt);
  };

  const closeAllPopups = () => {
    setEditProfileOpen(false);
    setAddPlaceOpen(false);
    setEditAvatarOpen(false);
    setSelectedCard({ name: "", link: "" });
  };

  const onUpdateUser = ({ name, about }) => {
    ApiX.setUser({ name, about })
      .then(ApiX.getUser())
      .then((res) => {
        setCurrentUser(res);
      })
      .then(closeAllPopups)
      .catch((err) => console.log(err));
  };

  const onUpdateAvatar = ({ avatar }) => {
    ApiX.setUserAvatar({ avatar })
      .then(ApiX.getUser())
      .then((res) => {
        setCurrentUser(res);
      })
      .then(closeAllPopups)
      .catch((err) => console.log(err));
  };

  const onAddPlace = ({ name, link }) => {
    const likes = [];
    ApiX.addCard({ name, link })
      .then(ApiX.getInitialCards())
      .then((res) => setCards([res, ...cards]))
      .then(closeAllPopups)
      .catch((err) => console.log(err));
  };

  React.useEffect(() => {
    Promise.all([ApiX.getInitialCards(), ApiX.getUser()])
      .then(([itemsApi, userData]) => {
        setCurrentUser(userData);
        setCards(itemsApi);
      })
      .then(closeAllPopups)
      .catch((err) => console.log(err));
  }, []);

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    ApiX.changeLikeStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .then(closeAllPopups)
      .catch((err) => console.log(err));
  }

  function handleCardDelete(card) {
    const newArr = cards.filter((el) => el !== card);
    ApiX.removeCard(card._id)
      .then(setCards(newArr))
      .catch((err) => console.log(err));
  }

  return (
    <div className="body">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header />
          <Main
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleSelectedCardClick}
            cards={cards}
            onLikeClick={handleCardLike}
            onDelClick={handleCardDelete}
          />
          <Footer />
          <ImagePopup
            card={selectedCard}
            isOpen={!!selectedCard}
            onClose={closeAllPopups}
          />

          <EditProfilePopup
            isOpen={isEditProfileOpen}
            onClose={closeAllPopups}
            onUpdate={onUpdateUser}
            title="Редактировать профиль"
          ></EditProfilePopup>

          <EditAvatarPopup
            isOpen={isEditAvatarOpen}
            onClose={closeAllPopups}
            onUpdate={onUpdateAvatar}
            title="Обновить аватар"
          ></EditAvatarPopup>

          <AddPlacePopup
            isOpen={isAddPlaceOpen}
            onClose={closeAllPopups}
            onUpdate={onAddPlace}
            title="Новое место"
          ></AddPlacePopup>
          {/* <PopupWithForm
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
          </PopupWithForm> */}
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
