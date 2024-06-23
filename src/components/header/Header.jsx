import React from "react";

const Header = () => {
  return (
    <div className="col-6">
      <ul className="nav">
        <li className="nav-item">
          <a className="nav-link" href="/Profil">
            Profil
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/List">
            Liste Patients
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/ListPraticien">
            Liste Praticien
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/Deconnexion">
            Deconnexion
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Header;
