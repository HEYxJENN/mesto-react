import React, { useState } from "react";
import ApiX from "../utils/Api.js";
import Card from "./Cards.js";
import editImg from "../images/EditButton.svg";
import addImg from "../images/plus.svg";

function Main(props) {
  const [UserName, setUserName] = useState("");
  const [UserAbout, setUserAbout] = useState("");
  const [UserAvatar, setUserAvatar] = useState("");
  const [Cards, setCards] = useState([]);

  React.useEffect(() => {
    Promise.all([ApiX.getInitialCards(), ApiX.getUser()]).then(
      ([itemsApi, userData]) => {
        setUserName(userData.name);
        setUserAbout(userData.about);
        setUserAvatar(userData.avatar);
        setCards(itemsApi);
      }
    );
  });

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__image-cover">
          <img
            className="profile__image"
            src={UserAvatar}
            alt="фото Жака Ива Кусто"
            onClick={props.onEditAvatar}
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{UserName}</h1>
          <img
            className="profile__edit"
            src={editImg}
            id="edit"
            alt="кнопка редактирования"
            onClick={props.onEditProfile}
          />
        </div>
        <p className="profile__caption">{UserAbout} </p>
        <img
          className="profile__add"
          src={addImg}
          alt="кнопка добавления"
          onClick={props.onAddPlace}
        />
      </section>

      <section>
        <ul className="elements">
          {Cards.map((card) => {
            return (
              <Card
                picture={card.link}
                key={card._id}
                name={card.name}
                likes={card.likes.length}
                onOpen={props.onCardClick}
              />
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
