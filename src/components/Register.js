import React, { useState } from "react";

function Register(props) {
  return (
    <main className="content">
      <div className="registration" id="registration">
        <h2 className="registration__header">Регистрация</h2>
        <form onSubmit={props.onSubmit}>
          <fieldset className="registration__form">
            <label>
              <input
                type="email"
                name="email"
                autoComplete="email"
                placeholder="Email"
                className="registration__input "
                // id="entername"
                required
                minLength="2"
                maxLength="40"
              />
              <span
                className="popup__forms-input-error entername-error"
                // id="entername-error"
              ></span>
            </label>
            <label>
              <input
                type="password"
                name="password"
                autoComplete="current-password"
                placeholder="Password"
                className="registration__input"
                // id="enterabout"
                required
                minLength="2"
                maxLength="200"
              />
              <span
                className="popup__forms-input-error about-error enterabout-error"
                // id="enterabout-error"
              ></span>
            </label>

            <button className="registration__confirm">
              Зарегистрироваться
            </button>

            <h3 className="registration__already">
              {" "}
              Уже зарегистрированы? Войти
            </h3>
          </fieldset>
        </form>
      </div>
    </main>
  );
}

export default Register;
