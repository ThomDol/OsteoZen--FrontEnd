import React from "react";
import "../../style/NavBar.css";
import logoMassage from "../../assets/logoMassage.png";

const NavBar = ({ role,isActive }) => {
  return (
    <div>
       <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container-fluid">
          <a className="navbar-brand me-auto" href="#">
            <img alt="" style={{ width: "8%", height: "8%" }} />
          </a>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <a className="offcanvas-title" id="offcanvasNavbarLabel" href="/">
                <img src={logoMassage} alt="logo" className="w-50" />
              </a>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                <li className="nav-item">
                  <a
                    className="nav-link mx-lg-2 active"
                    aria-current="page"
                    href="/"
                  >
                    Accueil
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link mx-lg-2" href="/Profil">
                    Profil
                  </a>
                </li>
                {role === "PRATICIEN" && (
                  <li className="nav-item">
                    <a className="nav-link mx-lg-2" href="/List">
                      Liste Patients
                    </a>
                  </li>
                )}
                {role === "ADMIN" && (
                  <li className="nav-item">
                    <a className="nav-link mx-lg-2" href="/Admin">
                      Liste Praticiens
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <a href="/Deconnexion" className="login-button">
            Deconnexion
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
