import React from "react";

class Api extends React.Component {
  constructor(props) {
    super(props);
    this._address = props.baseUrl;
    this._headers = props.headers;
  }

  _getRes(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getUser() {
    return fetch(`${this._address}/users/me`, {
      headers: this._headers,
    }).then(this._getRes);
  }

  setUser({ name, about }) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name,
        about,
      }),
    }).then(this._getRes);
  }

  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      headers: this._headers,
    }).then(this._getRes);
  }

  setUserAvatar({ avatar }) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar,
      }),
    }).then(this._getRes);
  }

  addCard({ name, link }) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this._getRes);
  }

  changeLikeStatus(cardID, liked) {
    return fetch(`${this._address}/cards/likes/${cardID}`, {
      method: liked ? "PUT" : "DELETE",
      headers: this._headers,
    }).then(this._getRes);
  }

  removeCard(cardID) {
    return fetch(`${this._address}/cards/${cardID}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getRes);
  }
}

const ApiX = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-50",
  headers: {
    authorization: "119ebd6d-a63a-4e8e-b696-7980dd650d23",
    "Content-Type": "application/json",
  },
});

export default ApiX;
