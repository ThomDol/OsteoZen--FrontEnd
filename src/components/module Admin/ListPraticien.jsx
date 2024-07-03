import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../header/NavBar";
import Swal from "sweetalert2";

function ListPraticien() {
  const token = localStorage.getItem("token");

  const [praticien, setPraticien] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/praticien/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => setPraticien(res.data))
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Etes vous sûr de vouloir supprimer cette fiche antecedent ?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Oui",
      denyButtonText: `Non`,
    }).then((result) => {
      if (result.isConfirmed) {
    
      axios
        .delete(`http://localhost:5000/api/praticien/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          Swal.fire("Supprimé", "", "success");
          location.reload();
          setPraticien(
            praticien.filter((praticien) => praticien.idPraticien !== id)
          );
        })
        .catch((error) => {
          console.log(error);
          Swal.fire("Suppression impossible");
        });
    } else if (result.isDenied) {
        Swal.fire("Suppression annulée", "", "info");
      }
    });
  };
  

  return (
    <div>
      <NavBar />
      <br />
      <br />
      <br />
      <div className="container mt-5 text-center">
        <h1>Liste des Praticiens</h1>
        <div>
          <br />
          <br />

          <Link
            to="/create"
            className="btn btn-success d-flex-auto justify-content-left"
          >
            Ajouter nouvel utilisateur{" "}
          </Link>
        </div>
        <br />
        <table className="table table-bordered table table-striped">
          <thead>
            <tr>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {praticien.map((d, i) => (
              <tr key={i}>
                <td>{d.nomAppUser}</td>
                <td>{d.prenomAppUser}</td>
                <td>{d.email}</td>
                <td>{d.tel}</td>
                <td>{d.nomRole}</td>
                <td>
                  <Link
                    to={`/read/${d.idAppUser}`}
                    className="btn btn-primary me-2"
                  >
                    Information
                  </Link>
                  <Link
                    to={`/update/${d.idAppUser}`}
                    className="btn btn-success me-2"
                  >
                    {" "}
                    Modifier
                  </Link>

                  <button
                    onClick={() => handleDelete(d.idAppUser)}
                    className="btn btn-danger me-2"
                  >
                    Supprimer
                  </button>

                  <button
                    onClick={() => handleblock(d.idAppUser)}
                    className="btn btn-warning me-2"
                  >
                    Bloquer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ListPraticien;
