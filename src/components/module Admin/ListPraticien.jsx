import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../header/NavBar";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

function ListPraticien() {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isActive,setIsActive]=useState(true);
  const [praticien, setPraticien] = useState([]);
  const [reloacCount,setReloadCount]=useState(0);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/praticien/all", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => setPraticien(res.data))
      .catch((error) => {
        console.log(error);
        if (error.response) {
          if(error.response.status===403){navigate('/Deconnexion')};
        }
      });
  }, [reloacCount]);

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




  const handleblock = (id) => {
    // Basculez l'état de isActive avec un délai
    setIsActive(!isActive);
  
    // Utilisation d'un setTimeout pour s'assurer que l'état est mis à jour
    setTimeout(async () => {
      try {
        // Effectuez la requête PUT avec la valeur mise à jour de isActive
        const response = await axios.put(
          `http://localhost:5000/api/praticien/${id}`,
          { isActive: !isActive },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        console.log(response.data);
        setReloadCount(reloacCount+1);
  
      } catch (error) {
        console.error(error);
      }
    }, 20); 
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
            className="btn btn-secondary d-flex-auto justify-content-left"
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
                    to={`/update/${d.idAppUser}`}
                    className="btn btn-secondary me-2"
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
                    onClick={() => {
                      handleblock(d.idAppUser);
                    }}
                    className="btn btn-warning me-2"
                  >
                    {d.isActive ? "Bloquer" : "Debloquer" }
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
