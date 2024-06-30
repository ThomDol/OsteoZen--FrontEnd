import React, { useState, useEffect } from "react";
import axios from "axios";
import VilleForm from "../ModuleVille/VilleForm";

const ModalMedecinForm = ({ idModalDoc,count,setCount }) => {
  const token = localStorage.getItem("token");
  const [listVille, setListVille] = useState([]);
  const [nomMedecinTraitant, setNomMedecinTraitant] = useState("");
  const [prenomMedecinTraitant, setPrenomMedecinTraitant] = useState("");
  const [ville, setville] = useState("");
  const [displaySuccessMessage, setDisplaySuccessMessage] = useState(false);
  const [countVille, setCountVille] = useState(0); //pour actualiser affichage de la liste de ville qd ajout

  useEffect(() => {
    const loadAllVille = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/lieu/all", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setListVille(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadAllVille();
  }, [countVille]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      nomMedecinTraitant,
      prenomMedecinTraitant,
      ville,
    };
    try {
      await axios.post(`http://localhost:5000/api/medecintraitant`, formData, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      setCount(count + 1);
      setDisplaySuccessMessage(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="modal fade"
      id={`Modal-${idModalDoc}`}
      tabIndex="-1"
      aria-labelledby={`ModalLabel-${idModalDoc}`}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`ModalLabel-${idModalDoc}`}>
              Création nouveau Medecin Traitant
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div>
              <button
                type="button"
                className="btn btn-link"
                data-bs-toggle="modal"
                data-bs-target="#Modal-idModalVille"
              >
                Ajouter Ville
              </button>
              <VilleForm
                idModalDoc="idModalVille"
                countVille={countVille}
                setCountVille={setCountVille}
              />
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="nomMedecinTraitant" className="form-label">
                  Nom du médecin traitant
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nomMedecinTraitant"
                  required
                  value={nomMedecinTraitant}
                  onChange={(e) => setNomMedecinTraitant(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="prenomMedecinTraitant" className="form-label">
                  Prénom du médecin traitant
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="prenomMedecinTraitant"
                  required
                  value={prenomMedecinTraitant}
                  onChange={(e) => setPrenomMedecinTraitant(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="ville" className="form-label">
                  Ville :
                </label>
                <select
                  className="form-select"
                  id="MedecinTraitant"
                  value={ville}
                  onChange={(e) => setville(e.target.value)}
                >
                  <option value="">Selectionner la ville</option>
                  {listVille &&
                    listVille.map((ville, index) => (
                      <option key={index} value={`${ville.nomville}`}>
                        {ville.nomville}, {ville.codePostal}
                      </option>
                    ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary">
                Valider
              </button>
              {displaySuccessMessage && (
                <div className="text-center">
                  <span style={{ fontWeight: "bold", color: "green" }}>
                    Informations mises à jour avec succès
                  </span>
                </div>
              )}
            </form>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMedecinForm;
