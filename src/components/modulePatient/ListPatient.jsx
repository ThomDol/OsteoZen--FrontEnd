import React from "react";
import { jwtDecode } from "jwt-decode";
import CryptoJS from "crypto-js";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../header/NavBar";

// Clé secrète et vecteur d'initialisation pour le décryptage
const SECRET_KEY = "q#4puta9!am4$fcl";
const INIT_VECTOR = "1zp6@y#ect4?5krx";

// Fonction de décryptage du token
const decryptToken = (encryptedToken) => {
  const key = CryptoJS.enc.Utf8.parse(SECRET_KEY);
  const iv = CryptoJS.enc.Utf8.parse(INIT_VECTOR);

  const decrypted = CryptoJS.AES.decrypt(encryptedToken, key, {
    iv: iv,
    padding: CryptoJS.pad.Pkcs7,
    mode: CryptoJS.mode.CBC,
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
};

const ListPatient = () => {
  // États pour gérer les données de la liste des patients et les interactions utilisateur
  const [userId, setUserId] = useState(null);
  const token = localStorage.getItem("token");
  const urlList = `http://localhost:5000/api/patient/all/${userId}`;
  const urlDelete = `http://localhost:5000/api/patient`;
  const [list, setList] = useState([]);
  const navigate = useNavigate();
  const [searchItem, setSearchItem] = useState("");
  const [filteredList, setFilteredList] = useState([]);
  const [count, setCount] = useState(0); // Pour réinitialiser la liste des patients quand la fenêtre modale de création se ferme

  // Effet pour déchiffrer et décoder le token au chargement du composant
  useEffect(() => {
    try {
      const decryptedToken = decryptToken(token);
      const decodedToken = jwtDecode(decryptedToken);
      setUserId(decodedToken.id);
    } catch (error) {
      console.error("Erreur de décryptage ou de décodage du token:", error);
    }
  }, []);

  // Effet pour charger la liste des patients
  useEffect(() => {
    if (userId) {
      const fetchData = async () => {
        try {
          const response = await axios.get(urlList, {
            headers: {
              Authorization: "Bearer " + token,
            },
          });
          setList(response.data);
        } catch (error) {
          console.error(error);
          navigate("/Deconnexion");
        }
      };

      fetchData();
    }
  }, [count, userId]);

  // Fonction pour sélectionner un patient et naviguer vers sa fiche détaillée
  const selectPatient = (elem) => {
    navigate("/patient/" + elem.idPatient);
  };

  // Effet pour filtrer la liste des patients en fonction de la recherche
  useEffect(() => {
    setFilteredList(
      list.filter(
        (elem) =>
          elem.prenomPatient.toLowerCase().includes(searchItem.toLowerCase()) ||
          elem.nomPatient.toLowerCase().includes(searchItem.toLowerCase())
      )
    );
  }, [searchItem, list]);

  // Fonction pour naviguer vers la page de création d'un nouveau patient
  const CreateNewPatient = () => {
    navigate("/CreateNewPatient");
  };

  // Fonction pour supprimer un patient
  const deletePatient = (id) => {
    if (userId) {
      // Message de confirmation de suppression
      Swal.fire({
        title: "Etes vous sûr de vouloir supprimer ce patient ?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Oui",
        denyButtonText: `Non`,
      }).then((result) => {
        if (result.isConfirmed) {
          const deleteData = async () => {
            try {
              const response = await axios.delete(urlDelete + "/" + id, {
                headers: {
                  Authorization: "Bearer " + token,
                },
              });
              setCount(count + 1); // Met à jour la liste des patients après suppression
            } catch (error) {
              console.error(error);
            }
          };
          deleteData();
          Swal.fire("Supprimé", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Suppression annulée", "", "info");
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="col-11 mx-auto">
        <NavBar /> {/* Barre de navigation */}
      </div>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="col-3 mx-auto">
        <div className="input-group mb-3">
          <span className="input-group-text" id="basic-addon1">
            &#128269; {/* Icône de recherche */}
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Recherche Patient"
            aria-label="Recherche Patient"
            value={searchItem}
            onChange={(e) => {
              setSearchItem(e.target.value);
            }}
          />
        </div>
      </div>
      <br />
      <div className="col-8 mx-auto">
        <table className="table table-hover table-bordered">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Prenom</th>
              <th scope="col">Date Naissance</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredList &&
              filteredList.map((patient, index) => (
                <tr key={index}>
                  <td onClick={() => selectPatient(patient)}>
                    {patient.nomPatient}
                  </td>
                  <td>{patient.prenomPatient}</td>
                  <td>{patient.dateNaissance}</td>
                  <td>
                    <span
                      onClick={() => {
                        deletePatient(patient.idPatient);
                      }}
                    >
                      &#10060; {/* Icône de suppression */}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <br />
      <div className="col-2 mx-auto">
        <button onClick={CreateNewPatient} className="btn btn-secondary">
          Créer un nouveau patient {/* Bouton pour créer un nouveau patient */}
        </button>
      </div>
    </div>
  );
};

export default ListPatient;
