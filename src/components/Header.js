import React from "react";
import headerLogo from "../images/logo_white.svg";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип" className="logo" />
      <h3 className="header__sign">
        {props.email} <Link to="/auth"> Войти </Link>{" "}
      </h3>
    </header>
  );
}

export default Header;
