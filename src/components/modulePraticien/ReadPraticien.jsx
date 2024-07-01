import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import NavBar from "../header/NavBar";

function ReadPraticien() {
  const token = localStorage.getItem("token");
  const [praticien, setPraticien] = useState({});
  const { id } = useParams();
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/praticien/${parseInt(id)}`, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => setPraticien(res.data))
      .catch((error) => {
        console.error(error);
        setError("An error occurred while fetching the practitioner's data.");
      });
  }, [id, token]);

  return (
    <div>
      <div>
        <NavBar />
      </div>
      <br />
      <div className="d-flex w-100 vh-100 justify-content-center align-items-center ">
        <div className="w-50 border bg-white shadow px-5 pt-3 pb-5 rounded">
          <h2>Infos du Praticien</h2>
          {error ? (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          ) : (
            <>
              <div className="mb-2">
                <strong>Nom: {praticien.nomAppUser}</strong>
              </div>
              <div className="mb-2">
                <strong>Prénom: {praticien.prenomAppUser}</strong>
              </div>
              <div className="mb-2">
                <strong>Rôle: {praticien.nomRole}</strong>
              </div>
              <div className="mb-2">
                <strong>Ville: {praticien.nomVille}</strong>
              </div>
              <div className="mb-2">
                <strong>Code Postal: {praticien.codePostal}</strong>
              </div>
              <div className="mb-2">
                <strong>Numéro Adeli: {praticien.numAdeli}</strong>
              </div>
              <div className="mb-2">
                <strong>Email: {praticien.email}</strong>
              </div>
              <div className="mb-2">
                <strong>Téléphone: {praticien.tel}</strong>
              </div>
              <br /><br /><br />
            </>
          )}
          <Link to={`/update/${id}`} className="btn btn-success">
            Modifier
          </Link>
          <Link to="/Admin" className="btn btn-primary ms-3">
            Retour
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ReadPraticien;
