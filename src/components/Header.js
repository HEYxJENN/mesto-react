import React from "react";

import headerLogo from "../images/logo_white.svg";

function Header() {
  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип" className="logo" />
    </header>
  );
}

export default Header;
