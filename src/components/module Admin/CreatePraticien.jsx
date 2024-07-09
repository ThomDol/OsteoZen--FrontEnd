import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import NavBar from "../header/NavBar";
import Swal from "sweetalert2";

import axios from "axios";

function CreatePraticien() {
  const token = localStorage.getItem("token");

  const [values, setValues] = useState({
    nomAppUser: "",
    prenomAppUser: "",
    password: "",
    nomRole: "",
    nomVille: "",
    codePostal: "",
    numAdeli: "",
    email: "",
    tel: "",
  });

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/api/praticien", values, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        Swal.fire("Creation faite");
        navigate("/Admin");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <br />
      <br />
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center">
        <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
          <h1>Créer un nouvel utilisateur</h1>
          <br />
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="nom">Nom</label>
              <input
                type="text"
                name="nom"
                required
                className="form-control"
                onChange={(e) =>
                  setValues({ ...values, nomAppUser: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label htmlFor="prenom">Prénom</label>
              <input
                type="text"
                name="prenom"
                required
                className="form-control"
                onChange={(e) =>
                  setValues({
                    ...values,
                    prenomAppUser: e.target.value,
                  })
                }
              />
            </div>
          
            <div className="mb-2">
              <label className="form-label">Role</label>
              <div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="nomRole"
                    id="role"
                    required
                    value="PRATICIEN"
                    checked={values.nomRole === "PRATICIEN"}
                    onChange={(e) =>
                      setValues({ ...values, nomRole: e.target.value })
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="accouchementProvoqueOui"
                  >
                    Praticien
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="nomRole"
                    id="role"
                    required
                    value="ADMIN"
                    checked={values.nomRole === "ADMIN"}
                    onChange={(e) =>
                      setValues({ ...values, nomRole: e.target.value })
                    }
                  />
                  <label className="form-check-label" htmlFor="nomRole">
                    Admin
                  </label>
                </div>
              </div>
            </div>
            <div className="mb-2">
              <label htmlFor="ville">Ville</label>
              <input
                type="text"
                name="ville"
                required
                className="form-control"
                onChange={(e) =>
                  setValues({ ...values, nomVille: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label htmlFor="codePostal">Code postal</label>
              <input
                type="text"
                name="codePostal"
                required
                placeholder="5 chiffres"
                pattern="\d{5}"
                className="form-control"
                onChange={(e) =>
                  setValues({ ...values, codePostal: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label htmlFor="numAdeli">Numéro Adeli</label>
              <input
                type="text"
                name="numAdeli"
                required
                placeholder="9 chiffres"
                pattern="\d{9}"
                className="form-control"
                onChange={(e) =>
                  setValues({ ...values, numAdeli: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="example@domain.com"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                className="form-control"
                onChange={(e) =>
                  setValues({ ...values, email: e.target.value })
                }
              />
            </div>
            <div className="mb-2">
              <label htmlFor="tel">Téléphone</label>
              <input
                type="text"
                name="tel"
                required
                placeholder="10 chiffres"
                pattern="\d{10}"
                className="form-control"
                onChange={(e) => setValues({ ...values, tel: e.target.value })}
              />
            </div>
            <br />
            <div className="d-flex justify-content-start">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
              <Link to="/" className="btn btn-primary ms-3">
                Retour
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePraticien;
