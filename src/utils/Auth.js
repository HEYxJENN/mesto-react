import React from "react";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this._address = props.baseUrl;
    this._headers = props.headers;
  }

  register(email, password) {
    return fetch(`${this._address}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._getRes);
  }

  login(email, password) {
    return fetch(`${this._address}/signin`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(this._getRes);
  }

  checkToken(jwt) {
    return fetch(`${this._address}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._getRes);
  }
}

const AuthX = new Auth({
  baseUrl: "https://auth.nomoreparties.co.",
  headers: {
    "Content-Type": "application/json",
  },
});

export default AuthX;
