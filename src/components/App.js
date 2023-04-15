import React from "react";
import "../index.css";
import ApiX from "../utils/Api.js";
import AuthX from "../utils/Auth.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import Main from "./Main.js";
import ImagePopup from "./ImagePopup.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup";
import Register from "./Register.js";
import Login from "./Login.js";
import ProtectedRoute from "./ProtectedRoute";
import { useState } from "react";
import {
  Route,
  Switch,
  Redirect,
  NavLink,
  Link,
  useHistory,
} from "react-router-dom";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import InfoTool from "./InfoTooltip";

function App() {
  const [isEditAvatarOpen, setEditAvatarOpen] = useState(false);
  const [isEditProfileOpen, setEditProfileOpen] = useState(false);
  const [isAddPlaceOpen, setAddPlaceOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({ name: "", link: "" });
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [isToolOpened, setToolOpened] = useState(false);

  const history = useHistory();

  React.useEffect(() => {
    let jwt = localStorage.getItem("jwt");
    if (jwt) {
      console.log("there is a key");
      //auth(JSON.parse(jwt));
    }
    // else {`x}
  }, []);

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

  function handleLogOut() {
    // localStorage.removeItem("jwt");
    console.log("loggedOut");
    setEmail("");
    setLoggedIn(false);
    //запрос к серверу.then
    // history.push("/auth");
  }

  function handleLogIn(e, { email, password }) {
    e.preventDefault();
    console.log("loggedIn");
    //запрос к серверу.then
    AuthX.login({ email, password }).then((res) => {
      localStorage.setItem("jwt", JSON.stringify(res.token));
    });
    setLoggedIn(true);
    history.push("/");
  }

  function handleRegister(e, { email, password }) {
    e.preventDefault();
    console.log("registred");
    //запрос к серверу.then
    AuthX.register({ email, password }).then((res) => {
      if (res) {
        setToolOpened(true);
      }
    });
    setLoggedIn(true);
    history.push("/auth");
  }

  return (
    // App.js

    <div className="body">
      <div className="page">
        <CurrentUserContext.Provider value={currentUser}>
          <Header
            email={loggedIn || ""}
            loggedIn={loggedIn}
            logOut={handleLogOut}
          />

          <Switch>
            <Route path="/reg">
              <Register onSubmit={handleRegister} />
            </Route>

            <Route path="/auth">
              <Login onSubmit={handleLogIn} />
            </Route>

            <ProtectedRoute
              exact
              path="/"
              loggedIn={loggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleSelectedCardClick}
              cards={cards}
              onLikeClick={handleCardLike}
              onDelClick={handleCardDelete}
            />

            <Route path="*">
              {loggedIn ? <Redirect to="/" /> : <Redirect to="/reg" />}
            </Route>

            {/* <Route path="/reg">
              {loggedIn ? <Redirect to="/" /> : <Register />}
            </Route> */}

            {/* <Route path="/">
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleSelectedCardClick}
                cards={cards}
                onLikeClick={handleCardLike}
                onDelClick={handleCardDelete}
              />
            </Route> */}
          </Switch>

          <Footer />

          <InfoTool />

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

          <Login></Login>
        </CurrentUserContext.Provider>
      </div>
    </div>
  );
}

export default App;
